import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { ArrowLeft, ArrowRight, Check, Download, ExternalLink, ImagePlus, Maximize2, Wrench } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { GithubIcon } from '../components/icons/BrandIcons'
import { ButtonLink } from '../components/ui/Button'
import { ProjectCover } from '../components/ui/ProjectCover'
import { Reveal } from '../components/ui/Reveal'
import { StatusBadge } from '../components/ui/StatusBadge'
import { VideoGallery } from '../components/ui/VideoGallery'
import { getProjectBySlug, projects } from '../data/projects'
import { useDocumentMeta } from '../hooks/useDocumentTitle'
import { ui } from '../i18n/ui'
import { cn } from '../lib/cn'
import { NotFoundPage } from './NotFoundPage'

const CcnaTopology = lazy(() => import('../components/ccna/CcnaTopology'))

const ease = [0.22, 1, 0.36, 1] as const
const sectionLabel = 'font-mono text-xs tracking-[0.2em] text-muted uppercase'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  useDocumentMeta(project?.title ?? ui.notFound.title, project?.summary)

  if (!project) return <NotFoundPage message={ui.projects.notFound} />

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const hasLinks = Boolean(project.links.github || project.links.demo || project.files?.length)
  const [coverImage, ...extraImages] = project.images
  const extraCaptions = project.imageCaptions?.slice(1) ?? []
  const contain = project.imageFit === 'contain'

  return (
    <article className="pt-28 pb-24 sm:pt-32">
      <div className="container-x">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease }}>
          <Link to="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft size={16} /> {ui.projects.back}
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          className="mt-8 max-w-4xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted">
              <span className="text-accent">
                {ui.projects.project} {project.number}
              </span>{' '}
              — {ui.category[project.category]}
              {project.date && <> · {project.date}</>}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-5 text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl lg:text-6xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{project.summary}</p>
        </motion.header>

        {project.animation === 'ccna-topology' && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="mt-12"
            aria-labelledby="animation-title"
          >
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="animation-title" className={sectionLabel}>
                  {ui.projects.animation}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">{ui.projects.animationHint}</p>
              </div>
            </div>
            <Suspense fallback={<div className="card aspect-[1000/620] animate-pulse bg-ink-2" />}>
              <CcnaTopology />
            </Suspense>
          </motion.section>
        )}

        {project.videos?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="mt-12"
            aria-labelledby="episodes-title"
          >
            <h2 id="episodes-title" className={sectionLabel}>
              {ui.projects.episodes}
            </h2>
            <div className="mt-6">
              <VideoGallery videos={project.videos} />
            </div>
          </motion.section>
        ) : null}

        {project.animation && project.images[0] && (
          <h2 className={cn(sectionLabel, 'mt-16')}>{ui.projects.original}</h2>
        )}
        {!project.videos?.length && (
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className={cn('group', project.animation ? 'mt-5' : 'mt-12')}
        >
          <div className="relative">
            <ProjectCover
              project={project}
              priority
              className={cn('card', contain ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[16/9] sm:aspect-[21/9]')}
            />
            {coverImage && (
              <a
                href={coverImage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ui.projects.openImage}
                className="absolute right-2 bottom-2 inline-flex size-10 items-center justify-center gap-1.5 rounded-full border border-line bg-ink/85 text-xs text-fg backdrop-blur transition-colors hover:border-accent/60 sm:right-3 sm:bottom-3 sm:size-auto sm:min-h-10 sm:px-3.5"
              >
                <Maximize2 size={14} aria-hidden /> <span className="hidden sm:inline">{ui.projects.openImage}</span>
              </a>
            )}
          </div>
          {project.imageCaptions?.[0] && <figcaption className="mt-3 text-sm text-muted">{project.imageCaptions[0]}</figcaption>}
        </motion.figure>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="min-w-0 space-y-14">
            {project.context && (
              <Reveal>
                <h2 className={sectionLabel}>{ui.projects.context}</h2>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-fg/85 sm:text-lg">
                  {project.context.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            )}

            {project.focusAreas && (
              <Reveal>
                <h2 className={sectionLabel}>{ui.projects.focus}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {project.focusAreas.map((f) => (
                    <li key={f} className="card flex items-start gap-3 p-4 text-sm leading-relaxed">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {project.table && (
              <Reveal>
                <h2 className={sectionLabel}>{project.table.title}</h2>
                <div className="card mt-6 overflow-x-auto">
                  <table className="w-full min-w-[34rem] text-left text-sm">
                    <thead>
                      <tr className="border-b border-line">
                        {project.table.columns.map((c) => (
                          <th key={c} scope="col" className="px-4 py-3 font-mono text-[0.68rem] font-medium tracking-widest text-muted uppercase">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {project.table.rows.map((row) => (
                        <tr key={row[0]} className="border-b border-line/60 last:border-0 hover:bg-ink-2/60">
                          {row.map((cell, i) => (
                            <td key={i} className={cn('px-4 py-3', i === 0 ? 'font-mono text-accent' : i >= 2 ? 'font-mono text-fg/85' : 'text-fg')}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {project.review && (
              <Reveal>
                <h2 className={sectionLabel}>{project.review.title}</h2>
                <p className="mt-6 text-base leading-relaxed text-muted">{project.review.intro}</p>
                <ol className="mt-6 space-y-3">
                  {project.review.items.map((item, i) => (
                    <li key={i} className="card grid gap-3 p-5 sm:grid-cols-[2rem_1fr]">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <div className="space-y-2 text-sm leading-relaxed">
                        <p>
                          <span className="mr-2 font-mono text-[0.65rem] tracking-widest text-muted uppercase">{ui.projects.issue}</span>
                          {item.issue}
                        </p>
                        <p className="flex gap-2 text-fg/85">
                          <Wrench size={14} className="mt-1 shrink-0 text-accent" aria-hidden />
                          <span>
                            <span className="mr-2 font-mono text-[0.65rem] tracking-widest text-accent uppercase">{ui.projects.fix}</span>
                            {item.fix}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            {(extraImages.length > 0 || (!coverImage && !project.videos?.length)) && (
              <Reveal>
                <h2 className={sectionLabel}>{ui.projects.gallery}</h2>
                {extraImages.length > 0 ? (
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {extraImages.map((src, i) => (
                      <li key={src}>
                        <figure className="card overflow-hidden">
                          <a href={src} target="_blank" rel="noopener noreferrer">
                            <img
                              src={src}
                              alt={extraCaptions[i] ?? `${project.title} — ${ui.projects.screenshot} ${i + 2}`}
                              loading="lazy"
                              decoding="async"
                              className={cn('aspect-video w-full', contain ? 'bg-white object-contain p-2' : 'object-cover')}
                            />
                          </a>
                          {extraCaptions[i] && <figcaption className="p-3 text-xs text-muted">{extraCaptions[i]}</figcaption>}
                        </figure>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex aspect-video flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-ink-2/60 text-muted/70">
                        <ImagePlus size={20} aria-hidden />
                        <span className="font-mono text-[0.62rem] tracking-widest uppercase">
                          {ui.projects.slot} {i + 1}
                        </span>
                      </div>
                    ))}
                    <p className="text-sm text-muted sm:col-span-3">{ui.projects.galleryEmpty}</p>
                  </div>
                )}
              </Reveal>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {project.facts && (
              <Reveal className="card overflow-hidden">
                <h2 className={cn(sectionLabel, 'px-6 pt-6')}>{ui.projects.facts}</h2>
                <dl className="mt-4 divide-y divide-line">
                  {project.facts.map((f) => (
                    <div key={f.label} className="flex items-baseline justify-between gap-4 px-6 py-3">
                      <dt className="shrink-0 text-xs text-muted">{f.label}</dt>
                      <dd className="text-right text-sm font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
            <Reveal className="card p-6">
              <h2 className={sectionLabel}>{ui.projects.stack}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="chip text-fg/85">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.05} className="card p-6">
              <h2 className={sectionLabel}>{ui.projects.links}</h2>
              {hasLinks ? (
                <div className="mt-5 flex flex-col gap-3">
                  {project.files?.map((f) => (
                    <ButtonLink key={f.href} href={f.href} variant="secondary" download icon={<Download size={16} />}>
                      {f.label}
                    </ButtonLink>
                  ))}
                  {project.links.github && (
                    <ButtonLink href={project.links.github} variant="secondary" icon={<GithubIcon size={16} />}>
                      {ui.projects.viewCode}
                    </ButtonLink>
                  )}
                  {project.links.demo && (
                    <ButtonLink href={project.links.demo} iconRight={<ExternalLink size={15} />}>
                      {ui.projects.viewDemo}
                    </ButtonLink>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-muted">{ui.projects.noLinks}</p>
              )}
            </Reveal>
          </aside>
        </div>

        <Reveal className="mt-24 border-t border-line pt-10">
          <Link to={`/projects/${next.slug}`} className="group flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={sectionLabel}>{ui.projects.next}</p>
              <p className="mt-3 font-display text-3xl font-semibold transition-colors group-hover:text-accent sm:text-4xl">{next.title}</p>
            </div>
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
              <ArrowRight size={18} />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
