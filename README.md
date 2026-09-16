# SD Negeri 5 Gesing — Website Resmi Sekolah

Website resmi **SD Negeri 5 Gesing** (Buleleng, Bali) yang modern, elegan, profesional,
dan ramah pengguna. Dibangun dengan stack modern (Next.js 16, TypeScript, Tailwind CSS,
Prisma + SQLite) dengan panel admin lengkap untuk mengelola seluruh konten sekolah.

---

## ✨ Fitur Utama

### Halaman Publik
- **Beranda** — hero, sambutan kepala sekolah, statistik, berita & pengumuman terbaru,
  galeri kegiatan, dan call-to-action.
- **Profil** — identitas sekolah, sejarah, visi/misi/tujuan, struktur organisasi.
- **GTK** — daftar guru & tenaga kependidikan dengan **search**, **filter kategori**,
  dan **detail profil** (foto, NIP/NUPTK, pendidikan, tugas).
- **Data Siswa** — dashboard statistik (total, laki-laki, perempuan), data per kelas
  (bar chart), data per tahun pelajaran, dan tabel siswa responsif. NISN disembunyikan
  sebagian demi privasi.
- **Sarpras** — kartu sarana & prasarana dikelompokkan per kategori, dengan foto,
  jumlah, kondisi, dan deskripsi. Lengkap dengan **filter kategori** & **pencarian**.
- **Galeri** — galeri foto masonry modern dengan **filter kategori**, **lightbox**
  (navigasi keyboard ←/→/Esc), dan animasi hover.
- **Kontak** — info kontak lengkap, jam layanan, media sosial, **peta Google Maps**,
  dan **form kontak dengan validasi**.

### Panel Admin (Login)
- **Autentikasi** aman dengan NextAuth.js (password di-hash dengan bcrypt).
- **Dashboard** dengan navigasi sidebar ke 11 modul:
  1. Ringkasan
  2. Profil Sekolah (edit identitas, visi, misi, sejarah, kepala sekolah, kontak, peta)
  3. GTK (CRUD penuh + upload foto)
  4. Data Siswa (CRUD + filter kelas + perlindungan privasi)
  5. Sarpras (CRUD + upload foto)
  6. Galeri (CRUD + upload foto)
  7. Berita (CRUD + draft/publish toggle)
  8. Pengumuman (CRUD + draft/publish toggle)
  9. Pesan Masuk (baca, tandai dibaca, balas via email, hapus)
  10. Statistik Beranda (CRUD)
  11. Struktur Organisasi (CRUD + upload foto)
- **Upload gambar** langsung dari komputer (JPG/PNG/WebP/GIF, max 5MB).
- **Validasi form** di semua entri (Zod).
- **Loading state**, **empty state**, dan **error state** di seluruh aplikasi.
- **Role-based**: hanya admin yang dapat mengelola data sensitif siswa.

---

## 🛠️ Teknologi

| Bagian | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Bahasa | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Database | Prisma ORM + SQLite (mudah dimigrasikan ke PostgreSQL/Supabase) |
| Auth | NextAuth.js v4 (Credentials + bcrypt) |
| Validasi | Zod |
| Ikon | Lucide React |
| Font | Poppins + Inter |
| State | Zustand (navigasi client-side) |
| Notifikasi | Sonner |

**Catatan:** Karena hanya route `/` yang diekspos, navigasi antar halaman
dilakukan secara client-side (single-page dengan state) sehingga seluruh
halaman tetap dapat diakses pengguna dari satu URL.

---

## 🚀 Instalasi & Menjalankan

### Prasyarat
- Node.js 18+ (direkomendasikan 20+) **atau** [Bun](https://bun.sh)
- Windows 11 / macOS / Linux

### Langkah-langkah

1. **Clone / salin folder project** ke komputer Anda.

2. **Install dependensi:**
   ```bash
   bun install
   # atau: npm install
   ```

3. **Salin file environment:**
   ```bash
   cp .env.example .env
   ```
   Sesuaikan `NEXTAUTH_SECRET` dengan secret acak:
   ```bash
   openssl rand -base64 32
   ```

4. **Inisialisasi database:**
   ```bash
   bun run db:push   # membuat tabel dari schema Prisma
   ```

5. **Seed data awal:**
   ```bash
   bun run scripts/seed.ts
   ```
   Ini akan membuat akun admin default, profil sekolah, 7 GTK, 84+ siswa,
   12 fasilitas, 10 galeri, 5 berita, 4 pengumuman, dan statistik.

6. **Jalankan aplikasi:**
   ```bash
   bun run dev
   ```
   Buka `http://localhost:3000` di browser.

### Akun Admin Default
```
Email:    admin@sdn5gesing.sch.id
Password: admin123
```
> ⚠️ **Penting:** Ganti password ini segera setelah instalasi pertama melalui
> manajemen database atau seed ulang dengan password baru yang sudah di-hash.

---

## 📁 Struktur Project

```
.
├── prisma/
│   └── schema.prisma          # Skema database (11 model)
├── db/
│   └── custom.db              # File SQLite (otomatis dibuat)
├── public/
│   ├── logo-school.png        # Logo sekolah
│   └── uploads/               # Gambar unggahan & hasil generate
│       ├── facilities/
│       ├── gallery/
│       ├── teachers/
│       └── editor/
├── scripts/
│   ├── generate-images.ts     # Generator gambar AI (opsional)
│   └── seed.ts                # Seed database
├── src/
│   ├── app/
│   │   ├── api/               # REST API (public + admin + auth)
│   │   ├── globals.css        # Tema hijau/teal + emas
│   │   ├── layout.tsx         # Root layout + font Poppins
│   │   └── page.tsx           # Halaman utama (routing client-side)
│   ├── components/
│   │   ├── admin/             # Panel admin (login, dashboard, 11 panel CRUD)
│   │   │   └── panels/
│   │   ├── sections/          # 7 halaman publik
│   │   ├── site/              # Navbar, Footer, UI shared
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/
│   │   ├── use-fetch.ts       # Hook fetch dengan loading/error state
│   │   └── use-mobile.ts
│   └── lib/
│       ├── auth.ts            # Helper NextAuth
│       ├── api-guard.ts       # Proteksi route admin
│       ├── db.ts              # Prisma client
│       ├── nav-store.ts       # Zustand navigation store
│       ├── types.ts           # Tipe shared
│       └── utils.ts
├── .env.example
├── .env
└── README.md
```

---

## 🔌 REST API Endpoints

### Publik (Read-only)
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/public/profile` | Profil sekolah |
| GET | `/api/public/teachers` | Daftar GTK |
| GET | `/api/public/students/summary` | Total siswa (L/P/total) |
| GET | `/api/public/students/by-class` | Rekap per kelas |
| GET | `/api/public/students/by-year` | Rekap per tahun pelajaran |
| GET | `/api/public/students` | Daftar siswa (NISN disembunyikan) |
| GET | `/api/public/stats` | Statistik beranda |
| GET | `/api/public/facilities` | Daftar sarana/prasarana |
| GET | `/api/public/gallery` | Daftar galeri |
| GET | `/api/public/news?limit=N` | Berita terbit (opsional limit) |
| GET | `/api/public/news/[id]` | Detail berita |
| GET | `/api/public/announcements` | Pengumuman terbit |
| GET | `/api/public/organization` | Struktur organisasi |
| POST | `/api/public/contact` | Kirim pesan kontak (validasi) |

### Admin (dilindungi autentikasi)
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/auth/callback/credentials` | Login admin (NextAuth) |
| GET/PUT | `/api/admin/profile` | Baca / update profil sekolah |
| GET/POST | `/api/admin/teachers` | Daftar / tambah GTK |
| PUT/DELETE | `/api/admin/teachers/[id]` | Edit / hapus GTK |
| GET/POST | `/api/admin/students` | Daftar (filter) / tambah siswa |
| PUT/DELETE | `/api/admin/students/[id]` | Edit / hapus siswa |
| GET/POST | `/api/admin/facilities` | Daftar / tambah fasilitas |
| PUT/DELETE | `/api/admin/facilities/[id]` | Edit / hapus fasilitas |
| GET/POST | `/api/admin/gallery` | Daftar / tambah galeri |
| PUT/DELETE | `/api/admin/gallery/[id]` | Edit / hapus galeri |
| GET/POST | `/api/admin/news` | Daftar / tambah berita |
| PUT/DELETE | `/api/admin/news/[id]` | Edit / hapus berita |
| GET/POST | `/api/admin/announcements` | Daftar / tambah pengumuman |
| PUT/DELETE | `/api/admin/announcements/[id]` | Edit / hapus pengumuman |
| GET | `/api/admin/messages` | Daftar pesan masuk |
| PUT/DELETE | `/api/admin/messages/[id]` | Tandai dibaca / hapus pesan |
| GET/POST | `/api/admin/stats` | Daftar / tambah statistik |
| PUT/DELETE | `/api/admin/stats/[id]` | Edit / hapus statistik |
| GET/POST | `/api/admin/organization` | Daftar / tambah anggota |
| PUT/DELETE | `/api/admin/organization/[id]` | Edit / hapus anggota |
| POST | `/api/admin/upload` | Upload gambar (max 5MB) |

---

## 🔐 Keamanan

- **Authentication** admin via NextAuth.js Credentials provider.
- **Password hashing** dengan bcrypt (10 rounds).
- **Proteksi route admin** — semua endpoint `/api/admin/*` mengecek session,
  mengembalikan `401` jika belum login.
- **Validasi input** dengan Zod di semua endpoint POST/PUT.
- **Privasi siswa** — NISN disembunyikan sebagian (`••••xxxx`) di tampilan publik.
- **Environment variables** untuk kredensial (tidak ada password hardcode).
- **Validasi upload** — tipe file & ukuran dibatasi (5MB, hanya gambar).

---

## 🎨 Desain

- **Palet warna:** Hijau/teal (utama) + putih + emas (aksen).
- **Font:** Poppins (judul) + Inter (badan teks).
- **Layout:** Bersih, banyak white space, border-radius modern, shadow lembut.
- **Responsif:** Mobile-first, breakpoint `sm/md/lg/xl`.
- **Animasi:** Transisi halus, hover effects, framer-motion ready.
- **Aksesibilitas:** Semantic HTML, ARIA labels, keyboard navigation.

---

## 📝 Catatan Operasional untuk Operator Sekolah

1. **Login admin** → klik tombol "Admin" di navbar.
2. **Update profil sekolah** pertama kali (menu Profil Sekolah).
3. **Tambah/foto GTK** di menu GTK.
4. **Kelola siswa** di menu Data Siswa (hati-hati, data sensitif).
5. **Update berita & pengumuman** secara berkala agar website segar.
6. **Periksa pesan masuk** secara rutin (menu Pesan Masuk).
7. **Backup database:** salin file `db/custom.db` secara berkala.

---

## 🔄 Migrasi ke PostgreSQL/Supabase

Skema Prisma sudah kompatibel. Cukup:
1. Ubah `datasource db` di `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update `.env`:
   ```
   DATABASE_URL="postgresql://user:pass@host:5432/dbname"
   ```
3. Jalankan `bun run db:push` lalu `bun run scripts/seed.ts`.

---

## 🧪 Pengembangan

```bash
bun run lint       # cek kualitas kode
bun run db:push    # sinkronisasi schema ke database
bun run db:reset   # reset database (hapus semua data)
```

---

## 📄 Lisensi

© SD Negeri 5 Gesing. Dibuat untuk kepentingan pendidikan.
