import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  npsn: z.string().optional().nullable(),
  nss: z.string().optional().nullable(),
  accreditation: z.string().optional().nullable(),
  address: z.string().min(3),
  village: z.string(),
  district: z.string(),
  regency: z.string(),
  province: z.string(),
  postalCode: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().or(z.literal('')).optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  vision: z.string().min(5),
  mission: z.string().min(5),
  goals: z.string().min(5),
  history: z.string().min(5),
  headmasterName: z.string().min(2),
  headmasterPhoto: z.string().optional().nullable(),
  headmasterWelcome: z.string().min(5),
  headmasterNip: z.string().optional().nullable(),
  mapEmbed: z.string().optional().nullable(),
  serviceHours: z.string().optional().nullable(),
});

export async function GET() {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const profile = await db.schoolProfile.findFirst();
    return NextResponse.json(profile || null);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Validasi gagal' }, { status: 400 });
    }
    const data = parsed.data as any;
    // Convert empty strings to null for optional fields
    ['email', 'npsn', 'nss', 'accreditation', 'postalCode', 'phone', 'whatsapp', 'facebook', 'instagram', 'youtube', 'tiktok', 'logo', 'headmasterPhoto', 'headmasterNip', 'mapEmbed', 'serviceHours'].forEach((k) => {
      if (data[k] === '') data[k] = null;
    });
    const existing = await db.schoolProfile.findFirst();
    let profile;
    if (existing) {
      profile = await db.schoolProfile.update({ where: { id: existing.id }, data });
    } else {
      profile = await db.schoolProfile.create({ data });
    }
    return NextResponse.json(profile);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
