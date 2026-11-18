import type { Certification } from '../types/content'

/**
 * Sertifikasi. File ada di /public/assets/certificates/.
 * Isi `fileUrl: null` untuk menampilkan placeholder "segera tersedia".
 */
export const certifications: Certification[] = [
  {
    name: 'AI for Work & Career Readiness with Google AI Products',
    institution: 'Hacktiv8 Indonesia · Maju Bareng AI',
    date: '15 Mei 2026',
    period: '9 – 11 Mei 2026 (10 jam)',
    description:
      'Pelatihan program Maju Bareng AI — bagian dari AI Opportunity Fund: Asia-Pacific bersama AVPN, didukung Google.org dan ADB — tentang pemanfaatan produk AI Google untuk produktivitas kerja dan kesiapan karier.',
    fileUrl: '/assets/certificates/hacktiv8-maju-bareng-ai-google-ai-products.pdf',
    credentialId: '04983/H8/CSR/MBA2/V/2026',
  },
  {
    name: 'Cisco Certified Network Engineer — Certified Accelerator',
    institution: 'Course-Net Indonesia',
    date: '11 Mei 2025',
    period: '12 April – 11 Mei 2025',
    grade: 'B+',
    description:
      'Program pelatihan berbasis kurikulum CCNA (Cisco Certified Network Associate) yang berfokus pada dasar-dasar jaringan Cisco dan keterampilan praktis network engineering — IP addressing, subnetting, VLAN, routing dasar, switching, serta konfigurasi perangkat di Cisco Packet Tracer.',
    fileUrl: '/assets/certificates/course-net-ccne-accelerator-competency.pdf',
    credentialId: '2505/PK-00027',
  },
  {
    name: 'Cisco Certified Network Academy Bootcamp — Sertifikat Kehadiran',
    institution: 'Course-Net Indonesia',
    date: '11 Mei 2025',
    period: '12 April – 11 Mei 2025',
    description:
      'Sertifikat penyelesaian atas keikutsertaan dalam bootcamp CCNA (Cisco Certified Network Associate) di Course-Net Indonesia.',
    fileUrl: '/assets/certificates/course-net-ccne-attendance-completion.pdf',
    credentialId: '2505/PK-00027',
  },
]
