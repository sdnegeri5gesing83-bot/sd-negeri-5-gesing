'use client';

import { create } from 'zustand';

export type PageKey =
  | 'beranda'
  | 'profil'
  | 'gtk'
  | 'siswa'
  | 'sarpras'
  | 'galeri'
  | 'ppdb'
  | 'kontak'
  | 'admin';

interface NavState {
  page: PageKey;
  setPage: (p: PageKey) => void;
  // PPDB sub-tab
  ppdbTab: 'jadwal' | 'pengumuman';
  setPpdbTab: (t: 'jadwal' | 'pengumuman') => void;
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
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  ppdbTab: 'jadwal',
  setPpdbTab: (ppdbTab) => set({ ppdbTab }),
  adminView: 'login',
  setAdminView: (adminView) => set({ adminView }),
  newsId: null,
  setNewsId: (newsId) => set({ newsId }),
}));
