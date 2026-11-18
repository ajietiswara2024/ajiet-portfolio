import { motion, useReducedMotion } from 'framer-motion'
import { Info, Pause, Play } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  VIEW,
  departments,
  linkKey,
  links,
  nodeById,
  nodes,
  scenarios,
  type NodeKind,
  type TopoNode,
} from '../../data/ccnaTopology'
import { cn } from '../../lib/cn'

const ACCENT = '#F97316'
const DOWN = '#ef4444'
const SEGMENT_SECONDS = 0.55
const HOLD_SECONDS = 0.9

const segmentsOf = (path: string[]) => Math.max(1, path.length - 1)
const stepDuration = (path: string[]) => segmentsOf(path) * SEGMENT_SECONDS

/** Cumulative-distance keyframe times so the packet moves at constant speed. */
function keyframes(path: string[]) {
  const pts = path.map((id) => nodeById[id])
  const d = [0]
  for (let i = 1; i < pts.length; i++) d.push(d[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y))
  const total = d[d.length - 1] || 1
  return { xs: pts.map((p) => p.x), ys: pts.map((p) => p.y), times: d.map((v) => v / total) }
}

interface CcnaTopologyProps {
  /** Compact = card preview: no controls, cycles through all scenarios. */
  compact?: boolean
  className?: string
}

export default function CcnaTopology({ compact = false, className }: CcnaTopologyProps) {
  const reduce = useReducedMotion()
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [run, setRun] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)

  const scenario = scenarios[scenarioIndex]
  const current = scenario.steps[step]

  // Advance steps / scenarios on a timer (works the same with reduced motion).
  useEffect(() => {
    if (!playing) return
    const ms = ((reduce ? 1.6 : stepDuration(current.path)) + HOLD_SECONDS) * 1000
    const t = window.setTimeout(() => {
      if (step < scenario.steps.length - 1) {
        setStep(step + 1)
      } else if (compact) {
        setScenarioIndex((i) => (i + 1) % scenarios.length)
        setStep(0)
      } else {
        setStep(0)
      }
      setRun((r) => r + 1)
    }, ms)
    return () => window.clearTimeout(t)
  }, [playing, step, scenario, current, compact, reduce, run])

  const chooseScenario = (i: number) => {
    setScenarioIndex(i)
    setStep(0)
    setRun((r) => r + 1)
    setPlaying(true)
  }

  const downLinks = useMemo(() => new Set((scenario.downLinks ?? []).map(([a, b]) => linkKey(a, b))), [scenario])
  const downNodes = useMemo(() => new Set(scenario.downNodes ?? []), [scenario])

  // Links already travelled in earlier steps stay softly lit.
  const doneLinks = useMemo(() => {
    const toKeys = (path: string[]) => path.slice(1).map((id, i) => linkKey(path[i], id))
    return new Set(scenario.steps.slice(0, step).flatMap((s) => toKeys(s.path)))
  }, [scenario, step])

  const activeNodes = useMemo(() => new Set(current.path), [current])
  const kf = useMemo(() => keyframes(current.path), [current])
  const info = selected ? nodeById[selected] : null

  const svg = (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="block h-full w-full"
      role="img"
      aria-label={`Animasi topologi jaringan CCNA Final Project — skenario ${scenario.title}`}
    >
      <defs>
        <pattern id="ccna-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgb(255 255 255 / 0.035)" />
        </pattern>
        <radialGradient id="ccna-glow">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.9" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={VIEW.w} height={VIEW.h} fill="url(#ccna-grid)" />

      {/* Internet band */}
      <rect x="180" y="22" width="640" height="92" rx="46" fill="rgb(96 165 250 / 0.05)" stroke="rgb(96 165 250 / 0.25)" strokeDasharray="4 6" />
      <text x="500" y="44" textAnchor="middle" className="fill-sky-300/70 font-mono" fontSize="11" letterSpacing="3">INTERNET</text>

      {/* OSPF Area 0 */}
      <rect x="190" y="140" width="620" height="200" rx="28" fill="rgb(249 115 22 / 0.03)" stroke="rgb(249 115 22 / 0.28)" strokeDasharray="5 7" />
      <text x="500" y="162" textAnchor="middle" fill={ACCENT} opacity="0.75" fontSize="11" letterSpacing="3" className="font-mono">OSPF AREA 0</text>

      {/* Floors & departments */}
      {[1, 2, 3].map((floor) => {
        const ds = departments.filter((d) => d.floor === floor)
        const x0 = ds[0].x - 76
        const x1 = ds[ds.length - 1].x + 76
        return (
          <g key={floor}>
            <text x={(x0 + x1) / 2} y="388" textAnchor="middle" fill="#71717a" fontSize="10" letterSpacing="3" className="font-mono">
              LANTAI {floor}
            </text>
            {ds.map((d) => (
              <g key={d.id}>
                <rect x={d.x - 74} y="400" width="148" height="206" rx="14" fill={d.tint} fillOpacity="0.045" stroke={d.tint} strokeOpacity="0.22" />
                <text x={d.x} y="594" textAnchor="middle" fill={d.tint} fillOpacity="0.85" fontSize="10.5" className="font-mono">
                  {compact ? `VLAN ${d.vlan}` : `${d.name} · VLAN ${d.vlan}`}
                </text>
              </g>
            ))}
          </g>
        )
      })}

      {/* Links */}
      {links.map((l) => {
        const a = nodeById[l.a]
        const b = nodeById[l.b]
        const key = linkKey(l.a, l.b)
        const isDown = downLinks.has(key) || downNodes.has(l.a) || downNodes.has(l.b)
        const base = {
          wan: { stroke: '#71717a', width: 1.6, dash: '6 5', opacity: 0.8 },
          routed: { stroke: '#71717a', width: 1.6, dash: undefined, opacity: 0.8 },
          etherchannel: { stroke: '#a1a1aa', width: 1.4, dash: undefined, opacity: 0.9 },
          trunk: { stroke: '#52525b', width: 1, dash: '3 4', opacity: 0.55 },
          access: { stroke: '#52525b', width: 1.1, dash: undefined, opacity: 0.8 },
        }[l.type]
        const done = doneLinks.has(key)
        if (l.type === 'etherchannel') {
          return (
            <g key={key} opacity={isDown ? 0.25 : 1}>
              {[-4, 4].map((o) => (
                <line key={o} x1={a.x + 30} y1={a.y + o} x2={b.x - 30} y2={b.y + o} stroke={base.stroke} strokeWidth={base.width} />
              ))}
              {!compact && (
                <text x="500" y="292" textAnchor="middle" fill="#a1a1aa" fontSize="10" className="font-mono">
                  Po1 · EtherChannel LACP
                </text>
              )}
            </g>
          )
        }
        return (
          <g key={key}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isDown ? DOWN : done ? ACCENT : base.stroke}
              strokeOpacity={isDown ? 0.7 : done ? 0.45 : base.opacity}
              strokeWidth={base.width}
              strokeDasharray={isDown ? '2 5' : base.dash}
            />
            {downLinks.has(key) && (
              <g transform={`translate(${(a.x + b.x) / 2} ${(a.y + b.y) / 2})`}>
                <circle r="11" fill="#0A0A0A" stroke={DOWN} strokeWidth="1.5" />
                <path d="M-4.5 -4.5 L4.5 4.5 M4.5 -4.5 L-4.5 4.5" stroke={DOWN} strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
          </g>
        )
      })}

      {/* Active path */}
      {current.path.slice(1).map((id, i) => {
        const a = nodeById[current.path[i]]
        const b = nodeById[id]
        return (
          <line
            key={`${run}-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={ACCENT}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeDasharray="6 6"
            className="animate-dash"
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((n) => (
        <NodeGlyph
          key={n.id}
          node={n}
          compact={compact}
          active={activeNodes.has(n.id)}
          down={downNodes.has(n.id)}
          selected={selected === n.id}
          onSelect={compact ? undefined : setSelected}
        />
      ))}

      {/* Packet */}
      {!reduce && (
        <motion.g
          key={`${scenario.id}-${step}-${run}`}
          initial={{ x: kf.xs[0], y: kf.ys[0], opacity: 0 }}
          animate={{ x: kf.xs, y: kf.ys, opacity: 1 }}
          transition={{
            default: { duration: stepDuration(current.path), ease: 'linear', times: kf.times },
            opacity: { duration: 0.2 },
          }}
          style={{ pointerEvents: 'none' }}
        >
          <circle r="16" fill="url(#ccna-glow)" opacity="0.55" />
          <circle r="5.5" fill="#FDBA74" stroke="#fff" strokeWidth="1.2" />
        </motion.g>
      )}
    </svg>
  )

  if (compact) {
    return (
      <div className={cn('relative overflow-hidden bg-ink-2', className)}>
        <div className="absolute inset-0 p-2">{svg}</div>
        <div className="pointer-events-none absolute right-3 bottom-3 left-3 flex items-center gap-2">
          <span className="rounded-full border border-accent/40 bg-ink/85 px-2.5 py-1 font-mono text-[0.62rem] tracking-wider text-accent uppercase backdrop-blur">
            {scenario.label}
          </span>
          <span className="truncate rounded-full border border-line bg-ink/85 px-2.5 py-1 text-[0.7rem] text-fg/85 backdrop-blur">
            {scenario.title}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Scenario controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div role="tablist" aria-label="Skenario animasi" className="flex flex-wrap gap-2">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === scenarioIndex}
              onClick={() => chooseScenario(i)}
              className={cn(
                'min-h-10 rounded-full border px-4 text-sm transition-colors',
                i === scenarioIndex ? 'border-accent bg-accent text-ink' : 'border-line bg-ink-2 text-muted hover:border-fg/30 hover:text-fg',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-ink-2 px-4 text-sm text-muted transition-colors hover:text-fg"
          aria-label={playing ? 'Jeda animasi' : 'Putar animasi'}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
          {playing ? 'Jeda' : 'Putar'}
        </button>
      </div>

      {/* Diagram: scrolls horizontally on small screens so labels stay readable */}
      <div className="card overflow-x-auto">
        <div className="min-w-[44rem] bg-ink-2/60 p-2 sm:p-4" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
          {svg}
        </div>
      </div>
      <p className="text-xs text-muted sm:hidden">Geser diagram ke samping untuk melihat seluruh topologi.</p>

      {/* Steps + device info */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card p-5 sm:p-6">
          <p className="font-mono text-[0.68rem] tracking-widest text-accent uppercase">{scenario.label}</p>
          <h3 className="mt-2 text-lg font-semibold sm:text-xl">{scenario.title}</h3>
          <ol className="mt-4 space-y-2.5">
            {scenario.steps.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    setStep(i)
                    setRun((r) => r + 1)
                  }}
                  className={cn(
                    'flex w-full gap-3 rounded-xl border p-3 text-left text-sm leading-relaxed transition-colors',
                    i === step ? 'border-accent/50 bg-accent/10 text-fg' : 'border-transparent text-muted hover:text-fg',
                  )}
                >
                  <span className={cn('mt-0.5 font-mono text-xs', i === step ? 'text-accent' : 'text-muted/70')}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{s.text}</span>
                </button>
              </li>
            ))}
          </ol>
          {scenario.note && (
            <p className="mt-4 flex gap-2 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              <Info size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              {scenario.note}
            </p>
          )}
        </div>

        <div className="card p-5 sm:p-6" aria-live="polite">
          {info ? (
            <>
              <p className="font-mono text-[0.68rem] tracking-widest text-muted uppercase">Detail perangkat</p>
              <h3 className="mt-2 text-lg font-semibold">{info.title}</h3>
              <p className="mt-1 text-sm text-accent">{info.role}</p>
              <ul className="mt-4 space-y-2">
                {info.details.map((d) => (
                  <li key={d} className="rounded-lg border border-line bg-ink-2 px-3 py-2 font-mono text-xs text-fg/85">
                    {d}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex h-full flex-col justify-center gap-3 text-sm text-muted">
              <Info size={18} className="text-accent" aria-hidden />
              <p>Arahkan kursor, ketuk, atau fokus ke perangkat mana pun di diagram untuk melihat model, peran, dan alamat IP-nya.</p>
              <Legend />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Legend() {
  const item = (swatch: ReactNode, label: string) => (
    <li className="flex items-center gap-2">
      <svg width="28" height="10" aria-hidden>
        {swatch}
      </svg>
      {label}
    </li>
  )
  return (
    <ul className="mt-2 grid gap-1.5 text-xs">
      {item(<line x1="0" y1="5" x2="28" y2="5" stroke="#71717a" strokeWidth="1.6" strokeDasharray="6 5" />, 'Serial WAN ke ISP')}
      {item(<line x1="0" y1="5" x2="28" y2="5" stroke="#71717a" strokeWidth="1.6" />, 'Link routed /30 (OSPF)')}
      {item(<line x1="0" y1="5" x2="28" y2="5" stroke="#52525b" strokeWidth="1" strokeDasharray="3 4" />, 'Trunk ke switch akses')}
      {item(<line x1="0" y1="5" x2="28" y2="5" stroke={ACCENT} strokeWidth="2.6" strokeDasharray="6 6" />, 'Jalur paket aktif')}
      {item(<line x1="0" y1="5" x2="28" y2="5" stroke={DOWN} strokeWidth="1.6" strokeDasharray="2 5" />, 'Link / perangkat mati')}
    </ul>
  )
}

const LABEL_HIDDEN_IN_COMPACT: NodeKind[] = ['pc', 'ap', 'server', 'wlc']

function NodeGlyph({
  node,
  compact,
  active,
  down,
  selected,
  onSelect,
}: {
  node: TopoNode
  compact: boolean
  active: boolean
  down: boolean
  selected: boolean
  onSelect?: (id: string | null) => void
}) {
  const color = down ? DOWN : active || selected ? ACCENT : '#a1a1aa'
  const fill = '#0A0A0A'
  const interactive = Boolean(onSelect)
  const showLabel = !(compact && LABEL_HIDDEN_IN_COMPACT.includes(node.kind))
  const labelY = node.kind === 'isp' ? 30 : node.kind === 'router' ? 32 : node.kind === 'mls' ? 30 : node.kind === 'switch' ? 24 : 24

  return (
    <g
      transform={`translate(${node.x} ${node.y})`}
      opacity={down ? 0.55 : 1}
      {...(interactive
        ? {
            tabIndex: 0,
            role: 'button',
            'aria-label': `${node.title} — ${node.role}`,
            onMouseEnter: () => onSelect!(node.id),
            onFocus: () => onSelect!(node.id),
            onClick: () => onSelect!(node.id),
            style: { cursor: 'pointer', outline: 'none' },
          }
        : {})}
    >
      {/* generous hit area */}
      {interactive && <rect x="-28" y="-24" width="56" height="58" fill="transparent" />}
      {(active || selected) && !down && <circle r={node.kind === 'pc' || node.kind === 'ap' || node.kind === 'server' || node.kind === 'wlc' ? 18 : 30} fill="url(#ccna-glow)" opacity="0.22" />}

      {node.kind === 'isp' && (
        <g>
          <path d="M-26 8 a12 12 0 0 1 4 -20 a16 16 0 0 1 28 -6 a12 12 0 0 1 20 10 a10 10 0 0 1 -2 16 z" fill={fill} stroke={color} strokeWidth="1.6" />
          <text y="5" textAnchor="middle" fill={color} fontSize="10" className="font-mono">ISP</text>
        </g>
      )}
      {node.kind === 'router' && (
        <g>
          <circle r="20" fill={fill} stroke={color} strokeWidth="1.8" />
          <path d="M-9 0 H9 M0 -9 V9 M5 -4 L9 0 L5 4 M-5 -4 L-9 0 L-5 4" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {node.kind === 'mls' && (
        <g>
          <rect x="-28" y="-17" width="56" height="34" rx="7" fill={fill} stroke={color} strokeWidth="1.8" />
          <path d="M-14 -5 H12 M8 -9 L12 -5 L8 -1 M14 5 H-12 M-8 1 L-12 5 L-8 9" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {node.kind === 'switch' && (
        <g>
          <rect x="-24" y="-10" width="48" height="20" rx="4" fill={fill} stroke={color} strokeWidth="1.6" />
          {[-14, -7, 0, 7, 14].map((d) => (
            <rect key={d} x={d - 2} y="-2.5" width="4" height="5" rx="1" fill={color} opacity="0.85" />
          ))}
        </g>
      )}
      {node.kind === 'pc' && (
        <g>
          <rect x="-11" y="-10" width="22" height="15" rx="2" fill={fill} stroke={color} strokeWidth="1.5" />
          <path d="M-5 9 H5 M0 5 V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
      {node.kind === 'ap' && (
        <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
          <circle r="10" fill={fill} />
          <circle cy="3" r="1.6" fill={color} stroke="none" />
          <path d="M-4.5 -0.5 a6.5 6.5 0 0 1 9 0 M-7.5 -3.5 a11 11 0 0 1 15 0" />
        </g>
      )}
      {node.kind === 'server' && (
        <g>
          <rect x="-8" y="-13" width="16" height="25" rx="2" fill={fill} stroke={color} strokeWidth="1.5" />
          <path d="M-4 -7 H4 M-4 -2 H4 M-4 3 H4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </g>
      )}
      {node.kind === 'wlc' && (
        <g>
          <rect x="-14" y="-7" width="28" height="14" rx="3" fill={fill} stroke={color} strokeWidth="1.5" />
          {[-7, 0, 7].map((d) => (
            <circle key={d} cx={d} r="1.6" fill={color} />
          ))}
        </g>
      )}

      {showLabel && (
        <text y={labelY} textAnchor="middle" fill={active || selected ? '#ffffff' : '#a1a1aa'} fontSize={node.kind === 'pc' || node.kind === 'ap' || node.kind === 'server' || node.kind === 'wlc' ? 9.5 : 11} className="font-mono">
          {node.label}
        </text>
      )}
      {down && (
        <text y={node.kind === 'mls' ? -24 : -26} textAnchor="middle" fill={DOWN} fontSize="10" className="font-mono">
          MATI
        </text>
      )}
    </g>
  )
}
