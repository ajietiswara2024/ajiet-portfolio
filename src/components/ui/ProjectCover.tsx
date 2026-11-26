import { ui } from '../../i18n/ui'
import type { Project } from '../../types/content'
import { cn } from '../../lib/cn'

/**
 * Project visual. Uses the first real screenshot when available,
 * otherwise renders a lightweight generated cover that matches the project type.
 */
export function ProjectCover({
  project,
  className,
  priority = false,
}: {
  project: Project
  className?: string
  priority?: boolean
}) {
  const image = project.images[0]

  return (
    <div className={cn('relative overflow-hidden', image && project.imageFit === 'contain' && project.imageBg !== 'dark' ? 'bg-white' : 'bg-ink-2', className)}>
      {image ? (
        <img
          src={image}
          alt={`${ui.projects.screenshot} ${project.title}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            'h-full w-full transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.02]',
            project.imageFit === 'contain' ? cn('object-contain p-2 sm:p-3', project.imageBg !== 'dark' && 'bg-white') : 'object-cover',
          )}
        />
      ) : (
        <>
          <div className="bg-grid absolute inset-0 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgb(249_115_22_/_0.14),transparent_70%)]" />
          <CoverArt variant={project.cover} />
          <span className="absolute bottom-3 left-3 rounded-full border border-line bg-ink/80 px-2.5 py-1 font-mono text-[0.62rem] tracking-wider text-muted uppercase backdrop-blur">
            {ui.projects.coverSoon}
          </span>
        </>
      )}
    </div>
  )
}

const stroke = { stroke: '#52525b', strokeWidth: 1.5, fill: 'none' } as const
const accent = '#F97316'

function CoverArt({ variant }: { variant: Project['cover'] }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === 'topology' && (
        <g>
          <path d="M200 50 L110 120 M200 50 L290 120 M110 120 L70 190 M110 120 L150 190 M290 120 L250 190 M290 120 L330 190" {...stroke} />
          <path d="M200 50 L290 120 L330 190" stroke={accent} strokeWidth="1.5" fill="none" strokeDasharray="4 5" className="animate-dash" />
          <Device x={200} y={50} kind="router" hot />
          <Device x={110} y={120} kind="switch" />
          <Device x={290} y={120} kind="switch" hot />
          {[70, 150, 250, 330].map((x) => (
            <Device key={x} x={x} y={190} kind="pc" hot={x === 330} />
          ))}
        </g>
      )}

      {variant === 'vlan' && (
        <g>
          <rect x="40" y="70" width="140" height="130" rx="14" stroke="#38bdf8" strokeOpacity="0.5" strokeDasharray="5 5" fill="#38bdf8" fillOpacity="0.04" />
          <rect x="220" y="70" width="140" height="130" rx="14" stroke={accent} strokeOpacity="0.6" strokeDasharray="5 5" fill={accent} fillOpacity="0.05" />
          <text x="52" y="92" fill="#7dd3fc" fontSize="11" fontFamily="monospace">VLAN 10</text>
          <text x="232" y="92" fill="#fdba74" fontSize="11" fontFamily="monospace">VLAN 50</text>
          <path d="M110 135 L200 40 L290 135" {...stroke} />
          <path d="M110 135 L200 40" stroke="#38bdf8" strokeOpacity="0.6" strokeWidth="1.5" fill="none" />
          <Device x={200} y={40} kind="router" hot />
          <Device x={110} y={135} kind="switch" />
          <Device x={290} y={135} kind="switch" hot />
          <path d="M80 175 L110 135 L140 175 M260 175 L290 135 L320 175" {...stroke} />
          {[80, 140, 260, 320].map((x) => (
            <Device key={x} x={x} y={175} kind="pc" hot={x > 200} />
          ))}
        </g>
      )}

      {variant === 'motion' && (
        <g>
          {[70, 52, 34].map((r, i) => (
            <circle key={r} cx="200" cy="105" r={r} stroke={i === 0 ? accent : '#52525b'} strokeOpacity={i === 0 ? 0.6 : 1} strokeWidth="1.5" fill="none" />
          ))}
          <path d="M190 90 L215 105 L190 120 Z" fill={accent} />
          <line x1="60" y1="200" x2="340" y2="200" {...stroke} />
          {[80, 130, 175, 240, 300].map((x, i) => (
            <rect key={x} x={x - 5} y={195} width="10" height="10" transform={`rotate(45 ${x} 200)`} fill={i === 2 ? accent : '#0A0A0A'} stroke={i === 2 ? accent : '#71717a'} strokeWidth="1.5" />
          ))}
          <line x1="175" y1="182" x2="175" y2="218" stroke={accent} strokeWidth="1.5" />
        </g>
      )}

      {variant === 'creative' && (
        <g>
          <rect x="60" y="40" width="120" height="160" rx="10" {...stroke} />
          <rect x="195" y="40" width="145" height="75" rx="10" {...stroke} />
          <rect x="195" y="125" width="70" height="75" rx="10" stroke={accent} strokeOpacity="0.7" strokeWidth="1.5" fill={accent} fillOpacity="0.06" />
          <rect x="275" y="125" width="65" height="75" rx="10" {...stroke} />
          <circle cx="120" cy="105" r="28" stroke={accent} strokeWidth="1.5" fill="none" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * Math.PI) / 3
            return <line key={i} x1={120 + Math.cos(a) * 10} y1={105 + Math.sin(a) * 10} x2={120 + Math.cos(a + 0.9) * 28} y2={105 + Math.sin(a + 0.9) * 28} stroke={accent} strokeOpacity="0.7" strokeWidth="1.2" />
          })}
          <path d="M205 100 L235 70 L255 88 L275 62 L330 100" {...stroke} />
        </g>
      )}

      {variant === 'web' && (
        <g>
          <rect x="60" y="35" width="280" height="170" rx="12" {...stroke} fill="#0A0A0A" />
          <line x1="60" y1="60" x2="340" y2="60" {...stroke} />
          {[76, 90, 104].map((x, i) => (
            <circle key={x} cx={x} cy="47.5" r="4" fill={i === 0 ? accent : '#3f3f46'} />
          ))}
          {[
            [80, 85, 90],
            [96, 100, 140],
            [96, 115, 110],
            [80, 130, 60],
            [80, 155, 150],
            [96, 170, 90],
          ].map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w} height="6" rx="3" fill={i === 1 || i === 4 ? accent : '#3f3f46'} fillOpacity={i === 1 || i === 4 ? 0.8 : 1} />
          ))}
          <rect x="250" y="80" width="70" height="105" rx="8" stroke={accent} strokeOpacity="0.55" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        </g>
      )}
      {variant === 'security' && (
        <g>
          <circle cx="200" cy="120" r="78" stroke="#52525b" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
          <circle cx="200" cy="120" r="52" stroke="#52525b" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
          <circle cx="200" cy="120" r="26" stroke="#52525b" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
          <path d="M200 120 L200 42" stroke={accent} strokeWidth="1.5" className="animate-spin-slow" style={{ transformOrigin: '200px 120px' }} />
          <path d="M200 42 A78 78 0 0 1 255 65 L200 120 Z" fill={accent} fillOpacity="0.12" className="animate-spin-slow" style={{ transformOrigin: '200px 120px' }} />
          {[[150, 95], [255, 108], [168, 158], [243, 150], [205, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill={i < 3 ? accent : '#71717a'} />
          ))}
          <g transform="translate(200 120)">
            <path d="M0 -30 L26 -20 V4 C26 20 14 30 0 36 C-14 30 -26 20 -26 4 V-20 Z" fill="#0A0A0A" stroke={accent} strokeWidth="2" />
            <path d="M-11 2 L-3 11 L13 -9" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      )}
    </svg>
  )
}

function Device({ x, y, kind, hot = false }: { x: number; y: number; kind: 'router' | 'switch' | 'pc'; hot?: boolean }) {
  const color = hot ? accent : '#71717a'
  if (kind === 'router')
    return (
      <g>
        <circle cx={x} cy={y} r="16" fill="#0A0A0A" stroke={color} strokeWidth="1.5" />
        <path d={`M${x - 7} ${y} H${x + 7} M${x} ${y - 7} V${y + 7}`} stroke={color} strokeWidth="1.5" />
      </g>
    )
  if (kind === 'switch')
    return (
      <g>
        <rect x={x - 18} y={y - 9} width="36" height="18" rx="4" fill="#0A0A0A" stroke={color} strokeWidth="1.5" />
        {[-9, -3, 3, 9].map((d) => (
          <circle key={d} cx={x + d} cy={y} r="1.5" fill={color} />
        ))}
      </g>
    )
  return <rect x={x - 9} y={y - 7} width="18" height="14" rx="3" fill="#0A0A0A" stroke={color} strokeWidth="1.5" />
}
