import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(2),
  description: z.string().optional().nullable(),
  required: z.boolean(),
  allowUpload: z.boolean(),
  order: z.number().int(),
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
    if (data.description === '') data.description = null;
    const item = await db.ppdbRequirement.update({ where: { id }, data });
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
    // Check for any documents referencing this requirement
    const docs = await db.ppdbDocument.findMany({ where: { requirementId: id } });
    if (docs.length > 0) {
      return NextResponse.json(
        { error: `Tidak dapat menghapus syarat ini karena masih ada ${docs.length} berkas terkait. Hapus pendaftar terkait terlebih dahulu.` },
        { status: 400 }
      );
    }
    await db.ppdbRequirement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
