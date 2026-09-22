photo: s.photo || '',
    birthDate: s.birthDate || '', gender:'use client';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { useState } from 'react';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { useFetch } from '@/hooks/use-fetch';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { Loader, EmptyState } from '@/components/site/ui';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { Button } from '@/components/ui/button';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { Input } from '@/components/ui/input';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { Label } from '@/components/ui/label';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { Card, CardContent } from '@/components/ui/card';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  Dialog,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  DialogContent,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  DialogHeader,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  DialogTitle,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  DialogDescription,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  DialogFooter,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:} from '@/components/ui/dialog';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  Select,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  SelectContent,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  SelectItem,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  SelectTrigger,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  SelectValue,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:} from '@/components/ui/select';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { Plus, Pencil, Trash2, Search, GraduationCap, ShieldCheck, Camera, Save } from 'lucide-react';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { toast } from 'sonner';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import type { Student } from '@/lib/types';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:import { ImageUpload } from '../image-upload';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:const empty = {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  nisn: '',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  nis: '',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  name: '',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  photo: '',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  birthDate: '',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  gender: 'L',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  className: '1',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  academicYear: '2024/2025',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  status: 'Aktif',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:};
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:export function StudentsPanel() {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const { data, loading, error, refetch } = useFetch<Student[]>('/api/admin/students');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [open, setOpen] = useState(false);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [editing, setEditing] = useState<Student | null>(null);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [form, setForm] = useState<typeof empty>(empty);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [saving, setSaving] = useState(false);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [search, setSearch] = useState('');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [classFilter, setClassFilter] = useState('all');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [photoEdit, setPhotoEdit] = useState<Student | null>(null);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [photoUrl, setPhotoUrl] = useState('');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const [photoSaving, setPhotoSaving] = useState(false);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const openPhotoEdit = (s: Student) => {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    setPhotoEdit(s);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    setPhotoUrl(s.photo || '');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  };
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const savePhoto = async () => {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    if (!photoEdit) return;
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    setPhotoSaving(true);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    try {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      const res = await fetch(`/api/admin/students/${photoEdit.id}`, {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        method: 'PUT',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        headers: { 'Content-Type': 'application/json' },
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        body: JSON.stringify({
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          nisn: photoEdit.nisn || '',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          nis: photoEdit.nis || '',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          name: photoEdit.name,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          photo: photoUrl,
          birthDate: photoEdit.birthDate || '',
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          gender: photoEdit.gender,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          className: photoEdit.className,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          academicYear: photoEdit.academicYear,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          status: photoEdit.status,
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        }),
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      });
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      const j = await res.json();
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      if (!res.ok) throw new Error(j?.error);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      toast.success('Foto siswa berhasil diperbarui!');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      setPhotoEdit(null);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      refetch();
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    } catch (e: any) {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      toast.error(e?.message);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    } finally {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      setPhotoSaving(false);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    }
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  };
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const filtered = (data || []).filter((s) => {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    const okSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || (s.nis || '').includes(search);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    const okClass = classFilter === 'all' || s.className === classFilter;
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    return okSearch && okClass;
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  });
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const openEdit = (s: Student) => { setEditing(s); setForm({ nisn: s.nisn || '', nis: s.nis || '', name: s.name, photo: s.photo || '', gender: s.gender, className: s.className, academicYear: s.academicYear, status: s.status }); setOpen(true); };
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const save = async (e: React.FormEvent) => {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    e.preventDefault();
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    if (!form.name) { toast.error('Nama wajib diisi'); return; }
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    setSaving(true);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    try {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      const url = editing ? `/api/admin/students/${editing.id}` : '/api/admin/students';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      const method = editing ? 'PUT' : 'POST';
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      const json = await res.json();
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      if (!res.ok) throw new Error(json?.error || 'Gagal');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      toast.success(editing ? 'Siswa diperbarui' : 'Siswa ditambahkan');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      setOpen(false);
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      refetch();
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  };
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  const del = async (id: string) => {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    try {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      const res = await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      if (!res.ok) { const j = await res.json(); throw new Error(j?.error); }
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      toast.success('Siswa dihapus');
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      refetch();
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    } catch (e: any) { toast.error(e?.message); }
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  };
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  if (loading) return <Loader label="Memuat data siswa..." />;
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  if (error) return <EmptyState title="Gagal memuat" description={error} />;
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  return (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    <div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      <div className="flex items-center justify-between mb-5">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <h1 className="text-2xl font-bold text-foreground">Data Siswa</h1>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <p className="text-sm text-muted-foreground">{data?.length || 0} siswa terdaftar</p>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      <div className="flex flex-col sm:flex-row gap-2 mb-4">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <div className="relative flex-1">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau NIS..." className="pl-9" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <Select value={classFilter} onValueChange={setClassFilter}>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Kelas" /></SelectTrigger>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <SelectContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <SelectItem value="all">Semua Kelas</SelectItem>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            {['1','2','3','4','5','6'].map((c) => <SelectItem key={c} value={c}>Kelas {c}</SelectItem>)}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          </SelectContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        </Select>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/30 border border-accent-foreground/15 mb-4">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <ShieldCheck className="h-4 w-4 text-accent-foreground shrink-0 mt-0.5" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <p className="text-xs text-accent-foreground">Data siswa sensitif. Hanya admin yang dapat melihat data lengkap. NISN tidak ditampilkan ke publik.</p>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      <Card className="border-border shadow-sm">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <CardContent className="p-0">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <div className="overflow-x-auto custom-scroll max-h-[60vh]">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <table className="w-full text-sm">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <thead className="bg-muted/60 text-xs uppercase sticky top-0 z-10 shadow-sm">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <tr className="border-b-2 border-border">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-left p-3 font-semibold">#</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-center p-3 font-semibold w-14">Foto</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-left p-3 font-semibold">Nama</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-center p-3 font-semibold">L/P</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-center p-3 font-semibold">Kelas</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-left p-3 font-semibold hidden sm:table-cell">NIS</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-left p-3 font-semibold hidden md:table-cell">NISN</th>
                  <th className="text-left p-3 font-semibold hidden lg:table-cell">Tgl Lahir</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-center p-3 font-semibold">Status</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <th className="text-center p-3 font-semibold w-32">Aksi</th>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                </tr>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              </thead>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <tbody>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                {filtered.length === 0 ? (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <tr><td colSpan={9} className="text-center p-8 text-muted-foreground"><GraduationCap className="h-8 w-8 mx-auto mb-2 opacity-50" /> Tidak ada siswa</td></tr>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                ) : (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  filtered.map((s, i) => (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    <tr key={s.id} className={`border-b border-border/50 hover:bg-primary/5 transition-colors ${i % 2 === 1 ? 'bg-muted/30' : 'bg-background'}`}>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3 text-muted-foreground">{i + 1}</td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3 text-center">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                        <button onClick={() => openPhotoEdit(s)} className="relative group/photo inline-flex" title="Ganti Foto">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          {s.photo ? (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                            <img src={s.photo} alt={s.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-border group-hover/photo:ring-primary transition-all" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          ) : (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-border group-hover/photo:ring-primary transition-all ${s.gender === 'L' ? 'bg-primary/10 text-primary' : 'bg-gold/15 text-gold'}`}>{s.name.charAt(0)}</div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          )}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                            <Camera className="h-2.5 w-2.5" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          </span>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                        </button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      </td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3 font-medium">{s.name}</td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3 text-center">{s.gender}</td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3 text-center">{s.className}</td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3 hidden sm:table-cell text-xs font-mono">{s.nis || '-'}</td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3 hidden md:table-cell text-xs font-mono">{s.nisn || '-'}</td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3 text-center">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                        <span className={`px-2 py-0.5 rounded text-xs ${s.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-muted text-muted-foreground'}`}>{s.status}</span>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      </td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <td className="p-3">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                        <div className="flex items-center justify-center gap-1">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          <Button size="icon" variant="ghost" onClick={() => openPhotoEdit(s)} title="Ganti Foto"><Camera className="h-4 w-4" /></Button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          <Button size="icon" variant="ghost" onClick={() => openEdit(s)} title="Edit"><Pencil className="h-4 w-4" /></Button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          <AlertDialog>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                            <AlertDialogTrigger asChild>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                              <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                            </AlertDialogTrigger>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                            <AlertDialogContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                              <AlertDialogHeader>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                                <AlertDialogTitle>Hapus siswa?</AlertDialogTitle>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                                <AlertDialogDescription>Yakin ingin menghapus <span className="font-semibold">{s.name}</span>?</AlertDialogDescription>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                              </AlertDialogHeader>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                              <AlertDialogFooter>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                                <AlertDialogCancel>Batal</AlertDialogCancel>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                                <AlertDialogAction onClick={() => del(s.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                              </AlertDialogFooter>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                            </AlertDialogContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                          </AlertDialog>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                        </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      </td>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    </tr>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  ))
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                )}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              </tbody>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            </table>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        </CardContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      </Card>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      <Dialog open={open} onOpenChange={setOpen}>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <DialogHeader>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <DialogTitle>{editing ? 'Edit Siswa' : 'Tambah Siswa'}</DialogTitle>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <DialogDescription>Isi data kependudukan siswa.</DialogDescription>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          </DialogHeader>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <form onSubmit={save} className="space-y-4">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <ImageUpload label="Foto Siswa" value={form.photo} onChange={(v) => set('photo', v)} />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <Field label="Nama Lengkap" value={form.name} onChange={(v) => set('name', v)} required />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <div className="grid grid-cols-2 gap-3">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <Field label="NIS" value={form.nis} onChange={(v) => set('nis', v)} />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <Field label="NISN" value={form.nisn} onChange={(v) => set('nisn', v)} />
            <Field label="Tanggal Lahir" value={form.birthDate} onChange={(v) => set('birthDate', v)} type="date" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <div className="grid grid-cols-2 gap-3">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <div className="space-y-1.5">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <Label>Jenis Kelamin</Label>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <Select value={form.gender} onValueChange={(v) => set('gender', v)}>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <SelectTrigger><SelectValue /></SelectTrigger>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <SelectContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    <SelectItem value="L">Laki-laki</SelectItem>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    <SelectItem value="P">Perempuan</SelectItem>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  </SelectContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                </Select>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <div className="space-y-1.5">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <Label>Kelas</Label>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <Select value={form.className} onValueChange={(v) => set('className', v)}>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <SelectTrigger><SelectValue /></SelectTrigger>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <SelectContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    {['1','2','3','4','5','6'].map((c) => <SelectItem key={c} value={c}>Kelas {c}</SelectItem>)}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  </SelectContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                </Select>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <div className="grid grid-cols-2 gap-3">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <Field label="Tahun Pelajaran" value={form.academicYear} onChange={(v) => set('academicYear', v)} required />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <div className="space-y-1.5">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <Label>Status</Label>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <Select value={form.status} onValueChange={(v) => set('status', v)}>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <SelectTrigger><SelectValue /></SelectTrigger>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  <SelectContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    <SelectItem value="Aktif">Aktif</SelectItem>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    <SelectItem value="Lulus">Lulus</SelectItem>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    <SelectItem value="Pindah">Pindah</SelectItem>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  </SelectContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                </Select>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <DialogFooter>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            </DialogFooter>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          </form>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        </DialogContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      </Dialog>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      {/* Quick photo replace dialog */}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      <Dialog open={!!photoEdit} onOpenChange={(o) => !o && setPhotoEdit(null)}>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        <DialogContent className="max-w-md">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          <DialogHeader>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <DialogTitle className="flex items-center gap-2">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <Camera className="h-5 w-5 text-primary" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              Ganti Foto Siswa
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            </DialogTitle>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <DialogDescription>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              {photoEdit ? <>Unggah foto untuk <span className="font-semibold text-foreground">{photoEdit.name}</span> (Kelas {photoEdit.className}).</> : null}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            </DialogDescription>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          </DialogHeader>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          {photoEdit && (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            <div className="space-y-4">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <ImageUpload
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                label="Foto Siswa"
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                value={photoUrl}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                onChange={setPhotoUrl}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                placeholder="URL gambar atau upload dari komputer"
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <div className="rounded-lg bg-muted/50 border border-border p-3">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <p className="text-xs text-muted-foreground">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  💡 <span className="font-medium">Tips:</span> Gunakan foto portrait (rasio 3:4) yang jelas. Format JPG/PNG/WebP, maksimal 5MB. Foto siswa bersifat privat — hanya tampil di panel admin.
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                </p>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              <DialogFooter>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <Button type="button" variant="outline" onClick={() => setPhotoEdit(null)}>Batal</Button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                <Button type="button" onClick={savePhoto} disabled={photoSaving}>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  {photoSaving ? (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    <>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      Menyimpan...
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    </>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  ) : (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    <>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      <Save className="h-4 w-4" />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                      Simpan Foto
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                    </>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                  )}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:                </Button>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:              </DialogFooter>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:            </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:          )}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:        </DialogContent>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      </Dialog>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  );
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:}
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:function Field({ label, value, onChange, required, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  return (
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    <div className="space-y-1.5">
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:    </div>
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:  );
photo: s.photo || '',
    birthDate: s.birthDate || '', gender:}
