import type { Profile } from '../types/content'

/**
 * Profil pribadi.
 * `photo` dan `cvUrl` mengarah ke file di /public/assets. Ganti filenya (nama sama)
 * atau ubah path-nya. Isi `null` untuk menampilkan placeholder / tombol non-aktif.
 */
export const profile: Profile = {
  fullName: 'A. Ajiet Iswara Putra',
  shortName: 'Ajiet',
  title: 'IT & Network Enthusiast | Desainer Kreatif | Web Developer Pemula',
  roles: ['IT & Network Enthusiast', 'Desainer Kreatif', 'Web Developer Pemula'],
  tagline: 'Menghubungkan Teknologi, Kreativitas, dan Manusia.',
  location: 'Jakarta Barat, Indonesia',
  headline: 'Halo, saya Ajiet.',
  subheadline: 'Menjelajahi titik temu antara Teknologi, Jaringan, Pemrograman, dan Desain Kreatif.',
  description:
    'Berlatar belakang pendidikan dan pelayanan publik, kini menekuni jaringan komputer dan infrastruktur IT — dengan semangat yang terus tumbuh untuk membangun solusi digital.',

  photo: '/assets/images/profile.jpg',
  cvUrl: '/assets/cv/A-Ajiet-Iswara-Putra-CV.pdf',

  about: {
    paragraphs: [
      'Saya lulusan S1 Bimbingan dan Penyuluhan Islam dari Universitas Islam Ahmad Dahlan Sinjai. Perjalanan profesional saya berakar pada administrasi, pelayanan publik, pendidikan, dan pembinaan — pekerjaan yang mengajarkan saya untuk mendengarkan dengan saksama, mendokumentasikan dengan teliti, dan menyelesaikan masalah nyata.',
      'Seiring waktu, ketertarikan saya pada teknologi informasi tumbuh menjadi arah karier yang saya pilih dengan sadar. Saya berfokus pada jaringan komputer dan infrastruktur IT, sambil membangun dasar pemrograman dan karya digital kreatif. Pada 2025 saya menyelesaikan pelatihan CCNA (Cisco Certified Network Associate) di Course-Net, dan terus mengasah kemampuan melalui praktik laboratorium jaringan, eksplorasi teknologi, dan proyek digital.',
      'Bagi saya, peralihan ini adalah proses pengembangan kompetensi profesional — bukan klaim bahwa saya sudah menjadi senior engineer. Yang saya bawa adalah kemampuan komunikasi, pemecahan masalah, dan kemauan belajar yang kuat, untuk diterapkan di titik temu antara teknologi, kreativitas, dan manusia.',
    ],
    facts: [
      { label: 'Gelar', value: 'S1 Bimbingan dan Penyuluhan Islam' },
      { label: 'Kampus', value: 'Universitas Islam Ahmad Dahlan Sinjai' },
      { label: 'Lulus', value: 'Oktober 2020' },
      { label: 'IPK', value: '3.16 / 4.00' },
      { label: 'Pelatihan', value: 'CCNA (Cisco Certified Network Associate) — Course-Net, 2025' },
      { label: 'Pelatihan AI', value: 'Google AI Products — Hacktiv8, 2026' },
      { label: 'Fokus', value: 'Jaringan · IT Support · Infrastruktur' },
      { label: 'Domisili', value: 'Jakarta Barat, Indonesia' },
    ],
    transferableSkills: [
      { name: 'Komunikasi', description: 'Menjelaskan dengan jelas kepada siswa, pasien, dan tim.' },
      { name: 'Pemecahan Masalah', description: 'Mengurai persoalan dan mencari solusi yang praktis.' },
      { name: 'Berpikir Kritis', description: 'Menguji asumsi sebelum mengambil tindakan.' },
      { name: 'Dokumentasi', description: 'Menjaga catatan tetap akurat, rapi, dan mudah ditelusuri.' },
      { name: 'Kolaborasi Tim', description: 'Berkoordinasi dengan rekan kerja lintas peran.' },
      { name: 'Adaptabilitas', description: 'Berpindah dari pendidikan, pelayanan, hingga teknologi.' },
      { name: 'Berpikir Analitis', description: 'Membaca pola — dari perilaku manusia hingga paket data jaringan.' },
    ],
  },
}
