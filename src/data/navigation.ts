import type { NavItem } from '../types/content'

/** `id` harus sama dengan atribut `id` setiap section di halaman utama. */
export const navItems: NavItem[] = [
  { id: 'projects', label: 'Proyek' },
  { id: 'about', label: 'Tentang' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'education', label: 'Pendidikan' },
  { id: 'certifications', label: 'Sertifikasi' },
  { id: 'contact', label: 'Kontak' },
]
