import type { Project } from '../types/content'

/**
 * Daftar proyek.
 *
 * Menambah proyek baru: salin satu objek di bawah, beri `slug` unik,
 * lalu simpan screenshot di /public/assets/projects/<slug>/.
 * Isi `links.github` / `links.demo` hanya jika URL-nya benar-benar ada.
 * `status` dan `category` memakai kunci bahasa Inggris; labelnya diterjemahkan di src/i18n/ui.ts.
 */
export const projects: Project[] = [
  {
    slug: 'ccna-final-project-jaringan-gedung-perusahaan',
    number: '01',
    title: 'CCNA Final Project: Jaringan Gedung Perusahaan',
    category: 'Networking',
    status: 'Completed',
    date: 'Mei 2025',
    summary:
      'Final project CCNA Skills Assessment di Course-Net: merancang dan mengimplementasikan jaringan gedung baru tiga lantai untuk perusahaan dengan 600 staf, lengkap dengan redundansi perangkat dan koneksi ke dua ISP.',
    context: [
      'Studi kasus: sebuah perusahaan dagang dengan 600 staf pindah ke gedung baru yang belum memiliki jaringan. Saya ditugaskan merancang topologi logis dan mengimplementasikannya di Cisco Packet Tracer — tiga lantai, enam segmen (lima departemen dan ruang server), serta koneksi ke dua penyedia internet.',
      'Desain memakai model hierarkis dengan redundansi di setiap lapisan: dua router ISR 4331 yang masing-masing terhubung ke ISP1 dan ISP2, dua multilayer switch Catalyst 3650 sebagai core/distribution dengan HSRP dan EtherChannel LACP, serta enam switch akses Catalyst 2960. Seluruh perangkat pengguna mendapat IP dari server DHCP terpusat di ruang server, dan setiap departemen punya WiFi sendiri yang dikelola WLC.',
    ],
    facts: [
      { label: 'Skala', value: '600 pengguna · 3 lantai' },
      { label: 'Segmen', value: '7 VLAN dari 172.29.0.0/16' },
      { label: 'Core', value: '2× Catalyst 3650 (HSRP, LACP)' },
      { label: 'Edge', value: '2× ISR 4331 · dual ISP' },
      { label: 'Akses', value: '6× Catalyst 2960' },
      { label: 'Wireless', value: 'WLC 3504 + 5× AP 3702i' },
      { label: 'Routing', value: 'OSPF Area 0' },
      { label: 'Program', value: 'Course-Net · CCNA Skills Assessment' },
    ],
    technologies: [
      'Cisco Packet Tracer',
      'VLAN & Trunking',
      'Inter-VLAN Routing',
      'OSPF',
      'HSRP',
      'EtherChannel (LACP)',
      'STP PortFast',
      'DHCP',
      'Port Security',
      'SSH',
      'WLC & WPA2',
      'Static & Floating Route',
      'NAT/PAT & ACL',
    ],
    focusAreas: [
      'Subnetting 172.29.0.0/16 untuk 7 VLAN sesuai kebutuhan tiap departemen',
      'Inter-VLAN routing di multilayer switch dengan HSRP (gateway virtual)',
      'OSPF Area 0 antara router dan multilayer switch',
      'EtherChannel LACP antar multilayer switch',
      'DHCP terpusat dengan ip helper-address; IP statis untuk server',
      'WiFi per departemen dikelola terpusat oleh WLC (WPA2)',
      'Port Security sticky (shutdown) di departemen Finance & Accounting',
      'Akses jarak jauh aman dengan SSH di router dan multilayer switch',
    ],
    table: {
      title: 'Rencana VLAN & pengalamatan',
      columns: ['VLAN', 'Segmen', 'Network', 'Gateway (HSRP VIP)'],
      rows: [
        ['10', 'Sales & Marketing', '172.29.1.0/25', '172.29.1.10'],
        ['20', 'HR & Logistik', '172.29.1.128/25', '172.29.1.138'],
        ['30', 'Finance & Accounting', '172.29.2.0/25', '172.29.2.10'],
        ['40', 'Admin & Relation', '172.29.2.128/25', '172.29.2.138'],
        ['50', 'ICT', '172.29.3.0/25', '172.29.3.10'],
        ['60', 'Data Center (server)', '172.29.3.128/28', '172.29.3.134'],
        ['88', 'Management / Native', '172.29.3.144/28', '—'],
      ],
    },
    review: {
      title: 'Evaluasi pasca-proyek',
      intro:
        'Setelah proyek selesai, saya meninjau ulang running-config dan dokumentasinya. Berikut temuan saya beserta langkah perbaikannya — bagian dari proses belajar untuk membangun jaringan yang lebih andal.',
      items: [
        {
          issue: 'Salah ketik alamat pada network statement OSPF di MLS1 dan IP VLAN 88 di MLS2 (172.2.3.x).',
          fix: 'Koreksi menjadi 172.29.3.x agar adjacency OSPF dan jaringan manajemen berjalan normal.',
        },
        {
          issue: 'Subnet VLAN belum diiklankan ke OSPF, sehingga router tidak memiliki rute balik ke LAN.',
          fix: 'Tambahkan network statement untuk seluruh VLAN dan passive-interface di SVI pengguna.',
        },
        {
          issue: 'Default route, floating static route, dan NAT/PAT belum diterapkan.',
          fix: 'Terapkan default route ke ISP1 dengan floating route (AD 10) ke ISP2, serta PAT dengan ACL 172.29.0.0/16.',
        },
        {
          issue: 'BPDU Guard belum aktif dan VTY 5–15 masih menerima Telnet.',
          fix: 'Aktifkan BPDU Guard di port PortFast dan batasi semua VTY hanya untuk SSH versi 2.',
        },
        {
          issue: 'Subnet manajemen /28 sudah terpakai penuh (14/14 host).',
          fix: 'Pada revisi desain berikutnya, perbesar ke /27 agar ada ruang untuk HSRP di VLAN 88 dan perangkat baru.',
        },
      ],
    },
    images: ['/assets/projects/ccna-final-project/topologi-jaringan.png'],
    imageCaptions: ['Topologi asli di Cisco Packet Tracer — dual ISP, OSPF Area 0, dan enam segmen di tiga lantai.'],
    imageFit: 'contain',
    animation: 'ccna-topology',
    links: { github: null, demo: null },
    cover: 'topology',
  },
  {
    slug: 'motion-graphics-edukasi-jaringan',
    number: '02',
    title: 'Motion Graphics Edukasi Jaringan',
    category: 'Creative',
    status: 'Completed',
    date: 'November 2026',
    summary:
      'Seri video edukasi vertikal yang menjelaskan cara kerja jaringan dan internet dengan bahasa sederhana — dari Wi-Fi publik, server, jaringan gedung perkantoran, mesin pencari, hingga BTS 5G.',
    context: [
      'Seri ini lahir dari keinginan saya menjelaskan konsep jaringan yang saya pelajari di CCNA kepada orang awam: singkat, visual, dan mudah dipahami di media sosial. Setiap episode berdurasi sekitar 1–3 menit dalam format vertikal 1080×1920.',
      'Alurnya: menyusun naskah dan merekam voice over, lalu membangun animasi secara terprogram dengan Remotion (React + TypeScript) — termasuk ilustrasi 3D berbasis SVG, subtitle yang disinkronkan per kata, musik, dan efek suara. Pendekatan berbasis kode membuat setiap adegan presisi dan mudah direvisi.',
    ],
    facts: [
      { label: 'Episode', value: '5 video final' },
      { label: 'Format', value: 'Vertikal 1080×1920 · 30 fps' },
      { label: 'Durasi', value: '±1–3 menit per episode' },
      { label: 'Bahasa', value: 'Indonesia · subtitle' },
      { label: 'Animasi', value: 'Remotion (React/TypeScript)' },
    ],
    technologies: [
      'Motion Graphics',
      'Remotion',
      'React & TypeScript',
      'Ilustrasi 3D (SVG)',
      'Voice Over',
      'Subtitle & Sound Design',
      'Penceritaan Visual',
    ],
    focusAreas: [
      'Menyederhanakan konsep jaringan untuk audiens umum',
      'Naskah dan narasi berbahasa Indonesia',
      'Animasi terprogram yang presisi dan mudah direvisi',
      'Subtitle tersinkron dan desain suara',
    ],
    videos: [
      {
        title: 'Bagaimana Satu Provider Internet Bisa Menghubungkan Gedung Perkantoran?',
        src: '/assets/projects/motion-graphics-edukasi-jaringan/isp-gedung-perkantoran.mp4',
        poster: '/assets/projects/motion-graphics-edukasi-jaringan/isp-gedung-perkantoran.jpg',
        duration: '2:22',
        description: 'Perjalanan koneksi dari fiber optik ISP ke ruang MDF (ONT, router, firewall, core switch), backbone ke IDF tiap lantai, hingga access switch dan Wi-Fi karyawan.',
        topics: ['ISP', 'MDF/IDF', 'Core & Access Switch', 'Backbone Fiber'],
      },
      {
        title: 'Apa yang Terjadi Saat Kita Mencari Sesuatu di Google?',
        src: '/assets/projects/motion-graphics-edukasi-jaringan/pencarian-google.mp4',
        poster: '/assets/projects/motion-graphics-edukasi-jaringan/pencarian-google.jpg',
        duration: '2:42',
        description: 'Di balik tombol Search: crawling, indexing, pemahaman kueri, ranking, hingga perbedaan iklan dan hasil organik.',
        topics: ['Crawling', 'Indexing', 'Ranking', 'Mesin Pencari'],
      },
      {
        title: 'Membedah BTS 5G: Apa Saja Isi Menara Pemancar Sinyal?',
        src: '/assets/projects/motion-graphics-edukasi-jaringan/bts-5g.mp4',
        poster: '/assets/projects/motion-graphics-edukasi-jaringan/bts-5g.jpg',
        duration: '2:50',
        description: 'Membongkar BTS 5G dari antena Massive MIMO dan beamforming, AAU, radio, DU dan CU, hingga sistem daya di kabinet.',
        topics: ['5G', 'Massive MIMO', 'Beamforming', 'DU/CU'],
      },
      {
        title: 'Wi-Fi Gratis, Tapi Aman Nggak?',
        src: '/assets/projects/motion-graphics-edukasi-jaringan/wifi-gratis.mp4',
        poster: '/assets/projects/motion-graphics-edukasi-jaringan/wifi-gratis.jpg',
        duration: '1:13',
        description: 'Cara kerja access point, bahaya Wi-Fi palsu (Evil Twin), dan bagaimana HTTPS melindungi komunikasi di Wi-Fi publik.',
        topics: ['Access Point', 'Evil Twin', 'HTTPS', 'Keamanan'],
      },
      {
        title: 'Data Kita Sebenarnya Disimpan di Mana?',
        src: '/assets/projects/motion-graphics-edukasi-jaringan/penyimpanan-data.mp4',
        poster: '/assets/projects/motion-graphics-edukasi-jaringan/penyimpanan-data.jpg',
        duration: '2:18',
        description: 'Mengenal jenis-jenis server — web, aplikasi, database, file, DNS — lalu membongkar isi rack server 2U.',
        topics: ['Server', 'DNS', 'Data Center', 'Hardware'],
      },
    ],
    images: [],
    links: { github: null, demo: null },
    cover: 'motion',
  },
  {
    slug: 'konten-digital-kreatif',
    number: '03',
    title: 'Konten Digital Kreatif',
    category: 'Creative',
    status: 'In Progress',
    summary:
      'Kumpulan karya penceritaan visual, editing video sinematik, desain grafis, dan pembuatan konten digital.',
    technologies: ['Adobe Premiere Pro', 'Photoshop', 'Lightroom', 'Canva'],
    focusAreas: ['Penceritaan visual', 'Editing video sinematik', 'Desain grafis', 'Pembuatan konten digital'],
    images: [],
    links: { github: null, demo: null },
    cover: 'creative',
  },
  {
    slug: 'pengembangan-web-pribadi',
    number: '04',
    title: 'Website Portofolio Pribadi',
    category: 'Web Development',
    status: 'Completed',
    date: 'November 2026',
    summary:
      'Website yang sedang Anda buka ini: portofolio pribadi berbasis React dan TypeScript, responsif di semua perangkat, dengan animasi topologi jaringan interaktif dan galeri video — di-deploy otomatis ke Vercel dari GitHub.',
    context: [
      'Tujuannya sederhana: satu tempat yang menunjukkan siapa saya, apa yang sudah saya pelajari, dan bukti karyanya — bukan sekadar CV. Karena itu setiap proyek ditampilkan dengan bahan asli: diagram Packet Tracer, rencana VLAN, video, dan sertifikat yang bisa dibuka langsung.',
      'Website dibangun sebagai Single Page Application dengan React 19, TypeScript, dan Tailwind CSS. Seluruh konten dipisahkan dari tampilan di folder data, sehingga menambah proyek atau sertifikat cukup dengan mengedit satu file. Setiap push ke GitHub otomatis membangun dan menerbitkan versi baru di Vercel.',
      'Pengujian dilakukan di desktop dan ponsel, lalu performa diukur dengan Lighthouse. Dari hasil pengukuran, saya memperbaiki pemuatan font dan animasi pembuka agar konten utama tampil lebih cepat di ponsel.',
    ],
    facts: [
      { label: 'Stack', value: 'React 19 · TypeScript · Vite' },
      { label: 'Styling', value: 'Tailwind CSS 4 · Framer Motion' },
      { label: 'Hosting', value: 'Vercel · deploy otomatis' },
      { label: 'Lighthouse desktop', value: '99 · 100 · 100 · 100' },
      { label: 'Lighthouse ponsel', value: '±85 · 100 · 100 · 100' },
      { label: 'Bahasa', value: 'Indonesia' },
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'React Router',
      'SVG Animation',
      'Git & GitHub',
      'Vercel',
    ],
    focusAreas: [
      'Desain responsif untuk ponsel, tablet, dan desktop',
      'Animasi topologi jaringan interaktif (SVG) dengan 5 skenario',
      'Galeri video yang memuat file hanya saat diputar',
      'Konten terpisah dari komponen, mudah ditambah dan diubah',
      'SEO: meta tag, Open Graph, data terstruktur, URL per proyek',
      'Aksesibilitas: navigasi keyboard, skip link, prefers-reduced-motion',
      'Deploy otomatis GitHub → Vercel setiap ada perubahan',
      'Optimasi performa berdasarkan hasil Lighthouse',
    ],
    table: {
      title: 'Hasil Lighthouse (situs live)',
      columns: ['Perangkat', 'Performance', 'Accessibility', 'Best Practices', 'SEO'],
      rows: [
        ['Desktop', '99', '100', '100', '100'],
        ['Ponsel', '84–85', '100', '100', '100'],
      ],
    },
    images: [
      '/assets/projects/pengembangan-web-pribadi/desktop-beranda.webp',
      '/assets/projects/pengembangan-web-pribadi/desktop-proyek.webp',
      '/assets/projects/pengembangan-web-pribadi/desktop-ccna.webp',
      '/assets/projects/pengembangan-web-pribadi/mobile-tampilan.webp',
    ],
    imageCaptions: [
      'Halaman beranda di desktop — hero dengan latar jaringan beranimasi.',
      'Bagian proyek: kartu unggulan memutar animasi topologi CCNA secara otomatis.',
      'Halaman detail proyek CCNA dengan simulasi alur data interaktif.',
      'Tampilan di ponsel (390 px): beranda, kartu proyek, dan simulasi jaringan.',
    ],
    links: {
      github: 'https://github.com/ajietiswara2024/ajiet-portfolio',
      demo: 'https://ajiet-portfolio.vercel.app',
    },
    cover: 'web',
  },
]

export const getProjectBySlug = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug)
