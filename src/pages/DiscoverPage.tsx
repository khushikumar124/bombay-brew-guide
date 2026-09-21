import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { COFFEE_PLACES, ALL_AREAS } from '../data/places'
import { buildDiscoveryCollections, placesByArea } from '../utils/discovery'
import { DiscoveryShelf } from '../components/place/DiscoveryShelf'
import { PlaceCard } from '../components/place/PlaceCard'
import { CoffeeFactBanner } from '../components/ui/CoffeeFactBanner'

export function DiscoverPage() {
  const [selectedArea, setSelectedArea] = useState(ALL_AREAS[0])
  const collections = useMemo(() => buildDiscoveryCollections(COFFEE_PLACES), [])
  const areaPlaces = useMemo(
    () => placesByArea(COFFEE_PLACES, selectedArea).slice(0, 8),
    [selectedArea],
  )

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8">
      <div className="flex items-center gap-3">
        <span className="gentle-bob flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-plum to-berry text-cream shadow-pop">
          <Sparkles size={20} />
        </span>
        <div>
          <h1 className="font-display text-[28px] font-semibold text-espresso">Discover</h1>
          <p className="text-[14px] text-espresso-soft">
            Curated ways into the city's coffee scene, built from the same data on the map.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <CoffeeFactBanner />
      </div>

      <div className="mt-9 flex flex-col gap-9">
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-[19px] font-semibold text-espresso">
                Coffee around {selectedArea}
              </h2>
              <p className="text-[13px] text-espresso-soft">Pick a neighbourhood to explore.</p>
            </div>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              aria-label="Choose a neighbourhood"
              className="rounded-full border border-line bg-white/60 px-3 py-1.5 text-[13px] text-espresso focus:border-clay focus:outline-none"
            >
              {ALL_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          <div className="-mx-5 flex gap-3.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {areaPlaces.map((place) => (
              <div key={place.id} className="w-[240px] shrink-0">
                <PlaceCard place={place} variant="grid" />
              </div>
            ))}
          </div>
        </section>

        {collections.map((collection) => (
          <DiscoveryShelf
            key={collection.id}
            title={collection.title}
            description={collection.description}
            places={collection.places}
            tone={collection.tone}
          />
        ))}
      </div>
    </div>
  )
}
