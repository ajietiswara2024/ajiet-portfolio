import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** External/anchor href, or internal route when `to` is used. `null` renders a disabled button. */
  href?: string | null
  to?: string
  variant?: Variant
  icon?: ReactNode
  iconRight?: ReactNode
  /** Text shown as a tooltip/label suffix when disabled. */
  disabledLabel?: string
  children: ReactNode
}

const base =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-300 ease-[var(--ease-premium)] select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink hover:bg-accent-soft hover:shadow-[0_0_0_6px_rgb(249_115_22_/_0.15)] active:scale-[0.98]',
  secondary:
    'border border-line bg-ink-2 text-fg hover:border-fg/30 hover:bg-card active:scale-[0.98]',
  ghost: 'text-muted hover:text-fg',
}

export function ButtonLink({
  href,
  to,
  variant = 'primary',
  icon,
  iconRight,
  disabledLabel,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className)
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title={disabledLabel}
        className={cn(
          base,
          'cursor-not-allowed border border-dashed border-line bg-transparent text-muted/70',
          className,
        )}
      >
        {icon}
        <span>{children}</span>
        {disabledLabel && <span className="sr-only">({disabledLabel})</span>}
      </span>
    )
  }

  const external = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  )
}
