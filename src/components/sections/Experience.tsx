import { Briefcase } from 'lucide-react'
import { experience } from '../../data/experience'
import { ui } from '../../i18n/ui'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y border-t border-line/60 bg-ink-2/40">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="04"
          eyebrow={ui.sections.experience.eyebrow}
          title={ui.sections.experience.title}
          description={ui.sections.experience.description}
        />

        <ol className="relative">
          <span aria-hidden className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-gradient-to-b from-accent via-line to-transparent md:left-[calc(12rem+0.6875rem)]" />
          {experience.map((job, i) => {
            const current = job.end === null
            return (
              <Reveal as="li" key={`${job.organization}-${job.start}`} delay={i * 0.06} className="relative pb-12 pl-10 last:pb-0 md:grid md:grid-cols-[12rem_1fr] md:gap-0 md:pl-0">
                <p className="mb-3 font-mono text-xs tracking-wide text-muted md:mb-0 md:pt-1 md:pr-10 md:text-right">
                  {job.start} — {current ? <span className="text-accent">{ui.experience.present}</span> : job.end}
                </p>

                <span
                  aria-hidden
                  className={`absolute top-1 left-0 grid size-[1.375rem] place-items-center rounded-full border md:left-48 ${current ? 'border-accent bg-accent/15' : 'border-line bg-ink'}`}
                >
                  <span className={`size-2 rounded-full ${current ? 'bg-accent' : 'bg-muted/50'}`} />
                </span>

                <div className="card p-5 transition-colors duration-300 hover:border-fg/20 sm:p-6 md:ml-10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold sm:text-xl">{job.role}</h3>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                        <Briefcase size={14} aria-hidden className="shrink-0" /> {job.organization}
                      </p>
                    </div>
                    {current && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-accent uppercase">
                        {ui.experience.current}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{job.description}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
