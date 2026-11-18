import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ui } from '../../i18n/ui'
import { cn } from '../../lib/cn'

const sectionIds = navItems.map((n) => n.id)

export function Navbar() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const active = useActiveSection(sectionIds, onHome)
  // Menu is tied to the path it was opened on, so it closes itself on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((typeof value === 'function' ? value(open) : value) ? pathname : null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape, and lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open ? 'border-b border-line/70 bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        {ui.nav.skip}
      </a>
      <nav className="container-x flex h-16 items-center justify-between sm:h-18" aria-label={ui.nav.primary}>
        <Link to="/" className="group flex items-center gap-2.5" aria-label={`${profile.fullName} — ${ui.nav.home}`}>
          <span className="flex size-9 items-center justify-center rounded-xl border border-line bg-ink-2 font-display text-sm font-semibold transition-colors group-hover:border-accent/50">
            A<span className="text-accent">I</span>
          </span>
          <span className="hidden font-display text-sm font-medium tracking-tight sm:block">
            Ajiet Iswara Putra
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id} className="relative">
                <a
                  href={hrefFor(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-full px-3.5 py-2 text-sm transition-colors',
                    isActive ? 'text-fg' : 'text-muted hover:text-fg',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-card"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href={hrefFor('contact')}
          className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent lg:inline-flex"
        >
          {ui.contact.connect}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full border border-line bg-ink-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? ui.nav.close : ui.nav.menu}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pt-6 pb-32">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={hrefFor(item.id)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between border-b border-line/60 py-4 font-display text-2xl',
                      active === item.id ? 'text-fg' : 'text-muted',
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
