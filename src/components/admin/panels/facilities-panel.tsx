'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader, EmptyState } from '@/components/site/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Building2, Camera, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Facility } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const CATEGORIES = ['Ruang Kelas', 'Ruang Guru', 'Ruang Kepala Sekolah', 'Perpustakaan', 'UKS', 'Toilet', 'Lapangan', 'Ruang Pendukung', 'Peralatan Pembelajaran', 'Fasilitas Lainnya'];
const CONDITIONS = ['Baik', 'Rusak Ringan', 'Rusak Berat'];

const empty = {
  name: '', photo: '', category: 'Ruang Kelas', quantity: 1, condition: 'Baik', description: '',
};

export function FacilitiesPanel() {
  const { data, loading, error, refetch } = useFetch<Facility[]>('/api/admin/facilities');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Facility | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);
  const [photoEdit, setPhotoEdit] = useState<Facility | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoSaving, setPhotoSaving] = useState(false);

  const openPhotoEdit = (f: Facility) => {
    setPhotoEdit(f);
    setPhotoUrl(f.photo || '');
  };

  const savePhoto = async () => {
    if (!photoEdit) return;
    setPhotoSaving(true);
    try {
      const res = await fetch(`/api/admin/facilities/${photoEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: photoEdit.name,
          photo: photoUrl,
          category: photoEdit.category,
          quantity: photoEdit.quantity,
          condition: photoEdit.condition,
          description: photoEdit.description || '',
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success('Foto fasilitas berhasil diperbarui!');
      setPhotoEdit(null);
      refetch();
    } catch (e: any) {
      toast.error(e?.message);
    } finally {
      setPhotoSaving(false);
    }
  };

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (f: Facility) => { setEditing(f); setForm({ name: f.name, photo: f.photo || '', category: f.category, quantity: f.quantity, condition: f.condition, description: f.description || '' }); setOpen(true); };
  const set = (k: keyof typeof empty, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) { toast.error('Nama wajib diisi'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/facilities/${editing.id}` : '/api/admin/facilities';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, quantity: Number(form.quantity) }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Fasilitas diperbarui' : 'Fasilitas ditambahkan');
      setOpen(false); refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try { const r = await fetch(`/api/admin/facilities/${id}`, { method: 'DELETE' }); if (!r.ok) { const j = await r.json(); throw new Error(j?.error); } toast.success('Fasilitas dihapus'); refetch(); } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat fasilitas..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sarana & Prasarana</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} fasilitas</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data || []).map((f) => (
          <Card key={f.id} className="overflow-hidden border-border shadow-sm">
            <div className="aspect-video bg-muted relative group">
              {f.photo ? <img src={f.photo} alt={f.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-muted-foreground"><Building2 className="h-8 w-8" /></div>}
              <Badge className={`absolute top-2 right-2 text-[10px] ${f.condition === 'Baik' ? 'bg-emerald-500/90 text-white' : f.condition === 'Rusak Ringan' ? 'bg-amber-500/90 text-white' : 'bg-rose-500/90 text-white'}`}>{f.condition}</Badge>
              <button
                onClick={() => openPhotoEdit(f)}
                className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-lg"
                title="Ganti Foto"
              >
                <Camera className="h-4 w-4" />
              </button>
              {!f.photo && (
                <button
                  onClick={() => openPhotoEdit(f)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Camera className="h-6 w-6" />
                  <span className="text-xs font-medium">Tambah Foto</span>
                </button>
              )}
            </div>
            <CardContent className="p-4">
              <p className="font-semibold text-sm">{f.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{f.category} · Jumlah {f.quantity}</p>
              {f.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{f.description}</p>}
              <div className="flex gap-1 mt-3">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(f)}><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                <Button size="sm" variant="outline" onClick={() => openPhotoEdit(f)} title="Ganti Foto"><Camera className="h-3.5 w-3.5" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button size="sm" variant="outline" className="text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Hapus fasilitas?</AlertDialogTitle><AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{f.name}</span>?</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(f.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
        {data?.length === 0 && <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-muted-foreground">Belum ada fasilitas</div>}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader><DialogTitle>{editing ? 'Edit Fasilitas' : 'Tambah Fasilitas'}</DialogTitle><DialogDescription>Isi data sarana/prasarana.</DialogDescription></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <ImageUpload label="Foto" value={form.photo} onChange={(v) => set('photo', v)} />
            <Field label="Nama Fasilitas" value={form.name} onChange={(v) => set('name', v)} required />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Kategori</Label>
                <Select value={form.category} onValueChange={(v) => set('category', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Jumlah</Label><Input type="number" min={1} value={form.quantity} onChange={(e) => set('quantity', e.target.value)} required /></div>
            </div>
            <div className="space-y-1.5"><Label>Kondisi</Label>
              <Select value={form.condition} onValueChange={(v) => set('condition', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CONDITIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Deskripsi</Label><Textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick photo replace dialog */}
      <Dialog open={!!photoEdit} onOpenChange={(o) => !o && setPhotoEdit(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Ganti Foto Fasilitas
            </DialogTitle>
            <DialogDescription>
              {photoEdit ? <>Unggah foto riil untuk <span className="font-semibold text-foreground">{photoEdit.name}</span>. Foto akan tampil di halaman publik Sarpras.</> : null}
            </DialogDescription>
          </DialogHeader>
          {photoEdit && (
            <div className="space-y-4">
              <ImageUpload
                label="Foto Bangunan/Ruang"
                value={photoUrl}
                onChange={setPhotoUrl}
                placeholder="URL gambar atau upload dari komputer"
              />
              <div className="rounded-lg bg-muted/50 border border-border p-3">
                <p className="text-xs text-muted-foreground">
                  💡 <span className="font-medium">Tips:</span> Gunakan foto bangunan/ruang yang riil dari sekolah. Format JPG/PNG/WebP, maksimal 5MB. Disarankan rasio 4:3 (landscape).
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
  return (<div className="space-y-1.5"><Label>{label} {required && <span className="text-destructive">*</span>}</Label><Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} /></div>);
}
