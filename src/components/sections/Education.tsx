import { GraduationCap, Users } from 'lucide-react'
import { education, leadership } from '../../data/education'
import { ui } from '../../i18n/ui'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="education-title" index="05" eyebrow={ui.sections.education.eyebrow} title={ui.sections.education.title} />

        <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
          {education.map((edu) => (
            <Reveal key={edu.degree} className="card relative flex flex-col overflow-hidden p-6 sm:p-8">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <div className="relative flex flex-1 flex-col">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink-2 text-accent">
                  <GraduationCap size={20} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-balance">{edu.degree}</h3>
                <p className="mt-2 text-muted">{edu.institution}</p>
                <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-6 sm:mt-10">
                  <div>
                    <dt className="font-mono text-[0.68rem] tracking-widest text-muted uppercase">{ui.education.graduated}</dt>
                    <dd className="mt-1.5 font-display text-xl font-semibold">{edu.graduated}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] tracking-widest text-muted uppercase">{ui.education.gpa}</dt>
                    <dd className="mt-1.5 font-display text-xl font-semibold">
                      {edu.gpa.split(' / ')[0]}
                      <span className="text-base text-muted"> / {edu.gpa.split(' / ')[1]}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}

          <div>
            <Reveal>
              <h3 className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase">
                <Users size={14} aria-hidden className="text-accent" /> {ui.education.leadership}
              </h3>
            </Reveal>
            <ul className="mt-5 space-y-4">
              {leadership.map((item, i) => (
                <Reveal as="li" key={item.organization} delay={0.08 * (i + 1)} className="card p-5 transition-colors duration-300 hover:border-fg/20 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-lg font-semibold">{item.role}</h4>
                    <span className="font-mono text-xs text-muted">{item.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-fg/80">{item.organization}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={ui.education.emphasis}>
                    {item.emphasis.map((e) => (
                      <li key={e} className="chip">
                        {e}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
