'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useNav } from '@/lib/nav-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, LogIn, AlertCircle, ArrowLeft, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export function AdminLogin() {
  const { setPage, setAdminView } = useNav();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password wajib diisi');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (!res || res.error) {
        setError('Email atau password salah');
        toast.error('Login gagal. Periksa kredensial Anda.');
      } else {
        toast.success('Login berhasil! Selamat datang.');
        setAdminView('dashboard');
      }
    } catch (e: any) {
      setError(e?.message || 'Terjadi kesalahan');
      toast.error('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <Card className="border-border shadow-lg overflow-hidden">
          <div className="hero-gradient text-white p-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3">
              <ShieldCheck className="h-8 w-8 text-gold" />
            </div>
            <h1 className="text-xl font-bold">Login Administrator</h1>
            <p className="text-sm text-white/80 mt-1">SD Negeri 5 Gesing</p>
          </div>
          <CardContent className="p-6 lg:p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sdn5gesing.sch.id"
                    className="pl-9"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9"
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Masuk
                  </>
                )}
              </Button>
              <div className="text-center text-xs text-muted-foreground mt-3 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="font-semibold text-foreground mb-1">Akun Demo:</p>
                <p>Email: <span className="font-mono">admin@sdn5gesing.sch.id</span></p>
                <p>Password: <span className="font-mono">admin123</span></p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setPage('beranda')}
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
