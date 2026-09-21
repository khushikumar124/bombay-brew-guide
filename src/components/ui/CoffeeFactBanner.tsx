import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { getRandomFact } from '../../data/coffeeFacts'

export function CoffeeFactBanner() {
  const [fact, setFact] = useState(() => getRandomFact())

  useEffect(() => {
    const id = window.setInterval(() => {
      setFact((current) => getRandomFact(current))
    }, 9000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex items-start gap-2 rounded-2xl border border-line/70 bg-cream-dim/70 px-4 py-3 text-[13px] leading-relaxed text-espresso-soft">
      <Sparkles size={15} className="mt-0.5 shrink-0 text-gold" />
      <p key={fact} className="transition-opacity duration-300">
        {fact}
      </p>
    </div>
  )
}
