import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export async function adminGuard() {
  const session = await requireAdmin();
  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: 'Unauthorized. Silakan login sebagai admin.' },
        { status: 401 }
      ),
    };
  }
  return { ok: true as const, session };
}
