import type { CoffeePlace } from '../types/coffee'
import { haversineDistanceKm, type LatLng } from './distance'

export type SortOption = 'relevance' | 'rating' | 'distance' | 'name'

export function sortPlaces(
  places: CoffeePlace[],
  sortBy: SortOption,
  userLocation: LatLng | null,
): CoffeePlace[] {
  const list = [...places]

  switch (sortBy) {
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating)
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    case 'distance':
      if (!userLocation) return list
      return list.sort(
        (a, b) =>
          haversineDistanceKm(userLocation, { lat: a.latitude, lng: a.longitude }) -
          haversineDistanceKm(userLocation, { lat: b.latitude, lng: b.longitude }),
      )
    case 'relevance':
    default:
      return list
  }
}
