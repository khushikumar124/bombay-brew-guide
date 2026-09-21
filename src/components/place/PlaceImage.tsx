import { useState } from 'react'
import { Coffee } from 'lucide-react'

interface PlaceImageProps {
  src: string
  alt: string
  className?: string
}

export function PlaceImage({ src, alt, className = '' }: PlaceImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-cream-dim text-coffee/50 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Coffee size={28} strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
