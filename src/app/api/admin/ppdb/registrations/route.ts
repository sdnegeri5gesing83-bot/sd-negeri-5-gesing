import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';

export async function GET() {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const items = await db.ppdbRegistration.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        documents: {
          orderBy: { uploadedAt: 'asc' },
        },
      },
    });
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
