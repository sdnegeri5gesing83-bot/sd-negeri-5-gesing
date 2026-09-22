import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const students = await db.student.findMany({
      where: { status: 'Aktif' },
      select: { id: true, name: true, gender: true, className: true, academicYear: true, status: true, nis: true, nisn: true, birthDate: true },
      orderBy: [{ className: 'asc' }, { name: 'asc' }],
    });
    return NextResponse.json(students);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
