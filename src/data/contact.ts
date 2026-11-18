import type { ContactChannel } from '../types/content'

/**
 * Contact channels.
 * TODO (owner): fill in `value` (what is displayed) and `href` (the link).
 * Channels left as `null` are shown as "Coming soon" and are not clickable.
 *
 * Examples:
 *   email     value: 'you@example.com'        href: 'mailto:you@example.com'
 *   whatsapp  value: '+62 812-0000-0000'      href: 'https://wa.me/6281200000000'
 *   linkedin  value: 'in/your-username'       href: 'https://www.linkedin.com/in/your-username'
 *   github    value: '@your-username'         href: 'https://github.com/your-username'
 *   instagram value: '@your-username'         href: 'https://instagram.com/your-username'
 */
export const contactChannels: ContactChannel[] = [
  {
    type: 'email',
    label: 'Email',
    value: 'andiajietiswaraputra@gmail.com',
    href: 'mailto:andiajietiswaraputra@gmail.com',
  },
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+62 812-5020-0600',
    href: 'https://wa.me/6281250200600',
  },
  {
    type: 'linkedin',
    label: 'LinkedIn',
    value: 'Andi Ajiet Iswara Putra',
    href: 'https://www.linkedin.com/in/andiajietiswaraputra',
  },
  {
    type: 'github',
    label: 'GitHub',
    value: '@ajietiswara2024',
    href: 'https://github.com/ajietiswara2024',
  },
  {
    type: 'instagram',
    label: 'Instagram',
    value: '@andiajietiswaraputa',
    href: 'https://www.instagram.com/andiajietiswaraputa/',
  },
]

/** The channel used by the "Let's Connect" button: the first one that has a link (email preferred). */
export const primaryContact = contactChannels.find((c) => c.href) ?? null
