import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { adminGuard } from '@/lib/api-guard';

// Force Node.js runtime (we use fs)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getMimeType(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.bmp')) return 'image/bmp';
  return 'image/jpeg';
}

/**
 * Resolve an image URL into a base64 string + MIME type.
 * Handles two cases:
 *   1. Relative path to public folder (e.g. "/uploads/gallery/news-1.jpg")
 *   2. File stored in DB via "/api/file/{id}"
 */
async function resolveImage(
  imageUrl: string
): Promise<{ base64: string; mimeType: string } | null> {
  if (!imageUrl || typeof imageUrl !== 'string') return null;

  // Case 1: /api/file/{id}
  const fileMatch = imageUrl.match(/^\/api\/file\/(.+)$/);
  if (fileMatch) {
    const fileId = fileMatch[1];
    const file = await db.fileUpload.findUnique({ where: { id: fileId } });
    if (!file) return null;
    return {
      base64: file.data,
      mimeType: file.contentType || 'image/jpeg',
    };
  }

  // Case 2: relative path under /public
  let rel = imageUrl;
  if (rel.startsWith('http://') || rel.startsWith('https://')) {
    // External URL — not supported here (could fetch, but skipped to avoid SSRF)
    return null;
  }
  // Strip query string and hash
  rel = rel.split('?')[0].split('#')[0];
  // Prevent path traversal
  if (rel.includes('..')) return null;
  // Ensure leading slash
  if (!rel.startsWith('/')) rel = '/' + rel;

  const absPath = path.join(PUBLIC_DIR, rel);
  // Ensure resolved path is still under public dir
  if (!absPath.startsWith(PUBLIC_DIR)) return null;

  if (!fs.existsSync(absPath)) return null;

  const buf = fs.readFileSync(absPath);
  return {
    base64: buf.toString('base64'),
    mimeType: getMimeType(rel),
  };
}

export async function POST(req: Request) {
  const guard = await adminGuard();
  if (!guard.ok) return guard.response;

  try {
    const body = await req.json().catch(() => ({}));
    const imageUrl: string | undefined = body?.imageUrl;

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return NextResponse.json(
        { error: 'URL gambar tidak boleh kosong' },
        { status: 400 }
      );
    }

    const resolved = await resolveImage(imageUrl);
    if (!resolved) {
      return NextResponse.json(
        { error: 'File gambar tidak ditemukan di server' },
        { status: 404 }
      );
    }

    let zai;
    try {
      zai = process.env.ZAI_CONFIG ? new ZAI(JSON.parse(process.env.ZAI_CONFIG)) : await ZAI.create();
    } catch {
      zai = await ZAI.create();
    }
    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Deskripsikan gambar ini secara singkat dalam Bahasa Indonesia (maksimal 100 karakter). Tulis HANYA deskripsinya tanpa prefix seperti "Gambar:" atau "Alt text:". Cocok untuk alt text website.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${resolved.mimeType};base64,${resolved.base64}`,
              },
            },
          ],
        },
      ],
      thinking: { type: 'disabled' },
    });

    let altText: string | undefined =
      response?.choices?.[0]?.message?.content;

    if (!altText) {
      return NextResponse.json(
        { error: 'Gagal membuat alt text. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    // Cleanup: trim, remove surrounding quotes, clamp length
    altText = altText.trim().replace(/^["'`]|["'`]$/g, '');
    if (altText.length > 125) {
      altText = altText.slice(0, 122).trimEnd() + '...';
    }

    return NextResponse.json({ altText });
  } catch (e: any) {
    console.error('[/api/admin/generate-alt-text] error:', e?.message || e);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat alt text. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
