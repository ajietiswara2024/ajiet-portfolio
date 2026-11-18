import { ui } from '../../i18n/ui'
import { profile } from '../../data/profile'
import { cn } from '../../lib/cn'

/**
 * Portrait card. Shows `profile.photo` with a monochrome/warm treatment so any
 * background color blends with the dark theme. Falls back to a monogram placeholder.
 */
export function ProfilePortrait({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-[0_40px_120px_-40px_rgb(249_115_22_/_0.35)]',
        className,
      )}
    >
      {profile.photo ? (
        <>
          <img
            src={profile.photo}
            alt={`${ui.portrait.alt} ${profile.fullName}`}
            width={472}
            height={709}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-top grayscale contrast-[1.08] brightness-[0.92]"
          />
          {/* warm tint + fade into the page */}
          <div aria-hidden className="absolute inset-0 bg-accent/25 mix-blend-soft-light" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        </>
      ) : (
        <div className="bg-grid flex h-full w-full items-center justify-center">
          <span className="font-display text-7xl font-semibold text-fg/90">
            A<span className="text-accent">I</span>
          </span>
          <span className="absolute bottom-4 font-mono text-[0.65rem] tracking-widest text-muted uppercase">
            {ui.portrait.placeholder}
          </span>
        </div>
      )}

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-md">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{profile.fullName}</p>
          <p className="truncate font-mono text-[0.68rem] tracking-wide text-muted">{profile.location}</p>
        </div>
        <span className="relative flex size-2.5 shrink-0" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
        </span>
      </div>
    </div>
  )
}
