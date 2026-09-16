'use client';

import { useState, useMemo } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { SectionHeader, Loader, EmptyState } from '@/components/site/ui';
import {
  Users,
  UserCheck,
  UserPlus,
  Search,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  Info,
} from 'lucide-react';
import type {
  StudentSummary,
  StudentByClass,
  StudentByYear,
  Student,
} from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function StudentsSection() {
  const { data: summary, loading: sLoading } = useFetch<StudentSummary>('/api/public/students/summary');
  const { data: byClass } = useFetch<StudentByClass[]>('/api/public/students/by-class');
  const { data: byYear } = useFetch<StudentByYear[]>('/api/public/students/by-year');
  const { data: students, loading: stLoading } = useFetch<Student[]>('/api/public/students');

  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');

  const classes = ['all', '1', '2', '3', '4', '5', '6'];

  const filteredStudents = useMemo(() => {
    if (!students) return [];
    const q = search.toLowerCase().trim();
    return students.filter((s) => {
      const okClass = classFilter === 'all' || s.className === classFilter;
      const okSearch = !q || s.name.toLowerCase().includes(q);
      return okClass && okSearch;
    });
  }, [students, search, classFilter]);

  const maxClassTotal = Math.max(1, ...(byClass || []).map((c) => c.total));

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl hero-gradient text-white mb-10">
          <div className="relative px-6 py-10 lg:px-12 lg:py-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] bg-white/15 px-3 py-1 rounded-full mb-3">
              Data Siswa
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Dashboard Data Siswa
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl">
              Ringkasan data kependudukan siswa SD Negeri 5 Gesing. Data pribadi sensitif
              tidak ditampilkan secara publik.
            </p>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/40 border border-accent-foreground/15 mb-8">
          <ShieldCheck className="h-5 w-5 text-accent-foreground shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-accent-foreground">
            Demi privasi siswa, data sensitif seperti NISN lengkap dan alamat tidak ditampilkan
            publik. Administrator sekolah dapat mengelola data lengkap melalui panel admin.
          </p>
        </div>

        {/* Summary cards */}
        {sLoading ? (
          <Loader label="Memuat ringkasan..." />
        ) : summary ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mb-8">
            <SummaryCard
              icon={Users}
              label="Total Siswa Aktif"
              value={summary.total}
              accent="primary"
            />
            <SummaryCard
              icon={UserCheck}
              label="Siswa Laki-laki"
              value={summary.male}
              accent="primary"
            />
            <SummaryCard
              icon={UserPlus}
              label="Siswa Perempuan"
              value={summary.female}
              accent="gold"
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* By Class */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-5 lg:p-6">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Data per Kelas
              </h3>
              {byClass && byClass.length > 0 ? (
                <div className="space-y-3">
                  {byClass.map((c) => (
                    <div key={c.className} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">Kelas {c.className}</span>
                        <span className="text-muted-foreground">
                          {c.male} L · {c.female} P · <span className="font-semibold text-foreground">{c.total}</span>
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden flex">
                        <div
                          className="bg-primary h-full transition-all"
                          style={{ width: `${(c.male / maxClassTotal) * 100}%` }}
                          title={`Laki-laki: ${c.male}`}
                        />
                        <div
                          className="bg-gold h-full transition-all"
                          style={{ width: `${(c.female / maxClassTotal) * 100}%` }}
                          title={`Perempuan: ${c.female}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada data.</p>
              )}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-primary" /> Laki-laki
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-gold" /> Perempuan
                </span>
              </div>
            </CardContent>
          </Card>

          {/* By Year */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-5 lg:p-6">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Data per Tahun Pelajaran
              </h3>
              {byYear && byYear.length > 0 ? (
                <div className="overflow-x-auto custom-scroll">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tahun Pelajaran</TableHead>
                        <TableHead className="text-right">L</TableHead>
                        <TableHead className="text-right">P</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {byYear.map((y) => (
                        <TableRow key={y.academicYear}>
                          <TableCell className="font-medium">{y.academicYear}</TableCell>
                          <TableCell className="text-right">{y.male}</TableCell>
                          <TableCell className="text-right">{y.female}</TableCell>
                          <TableCell className="text-right font-bold">{y.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada data.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Students table */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Daftar Siswa Aktif
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama siswa..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 sm:w-56"
                  />
                </div>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="sm:w-32">
                    <SelectValue placeholder="Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c === 'all' ? 'Semua Kelas' : `Kelas ${c}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-3">
              Menampilkan <span className="font-semibold text-foreground">{filteredStudents.length}</span> siswa.
              NISN disembunyikan sebagian demi privasi.
            </p>

            {stLoading ? (
              <Loader label="Memuat daftar siswa..." />
            ) : filteredStudents.length === 0 ? (
              <EmptyState title="Tidak ada siswa" description="Coba ubah filter pencarian." />
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="max-h-[480px] overflow-y-auto custom-scroll">
                  <Table>
                    <TableHeader className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm shadow-sm">
                      <TableRow className="border-b-2 border-border hover:bg-transparent">
                        <TableHead className="w-10 py-3 text-xs uppercase tracking-wide">#</TableHead>
                        <TableHead className="py-3 text-xs uppercase tracking-wide">Nama</TableHead>
                        <TableHead className="text-center py-3 text-xs uppercase tracking-wide w-14">L/P</TableHead>
                        <TableHead className="text-center py-3 text-xs uppercase tracking-wide w-16">Kelas</TableHead>
                        <TableHead className="py-3 text-xs uppercase tracking-wide w-24">NIS</TableHead>
                        <TableHead className="py-3 text-xs uppercase tracking-wide w-28">NISN</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((s, i) => (
                        <TableRow key={s.id} className={`border-b border-border/50 hover:bg-primary/5 transition-colors ${i % 2 === 1 ? 'bg-muted/40' : 'bg-background'}`}>
                          <TableCell className="text-muted-foreground text-xs py-3 tabular-nums">{i + 1}</TableCell>
                          <TableCell className="font-medium text-sm py-3 whitespace-nowrap">{s.name}</TableCell>
                          <TableCell className="text-center py-3">
                            <Badge
                              variant="outline"
                              className={
                                s.gender === 'L'
                                  ? 'border-primary/40 text-primary'
                                  : 'border-gold/60 text-gold'
                              }
                            >
                              {s.gender === 'L' ? 'L' : 'P'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center text-sm py-3 font-medium">{s.className}</TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono py-3">{s.nis || '-'}</TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono py-3">
                            {s.nisn ? `••••${s.nisn.slice(-4)}` : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent: 'primary' | 'gold';
}) {
  return (
    <Card className={`relative overflow-hidden border-border shadow-sm ${accent === 'gold' ? 'ring-1 ring-gold/30' : ''}`}>
      <div className={`absolute inset-x-0 top-0 h-1 ${accent === 'gold' ? 'bg-gold' : 'bg-primary'}`} />
      <CardContent className="pt-6 pb-6 px-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-3xl lg:text-4xl font-bold text-foreground mt-1">{value}</p>
          </div>
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${accent === 'gold' ? 'bg-gold/15 text-gold' : 'bg-primary/10 text-primary'}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
