import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Force runtime to Node.js (we use fs / Buffer-like operations indirectly through SDK)
export const runtime = 'nodejs';
// Disable static optimization; this is a dynamic POST endpoint
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: string;
  content: string;
}

const SYSTEM_PROMPT = `Anda adalah "Asisten PPDB" untuk SD Negeri 5 Gesing, sebuah sekolah dasar negeri yang terletak di Buleleng, Bali, Indonesia.

INFORMASI SEKOLAH:
- Nama: SD Negeri 5 Gesing
- Alamat: Banjar Dinas Waru, Desa Gesing, Kecamatan Banjar, Kabupaten Buleleng, Bali 81152
- Telepon: 08873886384
- WhatsApp: +628873886384
- Email: sdnegeri5gesing83@gmail.com
- Visi: "Terwujudnya Insan yang Bertaqwa, cerdas, serta peduli sesama"

INFORMASI PPDB (Penerimaan Peserta Didik Baru):
Syarat Pendaftaran:
1. Fotokopi Kartu Keluarga (KK)
2. Fotokopi Akta Kelahiran
3. Rapor (untuk transfer)
4. Pas foto ukuran 3x4 (2 lembar)
5. Fotokopi KTP orang tua/wali
6. Mengisi formulir pendaftaran

Jadwal PPDB:
- Pendaftaran: 1 - 30 Juni
- Verifikasi berkas: 1 - 5 Juli
- Pengumuman hasil: 10 Juli
- Daftar ulang: 11 - 15 Juli

ATURAN:
- Jawab selalu dalam Bahasa Indonesia yang sopan, ramah, dan mudah dipahami.
- Anda hanya menjawab pertanyaan seputar PPDB, informasi sekolah (profil, fasilitas, kontak, jadwal), dan hal terkait SD Negeri 5 Gesing.
- Jika ditanya hal di luar konteks sekolah/PPDB, arahkan dengan sopan untuk menghubungi sekolah langsung via telepon/WhatsApp 08873886384 atau email sdnegeri5gesing83@gmail.com.
- Jika tidak yakin jawabannya, sarankan orang tua/wali menghubungi sekolah secara langsung.
- Jawab dengan ringkas, jelas, dan gunakan poin-poin bila perlu.
- Jangan mengarung informasi yang tidak Anda ketahui.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string | undefined = body?.message;
    const history: ChatMessage[] = Array.isArray(body?.history) ? body.history : [];

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Pesan tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Limit message length to avoid abuse
    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Pesan terlalu panjang (maksimal 2000 karakter)' },
        { status: 400 }
      );
    }

    // Keep only the last 20 messages of history to avoid token overflow
    const trimmedHistory = history.slice(-20).filter(
      (m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
    );

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: message },
      ],
      thinking: { type: 'disabled' },
    });

    const responseText: string | undefined =
      completion?.choices?.[0]?.message?.content;

    if (!responseText) {
      return NextResponse.json(
        { error: 'Maaf, saya tidak dapat memberikan respons saat ini. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: responseText });
  } catch (e: any) {
    console.error('[/api/chat] error:', e?.message || e);
    return NextResponse.json(
      {
        error:
          'Maaf, asisten sedang mengalami gangguan. Silakan hubungi sekolah di 08873886384 atau WhatsApp +628873886384.',
      },
      { status: 500 }
    );
  }
}
