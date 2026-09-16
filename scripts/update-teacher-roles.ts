// Update teacher positions/roles from the latest daftar-guru Excel file.
// Keeps existing photos, NIP, NUPTK, and contact info — only updates position & subject.
// Run: bun run scripts/update-teacher-roles.ts
import { db } from '../src/lib/db';
import * as fs from 'fs';
import * as cp from 'child_process';

interface ExcelRow {
  name: string;
  jenisPtk: string; // e.g. "Guru Kelas 5", "Guru Agama Hindu", "Guru PJOK"
}

function readNewExcel(): ExcelRow[] {
  // Use Python to read the xlsx (openpyxl is available)
  const pyScript = `
import openpyxl, json, sys
wb = openpyxl.load_workbook(sys.argv[1], data_only=True)
ws = wb.active
rows = []
for row in ws.iter_rows(min_row=6, values_only=True):
    if not row or not row[0]: continue
    rows.append({
        "name": str(row[1]).strip() if row[1] else "",
        "jenisPtk": str(row[8]).strip() if row[8] else "",
    })
print(json.dumps(rows))
`;
  const path = '/home/z/my-project/upload/daftar-guru-SD NEGERI 5 GESING-2026-09-16 07_58_55baru.xlsx';
  const result = cp.execSync(`python3 -c '${pyScript.replace(/'/g, "'\\''")}' '${path}'`, { encoding: 'utf-8' });
  return JSON.parse(result.trim());
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[.,]/g, '').replace(/\s+/g, ' ').trim();
}

function expandSubject(jenisPtk: string): string {
  // Expand abbreviated role into a descriptive subject
  if (jenisPtk === 'Guru PJOK') {
    return 'Pendidikan Jasmani, Olahraga, dan Kesehatan';
  }
  if (jenisPtk === 'Guru Agama Hindu') {
    return 'Pendidikan Agama Hindu';
  }
  if (jenisPtk === 'Guru Agama Islam') {
    return 'Pendidikan Agama Islam';
  }
  if (jenisPtk === 'Guru Agama Kristen') {
    return 'Pendidikan Agama Kristen';
  }
  // "Guru Kelas X" → keep as is
  return jenisPtk;
}

async function main() {
  console.log('Reading latest daftar-guru Excel file...');
  const excelTeachers = readNewExcel();
  console.log(`Found ${excelTeachers.length} teachers in new Excel file\n`);

  const dbTeachers = await db.teacher.findMany();
  console.log(`Found ${dbTeachers.length} teachers in database\n`);

  let updated = 0;
  for (const x of excelTeachers) {
    if (!x.name || !x.jenisPtk) continue;
    const norm = normalize(x.name);
    // Find matching DB teacher by name
    const match = dbTeachers.find((t) => normalize(t.name).includes(norm) || norm.includes(normalize(t.name)));
    if (!match) {
      console.log(`  - ${x.name}: no match in database`);
      continue;
    }
    const subject = expandSubject(x.jenisPtk);
    await db.teacher.update({
      where: { id: match.id },
      data: {
        position: x.jenisPtk,
        subject: subject,
      },
    });
    console.log(`  ✓ ${match.name}: position="${x.jenisPtk}", subject="${subject}"`);
    updated++;
  }

  // Also update organization structure positions
  console.log('\nUpdating organization structure...');
  const orgMembers = await db.organizationMember.findMany();
  for (const x of excelTeachers) {
    if (!x.name || !x.jenisPtk) continue;
    const norm = normalize(x.name);
    const match = orgMembers.find((m) => normalize(m.name).includes(norm) || norm.includes(normalize(m.name)));
    if (match) {
      await db.organizationMember.update({
        where: { id: match.id },
        data: { position: x.jenisPtk },
      });
      console.log(`  ✓ Org: ${match.name} → ${x.jenisPtk}`);
    }
  }

  console.log(`\n✅ Done! Updated ${updated}/${excelTeachers.length} teacher positions.`);
}

main()
  .catch((e) => {
    console.error('Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
