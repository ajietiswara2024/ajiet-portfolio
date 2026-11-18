import type { SkillCategory } from '../types/content'

/**
 * Keahlian per kategori. Tanpa persentase — kolom `stage` menjelaskan
 * tahap belajar secara jujur.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'networking',
    icon: 'network',
    title: 'Jaringan & Infrastruktur IT',
    summary:
      'Fokus utama. Dilatih melalui program CCNA (Cisco Certified Network Associate) di Course-Net dan dipraktikkan di lingkungan lab simulasi.',
    stage: 'Fokus utama · Terlatih & praktik lab',
    skills: [
      'Jaringan Cisco',
      'Dasar-dasar CCNA',
      'Pengalamatan IPv4',
      'Subnetting & VLSM',
      'VLAN & Trunking',
      'Inter-VLAN Routing',
      'Routing Statis',
      'OSPF',
      'NAT & PAT',
      'ACL',
      'DHCP',
      'SSH',
      'STP',
      'EtherChannel',
      'HSRP',
      'Troubleshooting Jaringan',
      'Sistem Operasi (Windows, Linux)',
    ],
    tools: ['Cisco Packet Tracer', 'Wireshark'],
  },
  {
    id: 'programming',
    icon: 'code',
    title: 'Pemrograman & Pengembangan',
    summary:
      'Bidang yang sedang aktif saya pelajari. Membangun dasar secara bertahap melalui latihan dan proyek pribadi, termasuk website ini.',
    stage: 'Sedang dipelajari · Tingkat dasar',
    skills: ['Dasar Python', 'HTML', 'CSS', 'Dasar JavaScript', 'Git & GitHub', 'Dasar Pengembangan Web'],
  },
  {
    id: 'creative',
    icon: 'palette',
    title: 'Desain Kreatif',
    summary:
      'Penceritaan visual dan pembuatan konten — dari desain grafis dan olah foto hingga motion graphics dan video.',
    stage: 'Pengalaman langsung · Karya pribadi & konten',
    skills: [
      'Desain Grafis',
      'Dasar UI/UX',
      'Motion Graphics',
      'Editing Video',
      'Penceritaan Visual',
      'Pembuatan Konten Digital',
    ],
    tools: ['Adobe Photoshop', 'Adobe Premiere Pro', 'Lightroom', 'Canva', 'Figma', 'VN Editor', 'Blender'],
  },
]
