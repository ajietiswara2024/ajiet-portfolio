import { ui } from '../../i18n/ui'
import type { ProjectStatus } from '../../types/content'
import { cn } from '../../lib/cn'

const tone: Record<ProjectStatus, string> = {
  'Lab Practice': 'text-sky-300 border-sky-400/25 bg-sky-400/10',
  'Learning Project': 'text-violet-300 border-violet-400/25 bg-violet-400/10',
  'In Progress': 'text-accent border-accent/30 bg-accent/10',
  Completed: 'text-emerald-300 border-emerald-400/25 bg-emerald-400/10',
}

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] tracking-wide uppercase',
        tone[status],
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {ui.status[status]}
    </span>
  )
}
