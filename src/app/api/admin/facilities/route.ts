import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  photo: z.string().optional().nullable(),
  category: z.string().min(2, 'Kategori wajib diisi'),
  quantity: z.number().int().min(1, 'Jumlah minimal 1'),
  condition: z.enum(['Baik', 'Rusak Ringan', 'Rusak Berat']).default('Baik'),
  description: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export async function GET() {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const items = await db.facility.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });
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
    const data = parsed.data as any;
    ['photo', 'description'].forEach((k) => { if (data[k] === '') data[k] = null; });
    const item = await db.facility.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
