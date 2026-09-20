'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { useTheme } from '@/lib/theme-store';

export function Providers({ children }: { children: ReactNode }) {
  const initTheme = useTheme((s) => s.init);
  useEffect(() => {
    initTheme();
  }, [initTheme]);
  return <SessionProvider>{children}</SessionProvider>;
}
