import { ArrowUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { contactChannels } from '../../data/contact'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { ui } from '../../i18n/ui'
import { ContactIcon } from '../icons/BrandIcons'

export function Footer() {
  const { pathname } = useLocation()
  const prefix = pathname === '/' ? '' : '/'
  const socials = contactChannels.filter((c) => c.href)

  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="font-display text-xl font-semibold">
              {profile.fullName}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">{profile.tagline}</p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-2">
                {socials.map((c) => (
                  <li key={c.type}>
                    <a
                      href={c.href!}
                      target={c.href!.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={c.label}
                      className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
                    >
                      <ContactIcon type={c.type} size={17} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label={ui.nav.footer}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`${prefix}#${item.id}`} className="text-muted transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {profile.fullName}.</p>
          <p className="italic">“{ui.footer.credit}”</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            {ui.footer.top} <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
