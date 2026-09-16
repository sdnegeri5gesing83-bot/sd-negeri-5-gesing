// Update school profile with real data from the official profile image.
// Run: bun run scripts/update-profile-data.ts
import { db } from '../src/lib/db';

async function main() {
  console.log('Updating school profile with real identity data...');

  const profile = await db.schoolProfile.findFirst();
  if (!profile) {
    console.error('School profile not found. Run seed first.');
    process.exit(1);
  }

  // Real data from the official "Profil Sekolah SD Negeri 5 Gesing" image
  await db.schoolProfile.update({
    where: { id: profile.id },
    data: {
      npsn: '50100616', // Correct NPSN (was 50203456 placeholder)
      nss: profile.nss, // keep existing NSS
      accreditation: profile.accreditation,
      address: 'Banjar Dinas Waru',
      village: 'Gesing',
      district: 'Banjar',
      regency: 'Buleleng',
      province: 'Bali',
      postalCode: '81152',
      // Update history to include SK pendirian/operasional info
      history:
        'SD Negeri 5 Gesing berdiri sejak tahun 1983 dan telah menjadi bagian penting dari layanan pendidikan dasar di Desa Gesing, Kecamatan Banjar, Kabupaten Buleleng, Provinsi Bali.\n\n' +
        'Sekolah ini didirikan berdasarkan SK Pendirian Sekolah Nomor: 4212/760/Srt.Ket/SD5.GS/VIII/2022 dan SK Izin Operasional dengan nomor yang sama, tertanggal 01 Juli 1983. Sebagai sekolah negeri dengan bentuk pendidikan Sekolah Dasar (SD), SD Negeri 5 Gesing terus berkembang seiring dengan komitmen pemerintah dan masyarakat untuk memajukan pendidikan di daerah pegunungan Bali bagian utara.\n\n' +
        'Hingga saat ini, SD Negeri 5 Gesing terus berbenah untuk menyediakan layanan pendidikan yang berkualitas, ramah anak, dan relevan dengan kebutuhan masyarakat setempat. Dengan dukungan para guru, orang tua, dan pemangku kepentingan, sekolah berkomitmen membentuk generasi yang cerdas, berakhlak mulia, dan berbudaya.',
    },
  });

  console.log('✅ School profile updated!');
  console.log('  NPSN: 50100616 (corrected from placeholder)');
  console.log('  Address: Banjar Dinas Waru, Gesing, Banjar, Buleleng, Bali');
  console.log('  History updated with SK pendirian & izin operasional info');
  console.log('  SK Pendirian: 4212/760/Srt.Ket/SD5.GS/VIII/2022');
  console.log('  Tanggal SK: 01/07/1983');
}

main()
  .catch((e) => {
    console.error('Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
