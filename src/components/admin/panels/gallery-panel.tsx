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
import { Plus, Pencil, Trash2, Images } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import type { GalleryItem } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const CATEGORIES = ['Kegiatan Pembelajaran', 'Upacara', 'Ekstrakurikuler', 'Prestasi Siswa', 'Kegiatan Keagamaan', 'Kegiatan Sosial', 'Kegiatan Sekolah', 'Dokumentasi Lainnya'];

const empty = { title: '', photo: '', category: 'Kegiatan Pembelajaran', description: '', date: format(new Date(), 'yyyy-MM-dd') };

export function GalleryPanel() {
  const { data, loading, error, refetch } = useFetch<GalleryItem[]>('/api/admin/gallery');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (g: GalleryItem) => { setEditing(g); setForm({ title: g.title, photo: g.photo, category: g.category, description: g.description || '', date: g.date ? format(new Date(g.date), 'yyyy-MM-dd') : '' }); setOpen(true); };
  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.photo) { toast.error('Judul dan foto wajib diisi'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/gallery/${editing.id}` : '/api/admin/gallery';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Galeri diperbarui' : 'Galeri ditambahkan');
      setOpen(false); refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try { const r = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' }); if (!r.ok) { const j = await r.json(); throw new Error(j?.error); } toast.success('Foto dihapus'); refetch(); } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat galeri..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Galeri</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} foto</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      {data?.length === 0 ? (
        <EmptyState title="Belum ada foto" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {(data || []).map((g) => (
            <Card key={g.id} className="overflow-hidden border-border shadow-sm group">
              <div className="aspect-square bg-muted relative">
                <img src={g.photo} alt={g.title} className="h-full w-full object-cover" />
                <Badge className="absolute top-2 left-2 text-[10px] bg-primary/90 text-primary-foreground">{g.category}</Badge>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => openEdit(g)}><Pencil className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button size="icon" variant="destructive"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>Hapus foto?</AlertDialogTitle><AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{g.title}</span>?</AlertDialogDescription></AlertDialogHeader>
                      <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(g.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-semibold line-clamp-1">{g.title}</p>
                <p className="text-xs text-muted-foreground">{format(new Date(g.date), 'd MMM yyyy', { locale: idLocale })}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader><DialogTitle>{editing ? 'Edit Foto' : 'Tambah Foto'}</DialogTitle><DialogDescription>Isi data dokumentasi.</DialogDescription></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <ImageUpload label="Foto *" value={form.photo} onChange={(v) => set('photo', v)} />
            <Field label="Judul" value={form.title} onChange={(v) => set('title', v)} required />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Kategori</Label>
                <Select value={form.category} onValueChange={(v) => set('category', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Tanggal</Label><Input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Deskripsi</Label><Textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, value, onChange, required, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (<div className="space-y-1.5"><Label>{label} {required && <span className="text-destructive">*</span>}</Label><Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} /></div>);
}
