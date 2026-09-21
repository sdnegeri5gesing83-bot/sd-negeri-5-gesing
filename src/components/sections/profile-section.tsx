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
  FileText,
  Calendar,
  GraduationCap,
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
    { label: 'Bentuk Pendidikan', value: 'Sekolah Dasar (SD)', icon: GraduationCap },
    { label: 'Status Sekolah', value: 'Negeri', icon: Award },
    { label: 'Alamat', value: profile.address, icon: MapPin },
    { label: 'Desa/Kelurahan', value: profile.village, icon: MapPin },
    { label: 'Kecamatan', value: profile.district, icon: Building },
    { label: 'Kabupaten/Kota', value: profile.regency, icon: Building },
    { label: 'Provinsi', value: profile.province, icon: MapPin },
    { label: 'Kode Pos', value: profile.postalCode || '-', icon: Hash },
    { label: 'SK Pendirian Sekolah', value: '4212/760/Srt.Ket/SD5.GS/VIII/2022', icon: FileText },
    { label: 'Tanggal SK Pendirian', value: '01 Juli 1983', icon: Calendar },
    { label: 'SK Izin Operasional', value: '4212/760/Srt.Ket/SD5.GS/VIII/2022', icon: FileText },
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

        {/* Official Profil Sekolah image */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-border shadow-sm bg-card">
          <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-semibold">Profil Resmi Sekolah</span>
          </div>
          <div className="p-4 sm:p-6 bg-muted/30">
            <img
              src="/uploads/profil-sekolah.png"
              alt="Profil Resmi SD Negeri 5 Gesing - Identitas Sekolah"
              className="w-full h-auto rounded-lg shadow-sm"
              loading="lazy"
            />
          </div>
        </div>

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
                <img src="/uploads/school-signboard.jpg" alt="Papan nama resmi SD Negeri 5 Gesing" className="h-full w-full object-cover" />
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

        {/* Visi Misi Tujuan — Landscape layout */}
        <section className="mb-14">
          <SectionHeader eyebrow="Landasan" title="Visi, Misi & Tujuan" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Visi */}
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm group">
              <div className="absolute inset-0 hero-gradient opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent" />
              <div className="relative p-6 lg:p-8 min-h-[280px] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                    <Eye className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h3 className="font-bold text-xl text-white">Visi</h3>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-sm text-white/90 leading-relaxed italic">{profile.vision}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-cyan-300/60">Landasan Visi</span>
                </div>
              </div>
            </div>

            {/* Misi */}
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f3a] to-[#0f1220]" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent" />
              <div className="relative p-6 lg:p-8 min-h-[280px] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gold/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-gold/20">
                    <Compass className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">Misi</h3>
                </div>
                <div className="flex-1 overflow-y-auto custom-scroll max-h-[180px]">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{profile.mission}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50">
                  <span className="text-[10px] uppercase tracking-widest text-gold/50">Langkah Strategis</span>
                </div>
              </div>
            </div>

            {/* Tujuan */}
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f1a2a] to-[#0a0f1e]" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-transparent" />
              <div className="relative p-6 lg:p-8 min-h-[280px] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-cyan-500/20">
                    <Target className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">Tujuan</h3>
                </div>
                <div className="flex-1 overflow-y-auto custom-scroll max-h-[180px]">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{profile.goals}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50">
                  <span className="text-[10px] uppercase tracking-widest text-cyan-400/50">Sasaran Pendidikan</span>
                </div>
              </div>
            </div>
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
              {org.map((m, i) => {
                const isHead = i === 0;
                const isStaff = m.position.toLowerCase().includes('kependidikan') || m.position.toLowerCase().includes('operator') || m.position.toLowerCase().includes('bendahara');
                const isTeacher = !isHead && !isStaff;
                return (
                  <div
                    key={m.id}
                    className={`relative rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 group ${isHead ? 'border-cyan-500/40' : 'border-border'}`}
                  >
                    {/* Gradient dark background */}
                    {isHead ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b3a] via-[#0a1528] to-[#070d1c]" />
                    ) : isStaff ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#11162a] via-[#0d111e] to-[#090c16]" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1428] via-[#0b0f20] to-[#070a16]" />
                    )}
                    {/* Accent overlay */}
                    {isHead && <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-transparent" />}
                    {isStaff && <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />}
                    {isTeacher && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />}
                    {/* Top accent line */}
                    <div className={`absolute inset-x-0 top-0 h-1 ${isHead ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : isStaff ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-blue-400 to-cyan-400'}`} />

                    <div className="relative p-5 text-center">
                      {/* Photo with glow ring */}
                      <div className="relative mx-auto mb-3">
                        {isHead && (
                          <div className="absolute -inset-2 rounded-full bg-cyan-400/20 blur-md" aria-hidden />
                        )}
                        <div className={`relative h-20 w-20 mx-auto rounded-full overflow-hidden ring-2 ${isHead ? 'ring-cyan-400/50' : isStaff ? 'ring-amber-400/40' : 'ring-blue-400/40'} shadow-lg`}>
                          <SmartImage
                            src={m.photo}
                            alt={m.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <p className="font-semibold text-sm text-white leading-snug">{m.name}</p>
                      <p className={`text-xs font-medium mt-1 ${isHead ? 'text-cyan-300' : isStaff ? 'text-amber-300' : 'text-blue-300'}`}>{m.position}</p>
                    </div>
                  </div>
                );
              })}
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
