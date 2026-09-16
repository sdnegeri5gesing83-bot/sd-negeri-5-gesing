'use client';

import { useSession } from 'next-auth/react';
import { useNav } from '@/lib/nav-store';
import { AdminLogin } from './admin-login';
import { AdminDashboard } from './admin-dashboard';
import { Loader2 } from 'lucide-react';

export function AdminWrapper() {
  const { data: session, status } = useSession();
  const { setPage } = useNav();

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Memuat sesi admin...</p>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
