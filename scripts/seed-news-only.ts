import { db } from '../src/lib/db';

async function main() {
  const count = await db.news.count();
  if (count > 0) {
    console.log(`News already has ${count} articles, skipping.`);
    return;
  }
  console.log('Seeding news articles...');
  await db.news.createMany({
    data: [
      {
        title: 'Penerimaan Peserta Didik Baru (PPDB) Tahun 2025/2026 Telah Dibuka',
        excerpt: 'Pendaftaran siswa baru SD Negeri 5 Gesing tahun pelajaran 2025/2026 dibuka mulai 1 Juni 2025.',
        content: 'Dalam rangka penerimaan peserta didik baru tahun pelajaran 2025/2026, SD Negeri 5 Gesing membuka pendaftaran mulai tanggal 1 Juni 2025 sampai 30 Juni 2025.\n\nPersyaratan:\n1. Fotokopi Kartu Keluarga\n2. Fotokopi Akta Kelahiran\n3. Fotokopi rapor (jika ada)\n4. Pas foto 2x3 dan 3x4 masing-masing 2 lembar\n\nPendaftaran dapat dilakukan langsung di kantor sekolah pada jam layanan. Untuk informasi lebih lanjut silakan hubungi sekolah.',
        photo: '/uploads/gallery/news-1.jpg',
        category: 'Pengumuman',
        published: true,
        publishedAt: new Date('2024-09-25'),
      },
      {
        title: 'Peringatan HUT Kemerdekaan RI ke-79',
        excerpt: 'Seluruh warga sekolah mengikuti upacara dan lomba-lomba memperingati HUT RI ke-79.',
        content: 'SD Negeri 5 Gesing menggelar serangkaian kegiatan memperingati Hari Ulang Tahun Kemerdekaan Republik Indonesia ke-79.\n\nKegiatan meliputi upacara bendera, lomba-lomba kemerdekaan tingkat SD, dan pentas seni. Para siswa antusias mengikuti lomba seperti balap karung, makan kerupuk, dan lomba menghias kelas.\n\nKegiatan ini bertujuan menumbuhkan semangat nasionalisme dan kebersamaan di kalangan siswa.',
        photo: '/uploads/gallery/news-2.jpg',
        category: 'Kegiatan',
        published: true,
        publishedAt: new Date('2024-08-17'),
      },
      {
        title: 'Pertemuan Komite Sekolah dengan Orang Tua Murid',
        excerpt: 'Pertemuan membahas rencana program kerja sekolah dan evaluasi pembelajaran.',
        content: 'Pertemuan komite sekolah dengan orang tua murid dilaksanakan di ruang kelas untuk membahas rencana program kerja tahun ajaran baru serta evaluasi pembelajaran.\n\nKepala sekolah menyampaikan terima kasih atas dukungan orang tua dan mengajak untuk terus bersinergi memajukan mutu pendidikan di SD Negeri 5 Gesing.',
        photo: '/uploads/gallery/news-3.jpg',
        category: 'Pengumuman',
        published: true,
        publishedAt: new Date('2024-09-12'),
      },
      {
        title: 'Pentas Seni dan Budaya Bali',
        excerpt: 'Siswa menampilkan tarian dan musik tradisional Bali dalam acara pekan budaya.',
        content: 'Dalam rangka pekan budaya Bali, siswa SD Negeri 5 Gesing menampilkan berbagai kesenian tradisional Bali seperti tari, musik rindik, dan pembacaan sastra Bali.\n\nKegiatan ini merupakan wujud pelestarian budaya Bali berlandaskan Tri Hita Karana yang menjadi visi sekolah.',
        photo: '/uploads/gallery/news-4.jpg',
        category: 'Kegiatan',
        published: true,
        publishedAt: new Date('2024-09-01'),
      },
      {
        title: 'Aksi Penghijauan dan Edukasi Lingkungan',
        excerpt: 'Siswa menanam pohon dan belajar menjaga kebersihan lingkungan sekolah.',
        content: 'SD Negeri 5 Gesing mengadakan aksi penghijauan dengan menanam pohon di area sekolah serta edukasi menjaga lingkungan.\n\nKegiatan ini diikuti seluruh siswa dari kelas 1 sampai 6, didampingi para guru. Tujuannya untuk menumbuhkan kecintaan terhadap lingkungan sejak dini.',
        photo: '/uploads/gallery/news-5.jpg',
        category: 'Kegiatan',
        published: true,
        publishedAt: new Date('2024-08-25'),
      },
    ],
  });
  console.log('✓ News created (5)');
  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
