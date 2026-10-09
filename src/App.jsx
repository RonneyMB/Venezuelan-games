import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { TablesProvider } from './context/TablesContext.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import TriviaPage from './pages/TriviaPage.jsx'
import MimicasPage from './pages/MimicasPage.jsx'
import TriviaDisplay from './pages/TriviaDisplay.jsx'
import MimicasDisplay from './pages/MimicasDisplay.jsx'

const CapitalesPage = lazy(() => import('./pages/CapitalesPage.jsx'))
const CapitalesDisplay = lazy(() => import('./pages/CapitalesDisplay.jsx'))
const TradicionalPage = lazy(() => import('./pages/TradicionalPage.jsx'))
const TradicionalDisplay = lazy(() => import('./pages/TradicionalDisplay.jsx'))

export default function App() {
  return (
    <TablesProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="trivia" element={<TriviaPage />} />
            <Route path="mimicas" element={<MimicasPage />} />
            <Route path="capitales" element={<CapitalesPage />} />
            <Route path="tradicional" element={<TradicionalPage />} />
          </Route>

          <Route path="trivia/display" element={<TriviaDisplay />} />
          <Route path="mimicas/display" element={<MimicasDisplay />} />
          <Route path="capitales/display" element={<CapitalesDisplay />} />
          <Route path="tradicional/display" element={<TradicionalDisplay />} />
        </Routes>
      </Suspense>
    </TablesProvider>
  )
}
