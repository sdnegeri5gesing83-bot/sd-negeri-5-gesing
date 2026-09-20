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
  Calendar,
  Megaphone,
  Palette,
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
import { ThemeSwitcher } from '@/components/site/theme-switcher';
import { useTheme, THEMES } from '@/lib/theme-store';

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

const PPDB_SUB_ITEMS = [
  { label: 'Jadwal PPDB', tab: 'jadwal' as const, icon: Calendar },
  { label: 'Pengumuman Penerimaan', tab: 'pengumuman' as const, icon: Megaphone },
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
        'sticky top-0 z-50 w-full transition-all duration-300 bg-gradient-to-b from-[#0a0f1e] to-[#0d1424] border-b border-electric/20',
        scrolled && 'shadow-[0_4px_30px_oklch(0.55_0.22_255/0.15)]'
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
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain rounded-full bg-white shadow-[0_0_15px_oklch(0.55_0.22_255/0.3)] ring-1 ring-cyan-500/30 group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-base lg:text-lg font-bold text-white tracking-tight" style={{textShadow:'0 0 12px oklch(0.55 0.22 255 / 0.5)'}}>
                SD Negeri 5 Gesing
              </p>
              <p className="text-[11px] lg:text-xs text-cyan-300/70 font-medium">
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
                      ? 'text-cyan-300'
                      : 'text-white/60 hover:text-cyan-300'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {/* Elegant underline indicator */}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300',
                      active
                        ? 'w-[70%] opacity-100'
                        : 'w-0 opacity-0 group-hover/nav:w-[50%] group-hover/nav:opacity-70'
                    )}
                  />
                </button>
              );
            })}
            {/* PPDB dropdown with sub-navigation */}
            <div className="relative group/ppdb">
              <button
                onClick={() => go('ppdb')}
                className={cn(
                  'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
                  page === 'ppdb'
                    ? 'text-cyan-300'
                    : 'text-white/60 hover:text-cyan-300'
                )}
              >
                <GraduationCap className="h-4 w-4" />
                PPDB
                <svg className="h-3 w-3 ml-0.5" viewBox="0 0 20 20" fill="currentColor"><path d="M5.293 7.293a1 1 0 010 1.414L10 13.414l4.707-4.707a1 1 0 01-1.414-1.414L10 10.586 6.707 7.293a1 1 0 00-1.414 0z"/></svg>
                {page === 'ppdb' && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2.5px] w-[70%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                )}
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-1 w-56 opacity-0 invisible group-hover/ppdb:opacity-100 group-hover/ppdb:visible transition-all duration-200 z-50">
                <div className="rounded-xl bg-[#0d1424] border border-cyan-500/20 shadow-xl overflow-hidden p-1.5">
                  {PPDB_SUB_ITEMS.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <button
                        key={sub.tab}
                        onClick={() => { go('ppdb'); setPpdbTab(sub.tab); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all"
                      >
                        <SubIcon className="h-4 w-4 text-cyan-400/70" />
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* Right: theme + calendar + admin button — with elegant left separator */}
          <div className="hidden lg:flex items-center gap-2 lg:pl-6 lg:ml-2 lg:border-l border-white/20">
            <ThemeSwitcher />
            <NavbarCalendar />
            <Button
              size="sm"
              variant={session?.user ? 'default' : 'outline'}
              onClick={() => go('admin')}
              className={
                session?.user
                  ? 'bg-cyan-500 text-[#0a0f1e] hover:bg-cyan-400 font-semibold shadow-[0_0_15px_oklch(0.75_0.15_195/0.4)]'
                  : 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10'
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
                  {/* PPDB with sub-items in mobile menu */}
                  <SheetClose asChild>
                    <button
                      onClick={() => go('ppdb')}
                      className={cn(
                        'w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-all relative',
                        page === 'ppdb'
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground/80 hover:bg-teal-soft/60'
                      )}
                    >
                      {page === 'ppdb' && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-gold" />
                      )}
                      <GraduationCap className="h-5 w-5" />
                      PPDB
                    </button>
                  </SheetClose>
                  {/* PPDB sub-items */}
                  <div className="ml-4 pl-4 border-l border-border space-y-0.5">
                    {PPDB_SUB_ITEMS.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <SheetClose asChild key={sub.tab}>
                          <button
                            onClick={() => { go('ppdb'); setPpdbTab(sub.tab); }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-teal-soft/60 transition-all"
                          >
                            <SubIcon className="h-4 w-4" />
                            {sub.label}
                          </button>
                        </SheetClose>
                      );
                    })}
                  </div>
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
                {/* Theme switcher for mobile */}
                <div className="px-4 py-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Palette className="h-3.5 w-3.5" />
                    Tema Warna
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.key}
                        onClick={() => { setTheme(theme.key); }}
                        className={cn(
                          'flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all',
                          useTheme.getState().current === theme.key ? 'border-primary' : 'border-border'
                        )}
                      >
                        <div className="flex -space-x-1.5">
                          <div className="h-5 w-5 rounded-full ring-1 ring-border" style={{ backgroundColor: theme.colors.bg }} />
                          <div className="h-5 w-5 rounded-full ring-1 ring-border" style={{ backgroundColor: theme.colors.primary }} />
                        </div>
                        <span className="text-[9px] font-medium text-foreground">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Elegant gold gradient bottom line */}
      <div
        className={cn(
          'h-[3px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transition-opacity duration-300',
          scrolled ? 'opacity-100' : 'opacity-70'
        )}
      />
    </header>
  );
}
