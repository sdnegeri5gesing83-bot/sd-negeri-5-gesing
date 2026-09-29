import { db } from '../src/lib/db';

const REQUIREMENTS = [
  {
    title: 'Fotokopi Kartu Keluarga (KK)',
    description: '2 lembar',
    required: true,
    allowUpload: true,
    order: 0,
  },
  {
    title: 'Fotokopi Akta Kelahiran',
    description: '2 lembar',
    required: true,
    allowUpload: true,
    order: 1,
  },
  {
    title: 'Fotokopi rapor (jika ada)',
    description: '1 lembar',
    required: false,
    allowUpload: true,
    order: 2,
  },
  {
    title: 'Pas foto 2x3 dan 3x4',
    description: 'masing-masing 2 lembar',
    required: true,
    allowUpload: true,
    order: 3,
  },
  {
    title: 'Fotokopi KTP orang tua/wali',
    description: '1 lembar',
    required: true,
    allowUpload: true,
    order: 4,
  },
  {
    title: 'Mengisi formulir pendaftaran',
    description: 'disediakan sekolah',
    required: true,
    allowUpload: false,
    order: 5,
  },
];

async function main() {
  console.log('Seeding PPDB requirements...');
  // Clear existing requirements (cascade will also clear documents/registrations if linked)
  // We only delete requirements to be safe — registrations stay untouched (they're independent now)
  const existing = await db.ppdbRequirement.findMany();
  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing requirements, deleting...`);
    await db.ppdbRequirement.deleteMany();
  }

  for (const r of REQUIREMENTS) {
    await db.ppdbRequirement.create({ data: r });
    console.log(`  ✓ ${r.title}`);
  }

  const total = await db.ppdbRequirement.count();
  console.log(`\nDone. ${total} requirements inserted.`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
