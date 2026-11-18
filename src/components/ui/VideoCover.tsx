import { Play } from 'lucide-react'
import type { Project } from '../../types/content'
import { cn } from '../../lib/cn'

/** Card cover for video projects: three vertical posters fanned like phone screens. */
export function VideoCover({ project, className }: { project: Project; className?: string }) {
  const posters = (project.videos ?? []).slice(0, 3)
  return (
    <div className={cn('relative overflow-hidden bg-ink-2', className)}>
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_60%,rgb(249_115_22_/_0.18),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center gap-3 px-6 pt-5 pb-9">
        {posters.map((v, i) => (
          <div
            key={v.src}
            className={cn(
              'relative aspect-[9/16] h-[88%] overflow-hidden rounded-xl border border-white/15 shadow-[0_20px_50px_-20px_rgb(0_0_0_/_0.9)] transition-transform duration-700 ease-[var(--ease-premium)]',
              i === 0 && '-rotate-6 translate-y-2 group-hover:-rotate-8',
              i === 1 && 'z-10 h-full group-hover:-translate-y-1',
              i === 2 && 'translate-y-2 rotate-6 group-hover:rotate-8',
            )}
          >
            <img src={v.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            {i === 1 && (
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-10 place-items-center rounded-full bg-accent text-ink shadow-lg">
                  <Play size={16} className="translate-x-px" fill="currentColor" aria-hidden />
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
      <span className="absolute bottom-3 left-3 rounded-full border border-line bg-ink/80 px-2.5 py-1 font-mono text-[0.62rem] tracking-wider text-muted uppercase backdrop-blur">
        {project.videos?.length} episode video
      </span>
    </div>
  )
}
