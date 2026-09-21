import { Sparkles } from 'lucide-react'
import type { CoffeePlace } from '../../types/coffee'
import type { CollectionTone } from '../../utils/discovery'
import { PlaceCard } from './PlaceCard'

interface Props {
  title: string
  description?: string
  places: CoffeePlace[]
  tone?: CollectionTone
}

const TONE_CLASSES: Record<CollectionTone, string> = {
  clay: 'bg-gradient-to-br from-clay to-gold text-cream',
  sky: 'bg-gradient-to-br from-sky to-plum text-cream',
  gold: 'bg-gradient-to-br from-gold to-clay text-cream',
  mint: 'bg-gradient-to-br from-mint to-sky text-cream',
  berry: 'bg-gradient-to-br from-berry to-plum text-cream',
  plum: 'bg-gradient-to-br from-plum to-berry text-cream',
}

export function DiscoveryShelf({ title, description, places, tone = 'clay' }: Props) {
  return (
    <section>
      <div className="mb-3 flex items-start gap-3">
        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-pop ${TONE_CLASSES[tone]}`}>
          <Sparkles size={16} />
        </span>
        <div>
          <h2 className="font-display text-[19px] font-semibold text-espresso">{title}</h2>
          {description && <p className="text-[13px] text-espresso-soft">{description}</p>}
        </div>
      </div>
      <div className="-mx-5 flex gap-3.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {places.map((place) => (
          <div key={place.id} className="w-[240px] shrink-0">
            <PlaceCard place={place} variant="grid" />
          </div>
        ))}
      </div>
    </section>
  )
}
