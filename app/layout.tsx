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

export const metadata: Metadata = {
  metadataBase: new URL("https://ebimsa.com"),
  title: "ebimsa | Software Engineer & AI Enthusiast",
  description: "Portfolio of Enggal Bima Sakti (Ebimsa), a Computer Science Student, Full Stack Developer, and AI enthusiast from Indonesia building intelligent software with elegant engineering.",
  keywords: [
    "Ebimsa",
    "Enggal Bima Sakti",
    "Portfolio",
    "Software Engineer",
    "Full Stack Developer",
    "AI Enthusiast",
    "Indonesia Developer",
    "Computer Science Student",
    "Next.js Developer"
  ],
  authors: [{ name: "Enggal Bima Sakti", url: "https://ebimsa.com" }],
  creator: "Enggal Bima Sakti",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ebimsa.com",
    title: "ebimsa | Software Engineer & AI Enthusiast",
    description: "Building intelligent software with elegant engineering. Portfolio of Enggal Bima Sakti (Ebimsa).",
    siteName: "Ebimsa Portfolio",
    images: [
      {
        url: "/ebimsa.png",
        width: 512,
        height: 512,
        alt: "Ebimsa Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ebimsa | Software Engineer & AI Enthusiast",
    description: "Building intelligent software with elegant engineering. Portfolio of Enggal Bima Sakti (Ebimsa).",
    images: ["/ebimsa.png"],
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
