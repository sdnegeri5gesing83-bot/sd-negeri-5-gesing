import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(2, 'Judul minimal 2 karakter'),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(5, 'Konten minimal 5 karakter'),
  photo: z.string().optional().nullable(),
  category: z.string().default('Umum'),
  published: z.boolean().default(true),
  publishedAt: z.string().optional().nullable(),
});

export async function GET() {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const items = await db.news.findMany({ orderBy: { publishedAt: 'desc' } });
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Validasi gagal' }, { status: 400 });
    }
    const data: any = { ...parsed.data };
    ['excerpt', 'photo', 'publishedAt'].forEach((k) => { if (data[k] === '') data[k] = null; });
    if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
    else delete data.publishedAt;
    const item = await db.news.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
