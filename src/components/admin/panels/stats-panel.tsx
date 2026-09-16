'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader, EmptyState } from '@/components/site/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import type { Statistic } from '@/lib/types';

const ICONS = ['Users', 'GraduationCap', 'School', 'Building2'];
const empty = { label: '', value: 0, icon: 'Users', order: 0 };

export function StatsPanel() {
  const { data, loading, error, refetch } = useFetch<Statistic[]>('/api/admin/stats');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Statistic | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (s: Statistic) => { setEditing(s); setForm({ label: s.label, value: s.value, icon: s.icon || 'Users', order: s.order }); setOpen(true); };
  const set = (k: keyof typeof empty, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.label) { toast.error('Label wajib diisi'); return; }
    setSaving(true);
    try {
      const payload = { ...form, value: Number(form.value), order: Number(form.order) };
      const url = editing ? `/api/admin/stats/${editing.id}` : '/api/admin/stats';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Statistik diperbarui' : 'Statistik ditambahkan');
      setOpen(false); refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try { const r = await fetch(`/api/admin/stats/${id}`, { method: 'DELETE' }); if (!r.ok) { const j = await r.json(); throw new Error(j?.error); } toast.success('Statistik dihapus'); refetch(); } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat statistik..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistik Beranda</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} statistik</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(data || []).map((s) => (
          <Card key={s.id} className="border-border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>Hapus statistik?</AlertDialogTitle><AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{s.label}</span>?</AlertDialogDescription></AlertDialogHeader>
                      <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(s.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium mt-1">{s.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Ikon: {s.icon} · Urutan: {s.order}</p>
            </CardContent>
          </Card>
        ))}
        {data?.length === 0 && <div className="sm:col-span-2 lg:col-span-4"><EmptyState title="Belum ada statistik" /></div>}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editing ? 'Edit Statistik' : 'Tambah Statistik'}</DialogTitle><DialogDescription>Isi data statistik beranda.</DialogDescription></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="space-y-1.5"><Label>Label <span className="text-destructive">*</span></Label><Input value={form.label} onChange={(e) => set('label', e.target.value)} required placeholder="cth: Jumlah Siswa" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Nilai</Label><Input type="number" min={0} value={form.value} onChange={(e) => set('value', e.target.value)} required /></div>
              <div className="space-y-1.5"><Label>Urutan</Label><Input type="number" min={0} value={form.order} onChange={(e) => set('order', e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Ikon</Label>
              <Select value={form.icon} onValueChange={(v) => set('icon', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{ICONS.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
