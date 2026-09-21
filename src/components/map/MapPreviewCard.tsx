import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import type { CoffeePlace } from '../../types/coffee'
import { Rating } from '../ui/Rating'
import { SaveButton } from '../ui/CollectionButtons'
import { PlaceImage } from '../place/PlaceImage'

export function MapPreviewCard({ place, distanceLabel }: { place: CoffeePlace; distanceLabel?: string }) {
  return (
    <div className="w-[240px] overflow-hidden rounded-xl">
      <div className="relative h-28 w-full">
        <PlaceImage src={place.image} alt={place.name} className="h-full w-full object-cover" />
        <div className="absolute right-2 top-2">
          <SaveButton placeId={place.id} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 bg-cream p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-[15px] font-semibold leading-tight text-espresso">
            {place.name}
          </h4>
          <span className="shrink-0 text-[12px] font-medium text-espresso-soft">
            {place.priceRange}
          </span>
        </div>
        <p className="flex items-center gap-1 text-[12px] text-espresso-soft">
          <MapPin size={11} />
          {place.area}
          {distanceLabel && <span className="text-espresso-soft/60">· {distanceLabel}</span>}
        </p>
        <Rating rating={place.rating} reviewCount={place.reviewCount} size={12} />
        <Link
          to={`/place/${place.id}`}
          className="mt-1 flex items-center justify-center gap-1 rounded-full bg-espresso py-1.5 text-[12.5px] font-semibold text-cream transition-opacity hover:opacity-90"
        >
          View profile
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
