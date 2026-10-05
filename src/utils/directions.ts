import type { CoffeePlace } from '../types/coffee'
import type { LatLng } from './distance'

// Google resolves a text destination against its own business listings, which lands on the
// actual venue. Our stored lat/lng is only ever an approximation, so it is never used as the
// destination. Verified addresses give Google the full street address; unverified ones give
// it name + neighbourhood, which is still far more precise than a made-up coordinate.
export function getDirectionsUrl(place: CoffeePlace, origin?: LatLng | null): string {
  const cleanName = place.name.replace(/\s+[—–-]\s+/g, ' ')
  const destination = place.addressVerified
    ? `${cleanName}, ${place.address}`
    : `${cleanName}, ${place.area}, Mumbai`

  const params = new URLSearchParams({ api: '1', destination })
  if (origin) params.set('origin', `${origin.lat},${origin.lng}`)
  return `https://www.google.com/maps/dir/?${params.toString()}`
}
