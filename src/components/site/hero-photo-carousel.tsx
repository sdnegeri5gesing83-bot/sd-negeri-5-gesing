'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PHOTOS = [
  { src: '/uploads/hero-signboard.jpg', alt: 'Papan Nama Resmi SD Negeri 5 Gesing' },
  { src: '/uploads/hero-school.jpg', alt: 'Aktivitas Siswa di Lingkungan Sekolah' },
  { src: '/uploads/hero-classroom.jpg', alt: 'Kegiatan Belajar Mengajar di Kelas' },
  { src: '/uploads/header-photo-2.jpg', alt: 'Gedung Sekolah SD Negeri 5 Gesing' },
  { src: '/uploads/header-photo-3.jpg', alt: 'Lingkungan Sekolah dengan Bendera' },
];

const ROTATION_INTERVAL = 4000; // 4 seconds per photo

export function HeroPhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100 progress bar
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % PHOTOS.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
    setProgress(0);
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setProgress(0);
  };

  // Auto-rotate with progress bar
  useEffect(() => {
    if (isPaused) {
      // clear timers when paused
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    // Progress bar tick (updates every 50ms for smooth animation)
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (100 / (ROTATION_INTERVAL / 50)), 100));
    }, 50);
    // Advance to next photo when interval elapses
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PHOTOS.length);
      setProgress(0);
    }, ROTATION_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, next]);

  return (
    <div
      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Stacked photos with crossfade + Ken Burns effect */}
      <div className="absolute inset-0">
        {PHOTOS.map((photo, idx) => (
          <img
            key={idx}
            src={photo.src}
            alt={photo.alt}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out',
              idx === current
                ? 'opacity-100 scale-105'
                : 'opacity-0 scale-100',
              idx === current && !isPaused ? 'hero-ken-burns' : ''
            )}
            draggable={false}
          />
        ))}
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

      {/* Prev/Next arrows (always visible on mobile, hover on desktop) */}
      <button
        onClick={prev}
        aria-label="Foto sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-white/40 hover:scale-110"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Foto berikutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-white/40 hover:scale-110"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Caption (current photo alt text) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
        <p className="text-white text-sm font-medium drop-shadow-lg">
          {PHOTOS[current].alt}
        </p>
      </div>

      {/* Progress bar at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1.5">
        {PHOTOS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Foto ${idx + 1}`}
            className={cn(
              'rounded-full transition-all duration-300',
              idx === current
                ? 'w-5 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            )}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes hero-ken-burns {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.15) translate(-2%, -2%); }
        }
        .hero-ken-burns {
          animation: hero-ken-burns 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
