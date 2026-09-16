'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader, EmptyState } from '@/components/site/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Search, Users, Camera, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Teacher } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const empty: Omit<Teacher, 'id' | 'order'> = {
  name: '',
  photo: '',
  nip: '',
  nuptk: '',
  position: '',
  education: '',
  subject: '',
  category: 'Guru',
  gender: 'L',
  phone: '',
  email: '',
  bio: '',
};

export function TeachersPanel() {
  const { data, loading, error, refetch } = useFetch<Teacher[]>('/api/admin/teachers');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [photoEdit, setPhotoEdit] = useState<Teacher | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoSaving, setPhotoSaving] = useState(false);

  const openPhotoEdit = (t: Teacher) => {
    setPhotoEdit(t);
    setPhotoUrl(t.photo || '');
  };

  const savePhoto = async () => {
    if (!photoEdit) return;
    setPhotoSaving(true);
    try {
      const res = await fetch(`/api/admin/teachers/${photoEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: photoEdit.name,
          photo: photoUrl,
          nip: photoEdit.nip || '',
          nuptk: photoEdit.nuptk || '',
          position: photoEdit.position,
          education: photoEdit.education,
          subject: photoEdit.subject || '',
          category: photoEdit.category,
          gender: photoEdit.gender,
          phone: photoEdit.phone || '',
          email: photoEdit.email || '',
          bio: photoEdit.bio || '',
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success('Foto GTK berhasil diperbarui!');
      setPhotoEdit(null);
      refetch();
    } catch (e: any) {
      toast.error(e?.message);
    } finally {
      setPhotoSaving(false);
    }
  };

  const filtered = (data || []).filter((t) =>
    !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.position.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (t: Teacher) => {
    setEditing(t);
    setForm({ ...empty, ...t });
    setOpen(true);
  };

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.position || !form.education) {
      toast.error('Nama, jabatan, dan pendidikan wajib diisi');
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/teachers/${editing.id}` : '/api/admin/teachers';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Gagal menyimpan');
      toast.success(editing ? 'GTK diperbarui' : 'GTK ditambahkan');
      setOpen(false);
      refetch();
    } catch (e: any) {
      toast.error(e?.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/teachers/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j?.error || 'Gagal menghapus');
      }
      toast.success('GTK dihapus');
      refetch();
    } catch (e: any) {
      toast.error(e?.message);
    }
  };

  if (loading) return <Loader label="Memuat data GTK..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Guru & Tenaga Kependidikan</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} GTK terdaftar</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama/jabatan..." className="pl-9 max-w-sm" />
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scroll">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase">
                <tr>
                  <th className="text-left p-3 font-semibold">Nama</th>
                  <th className="text-left p-3 font-semibold">Jabatan</th>
                  <th className="text-left p-3 font-semibold hidden sm:table-cell">Kategori</th>
                  <th className="text-left p-3 font-semibold hidden md:table-cell">Pendidikan</th>
                  <th className="text-center p-3 font-semibold w-32">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="text-center p-8 text-muted-foreground"><Users className="h-8 w-8 mx-auto mb-2 opacity-50" /> Belum ada data GTK</td></tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openPhotoEdit(t)} className="relative group/photo shrink-0" title="Ganti Foto">
                            {t.photo ? (
                              <img src={t.photo} alt={t.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-border group-hover/photo:ring-primary transition-all" />
                            ) : (
                              <div className="h-9 w-9 rounded-full bg-teal-soft/60 flex items-center justify-center text-xs font-bold text-primary ring-2 ring-border group-hover/photo:ring-primary transition-all">{t.name.charAt(0)}</div>
                            )}
                            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
                              <Camera className="h-2.5 w-2.5" />
                            </span>
                          </button>
                          <div>
                            <p className="font-medium text-foreground">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.nip || 'NIP -'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{t.position}</td>
                      <td className="p-3 hidden sm:table-cell">
                        <span className={`px-2 py-0.5 rounded text-xs ${t.category === 'Guru' ? 'bg-primary/10 text-primary' : 'bg-gold/15 text-gold'}`}>{t.category}</span>
                      </td>
                      <td className="p-3 hidden md:table-cell text-muted-foreground">{t.education}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" onClick={() => openPhotoEdit(t)} title="Ganti Foto"><Camera className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => openEdit(t)} title="Edit"><Pencil className="h-4 w-4" /></Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus GTK?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Yakin ingin menghapus <span className="font-semibold">{t.name}</span>? Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => del(t.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit GTK' : 'Tambah GTK'}</DialogTitle>
            <DialogDescription>Isi data guru atau tenaga kependidikan.</DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <ImageUpload label="Foto" value={form.photo || ''} onChange={(v) => set('photo', v)} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nama Lengkap (dengan gelar)" value={form.name} onChange={(v) => set('name', v)} required />
              <Field label="NIP" value={form.nip || ''} onChange={(v) => set('nip', v)} />
              <Field label="NUPTK" value={form.nuptk || ''} onChange={(v) => set('nuptk', v)} />
              <Field label="Jabatan" value={form.position} onChange={(v) => set('position', v)} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Kategori</Label>
                <Select value={form.category} onValueChange={(v) => set('category', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Guru">Guru</SelectItem>
                    <SelectItem value="Tenaga Kependidikan">Tenaga Kependidikan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Jenis Kelamin</Label>
                <Select value={form.gender} onValueChange={(v) => set('gender', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Pendidikan Terakhir" value={form.education} onChange={(v) => set('education', v)} required />
              <Field label="Tugas / Bidang" value={form.subject || ''} onChange={(v) => set('subject', v)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Telepon" value={form.phone || ''} onChange={(v) => set('phone', v)} />
              <Field label="Email" value={form.email || ''} onChange={(v) => set('email', v)} type="email" />
            </div>
            <Field label="Bio Singkat" value={form.bio || ''} onChange={(v) => set('bio', v)} textarea rows={3} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick photo replace dialog */}
      <Dialog open={!!photoEdit} onOpenChange={(o) => !o && setPhotoEdit(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Ganti Foto GTK
            </DialogTitle>
            <DialogDescription>
              {photoEdit ? <>Unggah foto riil untuk <span className="font-semibold text-foreground">{photoEdit.name}</span>. Foto akan tampil di halaman publik GTK dan Struktur Organisasi.</> : null}
            </DialogDescription>
          </DialogHeader>
          {photoEdit && (
            <div className="space-y-4">
              <ImageUpload
                label="Foto Guru / Tenaga Kependidikan"
                value={photoUrl}
                onChange={setPhotoUrl}
                placeholder="URL gambar atau upload dari komputer"
              />
              <div className="rounded-lg bg-muted/50 border border-border p-3">
                <p className="text-xs text-muted-foreground">
                  💡 <span className="font-medium">Tips:</span> Gunakan foto portrait (rasio 3:4) yang jelas, formal, dan ramah. Format JPG/PNG/WebP, maksimal 5MB.
                </p>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setPhotoEdit(null)}>Batal</Button>
                <Button type="button" onClick={savePhoto} disabled={photoSaving}>
                  {photoSaving ? (
                    <>
                      <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Simpan Foto
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
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
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows || 3} required={required} />
      ) : (
        <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      )}
    </div>
  );
}
