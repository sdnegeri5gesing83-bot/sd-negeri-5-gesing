// Seed script for SD Negeri 5 Gesing
// Run: bun run scripts/seed.ts
import { db } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // 1. Admin
  const adminPass = await bcrypt.hash('admin123', 10);
  await db.admin.upsert({
    where: { email: 'admin@sdn5gesing.sch.id' },
    update: {},
    create: {
      email: 'admin@sdn5gesing.sch.id',
      name: 'Administrator SDN 5 Gesing',
      password: adminPass,
      role: 'admin',
    },
  });
  console.log('  ✓ Admin created (admin@sdn5gesing.sch.id / admin123)');

  // 2. School Profile
  const existingProfile = await db.schoolProfile.findFirst();
  if (!existingProfile) {
    await db.schoolProfile.create({
      data: {
        name: 'SD Negeri 5 Gesing',
        npsn: '50203456',
        nss: '1010120005',
        accreditation: 'Akreditasi B',
        address: 'Dinas Banjar Waru, Desa Gesing',
        village: 'Gesing',
        district: 'Banjar',
        regency: 'Buleleng',
        province: 'Bali',
        postalCode: '81152',
        phone: '0362-123456',
        email: 'sdn5gesing@ymail.com',
        whatsapp: '6281234567890',
        facebook: 'SDN5Gesing',
        instagram: 'sdn5gesing',
        youtube: '',
        tiktok: '',
        logo: '/logo-school.png',
        vision:
          'Mewujudkan peserta didik yang beriman, berakhlak mulia, cerdas, terampil, dan mandiri serta berbudaya berlandaskan Tri Hita Karana.',
        mission:
          '1. Menyelenggarakan pendidikan agama dan akhlak mulia secara intensif.\n2. Meningkatkan kualitas pembelajaran dengan pendekatan yang aktif, kreatif, dan menyenangkan (PAIKEM).\n3. Mengembangkan bakat, minat, dan kreativitas peserta didik melalui kegiatan ekstrakurikuler.\n4. Membiasakan perilaku hidup bersih, sehat, dan peduli lingkungan.\n5. Menumbuhkan sikap mandiri, disiplin, dan tanggung jawab sejak dini.\n6. Melestarikan nilai-nilai budaya Bali berlandaskan Tri Hita Karana.',
        goals:
          '1. Siswa berakhlak mulia dan beriman kepada Tuhan Yang Maha Esa.\n2. Siswa menguasai kompetensi dasar sesuai kurikulum.\n3. Siswa terbiasa hidup bersih, sehat, dan peduli lingkungan.\n4. Siswa mandiri, disiplin, dan bertanggung jawab.\n5. Tercipta suasana sekolah yang aman, nyaman, dan ramah anak.',
        history:
          'SD Negeri 5 Gesing berdiri sejak tahun 1976 dan telah menjadi bagian penting dari layanan pendidikan dasar di Desa Gesing, Kecamatan Banjar, Kabupaten Buleleng. Berawal dari gedung sederhana berdinding bambu, sekolah ini terus berkembang seiring dengan komitmen pemerintah dan masyarakat untuk memajukan pendidikan di daerah pegunungan Bali bagian utara.\n\nHingga saat ini, SD Negeri 5 Gesing terus berbenah untuk menyediakan layanan pendidikan yang berkualitas, ramah anak, dan relevan dengan kebutuhan masyarakat setempat. Dengan dukungan para guru, orang tua, dan pemangku kepentingan, sekolah berkomitmen membentuk generasi yang cerdas, berakhlak mulia, dan berbudaya.',
        headmasterName: 'I Gusti Ayu Made Sari, S.Pd.',
        headmasterPhoto: '/uploads/teachers/headmaster.png',
        headmasterWelcome:
          'Assalamualaikum dan salam sejahtera bagi kita semua.\n\nSelamat datang di website resmi SD Negeri 5 Gesing. Melalui media ini, kami berharap dapat membuka akses informasi yang lebih luas bagi seluruh warga sekolah, orang tua, dan masyarakat umum. Kami berkomitmen untuk terus meningkatkan mutu layanan pendidikan demi membentuk generasi yang beriman, berakhlak mulia, cerdas, dan mandiri.\n\nMari bersama-sama membangun pendidikan yang bermutu untuk masa depan anak-anak kita.',
        headmasterNip: '197605051999032005',
        mapEmbed:
          'https://www.google.com/maps?q=Banjar+Waru+Gesing+Buleleng+Bali&output=embed',
        serviceHours: 'Senin - Kamis: 07.00 - 13.00 WITA\nJumat: 07.00 - 11.00 WITA\nSabtu: 07.00 - 12.00 WITA',
      },
    });
    console.log('  ✓ School profile created');
  } else {
    console.log('  - School profile already exists');
  }

  // 3. Statistics
  await db.statistic.deleteMany();
  await db.statistic.createMany({
    data: [
      { label: 'Jumlah GTK', value: 6, icon: 'Users', order: 1 },
      { label: 'Jumlah Siswa', value: 84, icon: 'GraduationCap', order: 2 },
      { label: 'Jumlah Kelas', value: 6, icon: 'School', order: 3 },
      { label: 'Sarana & Prasarana', value: 12, icon: 'Building2', order: 4 },
    ],
  });
  console.log('  ✓ Statistics created');

  // 4. Teachers
  await db.teacher.deleteMany();
  await db.teacher.createMany({
    data: [
      {
        name: 'I Gusti Ayu Made Sari, S.Pd.',
        photo: '/uploads/teachers/headmaster.png',
        nip: '197605051999032005',
        nuptk: '9232756659200012',
        position: 'Kepala Sekolah',
        education: 'S1 - PGSD',
        subject: 'Kepemimpinan & Manajemen Sekolah',
        category: 'Guru',
        gender: 'P',
        phone: '081234567890',
        email: 'kepsek@sdn5gesing.sch.id',
        bio: 'Mendidik dengan hati dan dedikasi sejak tahun 1999.',
        order: 1,
      },
      {
        name: 'I Made Suryadi, S.Pd.',
        photo: '/uploads/teachers/teacher-1.png',
        nip: '198203102006041003',
        nuptk: '9232756659200024',
        position: 'Guru Kelas 6',
        education: 'S1 - PGSD',
        subject: 'Guru Kelas 6 A',
        category: 'Guru',
        gender: 'L',
        phone: '081234567891',
        email: 'suryadi@sdn5gesing.sch.id',
        bio: 'Guru kelas 6 yang berdedikasi membimbing siswa menuju kelulusan.',
        order: 2,
      },
      {
        name: 'Ni Kadek Ayu Wulandari, S.Pd.',
        photo: '/uploads/teachers/teacher-2.png',
        nip: '198907202011012008',
        nuptk: '9232756659200036',
        position: 'Guru Kelas 5',
        education: 'S1 - PGSD',
        subject: 'Guru Kelas 5 A',
        category: 'Guru',
        gender: 'P',
        phone: '081234567892',
        email: 'wulandari@sdn5gesing.sch.id',
        bio: 'Guru kelas 5 yang kreatif dan ramah anak.',
        order: 3,
      },
      {
        name: 'I Putu Eka Wijaya, S.Pd.',
        photo: '/uploads/teachers/teacher-3.png',
        nip: '197511042003121002',
        nuptk: '9232756659200048',
        position: 'Guru Kelas 4 & Guru Agama',
        education: 'S1 - Pendidikan Agama Hindu',
        subject: 'Guru Kelas 4 & Budi Pekerti',
        category: 'Guru',
        gender: 'L',
        phone: '081234567893',
        email: 'wijaya@sdn5gesing.sch.id',
        bio: 'Mengajar dengan pendekatan budaya Bali.',
        order: 4,
      },
      {
        name: 'Ni Luh Putu Ratnasari, S.Pd.',
        photo: '/uploads/teachers/teacher-4.png',
        nip: '199002152015042010',
        nuptk: '9232756659200050',
        position: 'Guru Kelas 1',
        education: 'S1 - PGSD',
        subject: 'Guru Kelas 1 A',
        category: 'Guru',
        gender: 'P',
        phone: '081234567894',
        email: 'ratna@sdn5gesing.sch.id',
        bio: 'Sabar dan penuh kasih dalam membimbing siswa kelas awal.',
        order: 5,
      },
      {
        name: 'I Wayan Sudarmawan',
        photo: '/uploads/teachers/teacher-5.png',
        nip: '198508082010011005',
        nuptk: '9232756659200062',
        position: 'Tenaga Kependidikan / Operator',
        education: 'SMA',
        subject: 'Operator Sekolah & TU',
        category: 'Tenaga Kependidikan',
        gender: 'L',
        phone: '081234567895',
        email: 'operator@sdn5gesing.sch.id',
        bio: 'Mengurus administrasi sekolah dengan teliti.',
        order: 6,
      },
      {
        name: 'Ni Made Dewi Lestari, S.Pd.',
        photo: '/uploads/teachers/teacher-6.png',
        nip: '199203252018032012',
        nuptk: '9232756659200074',
        position: 'Guru Kelas 2',
        education: 'S1 - PGSD',
        subject: 'Guru Kelas 2 A',
        category: 'Guru',
        gender: 'P',
        phone: '081234567896',
        email: 'dewi@sdn5gesing.sch.id',
        bio: 'Guru muda yang energik dan inovatif.',
        order: 7,
      },
    ],
  });
  console.log('  ✓ Teachers created (7)');

  // 5. Organization structure
  await db.organizationMember.deleteMany();
  await db.organizationMember.createMany({
    data: [
      { name: 'I Gusti Ayu Made Sari, S.Pd.', position: 'Kepala Sekolah', photo: '/uploads/teachers/headmaster.png', order: 1 },
      { name: 'I Made Suryadi, S.Pd.', position: 'Wakil Kepala Sekolah', photo: '/uploads/teachers/teacher-1.png', order: 2 },
      { name: 'Ni Luh Putu Ratnasari, S.Pd.', position: 'Koord. Kurikulum', photo: '/uploads/teachers/teacher-4.png', order: 3 },
      { name: 'I Putu Eka Wijaya, S.Pd.', position: 'Koord. Kesiswaan', photo: '/uploads/teachers/teacher-3.png', order: 4 },
      { name: 'I Wayan Sudarmawan', position: 'Bendahara / Operator', photo: '/uploads/teachers/teacher-5.png', order: 5 },
      { name: 'Ni Kadek Ayu Wulandari, S.Pd.', position: 'Koord. Sarpras', photo: '/uploads/teachers/teacher-2.png', order: 6 },
    ],
  });
  console.log('  ✓ Organization structure created');

  // 6. Facilities
  await db.facility.deleteMany();
  await db.facility.createMany({
    data: [
      { name: 'Ruang Kelas', photo: '/uploads/facilities/facility-classroom.jpg', category: 'Ruang Kelas', quantity: 6, condition: 'Baik', description: '6 ruang kelas yang nyaman untuk kelas 1 sampai 6.', order: 1 },
      { name: 'Ruang Guru', photo: '/uploads/facilities/facility-teacher-room.jpg', category: 'Ruang Guru', quantity: 1, condition: 'Baik', description: 'Ruang kerja bersama untuk para guru dan tenaga kependidikan.', order: 2 },
      { name: 'Ruang Kepala Sekolah', photo: '/uploads/facilities/facility-principal.jpg', category: 'Ruang Kepala Sekolah', quantity: 1, condition: 'Baik', description: 'Ruang kerja kepala sekolah untuk kegiatan administrasi dan rapat.', order: 3 },
      { name: 'Perpustakaan', photo: '/uploads/facilities/facility-library.jpg', category: 'Perpustakaan', quantity: 1, condition: 'Baik', description: 'Perpustakaan kecil dengan koleksi buku bacaan dan pelajaran.', order: 4 },
      { name: 'UKS (Unit Kesehatan Sekolah)', photo: '/uploads/facilities/facility-uks.jpg', category: 'UKS', quantity: 1, condition: 'Baik', description: 'Tempat istirahat dan pertolongan pertama bagi siswa yang sakit.', order: 5 },
      { name: 'Toilet Siswa', photo: '/uploads/facilities/facility-toilet.jpg', category: 'Toilet', quantity: 4, condition: 'Baik', description: 'Toilet terpisah untuk siswa laki-laki dan perempuan.', order: 6 },
      { name: 'Lapangan Olahraga', photo: '/uploads/facilities/facility-field.jpg', category: 'Lapangan', quantity: 1, condition: 'Baik', description: 'Lapangan serbaguna untuk upacara dan olahraga.', order: 7 },
      { name: 'Ruang Komputer', photo: '/uploads/facilities/facility-computer.jpg', category: 'Peralatan Pembelajaran', quantity: 1, condition: 'Rusak Ringan', description: 'Ruang dengan beberapa unit komputer untuk pembelajaran TIK.', order: 8 },
      { name: 'Papan Tulis & Meja Lipat', photo: '', category: 'Peralatan Pembelajaran', quantity: 12, condition: 'Baik', description: 'Papan tulis di setiap kelas dan meja lipat serbaguna.', order: 9 },
      { name: 'Tempat Sampah Terpisah', photo: '', category: 'Fasilitas Lainnya', quantity: 6, condition: 'Baik', description: 'Tempat sampah organik dan anorganik di tiap kelas.', order: 10 },
      { name: 'Taman Sekolah', photo: '/uploads/facilities/facility-field.jpg', category: 'Fasilitas Lainnya', quantity: 1, condition: 'Baik', description: 'Taman hijau sebagai ruang edukasi lingkungan.', order: 11 },
      { name: 'Musholla / Tempat Ibadah', photo: '', category: 'Ruang Pendukung', quantity: 1, condition: 'Baik', description: 'Tempat ibadah dan kegiatan keagamaan siswa.', order: 12 },
    ],
  });
  console.log('  ✓ Facilities created (12)');

  // 7. Gallery
  await db.galleryItem.deleteMany();
  await db.galleryItem.createMany({
    data: [
      { title: 'Upacara Bendera Senin', photo: '/uploads/gallery/gallery-ceremony.jpg', category: 'Upacara', description: 'Kegiatan upacara bendera setiap hari Senin di halaman sekolah.', date: new Date('2024-08-19') },
      { title: 'Pembelajaran Kelas 4', photo: '/uploads/gallery/gallery-learning.jpg', category: 'Kegiatan Pembelajaran', description: 'Siswa antusias mengikuti pembelajaran di kelas.', date: new Date('2024-09-05') },
      { title: 'Olahraga di Lapangan', photo: '/uploads/gallery/gallery-sports.jpg', category: 'Ekstrakurikuler', description: 'Siswa bermain sepak bola dan olahraga tradisional.', date: new Date('2024-09-12') },
      { title: 'Tari Bali di Panggung', photo: '/uploads/gallery/gallery-art.jpg', category: 'Ekstrakurikuler', description: 'Penampilan tari tradisional Bali oleh siswa.', date: new Date('2024-08-17') },
      { title: 'Kegiatan Pramuka', photo: '/uploads/gallery/gallery-scout.jpg', category: 'Ekstrakurikuler', description: 'Kegiatan kepanduan dan penanaman pohon.', date: new Date('2024-09-20') },
      { title: 'Penyerahan Penghargaan', photo: '/uploads/gallery/gallery-achievement.jpg', category: 'Prestasi Siswa', description: 'Siswa penerima penghargaan akademik.', date: new Date('2024-07-15') },
      { title: 'Kegiatan Keagamaan', photo: '/uploads/gallery/gallery-religious.jpg', category: 'Kegiatan Keagamaan', description: 'Siswa mengikuti kegiatan keagamaan bersama.', date: new Date('2024-09-01') },
      { title: 'Bakti Sosial Lingkungan', photo: '/uploads/gallery/gallery-social.jpg', category: 'Kegiatan Sosial', description: 'Kegiatan kerja bakti membersihkan lingkungan sekolah.', date: new Date('2024-08-25') },
      { title: 'Pameran Karya Seni', photo: '/uploads/gallery/gallery-craft.jpg', category: 'Kegiatan Pembelajaran', description: 'Pamerkan karya seni dan kerajinan siswa di kelas.', date: new Date('2024-09-10') },
      { title: 'Wisuda Kelas 6', photo: '/uploads/gallery/gallery-graduation.jpg', category: 'Kegiatan Sekolah', description: 'Wisuda siswa kelas 6 tahun ajaran 2023/2024.', date: new Date('2024-06-22') },
    ],
  });
  console.log('  ✓ Gallery created (10)');

  // 8. News
  await db.news.deleteMany();
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
        content: 'Pertemuan komite sekolah dengan orang tua murid dilaksanakan di ruang kelas untuk membahas rencana program kerja tahun ajaran baru serta evaluasi pembelajaran.\n\nKepala sekolah I Gusti Ayu Made Sari menyampaikan terima kasih atas dukungan orang tua dan mengajak untuk terus bersinergi memajukan mutu pendidikan di SD Negeri 5 Gesing.',
        photo: '/uploads/gallery/news-3.jpg',
        category: 'Pengumuman',
        published: true,
        publishedAt: new Date('2024-09-12'),
      },
      {
        title: 'Pentas Seni dan Budaya Bali',
        excerpt: 'Siswa menampilkan tarian dan musik tradisional Bali dalam acara pekan budaya.',
        content: 'Dalam rangka pekan budaya Bali, siswa SD Negeri 5 Gesing menampilkan berbagai kesenian tradisional Bali seperti tari, musik rindik, dan pembacaan sastra Bali.\n\nKegiatan ini merupakan wujud pelestarian budadi Bali berlandaskan Tri Hita Karana yang menjadi visi sekolah.',
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
  console.log('  ✓ News created (5)');

  // 9. Announcements
  await db.announcement.deleteMany();
  await db.announcement.createMany({
    data: [
      {
        title: 'Libur Hari Raya',
        content: 'Sekolah libur dalam rangka hari raya. Pembelajaran dilanjutkan sesuai kalender pendidikan.',
        date: new Date('2024-09-30'),
        published: true,
      },
      {
        title: 'Pengisian Daftar Hadir',
        content: 'Mohon orang tua mengisi daftar hadir harian melalui grup WhatsApp kelas masing-masing.',
        date: new Date('2024-09-20'),
        published: true,
      },
      {
        title: 'Pemeriksaan Kesehatan Rutin UKS',
        content: 'Akan diadakan pemeriksaan kesehatan rutin oleh puskesmas. Mohon siswa hadir tepat waktu.',
        date: new Date('2024-09-15'),
        published: true,
      },
      {
        title: 'Pengembalian Buku Perpustakaan',
        content: 'Siswa diingatkan untuk mengembalikan buku perpustakaan yang dipinjam sebelum akhir bulan.',
        date: new Date('2024-09-10'),
        published: true,
      },
    ],
  });
  console.log('  ✓ Announcements created (4)');

  // 10. Students (sample, no sensitive data)
  await db.student.deleteMany();
  const firstNamesM = ['Made', 'Putu', 'Wayan', 'Kadek', 'Nyoman', 'Komang', 'Ketut', 'I Gede', 'I Gusti'];
  const firstNamesF = ['Ni Luh', 'Ni Kadek', 'Ni Made', 'Ni Putu', 'Desak', 'Anak Agung'];
  const lastNames = ['Suryadi', 'Wijaya', 'Lestari', 'Santika', 'Putra', 'Wira', 'Sari', 'Ningsih', 'Pratama', 'Maharani', 'Saputra', 'Dewi'];
  const students: any[] = [];
  const academicYear = '2024/2025';
  // Generate 14 students per class (1-6), 7 boys & 7 girls = 84
  let counter = 1;
  for (let k = 1; k <= 6; k++) {
    for (let i = 0; i < 7; i++) {
      const fn = firstNamesM[Math.floor(Math.random() * firstNamesM.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      students.push({
        nis: `2024${String(k).padStart(2, '0')}${String(counter).padStart(3, '0')}`,
        nisn: `00${Math.floor(1000000000 + Math.random() * 8999999999)}`,
        name: `${fn} ${ln}`,
        gender: 'L',
        className: String(k),
        academicYear,
        status: 'Aktif',
      });
      counter++;
    }
    for (let i = 0; i < 7; i++) {
      const fn = firstNamesF[Math.floor(Math.random() * firstNamesF.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      students.push({
        nis: `2024${String(k).padStart(2, '0')}${String(counter).padStart(3, '0')}`,
        nisn: `00${Math.floor(1000000000 + Math.random() * 8999999999)}`,
        name: `${fn} ${ln}`,
        gender: 'P',
        className: String(k),
        academicYear,
        status: 'Aktif',
      });
      counter++;
    }
  }
  await db.student.createMany({ data: students });
  console.log(`  ✓ Students created (${students.length})`);

  // Also add some students from previous academic year for stats
  const prevStudents: any[] = [];
  let pcounter = 1;
  for (let k = 1; k <= 6; k++) {
    for (let i = 0; i < 6; i++) {
      const fn = firstNamesM[Math.floor(Math.random() * firstNamesM.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      prevStudents.push({
        nis: `2023${String(k).padStart(2, '0')}${String(pcounter).padStart(3, '0')}`,
        name: `${fn} ${ln}`,
        gender: i % 2 === 0 ? 'L' : 'P',
        className: String(k),
        academicYear: '2023/2024',
        status: 'Lulus',
      });
      pcounter++;
    }
  }
  await db.student.createMany({ data: prevStudents });
  console.log(`  ✓ Previous year students created (${prevStudents.length})`);

  console.log('\n✅ Seed completed successfully!');
  console.log('   Admin login: admin@sdn5gesing.sch.id / admin123');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
