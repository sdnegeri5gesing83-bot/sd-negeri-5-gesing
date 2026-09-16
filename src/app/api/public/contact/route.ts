import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const schema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  subject: z.string().min(2, 'Subjek minimal 2 karakter'),
  message: z.string().min(5, 'Pesan minimal 5 karakter'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Validasi gagal' },
        { status: 400 }
      );
    }
    const msg = await db.contactMessage.create({ data: parsed.data });
    return NextResponse.json({ success: true, id: msg.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
