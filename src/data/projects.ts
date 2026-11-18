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
    status: 'Learning Project',
    summary:
      'Proyek motion graphics edukatif yang menjelaskan cara kerja jaringan komputer dan aplikasi berbasis internet.',
    technologies: ['Blender', 'Motion Graphics', 'Editing Video', 'Voice Over', 'Penceritaan Visual'],
    focusAreas: [
      'Menjelaskan konsep jaringan secara visual',
      'Adegan 3D dan desain gerak',
      'Editing dan narasi voice over',
      'Penceritaan edukatif',
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
    title: 'Pengembangan Web Pribadi',
    category: 'Web Development',
    status: 'In Progress',
    summary:
      'Website portofolio pribadi ini menunjukkan ketertarikan saya yang terus tumbuh pada pengembangan web modern, antarmuka responsif, dan pengalaman digital.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'GitHub'],
    focusAreas: [
      'Tata letak responsif untuk ponsel, tablet, dan desktop',
      'Antarmuka berbasis komponen dengan React',
      'Konten terpisah dari tampilan',
      'Version control dengan Git & GitHub',
    ],
    images: [],
    links: {
      github: 'https://github.com/ajietiswara2024/ajiet-portfolio',
      demo: 'https://ajiet-portfolio.vercel.app',
    },
    cover: 'web',
  },
]

export const getProjectBySlug = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug)
