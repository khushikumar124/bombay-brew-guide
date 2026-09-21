import { useState, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { FilterState } from '../../types/coffee'
import { QUICK_FILTERS } from '../../data/quickFilters'
import type { ChipColor } from '../../data/quickFilters'
import { toggleValue } from '../../utils/array'
import { countActiveFilters } from '../../utils/filterPlaces'
import { MoreFiltersPanel } from './MoreFiltersPanel'

const CHIP_ACTIVE_CLASSES: Record<ChipColor, string> = {
  clay: 'border-clay bg-clay text-cream',
  mint: 'border-mint bg-mint text-cream',
  sky: 'border-sky bg-sky text-cream',
  berry: 'border-berry bg-berry text-cream',
  gold: 'border-gold bg-gold text-espresso',
  sage: 'border-sage bg-sage text-cream',
  plum: 'border-plum bg-plum text-cream',
}

interface FilterBarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

function isQuickFilterActive(filters: FilterState, key: (typeof QUICK_FILTERS)[number]['key']) {
  if (key.field === 'openNow') return filters.openNow
  return (filters[key.field] as string[]).includes(key.value)
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const [morePanelOpen, setMorePanelOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const activeCount = countActiveFilters(filters)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMorePanelOpen(false)
      }
    }
    if (morePanelOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [morePanelOpen])

  function toggleQuick(key: (typeof QUICK_FILTERS)[number]['key']) {
    if (key.field === 'openNow') {
      onChange({ ...filters, openNow: !filters.openNow })
      return
    }
    onChange({
      ...filters,
      [key.field]: toggleValue(filters[key.field] as string[], key.value),
    })
  }

  return (
    <div className="relative z-[1000] border-b border-line/70 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-soft/60"
            />
            <input
              type="search"
              value={filters.query}
              onChange={(e) => onChange({ ...filters, query: e.target.value })}
              placeholder="Search cafés, neighbourhoods, 'pour over', 'work friendly'…"
              aria-label="Search coffee places"
              className="w-full rounded-full border border-line bg-white/70 py-2.5 pl-10 pr-9 text-[14px] text-espresso placeholder:text-espresso-soft/50 transition-colors focus:border-clay focus:outline-none"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => onChange({ ...filters, query: '' })}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso-soft/60 hover:text-espresso"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="relative" ref={panelRef}>
            <button
              type="button"
              onClick={() => setMorePanelOpen((v) => !v)}
              aria-expanded={morePanelOpen}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
                activeCount > 0
                  ? 'border-clay bg-clay/10 text-clay'
                  : 'border-line text-espresso-soft hover:border-coffee/40'
              }`}
            >
              <SlidersHorizontal size={15} />
              <span className="hidden sm:inline">Filters</span>
              {activeCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[11px] font-semibold text-cream">
                  {activeCount}
                </span>
              )}
            </button>

            {morePanelOpen && (
              <MoreFiltersPanel
                filters={filters}
                onChange={onChange}
                onClose={() => setMorePanelOpen(false)}
              />
            )}
          </div>
        </div>

        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {QUICK_FILTERS.map(({ label, key, color }) => {
            const active = isQuickFilterActive(filters, key)
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleQuick(key)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                  active
                    ? `${CHIP_ACTIVE_CLASSES[color]} shadow-pop scale-[1.03]`
                    : 'border-line bg-white/50 text-espresso-soft hover:border-coffee/40 hover:text-espresso'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
