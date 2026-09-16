'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useNav } from '@/lib/nav-store';
import {
  LayoutDashboard,
  Info,
  Users,
  GraduationCap,
  Building2,
  Images,
  Newspaper,
  Megaphone,
  Mail,
  BarChart3,
  Network,
  LogOut,
  Menu,
  X,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { ProfilePanel } from './panels/profile-panel';
import { TeachersPanel } from './panels/teachers-panel';
import { StudentsPanel } from './panels/students-panel';
import { FacilitiesPanel } from './panels/facilities-panel';
import { GalleryPanel } from './panels/gallery-panel';
import { NewsPanel } from './panels/news-panel';
import { AnnouncementsPanel } from './panels/announcements-panel';
import { MessagesPanel } from './panels/messages-panel';
import { StatsPanel } from './panels/stats-panel';
import { OrganizationPanel } from './panels/organization-panel';

type Panel =
  | 'overview'
  | 'profile'
  | 'teachers'
  | 'students'
  | 'facilities'
  | 'gallery'
  | 'news'
  | 'announcements'
  | 'messages'
  | 'stats'
  | 'organization';

const NAV: { key: Panel; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
  { key: 'profile', label: 'Profil Sekolah', icon: Info },
  { key: 'teachers', label: 'GTK', icon: Users },
  { key: 'students', label: 'Data Siswa', icon: GraduationCap },
  { key: 'facilities', label: 'Sarpras', icon: Building2 },
  { key: 'gallery', label: 'Galeri', icon: Images },
  { key: 'news', label: 'Berita', icon: Newspaper },
  { key: 'announcements', label: 'Pengumuman', icon: Megaphone },
  { key: 'messages', label: 'Pesan Masuk', icon: Mail },
  { key: 'stats', label: 'Statistik', icon: BarChart3 },
  { key: 'organization', label: 'Struktur Organisasi', icon: Network },
];

export function AdminDashboard() {
  const { data: session } = useSession();
  const { setPage } = useNav();
  const [active, setActive] = useState<Panel>('overview');
  const [open, setOpen] = useState(false);

  const go = (p: Panel) => {
    setActive(p);
    setOpen(false);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card sticky top-20 self-start" style={{ height: 'calc(100vh - 5rem)' }}>
        <div className="p-4 border-b border-border">
          <p className="text-sm font-bold text-foreground truncate">
            {session?.user?.name || 'Admin'}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {session?.user?.email}
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scroll p-3 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground/70 hover:bg-teal-soft/60 hover:text-primary'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <button
            onClick={() => setPage('beranda')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-teal-soft/60 hover:text-primary transition-all"
          >
            <Home className="h-4 w-4" />
            Lihat Website
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed bottom-5 right-5 z-40 lg:hidden rounded-full h-12 w-12 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border bg-primary text-primary-foreground">
              <p className="text-sm font-bold truncate">{session?.user?.name || 'Admin'}</p>
              <p className="text-xs opacity-90 truncate">{session?.user?.email}</p>
            </div>
            <nav className="flex-1 overflow-y-auto custom-scroll p-3 space-y-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <SheetClose asChild key={item.key}>
                    <button
                      onClick={() => go(item.key)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground/70 hover:bg-teal-soft/60'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  </SheetClose>
                );
              })}
            </nav>
            <div className="p-3 border-t border-border space-y-1">
              <SheetClose asChild>
                <button onClick={() => setPage('beranda')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-teal-soft/60">
                  <Home className="h-4 w-4" /> Lihat Website
                </button>
              </SheetClose>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" /> Keluar
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Content */}
      <main className="flex-1 min-w-0 bg-background">
        <div className="p-4 sm:p-6 lg:p-8">
          {active === 'overview' && <OverviewPanel />}
          {active === 'profile' && <ProfilePanel />}
          {active === 'teachers' && <TeachersPanel />}
          {active === 'students' && <StudentsPanel />}
          {active === 'facilities' && <FacilitiesPanel />}
          {active === 'gallery' && <GalleryPanel />}
          {active === 'news' && <NewsPanel />}
          {active === 'announcements' && <AnnouncementsPanel />}
          {active === 'messages' && <MessagesPanel />}
          {active === 'stats' && <StatsPanel />}
          {active === 'organization' && <OrganizationPanel />}
        </div>
      </main>
    </div>
  );
}

function OverviewPanel() {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Selamat datang, {session?.user?.name?.split(' ')[0] || 'Admin'}!</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Kelola seluruh konten website SD Negeri 5 Gesing melalui panel di samping.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {NAV.filter((n) => n.key !== 'overview').map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.key} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-foreground">{n.label}</p>
              <p className="text-xs text-muted-foreground mt-1">Kelola data {n.label.toLowerCase()} melalui menu di samping.</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 rounded-xl border border-accent-foreground/15 bg-accent/30 p-5">
        <h3 className="font-semibold text-accent-foreground flex items-center gap-2">
          <Info className="h-4 w-4" />
          Tips Pengelolaan
        </h3>
        <ul className="mt-2 text-sm text-accent-foreground/80 space-y-1 list-disc list-inside">
          <li>Update profil sekolah secara berkala, terutama visi, misi, dan sambutan kepala sekolah.</li>
          <li>Tambahkan berita dan pengumuman terbaru agar website selalu segar.</li>
          <li>Periksa pesan masuk dari pengunjung secara rutin.</li>
          <li>Data siswa sensitif — kelola dengan hati-hati dan jangan menampilkan data pribadi secara publik.</li>
        </ul>
      </div>
    </div>
  );
}
