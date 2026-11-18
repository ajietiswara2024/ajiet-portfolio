import { ArrowUpRight, Download, Send } from 'lucide-react'
import { contactChannels, primaryContact } from '../../data/contact'
import { profile } from '../../data/profile'
import { ui } from '../../i18n/ui'
import { cn } from '../../lib/cn'
import { ContactIcon } from '../icons/BrandIcons'
import { ButtonLink } from '../ui/Button'
import { NetworkVisual } from '../ui/NetworkVisual'
import { Reveal } from '../ui/Reveal'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <NetworkVisual className="absolute inset-0 h-full w-full opacity-25" />
        <div className="absolute bottom-[-30%] left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span className="text-muted">07</span>
            <span aria-hidden className="h-px w-6 bg-accent/60" />
            {ui.contact.eyebrow}
          </p>
          <h2 id="contact-title" className="mt-5 text-4xl font-semibold text-balance sm:text-5xl lg:text-6xl">
            {ui.contact.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{ui.contact.description}</p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryContact?.href ?? null} icon={<Send size={16} />} disabledLabel={ui.contact.soon}>
              {ui.contact.connect}
            </ButtonLink>
            <ButtonLink href={profile.cvUrl} variant="secondary" download icon={<Download size={16} />} disabledLabel={ui.hero.cvSoon}>
              {ui.contact.resume}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-5xl">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {contactChannels.map((c, i) => {
              const available = Boolean(c.href)
              const inner = (
                <>
                  <span className={cn('grid size-10 place-items-center rounded-xl border', available ? 'border-line bg-ink-2 text-fg group-hover:border-accent/50 group-hover:text-accent' : 'border-dashed border-line text-muted/60')}>
                    <ContactIcon type={c.type} size={18} />
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-2 text-sm font-medium">
                    {c.label}
                    {available && <ArrowUpRight size={15} className="text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden />}
                  </span>
                  <span className={cn('mt-1 block truncate text-xs', available ? 'text-muted' : 'text-muted/60 italic')}>
                    {c.value ?? ui.contact.soon}
                  </span>
                </>
              )
              return (
                <li key={c.type} className={i === 0 ? 'sm:col-span-2 lg:col-span-3' : i === 1 ? 'lg:col-span-3' : 'lg:col-span-2'}>
                  {available ? (
                    <a
                      href={c.href!}
                      target={c.href!.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group card flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex h-full flex-col rounded-2xl border border-dashed border-line p-5" aria-label={`${c.label}: ${ui.contact.soon}`}>
                      {inner}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
