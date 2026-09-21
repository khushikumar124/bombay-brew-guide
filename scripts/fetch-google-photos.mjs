// One-off enrichment script: uses the Google Places API (New) to find a
// venue-specific photo (and phone number, when present) for places that don't
// already have imageVerified: true. Writes results to scripts/photo-overrides.json,
// which generate-real-data.mjs merges in automatically.
//
// Requires GOOGLE_PLACES_API_KEY in .env.local (gitignored — never commit it).
// The API key itself is NEVER written into photo-overrides.json or places.json —
// only the final, key-free googleusercontent.com photo URL is stored.
//
// Usage: node scripts/fetch-google-photos.mjs [--limit N] [--only "name substring"]

import fs from 'node:fs'

const envPath = new URL('../.env.local', import.meta.url)
const envText = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : ''
const apiKey = envText.match(/^GOOGLE_PLACES_API_KEY=(.+)$/m)?.[1]?.trim()
if (!apiKey) {
  console.error('Missing GOOGLE_PLACES_API_KEY in .env.local')
  process.exit(1)
}

const places = JSON.parse(fs.readFileSync(new URL('../src/data/places.json', import.meta.url), 'utf-8'))
const overridesPath = new URL('./photo-overrides.json', import.meta.url)
const overrides = fs.existsSync(overridesPath) ? JSON.parse(fs.readFileSync(overridesPath, 'utf-8')) : {}

const args = process.argv.slice(2)
const limitArg = args.indexOf('--limit')
const limit = limitArg >= 0 ? Number(args[limitArg + 1]) : Infinity
const onlyArg = args.indexOf('--only')
const only = onlyArg >= 0 ? args[onlyArg + 1].toLowerCase() : null

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

// Loose match: the API result's name should share meaningful words with ours,
// and its address should plausibly be in the same area — cheap guardrail against
// the API confidently returning a same-named business in the wrong city/branch.
function plausibleMatch(place, candidate) {
  const ourName = normalize(place.name)
  const theirName = normalize(candidate.displayName?.text ?? '')
  const nameOverlap = ourName.split(' ').some((w) => w.length > 3 && theirName.includes(w))
  const theirAddr = normalize(candidate.formattedAddress ?? '')
  const areaOverlap = normalize(place.area).split(' ').some((w) => w.length > 3 && theirAddr.includes(w))
  return nameOverlap && areaOverlap && candidate.businessStatus !== 'CLOSED_PERMANENTLY'
}

async function searchText(query) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.photos,places.businessStatus,places.internationalPhoneNumber',
    },
    body: JSON.stringify({ textQuery: query, regionCode: 'IN' }),
  })
  if (!res.ok) {
    console.log('  search failed', res.status, await res.text().catch(() => ''))
    return null
  }
  const data = await res.json()
  return data.places?.[0] ?? null
}

async function resolvePhotoUri(photoName) {
  const res = await fetch(
    `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1200&skipHttpRedirect=true&key=${apiKey}`,
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.photoUri ?? null
}

async function verifyImageUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    const contentType = res.headers.get('content-type') ?? ''
    return res.ok && contentType.startsWith('image/')
  } catch {
    return false
  }
}

const candidates = places
  .filter((p) => !p.imageVerified)
  .filter((p) => !only || p.name.toLowerCase().includes(only))
  .slice(0, limit)

console.log(`Checking ${candidates.length} places without a verified photo...`)

let found = 0
let checked = 0
for (const place of candidates) {
  checked++
  const query = `${place.name}, ${place.area}, Mumbai`
  const result = await searchText(query)
  if (!result) {
    console.log(`[${checked}/${candidates.length}] ${place.name}: no result`)
    continue
  }
  if (!plausibleMatch(place, result)) {
    console.log(`[${checked}/${candidates.length}] ${place.name}: match rejected (name="${result.displayName?.text}", addr="${result.formattedAddress}")`)
    continue
  }
  if (!result.photos?.length) {
    console.log(`[${checked}/${candidates.length}] ${place.name}: matched but no photos`)
    continue
  }

  const photoUri = await resolvePhotoUri(result.photos[0].name)
  if (!photoUri) {
    console.log(`[${checked}/${candidates.length}] ${place.name}: photo resolve failed`)
    continue
  }

  const ok = await verifyImageUrl(photoUri)
  if (!ok) {
    console.log(`[${checked}/${candidates.length}] ${place.name}: photo URL didn't verify`)
    continue
  }

  const override = { image: photoUri, imageVerified: true }
  if (!place.phone && result.internationalPhoneNumber) {
    override.phone = result.internationalPhoneNumber
  }
  overrides[place.name] = override
  found++
  console.log(`[${checked}/${candidates.length}] ${place.name}: ✓ verified photo${override.phone ? ' + phone' : ''}`)

  // Checkpoint after every find so a crash/interrupt never loses progress.
  fs.writeFileSync(overridesPath, JSON.stringify(overrides, null, 2))

  await new Promise((r) => setTimeout(r, 150))
}

console.log(`\nDone. ${found} new verified photos out of ${checked} checked.`)
