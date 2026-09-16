// Update headmaster welcome message with the real text provided by the school.
// Run: bun run scripts/update-welcome.ts
import { db } from '../src/lib/db';

const welcome = `Assalamualaikum dan salam sejahtera bagi kita semua.

Selamat datang di website resmi SD Negeri 5 Gesing. Melalui media ini, kami berharap dapat membuka akses informasi yang lebih luas bagi seluruh warga sekolah, orang tua, dan masyarakat umum. Kami berkomitmen untuk terus meningkatkan mutu layanan pendidikan demi "Terwujudnya Insan yang Bertaqwa, cerdas, serta peduli sesama"

Mari bersama-sama membangun pendidikan yang bermutu untuk masa depan anak-anak kita.`;

async function main() {
  console.log('Updating headmaster welcome message...');

  const profile = await db.schoolProfile.findFirst();
  if (!profile) {
    console.error('School profile not found.');
    process.exit(1);
  }

  await db.schoolProfile.update({
    where: { id: profile.id },
    data: { headmasterWelcome: welcome },
  });

  console.log('✅ Headmaster welcome message updated!');
  console.log('\n--- New welcome message ---');
  console.log(welcome);
}

main()
  .catch((e) => {
    console.error('Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
