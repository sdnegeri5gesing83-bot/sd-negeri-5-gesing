'use client';

import { useState, useEffect } from 'react';
import { useNav, type PageKey } from '@/lib/nav-store';
import { useFetch } from '@/hooks/use-fetch';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  ArrowRight,
  Send,
} from 'lucide-react';
import type { SchoolProfile } from '@/lib/types';

interface FooterLink {
  key: PageKey;
  label: string;
}

const NAV: FooterLink[] = [
  { key: 'beranda', label: 'Beranda' },
  { key: 'profil', label: 'Profil' },
  { key: 'gtk', label: 'Guru & Tenaga Kependidikan' },
  { key: 'siswa', label: 'Data Siswa' },
  { key: 'sarpras', label: 'Sarana & Prasarana' },
  { key: 'galeri', label: 'Galeri' },
  { key: 'ppdb', label: 'PPDB' },
  { key: 'kontak', label: 'Kontak' },
];

export function Footer() {
  const { setPage } = useNav();
  const { data: profile } = useFetch<SchoolProfile>('/api/public/profile');

  const name = profile?.name || 'SD Negeri 5 Gesing';
  const address = profile?.address || 'Dinas Banjar Waru, Desa Gesing';
  const village = profile?.village || 'Gesing';
  const district = profile?.district || 'Banjar';
  const regency = profile?.regency || 'Buleleng';
  const province = profile?.province || 'Bali';
  const phone = profile?.phone || '';
  const email = profile?.email || '';
  const whatsapp = profile?.whatsapp || '';

  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-school.png"
                alt="Logo SDN 5 Gesing"
                className="h-12 w-12 object-contain rounded-full bg-white p-1"
              />
              <div>
                <p className="font-bold text-lg leading-tight">{name}</p>
                <p className="text-xs opacity-80">{regency}, {province}</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Pusat informasi resmi {name}. Membentuk Insan yang Bertaqwa, cerdas, serta peduli sesama.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {profile?.facebook && (
                <a
                  href={`https://facebook.com/${profile.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {profile?.instagram && (
                <a
                  href={`https://instagram.com/${profile.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {profile?.youtube && (
                <a
                  href={profile.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gold" />
              Alamat
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {address}
              <br />
              Desa {village}, Kecamatan {district}
              <br />
              Kabupaten {regency}, Provinsi {province}
              <br />
              {profile?.postalCode ? `Kode Pos ${profile.postalCode}` : ''}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-gold" />
              Kontak
            </h3>
            <ul className="space-y-2.5 text-sm opacity-90">
              {phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 opacity-80" />
                  <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 opacity-80" />
                  <a href={`mailto:${email}`} className="hover:underline break-all">{email}</a>
                </li>
              )}
              {whatsapp && (
                <li className="flex items-center gap-2">
                  <Send className="h-4 w-4 shrink-0 opacity-80" />
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="hover:underline">
                    +{whatsapp}
                  </a>
                </li>
              )}
              {profile?.serviceHours && (
                <li className="flex items-start gap-2 pt-1">
                  <Clock className="h-4 w-4 shrink-0 opacity-80 mt-0.5" />
                  <span className="whitespace-pre-line">{profile.serviceHours}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-base mb-4">Navigasi</h3>
            <ul className="space-y-1.5 text-sm">
              {NAV.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setPage(item.key)}
                    className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-gold transition-colors"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs opacity-80 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {name}. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs opacity-70">
            Dibuat dengan dedikasi untuk pendidikan di Bali.
          </p>
        </div>
      </div>
    </footer>
  );
}
