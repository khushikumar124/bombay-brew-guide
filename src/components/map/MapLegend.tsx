import { PLACE_TYPE_COLORS } from './markerIcon'

export function MapLegend() {
  return (
    <div className="hidden flex-wrap items-center gap-2.5 rounded-full border border-line bg-cream/95 px-3.5 py-2 shadow-card sm:flex">
      {Object.entries(PLACE_TYPE_COLORS).map(([type, color]) => (
        <span key={type} className="flex items-center gap-1.5 text-[12px] font-medium text-espresso-soft">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden
          />
          {type}
        </span>
      ))}
    </div>
  )
}
