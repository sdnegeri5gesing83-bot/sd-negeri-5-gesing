'use client';

import { useState, useMemo } from 'react';

interface ImgProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: string;
}

// Inline SVG placeholder generator
function placeholder(label: string, color = '#3B82C4'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="${color}22"/>
    <rect x="20" y="20" width="760" height="560" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="12 8" rx="24"/>
    <text x="400" y="290" font-family="Poppins, sans-serif" font-size="32" font-weight="700" fill="${color}" text-anchor="middle">SDN 5 Gesing</text>
    <text x="400" y="335" font-family="Poppins, sans-serif" font-size="20" fill="${color}cc" text-anchor="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function SmartImage({ src, alt, className, fallback }: ImgProps) {
  const initial = useMemo(
    () => (src && src.trim() !== '' ? src : fallback || placeholder(alt)),
    [src, fallback, alt]
  );
  const [errored, setErrored] = useState(false);

  const current = errored ? (fallback || placeholder(alt)) : initial;

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}
