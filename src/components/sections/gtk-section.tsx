'use client';

import { useState, useMemo } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { SectionHeader, Loader, EmptyState } from '@/components/site/ui';
import { SmartImage } from '@/components/smart-image';
import { Search, Mail, Phone, BadgeCheck, GraduationCap, Briefcase, User, Calendar } from 'lucide-react';
import type { Teacher } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function GtkSection() {
  const { data: teachers, loading, error } = useFetch<Teacher[]>('/api/public/teachers');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [open, setOpen] = useState<Teacher | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>(['Guru', 'Tenaga Kependidikan']);
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    if (!teachers) return [];
    const q = search.toLowerCase().trim();
    return teachers.filter((t) => {
      const okCat = category === 'all' || t.category === category;
      const okSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.position.toLowerCase().includes(q) ||
        (t.subject || '').toLowerCase().includes(q) ||
        (t.nip || '').toLowerCase().includes(q);
      return okCat && okSearch;
    });
  }, [teachers, search, category]);

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl hero-gradient text-white mb-10">
          <div className="relative px-6 py-10 lg:px-12 lg:py-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] bg-white/15 px-3 py-1 rounded-full mb-3">
              Tim Sekolah
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Guru & Tenaga Kependidikan
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl">
              Para pendidik profesional yang berdedikasi membimbing siswa SD Negeri 5 Gesing.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-card border border-border rounded-2xl p-4 lg:p-5 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, jabatan, bidang, atau NIP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c === 'all' ? 'Semua Kategori' : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari{' '}
            {teachers?.length || 0} GTK
          </p>
        </div>

        {loading ? (
          <Loader label="Memuat data GTK..." />
        ) : error ? (
          <EmptyState title="Gagal memuat data GTK" description={error} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada GTK yang cocok"
            description="Coba ubah kata kunci atau filter pencarian."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((t) => (
              <Card
                key={t.id}
                className="group overflow-hidden border-border shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col"
                onClick={() => setOpen(t)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-teal-soft/40">
                  <SmartImage
                    src={t.photo}
                    alt={t.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge
                    className={`absolute top-2 right-2 text-[10px] ${
                      t.category === 'Guru'
                        ? 'bg-primary/95 text-primary-foreground'
                        : 'bg-gold text-primary'
                    }`}
                  >
                    {t.category === 'Guru' ? 'Guru' : 'Tenaga Kependidikan'}
                  </Badge>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-base text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-xs text-primary font-medium mt-1">{t.position}</p>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {t.subject && (
                      <p className="flex items-center gap-1.5">
                        <Briefcase className="h-3 w-3 shrink-0" />
                        <span className="truncate">{t.subject}</span>
                      </p>
                    )}
                    <p className="flex items-center gap-1.5">
                      <GraduationCap className="h-3 w-3 shrink-0" />
                      <span className="truncate">{t.education}</span>
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Lihat Profil
                      <BadgeCheck className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* DETAIL DIALOG */}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scroll">
          {open && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                  <div className="h-28 w-28 rounded-2xl overflow-hidden bg-teal-soft/60 ring-2 ring-white shadow shrink-0">
                    <SmartImage
                      src={open.photo}
                      alt={open.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <DialogTitle className="text-xl sm:text-2xl leading-snug">
                      {open.name}
                    </DialogTitle>
                    <DialogDescription className="text-primary font-medium mt-1">
                      {open.position}
                    </DialogDescription>
                    <Badge className="mt-2 text-[10px]">
                      {open.category}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-3 mt-4">
                {open.nip && (
                  <Row icon={BadgeCheck} label="NIP" value={open.nip} />
                )}
                {open.nuptk && (
                  <Row icon={BadgeCheck} label="NUPTK" value={open.nuptk} />
                )}
                {open.birthDate && (
                  <Row icon={Calendar} label="Tanggal Lahir" value={format(new Date(open.birthDate), 'd MMMM yyyy', { locale: idLocale })} />
                )}
                <Row icon={GraduationCap} label="Pendidikan Terakhir" value={open.education} />
                {open.subject && (
                  <Row icon={Briefcase} label="Tugas / Bidang" value={open.subject} />
                )}
                {open.phone && (
                  <Row icon={Phone} label="Telepon" value={open.phone} />
                )}
                {open.email && (
                  <Row icon={Mail} label="Email" value={open.email} />
                )}
                {open.bio && (
                  <Row icon={User} label="Profil Singkat" value={open.bio} />
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm font-semibold text-foreground break-words">{value}</p>
      </div>
    </div>
  );
}
