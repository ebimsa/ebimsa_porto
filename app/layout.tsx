import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : `https://${process.env.NEXT_PUBLIC_SITE_URL}`)
  : "https://ebimsa.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ebimsa | Software Engineer",
  description: "Portofolio resmi Enggal Bima Sakti (Ebimsa) — Software Engineer dan Full Stack Developer dari Bandar Lampung. Lihat proyek, pengalaman, dan hubungi langsung.",
  keywords: [
    "Ebimsa",
    "Enggal Bima Sakti",
    "Ebimsa Portfolio",
    "Software Engineer",
    "Full Stack Developer",
    "Bandar Lampung Developer",
    "Indonesia Developer",
    "Computer Science Student",
    "Next.js Developer"
  ],
  authors: [{ name: "Enggal Bima Sakti", url: siteUrl }],
  creator: "Enggal Bima Sakti",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    title: "ebimsa | Software Engineer",
    description: "Portofolio resmi Enggal Bima Sakti (Ebimsa) — Software Engineer dan Full Stack Developer dari Bandar Lampung. Lihat proyek, pengalaman, dan hubungi langsung.",
    siteName: "ebimsa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "ebimsa - Official Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ebimsa | Software Engineer",
    description: "Portofolio resmi Enggal Bima Sakti (Ebimsa) — Software Engineer dan Full Stack Developer dari Bandar Lampung. Lihat proyek, pengalaman, dan hubungi langsung.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/ebimsa.png",
    shortcut: "/ebimsa.png",
    apple: "/ebimsa.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <ThemeProvider defaultTheme="system" storageKey="ebimsa-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
