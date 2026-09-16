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
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Newspaper } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import type { NewsItem } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const empty = { title: '', excerpt: '', content: '', photo: '', category: 'Umum', published: true, publishedAt: format(new Date(), 'yyyy-MM-dd') };

export function NewsPanel() {
  const { data, loading, error, refetch } = useFetch<NewsItem[]>('/api/admin/news');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (n: NewsItem) => { setEditing(n); setForm({ title: n.title, excerpt: n.excerpt || '', content: n.content, photo: n.photo || '', category: n.category, published: n.published, publishedAt: format(new Date(n.publishedAt), 'yyyy-MM-dd') }); setOpen(true); };
  const set = (k: keyof typeof empty, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) { toast.error('Judul dan konten wajib diisi'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/news/${editing.id}` : '/api/admin/news';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Berita diperbarui' : 'Berita ditambahkan');
      setOpen(false); refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try { const r = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' }); if (!r.ok) { const j = await r.json(); throw new Error(j?.error); } toast.success('Berita dihapus'); refetch(); } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat berita..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Berita</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} berita</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="space-y-3">
        {(data || []).map((n) => (
          <Card key={n.id} className="border-border shadow-sm">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="h-16 w-24 rounded-lg overflow-hidden bg-muted shrink-0">
                {n.photo ? <img src={n.photo} alt={n.title} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-muted-foreground"><Newspaper className="h-5 w-5" /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge variant="outline" className="text-[10px]">{n.category}</Badge>
                  <Badge variant="secondary" className={`text-[10px] ${n.published ? 'bg-emerald-500/15 text-emerald-700' : 'bg-muted'}`}>{n.published ? 'Terbit' : 'Draft'}</Badge>
                  <span className="text-xs text-muted-foreground">{format(new Date(n.publishedAt), 'd MMM yyyy', { locale: idLocale })}</span>
                </div>
                <p className="font-semibold text-foreground line-clamp-1">{n.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.excerpt || n.content.slice(0, 100)}</p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => openEdit(n)}><Pencil className="h-4 w-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Hapus berita?</AlertDialogTitle><AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{n.title}</span>?</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(n.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
        {data?.length === 0 && <EmptyState title="Belum ada berita" />}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader><DialogTitle>{editing ? 'Edit Berita' : 'Tambah Berita'}</DialogTitle><DialogDescription>Isi konten berita sekolah.</DialogDescription></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <ImageUpload label="Foto" value={form.photo} onChange={(v) => set('photo', v)} />
            <Field label="Judul" value={form.title} onChange={(v) => set('title', v)} required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Kategori" value={form.category} onChange={(v) => set('category', v)} />
              <div className="space-y-1.5"><Label>Tanggal Terbit</Label><Input type="date" value={form.publishedAt} onChange={(e) => set('publishedAt', e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Ringkasan</Label><Textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} /></div>
            <div className="space-y-1.5"><Label>Konten <span className="text-destructive">*</span></Label><Textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={8} required /></div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40">
              <Switch checked={form.published} onCheckedChange={(v) => set('published', v)} id="published" />
              <Label htmlFor="published" className="cursor-pointer">Terbitkan berita (tampil publik)</Label>
            </div>
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
