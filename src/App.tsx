import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'

/** Scroll to top on route change, or to the #section in the URL. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // wait one frame for the new route to render
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

/** Feeds the cursor position to the hovered card for the CSS spotlight (desktop pointers only). */
function useCardSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.('.card') as HTMLElement | null
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}

export default function App() {
  const location = useLocation()
  useCardSpotlight()

  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
