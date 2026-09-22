bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '','use client';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { useState } from 'react';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { useFetch } from '@/hooks/use-fetch';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { Loader, EmptyState } from '@/components/site/ui';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { Button } from '@/components/ui/button';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { Input } from '@/components/ui/input';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { Label } from '@/components/ui/label';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { Textarea } from '@/components/ui/textarea';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { Card, CardContent } from '@/components/ui/card';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  Dialog,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  DialogContent,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  DialogHeader,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  DialogTitle,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  DialogDescription,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  DialogFooter,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',} from '@/components/ui/dialog';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  Select,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  SelectContent,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  SelectItem,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  SelectTrigger,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  SelectValue,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',} from '@/components/ui/select';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { Plus, Pencil, Trash2, Search, Users, Camera, Save } from 'lucide-react';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { toast } from 'sonner';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import type { Teacher } from '@/lib/types';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',import { ImageUpload } from '../image-upload';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',const empty: Omit<Teacher, 'id' | 'order'> = {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  name: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  photo: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  nip: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  nuptk: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  position: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  education: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  subject: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  category: 'Guru',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  gender: 'L',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  phone: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  email: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  bio: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  birthDate: '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',};
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',export function TeachersPanel() {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const { data, loading, error, refetch } = useFetch<Teacher[]>('/api/admin/teachers');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const [open, setOpen] = useState(false);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const [editing, setEditing] = useState<Teacher | null>(null);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const [form, setForm] = useState<typeof empty>(empty);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const [saving, setSaving] = useState(false);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const [search, setSearch] = useState('');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const [photoEdit, setPhotoEdit] = useState<Teacher | null>(null);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const [photoUrl, setPhotoUrl] = useState('');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const [photoSaving, setPhotoSaving] = useState(false);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const openPhotoEdit = (t: Teacher) => {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setPhotoEdit(t);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setPhotoUrl(t.photo || '');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  };
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const savePhoto = async () => {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    if (!photoEdit) return;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setPhotoSaving(true);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    try {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      const res = await fetch(`/api/admin/teachers/${photoEdit.id}`, {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        method: 'PUT',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        headers: { 'Content-Type': 'application/json' },
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        body: JSON.stringify({
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          name: photoEdit.name,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          photo: photoUrl,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          nip: photoEdit.nip || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          nuptk: photoEdit.nuptk || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          position: photoEdit.position,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          education: photoEdit.education,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          subject: photoEdit.subject || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          category: photoEdit.category,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          gender: photoEdit.gender,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          phone: photoEdit.phone || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          email: photoEdit.email || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          bio: photoEdit.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        }),
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      });
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      const j = await res.json();
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      if (!res.ok) throw new Error(j?.error);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      toast.success('Foto GTK berhasil diperbarui!');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      setPhotoEdit(null);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      refetch();
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    } catch (e: any) {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      toast.error(e?.message);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    } finally {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      setPhotoSaving(false);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    }
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  };
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const filtered = (data || []).filter((t) =>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.position.toLowerCase().includes(search.toLowerCase())
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  );
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const openNew = () => {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setEditing(null);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setForm(empty);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setOpen(true);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  };
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const openEdit = (t: Teacher) => {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setEditing(t);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setForm({ ...empty, ...t });
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setOpen(true);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  };
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const save = async (e: React.FormEvent) => {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    e.preventDefault();
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    if (!form.name || !form.position || !form.education) {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      toast.error('Nama, jabatan, dan pendidikan wajib diisi');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      return;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    }
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    setSaving(true);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    try {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      const url = editing ? `/api/admin/teachers/${editing.id}` : '/api/admin/teachers';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      const method = editing ? 'PUT' : 'POST';
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      const res = await fetch(url, {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        method,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        headers: { 'Content-Type': 'application/json' },
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        body: JSON.stringify(form),
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      });
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      const json = await res.json();
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      if (!res.ok) throw new Error(json?.error || 'Gagal menyimpan');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      toast.success(editing ? 'GTK diperbarui' : 'GTK ditambahkan');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      setOpen(false);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      refetch();
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    } catch (e: any) {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      toast.error(e?.message);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    } finally {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      setSaving(false);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    }
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  };
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  const del = async (id: string) => {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    try {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      const res = await fetch(`/api/admin/teachers/${id}`, { method: 'DELETE' });
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      if (!res.ok) {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        const j = await res.json();
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        throw new Error(j?.error || 'Gagal menghapus');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      }
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      toast.success('GTK dihapus');
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      refetch();
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    } catch (e: any) {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      toast.error(e?.message);
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    }
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  };
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  if (loading) return <Loader label="Memuat data GTK..." />;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  if (error) return <EmptyState title="Gagal memuat" description={error} />;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  return (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    <div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      <div className="flex items-center justify-between mb-5">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          <h1 className="text-2xl font-bold text-foreground">Guru & Tenaga Kependidikan</h1>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          <p className="text-sm text-muted-foreground">{data?.length || 0} GTK terdaftar</p>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <Button onClick={openNew}>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          <Plus className="h-4 w-4" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          Tambah
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        </Button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      <div className="relative mb-4">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama/jabatan..." className="pl-9 max-w-sm" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      <Card className="border-border shadow-sm">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <CardContent className="p-0">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          <div className="overflow-x-auto custom-scroll">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <table className="w-full text-sm">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <thead className="bg-muted/50 text-xs uppercase">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                <tr>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <th className="text-left p-3 font-semibold">Nama</th>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <th className="text-left p-3 font-semibold">Jabatan</th>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <th className="text-left p-3 font-semibold hidden sm:table-cell">Kategori</th>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <th className="text-left p-3 font-semibold hidden md:table-cell">Pendidikan</th>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <th className="text-center p-3 font-semibold w-32">Aksi</th>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                </tr>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              </thead>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <tbody>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                {filtered.length === 0 ? (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <tr><td colSpan={5} className="text-center p-8 text-muted-foreground"><Users className="h-8 w-8 mx-auto mb-2 opacity-50" /> Belum ada data GTK</td></tr>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                ) : (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  filtered.map((t) => (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    <tr key={t.id} className="border-t border-border hover:bg-muted/30">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      <td className="p-3">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                        <div className="flex items-center gap-2">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                          <button onClick={() => openPhotoEdit(t)} className="relative group/photo shrink-0" title="Ganti Foto">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            {t.photo ? (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                              <img src={t.photo} alt={t.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-border group-hover/photo:ring-primary transition-all" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            ) : (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                              <div className="h-9 w-9 rounded-full bg-teal-soft/60 flex items-center justify-center text-xs font-bold text-primary ring-2 ring-border group-hover/photo:ring-primary transition-all">{t.name.charAt(0)}</div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            )}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                              <Camera className="h-2.5 w-2.5" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            </span>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                          </button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                          <div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            <p className="font-medium text-foreground">{t.name}</p>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            <p className="text-xs text-muted-foreground">{t.nip || 'NIP -'}</p>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                          </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                        </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      </td>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      <td className="p-3">{t.position}</td>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      <td className="p-3 hidden sm:table-cell">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                        <span className={`px-2 py-0.5 rounded text-xs ${t.category === 'Guru' ? 'bg-primary/10 text-primary' : 'bg-gold/15 text-gold'}`}>{t.category}</span>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      </td>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      <td className="p-3 hidden md:table-cell text-muted-foreground">{t.education}</td>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      <td className="p-3">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                        <div className="flex items-center justify-center gap-1">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                          <Button size="icon" variant="ghost" onClick={() => openPhotoEdit(t)} title="Ganti Foto"><Camera className="h-4 w-4" /></Button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                          <Button size="icon" variant="ghost" onClick={() => openEdit(t)} title="Edit"><Pencil className="h-4 w-4" /></Button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                          <AlertDialog>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            <AlertDialogTrigger asChild>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                              <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            </AlertDialogTrigger>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            <AlertDialogContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                              <AlertDialogHeader>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                                <AlertDialogTitle>Hapus GTK?</AlertDialogTitle>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                                <AlertDialogDescription>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                                  Yakin ingin menghapus <span className="font-semibold">{t.name}</span>? Tindakan ini tidak dapat dibatalkan.
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                                </AlertDialogDescription>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                              </AlertDialogHeader>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                              <AlertDialogFooter>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                                <AlertDialogCancel>Batal</AlertDialogCancel>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                                <AlertDialogAction onClick={() => del(t.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                              </AlertDialogFooter>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                            </AlertDialogContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                          </AlertDialog>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                        </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      </td>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    </tr>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  ))
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                )}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              </tbody>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </table>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        </CardContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      </Card>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      <Dialog open={open} onOpenChange={setOpen}>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scroll">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          <DialogHeader>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <DialogTitle>{editing ? 'Edit GTK' : 'Tambah GTK'}</DialogTitle>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <DialogDescription>Isi data guru atau tenaga kependidikan.</DialogDescription>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          </DialogHeader>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          <form onSubmit={save} className="space-y-4">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <ImageUpload label="Foto" value={form.photo || ''} onChange={(v) => set('photo', v)} />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <div className="grid grid-cols-2 gap-3">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Field label="Nama Lengkap (dengan gelar)" value={form.name} onChange={(v) => set('name', v)} required />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Field label="NIP" value={form.nip || ''} onChange={(v) => set('nip', v)} />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Field label="NUPTK" value={form.nuptk || ''} onChange={(v) => set('nuptk', v)} />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
            <div className="grid grid-cols-2 gap-3"><Field label="Tanggal Lahir" value={form.birthDate} onChange={(v) => set('birthDate', v)} type="date" /></div>
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Field label="Jabatan" value={form.position} onChange={(v) => set('position', v)} required />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <div className="grid grid-cols-2 gap-3">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <div className="space-y-1.5">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                <Label>Kategori</Label>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                <Select value={form.category} onValueChange={(v) => set('category', v)}>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <SelectTrigger><SelectValue /></SelectTrigger>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <SelectContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    <SelectItem value="Guru">Guru</SelectItem>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    <SelectItem value="Tenaga Kependidikan">Tenaga Kependidikan</SelectItem>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  </SelectContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                </Select>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <div className="space-y-1.5">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                <Label>Jenis Kelamin</Label>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                <Select value={form.gender} onValueChange={(v) => set('gender', v)}>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <SelectTrigger><SelectValue /></SelectTrigger>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  <SelectContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    <SelectItem value="L">Laki-laki</SelectItem>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    <SelectItem value="P">Perempuan</SelectItem>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  </SelectContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                </Select>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <div className="grid grid-cols-2 gap-3">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Field label="Pendidikan Terakhir" value={form.education} onChange={(v) => set('education', v)} required />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Field label="Tugas / Bidang" value={form.subject || ''} onChange={(v) => set('subject', v)} />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <div className="grid grid-cols-2 gap-3">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Field label="Telepon" value={form.phone || ''} onChange={(v) => set('phone', v)} />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Field label="Email" value={form.email || ''} onChange={(v) => set('email', v)} type="email" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <Field label="Bio Singkat" value={form.bio || ''} onChange={(v) => set('bio', v)} textarea rows={3} />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <DialogFooter>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Button type="submit" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</Button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </DialogFooter>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          </form>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        </DialogContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      </Dialog>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      {/* Quick photo replace dialog */}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      <Dialog open={!!photoEdit} onOpenChange={(o) => !o && setPhotoEdit(null)}>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <DialogContent className="max-w-md">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          <DialogHeader>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <DialogTitle className="flex items-center gap-2">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <Camera className="h-5 w-5 text-primary" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              Ganti Foto GTK
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </DialogTitle>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <DialogDescription>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              {photoEdit ? <>Unggah foto riil untuk <span className="font-semibold text-foreground">{photoEdit.name}</span>. Foto akan tampil di halaman publik GTK dan Struktur Organisasi.</> : null}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </DialogDescription>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          </DialogHeader>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          {photoEdit && (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            <div className="space-y-4">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <ImageUpload
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                label="Foto Guru / Tenaga Kependidikan"
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                value={photoUrl}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                onChange={setPhotoUrl}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                placeholder="URL gambar atau upload dari komputer"
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <div className="rounded-lg bg-muted/50 border border-border p-3">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                <p className="text-xs text-muted-foreground">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  💡 <span className="font-medium">Tips:</span> Gunakan foto portrait (rasio 3:4) yang jelas, formal, dan ramah. Format JPG/PNG/WebP, maksimal 5MB.
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                </p>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              <DialogFooter>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                <Button type="button" variant="outline" onClick={() => setPhotoEdit(null)}>Batal</Button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                <Button type="button" onClick={savePhoto} disabled={photoSaving}>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  {photoSaving ? (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    <>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      Menyimpan...
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    </>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  ) : (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    <>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      <Save className="h-4 w-4" />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                      Simpan Foto
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                    </>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                  )}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',                </Button>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',              </DialogFooter>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',            </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',          )}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        </DialogContent>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      </Dialog>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  );
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',function Field({
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  label,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  value,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  onChange,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  required,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  type = 'text',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  textarea,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  rows,
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',}: {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  label: string;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  value: string;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  onChange: (v: string) => void;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  required?: boolean;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  type?: string;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  textarea?: boolean;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  rows?: number;
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',}) {
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  return (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    <div className="space-y-1.5">
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      {textarea ? (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows || 3} required={required} />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      ) : (
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',        <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',      )}
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',    </div>
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',  );
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',bio: t.bio || '',
bio: photoEdit.bio || '',
          birthDate: photoEdit.birthDate || '',    birthDate: t.birthDate || '',}
