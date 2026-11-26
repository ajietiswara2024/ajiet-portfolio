import { profile } from '../../data/profile'
import { ui } from '../../i18n/ui'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const { paragraphs, facts, transferableSkills } = profile.about

  return (
    <section id="about" aria-labelledby="about-title" className="section-y border-t border-line/60 bg-ink-2/40">
      <div className="container-x">
        <SectionHeading id="about-title" index="02" eyebrow={ui.sections.about.eyebrow} title={ui.sections.about.title} />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-fg/90' : undefined}>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="card divide-y divide-line overflow-hidden">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 px-5 py-4">
                  <dt className="shrink-0 font-mono text-[0.7rem] tracking-widest text-muted uppercase">{f.label}</dt>
                  <dd className="text-right text-sm font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{ui.about.transferable}</h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {transferableSkills.map((s, i) => (
              <li key={s.name} className="group bg-ink-2 p-5 transition-colors duration-300 hover:bg-card">
                <span className="font-mono text-[0.68rem] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-3 font-display text-lg font-medium">{s.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</p>
              </li>
            ))}
            <li className="hidden items-end bg-ink-2 p-5 lg:flex">
              <p className="text-sm leading-relaxed text-muted">
                <span className="text-accent">→</span> {profile.tagline}
              </p>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
