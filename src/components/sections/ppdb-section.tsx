'use client';

import { useState } from 'react';
import { useNav } from '@/lib/nav-store';
import { SectionHeader } from '@/components/site/ui';
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
  GraduationCap,
  MapPin,
  AlertCircle,
  Upload,
  User,
  FileCheck2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { toast } from 'sonner';

interface PpdbSchedule {
  id: string;
  phase: string;
  date: string;
  time: string;
  description?: string | null;
  status: string;
  order: number;
}

interface PpdbAnnouncement {
  id: string;
  title: string;
  content: string;
  photo?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileType?: string | null;
  date: string;
  published: boolean;
  order: number;
}

interface PpdbRequirement {
  id: string;
  title: string;
  description?: string | null;
  required: boolean;
  allowUpload: boolean;
  order: number;
}

const SCHEDULE_ICONS = [FileText, ClipboardList, Megaphone, CheckCircle2, GraduationCap, Users];

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

export function PpdbSection() {
  const { ppdbTab, setPpdbTab, setPage } = useNav();
  const { data: ppdbAnnouncements } = useFetch<PpdbAnnouncement[]>('/api/public/ppdb-announcements');
  const { data: scheduleData, loading: scheduleLoading } = useFetch<PpdbSchedule[]>('/api/public/ppdb');
  const { data: requirementsData } = useFetch<PpdbRequirement[]>('/api/public/ppdb/requirements');

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
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-8 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => setPpdbTab('jadwal')}
            className={cn(
              'px-4 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial',
              ppdbTab === 'jadwal'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary/40'
            )}
          >
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="text-center">Jadwal PPDB</span>
          </button>
          <button
            onClick={() => setPpdbTab('daftar')}
            className={cn(
              'px-4 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial',
              ppdbTab === 'daftar'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary/40'
            )}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span className="text-center">Daftar Online</span>
          </button>
          <button
            onClick={() => setPpdbTab('pengumuman')}
            className={cn(
              'px-4 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial',
              ppdbTab === 'pengumuman'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary/40'
            )}
          >
            <Megaphone className="h-4 w-4 shrink-0" />
            <span className="text-center">Pengumuman Penerimaan</span>
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
                {(scheduleData || []).map((item, i) => {
                  const Icon = SCHEDULE_ICONS[i % SCHEDULE_ICONS.length];
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
                    {(requirementsData || []).length === 0 ? (
                      <div className="col-span-2 text-center text-sm text-muted-foreground py-6">
                        Belum ada daftar persyaratan. Silakan hubungi sekolah.
                      </div>
                    ) : (
                      (requirementsData || []).map((req) => (
                        <div key={req.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm text-foreground font-medium">{req.title}</p>
                              {req.required ? (
                                <Badge className="bg-rose-500/10 text-rose-700 dark:text-rose-400 text-[10px]">Wajib</Badge>
                              ) : (
                                <Badge className="bg-muted text-muted-foreground text-[10px]">Opsional</Badge>
                              )}
                              {!req.allowUpload && (
                                <Badge variant="outline" className="text-[10px]">Tidak perlu upload</Badge>
                              )}
                            </div>
                            {req.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">{req.description}</p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => setPpdbTab('daftar')} size="lg">
                      <FileText className="h-4 w-4" />
                      Daftar Sekarang
                    </Button>
                    <Button onClick={() => setPage('kontak')} variant="outline" size="lg">
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
        ) : ppdbTab === 'daftar' ? (
          <PpdbRegistrationForm requirements={requirementsData || []} />
        ) : (
          <div>
            <SectionHeader
              eyebrow="Hasil Seleksi"
              title="Pengumuman Penerimaan"
              description="Pengumuman hasil seleksi peserta didik baru."
            />

            {ppdbAnnouncements && ppdbAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {ppdbAnnouncements.map((a) => (
                  <Card key={a.id} className="border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    {a.photo && (
                      <div className="aspect-video w-full overflow-hidden">
                        <img src={a.photo} alt={a.title} className="h-full w-full object-cover" />
                      </div>
                    )}
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
                        {a.fileUrl && (
                          <a href={a.fileUrl} download={a.fileName || undefined} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-3 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                            <Download className="h-4 w-4" />
                            Download {a.fileName || 'lampiran'}
                          </a>
                        )}
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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface PpdbRegistrationFormProps {
  requirements: PpdbRequirement[];
}

function PpdbRegistrationForm({ requirements }: PpdbRegistrationFormProps) {
  const [form, setForm] = useState({
    childName: '',
    birthPlace: '',
    birthDate: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    notes: '',
  });
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string } | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.childName || !form.parentName || !form.parentPhone) {
      toast.error('Nama calon siswa, nama orang tua/wali, dan nomor telepon wajib diisi.');
      return;
    }
    // Validate required file uploads
    for (const req of requirements) {
      if (!req.allowUpload) continue;
      if (req.required && !files[req.id]) {
        toast.error(`Berkas wajib diunggah: ${req.title}`);
        return;
      }
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('childName', form.childName);
      fd.append('birthPlace', form.birthPlace);
      fd.append('birthDate', form.birthDate);
      fd.append('parentName', form.parentName);
      fd.append('parentPhone', form.parentPhone);
      fd.append('parentEmail', form.parentEmail);
      fd.append('address', form.address);
      fd.append('notes', form.notes);
      for (const req of requirements) {
        if (!req.allowUpload) continue;
        const f = files[req.id];
        if (f) fd.append(`req_${req.id}`, f);
      }
      const res = await fetch('/api/public/ppdb/register', { method: 'POST', body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || 'Gagal mengirim pendaftaran');
      setSuccess({ id: j.id });
      toast.success('Pendaftaran berhasil dikirim!');
      // Reset form
      setForm({
        childName: '', birthPlace: '', birthDate: '', parentName: '',
        parentPhone: '', parentEmail: '', address: '', notes: '',
      });
      setFiles({});
    } catch (e: any) {
      toast.error(e?.message || 'Gagal mengirim pendaftaran');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div>
        <SectionHeader
          eyebrow="Pendaftaran Online"
          title="Pendaftaran Berhasil!"
          description="Terima kasih, data pendaftaran Anda telah kami terima."
        />
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-9 w-9 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xl text-foreground mb-2">Pendaftaran Diterima</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Nomor pendaftaran Anda adalah:
            </p>
            <p className="mt-2 inline-block px-4 py-2 rounded-lg bg-background border border-border font-mono text-sm font-semibold text-foreground">
              {success.id}
            </p>
            <p className="mt-4 text-xs text-muted-foreground max-w-md mx-auto">
              Simpan nomor pendaftaran ini untuk pertanyaan selanjutnya.
              Silakan tunggu pengumuman hasil seleksi sesuai jadwal yang telah ditentukan.
              Untuk informasi lebih lanjut, hubungi sekolah.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setSuccess(null)} variant="outline">
                <FileText className="h-4 w-4" />
                Daftar Lagi
              </Button>
              <Button onClick={() => window.print()} variant="outline">
                <Download className="h-4 w-4" />
                Cetak Bukti
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Pendaftaran Online"
        title="Formulir Pendaftaran PPDB"
        description="Lengkapi formulir di bawah dan unggah dokumen persyaratan."
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Calon Siswa */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground">Data Calon Siswa</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="childName">Nama Lengkap Calon Siswa <span className="text-destructive">*</span></Label>
                <Input id="childName" value={form.childName} onChange={(e) => set('childName', e.target.value)} placeholder="cth: I Made Anom Sesuari" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="birthPlace">Tempat Lahir</Label>
                <Input id="birthPlace" value={form.birthPlace} onChange={(e) => set('birthPlace', e.target.value)} placeholder="cth: Singaraja" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="birthDate">Tanggal Lahir</Label>
                <Input id="birthDate" type="date" value={form.birthDate} onChange={(e) => set('birthDate', e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Orang Tua/Wali */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground">Data Orang Tua / Wali</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="parentName">Nama Lengkap Orang Tua/Wali <span className="text-destructive">*</span></Label>
                <Input id="parentName" value={form.parentName} onChange={(e) => set('parentName', e.target.value)} placeholder="cth: I Wayan Sesuari" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="parentPhone">Nomor Telepon / WhatsApp <span className="text-destructive">*</span></Label>
                <Input id="parentPhone" type="tel" value={form.parentPhone} onChange={(e) => set('parentPhone', e.target.value)} placeholder="cth: 081234567890" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="parentEmail">Email (opsional)</Label>
                <Input id="parentEmail" type="email" value={form.parentEmail} onChange={(e) => set('parentEmail', e.target.value)} placeholder="cth: nama@email.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Alamat (opsional)</Label>
                <Input id="address" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="cth: Banjar Dinas Waru, Desa Gesing" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="notes">Catatan Tambahan (opsional)</Label>
                <Textarea id="notes" value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3} placeholder="cth: Anak pernah mengikuti PAUD..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Berkas */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground">Unggah Berkas Persyaratan</h3>
            </div>
            <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p>
                Format file: PDF saja. Maksimal 5MB per file.
                Berkas bertanda <Badge className="bg-rose-500/10 text-rose-700 dark:text-rose-400 text-[10px] mx-1">Wajib</Badge>
                harus diunggah untuk dapat mendaftar.
              </p>
            </div>

            <div className="space-y-3">
              {requirements.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Belum ada persyaratan. Silakan hubungi sekolah.
                </p>
              ) : (
                requirements.map((req) => {
              if (!req.allowUpload) {
                return (
                  <div key={req.id} className="p-3 rounded-lg bg-muted/40 border border-dashed border-border flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{req.title}</p>
                      {req.description && <p className="text-xs text-muted-foreground mt-0.5">{req.description}</p>}
                      <p className="text-[11px] text-muted-foreground mt-1 italic">Tidak perlu upload — diselesaikan di sekolah.</p>
                    </div>
                  </div>
                );
              }
              const file = files[req.id];
              return (
                <div key={req.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-foreground">{req.title}</p>
                        {req.required ? (
                          <Badge className="bg-rose-500/10 text-rose-700 dark:text-rose-400 text-[10px]">Wajib</Badge>
                        ) : (
                          <Badge className="bg-muted text-muted-foreground text-[10px]">Opsional</Badge>
                        )}
                      </div>
                      {req.description && <p className="text-xs text-muted-foreground mt-0.5">{req.description}</p>}
                    </div>
                  </div>
                  <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-dashed border-primary/40 hover:bg-primary/5 transition-colors">
                    <Upload className="h-4 w-4 text-primary" />
                    <span className="text-xs text-primary font-medium">
                      {file ? 'Ganti file PDF' : 'Pilih file PDF'}
                    </span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="sr-only"
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setFiles((prev) => ({ ...prev, [req.id]: f }));
                      }}
                    />
                  </label>
                  {file && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="truncate">{file.name}</span>
                      <span className="shrink-0">({formatBytes(file.size)})</span>
                      <button
                        type="button"
                        className="ml-auto text-destructive hover:underline"
                        onClick={() => setFiles((prev) => ({ ...prev, [req.id]: null }))}
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              );
            })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Kirim Pendaftaran
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

