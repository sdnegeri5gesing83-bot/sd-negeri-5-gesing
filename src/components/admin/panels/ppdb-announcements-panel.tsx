'use client';

import { useState, useRef } from 'react';
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
import { Plus, Pencil, Trash2, Megaphone, Calendar, FileText, Download, Upload, Loader2, ImageIcon, FileSpreadsheet, FileType, File } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { useSession } from 'next-auth/react';

interface PpdbAnnouncement {
  id: string;
  title: string;
  content: string;
  photo?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileType?: string | null;
  date: string;
  published: boolean;
  order: number;
}

const empty = { title: '', content: '', photo: '', fileUrl: '', fileName: '', fileType: '', date: format(new Date(), 'yyyy-MM-dd'), published: true, order: 0 };

function getFileIcon(type?: string | null) {
  if (!type) return File;
  if (type.includes('image')) return ImageIcon;
  if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return FileSpreadsheet;
  if (type.includes('pdf')) return FileType;
  return FileText;
}

export function PpdbAnnouncementsPanel() {
  const { data: session } = useSession();
  const { data, loading, error, refetch } = useFetch<PpdbAnnouncement[]>('/api/admin/ppdb-announcements');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PpdbAnnouncement | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (a: PpdbAnnouncement) => {
    setEditing(a);
    setForm({ title: a.title, content: a.content, photo: a.photo || '', fileUrl: a.fileUrl || '', fileName: a.fileName || '', fileType: a.fileType || '', date: format(new Date(a.date), 'yyyy-MM-dd'), published: a.published, order: a.order });
    setOpen(true);
  };
  const set = (k: keyof typeof empty, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const handlePhotoUpload = async (file: File) => {
    if (!session) { toast.error('Login dulu'); return; }
    setUploadingPhoto(true);
    try {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      set('photo', j.url);
      toast.success('Foto terunggah');
    } catch (e: any) { toast.error(e?.message); }
    finally { setUploadingPhoto(false); }
  };

  const handleFileUpload = async (file: File) => {
    if (!session) { toast.error('Login dulu'); return; }
    setUploadingFile(true);
    try {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/admin/upload-file', { method: 'POST', body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      set('fileUrl', j.url);
      set('fileName', j.fileName);
      set('fileType', j.fileType);
      toast.success(`${j.fileName} terunggah`);
    } catch (e: any) { toast.error(e?.message); }
    finally { setUploadingFile(false); }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) { toast.error('Judul dan konten wajib diisi'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/ppdb-announcements/${editing.id}` : '/api/admin/ppdb-announcements';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      toast.success(editing ? 'Pengumuman PPDB diperbarui' : 'Pengumuman PPDB ditambahkan');
      setOpen(false); refetch();
    } catch (e: any) { toast.error(e?.message); } finally { setSaving(false); }
  };

  const del = async (id: string) => {
    try { const r = await fetch(`/api/admin/ppdb-announcements/${id}`, { method: 'DELETE' }); if (!r.ok) { const j = await r.json(); throw new Error(j?.error); } toast.success('Pengumuman dihapus'); refetch(); } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat pengumuman PPDB..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pengumuman Penerimaan PPDB</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} pengumuman</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Tambah</Button>
      </div>

      <div className="space-y-3">
        {(data || []).map((a) => {
          const FileIcon = getFileIcon(a.fileType);
          return (
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
                    {a.fileName && (
                      <Badge variant="outline" className="text-[10px] gap-1">
                        <FileIcon className="h-3 w-3" />
                        {a.fileName}
                      </Badge>
                    )}
                  </div>
                  <p className="font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.content}</p>
                  {a.fileUrl && (
                    <a href={a.fileUrl} download={a.fileName || undefined} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1">
                      <Download className="h-3 w-3" /> Download file
                    </a>
                  )}
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
          );
        })}
        {data?.length === 0 && <EmptyState title="Belum ada pengumuman PPDB" />}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader><DialogTitle>{editing ? 'Edit Pengumuman PPDB' : 'Tambah Pengumuman PPDB'}</DialogTitle><DialogDescription>Isi pengumuman penerimaan peserta didik baru.</DialogDescription></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            {/* Photo upload */}
            <div className="space-y-1.5">
              <Label>Foto (opsional)</Label>
              <div className="flex gap-2">
                <Input value={form.photo} onChange={(e) => set('photo', e.target.value)} placeholder="URL foto atau upload" className="flex-1" />
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); e.target.value = ''; }} />
                <Button type="button" variant="outline" size="icon" disabled={uploadingPhoto} onClick={() => photoRef.current?.click()}>
                  {uploadingPhoto ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                </Button>
              </div>
              {form.photo && <img src={form.photo} alt="Preview" className="h-24 w-full object-cover rounded-lg border border-border" />}
            </div>

            {/* File upload (Excel, PDF, Word) */}
            <div className="space-y-1.5">
              <Label>Lampiran File — Excel/PDF/Word (opsional)</Label>
              <div className="flex gap-2">
                <Input value={form.fileName} onChange={(e) => { set('fileName', e.target.value); set('fileUrl', ''); }} placeholder="Upload file atau ketik nama" className="flex-1" />
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv,.pdf,.doc,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); e.target.value = ''; }} />
                <Button type="button" variant="outline" size="icon" disabled={uploadingFile} onClick={() => fileRef.current?.click()}>
                  {uploadingFile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Format: .xlsx, .xls, .csv, .pdf, .doc, .docx (max 10MB)</p>
              {form.fileUrl && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 border border-border">
                  {(() => { const FI = getFileIcon(form.fileType); return <FI className="h-4 w-4 text-primary" />; })()}
                  <span className="text-xs font-medium text-foreground truncate flex-1">{form.fileName}</span>
                  <Badge variant="outline" className="text-[10px]">{form.fileType?.split('/')[1]?.toUpperCase() || 'FILE'}</Badge>
                </div>
              )}
            </div>

            <div className="space-y-1.5"><Label>Tanggal</Label><Input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Judul <span className="text-destructive">*</span></Label><Input value={form.title} onChange={(e) => set('title', e.target.value)} required /></div>
            <div className="space-y-1.5"><Label>Konten <span className="text-destructive">*</span></Label><Textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={4} required /></div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40">
              <Switch checked={form.published} onCheckedChange={(v) => set('published', v)} id="pub-ppdb" />
              <Label htmlFor="pub-ppdb" className="cursor-pointer">Terbitkan pengumuman</Label>
            </div>
            <DialogFooter><Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button><Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
