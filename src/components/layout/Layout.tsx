import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { MobileTabBar } from './MobileTabBar'

export function Layout() {
  return (
    <div className="flex h-dvh min-h-0 flex-col bg-cream">
      <NavBar />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>
      <MobileTabBar />
    </div>
  )
}
