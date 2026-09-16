import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await db.news.findUnique({ where: { id } });
    if (!item || !item.published) {
      return NextResponse.json({ error: 'Berita tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
