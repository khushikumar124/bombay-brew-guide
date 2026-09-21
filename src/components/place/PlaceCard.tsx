import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { CoffeePlace } from '../../types/coffee'
import { Rating } from '../ui/Rating'
import { TagPill } from '../ui/TagPill'
import { SaveButton } from '../ui/CollectionButtons'
import { PlaceImage } from './PlaceImage'
import { PLACE_TYPE_COLORS } from '../map/markerIcon'

interface PlaceCardProps {
  place: CoffeePlace
  distanceLabel?: string
  onHover?: (id: string | null) => void
  variant?: 'row' | 'grid'
}

export function PlaceCard({ place, distanceLabel, onHover, variant = 'row' }: PlaceCardProps) {
  const isGrid = variant === 'grid'

  return (
    <Link
      to={`/place/${place.id}`}
      onMouseEnter={() => onHover?.(place.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group flex overflow-hidden rounded-[26px] border-2 border-line/70 bg-white/60 shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:rotate-[-0.6deg] hover:border-clay/60 hover:shadow-pop ${
        isGrid ? 'flex-col' : 'flex-row'
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden ${isGrid ? 'h-36 w-full' : 'h-28 w-28 sm:h-32 sm:w-32'}`}>
        <PlaceImage
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-cream/90 px-2 py-0.5 text-[10.5px] font-semibold text-espresso-soft shadow-sm"
          title={place.placeType}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: PLACE_TYPE_COLORS[place.placeType] }}
            aria-hidden
          />
          {place.placeType}
        </span>
        <div className="absolute right-2 top-2">
          <SaveButton placeId={place.id} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5 p-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-display text-[16px] font-semibold text-espresso">
              {place.name}
            </h3>
            <span className="shrink-0 text-[13px] font-medium text-espresso-soft">
              {place.priceRange}
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] text-espresso-soft">
            <MapPin size={12} />
            {place.area}
            {distanceLabel && <span className="text-espresso-soft/60">· {distanceLabel}</span>}
          </p>
        </div>

        <p className="line-clamp-2 text-[13px] leading-snug text-espresso-soft">
          {place.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <Rating rating={place.rating} reviewCount={place.reviewCount} />
          {place.tags.slice(0, 2).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      </div>
    </Link>
  )
}
