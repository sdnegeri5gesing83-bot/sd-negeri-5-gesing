'use client';

import { cn } from '@/lib/utils';

interface PrismProps {
  className?: string;
  size?: number;
  color?: 'gold' | 'blue' | 'white';
  rotate?: number;
  opacity?: number;
  pulse?: boolean;
}

/**
 * Futuristic transparent hexagonal prism decoration.
 * Uses SVG with glassmorphism-like transparency and gradient strokes.
 */
export function HexPrism({
  className,
  size = 80,
  color = 'gold',
  rotate = 0,
  opacity = 0.3,
  pulse = false,
}: PrismProps) {
  const colorMap = {
    gold: { stroke: '#fbbf24', fill1: 'rgba(251,191,36,0.08)', fill2: 'rgba(251,191,36,0.02)', glow: 'rgba(251,191,36,0.15)' },
    blue: { stroke: '#60a5fa', fill1: 'rgba(96,165,250,0.08)', fill2: 'rgba(96,165,250,0.02)', glow: 'rgba(96,165,250,0.15)' },
    white: { stroke: '#ffffff', fill1: 'rgba(255,255,255,0.06)', fill2: 'rgba(255,255,255,0.01)', glow: 'rgba(255,255,255,0.1)' },
  };
  const c = colorMap[color];

  return (
    <div
      className={cn('pointer-events-none absolute', pulse && 'animate-pulse', className)}
      style={{ width: size, height: size, opacity, transform: `rotate(${rotate}deg)` }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: c.glow, transform: 'scale(1.5)' }}
        aria-hidden
      />
      <svg viewBox="0 0 100 100" fill="none" className="relative h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`grad-${color}-${size}-${rotate}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.stroke} stopOpacity="0.4" />
            <stop offset="50%" stopColor={c.stroke} stopOpacity="0.15" />
            <stop offset="100%" stopColor={c.stroke} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Outer hexagon */}
        <polygon
          points="50,5 88,27 88,73 50,95 12,73 12,27"
          fill={c.fill1}
          stroke={`url(#grad-${color}-${size}-${rotate})`}
          strokeWidth="1.5"
        />
        {/* Inner hexagon (3D prism effect) */}
        <polygon
          points="50,20 73,33 73,67 50,80 27,67 27,33"
          fill={c.fill2}
          stroke={c.stroke}
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />
        {/* Prism facet lines (3D depth) */}
        <line x1="50" y1="5" x2="50" y2="20" stroke={c.stroke} strokeWidth="0.6" strokeOpacity="0.3" />
        <line x1="88" y1="27" x2="73" y2="33" stroke={c.stroke} strokeWidth="0.6" strokeOpacity="0.3" />
        <line x1="88" y1="73" x2="73" y2="67" stroke={c.stroke} strokeWidth="0.6" strokeOpacity="0.3" />
        <line x1="50" y1="95" x2="50" y2="80" stroke={c.stroke} strokeWidth="0.6" strokeOpacity="0.3" />
        <line x1="12" y1="73" x2="27" y2="67" stroke={c.stroke} strokeWidth="0.6" strokeOpacity="0.3" />
        <line x1="12" y1="27" x2="27" y2="33" stroke={c.stroke} strokeWidth="0.6" strokeOpacity="0.3" />
        {/* Center dot */}
        <circle cx="50" cy="50" r="2" fill={c.stroke} fillOpacity="0.5" />
      </svg>
    </div>
  );
}

/**
 * Simple transparent glow orb (kept for compatibility).
 */
export function GlowOrb({
  className,
  size = 80,
  color = 'gold',
}: {
  className?: string;
  size?: number;
  color?: 'gold' | 'blue' | 'white';
}) {
  const colorMap = {
    gold: 'rgba(251, 191, 36, 0.12)',
    blue: 'rgba(96, 165, 250, 0.12)',
    white: 'rgba(255, 255, 255, 0.08)',
  };
  return (
    <div
      className={cn('pointer-events-none absolute rounded-full blur-2xl', className)}
      style={{ width: size, height: size, backgroundColor: colorMap[color] }}
      aria-hidden
    />
  );
}
