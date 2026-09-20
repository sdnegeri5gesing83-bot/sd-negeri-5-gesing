'use client';

import { useState } from 'react';
import { useNav } from '@/lib/nav-store';
import { SectionHeader, EmptyState } from '@/components/site/ui';
import { useFetch } from '@/hooks/use-fetch';
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  ClipboardList,
  Megaphone,
  Users,
  Phone,
  Download,
  ChevronRight,
  GraduationCap,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Announcement } from '@/lib/types';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

const SCHEDULE = [
  {
    phase: 'Pendaftaran Online',
    date: '1 Juni - 30 Juni 2025',
    time: '08.00 - 14.00 WITA',
    desc: 'Pendaftaran dilakukan secara online melalui website atau datang langsung ke sekolah.',
    icon: FileText,
    status: 'active',
  },
  {
    phase: 'Verifikasi Berkas',
    date: '1 - 5 Juli 2025',
    time: '08.00 - 13.00 WITA',
    desc: 'Verifikasi dokumen: KK, Akta Kelahiran, dan dokumen pendukung lainnya.',
    icon: ClipboardList,
    status: 'upcoming',
  },
  {
    phase: 'Pengumuman Hasil',
    date: '10 Juli 2025',
    time: '09.00 WITA',
    desc: 'Pengumuman hasil seleksi penerimaan peserta didik baru.',
    icon: Megaphone,
    status: 'upcoming',
  },
  {
    phase: 'Daftar Ulang',
    date: '11 - 15 Juli 2025',
    time: '08.00 - 13.00 WITA',
    desc: 'Calon peserta didik yang diterima melakukan daftar ulang di sekolah.',
    icon: CheckCircle2,
    status: 'upcoming',
  },
  {
    phase: 'Pengenalan Lingkungan Sekolah (PLS)',
    date: '16 - 18 Juli 2025',
    time: '07.30 - 11.00 WITA',
    desc: 'Masa pengenalan lingkungan sekolah bagi siswa baru.',
    icon: GraduationCap,
    status: 'upcoming',
  },
  {
    phase: 'Mulai Pembelajaran',
    date: '21 Juli 2025',
    time: '07.30 WITA',
    desc: 'Hari pertama masuk sekolah untuk tahun pelajaran 2025/2026.',
    icon: Users,
    status: 'upcoming',
  },
];

const REQUIREMENTS = [
  'Fotokopi Kartu Keluarga (KK) — 2 lembar',
  'Fotokopi Akta Kelahiran — 2 lembar',
  'Fotokopi rapor (jika ada) — 1 lembar',
  'Pas foto 2x3 dan 3x4 masing-masing 2 lembar',
  'Fotokopi KTP orang tua/wali — 1 lembar',
  'Mengisi formulir pendaftaran (disediakan sekolah)',
];

export function PpdbSection() {
  const { ppdbTab, setPpdbTab, setPage } = useNav();
  const { data: announcements } = useFetch<Announcement[]>('/api/public/announcements');

  // Filter announcements related to PPDB
  const ppdbAnnouncements = (announcements || []).filter(
    (a) =>
      a.title.toLowerCase().includes('ppdb') ||
      a.title.toLowerCase().includes('penerimaan') ||
      a.title.toLowerCase().includes('siswa baru') ||
      a.title.toLowerCase().includes('pendaftar')
  );

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl hero-gradient text-white mb-10">
          <div className="absolute inset-0 opacity-15">
            <img src="/uploads/hero-signboard.jpg" alt="" aria-hidden className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60" />
          <div className="relative px-6 py-10 lg:px-12 lg:py-14 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] bg-white/15 px-3 py-1 rounded-full mb-3">
              Tahun Pelajaran 2025/2026
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              PPDB SD Negeri 5 Gesing
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
              Penerimaan Peserta Didik Baru tahun pelajaran 2025/2026.
              Daftarkan calon siswa Anda dan jadi bagian dari keluarga besar SD Negeri 5 Gesing!
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setPpdbTab('jadwal')}
            className={cn(
              'px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2',
              ppdbTab === 'jadwal'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary/40'
            )}
          >
            <Calendar className="h-4 w-4" />
            Jadwal PPDB
          </button>
          <button
            onClick={() => setPpdbTab('pengumuman')}
            className={cn(
              'px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2',
              ppdbTab === 'pengumuman'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary/40'
            )}
          >
            <Megaphone className="h-4 w-4" />
            Pengumuman Penerimaan
          </button>
        </div>

        {/* Content */}
        {ppdbTab === 'jadwal' ? (
          <div>
            {/* Schedule Timeline */}
            <SectionHeader
              eyebrow="Jadwal Kegiatan"
              title="Jadwal PPDB 2025/2026"
              description="Pantau setiap tahapan penerimaan peserta didik baru."
            />
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              <div className="space-y-6">
                {SCHEDULE.map((item, i) => {
                  const Icon = item.icon;
                  const isLeft = i % 2 === 0;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'relative flex items-start gap-4',
                        'lg:justify-' + (isLeft ? 'start' : 'end')
                      )}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-5 lg:left-1/2 -translate-x-1/2 z-10 mt-1">
                        <div className={cn(
                          'h-10 w-10 rounded-full flex items-center justify-center ring-4 ring-background',
                          item.status === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      {/* Card */}
                      <div className={cn(
                        'ml-16 lg:ml-0 lg:w-[calc(50%-3rem)]',
                        isLeft ? 'lg:mr-auto' : 'lg:ml-auto'
                      )}>
                        <Card className={cn(
                          'border-border shadow-sm hover:shadow-md transition-shadow',
                          item.status === 'active' && 'ring-1 ring-primary/30'
                        )}>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-2 mb-2">
                              {item.status === 'active' && (
                                <Badge className="bg-primary text-primary-foreground text-[10px]">Sedang Berlangsung</Badge>
                              )}
                            </div>
                            <h3 className="font-bold text-foreground text-base">{item.phase}</h3>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-primary font-semibold flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {item.date}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                {item.time}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Requirements */}
            <div className="mt-12">
              <SectionHeader
                eyebrow="Persyaratan"
                title="Syarat Pendaftaran"
                description="Dokumen yang perlu disiapkan untuk mendaftar."
              />
              <Card className="border-border shadow-sm">
                <CardContent className="p-6 lg:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {REQUIREMENTS.map((req, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">{req}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => setPage('kontak')} size="lg">
                      <Phone className="h-4 w-4" />
                      Hubungi Sekolah
                    </Button>
                    <Button onClick={() => setPage('profil')} variant="outline" size="lg">
                      <MapPin className="h-4 w-4" />
                      Lihat Lokasi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div>
            <SectionHeader
              eyebrow="Hasil Seleksi"
              title="Pengumuman Penerimaan"
              description="Pengumuman hasil seleksi peserta didik baru."
            />

            {ppdbAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {ppdbAnnouncements.map((a) => (
                  <Card key={a.id} className="border-border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Megaphone className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(a.date), 'd MMMM yyyy', { locale: idLocale })}
                        </p>
                        <h3 className="font-bold text-foreground">{a.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{a.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-border">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-teal-soft/60 flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">Pengumuman Belum Tersedia</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                    Pengumuman hasil seleksi PPDB akan dipublikasikan pada tanggal 10 Juli 2025.
                    Silakan pantau halaman ini atau hubungi sekolah untuk informasi lebih lanjut.
                  </p>
                  <Button onClick={() => setPage('kontak')} variant="outline" className="mt-4">
                    <Phone className="h-4 w-4" />
                    Hubungi Sekolah
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Info box */}
            <div className="mt-6 flex items-start gap-3 p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Informasi Penting</p>
                <p className="text-xs mt-1">
                  Pengumuman resmi akan dirilis sesuai jadwal yang telah ditetapkan.
                  Pastikan nomor kontak yang didaftarkan aktif untuk menerima informasi.
                  Hasil pengumuman juga dapat ditanyakan langsung di kantor sekolah.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
