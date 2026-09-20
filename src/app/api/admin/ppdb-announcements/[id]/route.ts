import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(2),
  content: z.string().min(3),
  photo: z.string().optional().nullable(),
  fileUrl: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
  fileType: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Validasi gagal' }, { status: 400 });
    }
    const data: any = { ...parsed.data };
    ['photo', 'fileUrl', 'fileName', 'fileType'].forEach((k) => { if (data[k] === '') data[k] = null; });
    if (data.date) data.date = new Date(data.date);
    else delete data.date;
    const item = await db.ppdbAnnouncement.update({ where: { id }, data });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const { id } = await params;
    await db.ppdbAnnouncement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
