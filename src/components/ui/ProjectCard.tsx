import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ui } from '../../i18n/ui'
import { cn } from '../../lib/cn'
import type { Project } from '../../types/content'
import { ProjectCover } from './ProjectCover'
import { StatusBadge } from './StatusBadge'
import { VideoCover } from './VideoCover'

const CcnaTopology = lazy(() => import('../ccna/CcnaTopology'))

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const visibleTech = project.technologies.slice(0, featured ? 6 : 4)
  const extra = project.technologies.length - visibleTech.length
  const coverClass = cn('aspect-[16/10] border-b border-line', featured && 'lg:aspect-auto lg:min-h-96 lg:border-r lg:border-b-0')

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={cn(
        'card group relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-accent/40 hover:shadow-[0_30px_80px_-40px_rgb(249_115_22_/_0.45)]',
        featured && 'lg:grid lg:grid-cols-[1.15fr_1fr]',
      )}
    >
      {project.animation === 'ccna-topology' ? (
        <Suspense fallback={<ProjectCover project={project} className={coverClass} />}>
          <CcnaTopology compact className={coverClass} />
        </Suspense>
      ) : project.videos?.length ? (
        <VideoCover project={project} className={coverClass} />
      ) : (
        <ProjectCover project={project} className={coverClass} />
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs text-muted">
            <span className="text-accent">{project.number}</span> — {ui.category[project.category]}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className={cn('mt-5 font-semibold', featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl')}>
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={ui.projects.technologies}>
          {visibleTech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
          {extra > 0 && <li className="chip text-accent">+{extra}</li>}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-fg">
          {ui.projects.viewDetails}
          <ArrowUpRight size={16} className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
      {/* Focus ring for keyboard users on the stretched link */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-accent group-has-[a:focus-visible]:ring-2" />
    </motion.article>
  )
}
