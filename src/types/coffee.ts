// Core domain types for Bombay Brew Guide.
// Kept intentionally flat and serializable so this dataset can later be
// swapped for a real database / ingestion pipeline without touching the UI.

export type PlaceType = 'Cafe' | 'Roastery' | 'Takeaway' | 'Coffee Bar'

export type PriceRange = '₹' | '₹₹' | '₹₹₹'

export type CoffeeStyle =
  | 'Specialty Coffee'
  | 'Espresso'
  | 'Pour-over'
  | 'Cold Brew'
  | 'Filter Coffee'

export type ExperienceTag =
  | 'Work Friendly'
  | 'Quiet'
  | 'Date Spot'
  | 'Outdoor Seating'
  | 'Good for Quick Coffee'

export interface OpeningHours {
  /** e.g. "8:00 AM – 11:00 PM". Kept as a single display string per day. */
  [day: string]: string
}

export interface CoffeePlace {
  id: string
  name: string
  area: string
  address: string
  /** True when the exact street address was confirmed from an official
   * source or 2+ independent reputable sources. False means only the
   * neighbourhood is confirmed — shown to the user as "check before you go". */
  addressVerified: boolean
  latitude: number
  longitude: number
  description: string
  shortDescription: string
  placeType: PlaceType
  priceRange: PriceRange
  rating: number
  reviewCount: number
  website?: string
  instagram?: string
  twitter?: string
  phone?: string
  /** Only ever populated from a confirmed official source — never guessed. */
  email?: string
  openingHours: OpeningHours
  tags: string[]
  coffeeStyles: CoffeeStyle[]
  amenities: string[]
  bestFor: string[]
  signatureDrinks: string[]
  roaster?: string
  origin?: string
  image: string
  /** True when `image` is a real photo of this specific venue (sourced from
   * its own website/Instagram). False/undefined means it's a generic stock
   * photo representative of the place type — shown to the user as such. */
  imageVerified?: boolean
  hasFood: boolean
  petFriendly: boolean
  /** Simple heuristic used for "Open Now" filter — see utils/hours.ts */
  openNowHint?: { open: number; close: number }
  /** Short "Why go?" blurb shown on the place profile. */
  whyGo: string
}

/** User-owned state, persisted to localStorage. Deliberately separate from
 * the curated CoffeePlace records so a future backend can own place data
 * while the client continues to own personal state (or syncs it per-user). */
export interface UserPlaceState {
  saved: boolean
  visited: boolean
  visitedAt?: string
}

export type UserCollection = Record<string, UserPlaceState>

export interface FilterState {
  query: string
  coffeeStyles: CoffeeStyle[]
  placeTypes: PlaceType[]
  experience: ExperienceTag[]
  price: PriceRange[]
  openNow: boolean
  hasFood: boolean
  petFriendly: boolean
}

export const EMPTY_FILTERS: FilterState = {
  query: '',
  coffeeStyles: [],
  placeTypes: [],
  experience: [],
  price: [],
  openNow: false,
  hasFood: false,
  petFriendly: false,
}
