import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export async function GET() {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const adminId = (guard.session.user as any).id;
    const admin = await db.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      return NextResponse.json({ error: 'Admin tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      createdAt: admin.createdAt,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

const updateSchema = z.object({
  currentPassword: z.string().min(1, 'Password saat ini wajib diisi'),
  newName: z.string().min(2, 'Nama minimal 2 karakter').optional().or(z.literal('')),
  newEmail: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  newPassword: z.string().min(6, 'Password baru minimal 6 karakter').optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
});

export async function PUT(req: Request) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;
  try {
    const adminId = (guard.session.user as any).id;
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Validasi gagal' },
        { status: 400 }
      );
    }
    const { currentPassword, newName, newEmail, newPassword, confirmPassword } = parsed.data;

    const admin = await db.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      return NextResponse.json({ error: 'Admin tidak ditemukan' }, { status: 404 });
    }

    // Verify current password
    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) {
      return NextResponse.json({ error: 'Password saat ini salah' }, { status: 400 });
    }

    // If new password provided, check confirmation match
    if (newPassword && newPassword.trim() !== '') {
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { error: 'Konfirmasi password baru tidak cocok' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    let changes: string[] = [];

    if (newName && newName.trim() !== '' && newName.trim() !== admin.name) {
      updateData.name = newName.trim();
      changes.push('nama');
    }

    if (newEmail && newEmail.trim() !== '' && newEmail.trim().toLowerCase() !== admin.email) {
      const email = newEmail.trim().toLowerCase();
      // Check uniqueness
      const existing = await db.admin.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: 'Email sudah digunakan oleh admin lain' }, { status: 400 });
      }
      updateData.email = email;
      changes.push('email');
    }

    if (newPassword && newPassword.trim() !== '') {
      updateData.password = await bcrypt.hash(newPassword, 10);
      changes.push('password');
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Tidak ada perubahan. Isi field baru yang ingin diubah.' },
        { status: 400 }
      );
    }

    const updated = await db.admin.update({ where: { id: admin.id }, data: updateData });
    return NextResponse.json({
      success: true,
      message: `Berhasil memperbarui: ${changes.join(', ')}`,
      email: updated.email,
      name: updated.name,
      changedEmail: changes.includes('email'),
      changedPassword: changes.includes('password'),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
