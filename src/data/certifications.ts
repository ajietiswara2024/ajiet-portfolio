import type { Certification } from '../types/content'

/**
 * Sertifikasi. File ada di /public/assets/certificates/.
 * Isi `fileUrl: null` untuk menampilkan placeholder "segera tersedia".
 */
export const certifications: Certification[] = [
  {
    name: 'Cisco Certified Network Engineer — Certified Accelerator',
    institution: 'Course-Net Indonesia',
    date: '11 Mei 2025',
    period: '12 April – 11 Mei 2025',
    grade: 'B+',
    description:
      'Program pelatihan profesional yang berfokus pada dasar-dasar jaringan Cisco dan keterampilan praktis network engineering — IP addressing, subnetting, VLAN, routing dasar, switching, serta konfigurasi perangkat di Cisco Packet Tracer.',
    fileUrl: '/assets/certificates/course-net-ccne-accelerator-competency.pdf',
    credentialId: '2505/PK-00027',
  },
  {
    name: 'Cisco Certified Network Academy Bootcamp — Sertifikat Kehadiran',
    institution: 'Course-Net Indonesia',
    date: '11 Mei 2025',
    period: '12 April – 11 Mei 2025',
    description:
      'Sertifikat penyelesaian atas keikutsertaan dalam bootcamp Cisco Certified Network Academy di Course-Net Indonesia.',
    fileUrl: '/assets/certificates/course-net-ccne-attendance-completion.pdf',
    credentialId: '2505/PK-00027',
  },
]
