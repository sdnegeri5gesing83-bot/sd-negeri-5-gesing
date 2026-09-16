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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Network } from 'lucide-react';
import { toast } from 'sonner';
import type { OrganizationMember } from '@/lib/types';
import { ImageUpload } from '../image-upload';

const empty = { name: '', position: '', photo: '', order: 0 };

export function OrganizationPanel() {
  const { data, loading, error, refetch } = useFetch<OrganizationMember[]>('/api/admin/organization');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<OrganizationMember | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (m: OrganizationMember) => { setEditing(m); setForm({ name: m.name, position: m.position, photo: m.photo || '', order: m.order }); setOpen(true); };
  const set = (k: keyof typeof empty, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.position) { toast.error('Nama dan jabatan wajib diisi'); return; }
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      const url = editing ? `/api/admin/organization/${editing.id}` : '/api/admin/organization';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Anggota diperbarui' : 'Anggota ditambahkan');
      setOpen(false); refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try { const r = await fetch(`/api/admin/organization/${id}`, { method: 'DELETE' }); if (!r.ok) { const j = await r.json(); throw new Error(j?.error); } toast.success('Anggota dihapus'); refetch(); } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat struktur organisasi..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Struktur Organisasi</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} anggota</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(data || []).map((m, i) => (
          <Card key={m.id} className={`border-border shadow-sm ${i === 0 ? 'ring-2 ring-gold/40' : ''}`}>
            <CardContent className="p-5 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-teal-soft/60 overflow-hidden ring-2 ring-white shadow-sm mb-3">
                {m.photo ? <img src={m.photo} alt={m.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-primary">{m.name.charAt(0)}</div>}
              </div>
              <p className="font-semibold text-sm">{m.name}</p>
              <p className="text-xs text-primary font-medium mt-0.5">{m.position}</p>
              <div className="flex justify-center gap-1 mt-3">
                <Button size="icon" variant="ghost" onClick={() => openEdit(m)}><Pencil className="h-4 w-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Hapus anggota?</AlertDialogTitle><AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{m.name}</span>?</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(m.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
        {data?.length === 0 && <div className="sm:col-span-2 lg:col-span-4"><EmptyState title="Belum ada anggota" /></div>}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editing ? 'Edit Anggota' : 'Tambah Anggota'}</DialogTitle><DialogDescription>Isi data anggota organisasi.</DialogDescription></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <ImageUpload label="Foto" value={form.photo} onChange={(v) => set('photo', v)} />
            <div className="space-y-1.5"><Label>Nama <span className="text-destructive">*</span></Label><Input value={form.name} onChange={(e) => set('name', e.target.value)} required /></div>
            <div className="space-y-1.5"><Label>Jabatan <span className="text-destructive">*</span></Label><Input value={form.position} onChange={(e) => set('position', e.target.value)} required /></div>
            <div className="space-y-1.5"><Label>Urutan</Label><Input type="number" min={0} value={form.order} onChange={(e) => set('order', e.target.value)} /></div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
