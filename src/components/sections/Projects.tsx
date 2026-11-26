import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../../lib/cn'
import { projects } from '../../data/projects'
import { ui } from '../../i18n/ui'
import type { ProjectCategory } from '../../types/content'
import { ProjectCard } from '../ui/ProjectCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type Filter = 'all' | ProjectCategory

// Only categories that actually have projects, in the order they first appear.
const categories = [...new Set(projects.map((p) => p.category))]

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const showAll = filter === 'all'
  const [featured, ...rest] = projects
  const list = showAll ? rest : projects.filter((p) => p.category === filter)

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: ui.projects.filterAll, count: projects.length },
    ...categories.map((c) => ({ id: c, label: ui.category[c], count: projects.filter((p) => p.category === c).length })),
  ]

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          index="01"
          eyebrow={ui.sections.projects.eyebrow}
          title={ui.sections.projects.title}
          description={ui.sections.projects.description}
        />

        <div role="group" aria-label={ui.projects.filterLabel} className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {tabs.map((t) => {
            const active = filter === t.id
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(t.id)}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200',
                  active ? 'border-accent text-ink' : 'border-line bg-ink-2 text-muted hover:border-fg/30 hover:text-fg',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {t.label}
                <span className={cn('font-mono text-xs', active ? 'text-ink/70' : 'text-muted/70')}>{t.count}</span>
              </button>
            )
          })}
        </div>

        {showAll && featured && (
          <Reveal className="mb-5">
            <ProjectCard project={featured} featured />
          </Reveal>
        )}
        <div key={filter} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={(i % 3) * 0.06}
              className={cn('h-full', list.length % 2 === 1 && i === list.length - 1 && 'md:col-span-2 lg:col-span-1')}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
