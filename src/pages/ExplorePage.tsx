import { useMemo, useState } from 'react'
import { Coffee } from 'lucide-react'
import { EMPTY_FILTERS } from '../types/coffee'
import type { FilterState } from '../types/coffee'
import { COFFEE_PLACES } from '../data/places'
import { applyFilters } from '../utils/filterPlaces'
import { sortPlaces } from '../utils/sort'
import type { SortOption } from '../utils/sort'
import { haversineDistanceKm, formatDistance } from '../utils/distance'
import { useGeolocation } from '../hooks/useGeolocation'
import { FilterBar } from '../components/place/FilterBar'
import { PlaceCard } from '../components/place/PlaceCard'
import { ExploreHero } from '../components/place/ExploreHero'
import { MapView } from '../components/map/MapView'
import { MapLegend } from '../components/map/MapLegend'
import { NearMeButton } from '../components/map/NearMeButton'
import { EmptyState } from '../components/ui/EmptyState'
import { ALL_AREAS } from '../data/places'

export function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { location, status, requestLocation } = useGeolocation()

  const filtered = useMemo(() => applyFilters(COFFEE_PLACES, filters), [filters])
  const sorted = useMemo(
    () => sortPlaces(filtered, sortBy, location),
    [filtered, sortBy, location],
  )

  function handleNearMe() {
    requestLocation()
    setSortBy('distance')
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ExploreHero placeCount={COFFEE_PLACES.length} areaCount={ALL_AREAS.length} />
      <FilterBar filters={filters} onChange={setFilters} />

      <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col md:flex-row">
        {/* Desktop / tablet sidebar list */}
        <aside className="hidden min-h-0 w-[400px] shrink-0 border-r border-line/70 md:flex md:flex-col">
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <p className="text-[13px] font-medium text-espresso-soft">
              {sorted.length} {sorted.length === 1 ? 'place' : 'places'}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort places"
              className="rounded-full border border-line bg-white/60 px-2.5 py-1 text-[12.5px] text-espresso-soft focus:border-clay focus:outline-none"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Top rated</option>
              <option value="name">Name (A–Z)</option>
              {location && <option value="distance">Nearest</option>}
            </select>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto px-4 pb-6">
            {sorted.length === 0 ? (
              <EmptyState
                title="No places match your filters"
                description="Try removing a filter or searching for another neighbourhood."
                icon={<Coffee size={22} strokeWidth={1.75} />}
                action={
                  <button
                    type="button"
                    onClick={() => setFilters(EMPTY_FILTERS)}
                    className="rounded-full bg-espresso px-4 py-2 text-[13px] font-semibold text-cream"
                  >
                    Clear filters
                  </button>
                }
              />
            ) : (
              sorted.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onHover={setHoveredId}
                  distanceLabel={
                    location
                      ? formatDistance(
                          haversineDistanceKm(location, {
                            lat: place.latitude,
                            lng: place.longitude,
                          }),
                        )
                      : undefined
                  }
                />
              ))
            )}
          </div>
        </aside>

        {/* Map */}
        <div className="relative h-[46vh] w-full shrink-0 md:h-auto md:flex-1">
          <div className="absolute left-3 top-3 z-[900]">
            <MapLegend />
          </div>
          <div className="absolute right-3 top-3 z-[900]">
            <NearMeButton status={status} onClick={handleNearMe} />
          </div>
          <MapView places={sorted} activePlaceId={hoveredId} userLocation={location} />
        </div>

        {/* Mobile scrollable card strip */}
        <div className="flex flex-col gap-2 border-t border-line/70 bg-cream px-4 pb-4 pt-3 md:hidden">
          <p className="text-[13px] font-medium text-espresso-soft">
            {sorted.length} {sorted.length === 1 ? 'place' : 'places'} nearby
          </p>
          {sorted.length === 0 ? (
            <EmptyState
              title="No places match your filters"
              description="Try removing a filter or searching for another neighbourhood."
              action={
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="rounded-full bg-espresso px-4 py-2 text-[13px] font-semibold text-cream"
                >
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {sorted.map((place) => (
                <div key={place.id} className="w-[85vw] shrink-0 snap-start">
                  <PlaceCard
                    place={place}
                    variant="grid"
                    distanceLabel={
                      location
                        ? formatDistance(
                            haversineDistanceKm(location, {
                              lat: place.latitude,
                              lng: place.longitude,
                            }),
                          )
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
