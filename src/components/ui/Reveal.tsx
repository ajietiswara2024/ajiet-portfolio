import { motion, type HTMLMotionProps } from 'framer-motion'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
  /** Render as a list item when used inside <ul>/<ol>. */
  as?: 'div' | 'li'
}

/** Subtle fade-up when the element scrolls into view (runs once). */
export function Reveal({ delay = 0, y = 24, as = 'div', children, ...rest }: RevealProps) {
  const motionProps = {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
  if (as === 'li') {
    return (
      <motion.li {...motionProps} {...(rest as HTMLMotionProps<'li'>)}>
        {children}
      </motion.li>
    )
  }
  return (
    <motion.div {...motionProps} {...rest}>
      {children}
    </motion.div>
  )
}
