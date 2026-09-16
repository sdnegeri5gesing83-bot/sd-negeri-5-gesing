'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader, EmptyState } from '@/components/site/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Plus, Pencil, Trash2, Search, GraduationCap, ShieldCheck, Camera, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Student } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const empty = {
  nisn: '',
  nis: '',
  name: '',
  photo: '',
  gender: 'L',
  className: '1',
  academicYear: '2024/2025',
  status: 'Aktif',
};

export function StudentsPanel() {
  const { data, loading, error, refetch } = useFetch<Student[]>('/api/admin/students');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [photoEdit, setPhotoEdit] = useState<Student | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoSaving, setPhotoSaving] = useState(false);

  const openPhotoEdit = (s: Student) => {
    setPhotoEdit(s);
    setPhotoUrl(s.photo || '');
  };

  const savePhoto = async () => {
    if (!photoEdit) return;
    setPhotoSaving(true);
    try {
      const res = await fetch(`/api/admin/students/${photoEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nisn: photoEdit.nisn || '',
          nis: photoEdit.nis || '',
          name: photoEdit.name,
          photo: photoUrl,
          gender: photoEdit.gender,
          className: photoEdit.className,
          academicYear: photoEdit.academicYear,
          status: photoEdit.status,
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success('Foto siswa berhasil diperbarui!');
      setPhotoEdit(null);
      refetch();
    } catch (e: any) {
      toast.error(e?.message);
    } finally {
      setPhotoSaving(false);
    }
  };

  const filtered = (data || []).filter((s) => {
    const okSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || (s.nis || '').includes(search);
    const okClass = classFilter === 'all' || s.className === classFilter;
    return okSearch && okClass;
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (s: Student) => { setEditing(s); setForm({ nisn: s.nisn || '', nis: s.nis || '', name: s.name, photo: s.photo || '', gender: s.gender, className: s.className, academicYear: s.academicYear, status: s.status }); setOpen(true); };
  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { toast.error('Nama wajib diisi'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/students/${editing.id}` : '/api/admin/students';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Gagal');
      toast.success(editing ? 'Siswa diperbarui' : 'Siswa ditambahkan');
      setOpen(false);
      refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
      if (!res.ok) { const j = await res.json(); throw new Error(j?.error); }
      toast.success('Siswa dihapus');
      refetch();
    } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat data siswa..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Siswa</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} siswa terdaftar</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau NIS..." className="pl-9" />
        </div>
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Kelas" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kelas</SelectItem>
            {['1','2','3','4','5','6'].map((c) => <SelectItem key={c} value={c}>Kelas {c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/30 border border-accent-foreground/15 mb-4">
        <ShieldCheck className="h-4 w-4 text-accent-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-accent-foreground">Data siswa sensitif. Hanya admin yang dapat melihat data lengkap. NISN tidak ditampilkan ke publik.</p>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scroll max-h-[60vh]">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs uppercase sticky top-0 z-10 shadow-sm">
                <tr className="border-b-2 border-border">
                  <th className="text-left p-3 font-semibold">#</th>
                  <th className="text-center p-3 font-semibold w-14">Foto</th>
                  <th className="text-left p-3 font-semibold">Nama</th>
                  <th className="text-center p-3 font-semibold">L/P</th>
                  <th className="text-center p-3 font-semibold">Kelas</th>
                  <th className="text-left p-3 font-semibold hidden sm:table-cell">NIS</th>
                  <th className="text-left p-3 font-semibold hidden md:table-cell">NISN</th>
                  <th className="text-center p-3 font-semibold">Status</th>
                  <th className="text-center p-3 font-semibold w-32">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="text-center p-8 text-muted-foreground"><GraduationCap className="h-8 w-8 mx-auto mb-2 opacity-50" /> Tidak ada siswa</td></tr>
                ) : (
                  filtered.map((s, i) => (
                    <tr key={s.id} className={`border-b border-border/50 hover:bg-primary/5 transition-colors ${i % 2 === 1 ? 'bg-muted/30' : 'bg-background'}`}>
                      <td className="p-3 text-muted-foreground">{i + 1}</td>
                      <td className="p-3 text-center">
                        <button onClick={() => openPhotoEdit(s)} className="relative group/photo inline-flex" title="Ganti Foto">
                          {s.photo ? (
                            <img src={s.photo} alt={s.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-border group-hover/photo:ring-primary transition-all" />
                          ) : (
                            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-border group-hover/photo:ring-primary transition-all ${s.gender === 'L' ? 'bg-primary/10 text-primary' : 'bg-gold/15 text-gold'}`}>{s.name.charAt(0)}</div>
                          )}
                          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
                            <Camera className="h-2.5 w-2.5" />
                          </span>
                        </button>
                      </td>
                      <td className="p-3 font-medium">{s.name}</td>
                      <td className="p-3 text-center">{s.gender}</td>
                      <td className="p-3 text-center">{s.className}</td>
                      <td className="p-3 hidden sm:table-cell text-xs font-mono">{s.nis || '-'}</td>
                      <td className="p-3 hidden md:table-cell text-xs font-mono">{s.nisn || '-'}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-xs ${s.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-muted text-muted-foreground'}`}>{s.status}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" onClick={() => openPhotoEdit(s)} title="Ganti Foto"><Camera className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => openEdit(s)} title="Edit"><Pencil className="h-4 w-4" /></Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus siswa?</AlertDialogTitle>
                                <AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{s.name}</span>?</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => del(s.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction>
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
            <DialogTitle>{editing ? 'Edit Siswa' : 'Tambah Siswa'}</DialogTitle>
            <DialogDescription>Isi data kependudukan siswa.</DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <ImageUpload label="Foto Siswa" value={form.photo} onChange={(v) => set('photo', v)} />
            <Field label="Nama Lengkap" value={form.name} onChange={(v) => set('name', v)} required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="NIS" value={form.nis} onChange={(v) => set('nis', v)} />
              <Field label="NISN" value={form.nisn} onChange={(v) => set('nisn', v)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
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
              <div className="space-y-1.5">
                <Label>Kelas</Label>
                <Select value={form.className} onValueChange={(v) => set('className', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['1','2','3','4','5','6'].map((c) => <SelectItem key={c} value={c}>Kelas {c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Tahun Pelajaran" value={form.academicYear} onChange={(v) => set('academicYear', v)} required />
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => set('status', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Lulus">Lulus</SelectItem>
                    <SelectItem value="Pindah">Pindah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
              Ganti Foto Siswa
            </DialogTitle>
            <DialogDescription>
              {photoEdit ? <>Unggah foto untuk <span className="font-semibold text-foreground">{photoEdit.name}</span> (Kelas {photoEdit.className}).</> : null}
            </DialogDescription>
          </DialogHeader>
          {photoEdit && (
            <div className="space-y-4">
              <ImageUpload
                label="Foto Siswa"
                value={photoUrl}
                onChange={setPhotoUrl}
                placeholder="URL gambar atau upload dari komputer"
              />
              <div className="rounded-lg bg-muted/50 border border-border p-3">
                <p className="text-xs text-muted-foreground">
                  💡 <span className="font-medium">Tips:</span> Gunakan foto portrait (rasio 3:4) yang jelas. Format JPG/PNG/WebP, maksimal 5MB. Foto siswa bersifat privat — hanya tampil di panel admin.
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

function Field({ label, value, onChange, required, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
    </div>
  );
}
