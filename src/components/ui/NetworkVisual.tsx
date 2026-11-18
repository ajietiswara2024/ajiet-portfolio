import { memo } from 'react'

/**
 * Decorative network abstraction for the hero: nodes, links and data packets.
 * Pure SVG + SMIL (no JS per frame) to keep it light on mobile.
 */
const nodes = [
  { x: 90, y: 120, r: 3 },
  { x: 230, y: 70, r: 4, hub: true },
  { x: 380, y: 150, r: 3 },
  { x: 520, y: 60, r: 3 },
  { x: 690, y: 130, r: 5, hub: true },
  { x: 150, y: 300, r: 3 },
  { x: 330, y: 330, r: 5, hub: true },
  { x: 560, y: 290, r: 3 },
  { x: 740, y: 360, r: 3 },
  { x: 60, y: 480, r: 3 },
  { x: 250, y: 520, r: 3 },
  { x: 470, y: 470, r: 4, hub: true },
  { x: 650, y: 540, r: 3 },
] as const

const links: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [1, 6], [2, 6], [4, 7], [5, 6], [6, 7],
  [7, 8], [5, 9], [9, 10], [10, 6], [6, 11], [11, 7], [11, 12], [8, 12], [0, 5],
]

const packets = [
  { path: [0, 1, 6, 11], dur: 7 },
  { path: [4, 7, 6, 5], dur: 8 },
  { path: [12, 11, 6, 2, 3], dur: 9 },
]

const toPath = (ids: number[]) =>
  ids.map((id, i) => `${i === 0 ? 'M' : 'L'}${nodes[id].x} ${nodes[id].y}`).join(' ')

function NetworkVisualBase({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id="nv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nv-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <g stroke="url(#nv-fade)" strokeWidth="1">
        {links.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>

      {/* Highlighted route */}
      <path
        d={toPath([0, 1, 6, 11, 12])}
        fill="none"
        stroke="#F97316"
        strokeOpacity="0.45"
        strokeWidth="1.25"
        strokeDasharray="4 6"
        className="animate-dash"
      />

      {nodes.map((n, i) => (
        <g key={i}>
          {'hub' in n && <circle cx={n.x} cy={n.y} r={n.r * 5} fill="url(#nv-glow)" opacity="0.18" />}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={'hub' in n ? '#F97316' : '#0A0A0A'}
            stroke={'hub' in n ? '#F97316' : '#52525b'}
            strokeWidth="1.25"
          />
        </g>
      ))}

      <g className="motion-reduce:hidden">
        {packets.map((p, i) => (
          <circle key={i} r="2.5" fill="#FDBA74">
            <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" path={toPath(p.path)} />
          </circle>
        ))}
      </g>
    </svg>
  )
}

export const NetworkVisual = memo(NetworkVisualBase)
