interface TagPillProps {
  children: React.ReactNode
  tone?: 'default' | 'sage' | 'gold' | 'clay' | 'auto'
}

const toneClasses: Record<Exclude<TagPillProps['tone'], 'auto' | undefined>, string> = {
  default: 'bg-cream-dim text-espresso-soft',
  sage: 'bg-sage-dim text-sage',
  gold: 'bg-gold-dim text-coffee-dark',
  clay: 'bg-clay-dim text-clay',
}

const AUTO_PALETTE = [
  'bg-clay-dim text-clay',
  'bg-mint-dim text-mint',
  'bg-sky-dim text-sky',
  'bg-berry-dim text-berry',
  'bg-plum-dim text-plum',
  'bg-gold-dim text-coffee-dark',
  'bg-sage-dim text-sage',
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function TagPill({ children, tone = 'auto' }: TagPillProps) {
  const classes =
    tone === 'auto'
      ? AUTO_PALETTE[hashString(String(children)) % AUTO_PALETTE.length]
      : toneClasses[tone]

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium leading-none ${classes}`}
    >
      {children}
    </span>
  )
}
