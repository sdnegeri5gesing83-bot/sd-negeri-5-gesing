import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://my-project-topaz-kappa.vercel.app'),
  title: "SD Negeri 5 Gesing | Website Resmi Sekolah",
  description:
    "Website resmi SD Negeri 5 Gesing, Dinas Banjar Waru, Desa Gesing, Kecamatan Banjar, Kabupaten Buleleng, Provinsi Bali. Pusat informasi resmi sekolah untuk siswa, orang tua, guru, dan masyarakat.",
  keywords: [
    "SD Negeri 5 Gesing",
    "SDN 5 Gesing",
    "sekolah dasar Bali",
    "Buleleng",
    "Banjar",
    "Gesing",
    "website sekolah",
    "pendidikan Bali",
  ],
  authors: [{ name: "SD Negeri 5 Gesing" }],
  creator: "SD Negeri 5 Gesing",
  publisher: "SD Negeri 5 Gesing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/logo-school.png",
    apple: "/logo-school.png",
  },
  openGraph: {
    title: "SD Negeri 5 Gesing | Website Resmi Sekolah",
    description:
      "Pusat informasi resmi SD Negeri 5 Gesing untuk siswa, orang tua, guru, dan masyarakat.",
    siteName: "SD Negeri 5 Gesing",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/uploads/hero-signboard.jpg",
        width: 1200,
        height: 630,
        alt: "SD Negeri 5 Gesing - Papan Nama Sekolah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SD Negeri 5 Gesing | Website Resmi Sekolah",
    description: "Website resmi SD Negeri 5 Gesing, Buleleng, Bali.",
    images: ["/uploads/hero-signboard.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for Google (JSON-LD) - School schema
  const SITE_URL = 'https://my-project-topaz-kappa.vercel.app';
  const schoolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'SD Negeri 5 Gesing',
    alternateName: 'SDN 5 Gesing',
    description:
      'Website resmi SD Negeri 5 Gesing, Dinas Banjar Waru, Desa Gesing, Kecamatan Banjar, Kabupaten Buleleng, Provinsi Bali.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-school.png`,
    image: `${SITE_URL}/uploads/hero-signboard.jpg`,
    telephone: '08873886384',
    email: 'sdnegeri5gesing83@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Banjar Dinas Waru',
      addressLocality: 'Desa Gesing',
      addressRegion: 'Kecamatan Banjar',
      addressCountry: 'ID',
      postalCode: '81152',
      addressLocality2: 'Kabupaten Buleleng, Provinsi Bali',
    },
    areaServed: 'Buleleng, Bali, Indonesia',
    type: 'Elementary School',
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="b57KGnpg47mRa814YSXNrLD3EpnZ7HN65aZlZetZtNY" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
          <SonnerToaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
