---
Task ID: excel-import
Agent: Z.ai Code (main)
Task: Import real school data from 4 uploaded Excel files (daftar-guru, daftar-tendik, daftar_pd, template-facilities) into the SD Negeri 5 Gesing website database.

Work Log:
- Inspected all 4 Excel files using openpyxl to understand their column structure (Dapodik format with 52-66 columns, header at row 5, data from row 6/7)
- Created `scripts/read-excel.py` (Python + openpyxl) that reads all 4 files and maps data to the Prisma model structure:
  - daftar-guru (6 regular teachers) + daftar-tendik (principal + 1 staff) → 8 Teacher records
  - daftar_pd (40 students) → 40 Student records with class assignment from "Rombel Saat Ini" column
  - template-facilities (14 facilities) → 14 Facility records with condition mapping (BAIK→Baik, RUSAK_RINGAN→Rusak Ringan, RUSAK_BERAT→Rusak Berat)
  - Organization structure derived from teachers
  - Headmaster info (Nyoman Astawa) extracted from tendik file → SchoolProfile update
  - Statistics auto-calculated (8 GTK, 40 siswa, 6 kelas, 14 sarpras)
- Assigned teacher photos by gender (male: teacher-1/3/5.png, female: teacher-2/4/6/headmaster.png)
- Capitalized all-caps names properly with .title() while preserving already-mixed-case names
- Created `scripts/import-excel.ts` (Bun + Prisma) that reads the JSON output and updates the database: clears existing teachers/students/facilities/organization/stats, inserts new records, updates school profile headmaster name/photo/NIP
- Ran both scripts successfully: imported 8 teachers, 40 students, 14 facilities, 8 organization members
- Verified with Agent Browser: GTK page shows all 8 real teachers (Nyoman Astawa as Kepala Sekolah first), Students page shows 40 real students with correct gender split (18L/22P), Sarpras page shows real facilities including local Balinese facilities (Padmasana, Mes), Profile page shows real headmaster "Nyoman Astawa" with NIP 197210071996061001
- Verified home statistics render: 8 GTK, 40 Siswa, 6 Kelas, 14 Sarpras (confirmed via VLM)
- Updated README.md with import instructions and script documentation
- No console errors, lint clean

Stage Summary:
- Real school data from Dapodik Excel files successfully imported into the database
- 8 real GTK (including principal Nyoman Astawa and staff Made Agus Hermawan), 40 real students, 14 real facilities
- School profile headmaster automatically updated from tendik data
- Two reusable scripts created: `read-excel.py` (Excel→JSON) and `import-excel.ts` (JSON→DB) for future re-imports
- All website pages verified working with real data via Agent Browser
