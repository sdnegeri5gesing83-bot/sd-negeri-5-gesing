// Update Google Maps embed with real coordinates of SD Negeri 5 Gesing.
// Run: bun run scripts/update-map.ts
import { db } from '../src/lib/db';

async function main() {
  console.log('Updating Google Maps embed with real coordinates...');

  const profile = await db.schoolProfile.findFirst();
  if (!profile) {
    console.error('School profile not found.');
    process.exit(1);
  }

  // Real coordinates from the provided Google Maps URL
  // https://www.google.com/maps/place//@-8.3021766,115.0810497,153m/...
  const lat = -8.3021766;
  const lng = 115.0810497;
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=19&output=embed`;

  await db.schoolProfile.update({
    where: { id: profile.id },
    data: { mapEmbed: embedUrl },
  });

  console.log('✅ Map embed updated!');
  console.log(`  Coordinates: ${lat}, ${lng}`);
  console.log(`  Embed URL: ${embedUrl}`);
  console.log(`\nThe map on the Kontak page now shows the exact location of SD Negeri 5 Gesing.`);
}

main()
  .catch((e) => {
    console.error('Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
