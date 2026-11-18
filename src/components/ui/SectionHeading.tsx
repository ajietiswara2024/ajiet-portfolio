import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: ReactNode
  id?: string
}

export function SectionHeading({ index, eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-3xl sm:mb-16">
      <p className="eyebrow">
        <span className="text-muted">{index}</span>
        <span aria-hidden className="h-px w-6 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-5 text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  )
}
