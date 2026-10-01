'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader, EmptyState } from '@/components/site/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Images, ArrowUp, ArrowDown, Eye, EyeOff, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUpload } from '../image-upload';

interface HeroPhoto {
  id: string;
  src: string;
  alt: string;
  order: number;
  active: boolean;
  createdAt: string;
}

const empty = { src: '', alt: '', order: 0, active: true };

export function HeroPhotosPanel() {
  const { data, loading, error, refetch } = useFetch<HeroPhoto[]>('/api/admin/hero-photos');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<HeroPhoto | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty, order: (data?.length || 0) + 1 });
    setOpen(true);
  };
  const openEdit = (p: HeroPhoto) => {
    setEditing(p);
    setForm({ src: p.src, alt: p.alt, order: p.order, active: p.active });
    setOpen(true);
  };
  const set = (k: keyof typeof empty, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.src.trim() || !form.alt.trim()) {
      toast.error('URL foto dan keterangan wajib diisi');
      return;
    }
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/admin/hero-photos/${editing.id}` : '/api/admin/hero-photos';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Gagal menyimpan');
      }
      toast.success(editing ? 'Foto diperbarui' : 'Foto ditambahkan');
      setOpen(false);
      refetch();
    } catch (e: any) {
      toast.error(e?.message || 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/hero-photos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus');
      toast.success('Foto dihapus');
      refetch();
    } catch (e: any) {
      toast.error(e?.message || 'Terjadi kesalahan');
    }
  };

  const toggleActive = async (p: HeroPhoto) => {
    try {
      const res = await fetch(`/api/admin/hero-photos/${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !p.active }),
      });
      if (!res.ok) throw new Error('Gagal mengubah status');
      toast.success(p.active ? 'Foto dinonaktifkan' : 'Foto diaktifkan');
      refetch();
    } catch (e: any) {
      toast.error(e?.message || 'Terjadi kesalahan');
    }
  };

  const move = async (p: HeroPhoto, dir: 'up' | 'down') => {
    if (!data) return;
    const sorted = [...data].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((x) => x.id === p.id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const swap = sorted[swapIdx];
    try {
      await Promise.all([
        fetch(`/api/admin/hero-photos/${p.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: swap.order }),
        }),
        fetch(`/api/admin/hero-photos/${swap.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: p.order }),
        }),
      ]);
      toast.success('Urutan diperbarui');
      refetch();
    } catch (e: any) {
      toast.error('Gagal mengubah urutan');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Images className="h-5 w-5 text-primary" />
            Foto Beranda (Carousel)
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola foto yang tampil di banner bergerak di Beranda.
          </p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Foto
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <EmptyState title="Gagal memuat" description={error} />
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...data].sort((a, b) => a.order - b.order).map((p, i, arr) => (
            <Card key={p.id} className={`overflow-hidden border-border ${!p.active ? 'opacity-50' : ''}`}>
              <div className="relative aspect-[16/9] bg-muted">
                {p.src ? (
                  <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <Badge className="bg-black/60 text-white">#{p.order}</Badge>
                  {!p.active && (
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      <EyeOff className="h-3 w-3 mr-1" /> Nonaktif
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <p className="text-sm font-medium text-foreground line-clamp-2">{p.alt}</p>
                <p className="text-xs text-muted-foreground truncate">{p.src}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => openEdit(p)} className="gap-1.5">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(p)}
                    className="gap-1.5"
                    title={p.active ? 'Nonaktifkan' : 'Aktifkan'}
                  >
                    {p.active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                  <div className="flex items-center gap-0.5 ml-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => move(p, 'up')}
                      disabled={i === 0}
                      className="h-8 w-8 p-0"
                      title="Naik"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => move(p, 'down')}
                      disabled={i === arr.length - 1}
                      className="h-8 w-8 p-0"
                      title="Turun"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-1.5 text-destructive hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus foto ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Foto &ldquo;{p.alt}&rdquo; akan dihapus dari carousel Beranda.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => remove(p.id)}>Ya, Hapus</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Belum ada foto"
          description="Tambahkan foto untuk ditampilkan di banner bergerak Beranda."
          action={
            <Button onClick={openNew} className="gap-2">
              <Plus className="h-4 w-4" /> Tambah Foto
            </Button>
          }
        />
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Foto Beranda' : 'Tambah Foto Beranda'}</DialogTitle>
            <DialogDescription>
              Foto ini akan tampil di banner bergerak di Beranda (auto-rotate setiap 4 detik).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Foto</Label>
              <ImageUpload
                value={form.src}
                onChange={(v) => set('src', v)}
                previewAlt="Preview foto beranda"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Keterangan / Caption</Label>
              <Input
                id="alt"
                value={form.alt}
                onChange={(e) => set('alt', e.target.value)}
                placeholder="cth: Papan Nama Resmi SD Negeri 5 Gesing"
              />
              <p className="text-xs text-muted-foreground">
                Teks ini muncul di bawah foto saat ditampilkan di carousel.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.active}
                onCheckedChange={(v) => set('active', v)}
                id="active"
              />
              <Label htmlFor="active" className="cursor-pointer">
                Aktif (tampilkan di carousel)
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Urutan</Label>
              <Input
                id="order"
                type="number"
                value={form.order}
                onChange={(e) => set('order', parseInt(e.target.value) || 0)}
                min={0}
              />
              <p className="text-xs text-muted-foreground">
                Foto dengan urutan lebih kecil tampil lebih dulu.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={save} disabled={saving}>
              {saving ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah Foto'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
