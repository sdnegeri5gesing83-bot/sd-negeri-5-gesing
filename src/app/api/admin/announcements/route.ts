import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(2, 'Judul minimal 2 karakter'),
  content: z.string().min(3, 'Konten minimal 3 karakter'),
  photo: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  published: z.boolean().default(true),
});

export async function GET() {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const items = await db.announcement.findMany({ orderBy: { date: 'desc' } });
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
    if (data.photo === '') data.photo = null;
    if (data.date) data.date = new Date(data.date);
    else delete data.date;
    const item = await db.announcement.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
