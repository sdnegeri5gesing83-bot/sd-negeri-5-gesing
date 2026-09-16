'use client';

import { useState } from 'react';
import { useNav } from '@/lib/nav-store';
import { useFetch } from '@/hooks/use-fetch';
import { SectionHeader, Loader, EmptyState } from '@/components/site/ui';
import { SmartImage } from '@/components/smart-image';
import {
  ArrowRight,
  Phone,
  Users,
  GraduationCap,
  School,
  Building2,
  ChevronRight,
  Calendar,
  Megaphone,
  Quote,
  Sparkles,
} from 'lucide-react';
import type {
  SchoolProfile,
  Statistic,
  NewsItem,
  Announcement,
  GalleryItem,
} from '@/lib/types';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  GraduationCap,
  School,
  Building2,
};

export function HomeSection() {
  const { setPage } = useNav();
  const { data: profile } = useFetch<SchoolProfile>('/api/public/profile');
  const { data: stats, loading: statsLoading } = useFetch<Statistic[]>('/api/public/stats');
  const { data: news, loading: newsLoading } = useFetch<NewsItem[]>('/api/public/news?limit=4');
  const { data: announcements } = useFetch<Announcement[]>('/api/public/announcements');
  const { data: gallery } = useFetch<GalleryItem[]>('/api/public/gallery');

  const [openNews, setOpenNews] = useState<NewsItem | null>(null);
  const galleryPreview = (gallery || []).slice(0, 6);
  const announcementsTop = (announcements || []).slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/uploads/hero-school.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-medium mb-5">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Selamat Datang
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                SD Negeri 5 Gesing
              </h1>
              <p className="mt-3 text-base sm:text-lg text-white/85">
                Buleleng, Bali &middot; Akreditasi {profile?.accreditation || 'B'}
              </p>
              <p className="mt-5 text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mewujudkan peserta didik yang beriman, berakhlak mulia, cerdas, terampil,
                dan mandiri serta berbudaya berlandaskan Tri Hita Karana. Mari bersama
                membangun masa depan pendidikan yang bermutu.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => setPage('profil')}
                  className="bg-gold text-primary hover:bg-gold/90 shadow-lg"
                >
                  Lihat Profil
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setPage('kontak')}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Phone className="h-4 w-4" />
                  Hubungi Kami
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <img
                  src="/uploads/hero-school.jpg"
                  alt="Kegiatan sekolah SD Negeri 5 Gesing"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white text-foreground rounded-2xl shadow-xl p-4 w-44">
                <p className="text-3xl font-bold text-primary">84</p>
                <p className="text-xs text-muted-foreground">Siswa Aktif</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENTS BANNER */}
      {announcementsTop.length > 0 && (
        <section className="bg-teal-soft/40 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 shrink-0 text-primary font-semibold text-sm">
                <Megaphone className="h-4 w-4" />
                <span className="hidden sm:inline">Pengumuman:</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-6 text-sm text-foreground/80 overflow-x-auto custom-scroll whitespace-nowrap">
                  {announcementsTop.map((a) => (
                    <span key={a.id} className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gold" />
                      <span className="font-medium">{a.title}</span>
                      <span className="text-muted-foreground">— {format(new Date(a.date), 'd MMM yyyy', { locale: idLocale })}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SAMBUTAN KEPALA SEKOLAH */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-3 bg-teal-soft/60 rounded-full" aria-hidden />
                <SmartImage
                  src={profile?.headmasterPhoto}
                  alt={profile?.headmasterName || 'Kepala Sekolah'}
                  className="relative h-64 w-64 lg:h-72 lg:w-72 rounded-full object-cover shadow-xl ring-4 ring-white"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold text-primary text-xs font-semibold px-4 py-1 rounded-full shadow whitespace-nowrap">
                  Kepala Sekolah
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <SectionHeader
                eyebrow="Sambutan"
                title="Sambutan Kepala Sekolah"
                align="left"
              />
              <div className="relative bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
                <Quote className="absolute -top-3 -left-2 h-10 w-10 text-primary/15" />
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed whitespace-pre-line italic">
                  {profile?.headmasterWelcome || 'Sambutan kepala sekolah sedang dimuat...'}
                </p>
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="font-bold text-foreground text-lg">
                    {profile?.headmasterName || 'Kepala Sekolah'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Kepala SD Negeri 5 Gesing
                    {profile?.headmasterNip ? ` · NIP ${profile.headmasterNip}` : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="py-14 lg:py-20 bg-teal-soft/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Data Sekolah"
            title="Sekilas tentang Sekolah"
            description="Profil singkat SD Negeri 5 Gesing berdasarkan data terkini."
          />
          {statsLoading ? (
            <Loader label="Memuat statistik..." />
          ) : stats && stats.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((s) => {
                const Icon = (s.icon && ICON_MAP[s.icon]) || Users;
                return (
                  <Card
                    key={s.id}
                    className="relative overflow-hidden text-center border-border shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
                    <CardContent className="pt-7 pb-6 px-4">
                      <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7" />
                      </div>
                      <p className="text-3xl lg:text-4xl font-bold text-foreground">
                        {s.value}
                      </p>
                      <p className="mt-1 text-xs lg:text-sm text-muted-foreground font-medium">
                        {s.label}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyState title="Belum ada statistik" description="Statistik akan ditampilkan di sini." />
          )}
        </div>
      </section>

      {/* BERITA + PENGUMUMAN TERBARU */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-primary bg-teal-soft/60 px-3 py-1 rounded-full mb-2">
                Kabar Terkini
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Berita & Pengumuman
              </h2>
            </div>
          </div>

          {newsLoading ? (
            <Loader label="Memuat berita..." />
          ) : news && news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {news.map((n) => (
                <Card
                  key={n.id}
                  className="group overflow-hidden border-border shadow-sm hover:shadow-lg transition-all flex flex-col cursor-pointer"
                  onClick={() => setOpenNews(n)}
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <SmartImage
                      src={n.photo}
                      alt={n.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-2 left-2 bg-primary/95 text-primary-foreground text-[10px]">
                      {n.category}
                    </Badge>
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mb-1.5">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(n.publishedAt), 'd MMMM yyyy', { locale: idLocale })}
                    </p>
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
                      {n.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                      {n.excerpt || n.content.slice(0, 100)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState title="Belum ada berita" />
          )}
        </div>
      </section>

      {/* GALERI PREVIEW */}
      <section className="py-14 lg:py-20 bg-teal-soft/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-primary bg-white px-3 py-1 rounded-full mb-2">
                Dokumentasi
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Galeri Kegiatan Sekolah
              </h2>
            </div>
            <Button variant="outline" onClick={() => setPage('galeri')} className="self-start sm:self-end">
              Lihat Semua
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {galleryPreview.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {galleryPreview.map((g) => (
                <div
                  key={g.id}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-sm cursor-pointer"
                  onClick={() => setPage('galeri')}
                >
                  <SmartImage
                    src={g.photo}
                    alt={g.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <p className="text-white text-xs font-medium line-clamp-2">{g.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Belum ada dokumentasi" />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl hero-gradient text-white px-6 py-12 lg:px-14 lg:py-16 shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20" aria-hidden />
            <div className="absolute -right-4 top-10 h-24 w-24 rounded-full bg-gold/30" aria-hidden />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Bergabunglah dengan keluarga besar SD Negeri 5 Gesing
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl">
                  Jadilah bagian dari sekolah yang ramah anak, berbudaya, dan berkomitmen
                  membentuk generasi cerdas serta berakhlak mulia.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Button
                  size="lg"
                  onClick={() => setPage('kontak')}
                  className="bg-gold text-primary hover:bg-gold/90"
                >
                  <Phone className="h-4 w-4" />
                  Hubungi Kami
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setPage('sarpras')}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Building2 className="h-4 w-4" />
                  Lihat Sarpras
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS DETAIL DIALOG */}
      <Dialog open={!!openNews} onOpenChange={(o) => !o && setOpenNews(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scroll">
          {openNews && (
            <>
              {openNews.photo && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg -mx-1">
                  <SmartImage
                    src={openNews.photo}
                    alt={openNews.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary/95 text-primary-foreground text-[10px]">
                    {openNews.category}
                  </Badge>
                </div>
              )}
              <DialogHeader>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(openNews.publishedAt), 'd MMMM yyyy', { locale: idLocale })}
                </p>
                <DialogTitle className="text-xl sm:text-2xl leading-snug">
                  {openNews.title}
                </DialogTitle>
                {openNews.excerpt && (
                  <DialogDescription className="text-sm">
                    {openNews.excerpt}
                  </DialogDescription>
                )}
              </DialogHeader>
              <div className="prose prose-sm max-w-none text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                {openNews.content}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
