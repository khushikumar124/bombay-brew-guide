import type { CoffeePlace } from '../types/coffee'

/**
 * MVP heuristic: openNowHint stores a same-day open/close hour (24h clock).
 * This is intentionally simple — a future version can replace it with real
 * per-day structured hours without changing the filter's public behaviour.
 */
export function isOpenNow(place: CoffeePlace, now: Date = new Date()): boolean {
  if (!place.openNowHint) return true
  const hour = now.getHours() + now.getMinutes() / 60
  const { open, close } = place.openNowHint
  return hour >= open && hour < close
}
