import type { CoffeePlace } from '../types/coffee'

export type CollectionTone = 'clay' | 'sky' | 'gold' | 'mint' | 'berry' | 'plum'

export interface DiscoveryCollection {
  id: string
  title: string
  description: string
  places: CoffeePlace[]
  tone: CollectionTone
}

function topBy(places: CoffeePlace[], compare: (a: CoffeePlace, b: CoffeePlace) => number, n: number) {
  return [...places].sort(compare).slice(0, n)
}

export function buildDiscoveryCollections(places: CoffeePlace[]): DiscoveryCollection[] {
  const collections: DiscoveryCollection[] = []

  collections.push({
    id: 'specialty',
    title: 'Great specialty coffee',
    description: 'Places built around single-origin beans and careful brewing.',
    tone: 'clay',
    places: topBy(
      places.filter((p) => p.coffeeStyles.includes('Specialty Coffee')),
      (a, b) => b.rating - a.rating,
      8,
    ),
  })

  collections.push({
    id: 'work-friendly',
    title: 'Good places to work',
    description: 'Quiet corners, power outlets, and coffee that lasts a few hours.',
    tone: 'sky',
    places: topBy(
      places.filter((p) => p.tags.includes('Work Friendly')),
      (a, b) => b.rating - a.rating,
      8,
    ),
  })

  collections.push({
    id: 'slow-mornings',
    title: 'Best for slow mornings',
    description: 'No rush required — good for a book, a journal, or just people-watching.',
    tone: 'gold',
    places: topBy(
      places.filter((p) => p.bestFor.includes('Slow mornings')),
      (a, b) => b.rating - a.rating,
      8,
    ),
  })

  collections.push({
    id: 'quick-coffee',
    title: 'Quick coffee stops',
    description: "For when you just need a good cup, fast — no laptop required.",
    tone: 'mint',
    places: topBy(
      places.filter(
        (p) => p.tags.includes('Good for Quick Coffee') || p.placeType === 'Takeaway',
      ),
      (a, b) => b.rating - a.rating,
      8,
    ),
  })

  collections.push({
    id: 'hidden-gems',
    title: 'Hidden gems',
    description: 'Highly rated, but not yet crowded — worth finding before everyone else does.',
    tone: 'plum',
    places: topBy(
      places.filter((p) => p.rating >= 4.4 && p.reviewCount < 120),
      (a, b) => b.rating - a.rating,
      8,
    ),
  })

  collections.push({
    id: 'date-spots',
    title: 'Good for a date',
    description: 'A little more atmosphere, a little less rush.',
    tone: 'berry',
    places: topBy(
      places.filter((p) => p.tags.includes('Date Spot')),
      (a, b) => b.rating - a.rating,
      8,
    ),
  })

  return collections.filter((c) => c.places.length > 0)
}

export function placesByArea(places: CoffeePlace[], area: string): CoffeePlace[] {
  return [...places.filter((p) => p.area === area)].sort((a, b) => b.rating - a.rating)
}
