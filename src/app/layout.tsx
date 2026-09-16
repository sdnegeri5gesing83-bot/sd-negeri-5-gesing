import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
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
  icons: {
    icon: "/logo-school.png",
  },
  openGraph: {
    title: "SD Negeri 5 Gesing | Website Resmi Sekolah",
    description:
      "Pusat informasi resmi SD Negeri 5 Gesing untuk siswa, orang tua, guru, dan masyarakat.",
    siteName: "SD Negeri 5 Gesing",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "SD Negeri 5 Gesing",
    description: "Website resmi SD Negeri 5 Gesing, Buleleng, Bali.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
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
