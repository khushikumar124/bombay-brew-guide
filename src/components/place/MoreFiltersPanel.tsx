import type { CoffeeStyle, ExperienceTag, FilterState, PlaceType, PriceRange } from '../../types/coffee'
import { toggleValue } from '../../utils/array'
import { EMPTY_FILTERS } from '../../types/coffee'

interface Props {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onClose: () => void
}

const ALL_COFFEE_STYLES: CoffeeStyle[] = [
  'Specialty Coffee',
  'Espresso',
  'Pour-over',
  'Cold Brew',
  'Filter Coffee',
]
const ALL_PLACE_TYPES: PlaceType[] = ['Cafe', 'Roastery', 'Takeaway', 'Coffee Bar']
const ALL_EXPERIENCE: ExperienceTag[] = [
  'Work Friendly',
  'Quiet',
  'Date Spot',
  'Outdoor Seating',
  'Good for Quick Coffee',
]
const ALL_PRICE: PriceRange[] = ['₹', '₹₹', '₹₹₹']

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
        active
          ? 'border-coffee bg-coffee text-cream'
          : 'border-line bg-white/60 text-espresso-soft hover:border-coffee/40'
      }`}
    >
      {children}
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-[12px] font-semibold uppercase tracking-wide text-espresso-soft/70">
        {title}
      </h4>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

export function MoreFiltersPanel({ filters, onChange, onClose }: Props) {
  return (
    <div className="absolute right-0 top-[calc(100%+8px)] z-[1100] w-[min(90vw,380px)] rounded-2xl border border-line bg-cream p-4 shadow-card">
      <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
        <Section title="Coffee style">
          {ALL_COFFEE_STYLES.map((style) => (
            <Chip
              key={style}
              active={filters.coffeeStyles.includes(style)}
              onClick={() =>
                onChange({ ...filters, coffeeStyles: toggleValue(filters.coffeeStyles, style) })
              }
            >
              {style}
            </Chip>
          ))}
        </Section>

        <Section title="Place type">
          {ALL_PLACE_TYPES.map((type) => (
            <Chip
              key={type}
              active={filters.placeTypes.includes(type)}
              onClick={() =>
                onChange({ ...filters, placeTypes: toggleValue(filters.placeTypes, type) })
              }
            >
              {type}
            </Chip>
          ))}
        </Section>

        <Section title="Experience">
          {ALL_EXPERIENCE.map((exp) => (
            <Chip
              key={exp}
              active={filters.experience.includes(exp)}
              onClick={() =>
                onChange({ ...filters, experience: toggleValue(filters.experience, exp) })
              }
            >
              {exp}
            </Chip>
          ))}
        </Section>

        <Section title="Price">
          {ALL_PRICE.map((price) => (
            <Chip
              key={price}
              active={filters.price.includes(price)}
              onClick={() => onChange({ ...filters, price: toggleValue(filters.price, price) })}
            >
              {price}
            </Chip>
          ))}
        </Section>

        <Section title="More">
          <Chip active={filters.hasFood} onClick={() => onChange({ ...filters, hasFood: !filters.hasFood })}>
            Has food
          </Chip>
          <Chip
            active={filters.petFriendly}
            onClick={() => onChange({ ...filters, petFriendly: !filters.petFriendly })}
          >
            Pet friendly
          </Chip>
        </Section>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <button
          type="button"
          onClick={() => onChange({ ...EMPTY_FILTERS, query: filters.query })}
          className="text-[13px] font-medium text-espresso-soft underline-offset-2 hover:underline"
        >
          Clear all
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-espresso px-4 py-2 text-[13px] font-semibold text-cream"
        >
          Done
        </button>
      </div>
    </div>
  )
}
