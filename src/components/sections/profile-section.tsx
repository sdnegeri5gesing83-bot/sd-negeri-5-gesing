'use client';

import { useFetch } from '@/hooks/use-fetch';
import { SectionHeader, Loader, EmptyState } from '@/components/site/ui';
import { SmartImage } from '@/components/smart-image';
import { useNav } from '@/lib/nav-store';
import {
  MapPin,
  Hash,
  Award,
  Building,
  Home,
  Quote,
  Target,
  Eye,
  Compass,
  Network,
  Phone,
} from 'lucide-react';
import type { SchoolProfile, OrganizationMember } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export function ProfileSection() {
  const { data: profile, loading, error } = useFetch<SchoolProfile>('/api/public/profile');
  const { data: org } = useFetch<OrganizationMember[]>('/api/public/organization');
  const { setPage } = useNav();

  if (loading) return <Loader label="Memuat profil sekolah..." />;
  if (error || !profile) {
    return (
      <EmptyState
        title="Profil belum tersedia"
        description="Profil sekolah sedang disiapkan. Silakan kembali lagi nanti."
      />
    );
  }

  const identityRows: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Nama Sekolah', value: profile.name, icon: Home },
    { label: 'NPSN', value: profile.npsn || '-', icon: Hash },
    { label: 'NSS', value: profile.nss || '-', icon: Hash },
    { label: 'Akreditasi', value: profile.accreditation || '-', icon: Award },
    { label: 'Alamat', value: profile.address, icon: MapPin },
    { label: 'Desa', value: profile.village, icon: MapPin },
    { label: 'Kecamatan', value: profile.district, icon: Building },
    { label: 'Kabupaten', value: profile.regency, icon: Building },
    { label: 'Provinsi', value: profile.province, icon: MapPin },
    { label: 'Kode Pos', value: profile.postalCode || '-', icon: Hash },
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl hero-gradient text-white mb-12">
          <div className="absolute inset-0 opacity-20">
            <img src="/uploads/hero-classroom.jpg" alt="" aria-hidden className="h-full w-full object-cover" />
          </div>
          <div className="relative px-6 py-10 lg:px-12 lg:py-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] bg-white/15 px-3 py-1 rounded-full mb-3">
              Tentang Sekolah
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Profil {profile.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl">
              {profile.address}, Desa {profile.village}, Kecamatan {profile.district}, Kabupaten {profile.regency}, Provinsi {profile.province}.
            </p>
          </div>
        </div>

        {/* Identitas */}
        <SectionHeader
          eyebrow="Identitas Sekolah"
          title="Identitas Sekolah"
          description="Informasi resmi dan administratif SD Negeri 5 Gesing."
          align="left"
        />
        <Card className="border-border shadow-sm mb-14">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {identityRows.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.label}
                    className={`flex items-start gap-3 p-5 ${i % 3 !== 2 ? 'lg:border-r' : ''} ${i % 2 !== 1 ? 'sm:border-r lg:border-r-0' : ''} border-b border-border`}
                  >
                    <div className="h-10 w-10 rounded-lg bg-teal-soft/60 flex items-center justify-center text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">{row.label}</p>
                      <p className="text-sm font-semibold text-foreground break-words">{row.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sejarah */}
        <section className="mb-14">
          <SectionHeader eyebrow="Awal Mula" title="Sejarah Sekolah" align="left" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {profile.history}
              </p>
            </div>
            <div className="lg:col-span-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                <img src="/uploads/hero-school.jpg" alt="Bangunan sekolah" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Sambutan Kepala Sekolah */}
        <section className="mb-14">
          <SectionHeader eyebrow="Sambutan" title="Sambutan Kepala Sekolah" align="left" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-teal-soft/60 rounded-full" aria-hidden />
                <SmartImage
                  src={profile.headmasterPhoto}
                  alt={profile.headmasterName}
                  className="relative h-56 w-56 rounded-full object-cover shadow-xl ring-4 ring-white"
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="relative bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
                <Quote className="absolute -top-3 -left-2 h-10 w-10 text-primary/15" />
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed whitespace-pre-line italic">
                  {profile.headmasterWelcome}
                </p>
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="font-bold text-foreground text-lg">{profile.headmasterName}</p>
                  <p className="text-sm text-muted-foreground">
                    Kepala SD Negeri 5 Gesing{profile.headmasterNip ? ` · NIP ${profile.headmasterNip}` : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi Misi Tujuan */}
        <section className="mb-14">
          <SectionHeader eyebrow="Landasan" title="Visi, Misi & Tujuan" align="left" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="border-primary/20 shadow-sm overflow-hidden">
              <div className="h-1.5 bg-primary" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Visi</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{profile.vision}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 shadow-sm overflow-hidden">
              <div className="h-1.5 bg-gold" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold mb-4">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Misi</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{profile.mission}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 shadow-sm overflow-hidden">
              <div className="h-1.5 bg-primary/70" />
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Tujuan</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{profile.goals}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Struktur Organisasi */}
        <section>
          <SectionHeader
            eyebrow="Organisasi"
            title="Struktur Organisasi"
            description="Susunan kepengurusan dan jabatan di SD Negeri 5 Gesing."
            align="left"
          />
          {org && org.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {org.map((m, i) => (
                <Card
                  key={m.id}
                  className={`text-center border-border shadow-sm hover:shadow-md transition-shadow ${i === 0 ? 'ring-2 ring-gold/40' : ''}`}
                >
                  <CardContent className="pt-6 pb-5 px-4">
                    <div className="mx-auto h-20 w-20 rounded-full bg-teal-soft/60 overflow-hidden ring-2 ring-white shadow-sm mb-3">
                      <SmartImage
                        src={m.photo}
                        alt={m.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-semibold text-sm text-foreground leading-snug">{m.name}</p>
                    <p className="text-xs text-primary font-medium mt-1">{m.position}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState title="Struktur organisasi belum tersedia" />
          )}
        </section>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setPage('kontak')}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            <Phone className="h-4 w-4" />
            Hubungi Sekolah
          </button>
        </div>
      </div>
    </div>
  );
}
