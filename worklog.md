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

---
Task ID: visi-misi-import
Agent: Z.ai Code (main)
Task: Import real VISI, MISI, TUJUAN from uploaded Word document (VISI, MISI, TUJUAN.docx) into the school profile.

Work Log:
- Read the docx file using pandoc (`pandoc -f docx -t plain`) to extract text content
- Parsed the extracted text into 3 sections: Visi (1 sentence), Misi (7 numbered points), Tujuan (3 time horizons: Pendek/Menengah/Panjang, each with lettered items a-f)
- Cleaned up the Tujuan table format (which pandoc rendered as a 3-column table) into structured text with clear section headers
- Created `scripts/import-visi-misi.ts` that updates the SchoolProfile vision, mission, and goals fields via Prisma
- Ran the script successfully — school profile updated with real content
- Verified via API: VISI = "Terwujudnya Insan yang Bertaqwa, cerdas, serta peduli sesama.", MISI has 7 points (deep learning, gotong-royong, etc.), TUJUAN has all 3 jangka waktu (Pendek/Menengah/Panjang)
- Verified via Agent Browser: Profile page displays the real Visi/Misi/Tujuan in 3 cards with proper whitespace-pre-line formatting
- No console errors, lint clean

Stage Summary:
- Real Visi, Misi (7 poin), dan Tujuan (3 jangka waktu: pendek/menengah/panjang) from the official Word document successfully imported into the school profile
- Profile page now displays authentic school vision/mission/goals instead of placeholder text
- Script `import-visi-misi.ts` created for future re-imports

---
Task ID: teacher-photos
Agent: Z.ai Code (main)
Task: Import real teacher photos from FOTO.rar and update all GTK/organization/headmaster photos in the database.

Work Log:
- Extracted FOTO.rar using `unrar` → 8 teacher photos matching the 8 GTK in the database
- Verified one photo (principal) with VLM: confirmed as formal portrait headshot
- Copied all 8 photos to public/uploads/teachers/ with clean lowercase-hyphenated filenames:
  - nyoman-astawa.jpg (Kepala Sekolah)
  - made-agus-hermawan.png (Tenaga Kependidikan)
  - miftahul-jannah.jpg, ni-made-rai-mahaputri.jpg, putu-agus-suar-ekkar-yasa.jpg, putu-cipta-dewi.jpg, putu-harta-wijaya.jpg, susi-susanti.jpg (6 Guru)
- Created `scripts/update-teacher-photos.ts` with fuzzy name matching that:
  - Updates all 8 Teacher records with correct photo paths
  - Updates all 8 OrganizationMember records with correct photo paths
  - Updates SchoolProfile.headmasterPhoto with principal's real photo
- Ran the script: 8/8 teachers updated, 8/8 org members updated, headmaster photo updated
- Verified via Agent Browser:
  - GTK page: 4 teacher cards visible with real portrait photos loading correctly (VLM confirmed)
  - Home page Sambutan Kepala Sekolah: real principal portrait photo loading (VLM confirmed)
  - Profile page Struktur Organisasi: real photos confirmed via accessibility snapshot (image alt texts match teacher names)
- Verified via API: all 8 teachers and headmaster have correct photo paths
- No console errors, lint clean
- Cleaned up extracted folder and test screenshots

Stage Summary:
- All 8 real teacher/staff photos from FOTO.rar successfully integrated into the website
- Photos appear on: GTK page cards, Profile page Sambutan & Struktur Organisasi sections, Home page Sambutan section
- Headmaster photo in SchoolProfile updated to real principal photo (Nyoman Astawa)
- Script `update-teacher-photos.ts` created for future re-updates

---
Task ID: profile-image
Agent: Z.ai Code (main)
Task: Add official "Profil Sekolah SD Negeri 5 Gesing" image and update identity data from it.

Work Log:
- Analyzed the uploaded "profil sekolah sd negeri 5 gesing.png" (1202x570 PNG) using VLM (z-ai vision)
- Extracted all text from the official profile card: NPSN 50100616, Bentuk Pendidikan SD, Status Negeri, Alamat Banjar Dinas Waru, Desa Gesing, Kec. Banjar, Kab. Buleleng, Prov. Bali, SK Pendirian 4212/760/Srt.Ket/SD5.GS/VIII/2022, Tanggal SK 01/07/83
- Discovered the NPSN in the database (50203456) was a placeholder — corrected to the real NPSN 50100616
- Copied the profile image to public/uploads/profil-sekolah.png
- Created `scripts/update-profile-data.ts` that updates SchoolProfile:
  - npsn: 50100616 (corrected)
  - address/village/district/regency/province verified
  - history updated to include SK Pendirian & SK Izin Operasional info, founding year 1983
- Ran the script successfully
- Updated `profile-section.tsx`:
  - Added 5 new identity rows: Bentuk Pendidikan, Status Sekolah, SK Pendirian Sekolah, Tanggal SK Pendirian, SK Izin Operasional
  - Added new icon imports (FileText, Calendar, GraduationCap)
  - Added "Profil Resmi Sekolah" card below the identity table that displays the official profile image with a green header
- Verified via Agent Browser: NPSN shows 50100616, SK Pendirian fields visible, Profil Resmi Sekolah image card displays correctly (VLM confirmed)
- Verified via API: NPSN=50100616, history contains SK Pendirian and 1983
- No console errors, lint clean

Stage Summary:
- Official school profile image (Identitas Sekolah card) successfully added to the Profile page
- NPSN corrected to the real value 50100616 (was placeholder)
- 5 new identity fields added (Bentuk Pendidikan, Status, SK Pendirian, Tanggal SK, SK Izin Operasional)
- School history updated with founding year 1983 and SK Pendirian details
- Script `update-profile-data.ts` created for future re-updates

---
Task ID: teacher-roles-update
Agent: Z.ai Code (main)
Task: Update teacher positions/roles from the latest daftar-guru Excel file (daftar-guru-...-07_58_55baru.xlsx).

Work Log:
- Inspected the new Excel file and compared with the previous version
- Found that the "Jenis PTK" column now contains SPECIFIC role assignments instead of generic "Guru":
  - Miftahul Jannah: Guru → Guru Kelas 5 (was incorrectly assigned Guru Kelas 1)
  - Ni Made Rai Maha Putri: Guru → Guru Agama Hindu (was incorrectly assigned Guru Kelas 5)
  - Putu Agus Suar Ekkar Yasa: Guru → Guru PJOK (was incorrectly assigned Guru Kelas 6)
  - Putu Cipta Dewi: Guru → Guru Kelas 6 (was incorrectly assigned Guru Kelas 4)
  - Putu Harta Wijaya: Guru → Guru Kelas 1 (was incorrectly assigned Guru Kelas 3)
  - Susi Susanti: Guru → Guru Kelas 3 (was incorrectly assigned Guru Kelas 2)
- Created `scripts/update-teacher-roles.ts` that:
  - Reads the new Excel file via Python openpyxl (called from bun)
  - Matches teachers by name (fuzzy, case-insensitive)
  - Updates ONLY the position and subject fields (preserves photos, NIP, NUPTK, contact info)
  - Expands abbreviated subjects: Guru PJOK → "Pendidikan Jasmani, Olahraga, dan Kesehatan", Guru Agama Hindu → "Pendidikan Agama Hindu"
  - Also updates OrganizationMember positions
- Ran the script: 6/6 teachers + 6/6 org members updated
- Verified via API: all 8 teachers have correct positions, subjects, and real photos preserved
- Verified via Agent Browser accessibility snapshot: GTK page shows "Guru Kelas 5", "Guru Agama Hindu", "Guru PJOK", "Pendidikan Jasmani, Olahraga, dan Kesehatan", "Guru Kelas 6", "Guru Kelas 1", "Guru Kelas 3"
- No console errors, lint clean

Stage Summary:
- All 6 teacher roles updated with correct specializations from the latest Dapodik data
- Photos from FOTO.rar and all contact info (NIP, NUPTK, email, phone) preserved intact
- Organization structure also updated to match new roles
- Script `update-teacher-roles.ts` created for future role updates when Dapodik data changes

---
Task ID: hero-student-count
Agent: Z.ai Code (main)
Task: Change "84 Siswa Aktif" to "40 Siswa Aktif" on the home page hero section.

Work Log:
- Found hardcoded "84" at line 120 of home-section.tsx (hero overlay stat card)
- Instead of just changing 84→40, made the value DYNAMIC by fetching from /api/public/students/summary API
- Added useFetch hook for student summary with fallback to 40
- Replaced hardcoded 84 with {studentCount} variable (auto-updates if student data changes)
- Verified via Agent Browser accessibility snapshot: "40" and "Siswa Aktif" confirmed rendered
- Lint clean, no errors

Stage Summary:
- Hero section now displays "40 Siswa Aktif" (was hardcoded 84)
- Made dynamic: fetches real student count from API, will auto-update if data changes
- Consistent with the actual 40 students imported from Dapodik Excel

---
Task ID: hero-vision-text
Agent: Z.ai Code (main)
Task: Replace hero description text with the real school vision.

Work Log:
- Found the hardcoded placeholder text (about Tri Hita Karana) in hero section
- Replaced with dynamic vision text from profile API: {profile?.vision || 'Terwujudnya Insan yang Bertaqwa, cerdas, serta peduli sesama.'}
- Now displays the real school vision "Terwujudnya Insan yang Bertaqwa, cerdas, serta peduli sesama."
- Verified via accessibility snapshot: new vision text confirmed, old Tri Hita Karana text gone
- Lint clean

Stage Summary:
- Hero section now displays the official school vision instead of placeholder text
- Made dynamic: fetches vision from profile API, auto-updates if admin changes the vision

---
Task ID: contact-update
Agent: Z.ai Code (main)
Task: Update school contact info with real data (phone, email, WhatsApp, service hours).

Work Log:
- Created `scripts/update-contact.ts` to update SchoolProfile with real contact data provided by the school
- Updated fields:
  - phone: 08873886384 (local format)
  - email: sdnegeri5gesing83@gmail.com (real school email)
  - whatsapp: 628873886384 (international format so wa.me links work correctly)
  - serviceHours: "Senin - Kamis: 07.00 - 14.00 WITA\nJumat: 07.00 - 13.00 WITA"
- Ran the script successfully
- Verified via Agent Browser accessibility snapshot on Kontak page:
  - Telepon: 08873886384 (clickable tel: link) ✓
  - Email: sdnegeri5gesing83@gmail.com (clickable mailto: link) ✓
  - WhatsApp: +628873886384 (clickable wa.me link) ✓
  - Jam Layanan: Senin-Kamis 07.00-14.00 WITA, Jumat 07.00-13.00 WITA ✓
- Contact info also auto-updated in footer (uses same profile data)
- No errors

Stage Summary:
- Real contact info successfully updated: phone 08873886384, email sdnegeri5gesing83@gmail.com, WhatsApp +628873886384
- Service hours updated: Senin-Kamis 07.00-14.00 WITA, Jumat 07.00-13.00 WITA
- All clickable (tel:, mailto:, wa.me links work)
- Footer auto-updated too (dynamic from profile)
- Script `update-contact.ts` created for future contact updates
