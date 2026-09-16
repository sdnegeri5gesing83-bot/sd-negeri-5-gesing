'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader, EmptyState } from '@/components/site/ui';
import { SmartImage } from '@/components/smart-image';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import type { GalleryItem } from '@/lib/types';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function GallerySection() {
  const { data: items, loading, error } = useFetch<GalleryItem[]>('/api/public/gallery');
  const [category, setCategory] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    (items || []).forEach((g) => set.add(g.category));
    return ['all', ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    if (!items) return [];
    return category === 'all' ? items : items.filter((g) => g.category === category);
  }, [items, category]);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, next, prev]);

  const current = lightbox !== null ? filtered[lightbox] : null;

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl hero-gradient text-white mb-10">
          <div className="relative px-6 py-10 lg:px-12 lg:py-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] bg-white/15 px-3 py-1 rounded-full mb-3">
              Dokumentasi
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Galeri Kegiatan Sekolah
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl">
              Dokumentasi visual berbagai kegiatan di SD Negeri 5 Gesing.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                category === c
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary/40'
              )}
            >
              {c === 'all' ? 'Semua' : c}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader label="Memuat galeri..." />
        ) : error ? (
          <EmptyState title="Gagal memuat galeri" description={error} />
        ) : filtered.length === 0 ? (
          <EmptyState title="Belum ada foto" description="Belum ada dokumentasi pada kategori ini." />
        ) : (
          <div className="masonry-grid sm:columns-2 lg:columns-3 xl:columns-4">
            {filtered.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => setLightbox(idx)}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all text-left"
              >
                <SmartImage
                  src={g.photo}
                  alt={g.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <Badge className="self-start bg-gold text-primary text-[10px] mb-1.5">{g.category}</Badge>
                  <p className="text-white font-semibold text-sm leading-snug line-clamp-2">{g.title}</p>
                  <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(g.date), 'd MMM yyyy', { locale: idLocale })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={closeLightbox}
            aria-label="Tutup"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Berikutnya"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
          <div
            className="max-w-5xl w-full max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
              <img
                src={current.photo}
                alt={current.title}
                className="max-w-full max-h-[78vh] object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 text-center text-white max-w-2xl">
              <Badge className="bg-gold text-primary text-[10px] mb-2">{current.category}</Badge>
              <h3 className="text-lg sm:text-xl font-semibold">{current.title}</h3>
              {current.description && (
                <p className="text-sm text-white/80 mt-1.5 leading-relaxed">{current.description}</p>
              )}
              <p className="text-white/60 text-xs mt-2 flex items-center justify-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {format(new Date(current.date), 'd MMMM yyyy', { locale: idLocale })}
                <span className="mx-1">·</span>
                <span className="text-white/80">{(lightbox || 0) + 1} / {filtered.length}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
