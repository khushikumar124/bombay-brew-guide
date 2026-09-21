import type { CoffeePlace, FilterState } from '../types/coffee'
import { isOpenNow } from './hours'

function normalize(text: string): string {
  return text.toLowerCase().trim()
}

/** Client-side search across name, area, tags, coffee styles and description. */
export function searchPlaces(places: CoffeePlace[], query: string): CoffeePlace[] {
  const q = normalize(query)
  if (!q) return places

  const terms = q.split(/\s+/).filter(Boolean)

  return places.filter((place) => {
    const haystack = normalize(
      [
        place.name,
        place.area,
        place.address,
        place.description,
        place.shortDescription,
        ...place.tags,
        ...place.coffeeStyles,
        ...place.bestFor,
        ...place.amenities,
        place.placeType,
      ].join(' '),
    )
    return terms.every((term) => haystack.includes(term))
  })
}

export function applyFilters(places: CoffeePlace[], filters: FilterState): CoffeePlace[] {
  let result = places

  if (filters.query) {
    result = searchPlaces(result, filters.query)
  }

  if (filters.coffeeStyles.length > 0) {
    result = result.filter((p) =>
      filters.coffeeStyles.some((style) => p.coffeeStyles.includes(style)),
    )
  }

  if (filters.placeTypes.length > 0) {
    result = result.filter((p) => filters.placeTypes.includes(p.placeType))
  }

  if (filters.experience.length > 0) {
    result = result.filter((p) =>
      filters.experience.every((exp) => p.tags.includes(exp)),
    )
  }

  if (filters.price.length > 0) {
    result = result.filter((p) => filters.price.includes(p.priceRange))
  }

  if (filters.openNow) {
    result = result.filter((p) => isOpenNow(p))
  }

  if (filters.hasFood) {
    result = result.filter((p) => p.hasFood)
  }

  if (filters.petFriendly) {
    result = result.filter((p) => p.petFriendly)
  }

  return result
}

export function countActiveFilters(filters: FilterState): number {
  return (
    filters.coffeeStyles.length +
    filters.placeTypes.length +
    filters.experience.length +
    filters.price.length +
    (filters.openNow ? 1 : 0) +
    (filters.hasFood ? 1 : 0) +
    (filters.petFriendly ? 1 : 0)
  )
}
