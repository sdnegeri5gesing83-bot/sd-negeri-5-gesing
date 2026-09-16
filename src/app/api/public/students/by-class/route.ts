import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const classes = ['1', '2', '3', '4', '5', '6'];
    const rows = await db.student.groupBy({
      by: ['className', 'gender'],
      where: { status: 'Aktif' },
      _count: { _all: true },
    });
    const result = classes.map((c) => {
      const male = rows.find((r) => r.className === c && r.gender === 'L')?._count._all || 0;
      const female = rows.find((r) => r.className === c && r.gender === 'P')?._count._all || 0;
      return { className: c, male, female, total: male + female };
    });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
