const STAT_COLORS = ['sage', 'clay', 'sky', 'plum'] as const

function StatChip({ value, label, color }: { value: string; label: string; color: (typeof STAT_COLORS)[number] }) {
  const toneMap: Record<(typeof STAT_COLORS)[number], string> = {
    sage: 'bg-sage-dim text-sage',
    clay: 'bg-clay-dim text-clay',
    sky: 'bg-sky-dim text-sky',
    plum: 'bg-plum-dim text-plum',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold ${toneMap[color]}`}>
      <strong className="font-display text-[14px]">{value}</strong>
      {label}
    </span>
  )
}

export function ExploreHero({ placeCount, areaCount }: { placeCount: number; areaCount: number }) {
  return (
    <div className="relative overflow-hidden border-b border-line/70 bg-gradient-to-br from-cream via-cream to-gold-dim/40 px-5 pb-5 pt-6">
      <div className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-clay-dim/50 blur-2xl" aria-hidden />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-mint-dim/60 blur-2xl" aria-hidden />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="gentle-bob relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso text-cream shadow-pop">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 9h13a3 3 0 0 1 0 6h-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M4 9v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 6c0-1 1-1 1-2s-1-1-1-2M11 6c0-1 1-1 1-2s-1-1-1-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <h1 className="font-display text-[26px] font-semibold leading-none text-espresso sm:text-[30px]">
              Where should you <span className="text-clay">actually</span> go for coffee?
            </h1>
          </div>
          <div className="squiggle-divider mt-2 ml-14 w-40" aria-hidden />
          <p className="mt-2 ml-14 max-w-md text-[13.5px] text-espresso-soft">
            Real Mumbai cafés, roasteries and coffee counters — picked for the coffee, not just
            the pin on a map.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pb-0.5 sm:pb-1">
          <StatChip value={String(placeCount)} label="spots" color="clay" />
          <StatChip value={String(areaCount)} label="neighbourhoods" color="sage" />
          <StatChip value="0 fees" label="to use" color="sky" />
        </div>
      </div>
    </div>
  )
}
