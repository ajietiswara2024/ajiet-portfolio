import { CodeXml, Network, Palette, ShieldCheck, Wrench, type LucideIcon } from 'lucide-react'
import { skillCategories } from '../../data/skills'
import { ui } from '../../i18n/ui'
import type { SkillIcon } from '../../types/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons: Record<SkillIcon, LucideIcon> = { network: Network, code: CodeXml, palette: Palette, shield: ShieldCheck }

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow={ui.sections.skills.eyebrow}
          title={ui.sections.skills.title}
          description={ui.sections.skills.description}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.icon]
            const primary = i === 0
            return (
              <Reveal
                key={cat.id}
                delay={i * 0.08}
                className={`card group relative flex flex-col overflow-hidden p-6 transition-colors duration-500 hover:border-accent/40 sm:p-7 ${primary ? 'lg:col-span-2' : ''}`}
              >
                <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/10" />
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink-2 text-accent">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="font-mono text-[0.68rem] text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold sm:text-2xl">{cat.title}</h3>
                <p className="mt-1.5 font-mono text-[0.68rem] tracking-wider text-accent uppercase">{cat.stage}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{cat.summary}</p>

                <p className="mt-6 font-mono text-[0.68rem] tracking-widest text-muted uppercase">{ui.skills.skills}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <li key={s} className="chip text-fg/85">
                      {s}
                    </li>
                  ))}
                </ul>

                {cat.tools && (
                  <>
                    <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-widest text-muted uppercase">
                      <Wrench size={12} aria-hidden /> {ui.skills.tools}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {cat.tools.map((t) => (
                        <li key={t} className="inline-flex items-center rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-xs text-accent-soft">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
