import type { SVGProps } from 'react'
import { Mail } from 'lucide-react'
import type { ContactType } from '../../types/content'

/** Brand icons (Lucide v1 no longer ships brand logos). Simplified marks, currentColor. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const svg = ({ size = 20, ...p }: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  ...p,
})

export const GithubIcon = (p: IconProps) => (
  <svg {...svg(p)}>
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
)

export const LinkedinIcon = (p: IconProps) => (
  <svg {...svg(p)}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

export const InstagramIcon = (p: IconProps) => (
  <svg {...svg(p)} fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
  </svg>
)

export const WhatsappIcon = (p: IconProps) => (
  <svg {...svg(p)}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.44 9.44 0 0 1-4.81-1.32l-.35-.2-3.58.93.96-3.48-.23-.36A9.43 9.43 0 0 1 2.59 12c0-5.22 4.25-9.46 9.47-9.46a9.4 9.4 0 0 1 6.69 2.77A9.4 9.4 0 0 1 21.52 12c0 5.22-4.25 9.46-9.47 9.46Zm8.05-17.52A11.3 11.3 0 0 0 12.05.64C5.77.64.66 5.75.66 12.03c0 2 .52 3.96 1.52 5.69L.57 23.6l6.02-1.58a11.36 11.36 0 0 0 5.45 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.34-8.05Z" />
  </svg>
)

export function ContactIcon({ type, size = 20 }: { type: ContactType; size?: number }) {
  switch (type) {
    case 'email':
      return <Mail size={size} aria-hidden />
    case 'whatsapp':
      return <WhatsappIcon size={size} />
    case 'linkedin':
      return <LinkedinIcon size={size} />
    case 'github':
      return <GithubIcon size={size} />
    case 'instagram':
      return <InstagramIcon size={size} />
  }
}
