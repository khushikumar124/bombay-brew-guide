import { Star } from 'lucide-react'

interface RatingProps {
  rating: number
  reviewCount?: number
  size?: number
}

export function Rating({ rating, reviewCount, size = 14 }: RatingProps) {
  return (
    <span className="inline-flex items-center gap-1 text-[13px] font-medium text-espresso-soft">
      <Star size={size} className="fill-gold text-gold" strokeWidth={0} />
      {rating.toFixed(1)}
      {typeof reviewCount === 'number' && (
        <span className="text-espresso-soft/60">({reviewCount})</span>
      )}
    </span>
  )
}
