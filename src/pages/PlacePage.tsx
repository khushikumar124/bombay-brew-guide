import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Clock,
  Globe,
  AtSign,
  Phone,
  Navigation,
  Coffee,
  Camera,
  Star,
} from 'lucide-react'
import { COFFEE_PLACES } from '../data/places'
import { Rating } from '../components/ui/Rating'
import { TagPill } from '../components/ui/TagPill'
import { SaveButton, VisitedButton } from '../components/ui/CollectionButtons'
import { PlaceImage } from '../components/place/PlaceImage'
import { EmptyState } from '../components/ui/EmptyState'

export function PlacePage() {
  const { id } = useParams<{ id: string }>()
  const place = COFFEE_PLACES.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [id])

  if (!place) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-16">
        <EmptyState
          title="We couldn't find that place"
          description="It may have been removed, or the link might be off. Head back to Explore to keep browsing."
          action={
            <Link
              to="/"
              className="rounded-full bg-espresso px-4 py-2 text-[13px] font-semibold text-cream"
            >
              Back to Explore
            </Link>
          }
        />
      </div>
    )
  }

  // When we have a confirmed exact address, let Google resolve the destination by
  // name + address (matches its own business listing precisely) rather than our
  // stored lat/lng, which is only ever an approximation. Unverified addresses fall
  // back to coordinates since we don't have anything more precise to offer.
  const directionsUrl = place.addressVerified
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${place.name}, ${place.address}`)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`
  const reviewUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${place.area} Mumbai`)}`

  return (
    <div className="mx-auto w-full max-w-4xl pb-20">
      <div className="px-5 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-espresso-soft hover:text-espresso"
        >
          <ArrowLeft size={15} />
          Back to Explore
        </Link>
      </div>

      <div className="relative mt-3 h-[280px] w-full overflow-hidden rounded-3xl px-5 sm:h-[360px]">
        <PlaceImage src={place.image} alt={place.name} className="h-full w-full rounded-3xl object-cover" />
        {!place.imageVerified && (
          <span className="absolute bottom-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-espresso/80 px-3 py-1 text-[12px] font-medium text-cream backdrop-blur-sm">
            <Camera size={13} />
            Representative stock photo, not this exact venue
          </span>
        )}
      </div>

      <div className="px-5">
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-display text-[30px] font-semibold leading-tight text-espresso sm:text-[36px]">
              {place.name}
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-espresso-soft">
              <MapPin size={14} />
              {place.address}
            </p>
            {!place.addressVerified && (
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-clay">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
                Exact address not independently confirmed — neighbourhood is accurate, please
                verify before heading out.
              </p>
            )}
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <Rating rating={place.rating} reviewCount={place.reviewCount} />
              <TagPill tone="gold">{place.priceRange}</TagPill>
              <TagPill>{place.placeType}</TagPill>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <SaveButton placeId={place.id} variant="full" />
            <VisitedButton placeId={place.id} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {place.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>

        <section className="mt-7 rounded-2xl border border-clay/20 bg-gradient-to-br from-clay-dim/70 via-gold-dim/50 to-cream p-5">
          <h2 className="flex items-center gap-2 font-display text-[18px] font-semibold text-espresso">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-clay to-gold text-cream">
              <Coffee size={14} />
            </span>
            Why go?
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-espresso-soft">{place.whyGo}</p>
        </section>

        <section className="mt-6">
          <h2 className="font-display text-[18px] font-semibold text-espresso">About</h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-espresso-soft">
            {place.description}
          </p>
        </section>

        <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <section>
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-espresso-soft/70">
              Coffee styles
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {place.coffeeStyles.map((style) => (
                <TagPill key={style} tone="clay">
                  {style}
                </TagPill>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-espresso-soft/70">
              Signature drinks
            </h3>
            <ul className="mt-2 space-y-1 text-[14px] text-espresso-soft">
              {place.signatureDrinks.map((drink) => (
                <li key={drink}>{drink}</li>
              ))}
            </ul>
          </section>

          {(place.amenities.length > 0 || place.hasFood || place.petFriendly) && (
            <section>
              <h3 className="text-[13px] font-semibold uppercase tracking-wide text-espresso-soft/70">
                Amenities
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {place.amenities.map((a) => (
                  <TagPill key={a}>{a}</TagPill>
                ))}
                {place.hasFood && <TagPill>Has food</TagPill>}
                {place.petFriendly && <TagPill>Pet friendly</TagPill>}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-espresso-soft/70">
              Best for
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {place.bestFor.map((b) => (
                <TagPill key={b} tone="sage">
                  {b}
                </TagPill>
              ))}
            </div>
          </section>
        </div>

        {(place.roaster || place.origin) && (
          <section className="mt-6 rounded-2xl border border-line/70 p-4">
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-espresso-soft/70">
              Beans
            </h3>
            <p className="mt-1.5 text-[14px] text-espresso-soft">
              {place.roaster && <>Roaster: {place.roaster}. </>}
              {place.origin && <>Origin: {place.origin}.</>}
            </p>
          </section>
        )}

        <section className="mt-6">
          <h3 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-espresso-soft/70">
            <Clock size={14} />
            Opening hours
          </h3>
          <dl className="mt-2 space-y-1">
            {Object.entries(place.openingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-[14px] text-espresso-soft">
                <dt>{day}</dt>
                <dd>{hours}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="tap-bounce flex items-center gap-2 rounded-full bg-espresso px-4 py-2.5 text-[14px] font-semibold text-cream transition-opacity hover:opacity-90"
          >
            <Navigation size={15} />
            Directions
          </a>
          {place.website && (
            <a
              href={place.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[14px] font-medium text-espresso hover:border-coffee/40"
            >
              <Globe size={15} />
              Website
            </a>
          )}
          {place.instagram && (
            <a
              href={`https://instagram.com/${place.instagram.replace(/^@/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[14px] font-medium text-espresso-soft hover:border-coffee/40"
            >
              <AtSign size={15} />
              {place.instagram}
            </a>
          )}
          {place.twitter && (
            <a
              href={`https://x.com/${place.twitter.replace(/^@/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[14px] font-medium text-espresso-soft hover:border-coffee/40"
            >
              <AtSign size={15} />
              {place.twitter}
            </a>
          )}
          {place.phone && (
            <a
              href={`tel:${place.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[14px] font-medium text-espresso-soft hover:border-coffee/40"
            >
              <Phone size={15} />
              {place.phone}
            </a>
          )}
          {place.email && (
            <a
              href={`mailto:${place.email}`}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[14px] font-medium text-espresso-soft hover:border-coffee/40"
            >
              <AtSign size={15} />
              {place.email}
            </a>
          )}
          <a
            href={reviewUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[14px] font-medium text-espresso-soft hover:border-coffee/40"
          >
            <Star size={15} />
            Leave a review
          </a>
        </div>
      </div>
    </div>
  )
}
