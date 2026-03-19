import { useEffect } from 'react'
import { useSimStore, type ModelId } from './store/useSimStore'
import { applyTheme } from './theme/tokens'
import { Navbar } from './components/layout/Navbar'
import { Home } from './pages/Home'
import { Simulator } from './pages/Simulator'

function getRouteFromHash(): { page: 'home' | 'simulator'; modelId: ModelId } {
  const hash = window.location.hash
  if (hash.startsWith('#/simulate/')) {
    const id = hash.replace('#/simulate/', '') as ModelId
    return { page: 'simulator', modelId: id }
  }
  return { page: 'home', modelId: null }
}

export default function App() {
  const theme = useSimStore((s) => s.theme)
  const activeModel = useSimStore((s) => s.activeModel)
  const setActiveModel = useSimStore((s) => s.setActiveModel)

  useEffect(() => {
    applyTheme(theme)
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      const route = getRouteFromHash()
      if (route.page === 'simulator' && route.modelId) {
        setActiveModel(route.modelId)
      } else {
        setActiveModel(null)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [setActiveModel])

  return (
    <>
      <Navbar />
      {activeModel ? <Simulator /> : <Home />}
    </>
  )
}
