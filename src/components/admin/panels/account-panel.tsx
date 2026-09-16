'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useFetch } from '@/hooks/use-fetch';
import { Loader } from '@/components/site/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Mail,
  Lock,
  User,
  Shield,
  Save,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminInfo {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export function AccountPanel() {
  const { data: session, update: updateSession } = useSession();
  const { data: admin, loading, refetch } = useFetch<AdminInfo>('/api/admin/account');

  const [form, setForm] = useState({
    newName: '',
    newEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.currentPassword) {
      toast.error('Password saat ini wajib diisi untuk konfirmasi');
      return;
    }
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      toast.error('Konfirmasi password baru tidak cocok');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Gagal menyimpan');
      toast.success(json.message || 'Pengaturan akun berhasil diperbarui!');

      // If email or password changed, recommend re-login
      if (json.changedEmail || json.changedPassword) {
        toast.info('Email/password berubah. Silakan login kembali.');
        setTimeout(() => {
          signOut({ callbackUrl: '/' });
        }, 1500);
      } else {
        // Only name changed — update session and refetch
        refetch();
        setForm({
          newName: '',
          newEmail: '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Memuat data akun..." />;

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Pengaturan Akun
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola email, nama, dan password login administrator.
        </p>
      </div>

      {/* Current account info card */}
      <Card className="border-border shadow-sm mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Akun Saat Ini
          </CardTitle>
          <CardDescription>Informasi akun yang sedang login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow icon={User} label="Nama" value={admin?.name || session?.user?.name || '-'} />
            <InfoRow icon={Mail} label="Email" value={admin?.email || session?.user?.email || '-'} />
            <InfoRow icon={Shield} label="Role" value={admin?.role || 'admin'} />
            <InfoRow
              icon={Lock}
              label="Password"
              value="••••••••"
            />
          </div>
        </CardContent>
      </Card>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Profile section */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profil Admin
            </CardTitle>
            <CardDescription>Ubah nama dan email login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="space-y-1.5">
              <Label htmlFor="newName">Nama Baru</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newName"
                  value={form.newName}
                  onChange={(e) => set('newName', e.target.value)}
                  placeholder={admin?.name || 'Nama admin'}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground">Kosongkan jika tidak ingin mengubah nama</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="newEmail">Email Baru</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newEmail"
                  type="email"
                  value={form.newEmail}
                  onChange={(e) => set('newEmail', e.target.value)}
                  placeholder={admin?.email || 'email@contoh.com'}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Kosongkan jika tidak ingin mengubah email. Email digunakan untuk login.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Password section */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-primary" />
              Keamanan Password
            </CardTitle>
            <CardDescription>Ubah password login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {/* Current password (required for any change) */}
            <div className="space-y-1.5">
              <Label htmlFor="currentPassword">
                Password Saat Ini <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  type={showCurrent ? 'text' : 'password'}
                  value={form.currentPassword}
                  onChange={(e) => set('currentPassword', e.target.value)}
                  placeholder="Masukkan password saat ini"
                  className="pl-9 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showCurrent ? 'Sembunyikan' : 'Tampilkan'}
                >
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Wajib diisi untuk konfirmasi setiap perubahan
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* New password */}
              <div className="space-y-1.5">
                <Label htmlFor="newPassword">Password Baru</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type={showNew ? 'text' : 'password'}
                    value={form.newPassword}
                    onChange={(e) => set('newPassword', e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showNew ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Minimal 6 karakter</p>
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => set('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirm ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Ulangi password baru</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Penting</p>
            <p className="text-xs mt-0.5">
              Jika email atau password diubah, Anda akan otomatis keluar dan perlu login kembali
              dengan kredensial baru. Pastikan mencatat email & password baru sebelum menyimpan.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="outline" className="text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
                Keluar dari Akun
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Keluar dari akun?</AlertDialogTitle>
                <AlertDialogDescription>
                  Anda akan keluar dari panel admin dan perlu login kembali untuk mengakses dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={() => signOut({ callbackUrl: '/' })}>
                  Ya, Keluar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button type="submit" disabled={saving} className="sm:min-w-40">
            {saving ? (
              <>
                <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border">
      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm font-semibold text-foreground break-words">{value}</p>
      </div>
    </div>
  );
}
