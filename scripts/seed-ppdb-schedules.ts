import { db } from '../src/lib/db';

async function main() {
  const count = await db.ppdbSchedule.count();
  if (count > 0) {
    console.log(`PPDB schedules already exist (${count}), skipping.`);
    return;
  }
  console.log('Seeding PPDB schedules...');
  await db.ppdbSchedule.createMany({
    data: [
      { phase: 'Pendaftaran Online', date: '1 Juni - 30 Juni 2025', time: '08.00 - 14.00 WITA', description: 'Pendaftaran dilakukan secara online melalui website atau datang langsung ke sekolah.', status: 'active', order: 1 },
      { phase: 'Verifikasi Berkas', date: '1 - 5 Juli 2025', time: '08.00 - 13.00 WITA', description: 'Verifikasi dokumen: KK, Akta Kelahiran, dan dokumen pendukung lainnya.', status: 'upcoming', order: 2 },
      { phase: 'Pengumuman Hasil', date: '10 Juli 2025', time: '09.00 WITA', description: 'Pengumuman hasil seleksi penerimaan peserta didik baru.', status: 'upcoming', order: 3 },
      { phase: 'Daftar Ulang', date: '11 - 15 Juli 2025', time: '08.00 - 13.00 WITA', description: 'Calon peserta didik yang diterima melakukan daftar ulang di sekolah.', status: 'upcoming', order: 4 },
      { phase: 'Pengenalan Lingkungan Sekolah (PLS)', date: '16 - 18 Juli 2025', time: '07.30 - 11.00 WITA', description: 'Masa pengenalan lingkungan sekolah bagi siswa baru.', status: 'upcoming', order: 5 },
      { phase: 'Mulai Pembelajaran', date: '21 Juli 2025', time: '07.30 WITA', description: 'Hari pertama masuk sekolah untuk tahun pelajaran 2025/2026.', status: 'upcoming', order: 6 },
    ],
  });
  const total = await db.ppdbSchedule.count();
  console.log(`✓ PPDB schedules created (${total})`);
  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
