/**
 * Content types for the portfolio.
 * All editable content lives in `src/data/*`. UI components only read these shapes,
 * so content and presentation stay separated.
 */

export type Locale = 'en' | 'id'

export interface Profile {
  fullName: string
  shortName: string
  title: string
  roles: string[]
  tagline: string
  location: string
  headline: string
  subheadline: string
  description: string
  /** Path to a real photo, e.g. "/assets/images/profile.jpg". `null` shows the premium placeholder. */
  photo: string | null
  /** Path to the CV/Resume PDF, e.g. "/assets/cv/ajiet-cv.pdf". `null` disables the download button. */
  cvUrl: string | null
  about: {
    paragraphs: string[]
    facts: { label: string; value: string }[]
    transferableSkills: { name: string; description: string }[]
  }
}

export type SkillIcon = 'network' | 'code' | 'palette'

export interface SkillCategory {
  id: string
  icon: SkillIcon
  title: string
  summary: string
  /** Honest learning stage, shown instead of fake percentages. */
  stage: string
  skills: string[]
  tools?: string[]
}

export type ProjectStatus = 'Lab Practice' | 'Learning Project' | 'In Progress' | 'Completed'
export type ProjectCategory = 'Networking' | 'Creative' | 'Web Development'

export interface Project {
  /** URL slug: /projects/:slug */
  slug: string
  number: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  summary: string
  technologies: string[]
  /** Topics covered — derived only from the technologies above, never invented. */
  focusAreas?: string[]
  /** Real screenshots, e.g. ["/assets/projects/network-lab/topology.png"]. Empty = placeholder cover. */
  images: string[]
  /** Optional caption per image (same order as `images`). */
  imageCaptions?: string[]
  /** 'contain' shows the whole image on a white card — best for diagrams. Default 'cover'. */
  imageFit?: 'cover' | 'contain'
  /** e.g. 'Mei 2025' */
  date?: string
  /** Longer background paragraphs for the detail page. */
  context?: string[]
  /** Key facts shown on the detail page, e.g. { label: 'Pengguna', value: '600' }. */
  facts?: { label: string; value: string }[]
  /** Optional data table (e.g. VLAN plan). */
  table?: { title: string; columns: string[]; rows: string[][] }
  /** Honest post-project evaluation: what was found and how it is improved. */
  review?: { title: string; intro: string; items: { issue: string; fix: string }[] }
  /** Interactive animation shown on the card and detail page. */
  animation?: 'ccna-topology'
  /** Downloadable files (documentation, .pkt). Only real files. */
  files?: { label: string; href: string }[]
  /** Only real URLs. Leave `null` until a real repository/demo exists. */
  links: { github: string | null; demo: string | null }
  /** Cover art variant used while no screenshot exists. */
  cover: 'topology' | 'vlan' | 'motion' | 'creative' | 'web'
}

export interface Experience {
  role: string
  organization: string
  location?: string
  start: string
  /** `null` = current position ("Present"). */
  end: string | null
  description: string
}

export interface Education {
  degree: string
  institution: string
  graduated: string
  gpa: string
}

export interface Leadership {
  role: string
  organization: string
  period: string
  description: string
  emphasis: string[]
}

export interface Certification {
  name: string
  institution: string
  date: string
  /** Training period, e.g. '12 April – 11 May 2025'. */
  period?: string
  grade?: string
  description: string
  /** Path to the certificate file (PDF/image), e.g. "/assets/certificates/ccne.pdf". `null` = placeholder. */
  fileUrl: string | null
  credentialId: string | null
}

export type ContactType = 'email' | 'whatsapp' | 'linkedin' | 'github' | 'instagram'

export interface ContactChannel {
  type: ContactType
  label: string
  /** Display value, e.g. "name@example.com" or "@username". `null` = not provided yet. */
  value: string | null
  /** Full link, e.g. "mailto:...", "https://wa.me/62...", "https://linkedin.com/in/...". `null` = not provided yet. */
  href: string | null
}

export interface NavItem {
  id: string
  label: string
}
