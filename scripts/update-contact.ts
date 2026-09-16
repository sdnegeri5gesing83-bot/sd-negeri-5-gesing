// Update school contact info with real data provided by the school.
// Run: bun run scripts/update-contact.ts
import { db } from '../src/lib/db';

async function main() {
  console.log('Updating school contact info...');

  const profile = await db.schoolProfile.findFirst();
  if (!profile) {
    console.error('School profile not found.');
    process.exit(1);
  }

  await db.schoolProfile.update({
    where: { id: profile.id },
    data: {
      phone: '08873886384',
      email: 'sdnegeri5gesing83@gmail.com',
      whatsapp: '628873886384', // international format for wa.me links
      serviceHours: 'Senin - Kamis: 07.00 - 14.00 WITA\nJumat: 07.00 - 13.00 WITA',
    },
  });

  console.log('✅ Contact info updated!');
  console.log(`  Telepon      : 08873886384`);
  console.log(`  Email        : sdnegeri5gesing83@gmail.com`);
  console.log(`  WhatsApp     : 628873886384 (link wa.me akan otomatis ke +628873886384)`);
  console.log(`  Jam Layanan  :`);
  console.log(`    Senin - Kamis: 07.00 - 14.00 WITA`);
  console.log(`    Jumat        : 07.00 - 13.00 WITA`);
}

main()
  .catch((e) => {
    console.error('Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
