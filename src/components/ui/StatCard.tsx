interface StatCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  tone?: 'clay' | 'sage' | 'sky' | 'plum'
}

const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  clay: 'bg-gradient-to-br from-clay to-gold text-cream',
  sage: 'bg-gradient-to-br from-sage to-mint text-cream',
  sky: 'bg-gradient-to-br from-sky to-plum text-cream',
  plum: 'bg-gradient-to-br from-plum to-berry text-cream',
}

export function StatCard({ label, value, icon, tone = 'clay' }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line/70 bg-white/60 px-4 py-3.5 shadow-card transition-transform hover:-translate-y-0.5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-pop ${toneClasses[tone]}`}>
        {icon}
      </div>
      <div>
        <p className="font-display text-[22px] font-semibold leading-none text-espresso">{value}</p>
        <p className="mt-1 text-[12.5px] text-espresso-soft">{label}</p>
      </div>
    </div>
  )
}
