// Update teacher photos with real photos from FOTO.rar.
// Run: bun run scripts/update-teacher-photos.ts
import { db } from '../src/lib/db';

// Mapping: normalized name → photo path
const PHOTO_MAP: { match: string[]; photo: string }[] = [
  { match: ['nyoman astawa', 'i nyoman astawa'], photo: '/uploads/teachers/nyoman-astawa.jpg' },
  { match: ['made agus hermawan'], photo: '/uploads/teachers/made-agus-hermawan.png' },
  { match: ['miftahul jannah'], photo: '/uploads/teachers/miftahul-jannah.jpg' },
  { match: ['ni made rai maha putri', 'ni made rai mahaputri', 'made rai maha putri'], photo: '/uploads/teachers/ni-made-rai-mahaputri.jpg' },
  { match: ['putu agus suar ekkar yasa', 'putu agus suar'], photo: '/uploads/teachers/putu-agus-suar-ekkar-yasa.jpg' },
  { match: ['putu cipta dewi'], photo: '/uploads/teachers/putu-cipta-dewi.jpg' },
  { match: ['putu harta wijaya'], photo: '/uploads/teachers/putu-harta-wijaya.jpg' },
  { match: ['susi susanti'], photo: '/uploads/teachers/susi-susanti.jpg' },
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/[.,]/g, '').replace(/\s+/g, ' ').trim();
}

function findPhoto(name: string): string | null {
  const norm = normalize(name);
  for (const entry of PHOTO_MAP) {
    for (const m of entry.match) {
      if (norm.includes(m)) return entry.photo;
    }
  }
  return null;
}

async function main() {
  console.log('Updating teacher photos with real photos...');

  // 1. Update Teacher records
  const teachers = await db.teacher.findMany();
  console.log(`Found ${teachers.length} teachers`);
  let updated = 0;
  for (const t of teachers) {
    const photo = findPhoto(t.name);
    if (photo) {
      await db.teacher.update({ where: { id: t.id }, data: { photo } });
      console.log(`  ✓ ${t.name} → ${photo}`);
      updated++;
    } else {
      console.log(`  - ${t.name} → no match found`);
    }
  }

  // 2. Update OrganizationMember records
  const orgMembers = await db.organizationMember.findMany();
  console.log(`\nFound ${orgMembers.length} organization members`);
  for (const m of orgMembers) {
    const photo = findPhoto(m.name);
    if (photo) {
      await db.organizationMember.update({ where: { id: m.id }, data: { photo } });
      console.log(`  ✓ ${m.name} → ${photo}`);
    }
  }

  // 3. Update SchoolProfile headmaster photo
  const profile = await db.schoolProfile.findFirst();
  if (profile) {
    const headPhoto = findPhoto(profile.headmasterName);
    if (headPhoto) {
      await db.schoolProfile.update({
        where: { id: profile.id },
        data: { headmasterPhoto: headPhoto },
      });
      console.log(`\n✓ Headmaster photo updated: ${profile.headmasterName} → ${headPhoto}`);
    }
  }

  console.log(`\n✅ Done! Updated ${updated}/${teachers.length} teacher photos.`);
}

main()
  .catch((e) => {
    console.error('Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
