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
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Trash2, Eye, FileText, Download, Phone, Mail, MapPin, GraduationCap, User, Calendar, FileCheck2,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

interface PpdbDocument {
  id: string;
  fileName: string;
  fileId: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  requirementId: string;
  requirement?: { id: string; title: string; description?: string | null };
}

interface PpdbRegistration {
  id: string;
  childName: string;
  birthPlace?: string | null;
  birthDate?: string | null;
  parentName: string;
  parentPhone: string;
  parentEmail?: string | null;
  address?: string | null;
  notes?: string | null;
  status: string;
  createdAt: string;
  documents: PpdbDocument[];
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Menunggu', color: 'bg-amber-500/15 text-amber-700 dark:text-amber-400' },
  { value: 'reviewing', label: 'Sedang Ditinjau', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400' },
  { value: 'accepted', label: 'Diterima', color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' },
  { value: 'rejected', label: 'Ditolak', color: 'bg-rose-500/15 text-rose-700 dark:text-rose-400' },
];

function formatBytes(bytes: number): string {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const statusColor = (s: string) => STATUS_OPTIONS.find((o) => o.value === s)?.color || 'bg-muted text-muted-foreground';
const statusLabel = (s: string) => STATUS_OPTIONS.find((o) => o.value === s)?.label || s;

export function PpdbRegistrationsPanel() {
  const { data, loading, error, refetch } = useFetch<PpdbRegistration[]>('/api/admin/ppdb/registrations');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [detail, setDetail] = useState<PpdbRegistration | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const filtered = (data || []).filter((r) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      r.childName.toLowerCase().includes(q) ||
      r.parentName.toLowerCase().includes(q) ||
      r.parentPhone.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openDetail = (r: PpdbRegistration) => {
    setDetail(r);
    setDetailOpen(true);
  };

  const updateStatus = async (id: string, status: string) => {
    setSavingStatus(true);
    try {
      const res = await fetch(`/api/admin/ppdb/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error);
      // Update local detail and refetch list
      if (detail && detail.id === id) setDetail({ ...detail, status });
      refetch();
      toast.success('Status pendaftar diperbarui');
    } catch (e: any) { toast.error(e?.message); } finally { setSavingStatus(false); }
  };

  const del = async (id: string) => {
    try {
      const r = await fetch(`/api/admin/ppdb/registrations/${id}`, { method: 'DELETE' });
      if (!r.ok) { const j = await r.json(); throw new Error(j?.error); }
      toast.success('Pendaftar dihapus');
      if (detail && detail.id === id) {
        setDetail(null);
        setDetailOpen(false);
      }
      refetch();
    } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat pendaftar PPDB..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pendaftar PPDB</h1>
          <p className="text-sm text-muted-foreground">{data?.length || 0} pendaftar</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Cari nama / telepon / ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="reviewing">Sedang Ditinjau</SelectItem>
              <SelectItem value="accepted">Diterima</SelectItem>
              <SelectItem value="rejected">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <EmptyState
            title={data?.length === 0 ? 'Belum ada pendaftar' : 'Tidak ada hasil'}
            description={data?.length === 0 ? 'Pendaftaran online akan tampil di sini.' : 'Coba ubah filter pencarian.'}
          />
        ) : (
          filtered.map((r) => (
            <Card key={r.id} className="border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 flex-wrap">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge className={`text-[10px] ${statusColor(r.status)}`}>
                        {statusLabel(r.status)}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {r.documents.length} berkas
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(r.createdAt), 'd MMM yyyy, HH:mm', { locale: idLocale })}
                      </span>
                    </div>
                    <p className="font-semibold text-foreground">{r.childName}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Ortu: <span className="text-foreground/80">{r.parentName}</span> • {r.parentPhone}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1 font-mono truncate" title={r.id}>
                      ID: {r.id}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => openDetail(r)}>
                      <Eye className="h-4 w-4" /> Detail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto custom-scroll">
          <DialogHeader>
            <DialogTitle>Detail Pendaftar</DialogTitle>
            <DialogDescription>
              Data lengkap pendaftar dan dokumen yang diunggah.
            </DialogDescription>
          </DialogHeader>
          {detail && (
            <div className="space-y-5">
              {/* Status & ID */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`text-[10px] ${statusColor(detail.status)}`}>
                    {statusLabel(detail.status)}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    ID: {detail.id}
                  </span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" /> Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus pendaftar?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Yakin ingin menghapus pendaftar <span className="font-semibold">{detail.childName}</span>?
                        Semua berkas yang diunggah juga akan dihapus permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => del(detail.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Update Status */}
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <Label className="text-sm font-semibold mb-2 block">Ubah Status</Label>
                <Select
                  value={detail.status}
                  onValueChange={(v) => updateStatus(detail.id, v)}
                  disabled={savingStatus}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data Calon Siswa */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Data Calon Siswa
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <DetailField label="Nama Lengkap" value={detail.childName} />
                  <DetailField label="Tempat Lahir" value={detail.birthPlace || '-'} />
                  <DetailField label="Tanggal Lahir" value={detail.birthDate || '-'} />
                </div>
              </div>

              {/* Data Orang Tua */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Data Orang Tua / Wali
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <DetailField label="Nama Lengkap" value={detail.parentName} />
                  <DetailField label="Telepon / WA" value={detail.parentPhone} icon={<Phone className="h-3.5 w-3.5" />} link={`tel:${detail.parentPhone}`} />
                  <DetailField label="Email" value={detail.parentEmail || '-'} icon={<Mail className="h-3.5 w-3.5" />} link={detail.parentEmail ? `mailto:${detail.parentEmail}` : undefined} />
                  <DetailField label="Alamat" value={detail.address || '-'} icon={<MapPin className="h-3.5 w-3.5" />} />
                </div>
                {detail.notes && (
                  <div className="mt-3">
                    <Label className="text-xs text-muted-foreground">Catatan</Label>
                    <p className="text-sm text-foreground/90 whitespace-pre-line p-3 rounded-lg bg-muted/40 border border-border">
                      {detail.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Uploaded Documents */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-primary" />
                  Berkas Diunggah ({detail.documents.length})
                </h3>
                {detail.documents.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-4 text-center border border-dashed border-border rounded-lg">
                    Tidak ada berkas diunggah.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {detail.documents.map((d) => (
                      <div
                        key={d.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/30 transition-colors"
                      >
                        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {d.requirement?.title || 'Syarat'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate" title={d.fileName}>
                            {d.fileName} • {formatBytes(d.fileSize)} • {d.fileType || 'file'}
                          </p>
                        </div>
                        <a
                          href={`/api/file/${d.fileId}`}
                          target="_blank"
                          rel="noreferrer"
                          download={d.fileName}
                          className="shrink-0"
                        >
                          <Button size="sm" variant="outline" type="button">
                            <Download className="h-4 w-4" /> Unduh
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDetailOpen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailField({
  label,
  value,
  icon,
  link,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  link?: string;
}) {
  const content = (
    <div className="p-3 rounded-lg border border-border bg-muted/20">
      <Label className="text-[11px] text-muted-foreground">{label}</Label>
      <p className="text-sm text-foreground/90 mt-0.5 flex items-center gap-1.5 break-words">
        {icon}
        {value}
      </p>
    </div>
  );
  if (link) {
    return (
      <a href={link} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }
  return content;
}
