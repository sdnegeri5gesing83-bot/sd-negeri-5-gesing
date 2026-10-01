'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFetch } from '@/hooks/use-fetch';

interface HeroPhoto {
  id: string;
  src: string;
  alt: string;
  order: number;
  active: boolean;
}

// Fallback if API fails or returns empty
const FALLBACK_PHOTOS = [
  { src: '/uploads/hero-signboard.jpg', alt: 'Papan Nama Resmi SD Negeri 5 Gesing' },
  { src: '/uploads/hero-school.jpg', alt: 'Aktivitas Siswa di Lingkungan Sekolah' },
  { src: '/uploads/hero-classroom.jpg', alt: 'Kegiatan Belajar Mengajar di Kelas' },
  { src: '/uploads/header-photo-2.jpg', alt: 'Gedung Sekolah SD Negeri 5 Gesing' },
  { src: '/uploads/header-photo-3.jpg', alt: 'Lingkungan Sekolah dengan Bendera' },
];

const ROTATION_INTERVAL = 4000; // 4 seconds per photo

export function FullWidthHeroCarousel() {
  const { data: apiPhotos } = useFetch<HeroPhoto[]>('/api/public/hero-photos');
  const photos = (apiPhotos && apiPhotos.length > 0)
    ? apiPhotos.map(p => ({ src: p.src, alt: p.alt }))
    : FALLBACK_PHOTOS;

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % Math.max(photos.length, 1));
    setProgress(0);
  }, [photos.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + photos.length) % Math.max(photos.length, 1));
    setProgress(0);
  }, [photos.length]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setProgress(0);
  };

  // Clamp current index to valid range when photos change
  const safeCurrent = photos.length > 0 ? Math.min(current, photos.length - 1) : 0;

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (100 / (ROTATION_INTERVAL / 50)), 100));
    }, 50);
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % photos.length);
      setProgress(0);
    }, ROTATION_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, next]);

  return (
    <div
      className="relative w-full aspect-[16/9] sm:aspect-[16/7] lg:aspect-[21/6] xl:aspect-[21/5] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Stacked photos with crossfade + Ken Burns */}
      <div className="absolute inset-0">
        {photos.map((photo, idx) => (
          <img
            key={idx}
            src={photo.src}
            alt={photo.alt}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out',
              idx === safeCurrent
                ? 'opacity-100 scale-105'
                : 'opacity-0 scale-100',
              idx === safeCurrent && !isPaused ? 'hero-ken-burns-full' : ''
            )}
            draggable={false}
          />
        ))}
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
      {/* Localized dark gradient behind caption (bottom) for guaranteed text readability on any photo */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        aria-label="Foto sebelumnya"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 text-white flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-white/40 hover:scale-110 shadow-lg"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        aria-label="Foto berikutnya"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 text-white flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-white/40 hover:scale-110 shadow-lg"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Caption (bottom-left) */}
      <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 pointer-events-none">
        <span className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white mb-2 text-shadow-soft">
          {safeCurrent + 1} / {photos.length}
        </span>
        <p className="text-white text-base sm:text-lg lg:text-xl font-bold max-w-2xl text-shadow-strong">
          {photos[safeCurrent].alt}
        </p>
      </div>

      {/* Dot indicators (bottom-right) */}
      <div className="absolute bottom-4 right-3 sm:right-6 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Foto ${idx + 1}`}
            className={cn(
              'rounded-full transition-all duration-300',
              idx === safeCurrent
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/60 hover:bg-white/90'
            )}
          />
        ))}
      </div>

      {/* Progress bar at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <style jsx global>{`
        @keyframes hero-ken-burns-full {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.18) translate(-2%, -1%); }
        }
        .hero-ken-burns-full {
          animation: hero-ken-burns-full 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
