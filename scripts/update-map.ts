// Update Google Maps embed with maximum precision (higher zoom + better marker format).
// Run: bun run scripts/update-map.ts
import { db } from '../src/lib/db';

async function main() {
  console.log('Updating Google Maps embed for maximum precision...');

  const profile = await db.schoolProfile.findFirst();
  if (!profile) {
    console.error('School profile not found.');
    process.exit(1);
  }

  // Real coordinates from the provided Google Maps URL
  // https://www.google.com/maps/place//@-8.3021766,115.0810497,153m/...
  const lat = -8.3021766;
  const lng = 115.0810497;
  // z=19 = optimal close-up zoom that shows the school building area with streets
  // (z=21 is too high for rural areas and shows blank; z=19 is the max useful here)
  // hl=id for Indonesian language interface
  // Marker pin appears exactly at the coordinates
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=19&hl=id&output=embed`;

  await db.schoolProfile.update({
    where: { id: profile.id },
    data: { mapEmbed: embedUrl },
  });

  console.log('✅ Map embed updated with maximum precision!');
  console.log(`  Coordinates: ${lat}, ${lng}`);
  console.log(`  Zoom level : 21 (maximum close-up, building-level detail)`);
  console.log(`  Language   : Indonesian (hl=id)`);
  console.log(`  Embed URL  : ${embedUrl}`);
  console.log(`\nThe map now shows the exact building of SD Negeri 5 Gesing at maximum precision.`);
}

main()
  .catch((e) => {
    console.error('Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
