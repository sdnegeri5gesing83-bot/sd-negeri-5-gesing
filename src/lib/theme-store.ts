'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeKey = 'light' | 'electric' | 'silver' | 'ice';

export interface ThemeOption {
  key: ThemeKey;
  label: string;
  description: string;
  colors: {
    bg: string;
    card: string;
    primary: string;
    accent: string;
    text: string;
    border: string;
  };
}

export const THEMES: ThemeOption[] = [
  {
    key: 'light',
    label: 'Light',
    description: 'Putih bersih dengan aksen biru',
    colors: {
      bg: 'oklch(0.99 0.003 235)',
      card: 'oklch(1 0 0)',
      primary: 'oklch(0.55 0.14 235)',
      accent: 'oklch(0.95 0.035 235)',
      text: 'oklch(0.18 0.04 235)',
      border: 'oklch(0.9 0.01 235)',
    },
  },
  {
    key: 'electric',
    label: 'Blue Elektrik',
    description: 'Navy gelap + biru elektrik + cyan glow',
    colors: {
      bg: 'oklch(0.08 0.02 250)',
      card: 'oklch(0.12 0.025 250)',
      primary: 'oklch(0.55 0.22 255)',
      accent: 'oklch(0.75 0.15 195)',
      text: 'oklch(0.93 0.02 220)',
      border: 'oklch(0.22 0.03 250)',
    },
  },
  {
    key: 'silver',
    label: 'Silver Blue',
    description: 'Biru-abu gelap dengan aksen silver-blue',
    colors: {
      bg: 'oklch(0.14 0.01 240)',
      card: 'oklch(0.18 0.015 240)',
      primary: 'oklch(0.65 0.08 240)',
      accent: 'oklch(0.82 0.03 240)',
      text: 'oklch(0.9 0.01 240)',
      border: 'oklch(0.28 0.01 240)',
    },
  },
  {
    key: 'ice',
    label: 'Biru Ice',
    description: 'Putih kebiruan dengan aksen ice blue',
    colors: {
      bg: 'oklch(0.97 0.02 230)',
      card: 'oklch(1 0.005 235)',
      primary: 'oklch(0.55 0.14 235)',
      accent: 'oklch(0.88 0.04 230)',
      text: 'oklch(0.2 0.03 230)',
      border: 'oklch(0.85 0.015 230)',
    },
  },
];

function applyTheme(theme: ThemeOption) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--background', theme.colors.bg);
  root.style.setProperty('--foreground', theme.colors.text);
  root.style.setProperty('--card', theme.colors.card);
  root.style.setProperty('--card-foreground', theme.colors.text);
  root.style.setProperty('--popover', theme.colors.card);
  root.style.setProperty('--popover-foreground', theme.colors.text);
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--primary-foreground', theme.colors.bg);
  root.style.setProperty('--secondary', theme.colors.card);
  root.style.setProperty('--secondary-foreground', theme.colors.text);
  root.style.setProperty('--muted', theme.colors.card);
  root.style.setProperty('--muted-foreground', theme.colors.text);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--accent-foreground', theme.colors.text);
  root.style.setProperty('--border', theme.colors.border);
  root.style.setProperty('--input', theme.colors.border);
  root.style.setProperty('--ring', theme.colors.primary);
  root.style.setProperty('--sidebar', theme.colors.bg);
  root.style.setProperty('--sidebar-foreground', theme.colors.text);
  root.style.setProperty('--sidebar-primary', theme.colors.primary);
  root.style.setProperty('--sidebar-primary-foreground', theme.colors.bg);
  root.style.setProperty('--sidebar-accent', theme.colors.card);
  root.style.setProperty('--sidebar-accent-foreground', theme.colors.text);
  root.style.setProperty('--sidebar-border', theme.colors.border);
  root.style.setProperty('--sidebar-ring', theme.colors.primary);
  root.style.setProperty('--teal-soft', theme.colors.accent);
  root.style.setProperty('--gold', theme.colors.accent);

  // Update body background
  document.body.style.backgroundColor = theme.colors.bg;
  document.body.style.color = theme.colors.text;
}

interface ThemeState {
  current: ThemeKey;
  setTheme: (key: ThemeKey) => void;
  init: () => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      current: 'electric',
      setTheme: (key) => {
        const theme = THEMES.find((t) => t.key === key) || THEMES[1];
        applyTheme(theme);
        set({ current: key });
      },
      init: () => {
        const key = get().current;
        const theme = THEMES.find((t) => t.key === key) || THEMES[1];
        applyTheme(theme);
      },
    }),
    { name: 'sdn5-theme' }
  )
);
