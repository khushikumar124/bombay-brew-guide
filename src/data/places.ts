import raw from './places.json'
import type { CoffeePlace } from '../types/coffee'

// The JSON file is the "source of truth" seed dataset — kept as plain JSON
// so a future ingestion pipeline (scraper, CMS export, DB dump) can replace
// it without touching any TypeScript. This module is the only place that
// casts it to the app's CoffeePlace type.
export const COFFEE_PLACES: CoffeePlace[] = raw as unknown as CoffeePlace[]

export const ALL_AREAS: string[] = Array.from(
  new Set(COFFEE_PLACES.map((p) => p.area)),
).sort()
