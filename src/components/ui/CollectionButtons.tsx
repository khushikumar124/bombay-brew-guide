import { useState } from 'react'
import { Heart, Check } from 'lucide-react'
import { useCollection } from '../../context/CollectionContext'

interface Props {
  placeId: string
  variant?: 'compact' | 'full'
}

export function SaveButton({ placeId, variant = 'compact' }: Props) {
  const { isSaved, toggleSaved } = useCollection()
  const [popping, setPopping] = useState(false)
  const saved = isSaved(placeId)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggleSaved(placeId)
    setPopping(true)
    window.setTimeout(() => setPopping(false), 400)
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={saved ? 'Remove from saved' : 'Save this place'}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/95 text-espresso shadow-sm transition-transform hover:scale-105"
      >
        <Heart
          size={16}
          strokeWidth={2}
          className={`${popping ? 'heart-pop' : ''} ${saved ? 'fill-berry text-berry' : ''}`}
        />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      className={`tap-bounce flex items-center justify-center gap-2 rounded-full border-2 px-4 py-2.5 text-[14px] font-semibold transition-colors ${
        saved
          ? 'border-berry/30 bg-berry/10 text-berry'
          : 'border-line text-espresso hover:border-berry/40 hover:text-berry'
      }`}
    >
      <Heart size={16} strokeWidth={2.25} className={`${popping ? 'heart-pop' : ''} ${saved ? 'fill-berry' : ''}`} />
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}

export function VisitedButton({ placeId }: Props) {
  const { isVisited, toggleVisited } = useCollection()
  const visited = isVisited(placeId)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleVisited(placeId)
      }}
      aria-pressed={visited}
      className={`tap-bounce flex items-center justify-center gap-2 rounded-full border-2 px-4 py-2.5 text-[14px] font-semibold transition-colors ${
        visited
          ? 'border-sage/40 bg-sage-dim text-sage'
          : 'border-line text-espresso hover:border-sage/50 hover:text-sage'
      }`}
    >
      <Check size={16} strokeWidth={2.5} />
      {visited ? 'Visited' : 'Mark visited'}
    </button>
  )
}
