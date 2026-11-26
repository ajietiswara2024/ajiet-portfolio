import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { certifications } from '../../data/certifications'
import { projects } from '../../data/projects'
import { skillCategories } from '../../data/skills'
import { ui } from '../../i18n/ui'
import { Reveal } from '../ui/Reveal'

/** Counts up once when visible; shows the final value immediately with reduced motion. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, value])

  return <span ref={ref}>{reduce ? value : shown}</span>
}

// Every figure is derived from the content data, so it stays true as content changes.
const stats = [
  { value: projects.length, count: true, label: ui.highlights.projects },
  { value: certifications.length, count: true, label: ui.highlights.certs },
  { value: projects.reduce((n, p) => n + (p.videos?.length ?? 0), 0), count: true, label: ui.highlights.videos },
  { value: 2020, count: false, label: ui.highlights.since },
]

const tools = [...new Set(skillCategories.flatMap((c) => [...(c.tools ?? []), ...c.skills.slice(0, 5)]))]

export function Highlights() {
  return (
    <section aria-label={ui.highlights.label} className="relative border-y border-line/60 bg-ink-2/40">
      <div className="container-x py-12 sm:py-14">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="card flex flex-col rounded-none border-0 p-5 sm:p-6">
              <dt className="order-2 mt-2 text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {s.count ? <CountUp value={s.value} /> : s.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Tools marquee: duplicated track so the loop is seamless; pauses on hover. */}
      <div className="group relative overflow-hidden pb-12 sm:pb-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <p className="sr-only">
          {ui.highlights.toolsLabel}: {tools.join(', ')}
        </p>
        <ul aria-hidden className="animate-marquee flex w-max gap-3">
          {[...tools, ...tools].map((t, i) => (
            <li key={i} className="chip shrink-0 px-4 py-2 text-sm text-fg/80">
              <span className="mr-2 inline-block size-1.5 rounded-full bg-accent/70" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
