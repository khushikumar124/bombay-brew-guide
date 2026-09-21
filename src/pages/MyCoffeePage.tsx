import { useMemo, useState } from 'react'
import { Heart, MapPinned, Compass, Coffee } from 'lucide-react'
import { COFFEE_PLACES } from '../data/places'
import { useCollection } from '../context/CollectionContext'
import { StatCard } from '../components/ui/StatCard'
import { PlaceCard } from '../components/place/PlaceCard'
import { EmptyState } from '../components/ui/EmptyState'
import { Link } from 'react-router-dom'

type Tab = 'saved' | 'visited' | 'favorites'

export function MyCoffeePage() {
  const { collection } = useCollection()
  const [tab, setTab] = useState<Tab>('saved')

  const savedPlaces = useMemo(
    () => COFFEE_PLACES.filter((p) => collection[p.id]?.saved),
    [collection],
  )
  const visitedPlaces = useMemo(
    () => COFFEE_PLACES.filter((p) => collection[p.id]?.visited),
    [collection],
  )
  // "Favorites" = places that are both saved and visited — the ones the
  // person has already been to and chose to keep.
  const favoritePlaces = useMemo(
    () => COFFEE_PLACES.filter((p) => collection[p.id]?.saved && collection[p.id]?.visited),
    [collection],
  )

  const neighborhoodsExplored = useMemo(
    () => new Set(visitedPlaces.map((p) => p.area)).size,
    [visitedPlaces],
  )

  const tabPlaces = tab === 'saved' ? savedPlaces : tab === 'visited' ? visitedPlaces : favoritePlaces

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8">
      <div className="flex items-center gap-3">
        <span className="gentle-bob flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-berry to-plum text-cream shadow-pop">
          <Heart size={20} />
        </span>
        <div>
          <h1 className="font-display text-[28px] font-semibold text-espresso">My Coffee</h1>
          <p className="text-[14px] text-espresso-soft">
            Your personal coffee trail across the city — saved for later, and the places you've
            actually been.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Places explored" value={visitedPlaces.length} icon={<Compass size={18} />} tone="clay" />
        <StatCard label="Saved for later" value={savedPlaces.length} icon={<Heart size={18} />} tone="plum" />
        <StatCard
          label="Neighbourhoods explored"
          value={neighborhoodsExplored}
          icon={<MapPinned size={18} />}
          tone="sage"
        />
      </div>

      <div className="mt-8 flex gap-2 border-b border-line/70">
        {(
          [
            ['saved', `Saved (${savedPlaces.length})`],
            ['visited', `Visited (${visitedPlaces.length})`],
            ['favorites', `Favorites (${favoritePlaces.length})`],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`-mb-px border-b-2 px-3 py-2.5 text-[14px] font-medium transition-colors ${
              tab === key
                ? 'border-clay text-espresso'
                : 'border-transparent text-espresso-soft hover:text-espresso'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tabPlaces.length === 0 ? (
          <div className="sm:col-span-2">
            <EmptyState
              icon={<Coffee size={22} strokeWidth={1.75} />}
              title={
                tab === 'saved'
                  ? 'Nothing saved yet'
                  : tab === 'visited'
                    ? "You haven't marked anywhere visited"
                    : 'No favorites yet'
              }
              description={
                tab === 'favorites'
                  ? 'Favorites are places you both saved and visited. Save a place, then mark it visited once you go.'
                  : 'Head to Explore and tap the heart or checkmark on a place you like.'
              }
              action={
                <Link
                  to="/"
                  className="rounded-full bg-espresso px-4 py-2 text-[13px] font-semibold text-cream"
                >
                  Explore places
                </Link>
              }
            />
          </div>
        ) : (
          tabPlaces.map((place) => <PlaceCard key={place.id} place={place} variant="grid" />)
        )}
      </div>
    </div>
  )
}
