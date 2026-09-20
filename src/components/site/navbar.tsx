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
import { NavbarCalendar } from '@/components/site/navbar-calendar';

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
  { key: 'ppdb', label: 'PPDB', icon: GraduationCap },
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
        'sticky top-0 z-50 w-full transition-all duration-300 bg-gradient-to-b from-[#1e3a5f] to-[#172a4f] shadow-lg',
        scrolled && 'shadow-2xl'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          {/* Logo + name — with elegant right separator */}
          <button
            onClick={() => go('beranda')}
            className="flex items-center gap-3 group shrink-0 lg:pr-6 lg:mr-2 lg:border-r border-white/20"
            aria-label="Beranda SD Negeri 5 Gesing"
          >
            <img
              src="/logo-school.png"
              alt="Logo SD Negeri 5 Gesing"
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain rounded-full bg-white shadow-sm ring-1 ring-border group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-base lg:text-lg font-bold text-white tracking-tight">
                SD Negeri 5 Gesing
              </p>
              <p className="text-[11px] lg:text-xs text-blue-200/80 font-medium">
                Buleleng, Bali
              </p>
            </div>
          </button>

          {/* Desktop nav — elegant underline indicators */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = page === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => go(item.key)}
                  className={cn(
                    'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 group/nav',
                    active
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {/* Elegant underline indicator */}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-300',
                      active
                        ? 'w-[70%] opacity-100'
                        : 'w-0 opacity-0 group-hover/nav:w-[50%] group-hover/nav:opacity-70'
                    )}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right: calendar + admin button — with elegant left separator */}
          <div className="hidden lg:flex items-center gap-2 lg:pl-6 lg:ml-2 lg:border-l border-white/20">
            <NavbarCalendar />
            <Button
              size="sm"
              variant={session?.user ? 'default' : 'outline'}
              onClick={() => go('admin')}
              className={
                session?.user
                  ? 'bg-amber-400 text-[#1e3a5f] hover:bg-amber-300 font-semibold'
                  : 'border-white/40 text-white hover:bg-white/15'
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
                className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/15"
                aria-label="Buka menu"
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 p-5 border-b bg-primary text-primary-foreground relative">
                  <img
                    src="/logo-school.png"
                    alt="Logo"
                    className="h-11 w-11 object-contain rounded-full bg-white p-1"
                  />
                  <div className="leading-tight">
                    <p className="font-bold text-sm">SD Negeri 5 Gesing</p>
                    <p className="text-[11px] opacity-90">Buleleng, Bali</p>
                  </div>
                  {/* Elegant gradient line at bottom of mobile header */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-white/60 to-gold" />
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
                            'w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-all relative',
                            active
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-foreground/80 hover:bg-teal-soft/60'
                          )}
                        >
                          {/* Elegant left accent line for active */}
                          {active && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-gold" />
                          )}
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

      {/* Elegant gold gradient bottom line */}
      <div
        className={cn(
          'h-[3px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent transition-opacity duration-300',
          scrolled ? 'opacity-100' : 'opacity-80'
        )}
      />
    </header>
  );
}
