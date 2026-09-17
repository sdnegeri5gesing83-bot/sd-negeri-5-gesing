'use client';

import { cn } from '@/lib/utils';

interface BulbProps {
  className?: string;
  size?: number;
  color?: 'gold' | 'blue' | 'white';
  glow?: boolean;
  pulse?: boolean;
}

/**
 * Decorative light bulb (bohlam) SVG with optional glow and pulse animation.
 * Used as ambient decoration on various sections of the home page.
 */
export function LightBulb({
  className,
  size = 40,
  color = 'gold',
  glow = true,
  pulse = false,
}: BulbProps) {
  const colorMap = {
    gold: { fill: '#fbbf24', glow: 'rgba(251, 191, 36, 0.4)', stroke: '#f59e0b' },
    blue: { fill: '#60a5fa', glow: 'rgba(96, 165, 250, 0.4)', stroke: '#3b82f6' },
    white: { fill: '#ffffff', glow: 'rgba(255, 255, 255, 0.3)', stroke: '#e5e7eb' },
  };
  const c = colorMap[color];

  return (
    <div
      className={cn('pointer-events-none absolute', pulse && 'animate-pulse', className)}
      style={{ width: size, height: size }}
    >
      {/* Glow halo */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: c.glow, transform: 'scale(2)' }}
          aria-hidden
        />
      )}
      {/* Bulb SVG */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="relative h-full w-full"
        aria-hidden
      >
        {/* Light rays */}
        {glow && (
          <g stroke={c.fill} strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
            <line x1="20" y1="2" x2="20" y2="6" />
            <line x1="6" y1="8" x2="9" y2="11" />
            <line x1="34" y1="8" x2="31" y2="11" />
            <line x1="4" y1="20" x2="8" y2="20" />
            <line x1="36" y1="20" x2="32" y2="20" />
          </g>
        )}
        {/* Bulb body */}
        <path
          d="M20 8 C13 8 8 13 8 20 C8 24 10 27 13 29 L13 32 L27 32 L27 29 C30 27 32 24 32 20 C32 13 27 8 20 8 Z"
          fill={c.fill}
          opacity="0.9"
        />
        {/* Bulb highlight */}
        <ellipse cx="16" cy="16" rx="3" ry="4" fill="white" opacity="0.5" />
        {/* Base/screw */}
        <rect x="14" y="32" width="12" height="2" rx="1" fill={c.stroke} />
        <rect x="15" y="34" width="10" height="2" rx="1" fill={c.stroke} opacity="0.8" />
        <rect x="16" y="36" width="8" height="2" rx="1" fill={c.stroke} opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * Glowing orb decoration (simpler than bulb, just a glowing circle).
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
    gold: 'rgba(251, 191, 36, 0.15)',
    blue: 'rgba(96, 165, 250, 0.15)',
    white: 'rgba(255, 255, 255, 0.1)',
  };
  return (
    <div
      className={cn('pointer-events-none absolute rounded-full blur-2xl', className)}
      style={{
        width: size,
        height: size,
        backgroundColor: colorMap[color],
      }}
      aria-hidden
    />
  );
}
