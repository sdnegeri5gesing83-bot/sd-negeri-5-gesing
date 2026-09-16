import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  photo: z.string().optional().nullable(),
  nip: z.string().optional().nullable(),
  nuptk: z.string().optional().nullable(),
  position: z.string().min(2),
  education: z.string().min(1),
  subject: z.string().optional().nullable(),
  category: z.enum(['Guru', 'Tenaga Kependidikan']),
  gender: z.enum(['L', 'P']),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().or(z.literal('')).optional().nullable(),
  bio: z.string().optional().nullable(),
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
    const data = parsed.data as any;
    ['photo', 'nip', 'nuptk', 'subject', 'phone', 'email', 'bio'].forEach((k) => {
      if (data[k] === '') data[k] = null;
    });
    const item = await db.teacher.update({ where: { id }, data });
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
    await db.teacher.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
