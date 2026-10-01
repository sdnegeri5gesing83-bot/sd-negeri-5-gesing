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
import { Plus, Pencil, Trash2, Images, Sparkles, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import type { GalleryItem } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const CATEGORIES = ['Kegiatan Pembelajaran', 'Upacara', 'Ekstrakurikuler', 'Prestasi Siswa', 'Kegiatan Keagamaan', 'Kegiatan Sosial', 'Kegiatan Sekolah', 'Dokumentasi Lainnya'];

const empty = { title: '', photo: '', altText: '', category: 'Kegiatan Pembelajaran', description: '', date: format(new Date(), 'yyyy-MM-dd') };

export function GalleryPanel() {
  const { data, loading, error, refetch } = useFetch<GalleryItem[]>('/api/admin/gallery');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);
  // Per-item alt-text generation state (keyed by item id)
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  // In-dialog alt-text generation state
  const [generatingInDialog, setGeneratingInDialog] = useState(false);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (g: GalleryItem) => { setEditing(g); setForm({ title: g.title, photo: g.photo, altText: g.altText || '', category: g.category, description: g.description || '', date: g.date ? format(new Date(g.date), 'yyyy-MM-dd') : '' }); setOpen(true); };
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

  // Generate alt text from the hover overlay — saves directly to DB
  const generateAndSave = async (g: GalleryItem) => {
    if (!g.photo) {
      toast.error('Foto tidak ditemukan untuk item ini');
      return;
    }
    setGeneratingId(g.id);
    try {
      const res = await fetch('/api/admin/generate-alt-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: g.photo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Gagal membuat alt text');
      const altText: string = data.altText || '';

      // Save to DB via PUT
      const putRes = await fetch(`/api/admin/gallery/${g.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: g.title,
          photo: g.photo,
          altText,
          category: g.category,
          description: g.description || '',
          date: format(new Date(g.date), 'yyyy-MM-dd'),
        }),
      });
      if (!putRes.ok) {
        const j = await putRes.json().catch(() => ({}));
        throw new Error(j?.error || 'Gagal menyimpan alt text');
      }
      toast.success('Alt text dibuat', { description: altText });
      refetch();
    } catch (e: any) {
      toast.error(e?.message || 'Gagal membuat alt text');
    } finally {
      setGeneratingId(null);
    }
  };

  // Generate alt text inside the edit dialog — auto-fills the form field (no save)
  const generateForForm = async () => {
    if (!form.photo) {
      toast.error('Tambahkan foto terlebih dahulu sebelum membuat alt text');
      return;
    }
    setGeneratingInDialog(true);
    try {
      const res = await fetch('/api/admin/generate-alt-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: form.photo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Gagal membuat alt text');
      const altText: string = data.altText || '';
      set('altText', altText);
      toast.success('Alt text dihasilkan', { description: altText });
    } catch (e: any) {
      toast.error(e?.message || 'Gagal membuat alt text');
    } finally {
      setGeneratingInDialog(false);
    }
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
                <img src={g.photo} alt={g.altText || g.title} className="h-full w-full object-cover" />
                <Badge className="absolute top-2 left-2 text-[10px] bg-primary/90 text-primary-foreground">{g.category}</Badge>
                {g.altText && (
                  <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full shadow-sm">
                    <Check className="h-3 w-3" /> Alt
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => openEdit(g)} title="Edit" aria-label="Edit foto"><Pencil className="h-4 w-4" /></Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => generateAndSave(g)}
                    disabled={generatingId === g.id}
                    title="Generate Alt Text dengan AI"
                    aria-label="Generate alt text dengan AI"
                    className="bg-gold text-[#0a0f1e] hover:bg-gold/90"
                  >
                    {generatingId === g.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button size="icon" variant="destructive" title="Hapus" aria-label="Hapus foto"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>Hapus foto?</AlertDialogTitle><AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{g.title}</span>?</AlertDialogDescription></AlertDialogHeader>
                      <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(g.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-semibold line-clamp-1">{g.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {g.altText || <span className="italic text-amber-600">Alt text belum dibuat</span>}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{format(new Date(g.date), 'd MMM yyyy', { locale: idLocale })}</p>
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
            {/* Alt Text with Generate button */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label>Alt Text <span className="text-xs text-muted-foreground">(deskripsi gambar untuk aksesibilitas)</span></Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={generateForForm}
                  disabled={generatingInDialog || !form.photo}
                  className="h-7 text-xs gap-1.5"
                >
                  {generatingInDialog ? (
                    <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Membuat...</>
                  ) : (
                    <><Sparkles className="h-3.5 w-3.5" /> Generate AI</>
                  )}
                </Button>
              </div>
              <Textarea
                value={form.altText}
                onChange={(e) => set('altText', e.target.value)}
                rows={2}
                placeholder="Deskripsi singkat gambar, mis. 'Anak-anak SD mengikuti upacara bendera di lapangan'"
                maxLength={150}
              />
              <p className="text-[11px] text-muted-foreground">{form.altText.length}/150 karakter</p>
            </div>
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
