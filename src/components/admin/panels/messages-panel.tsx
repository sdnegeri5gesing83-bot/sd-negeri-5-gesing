'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader, EmptyState } from '@/components/site/ui';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Mail, MailOpen, Trash2, Reply } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import type { ContactMessage } from '@/lib/types';

export function MessagesPanel() {
  const { data, loading, error, refetch } = useFetch<ContactMessage[]>('/api/admin/messages');
  const [open, setOpen] = useState<ContactMessage | null>(null);

  const toggleRead = async (m: ContactMessage) => {
    try {
      const res = await fetch(`/api/admin/messages/${m.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !m.read }),
      });
      if (!res.ok) throw new Error('Gagal');
      toast.success(m.read ? 'Ditandai belum dibaca' : 'Ditandai sudah dibaca');
      refetch();
      setOpen((o) => (o && o.id === m.id ? { ...o, read: !o.read } : o));
    } catch (e: any) { toast.error(e?.message); }
  };

  const del = async (id: string) => {
    try {
      const r = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('Gagal');
      toast.success('Pesan dihapus');
      setOpen(null);
      refetch();
    } catch (e: any) { toast.error(e?.message); }
  };

  if (loading) return <Loader label="Memuat pesan..." />;
  if (error) return <EmptyState title="Gagal memuat" description={error} />;

  const unread = (data || []).filter((m) => !m.read).length;

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">Pesan Masuk</h1>
        <p className="text-sm text-muted-foreground">{data?.length || 0} pesan · {unread} belum dibaca</p>
      </div>

      {data?.length === 0 ? (
        <EmptyState title="Belum ada pesan" description="Pesan dari pengunjung akan muncul di sini." />
      ) : (
        <div className="space-y-3">
          {(data || []).map((m) => (
            <Card key={m.id} className={`border-border shadow-sm ${!m.read ? 'ring-1 ring-primary/20' : ''}`}>
              <CardContent className="p-4 flex items-start gap-3 cursor-pointer" onClick={() => { setOpen(m); if (!m.read) toggleRead(m); }}>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${m.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                  {m.read ? <MailOpen className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {!m.read && <Badge className="text-[10px] bg-primary text-primary-foreground">Baru</Badge>}
                    <span className="text-xs text-muted-foreground">{format(new Date(m.createdAt), 'd MMM yyyy, HH:mm', { locale: idLocale })}</span>
                  </div>
                  <p className={`text-sm ${m.read ? 'font-medium' : 'font-bold'} text-foreground line-clamp-1`}>{m.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-medium">{m.name}</span> &lt;{m.email}&gt;
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.message}</p>
                </div>
                <div className="flex flex-col gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button size="icon" variant="ghost" onClick={() => toggleRead(m)} title={m.read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}>
                    {m.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>Hapus pesan?</AlertDialogTitle><AlertDialogDescription>Pesan dari <span className="font-semibold">{m.name}</span> akan dihapus permanen.</AlertDialogDescription></AlertDialogHeader>
                      <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={() => del(m.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction></AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-lg">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{open.subject}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground">{open.name}</span>
                  <span>&lt;{open.email}&gt;</span>
                  <span>·</span>
                  <span>{format(new Date(open.createdAt), 'd MMM yyyy, HH:mm', { locale: idLocale })}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-muted/40 p-4 text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
                {open.message}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <a href={`mailto:${open.email}?subject=Re: ${encodeURIComponent(open.subject)}`}>
                  <Button><Reply className="h-4 w-4" /> Balas via Email</Button>
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
