import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const rows = await db.student.groupBy({
      by: ['academicYear', 'gender'],
      _count: { _all: true },
    });
    const years = Array.from(new Set(rows.map((r) => r.academicYear))).sort().reverse();
    const result = years.map((y) => {
      const male = rows.filter((r) => r.academicYear === y && r.gender === 'L').reduce((s, r) => s + r._count._all, 0);
      const female = rows.filter((r) => r.academicYear === y && r.gender === 'P').reduce((s, r) => s + r._count._all, 0);
      return { academicYear: y, male, female, total: male + female };
    });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
