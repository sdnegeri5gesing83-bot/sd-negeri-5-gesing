'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const PHOTOS = [
  { src: '/logo-school.png', alt: 'Logo SD Negeri 5 Gesing', isLogo: true },
  { src: '/uploads/header-photo-1.jpg', alt: 'Papan Nama SD Negeri 5 Gesing', isLogo: false },
  { src: '/uploads/header-photo-2.jpg', alt: 'Gedung Sekolah SD Negeri 5 Gesing', isLogo: false },
  { src: '/uploads/header-photo-3.jpg', alt: 'Lingkungan Sekolah SD Negeri 5 Gesing', isLogo: false },
];

const ROTATION_INTERVAL = 3000; // 3 seconds per photo

interface HeaderPhotoCarouselProps {
  onClick?: () => void;
  className?: string;
}

export function HeaderPhotoCarousel({ onClick, className }: HeaderPhotoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % PHOTOS.length);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Beranda SD Negeri 5 Gesing"
      className={cn(
        'relative group shrink-0',
        'h-10 w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden',
        'bg-white shadow-[0_0_15px_oklch(0.55_0.22_255/0.3)] ring-1 ring-cyan-500/30',
        'group-hover:scale-105 transition-transform',
        className
      )}
    >
      {/* Stacked photos with crossfade */}
      <div className="absolute inset-0">
        {PHOTOS.map((photo, idx) => (
          <img
            key={idx}
            src={photo.src}
            alt={photo.alt}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out',
              idx === current
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105',
              photo.isLogo && 'object-contain p-0.5'
            )}
            draggable={false}
          />
        ))}
      </div>

      {/* Rotating gradient ring indicator (subtle, shows it's animated) */}
      <span
        className={cn(
          'pointer-events-none absolute -inset-0.5 rounded-full',
          'bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-amber-400/0',
          'opacity-60 group-hover:opacity-100 transition-opacity'
        )}
        style={{
          maskImage: 'radial-farthest-side',
          WebkitMaskImage: 'radial-farthest-side',
          animation: 'header-spin 6s linear infinite',
        }}
      />

      {/* Progress dots at bottom (subtle indicator) */}
      <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#0a0f1e]/80 rounded-full px-1 py-0.5 ring-1 ring-white/10">
        {PHOTOS.map((_, idx) => (
          <span
            key={idx}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              idx === current
                ? 'w-3 bg-cyan-300'
                : 'w-1 bg-white/40'
            )}
          />
        ))}
      </span>

      <style jsx global>{`
        @keyframes header-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
