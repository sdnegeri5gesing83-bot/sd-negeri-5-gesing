import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const profile = await db.schoolProfile.findFirst();
    if (!profile) {
      return NextResponse.json(
        {
          name: 'SD Negeri 5 Gesing',
          address: 'Dinas Banjar Waru, Desa Gesing',
          village: 'Gesing',
          district: 'Banjar',
          regency: 'Buleleng',
          province: 'Bali',
        },
        { status: 200 }
      );
    }
    return NextResponse.json(profile);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
