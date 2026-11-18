import type { Experience } from '../types/content'

/**
 * Pengalaman kerja, terbaru di atas (sumber: CV).
 * `end: null` = masih bekerja (tampil sebagai "Sekarang").
 * Saat pekerjaan selesai, ganti `null` dengan mis. 'Maret 2027'.
 */
export const experience: Experience[] = [
  {
    role: 'Staf Administrasi & Pelayanan',
    organization: 'Klinik Mandiri drg. Indra Setiabudi, Sp.Pros',
    start: 'Desember 2024',
    end: null,
    description:
      'Bertanggung jawab atas pengelolaan administrasi klinik, termasuk pendaftaran pasien, pengarsipan rekam medis, pengelolaan jadwal praktik, serta pencatatan transaksi dan laporan harian. Memberikan pelayanan langsung kepada pasien dengan komunikasi yang ramah dan informatif, serta mendukung operasional klinik agar berjalan tertib, efisien, dan sesuai prosedur.',
  },
  {
    role: 'Guru Bimbingan dan Konseling',
    organization: 'SMKS Daarussalaam Jakarta',
    start: 'Januari 2024',
    end: 'Desember 2024',
    description:
      'Melaksanakan layanan bimbingan dan konseling bagi siswa secara individu maupun kelompok untuk membantu perkembangan akademik, sosial, dan pribadi. Mengidentifikasi permasalahan siswa, menyusun program BK, dan memberikan pendampingan yang terarah dan solutif, serta berkoordinasi dengan wali kelas dan orang tua dan menyusun laporan perkembangan secara berkala.',
  },
  {
    role: 'Staf Administrasi Pesantren',
    organization: 'Pondok Pesantren Darul Aman Gombara, Makassar',
    start: 'Januari 2020',
    end: 'September 2022',
    description:
      'Mengelola sistem administrasi dan operasional pesantren, termasuk pendataan santri, pengarsipan dokumen resmi, serta penyusunan laporan akademik dan kegiatan. Memastikan akurasi data dan ketertiban arsip, menjadi penghubung antara pimpinan, tenaga pendidik, dan orang tua, serta membantu pengelolaan data yang lebih terstruktur dan terdokumentasi.',
  },
]
