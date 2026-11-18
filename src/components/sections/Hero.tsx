import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Download, MapPin, Send } from 'lucide-react'
import { useRef } from 'react'
import { certifications } from '../../data/certifications'
import { profile } from '../../data/profile'
import { ui } from '../../i18n/ui'
import { ButtonLink } from '../ui/Button'
import { NetworkVisual } from '../ui/NetworkVisual'
import { ProfilePortrait } from '../ui/ProfilePortrait'

const ease = [0.22, 1, 0.36, 1] as const

function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <span aria-label={text} role="text" className="block">
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
          >
            {word === "Ajiet." ? (
              <>
                Ajiet<span className="text-accent">.</span>
              </>
            ) : (
              word
            )}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-8%'])
  const cert = certifications[0]

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 lg:pt-24"
    >
      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10" aria-hidden>
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <NetworkVisual className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute top-[-20%] right-[-10%] size-[42rem] rounded-full bg-accent/10 blur-[120px]" />
      </motion.div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <motion.p {...fadeUp(0.05)} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2/80 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {ui.hero.available}
          </motion.p>

          <motion.p {...fadeUp(0.15)} className="mt-7 font-mono text-xs tracking-[0.2em] text-muted uppercase sm:text-sm">
            {profile.fullName}
          </motion.p>

          <h1 id="hero-title" className="mt-3 text-[clamp(2.75rem,9vw,6rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            <RevealText text={profile.headline} delay={0.2} />
          </h1>

          <motion.p {...fadeUp(0.65)} className="mt-6 max-w-2xl text-lg leading-snug text-fg/90 text-balance sm:text-xl lg:text-2xl">
            {profile.subheadline}
          </motion.p>

          <motion.p {...fadeUp(0.75)} className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {profile.description}
          </motion.p>

          <motion.div {...fadeUp(0.85)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#projects" iconRight={<ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />}>
              {ui.hero.viewProjects}
            </ButtonLink>
            <ButtonLink
              href={profile.cvUrl}
              variant="secondary"
              download
              icon={<Download size={16} />}
              disabledLabel={ui.hero.cvSoon}
            >
              {ui.hero.downloadCv}
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" icon={<Send size={15} />} className="sm:px-4">
              {ui.hero.contact}
            </ButtonLink>
          </motion.div>

          <motion.dl {...fadeUp(1)} className="mt-12 grid max-w-xl gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="sr-only">{ui.hero.titleLabel}</dt>
              <dd className="flex flex-wrap gap-x-2 gap-y-1 text-muted">
                {profile.roles.map((r, i) => (
                  <span key={r}>
                    {r}
                    {i < profile.roles.length - 1 && <span className="ml-2 text-accent">/</span>}
                  </span>
                ))}
              </dd>
            </div>
            <div className="sm:text-right">
              <dt className="sr-only">{ui.hero.locationLabel}</dt>
              <dd className="inline-flex items-center gap-1.5 text-muted">
                <MapPin size={15} className="text-accent" aria-hidden /> {profile.location}
              </dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          style={{ y: portraitY }}
          className="relative mx-auto w-full max-w-[22rem] lg:max-w-none"
        >
          <ProfilePortrait className="aspect-[4/5]" />
          {cert && (
            <div className="absolute top-6 -left-4 hidden rounded-2xl border border-line bg-ink/80 px-4 py-3 backdrop-blur-md sm:block lg:-left-10">
              <p className="font-mono text-[0.62rem] tracking-widest text-accent uppercase">{ui.hero.certified}</p>
              <p className="mt-0.5 text-sm font-medium">Cisco CCNE · {cert.institution.split(' ')[0]}</p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        {...fadeUp(1.3)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] tracking-[0.25em] text-muted uppercase md:flex"
      >
        {ui.hero.scroll}
        <ArrowDown size={14} className="animate-bounce motion-reduce:animate-none" />
      </motion.a>
    </section>
  )
}
