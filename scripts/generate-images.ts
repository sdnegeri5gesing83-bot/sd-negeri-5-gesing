// School image batch generator for SD Negeri 5 Gesing
// Run: bun run scripts/generate-images.ts
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const PUBLIC = path.resolve(process.cwd(), 'public');

const jobs: { prompt: string; size: string; out: string }[] = [
  // Logo - school emblem
  {
    prompt:
      'Modern flat vector logo emblem for an Indonesian elementary school named SD Negeri 5 Gesing, green and teal colors with gold accent, featuring an open book, graduation cap, and a sprouting plant, circular badge style, white background, clean professional, high quality',
    size: '1024x1024',
    out: 'logo-school.png',
  },
  // Hero - school with happy students
  {
    prompt:
      'Beautiful modern Indonesian elementary school building with green and white paint, tropical garden, happy primary school children in red and white uniforms playing and studying outdoors, bright sunny day, lush green trees, professional photography, warm welcoming atmosphere, high quality',
    size: '1344x768',
    out: 'hero-school.jpg',
  },
  // Hero secondary - classroom activity
  {
    prompt:
      'Vibrant Indonesian primary school classroom with diverse happy children in red white uniforms learning together, teacher guiding them, colorful classroom decorations, natural light, warm friendly atmosphere, professional education photography, high quality',
    size: '1344x768',
    out: 'hero-classroom.jpg',
  },
  // Headmaster portrait - female Indonesian principal
  {
    prompt:
      'Professional portrait photo of a friendly Indonesian female elementary school principal, around 45 years old, wearing neat batik blouse, warm confident smile, neutral office background, soft professional lighting, high quality headshot',
    size: '864x1152',
    out: 'headmaster.png',
  },
  // Teacher portraits
  {
    prompt:
      'Professional friendly portrait of an Indonesian male teacher around 35 years old, short hair, wearing neat shirt and tie, warm smile, neutral background, soft lighting, education professional headshot, high quality',
    size: '864x1152',
    out: 'teacher-1.png',
  },
  {
    prompt:
      'Professional friendly portrait of an Indonesian female teacher around 30 years old, hijab, wearing neat blouse, warm smile, neutral background, soft lighting, education professional headshot, high quality',
    size: '864x1152',
    out: 'teacher-2.png',
  },
  {
    prompt:
      'Professional friendly portrait of an Indonesian male teacher around 40 years old, glasses, wearing batik shirt, warm confident smile, neutral background, soft lighting, education professional headshot, high quality',
    size: '864x1152',
    out: 'teacher-3.png',
  },
  {
    prompt:
      'Professional friendly portrait of an Indonesian female teacher around 35 years old, long hair, wearing neat blouse, warm smile, neutral background, soft lighting, education professional headshot, high quality',
    size: '864x1152',
    out: 'teacher-4.png',
  },
  {
    prompt:
      'Professional friendly portrait of an Indonesian male school staff around 38 years old, wearing neat uniform, warm smile, neutral background, soft lighting, professional headshot, high quality',
    size: '864x1152',
    out: 'teacher-5.png',
  },
  {
    prompt:
      'Professional friendly portrait of an Indonesian female teacher around 28 years old, hijab, cheerful smile, wearing neat blouse, neutral background, soft lighting, education professional headshot, high quality',
    size: '864x1152',
    out: 'teacher-6.png',
  },
  // Facility images
  {
    prompt:
      'Clean bright modern Indonesian elementary school classroom with wooden desks and chairs, green chalkboard, natural light from large windows, neat and tidy, professional interior photography, high quality',
    size: '1344x768',
    out: 'facility-classroom.jpg',
  },
  {
    prompt:
      'Cozy teacher staff room in an Indonesian elementary school with wooden tables, chairs, bookshelf, plants, bright windows, warm professional interior photography, high quality',
    size: '1344x768',
    out: 'facility-teacher-room.jpg',
  },
  {
    prompt:
      'Small welcoming school library with colorful bookshelves filled with children books, reading table, bright natural light, primary school setting, professional interior photography, high quality',
    size: '1344x768',
    out: 'facility-library.jpg',
  },
  {
    prompt:
      'School health clinic UKS room in Indonesian elementary school with a bed, first aid cabinet, health posters on wall, clean and tidy, bright lighting, professional interior photography, high quality',
    size: '1344x768',
    out: 'facility-uks.jpg',
  },
  {
    prompt:
      'Outdoor school sports field with green grass, volleyball court markings, Indonesian elementary school building in background, sunny day, professional photography, high quality',
    size: '1344x768',
    out: 'facility-field.jpg',
  },
  {
    prompt:
      'Clean modern school toilet facility in Indonesian elementary school with tiled walls, sinks with mirrors, hygienic and bright, professional interior photography, high quality',
    size: '1344x768',
    out: 'facility-toilet.jpg',
  },
  {
    prompt:
      'Indonesian elementary school principal office with wooden desk, bookshelf, computer, flag and photo on wall, neat and professional, bright interior photography, high quality',
    size: '1344x768',
    out: 'facility-principal.jpg',
  },
  {
    prompt:
      'Computer lab in Indonesian elementary school with desktop computers on long tables, chairs, white walls, bright lighting, professional interior photography, high quality',
    size: '1344x768',
    out: 'facility-computer.jpg',
  },
  // Gallery images
  {
    prompt:
      'Indonesian elementary school students in red and white uniforms doing flag ceremony in school yard, neat rows, morning light, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-ceremony.jpg',
  },
  {
    prompt:
      'Indonesian primary school children learning enthusiastically in colorful classroom, raising hands, teacher helping, bright and cheerful, education photography, high quality',
    size: '1344x768',
    out: 'gallery-learning.jpg',
  },
  {
    prompt:
      'Indonesian elementary school children playing sports, soccer and traditional games on green field, sunny day, joyful, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-sports.jpg',
  },
  {
    prompt:
      'Indonesian elementary school students performing traditional Balinese dance in colorful costumes on stage, cultural event, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-art.jpg',
  },
  {
    prompt:
      'Indonesian elementary school students in scout uniforms doing outdoor activities, planting trees, teamwork, sunny day, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-scout.jpg',
  },
  {
    prompt:
      'Indonesian elementary school students receiving award trophies and medals on stage, proud happy faces, ceremony background, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-achievement.jpg',
  },
  {
    prompt:
      'Indonesian elementary school children doing religious activity, praying together, peaceful atmosphere, respectful and warm, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-religious.jpg',
  },
  {
    prompt:
      'Indonesian elementary school students doing community social activity, cleaning the environment together, working as a team, sunny day, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-social.jpg',
  },
  {
    prompt:
      'Indonesian elementary school art and craft classroom with colorful drawings and crafts displayed on walls, kids artwork showcase, bright and creative atmosphere, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-craft.jpg',
  },
  {
    prompt:
      'Indonesian elementary school graduation ceremony with kids in graduation caps, smiling, holding certificates, festive decoration, professional photography, high quality',
    size: '1344x768',
    out: 'gallery-graduation.jpg',
  },
  // News images
  {
    prompt:
      'Indonesian elementary school students participating in science exhibition with simple experiments, curious faces, classroom setting, professional photography, high quality',
    size: '1344x768',
    out: 'news-1.jpg',
  },
  {
    prompt:
      'Indonesian elementary school Independence Day ceremony August 17 with flag raising, students in red and white uniforms, formal but festive, professional photography, high quality',
    size: '1344x768',
    out: 'news-2.jpg',
  },
  {
    prompt:
      'Indonesian elementary school parent teacher meeting in classroom, adults sitting and discussing, warm collaborative atmosphere, professional photography, high quality',
    size: '1344x768',
    out: 'news-3.jpg',
  },
  {
    prompt:
      'Indonesian elementary school children in traditional Balinese costume performing on stage, colorful cultural event, audience watching, professional photography, high quality',
    size: '1344x768',
    out: 'news-4.jpg',
  },
  {
    prompt:
      'Indonesian elementary school environmental education activity, children planting trees in school garden, sunny day, hands in soil, professional photography, high quality',
    size: '1344x768',
    out: 'news-5.jpg',
  },
];

function mapOut(name: string) {
  if (name.startsWith('teacher') || name.startsWith('headmaster')) {
    return path.join(PUBLIC, 'uploads/teachers', name);
  }
  if (name.startsWith('facility')) {
    return path.join(PUBLIC, 'uploads/facilities', name);
  }
  if (name.startsWith('gallery') || name.startsWith('news')) {
    return path.join(PUBLIC, 'uploads/gallery', name);
  }
  if (name.startsWith('hero')) {
    return path.join(PUBLIC, 'uploads', name);
  }
  if (name.startsWith('logo')) {
    return path.join(PUBLIC, name);
  }
  return path.join(PUBLIC, 'uploads', name);
}

async function main() {
  console.log(`Generating ${jobs.length} images...`);
  const zai = await ZAI.create();
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const outPath = mapOut(job.out);
    // skip if exists
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
      console.log(`[${i + 1}/${jobs.length}] SKIP (exists): ${job.out}`);
      ok++;
      continue;
    }
    try {
      console.log(`[${i + 1}/${jobs.length}] Generating: ${job.out}`);
      const resp = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size as any,
      });
      const b64 = resp.data[0].base64;
      const buf = Buffer.from(b64, 'base64');
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, buf);
      ok++;
      console.log(`   ✓ saved (${buf.length} bytes)`);
    } catch (e: any) {
      fail++;
      console.error(`   ✗ failed: ${job.out} - ${e?.message || e}`);
    }
  }
  console.log(`Done. OK=${ok} FAIL=${fail}`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
