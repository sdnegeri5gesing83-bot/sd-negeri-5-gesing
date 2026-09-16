'use client';

import { useState, useMemo } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { SectionHeader, Loader, EmptyState } from '@/components/site/ui';
import { SmartImage } from '@/components/smart-image';
import { Search, Package, CheckCircle2, AlertTriangle, XCircle, MapPin } from 'lucide-react';
import type { Facility } from '@/lib/types';
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
import { cn } from '@/lib/utils';

const CONDITION_STYLES: Record<string, { cls: string; Icon: React.ComponentType<{ className?: string }> }> = {
  Baik: { cls: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30', Icon: CheckCircle2 },
  'Rusak Ringan': { cls: 'bg-amber-500/15 text-amber-700 border-amber-500/30', Icon: AlertTriangle },
  'Rusak Berat': { cls: 'bg-rose-500/15 text-rose-700 border-rose-500/30', Icon: XCircle },
};

export function SarprasSection() {
  const { data: facilities, loading, error } = useFetch<Facility[]>('/api/public/facilities');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    (facilities || []).forEach((f) => set.add(f.category));
    return ['all', ...Array.from(set)];
  }, [facilities]);

  const filtered = useMemo(() => {
    if (!facilities) return [];
    const q = search.toLowerCase().trim();
    return facilities.filter((f) => {
      const okCat = category === 'all' || f.category === category;
      const okSearch = !q || f.name.toLowerCase().includes(q) || (f.description || '').toLowerCase().includes(q);
      return okCat && okSearch;
    });
  }, [facilities, search, category]);

  // group by category
  const grouped = useMemo(() => {
    const map = new Map<string, Facility[]>();
    filtered.forEach((f) => {
      const arr = map.get(f.category) || [];
      arr.push(f);
      map.set(f.category, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl hero-gradient text-white mb-10">
          <div className="relative px-6 py-10 lg:px-12 lg:py-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] bg-white/15 px-3 py-1 rounded-full mb-3">
              Sarana & Prasarana
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Sarana & Prasarana Sekolah
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl">
              Fasilitas yang tersedia di SD Negeri 5 Gesing untuk menunjang kegiatan
              pembelajaran dan kenyamanan siswa.
            </p>
          </div>
        </div>

        {/* Summary */}
        {facilities && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 mb-8">
            <StatBox label="Total Kategori" value={categories.length - 1} />
            <StatBox label="Total Fasilitas" value={facilities.length} />
            <StatBox label="Kondisi Baik" value={facilities.filter((f) => f.condition === 'Baik').length} />
            <StatBox label="Perlu Perawatan" value={facilities.filter((f) => f.condition !== 'Baik').length} />
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-card border border-border rounded-2xl p-4 lg:p-5 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau deskripsi fasilitas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-56">
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
        </div>

        {loading ? (
          <Loader label="Memuat data fasilitas..." />
        ) : error ? (
          <EmptyState title="Gagal memuat data" description={error} />
        ) : grouped.length === 0 ? (
          <EmptyState title="Tidak ada fasilitas" description="Coba ubah kata kunci pencarian." />
        ) : (
          <div className="space-y-10">
            {grouped.map(([cat, items]) => (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{cat}</h2>
                    <p className="text-xs text-muted-foreground">{items.length} fasilitas</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((f) => {
                    const cs = CONDITION_STYLES[f.condition] || CONDITION_STYLES['Baik'];
                    const CondIcon = cs.Icon;
                    return (
                      <Card
                        key={f.id}
                        className="group overflow-hidden border-border shadow-sm hover:shadow-lg transition-all flex flex-col"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-teal-soft/40">
                          <SmartImage
                            src={f.photo}
                            alt={f.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge
                            className={cn('absolute top-2 right-2 border text-[10px]', cs.cls)}
                          >
                            <CondIcon className="h-3 w-3" />
                            {f.condition}
                          </Badge>
                        </div>
                        <CardContent className="p-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-sm text-foreground leading-snug">
                              {f.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                            <Package className="h-3.5 w-3.5" />
                            <span>Jumlah: <span className="font-semibold text-foreground">{f.quantity}</span></span>
                          </div>
                          {f.description && (
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed flex-1">
                              {f.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
      <p className="text-2xl lg:text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
    </div>
  );
}
