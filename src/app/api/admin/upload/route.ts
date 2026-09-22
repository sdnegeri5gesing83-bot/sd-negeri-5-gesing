import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';

export async function POST(req: Request) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Tipe file tidak didukung. Gunakan JPG/PNG/WebP/GIF.' }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Ukuran file maksimal 5MB' }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const base64 = buf.toString('base64');
    const upload = await db.fileUpload.create({
      data: {
        data: base64,
        contentType: file.type,
        filename: file.name,
        size: file.size,
      },
    });
    return NextResponse.json({ url: `/api/file/${upload.id}` });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
