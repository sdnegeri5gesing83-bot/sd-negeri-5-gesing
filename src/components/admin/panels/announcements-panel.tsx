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
import { Plus, Pencil, Trash2, Megaphone } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import type { Announcement } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const empty = { title: '', content: '', photo: '', date: format(new Date(), 'yyyy-MM-dd'), published: true };

export function AnnouncementsPanel() {
  const { data, loading, error, refetch } = useFetch<Announcement[]>('/api/admin/announcements');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (a: Announcement) => { setEditing(a); setForm({ title: a.title, content: a.content, photo: a.photo || '', date: format(new Date(a.date), 'yyyy-MM-dd'), published: a.published }); setOpen(true); };
  const set = (k: keyof typeof empty, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) { toast.error('Judul dan konten wajib diisi'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/announcements/${editing.id}` : '/api/admin/announcements';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Pengumuman diperbarui' : 'Pengumuman ditambahkan');
      setOpen(false); refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try { const r = await fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' }); if (!r.ok) { const j = await r.json(); throw new Error(j?.error); } toast.success('Pengumuman dihapus'); refetch(); } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat pengumuman..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pengumuman</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} pengumuman</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="space-y-3">
        {(data || []).map((a) => (
          <Card key={a.id} className="border-border shadow-sm">
            <CardContent className="p-4 flex items-start gap-3">
              {a.photo ? (
                <img src={a.photo} alt={a.title} className="h-16 w-20 rounded-lg object-cover shrink-0 ring-1 ring-border" />
              ) : (
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Megaphone className="h-5 w-5" /></div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge variant="secondary" className={`text-[10px] ${a.published ? 'bg-emerald-500/15 text-emerald-700' : 'bg-muted'}`}>{a.published ? 'Terbit' : 'Draft'}</Badge>
                  <span className="text-xs text-muted-foreground">{format(new Date(a.date), 'd MMM yyyy', { locale: idLocale })}</span>
                </div>
                <p className="font-semibold text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.content}</p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => openEdit(a)}><Pencil className="h-4 w-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Hapus pengumuman?</AlertDialogTitle><AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{a.title}</span>?</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(a.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
        {data?.length === 0 && <EmptyState title="Belum ada pengumuman" />}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader><DialogTitle>{editing ? 'Edit Pengumuman' : 'Tambah Pengumuman'}</DialogTitle><DialogDescription>Isi pengumuman sekolah.</DialogDescription></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <ImageUpload label="Foto Kegiatan (opsional)" value={form.photo} onChange={(v) => set('photo', v)} />
            <div className="space-y-1.5"><Label>Tanggal</Label><Input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} /></div>
            <Field label="Judul" value={form.title} onChange={(v) => set('title', v)} required />
            <div className="space-y-1.5"><Label>Konten <span className="text-destructive">*</span></Label><Textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={4} required /></div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40">
              <Switch checked={form.published} onCheckedChange={(v) => set('published', v)} id="pub" />
              <Label htmlFor="pub" className="cursor-pointer">Terbitkan pengumuman</Label>
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
