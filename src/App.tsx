import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ExplorePage } from './pages/ExplorePage'
import { DiscoverPage } from './pages/DiscoverPage'
import { MyCoffeePage } from './pages/MyCoffeePage'
import { AboutPage } from './pages/AboutPage'
import { PlacePage } from './pages/PlacePage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/my-coffee" element={<MyCoffeePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
