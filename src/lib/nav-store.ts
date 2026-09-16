'use client';

import { create } from 'zustand';

export type PageKey =
  | 'beranda'
  | 'profil'
  | 'gtk'
  | 'siswa'
  | 'sarpras'
  | 'galeri'
  | 'kontak'
  | 'admin';

interface NavState {
  page: PageKey;
  setPage: (p: PageKey) => void;
  // admin sub-state
  adminView: 'login' | 'dashboard';
  setAdminView: (v: 'login' | 'dashboard') => void;
  // optional detail (e.g. news id)
  newsId: string | null;
  setNewsId: (id: string | null) => void;
}

export const useNav = create<NavState>((set) => ({
  page: 'beranda',
  setPage: (p) => {
    set({ page: p });
    // Scroll to top on page change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  adminView: 'login',
  setAdminView: (adminView) => set({ adminView }),
  newsId: null,
  setNewsId: (newsId) => set({ newsId }),
}));
