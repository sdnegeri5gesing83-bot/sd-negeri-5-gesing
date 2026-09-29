import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const childName = (formData.get('childName') as string | null)?.trim();
    const birthPlace = (formData.get('birthPlace') as string | null)?.trim() || null;
    const birthDate = (formData.get('birthDate') as string | null)?.trim() || null;
    const parentName = (formData.get('parentName') as string | null)?.trim();
    const parentPhone = (formData.get('parentPhone') as string | null)?.trim();
    const parentEmail = (formData.get('parentEmail') as string | null)?.trim() || null;
    const address = (formData.get('address') as string | null)?.trim() || null;
    const notes = (formData.get('notes') as string | null)?.trim() || null;

    // Validate required text fields
    if (!childName || !parentName || !parentPhone) {
      return NextResponse.json(
        { error: 'Nama calon siswa, nama orang tua/wali, dan nomor telepon wajib diisi.' },
        { status: 400 }
      );
    }

    // Fetch all requirements to validate uploads
    const requirements = await db.ppdbRequirement.findMany({
      orderBy: { order: 'asc' },
    });

    // Collect files keyed by requirementId
    const fileEntries: { requirementId: string; file: File }[] = [];
    for (const req of requirements) {
      if (!req.allowUpload) continue;
      const file = formData.get(`req_${req.id}`) as File | null;
      if (file && file.size > 0) {
        fileEntries.push({ requirementId: req.id, file });
      } else if (req.required) {
        return NextResponse.json(
          { error: `Berkas wajib diunggah: ${req.title}` },
          { status: 400 }
        );
      }
    }

    // Validate each file
    for (const { file, requirementId } of fileEntries) {
      if (file.size > MAX_FILE_SIZE) {
        const req = requirements.find((r) => r.id === requirementId);
        return NextResponse.json(
          { error: `Ukuran file "${file.name}" melebihi batas 5MB (untuk: ${req?.title}).` },
          { status: 400 }
        );
      }
      if (file.type && !ACCEPTED_TYPES.includes(file.type)) {
        const req = requirements.find((r) => r.id === requirementId);
        return NextResponse.json(
          { error: `Tipe file "${file.name}" tidak didukung (untuk: ${req?.title}). Hanya JPG, PNG, WebP, atau PDF.` },
          { status: 400 }
        );
      }
    }

    // Create registration + files + documents in a transaction
    const registration = await db.$transaction(async (tx) => {
      const reg = await tx.ppdbRegistration.create({
        data: {
          childName,
          birthPlace,
          birthDate,
          parentName,
          parentPhone,
          parentEmail,
          address,
          notes,
          status: 'pending',
        },
      });

      for (const { requirementId, file } of fileEntries) {
        const buf = Buffer.from(await file.arrayBuffer());
        const base64 = buf.toString('base64');
        const upload = await tx.fileUpload.create({
          data: {
            data: base64,
            contentType: file.type || 'application/octet-stream',
            filename: file.name,
            size: file.size,
          },
        });
        await tx.ppdbDocument.create({
          data: {
            registrationId: reg.id,
            requirementId,
            fileName: file.name,
            fileId: upload.id,
            fileType: file.type || 'application/octet-stream',
            fileSize: file.size,
          },
        });
      }

      return reg;
    });

    return NextResponse.json(
      { id: registration.id, message: 'Pendaftaran berhasil dikirim.' },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Gagal memproses pendaftaran' }, { status: 500 });
  }
}
