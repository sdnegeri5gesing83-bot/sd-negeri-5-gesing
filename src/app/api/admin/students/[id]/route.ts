import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  nisn: z.string().optional().nullable(),
  nis: z.string().optional().nullable(),
  name: z.string().min(2),
  photo: z.string().optional().nullable(),
  birthDate: z.string().optional().nullable(),
  gender: z.enum(['L', 'P']),
  className: z.string().min(1),
  academicYear: z.string().min(5),
  status: z.enum(['Aktif', 'Lulus', 'Pindah']).default('Aktif'),
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
    const data = parsed.data as any;
    ['nisn', 'nis', 'photo', 'birthDate'].forEach((k) => { if (data[k] === '') data[k] = null; });
    const item = await db.student.update({ where: { id }, data });
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
    await db.student.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
