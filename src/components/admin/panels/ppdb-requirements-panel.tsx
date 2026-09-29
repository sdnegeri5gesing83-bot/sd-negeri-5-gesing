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
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, ListChecks, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

interface PpdbRequirement {
  id: string;
  title: string;
  description?: string | null;
  required: boolean;
  allowUpload: boolean;
  order: number;
  _count?: { documents: number };
}

const empty = { title: '', description: '', required: true, allowUpload: true, order: 0 };

export function PpdbRequirementsPanel() {
  const { data, loading, error, refetch } = useFetch<PpdbRequirement[]>('/api/admin/ppdb/requirements');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PpdbRequirement | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditing(null);
    const nextOrder = (data?.length || 0);
    setForm({ ...empty, order: nextOrder });
    setOpen(true);
  };

  const openEdit = (s: PpdbRequirement) => {
    setEditing(s);
    setForm({
      title: s.title,
      description: s.description || '',
      required: s.required,
      allowUpload: s.allowUpload,
      order: s.order,
    });
    setOpen(true);
  };

  const set = (k: keyof typeof empty, v: string | number | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Judul syarat wajib diisi'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/ppdb/requirements/${editing.id}` : '/api/admin/ppdb/requirements';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description || null,
          required: form.required,
          allowUpload: form.allowUpload,
          order: Number(form.order),
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Syarat diperbarui' : 'Syarat ditambahkan');
      setOpen(false);
      refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try {
      const r = await fetch(`/api/admin/ppdb/requirements/${id}`, { method: 'DELETE' });
      if (!r.ok) { const j = await r.json(); throw new Error(j?.error); }
      toast.success('Syarat dihapus');
      refetch();
    } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat syarat PPDB..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Syarat Pendaftaran</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} syarat didefinisikan</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-card p-4 mb-5">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Tips:</span> Atur urutan syarat dengan
          kolom <span className="font-semibold">Urutan</span> (angka kecil tampil lebih awal).
          Gunakan <span className="font-semibold">Wajib</span> untuk berkas yang harus diunggah
          calon siswa. Untuk syarat yang diselesaikan di sekolah (misal: formulir), matikan
          opsi <span className="font-semibold">Boleh Upload</span>.
        </p>
      </div>

      <div className="space-y-3">
        {(data || []).map((s) => (
          <Card key={s.id} className="border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant="outline" className="text-[10px]">Urutan: {s.order}</Badge>
                    {s.required ? (
                      <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 text-[10px]">Wajib</Badge>
                    ) : (
                      <Badge className="bg-muted text-muted-foreground text-[10px]">Opsional</Badge>
                    )}
                    {s.allowUpload ? (
                      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px]">Upload Aktif</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">Tanpa Upload</Badge>
                    )}
                    {s._count && s._count.documents > 0 && (
                      <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[10px]">
                        {s._count.documents} berkas
                      </Badge>
                    )}
                  </div>
                  <p className="font-semibold text-foreground">{s.title}</p>
                  {s.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">{s.description}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(s)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus syarat?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Yakin ingin menghapus <span className="font-semibold">{s.title}</span>?
                          {(s._count?.documents || 0) > 0 && (
                            <span className="block mt-2 text-amber-700 dark:text-amber-400">
                              Syarat ini masih memiliki {s._count?.documents} berkas terkait.
                              Hapus pendaftar terkait terlebih dahulu sebelum menghapus syarat.
                            </span>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => del(s.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {data?.length === 0 && (
          <EmptyState
            title="Belum ada syarat"
            description="Tambahkan dokumen persyaratan pertama Anda."
          />
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Syarat' : 'Tambah Syarat'}</DialogTitle>
            <DialogDescription>Isi data persyaratan pendaftaran.</DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Judul Syarat <span className="text-destructive">*</span></Label>
              <Input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="cth: Fotokopi Kartu Keluarga (KK)"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Deskripsi (opsional)</Label>
              <Textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={2}
                placeholder="cth: 2 lembar"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Urutan</Label>
                <Input
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => set('order', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>&nbsp;</Label>
                <div className="flex flex-col gap-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Switch
                      checked={form.required}
                      onCheckedChange={(v) => set('required', v)}
                    />
                    <span className="text-sm">Wajib diunggah</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Switch
                      checked={form.allowUpload}
                      onCheckedChange={(v) => set('allowUpload', v)}
                    />
                    <span className="text-sm">Boleh upload</span>
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
