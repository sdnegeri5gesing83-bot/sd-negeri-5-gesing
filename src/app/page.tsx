'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNav } from '@/lib/nav-store';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { HomeSection } from '@/components/sections/home-section';
import { ProfileSection } from '@/components/sections/profile-section';
import { GtkSection } from '@/components/sections/gtk-section';
import { StudentsSection } from '@/components/sections/students-section';
import { SarprasSection } from '@/components/sections/sarpras-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { PpdbSection } from '@/components/sections/ppdb-section';
import { ContactSection } from '@/components/sections/contact-section';
import { AdminWrapper } from '@/components/admin/admin-wrapper';

function PageContent() {
  const { page, setPage } = useNav();
  const searchParams = useSearchParams();

  useEffect(() => {
    const adminParam = searchParams.get('admin');
    if (adminParam === 'login' || adminParam === 'dashboard') {
      setPage('admin');
    }
  }, [searchParams, setPage]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      {/* Banner image below navbar */}
      {page !== 'admin' && (
        <div className="relative w-full h-[120px] sm:h-[160px] lg:h-[200px] overflow-hidden">
          <img
            src="/uploads/banner-sekolah.jpg"
            alt="SD Negeri 5 Gesing - Ilustrasi sekolah"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          {/* Logo Kurikulum Merdeka - top right */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-4 z-10">
            <img
              src="/uploads/logo-merdeka.png"
              alt="Kurikulum Merdeka - Merdeka Belajar"
              className="h-12 sm:h-16 lg:h-20 w-auto object-contain drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))' }}
            />
          </div>
        </div>
      )}
      <main className="flex-1">
        {page === 'beranda' && <HomeSection />}
        {page === 'profil' && <ProfileSection />}
        {page === 'gtk' && <GtkSection />}
        {page === 'siswa' && <StudentsSection />}
        {page === 'sarpras' && <SarprasSection />}
        {page === 'galeri' && <GallerySection />}
        {page === 'ppdb' && <PpdbSection />}
        {page === 'kontak' && <ContactSection />}
        {page === 'admin' && <AdminWrapper />}
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>}>
      <PageContent />
    </Suspense>
  );
}
