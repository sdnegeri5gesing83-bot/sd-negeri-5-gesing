'use client';

import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader } from '@/components/site/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import type { SchoolProfile } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const empty: Partial<SchoolProfile> = {
  name: '',
  npsn: '',
  nss: '',
  accreditation: '',
  address: '',
  village: '',
  district: '',
  regency: '',
  province: '',
  postalCode: '',
  phone: '',
  email: '',
  whatsapp: '',
  facebook: '',
  instagram: '',
  youtube: '',
  logo: '',
  vision: '',
  mission: '',
  goals: '',
  history: '',
  headmasterName: '',
  headmasterPhoto: '',
  headmasterWelcome: '',
  headmasterNip: '',
  mapEmbed: '',
  serviceHours: '',
};

export function ProfilePanel() {
  const { data, loading, refetch } = useFetch<SchoolProfile>('/api/admin/profile');
  const [form, setForm] = useState<Partial<SchoolProfile>>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm({ ...empty, ...data });
  }, [data]);

  const set = (k: keyof SchoolProfile, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Gagal menyimpan');
      toast.success('Profil sekolah berhasil disimpan!');
      refetch();
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menyimpan profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Memuat profil..." />;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profil Sekolah</h1>
          <p className="text-sm text-muted-foreground">Identitas dan informasi resmi sekolah.</p>
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Simpan
            </>
          )}
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader><CardTitle className="text-base">Identitas Sekolah</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nama Sekolah" value={form.name || ''} onChange={(v) => set('name', v)} required />
          <Field label="NPSN" value={form.npsn || ''} onChange={(v) => set('npsn', v)} />
          <Field label="NSS" value={form.nss || ''} onChange={(v) => set('nss', v)} />
          <Field label="Akreditasi" value={form.accreditation || ''} onChange={(v) => set('accreditation', v)} />
          <div className="sm:col-span-2">
            <Field label="Alamat" value={form.address || ''} onChange={(v) => set('address', v)} required />
          </div>
          <Field label="Desa" value={form.village || ''} onChange={(v) => set('village', v)} />
          <Field label="Kecamatan" value={form.district || ''} onChange={(v) => set('district', v)} />
          <Field label="Kabupaten" value={form.regency || ''} onChange={(v) => set('regency', v)} />
          <Field label="Provinsi" value={form.province || ''} onChange={(v) => set('province', v)} />
          <Field label="Kode Pos" value={form.postalCode || ''} onChange={(v) => set('postalCode', v)} />
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader><CardTitle className="text-base">Kontak & Media Sosial</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Telepon" value={form.phone || ''} onChange={(v) => set('phone', v)} />
          <Field label="Email" value={form.email || ''} onChange={(v) => set('email', v)} type="email" />
          <Field label="WhatsApp (format: 628xx)" value={form.whatsapp || ''} onChange={(v) => set('whatsapp', v)} />
          <Field label="Facebook (username)" value={form.facebook || ''} onChange={(v) => set('facebook', v)} />
          <Field label="Instagram (username)" value={form.instagram || ''} onChange={(v) => set('instagram', v)} />
          <Field label="YouTube (URL)" value={form.youtube || ''} onChange={(v) => set('youtube', v)} />
          <div className="sm:col-span-2">
            <Field label="Jam Layanan" value={form.serviceHours || ''} onChange={(v) => set('serviceHours', v)} textarea />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader><CardTitle className="text-base">Logo & Peta</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ImageUpload label="Logo Sekolah" value={form.logo || ''} onChange={(v) => set('logo', v)} />
          <Field label="URL Embed Google Maps" value={form.mapEmbed || ''} onChange={(v) => set('mapEmbed', v)} textarea />
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader><CardTitle className="text-base">Kepala Sekolah</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Kepala Sekolah" value={form.headmasterName || ''} onChange={(v) => set('headmasterName', v)} required />
            <Field label="NIP" value={form.headmasterNip || ''} onChange={(v) => set('headmasterNip', v)} />
          </div>
          <ImageUpload label="Foto Kepala Sekolah" value={form.headmasterPhoto || ''} onChange={(v) => set('headmasterPhoto', v)} />
          <Field label="Sambutan Kepala Sekolah" value={form.headmasterWelcome || ''} onChange={(v) => set('headmasterWelcome', v)} textarea required rows={5} />
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader><CardTitle className="text-base">Sejarah, Visi, Misi & Tujuan</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="Sejarah Sekolah" value={form.history || ''} onChange={(v) => set('history', v)} textarea required rows={5} />
          <Field label="Visi" value={form.vision || ''} onChange={(v) => set('vision', v)} textarea required rows={3} />
          <Field label="Misi (satu per baris)" value={form.mission || ''} onChange={(v) => set('mission', v)} textarea required rows={6} />
          <Field label="Tujuan (satu per baris)" value={form.goals || ''} onChange={(v) => set('goals', v)} textarea required rows={5} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? 'Menyimpan...' : (<><Save className="h-4 w-4" /> Simpan Perubahan</>)}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = 'text',
  textarea,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
      {textarea ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows || 4} required={required} />
      ) : (
        <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      )}
    </div>
  );
}
