import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const patchSchema = z.object({
  status: z.enum(['pending', 'reviewing', 'accepted', 'rejected']).optional(),
  childName: z.string().optional(),
  birthPlace: z.string().optional().nullable(),
  birthDate: z.string().optional().nullable(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  parentEmail: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const { id } = await params;
    const item = await db.ppdbRegistration.findUnique({
      where: { id },
      include: {
        documents: {
          orderBy: { uploadedAt: 'asc' },
        },
      },
    });
    if (!item) return NextResponse.json({ error: 'Pendaftar tidak ditemukan' }, { status: 404 });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Validasi gagal' }, { status: 400 });
    }
    const data: any = { ...parsed.data };
    if (data.birthPlace === '') data.birthPlace = null;
    if (data.birthDate === '') data.birthDate = null;
    if (data.parentEmail === '') data.parentEmail = null;
    if (data.address === '') data.address = null;
    if (data.notes === '') data.notes = null;
    const item = await db.ppdbRegistration.update({ where: { id }, data });
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
    // Cascade delete should remove documents; also delete fileUpload entries
    const docs = await db.ppdbDocument.findMany({ where: { registrationId: id } });
    for (const d of docs) {
      try { await db.fileUpload.delete({ where: { id: d.fileId } }); } catch {}
    }
    await db.ppdbRegistration.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
