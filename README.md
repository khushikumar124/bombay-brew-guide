# Bombay Brew Guide ☕

A coffee-first way to discover cafés, roasteries and coffee bars across Mumbai —
an interactive map, a curated guide, and a personal coffee tracker in one small app.

Google Maps answers "where are coffee shops near me?" Bombay Brew Guide tries to answer
"where should I actually go for coffee?"

---

## 1. Project overview

This is a fully working MVP: a React + TypeScript single-page app with an interactive
Leaflet map of Mumbai, coffee-specific search and filters, detailed place profiles, and
a personal "My Coffee" tracker (saved / visited) backed by `localStorage`. There is no
backend and no required accounts — the app works fully offline-first aside from map
tiles and font loading.

## 2. Features

- **Interactive, color-coded map** of Mumbai (Leaflet + OpenStreetMap tiles, no paid API):
  cafés, roasteries, takeaway counters and coffee bars each get their own marker color
  and a tiny animated steam wisp, with a legend so the map reads at a glance.
- **A cute, playful visual identity**: a bright coral/mint/gold/berry palette over a warm
  cream base, bubbly rounded type, soft blob shapes, a gently-bobbing coffee-cup mark,
  clustered map pins, and bouncy micro-interactions on save/visit/directions buttons.
- **Coffee-specific filters**: coffee style (Specialty, Espresso, Pour-over, Cold Brew,
  Filter Coffee), place type (Cafe, Roastery, Takeaway, Coffee Bar), experience (Work
  Friendly, Quiet, Date Spot, Outdoor Seating, Good for Quick Coffee), price, Open Now,
  Has Food, Pet Friendly — quick chips (each with its own accent color) plus a "More
  filters" panel.
- **Real client-side search** across name, area, address, tags, coffee styles, best-for,
  amenities and description.
- **Detailed place profiles** with a "Why go?" blurb, coffee styles, signature drinks,
  amenities, best-for tags, opening hours, website (where confirmed), and a directions
  link.
- **Personal coffee tracker**: save (♥) and mark-visited (✓) actions persisted to
  `localStorage`, with a "My Coffee" page showing Saved / Visited / Favorites and live
  stats (places explored, saved, neighbourhoods explored).
- **Discover page** with curated, colorfully-badged shelves generated from the dataset
  itself (Great specialty coffee, Good places to work, Best for slow mornings, Quick
  coffee stops, Hidden gems, Good for a date) plus a neighbourhood picker.
- **"Near me"** button using browser geolocation (optional, never required), with
  straight-line distance shown on cards and map popups once granted.
- Fully responsive: sidebar-list-plus-map on desktop, a full-height map with a
  horizontally-scrollable card strip on mobile, and a bottom tab bar for navigation.
- Proper empty states and graceful image fallbacks — no raw errors or blank screens.
- Accessible: semantic HTML, keyboard-focusable controls, visible focus states, alt text,
  `aria-pressed`/`aria-label` on toggle buttons.

## 3. Tech stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** (via `@tailwindcss/vite`) with a custom cute/playful theme
  (Baloo 2 display font + Quicksand body)
- **Leaflet + react-leaflet**, with `react-leaflet-cluster` for marker clustering, and
  OpenStreetMap tiles (no Google Maps, no paid API key)
- **lucide-react** for icons
- **react-router-dom** for routing (`/`, `/discover`, `/my-coffee`, `/about`, `/place/:id`)
- **React state/context + `localStorage`** for persistence — no backend, no database

No paid APIs, no Firebase, no authentication system, no microservices.

## 4. Project structure

```
coffee-mumbai/
├── scripts/
│   └── generate-real-data.mjs  # builds src/data/places.json from curated entries
├── src/
│   ├── components/
│   │   ├── layout/            # NavBar, MobileTabBar, Layout shell
│   │   ├── map/                # MapView, marker icons, preview popup, Near-me button
│   │   ├── place/              # PlaceCard, FilterBar, MoreFiltersPanel, DiscoveryShelf
│   │   └── ui/                 # Rating, TagPill, EmptyState, StatCard, Save/Visited buttons
│   ├── context/
│   │   └── CollectionContext.tsx  # saved/visited state + localStorage sync
│   ├── data/
│   │   ├── places.json          # seed dataset (source of truth)
│   │   ├── places.ts             # typed accessor over places.json
│   │   ├── coffeeFacts.ts        # rotating coffee facts
│   │   └── quickFilters.ts       # quick-filter chip definitions
│   ├── hooks/
│   │   └── useGeolocation.ts
│   ├── pages/
│   │   ├── ExplorePage.tsx        # main screen: search + filters + map + list
│   │   ├── DiscoverPage.tsx
│   │   ├── MyCoffeePage.tsx
│   │   ├── PlacePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── types/
│   │   └── coffee.ts              # CoffeePlace, FilterState, etc.
│   ├── utils/
│   │   ├── filterPlaces.ts        # search + filter logic
│   │   ├── sort.ts
│   │   ├── distance.ts             # haversine distance + formatting
│   │   ├── hours.ts                 # "Open now" heuristic
│   │   ├── storage.ts                # localStorage read/write
│   │   ├── discovery.ts              # derives Discover-page collections from data
│   │   └── array.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                     # Tailwind theme tokens + Leaflet overrides
├── index.html
├── package.json
└── vite.config.ts
```

## 5. Installation

Requires Node.js 18+ (Node 20+ recommended) and npm.

```bash
npm install
```

## 6. Running locally

```bash
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

## 7. Build command

```bash
npm run build
```

Type-checks the project (`tsc -b`) and produces a production build in `dist/`. Preview
the production build locally with:

```bash
npm run preview
```

## 8. Environment variables

None required. The app uses OpenStreetMap tiles (no API key) and browser geolocation
(no key, permission-based, optional). Google Fonts are loaded from a CDN in `index.html`;
if you need a fully offline build, self-host the two font files instead.

## 9. Data structure

Places live in `src/data/places.json` (plain JSON, so it's easy to regenerate, edit by
hand, or later replace with a real ingestion pipeline / database export) and are typed
via `src/types/coffee.ts`. Each place has, among other fields: `name`, `area`, `address`,
`addressVerified`, `latitude`/`longitude`, `placeType`, `priceRange`, `rating`,
`coffeeStyles`, `tags`, `bestFor`, `signatureDrinks`, `amenities`, `openingHours`,
`whyGo`, and an `image` URL.

**A note on the data — please read before using this beyond a demo:** the 181 places are
real, publicly-known coffee spots across Mumbai, Thane, Navi Mumbai and the wider Mumbai
Metropolitan Region — including Mira-Bhayandar, Panvel, Kalyan-Dombivli, Ambernath and
Nerul (Subko, Blue Tokai, Third Wave Coffee, KC Roasters, Toise, Araku Coffee, Nandan
Coffee, Kala Ghoda Café, Cafe Madras, Prithvi Cafe, Cafe Mondegar, Kyani & Co., Eshaku
Coffee, Wonder's Cafe, Mimi Cafe & Bistro, and others), compiled from public sources
rather than a live, continuously-verified directory:

- `addressVerified: true` (142 of 181 places) means the exact street address was confirmed
  either from the brand's own official store-locator page, or corroborated by two or more
  independent, reputable sources. These are shown plainly on the place's page.
- `addressVerified: false` (39 of 181 places) means the neighbourhood is correct but the
  exact street address was not independently confirmed in the time available — the app
  shows an explicit "check before you go" note on these in the UI. This is deliberate:
  a wrong phone number or address for a real business is worse than an honest gap.
- `phone`, `website`, `email`, and `instagram` fields are populated only where confirmed
  from an official source (e.g. Blue Tokai's and Araku's own sites, or a venue's own
  contact page) or solid independent coverage — never guessed at from a plausible-looking
  format. Most independent cafés still don't publish a public email, so `email` remains
  blank far more often than it's filled in.
- One lesson from building this: a well-produced-looking food/travel content site
  (unnamed here) gave a confidently "verified" address and phone number for one of these
  cafés that turned out to directly contradict the brand's own official page when
  cross-checked. That mismatch is why this dataset leans on official pages and
  cross-source corroboration rather than any single aggregator, and why unconfirmed
  fields are left blank instead of filled with a plausible-sounding guess.
- **A note on the photos:** `imageVerified: true` (21 of 181 places — Subko Bandra, Cafe
  Mondegar, Britannia & Co., Yazdani Bakery, Bombay to Barcelona Library Café, YVR Café,
  Mimi Cafe & Bistro, Toise, Araku Coffee, The Craftery by Subko, Bombay Coffee House,
  Bustling Brew Bistro Cafe, Boojee Cafe, Jimmy Boy, The Nutcracker — Kala Ghoda, Candies,
  Blue Tokai Coffee Roasters — Bandra, Starbucks — Taj Mahal Palace Colaba, and
  Starbucks — Kala Ghoda, plus Cafe Madras and Prithvi Cafe via captioned Wikimedia Commons photos) means
  the `image` was confirmed to be a real photo of
  that specific venue, sourced from that venue's own website, a captioned/geotagged photo
  of that exact spot, or (for the last 3) that specific outlet's own Google Maps listing
  photo. The other 160 places use **representative stock photography** of the
  relevant style of space (roastery, Irani café, specialty coffee bar, etc.), not a
  verified photograph of that specific venue — the UI marks these explicitly. Chain
  branches (Blue Tokai, Third Wave, abCoffee, Starbucks, CCD, Barista, Kruti Coffee, and
  others) were deliberately left unverified even where a brand-wide photo exists,
  because a generic photo of "a Blue Tokai" isn't proof of what one particular branch
  looks like — the same bar `addressVerified` holds to. Swapping in more real,
  rights-cleared per-venue photos (e.g. via the Google Places Photos API, or with each
  business's permission) is a natural next step and requires no schema change — just a
  new `image` URL and `imageVerified: true` per place.

Swapping in a fully verified, continuously-updated dataset later does not require any UI
changes — only replacing `places.json` (`scripts/generate-real-data.mjs` documents the
sourcing approach and is a reasonable starting point for extending it).

## 10. How to add a coffee place

Open `src/data/places.json` and add a new object following the `CoffeePlace` shape in
`src/types/coffee.ts`. Minimal required fields: `id` (unique string), `name`, `area`,
`address`, `latitude`, `longitude`, `description`, `shortDescription`, `placeType`,
`priceRange`, `rating`, `reviewCount`, `openingHours`, `tags`, `coffeeStyles`,
`amenities`, `bestFor`, `signatureDrinks`, `image`, `hasFood`, `petFriendly`, `whyGo`.
The app picks it up automatically — no code changes needed. If you want it included in
the "Open Now" filter, also add `openNowHint: { open: <24h hour>, close: <24h hour> }`.

## 11. Future roadmap

The app is intentionally structured so the following can be added without a rewrite:

1. User accounts (the `CollectionContext` API can be backed by a server instead of
   `localStorage` with no change to components)
2. A real database behind `places.json` (the typed accessor in `src/data/places.ts` is
   the only file that would need to change to fetch remotely)
3. User reviews and ratings
4. A recommendation engine
5. AI-powered semantic search (search today is a plain client-side utility function —
   `src/utils/filterPlaces.ts` — that can be swapped for an API call)
6. Automated website/menu data extraction for place profiles
7. Café owner submissions and claim flows
8. Coffee bean / origin information as a first-class entity
9. Personalized recommendations based on saved/visited history
10. Notifications (e.g. "a new roastery opened in Bandra")
11. Support for multiple Indian cities (the data model already scopes places by `area`;
    a `city` field is the natural next addition)

## Testing performed

- `npx tsc -b --noEmit` — no type errors
- `npm run build` — production build succeeds
- `npm run lint` (oxlint) — no errors (one benign fast-refresh warning)
- Verified via the Vite dev server that every route/page module compiles without
  server-side transform errors
- Manually traced search/filter logic against the generated dataset (e.g. "Bandra",
  "pour over", "work" all return the expected subsets)
- Confirmed `localStorage` read/write paths are wrapped in try/catch so private
  browsing or storage errors never crash the app
- Confirmed image rendering degrades gracefully via `PlaceImage`'s `onError` fallback

## Known limitations (MVP scope)

- 142 of 181 places have a fully confirmed street address; the rest are neighbourhood-
  accurate with the exact address flagged as unverified in the UI — see §9.
- Coverage spans Mumbai, Thane, and the wider Navi Mumbai / MMR area (Kharghar, Vashi,
  CBD Belapur, Nerul, Airoli, Ghansoli, Mira-Bhayandar, Panvel, Kalyan-Dombivli, Ambernath),
  including a much deeper pass on the major chains (Starbucks, Café Coffee Day, Blue Tokai,
  Third Wave Coffee) across their official store locators, but is still not exhaustive —
  there is no live business directory or scraper behind this dataset, just targeted
  research on real, findable coffee spots. abCoffee and some further-flung pockets of the
  MMR (e.g. Ulhasnagar) still have limited or zero entries simply because no genuine
  specialty coffee spot could be verified there.
- Photos are representative stock imagery by venue type, not verified photos of each
  specific business — see §9.
- Phone/website/Instagram/email are included only where confirmed from an official or
  corroborated source; most independent cafés still don't publish a public email, so
  `email` remains blank far more often than filled in.
- "Open Now" uses a simplified same-day open/close-hour heuristic rather than full
  per-day structured hours.
- Distance is straight-line ("as the crow flies"), not routed distance or travel time,
  per the brief's instructions.
- No backend — all personal data (saved/visited) lives in the browser's `localStorage`
  and will not sync across devices.
- Map markers are grouped with `react-leaflet-cluster` so dense areas (Bandra/Khar,
  South Mumbai) stay legible instead of a pile of overlapping pins; the map also
  auto-frames to whatever set of places is currently filtered.
