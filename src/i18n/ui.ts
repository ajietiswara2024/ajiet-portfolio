import type { Locale, ProjectCategory, ProjectStatus } from '../types/content'

/**
 * Interface strings (buttons, labels, section headings).
 * The active language is Bahasa Indonesia (`ACTIVE_LOCALE = 'id'`).
 * The English dictionary is kept so an English version can be restored later
 * (content in src/data would also need an English copy).
 */
const id = {
  nav: { home: 'Beranda', menu: 'Buka menu', close: 'Tutup menu', skip: 'Langsung ke konten', primary: 'Navigasi utama', footer: 'Navigasi footer' },
  hero: {
    available: 'Terbuka untuk peluang baru',
    viewProjects: 'Lihat Proyek Saya',
    downloadCv: 'Unduh CV',
    contact: 'Hubungi Saya',
    cvSoon: 'CV segera tersedia',
    scroll: 'Gulir',
    titleLabel: 'Jabatan profesional',
    locationLabel: 'Lokasi',
    certified: 'Pelatihan · Course-Net',
  },
  sections: {
    about: { eyebrow: 'Tentang Saya', title: 'Dari membimbing manusia hingga menghubungkan jaringan.', description: '' },
    skills: {
      eyebrow: 'Keahlian',
      title: 'Keahlian teknis, dipetakan dengan jujur.',
      description:
        'Dikelompokkan per bidang dan diberi label tahap belajar — tanpa persentase yang dilebih-lebihkan. Jaringan adalah fokus utama saya; pemrograman dan desain kreatif berkembang di sampingnya.',
    },
    projects: {
      eyebrow: 'Karya Pilihan',
      title: 'Proyek & karya.',
      description:
        'Proyek jaringan, karya kreatif, dan pengembangan web. Setiap proyek diberi label apa adanya — selesai, proyek pembelajaran, atau sedang berjalan.',
    },
    experience: {
      eyebrow: 'Pengalaman',
      title: 'Perjalanan profesional.',
      description:
        'Peran di bidang administrasi, pelayanan publik, dan pendidikan — tempat saya membangun kebiasaan berkomunikasi, mendokumentasikan, dan memecahkan masalah yang kini saya bawa ke dunia teknologi.',
    },
    education: { eyebrow: 'Pendidikan & Kepemimpinan', title: 'Fondasi dalam memahami manusia dan memimpin.', description: '' },
    certifications: { eyebrow: 'Sertifikasi', title: 'Sertifikasi & pelatihan.', description: '' },
  },
  about: { transferable: 'Kemampuan yang dapat diterapkan di berbagai bidang' },
  skills: { tools: 'Tools', skills: 'Topik utama' },
  projects: {
    viewDetails: 'Lihat Detail',
    back: 'Kembali ke proyek',
    project: 'Proyek',
    focus: 'Cakupan proyek',
    stack: 'Tools & teknologi',
    gallery: 'Galeri',
    galleryEmpty: 'Screenshot akan ditambahkan di sini setelah dokumentasi proyek selesai.',
    slot: 'Slot',
    coverSoon: 'Screenshot segera hadir',
    screenshot: 'screenshot',
    technologies: 'Teknologi',
    links: 'Tautan',
    noLinks: 'Belum ada repository publik atau demo. Tautan akan ditambahkan setelah tersedia.',
    next: 'Proyek berikutnya',
    notFound: 'Proyek tidak ditemukan.',
    viewCode: 'Lihat Repository',
    viewDemo: 'Demo Langsung',
    context: 'Latar belakang',
    facts: 'Ringkasan teknis',
    openImage: 'Buka gambar ukuran penuh',
    files: 'Unduhan',
    verified: 'Terverifikasi',
    completed: 'Selesai',
    animation: 'Simulasi alur data',
    animationHint: 'Animasi berdasarkan topologi dan alamat IP asli proyek. Pilih skenario untuk melihat bagaimana paket berpindah di jaringan.',
    original: 'Topologi asli (Cisco Packet Tracer)',
    episodes: 'Episode — putar langsung',
  },
  status: {
    'Lab Practice': 'Praktik Lab',
    'Learning Project': 'Proyek Pembelajaran',
    'In Progress': 'Sedang Berjalan',
    Completed: 'Selesai',
  } satisfies Record<ProjectStatus, string>,
  category: {
    Networking: 'Jaringan',
    Creative: 'Kreatif',
    'Web Development': 'Pengembangan Web',
  } satisfies Record<ProjectCategory, string>,
  experience: { present: 'Sekarang', current: 'Saat ini' },
  education: { graduated: 'Lulus', gpa: 'IPK', leadership: 'Pengalaman organisasi & kepemimpinan', emphasis: 'Fokus' },
  certifications: {
    view: 'Lihat Sertifikat',
    soon: 'File sertifikat segera tersedia',
    issued: 'Terbit',
    period: 'Periode',
    credential: 'ID Kredensial',
    grade: 'Nilai',
  },
  contact: {
    eyebrow: 'Kontak',
    title: 'Punya proyek atau peluang kerja sama?',
    description:
      'Saya selalu terbuka untuk menjajaki peluang baru, berkolaborasi dalam proyek menarik, dan terhubung dengan orang-orang di industri teknologi maupun kreatif.',
    connect: 'Mari Terhubung',
    resume: 'Unduh Resume',
    soon: 'Segera hadir',
  },
  portrait: { alt: 'Foto', placeholder: 'Tempat foto' },
  notFound: { code: '404 · Host tujuan tidak dapat dijangkau', message: 'Halaman ini tidak ditemukan.', back: 'Kembali ke beranda', title: 'Tidak ditemukan' },
  footer: { credit: 'Dirancang dengan rasa ingin tahu. Dibangun dengan teknologi.', top: 'Kembali ke atas' },
  meta: { defaultTitle: 'A. Ajiet Iswara Putra — IT & Network Enthusiast, Desainer Kreatif' },
}

export type UiStrings = typeof id

const en: UiStrings = {
  nav: { home: 'Home', menu: 'Open menu', close: 'Close menu', skip: 'Skip to content', primary: 'Primary', footer: 'Footer' },
  hero: {
    available: 'Open to opportunities',
    viewProjects: 'View My Projects',
    downloadCv: 'Download CV',
    contact: 'Contact Me',
    cvSoon: 'CV available soon',
    scroll: 'Scroll',
    titleLabel: 'Professional title',
    locationLabel: 'Location',
    certified: 'Training · Course-Net',
  },
  sections: {
    about: { eyebrow: 'About', title: 'From guiding people to connecting networks.', description: '' },
    skills: {
      eyebrow: 'Expertise',
      title: 'Technical expertise, honestly mapped.',
      description:
        'Grouped by area and labelled by learning stage — no inflated percentages. Networking is my primary focus; programming and creative design grow alongside it.',
    },
    projects: {
      eyebrow: 'Selected Work',
      title: 'Projects & work.',
      description:
        'Networking projects, creative work, and web development. Each project is labelled honestly — completed, learning project, or in progress.',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Professional timeline.',
      description:
        'Roles in administration, public service, and education — where I built the communication, documentation, and problem-solving habits I now bring to technology.',
    },
    education: { eyebrow: 'Education & Leadership', title: 'Foundations in people and leadership.', description: '' },
    certifications: { eyebrow: 'Certifications', title: 'Credentials & training.', description: '' },
  },
  about: { transferable: 'Transferable strengths' },
  skills: { tools: 'Tools', skills: 'Core topics' },
  projects: {
    viewDetails: 'View Details',
    back: 'Back to projects',
    project: 'Project',
    focus: 'What it covers',
    stack: 'Tools & technologies',
    gallery: 'Gallery',
    galleryEmpty: 'Screenshots will be added here as the project documentation is completed.',
    slot: 'Slot',
    coverSoon: 'Screenshot coming soon',
    screenshot: 'screenshot',
    technologies: 'Technologies',
    links: 'Links',
    noLinks: 'No public repository or demo yet. Links will be added once they are available.',
    next: 'Next project',
    notFound: 'Project not found.',
    viewCode: 'View Repository',
    viewDemo: 'Live Demo',
    context: 'Background',
    facts: 'Technical summary',
    openImage: 'Open full-size image',
    files: 'Downloads',
    verified: 'Verified',
    completed: 'Completed',
    animation: 'Data flow simulation',
    animationHint: 'Animation based on the project’s real topology and IP addressing. Pick a scenario to see how packets move through the network.',
    original: 'Original topology (Cisco Packet Tracer)',
    episodes: 'Episodes — play inline',
  },
  status: { 'Lab Practice': 'Lab Practice', 'Learning Project': 'Learning Project', 'In Progress': 'In Progress', Completed: 'Completed' },
  category: { Networking: 'Networking', Creative: 'Creative', 'Web Development': 'Web Development' },
  experience: { present: 'Present', current: 'Current' },
  education: { graduated: 'Graduated', gpa: 'GPA', leadership: 'Leadership experience', emphasis: 'Emphasis' },
  certifications: {
    view: 'View Certificate',
    soon: 'Certificate file coming soon',
    issued: 'Issued',
    period: 'Period',
    credential: 'Credential ID',
    grade: 'Grade',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Have a project or opportunity in mind?',
    description:
      "I'm always open to exploring new opportunities, collaborating on interesting projects, and connecting with people in technology and creative industries.",
    connect: "Let's Connect",
    resume: 'Download Resume',
    soon: 'Coming soon',
  },
  portrait: { alt: 'Portrait of', placeholder: 'Photo placeholder' },
  notFound: { code: '404 · Destination host unreachable', message: 'This page could not be found.', back: 'Back to home', title: 'Not found' },
  footer: { credit: 'Designed with curiosity. Built with technology.', top: 'Back to top' },
  meta: { defaultTitle: 'A. Ajiet Iswara Putra — IT & Network Enthusiast, Creative Designer' },
}

const dictionaries: Record<Locale, UiStrings> = { id, en }

export const ACTIVE_LOCALE: Locale = 'id'
export const ui = dictionaries[ACTIVE_LOCALE]
