// Import real school data from Excel (via JSON) into the database.
// Run: bun run scripts/import-excel.ts
import { db } from '../src/lib/db';
import * as fs from 'fs';

interface ImportData {
  teachers: Array<{
    name: string; photo: string | null; nip: string | null; nuptk: string | null;
    position: string; education: string; subject: string | null; category: string;
    gender: string; phone: string | null; email: string | null; bio: string | null; order: number;
  }>;
  students: Array<{
    nis: string | null; nisn: string | null; name: string; gender: string;
    className: string; academicYear: string; status: string;
  }>;
  facilities: Array<{
    name: string; photo: string | null; category: string; quantity: number;
    condition: string; description: string | null; order: number;
  }>;
  organization: Array<{
    name: string; position: string; photo: string | null; order: number;
  }>;
  headmaster: { name: string; photo: string; nip: string } | null;
  stats: Array<{ label: string; value: number; icon: string; order: number }>;
}

async function main() {
  const raw = fs.readFileSync('/home/z/my-project/scripts/import-data.json', 'utf-8');
  const data: ImportData = JSON.parse(raw);

  console.log('Importing real school data from Excel...');
  console.log(`  teachers: ${data.teachers.length}`);
  console.log(`  students: ${data.students.length}`);
  console.log(`  facilities: ${data.facilities.length}`);
  console.log(`  organization: ${data.organization.length}`);

  // 1. Clear existing data
  console.log('Clearing existing data...');
  await db.teacher.deleteMany();
  await db.student.deleteMany();
  await db.facility.deleteMany();
  await db.organizationMember.deleteMany();
  await db.statistic.deleteMany();

  // 2. Insert teachers
  console.log('Importing teachers...');
  for (const t of data.teachers) {
    await db.teacher.create({
      data: {
        name: t.name,
        photo: t.photo || null,
        nip: t.nip || null,
        nuptk: t.nuptk || null,
        position: t.position,
        education: t.education,
        subject: t.subject || null,
        category: t.category,
        gender: t.gender,
        phone: t.phone || null,
        email: t.email || null,
        bio: t.bio || null,
        order: t.order,
      },
    });
  }

  // 3. Insert students
  console.log('Importing students...');
  for (const s of data.students) {
    await db.student.create({
      data: {
        nis: s.nis || null,
        nisn: s.nisn || null,
        name: s.name,
        gender: s.gender,
        className: s.className,
        academicYear: s.academicYear,
        status: s.status,
      },
    });
  }

  // 4. Insert facilities
  console.log('Importing facilities...');
  for (const f of data.facilities) {
    await db.facility.create({
      data: {
        name: f.name,
        photo: f.photo || null,
        category: f.category,
        quantity: f.quantity,
        condition: f.condition,
        description: f.description || null,
        order: f.order,
      },
    });
  }

  // 5. Insert organization
  console.log('Importing organization...');
  for (const o of data.organization) {
    await db.organizationMember.create({
      data: {
        name: o.name,
        position: o.position,
        photo: o.photo || null,
        order: o.order,
      },
    });
  }

  // 6. Insert statistics
  console.log('Importing statistics...');
  for (const s of data.stats) {
    await db.statistic.create({ data: s });
  }

  // 7. Update school profile headmaster
  if (data.headmaster) {
    console.log('Updating headmaster info...');
    const profile = await db.schoolProfile.findFirst();
    if (profile) {
      await db.schoolProfile.update({
        where: { id: profile.id },
        data: {
          headmasterName: data.headmaster.name,
          headmasterPhoto: data.headmaster.photo,
          headmasterNip: data.headmaster.nip,
          headmasterWelcome:
            'Assalamualaikum dan salam sejahtera bagi kita semua.\n\n' +
            'Selamat datang di website resmi SD Negeri 5 Gesing. Melalui media ini, ' +
            'kami berharap dapat membuka akses informasi yang lebih luas bagi seluruh ' +
            'warga sekolah, orang tua, dan masyarakat umum. Kami berkomitmen untuk ' +
            'terus meningkatkan mutu layanan pendidikan demi membentuk generasi yang ' +
            'beriman, berakhlak mulia, cerdas, dan mandiri.\n\n' +
            'Mari bersama-sama membangun pendidikan yang bermutu untuk masa depan anak-anak kita.',
        },
      });
    }
  }

  // 8. Verify counts
  const tCount = await db.teacher.count();
  const sCount = await db.student.count();
  const fCount = await db.facility.count();
  const oCount = await db.organizationMember.count();
  console.log('\n✅ Import complete!');
  console.log(`  Teachers in DB: ${tCount}`);
  console.log(`  Students in DB: ${sCount}`);
  console.log(`  Facilities in DB: ${fCount}`);
  console.log(`  Organization members: ${oCount}`);
}

main()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
