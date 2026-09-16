import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  nisn: z.string().optional().nullable(),
  nis: z.string().optional().nullable(),
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  photo: z.string().optional().nullable(),
  gender: z.enum(['L', 'P']),
  className: z.string().min(1, 'Kelas wajib diisi'),
  academicYear: z.string().min(5, 'Tahun pelajaran wajib diisi'),
  status: z.enum(['Aktif', 'Lulus', 'Pindah']).default('Aktif'),
});

export async function GET(req: Request) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const { searchParams } = new URL(req.url);
    const className = searchParams.get('className') || undefined;
    const academicYear = searchParams.get('academicYear') || undefined;
    const search = searchParams.get('search') || undefined;
    const items = await db.student.findMany({
      where: {
        AND: [
          className ? { className } : {},
          academicYear ? { academicYear } : {},
          search ? { name: { contains: search } } : {},
        ],
      },
      orderBy: [{ className: 'asc' }, { name: 'asc' }],
    });
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
    ['nisn', 'nis', 'photo'].forEach((k) => { if (data[k] === '') data[k] = null; });
    const item = await db.student.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
