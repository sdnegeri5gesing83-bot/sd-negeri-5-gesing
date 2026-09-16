'use client';

import { useState, useEffect } from 'react';
import { useNav, type PageKey } from '@/lib/nav-store';
import { useSession } from 'next-auth/react';
import {
  Menu,
  X,
  Home,
  Info,
  Users,
  GraduationCap,
  Building2,
  Images,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface NavItem {
  key: PageKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'beranda', label: 'Beranda', icon: Home },
  { key: 'profil', label: 'Profil', icon: Info },
  { key: 'gtk', label: 'GTK', icon: Users },
  { key: 'siswa', label: 'Data Siswa', icon: GraduationCap },
  { key: 'sarpras', label: 'Sarpras', icon: Building2 },
  { key: 'galeri', label: 'Galeri', icon: Images },
  { key: 'kontak', label: 'Kontak', icon: Phone },
];

export function Navbar() {
  const { page, setPage } = useNav();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (p: PageKey) => {
    setPage(p);
    setOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-border shadow-sm'
          : 'bg-background/70 backdrop-blur-sm border-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          {/* Logo + name */}
          <button
            onClick={() => go('beranda')}
            className="flex items-center gap-3 group shrink-0"
            aria-label="Beranda SD Negeri 5 Gesing"
          >
            <img
              src="/logo-school.png"
              alt="Logo SD Negeri 5 Gesing"
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain rounded-full bg-white shadow-sm ring-1 ring-border group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-base lg:text-lg font-bold text-foreground tracking-tight">
                SD Negeri 5 Gesing
              </p>
              <p className="text-[11px] lg:text-xs text-muted-foreground font-medium">
                Buleleng, Bali
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = page === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => go(item.key)}
                  className={cn(
                    'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
                    active
                      ? 'text-primary-foreground bg-primary shadow-sm'
                      : 'text-foreground/80 hover:text-primary hover:bg-teal-soft/60'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: admin button */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              size="sm"
              variant={session?.user ? 'default' : 'outline'}
              onClick={() => go('admin')}
              className={
                session?.user
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                  : 'border-primary/30 text-primary hover:bg-teal-soft/60'
              }
            >
              <ShieldCheck className="h-4 w-4" />
              {session?.user ? 'Dashboard' : 'Admin'}
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-foreground hover:bg-teal-soft/60"
                aria-label="Buka menu"
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 p-5 border-b bg-primary text-primary-foreground">
                  <img
                    src="/logo-school.png"
                    alt="Logo"
                    className="h-11 w-11 object-contain rounded-full bg-white p-1"
                  />
                  <div className="leading-tight">
                    <p className="font-bold text-sm">SD Negeri 5 Gesing</p>
                    <p className="text-[11px] opacity-90">Buleleng, Bali</p>
                  </div>
                </div>
                <nav className="flex-1 overflow-y-auto custom-scroll p-3 space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const active = page === item.key;
                    return (
                      <SheetClose asChild key={item.key}>
                        <button
                          onClick={() => go(item.key)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-all',
                            active
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-foreground/80 hover:bg-teal-soft/60'
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </button>
                      </SheetClose>
                    );
                  })}
                </nav>
                <div className="p-4 border-t">
                  <SheetClose asChild>
                    <Button
                      onClick={() => go('admin')}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      {session?.user ? 'Dashboard Admin' : 'Login Admin'}
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
