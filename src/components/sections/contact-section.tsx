'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader, EmptyState } from '@/components/site/ui';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { SchoolProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  subject: z.string().min(2, 'Subjek minimal 2 karakter'),
  message: z.string().min(5, 'Pesan minimal 5 karakter'),
});

export function ContactSection() {
  const { data: profile, loading, error } = useFetch<SchoolProfile>('/api/public/profile');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (loading) return <Loader label="Memuat informasi kontak..." />;
  if (error || !profile) {
    return (
      <EmptyState title="Kontak belum tersedia" description="Informasi kontak sedang disiapkan." />
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const newErrors: Record<string, string> = {};
      parsed.error.errors.forEach((er) => {
        newErrors[er.path[0] as string] = er.message;
      });
      setErrors(newErrors);
      toast.error('Periksa kembali isian formulir.');
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Gagal mengirim pesan');
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast.success('Pesan berhasil dikirim! Terima kasih.');
      setTimeout(() => setSuccess(false), 5000);
    } catch (e: any) {
      toast.error(e?.message || 'Gagal mengirim pesan');
    } finally {
      setSubmitting(false);
    }
  };

  const contactCards = [
    { icon: MapPin, title: 'Alamat', value: `${profile.address}, Desa ${profile.village}, Kec. ${profile.district}, Kab. ${profile.regency}, Prov. ${profile.province}${profile.postalCode ? ' ' + profile.postalCode : ''}` },
    profile.phone ? { icon: Phone, title: 'Telepon', value: profile.phone, href: `tel:${profile.phone}` } : null,
    profile.email ? { icon: Mail, title: 'Email', value: profile.email, href: `mailto:${profile.email}` } : null,
    profile.whatsapp ? { icon: MessageCircle, title: 'WhatsApp', value: `+${profile.whatsapp}`, href: `https://wa.me/${profile.whatsapp}` } : null,
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; title: string; value: string; href?: string }[];

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl hero-gradient text-white mb-10">
          <div className="relative px-6 py-10 lg:px-12 lg:py-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] bg-white/15 px-3 py-1 rounded-full mb-3">
              Hubungi Kami
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Kontak & Lokasi Sekolah
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl">
              Silakan hubungi kami untuk pertanyaan, saran, atau informasi lebih lanjut
              seputar SD Negeri 5 Gesing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactCards.map((c, i) => {
              const Icon = c.icon;
              const Wrapper = c.href ? 'a' : 'div';
              return (
                <Card
                  key={i}
                  className="border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    <Wrapper
                      {...(c.href ? { href: c.href, target: c.href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {})}
                      className="flex items-start gap-3"
                    >
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-medium">{c.title}</p>
                        <p className="text-sm font-semibold text-foreground break-words">{c.value}</p>
                      </div>
                    </Wrapper>
                  </CardContent>
                </Card>
              );
            })}

            {/* Service hours */}
            {profile.serviceHours && (
              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">Jam Layanan</p>
                      <p className="text-sm font-semibold text-foreground whitespace-pre-line">{profile.serviceHours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social media */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground font-medium mb-3">Media Sosial</p>
                <div className="flex items-center gap-2">
                  {profile.facebook && (
                    <a href={`https://facebook.com/${profile.facebook}`} target="_blank" rel="noreferrer" aria-label="Facebook" className="h-10 w-10 rounded-xl bg-teal-soft/60 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {profile.instagram && (
                    <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-xl bg-teal-soft/60 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {profile.youtube && (
                    <a href={profile.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="h-10 w-10 rounded-xl bg-teal-soft/60 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Youtube className="h-5 w-5" />
                    </a>
                  )}
                  {profile.whatsapp && (
                    <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-xl bg-teal-soft/60 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                  Kirim Pesan
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Sampaikan pertanyaan, saran, atau aspirasi Anda. Kami akan merespons
                  melalui email.
                </p>

                {success && (
                  <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Pesan berhasil dikirim!</p>
                      <p className="text-xs">Terima kasih telah menghubungi kami. Tim sekolah akan segera menanggapi.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Nama Lengkap <span className="text-destructive">*</span></Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Nama Anda"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@contoh.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="subject">Subjek <span className="text-destructive">*</span></Label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Subjek pesan"
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Pesan <span className="text-destructive">*</span></Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={6}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map */}
        {profile.mapEmbed && (
          <Card className="border-border shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="p-5 border-b border-border">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Lokasi Sekolah
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {profile.address}, Desa {profile.village}, Kecamatan {profile.district}, Kabupaten {profile.regency}, Provinsi {profile.province}
                </p>
              </div>
              <div className="aspect-video w-full bg-muted">
                <iframe
                  src={profile.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta lokasi SD Negeri 5 Gesing"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
