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
import { Plus, Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface PpdbItem {
  id: string;
  phase: string;
  date: string;
  time: string;
  description?: string | null;
  status: string;
  order: number;
}

const empty = { phase: '', date: '', time: '', description: '', status: 'upcoming', order: 0 };

export function PpdbPanel() {
  const { data, loading, error, refetch } = useFetch<PpdbItem[]>('/api/admin/ppdb');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PpdbItem | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (s: PpdbItem) => { setEditing(s); setForm({ phase: s.phase, date: s.date, time: s.time, description: s.description || '', status: s.status, order: s.order }); setOpen(true); };
  const set = (k: keyof typeof empty, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phase || !form.date || !form.time) { toast.error('Tahapan, tanggal, dan jam wajib diisi'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/ppdb/${editing.id}` : '/api/admin/ppdb';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, order: Number(form.order) }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Jadwal PPDB diperbarui' : 'Jadwal PPDB ditambahkan');
      setOpen(false); refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try { const r = await fetch(`/api/admin/ppdb/${id}`, { method: 'DELETE' }); if (!r.ok) { const j = await r.json(); throw new Error(j?.error); } toast.success('Jadwal dihapus'); refetch(); } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat jadwal PPDB..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  const statusColor = (s: string) => s === 'active' ? 'bg-emerald-500/15 text-emerald-700' : s === 'done' ? 'bg-muted text-muted-foreground' : 'bg-amber-500/15 text-amber-700';
  const statusLabel = (s: string) => s === 'active' ? 'Berlangsung' : s === 'done' ? 'Selesai' : 'Akan Datang';

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jadwal PPDB</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} tahapan jadwal</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="space-y-3">
        {(data || []).map((s) => (
          <Card key={s.id} className="border-border shadow-sm">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge className={`text-[10px] ${statusColor(s.status)}`}>{statusLabel(s.status)}</Badge>
                  <span className="text-xs text-muted-foreground">Urutan: {s.order}</span>
                </div>
                <p className="font-semibold text-foreground">{s.phase}</p>
                <p className="text-sm text-primary mt-0.5">{s.date}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" /> {s.time}
                </p>
                {s.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>}
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Hapus jadwal?</AlertDialogTitle><AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{s.phase}</span>?</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(s.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
        {data?.length === 0 && <EmptyState title="Belum ada jadwal PPDB" />}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader><DialogTitle>{editing ? 'Edit Jadwal PPDB' : 'Tambah Jadwal PPDB'}</DialogTitle><DialogDescription>Isi data tahapan jadwal PPDB.</DialogDescription></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="space-y-1.5"><Label>Tahapan <span className="text-destructive">*</span></Label><Input value={form.phase} onChange={(e) => set('phase', e.target.value)} placeholder="cth: Pendaftaran Online" required /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Tanggal <span className="text-destructive">*</span></Label><Input value={form.date} onChange={(e) => set('date', e.target.value)} placeholder="cth: 1-30 Juni 2025" required /></div>
              <div className="space-y-1.5"><Label>Jam <span className="text-destructive">*</span></Label><Input value={form.time} onChange={(e) => set('time', e.target.value)} placeholder="cth: 08.00 - 14.00 WITA" required /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => set('status', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Berlangsung</SelectItem>
                    <SelectItem value="upcoming">Akan Datang</SelectItem>
                    <SelectItem value="done">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Urutan</Label><Input type="number" min={0} value={form.order} onChange={(e) => set('order', e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Deskripsi</Label><Textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
