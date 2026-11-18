import { Award, ExternalLink } from 'lucide-react'
import { certifications } from '../../data/certifications'
import { ui } from '../../i18n/ui'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section-y border-t border-line/60 bg-ink-2/40">
      <div className="container-x">
        <SectionHeading id="certifications-title" index="06" eyebrow={ui.sections.certifications.eyebrow} title={ui.sections.certifications.title} />

        <ul className="grid gap-5 md:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal as="li" key={cert.name} delay={i * 0.08} className="card group relative flex flex-col overflow-hidden p-6 transition-colors duration-500 hover:border-accent/40 sm:p-8">
              {/* certificate-style frame */}
              <div aria-hidden className="pointer-events-none absolute inset-2.5 rounded-xl border border-dashed border-line/80" />
              <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 size-52 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <Award size={22} aria-hidden />
                  </span>
                  <div className="text-right">
                    <p className="font-mono text-[0.65rem] tracking-widest text-muted uppercase">{ui.certifications.issued}</p>
                    <p className="mt-0.5 text-sm font-medium">{cert.date}</p>
                  </div>
                </div>

                <p className="mt-6 font-mono text-xs tracking-wider text-accent uppercase">{cert.institution}</p>
                <h3 className="mt-2 text-xl font-semibold text-balance sm:text-2xl">{cert.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{cert.description}</p>

                <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
                  {cert.period && (
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="font-mono text-[0.65rem] tracking-widest text-muted uppercase">{ui.certifications.period}</dt>
                      <dd className="mt-1">{cert.period}</dd>
                    </div>
                  )}
                  {cert.credentialId && (
                    <div>
                      <dt className="font-mono text-[0.65rem] tracking-widest text-muted uppercase">{ui.certifications.credential}</dt>
                      <dd className="mt-1 font-mono">{cert.credentialId}</dd>
                    </div>
                  )}
                  {cert.grade && (
                    <div>
                      <dt className="font-mono text-[0.65rem] tracking-widest text-muted uppercase">{ui.certifications.grade}</dt>
                      <dd className="mt-1">{cert.grade}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-auto pt-8">
                  <ButtonLink
                    href={cert.fileUrl}
                    variant="secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    iconRight={<ExternalLink size={15} />}
                    disabledLabel={ui.certifications.soon}
                    className="w-full sm:w-auto"
                  >
                    {cert.fileUrl ? ui.certifications.view : ui.certifications.soon}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
