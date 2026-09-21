import { NavLink } from 'react-router-dom'
import { Coffee, Heart } from 'lucide-react'
import { useCollection } from '../../context/CollectionContext'

const linkBase =
  'px-3 py-2 text-[15px] font-medium rounded-full transition-colors duration-150'

function navClass({ isActive }: { isActive: boolean }) {
  return [
    linkBase,
    isActive
      ? 'bg-gradient-to-r from-clay to-gold text-cream shadow-pop'
      : 'text-espresso-soft hover:bg-cream-dim',
  ].join(' ')
}

export function NavBar() {
  const { collection } = useCollection()
  const savedCount = Object.values(collection).filter((c) => c.saved).length

  return (
    <header
      className="sticky top-0 z-[1000] border-b border-line/80 bg-cream/95 backdrop-blur"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3">
        <NavLink to="/" className="flex items-center gap-2 shrink-0" aria-label="Bombay Brew Guide home">
          <span className="gentle-bob hover-wiggle flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-clay to-gold text-cream shadow-pop">
            <Coffee size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-[20px] font-semibold tracking-tight text-espresso">
            Bombay Brew Guide
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink to="/" end className={navClass}>
            Explore
          </NavLink>
          <NavLink to="/discover" className={navClass}>
            Discover
          </NavLink>
          <NavLink to="/my-coffee" className={navClass}>
            My Coffee
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
        </nav>

        <NavLink
          to="/my-coffee"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-2 text-[14px] font-medium text-espresso-soft transition-colors hover:border-clay hover:text-clay"
        >
          <Heart size={16} strokeWidth={2.25} />
          <span className="hidden sm:inline">Saved</span>
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cream-dim px-1 text-[12px] font-semibold text-espresso">
            {savedCount}
          </span>
        </NavLink>
      </div>
    </header>
  )
}
