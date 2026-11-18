import { cn } from '../../lib/cn'
import { projects } from '../../data/projects'
import { ui } from '../../i18n/ui'
import { ProjectCard } from '../ui/ProjectCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Projects() {
  const [featured, ...rest] = projects

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          index="03"
          eyebrow={ui.sections.projects.eyebrow}
          title={ui.sections.projects.title}
          description={ui.sections.projects.description}
        />

        {featured && (
          <Reveal className="mb-5">
            <ProjectCard project={featured} featured />
          </Reveal>
        )}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={(i % 3) * 0.08}
              className={cn('h-full', rest.length % 2 === 1 && i === rest.length - 1 && 'md:col-span-2 lg:col-span-1')}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
