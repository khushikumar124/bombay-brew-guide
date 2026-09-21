import { LocateFixed, LoaderCircle } from 'lucide-react'

interface Props {
  status: 'idle' | 'locating' | 'granted' | 'denied' | 'unsupported'
  onClick: () => void
}

export function NearMeButton({ status, onClick }: Props) {
  const isLocating = status === 'locating'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLocating}
      title={status === 'denied' ? "Location access was denied — you can still browse the map." : 'Use my location'}
      className="flex items-center gap-1.5 rounded-full border border-line bg-cream/95 px-3.5 py-2 text-[13px] font-medium text-espresso shadow-card transition-colors hover:border-sage disabled:opacity-70"
    >
      {isLocating ? (
        <LoaderCircle size={15} className="animate-spin" />
      ) : (
        <LocateFixed size={15} className={status === 'granted' ? 'text-sage' : ''} />
      )}
      {status === 'granted' ? 'Near me' : 'Near me'}
    </button>
  )
}
