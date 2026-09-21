import { NavLink } from 'react-router-dom'
import { Compass, Sparkles, Heart, Info } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Explore', icon: Compass, end: true },
  { to: '/discover', label: 'Discover', icon: Sparkles, end: false },
  { to: '/my-coffee', label: 'My Coffee', icon: Heart, end: false },
  { to: '/about', label: 'About', icon: Info, end: false },
]

export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-[1000] flex border-t border-line bg-cream/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {tabs.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            [
              'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors',
              isActive ? 'text-clay' : 'text-espresso-soft/70',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors ${isActive ? 'bg-clay-dim' : ''}`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
              </span>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
