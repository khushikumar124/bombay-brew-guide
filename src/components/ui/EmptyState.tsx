import type { ReactNode } from 'react'
import { Coffee } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-dashed border-line bg-cream-dim/60 px-6 py-14 text-center">
      <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-clay-dim/60 blur-xl" aria-hidden />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-mint-dim/60 blur-xl" aria-hidden />
      <div className="gentle-bob relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-clay to-gold text-cream shadow-pop">
        {icon ?? <Coffee size={24} strokeWidth={1.75} />}
      </div>
      <h3 className="relative font-display text-lg font-semibold text-espresso">{title}</h3>
      <p className="relative max-w-xs text-[14px] leading-relaxed text-espresso-soft">{description}</p>
      {action && <div className="relative">{action}</div>}
    </div>
  )
}
