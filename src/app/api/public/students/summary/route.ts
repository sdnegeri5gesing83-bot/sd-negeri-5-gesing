import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const [total, male, female] = await Promise.all([
      db.student.count(),
      db.student.count({ where: { gender: 'L' } }),
      db.student.count({ where: { gender: 'P' } }),
    ]);
    return NextResponse.json({ total, male, female });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
