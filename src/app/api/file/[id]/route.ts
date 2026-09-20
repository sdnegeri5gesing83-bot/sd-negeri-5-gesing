import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const file = await db.fileUpload.findUnique({ where: { id } });
    if (!file) {
      return new NextResponse('Not found', { status: 404 });
    }
    const buf = Buffer.from(file.data, 'base64');
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': file.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e: any) {
    return new NextResponse('Error', { status: 500 });
  }
}
