import { Clock } from 'lucide-react'
import { useRef } from 'react'
import type { Project } from '../../types/content'
import { Reveal } from './Reveal'

type Video = NonNullable<Project['videos']>[number]

/** Vertical video episodes; only one plays at a time. Videos load only when played. */
export function VideoGallery({ videos }: { videos: Video[] }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([])

  const onPlay = (index: number) => {
    refs.current.forEach((v, i) => {
      if (v && i !== index && !v.paused) v.pause()
    })
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <Reveal as="li" key={v.src} delay={(i % 3) * 0.06} className="card flex flex-col overflow-hidden">
          <div className="relative bg-black">
            <video
              ref={(el) => {
                refs.current[i] = el
              }}
              src={v.src}
              poster={v.poster}
              controls
              playsInline
              preload="none"
              onPlay={() => onPlay(i)}
              className="aspect-[9/16] w-full object-contain"
              aria-label={v.title}
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] text-muted">
              <span className="text-accent">EP {String(i + 1).padStart(2, '0')}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} aria-hidden /> {v.duration}
              </span>
            </div>
            <h3 className="mt-3 text-base leading-snug font-semibold text-balance sm:text-lg">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {v.topics.map((t) => (
                <li key={t} className="chip px-2.5 py-0.5 text-[0.7rem]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}
