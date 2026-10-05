import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, Navigation } from 'lucide-react'
import type { CoffeePlace } from '../../types/coffee'
import type { LatLng } from '../../utils/distance'
import { getDirectionsUrl } from '../../utils/directions'
import { Rating } from '../ui/Rating'
import { SaveButton } from '../ui/CollectionButtons'
import { PlaceImage } from '../place/PlaceImage'

interface MapPreviewCardProps {
  place: CoffeePlace
  distanceLabel?: string
  userLocation?: LatLng | null
}

export function MapPreviewCard({ place, distanceLabel, userLocation }: MapPreviewCardProps) {
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
        <div className="mt-1 flex gap-1.5">
          <Link
            to={`/place/${place.id}`}
            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-espresso py-1.5 text-[12.5px] font-semibold text-cream transition-opacity hover:opacity-90"
          >
            View profile
            <ArrowRight size={13} />
          </Link>
          <a
            href={getDirectionsUrl(place, userLocation)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Get directions to ${place.name} on Google Maps`}
            className="flex flex-1 items-center justify-center gap-1 rounded-full border-2 border-line bg-white/70 py-1.5 text-[12.5px] font-semibold text-espresso transition-colors hover:border-clay"
          >
            <Navigation size={12} />
            Directions
          </a>
        </div>
      </div>
    </div>
  )
}
