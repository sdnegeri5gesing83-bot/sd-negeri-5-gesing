'use client';

import { useNav } from '@/lib/nav-store';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { HomeSection } from '@/components/sections/home-section';
import { ProfileSection } from '@/components/sections/profile-section';
import { GtkSection } from '@/components/sections/gtk-section';
import { StudentsSection } from '@/components/sections/students-section';
import { SarprasSection } from '@/components/sections/sarpras-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { ContactSection } from '@/components/sections/contact-section';
import { AdminWrapper } from '@/components/admin/admin-wrapper';

export default function Home() {
  const { page } = useNav();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {page === 'beranda' && <HomeSection />}
        {page === 'profil' && <ProfileSection />}
        {page === 'gtk' && <GtkSection />}
        {page === 'siswa' && <StudentsSection />}
        {page === 'sarpras' && <SarprasSection />}
        {page === 'galeri' && <GallerySection />}
        {page === 'kontak' && <ContactSection />}
        {page === 'admin' && <AdminWrapper />}
      </main>
      <Footer />
    </div>
  );
}
