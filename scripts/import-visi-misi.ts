// Import real VISI, MISI, TUJUAN from docx into the school profile.
// Run: bun run scripts/import-visi-misi.ts
import { db } from '../src/lib/db';

const vision = 'Terwujudnya Insan yang Bertaqwa, cerdas, serta peduli sesama.';

const mission = `1. Meningkatkan penghayatan dan pengamalan terhadap ajaran agama yang dianut, dan nilai-nilai budaya karakter bangsa sehingga menjadi sumber kearifan dalam berpikir dan bertindak.
2. Memfasilitasi guru untuk menerapkan pendekatan pembelajaran mendalam (deep learning), yang menekankan pada pemahaman konsep, pengalaman belajar bermakna, reflektif, dan kolaboratif, serta mendorong terciptanya pembelajaran yang transformatif.
3. Mendorong dan membantu setiap peserta didik untuk mengenali potensi dirinya, sehingga dapat berkembang secara optimal.
4. Melaksanakan program pelatihan dan pengembangan profesional berkelanjutan bagi pendidik dan tenaga kependidikan, khususnya dalam penguatan literasi, numerasi, pengembangan karakter, pembelajaran mendalam, dan integrasi teknologi digital secara etis.
5. Meningkatkan pengetahuan, wawasan dan daya kritis untuk menumbuhkan semangat belajar sepanjang hayat, sebagai bagian dari gemar belajar.
6. Meningkatkan kesadaran dan kedisiplinan peserta didik terhadap seluruh warga sekolah dan lingkungan sekitar.
7. Membudayakan pola hidup gotong-royong untuk menciptakan sekolah aman, bersih, dan sehat.`;

const goals = `TUJUAN JANGKA PENDEK (1 Tahun ke depan):
a. Terwujudnya kurikulum SD Negeri 5 Gesing yang terintegrasi kecerdasan majemuk, pembelajaran sosial emosional, dan pembiasaan karakter berlandaskan nilai.
b. Terwujudnya proses pembelajaran yang mengimplementasikan pendekatan pembelajaran mendalam oleh guru.
c. Terwujudnya struktur manajemen pembelajaran intrakurikuler, kokurikuler, dan ekstrakurikuler serta manajemen sekolah yang produktif.
d. Terwujudnya pelatihan intensif bagi guru dan tenaga kependidikan berkaitan dengan literasi, numerasi, karakter, dan pembelajaran mendalam.
e. Meningkatnya nilai Asesmen Nasional Tahun 2025: numerasi minimal 60%.
f. Mencapai ketuntasan belajar literasi dasar: calistung sampai 75% tahun ajaran 2025/2026.
g. Ikut serta dalam lomba atau eksebisi kemampuan murid tahun ajaran 2025/2026.
h. Meningkatkan nilai keagamaan melalui sembahyang perayaan hari Purnama dan Tilem, Tumpek, dan hari raya lainnya tahun 2025/2026.

TUJUAN JANGKA MENENGAH (2-3 Tahun ke depan):
a. Mengembangkan semangat berkreativitas bagi seluruh warga sekolah melalui disiplin yang tinggi.
b. Mengembangkan pendekatan pembelajaran mendalam yang memuliakan dengan menekankan pada penciptaan suasana belajar dan proses pembelajaran berkesadaran, bermakna, dan menggembirakan melalui olah pikir, olah hati, olah rasa, dan olah raga secara holistik dan terpadu.
c. Menumbuhkan dan membiasakan berpikir kritis dalam memecahkan permasalahan.
d. Menumbuhkan kepedulian terhadap budaya lokal dan nilai-nilai keagamaan.
e. Mengembangkan keterampilan dalam berpikir, berbicara, bertingkah laku dalam kehidupan sehari-hari.
f. Mengoptimalkan pemanfaatan teknologi digital secara bijak dan terintegrasi, baik dalam proses pembelajaran maupun manajemen sekolah, termasuk dalam perencanaan, asesmen, serta kemitraan antara guru, siswa, dan orang tua.

TUJUAN JANGKA PANJANG (4 Tahun ke depan):
a. Meningkatnya kemampuan literasi dan numerasi secara konsisten.
b. Mulai munculnya prestasi akademik dan non-akademik.
c. Mampu mengembangkan kemampuan kecakapan hidup yang dimiliki.
d. Meningkatnya implementasi nilai-nilai keagamaan pada setiap warga sekolah.
e. Menunjukkan sikap berkebhinekaan global yang khas Indonesia.
f. Mengintegrasikan teknologi digital secara cerdas dan etis dalam seluruh aspek pendidikan, baik dalam pembelajaran, asesmen, pelaporan, komunikasi, manajemen data, hingga pelibatan komunitas, dengan tetap menjunjung prinsip keamanan digital dan keseimbangan penggunaan teknologi.`;

async function main() {
  console.log('Updating school profile with real VISI, MISI, TUJUAN...');

  const profile = await db.schoolProfile.findFirst();
  if (!profile) {
    console.error('School profile not found. Run seed first.');
    process.exit(1);
  }

  await db.schoolProfile.update({
    where: { id: profile.id },
    data: { vision, mission, goals },
  });

  console.log('✅ School profile updated!');
  console.log('\n--- VISI ---');
  console.log(vision);
  console.log('\n--- MISI (7 points) ---');
  console.log(mission);
  console.log('\n--- TUJUAN (3 jangka waktu) ---');
  console.log(goals);
}

main()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
