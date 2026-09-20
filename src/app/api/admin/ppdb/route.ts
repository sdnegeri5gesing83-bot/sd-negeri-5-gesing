import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  phase: z.string().min(2, 'Nama tahapan minimal 2 karakter'),
  date: z.string().min(2, 'Tanggal wajib diisi'),
  time: z.string().min(2, 'Jam wajib diisi'),
  description: z.string().optional().nullable(),
  status: z.enum(['active', 'upcoming', 'done']).default('upcoming'),
  order: z.number().int().default(0),
});

export async function GET() {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const items = await db.ppdbSchedule.findMany({ orderBy: { order: 'asc' } });
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
    if (data.description === '') data.description = null;
    const item = await db.ppdbSchedule.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
