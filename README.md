# A. Ajiet Iswara Putra — Personal Portfolio

> Menghubungkan Teknologi, Kreativitas, dan Manusia.

Website portfolio pribadi bertema **Dark Premium Technology**, dibangun dengan
React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide React · React Router.

---

## Menjalankan di komputer

Butuh **Node.js 20+** (sudah teruji di Node 22).

```bash
npm install        # sekali saja
npm run dev        # http://localhost:5173
npm run build      # build produksi ke folder dist/
npm run preview    # mencoba hasil build di http://localhost:4173
npm run lint       # cek kualitas kode (oxlint)
```

---

## Struktur proyek

```
public/
  assets/
    images/profile.jpg          ← foto profil
    cv/A-Ajiet-Iswara-Putra-CV.pdf  ← CV (tombol Download CV / Resume)
    certificates/*.pdf          ← file sertifikat (tombol View Certificate)
    projects/<slug>/            ← screenshot proyek (buat folder per proyek)
  favicon.svg, apple-touch-icon.png, og-image.png, robots.txt

src/
  data/            ← SEMUA KONTEN ADA DI SINI (edit file ini, bukan komponen)
    profile.ts         nama, title, hero, about, foto, CV
    skills.ts          kategori skill & tools
    projects.ts        daftar proyek
    experience.ts      pengalaman kerja (timeline)
    education.ts       pendidikan & pengalaman organisasi
    certifications.ts  sertifikat
    contact.ts         email, WhatsApp, LinkedIn, GitHub, Instagram
    navigation.ts      menu navigasi
  i18n/ui.ts       ← teks tombol/label (Indonesia aktif, Inggris tersimpan)
  types/content.ts ← tipe TypeScript untuk semua data
  components/
    layout/        Navbar, Footer
    sections/      Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
    ui/            Button, Reveal, SectionHeading, ProjectCard, ProjectCover, StatusBadge, NetworkVisual, ProfilePortrait
    icons/         ikon brand (GitHub, LinkedIn, Instagram, WhatsApp)
  pages/           HomePage, ProjectDetailPage (/projects/:slug), NotFoundPage
  hooks/           useActiveSection (indikator navigasi), useDocumentMeta (title per halaman)
```

---

## Cara mengedit konten

### Mengganti foto / CV / sertifikat
Timpa file di `public/assets/...` dengan nama yang sama, **atau** ubah path di
`src/data/profile.ts` (`photo`, `cvUrl`) dan `src/data/certifications.ts` (`fileUrl`).
Set ke `null` untuk menampilkan placeholder / tombol non-aktif.

> Foto ditampilkan dengan efek monokrom + aksen oranye agar latar merah pas foto
> menyatu dengan tema gelap. Untuk hasil terbaik, gunakan foto dengan latar polos
> gelap/netral, rasio potret (mis. 4:5), minimal 800px lebar, format `.jpg`/`.webp`.

### Menambah kontak (LinkedIn, GitHub, Instagram)
Di `src/data/contact.ts`, isi `value` (teks yang tampil) dan `href` (link lengkap).
Kontak yang masih `null` otomatis tampil sebagai “Coming soon” dan tidak bisa diklik.

### Menambah proyek baru
1. Salin satu objek di `src/data/projects.ts`, beri `slug` unik (huruf kecil, pakai tanda `-`).
2. Isi `status`: `'Lab Practice' | 'Learning Project' | 'In Progress' | 'Completed'`.
3. Simpan screenshot di `public/assets/projects/<slug>/` lalu isi
   `images: ['/assets/projects/<slug>/topologi.png', ...]` — gambar pertama jadi cover kartu.
4. Isi `links.github` / `links.demo` **hanya** jika link-nya sudah benar-benar ada.
5. `cover` menentukan ilustrasi pengganti selama belum ada screenshot
   (`topology`, `vlan`, `motion`, `creative`, `web`).

Halaman detail `/projects/<slug>` dibuat otomatis.

### Update status pekerjaan
Di `src/data/experience.ts`, `end: null` berarti “Present”. Saat pekerjaan selesai,
ganti dengan bulan & tahun, mis. `end: 'March 2027'`.

### Bahasa
Website memakai **Bahasa Indonesia** (`ACTIVE_LOCALE = 'id'` di `src/i18n/ui.ts`).
Label tombol versi Inggris masih tersimpan di objek `en` pada file yang sama.
Untuk menambah versi Inggris: buat salinan konten berbahasa Inggris (mis. `src/data/en/`),
lalu ubah `ACTIVE_LOCALE` atau tambahkan tombol pemilih bahasa.

---

## Deploy ke Vercel

**Opsi A — lewat GitHub (disarankan)**
1. Buat repository baru di GitHub, lalu dari folder ini:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
2. Buka https://vercel.com → **Add New… → Project** → import repository tersebut.
3. Vercel otomatis mendeteksi **Vite**. Biarkan default:
   Build Command `npm run build`, Output Directory `dist`.
4. Di **Environment Variables**, tambahkan `VITE_SITE_URL` = URL situs Anda
   (mis. `https://nama-anda.vercel.app`, tanpa `/` di akhir) — dipakai untuk Open Graph.
5. Klik **Deploy**. Setiap `git push` berikutnya akan otomatis ter-deploy ulang.

**Opsi B — Vercel CLI**
```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

`vercel.json` sudah berisi rewrite agar URL seperti `/projects/ccna-final-project-jaringan-gedung-perusahaan`
bisa dibuka langsung/di-refresh, serta cache jangka panjang untuk file build di `/static`.

Setelah dapat domain final, perbarui `VITE_SITE_URL` (di `.env` dan di Vercel), lalu deploy ulang.

---

## Catatan teknis
- **Aksesibilitas:** skip link, `aria-current` di navigasi, fokus keyboard terlihat,
  heading berurutan (satu `h1` per halaman), animasi menghormati *prefers-reduced-motion*.
- **Performa:** visual jaringan berupa SVG ringan (tanpa canvas/JS per frame), gambar `loading="lazy"`,
  font dengan `display=swap`, chunk terpisah untuk React & Framer Motion.
- **SEO:** title & meta description per halaman, Open Graph + Twitter card, JSON-LD `Person`,
  canonical URL, favicon, `robots.txt`.
