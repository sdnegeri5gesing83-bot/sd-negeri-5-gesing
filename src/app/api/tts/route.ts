import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_CHARS = 1024;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const text: string | undefined = body?.text;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { error: 'Teks tidak boleh kosong' },
        { status: 400 }
      );
    }

    if (text.length > MAX_CHARS) {
      return NextResponse.json(
        { error: `Teks terlalu panjang (maksimal ${MAX_CHARS} karakter)` },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();
    const response = await zai.audio.tts.create({
      input: text,
      voice: 'tongtong', // warm, friendly voice
      speed: 1.0,
      response_format: 'wav',
      stream: false,
    });

    if (!response) {
      return NextResponse.json(
        { error: 'Gagal membuat audio. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    if (!buffer || buffer.length === 0) {
      return NextResponse.json(
        { error: 'Audio yang dihasilkan kosong. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (e: any) {
    console.error('[/api/tts] error:', e?.message || e);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat audio. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}
