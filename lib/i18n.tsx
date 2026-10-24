"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "id";

const dict: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",

    // Hero
    "hero.status": "OPEN TO WORK · BANDAR LAMPUNG, ID · REMOTE-FRIENDLY",
    "hero.role1": "Computer Science Graduate",
    "hero.role2": "Backend Engineer · Go & Laravel",
    "hero.role3": "Building payment & workflow systems",
    "hero.role4": "Full Stack · React, Next.js, Svelte",
    "hero.viewProjects": "View Projects",
    "hero.github": "GitHub",

    // About
    "about.label": "About",
    "about.heading": "How I build",
    "about.subheading": "Full-Stack Engineering Focus",
    "about.p1":
      "I'm a Computer Science graduate and Full-Stack Engineer who builds end-to-end web applications—pairing responsive, interactive frontends (React 19, Next.js, Svelte, TypeScript, Tailwind CSS) with reliable backends (Go, Laravel 12, PostgreSQL, Redis) where data integrity matters.",
    "about.p2":
      "I built Saidata, an e-Government portal for Universitas Lampung featuring an interactive React 19 + Inertia.js interface, multi-stage approval workflows, QR-verified PDFs, and CAS SSO. I also built DoriPay, a PPOB payment platform combining a reactive SvelteKit storefront and dashboard with an idempotent Go payment engine.",
    "about.stat.projects": "Full-Stack Projects",
    "about.stat.stacks": "Full-Stack Tracks",
    "about.stat.providers": "Integrated Providers",
    "about.focusTitle": "Core Focus",
    "about.focusDesc": "Full-Stack Web Engineering",
    "about.stackTitle": "Primary Stack",
    "about.stackDesc": "React, Next.js, Svelte, Go, Laravel, PostgreSQL",
    "about.pillar1.title": "Backend & API Systems",
    "about.pillar1.desc":
      "Building high-concurrency API services, multi-stage workflows, and idempotent payment transactions using Go, Laravel 12, and REST/gRPC.",
    "about.pillar2.title": "Database & Caching",
    "about.pillar2.desc":
      "Designing clean relational schemas, row-level locks, indexes, and Redis caching layers for strong data consistency and fast queries.",
    "about.pillar3.title": "Frontend & UI Engineering",
    "about.pillar3.desc":
      "Crafting interactive, responsive user interfaces, dashboards, and reactive state flows using React 19, Next.js, SvelteKit, TypeScript, and Tailwind CSS.",
    "about.pillar4.title": "DevOps & Architecture",
    "about.pillar4.desc":
      "Containerizing full-stack environments with Docker, integrating third-party webhooks, and designing type-safe service contracts.",

    // Status
    "status.liveTime": "Bandar Lampung, ID",

    // Projects
    "projects.label": "Projects",
    "projects.heading": "Featured Projects",
    "projects.subheading":
      "A selection of coding projects I built to solve real workflows and payment reliability challenges.",
    "projects.searchPlaceholder": "Search projects or tech...",
    "projects.all": "All",
    "projects.readCaseStudy": "Read Case Study",
    "projects.liveDemo": "Live Demonstration",
    "projects.empty": "No projects match your current search criteria.",
    "projects.overview": "Overview",
    "projects.problem": "The Problem",
    "projects.solution": "The Solution",
    "projects.architecture": "System Architecture",
    "projects.challenges": "Challenges & Learnings",
    "projects.techStack": "Technology Stack",
    "projects.engChallenge": "Engineering Challenge:",
    "projects.keyTakeaway": "Key Takeaway:",

    // Experience
    "experience.label": "Experience",
    "experience.heading": "Experience & Organizations",
    "experience.subheading":
      "Explore my 3D timeline—tilt cards with your cursor and flip any card in 3D to inspect full responsibilities.",
    "experience.filterAll": "All",
    "experience.filterWork": "Internship",
    "experience.filterLeadership": "Leadership",
    "experience.filterTeaching": "Teaching",
    "experience.flipToDetails": "Flip 3D Details",
    "experience.flipToFront": "Flip Back",
    "experience.latest": "LATEST",
    "experience.responsibilities": "Key Responsibilities",

    // Contact
    "contact.label": "Contact",
    "contact.heading": "Say Hello & Guestbook",
    "contact.subheading":
      "Leave a message in the guestbook, copy my direct email, or connect with me via your preferred social media channels.",
    "contact.directChannels": "Direct Channels",
    "contact.directDesc":
      "Copy my direct email address below or connect with me via social handles.",
    "contact.copyEmail": "Copy Email",
    "contact.writeNew": "Write New Message",
    "contact.writeDesc":
      "Have feedback, suggestions, or just want to say hello? Send your message to this guestbook.",
    "contact.yourName": "Your Name",
    "contact.namePlaceholder": "Your name/alias...",
    "contact.yourMessage": "Your Message",
    "contact.messagePlaceholder": "Write your message here...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.feed": "Message Feed",
    "contact.feedHidden": "Message Feed Hidden",
    "contact.feedClick": "Click below to load visitor messages.",
    "contact.openFeed": "Open Feed",
    "contact.close": "Close",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.top": "Top",
    "footer.visits": "Visits",
    "footer.online": "Online",
  },
  id: {
    // Nav
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",

    // Hero
    "hero.status": "TERBUKA UNTUK KERJA · BANDAR LAMPUNG, ID · BISA REMOTE",
    "hero.role1": "Lulusan Ilmu Komputer",
    "hero.role2": "Backend Engineer · Go & Laravel",
    "hero.role3": "Membangun sistem pembayaran & alur kerja",
    "hero.role4": "Full Stack · React, Next.js, Svelte",
    "hero.viewProjects": "Lihat Proyek",
    "hero.github": "GitHub",

    // About
    "about.label": "Tentang",
    "about.heading": "Cara saya membangun",
    "about.subheading": "Fokus Rekayasa Full-Stack",
    "about.p1":
      "Saya lulusan Ilmu Komputer dan Full-Stack Engineer yang membangun aplikasi web secara menyeluruh (end-to-end)—memadukan antarmuka frontend yang interaktif dan responsif (React 19, Next.js, Svelte, TypeScript, Tailwind CSS) dengan sistem backend yang andal (Go, Laravel 12, PostgreSQL, Redis).",
    "about.p2":
      "Saya membangun Saidata, portal e-Government Universitas Lampung dengan antarmuka interaktif React 19 + Inertia.js, alur persetujuan bertahap, PDF berverifikasi QR, dan SSO CAS. Saya juga membangun DoriPay, platform pembayaran PPOB yang menggabungkan antarmuka reaktif SvelteKit dengan mesin pembayaran Go yang idempoten.",
    "about.stat.projects": "Proyek Full-Stack",
    "about.stat.stacks": "Jalur Full-Stack",
    "about.stat.providers": "Penyedia Terintegrasi",
    "about.focusTitle": "Fokus Utama",
    "about.focusDesc": "Rekayasa Web Full-Stack",
    "about.stackTitle": "Stack Utama",
    "about.stackDesc": "React, Next.js, Svelte, Go, Laravel, PostgreSQL",
    "about.pillar1.title": "Backend & API Systems",
    "about.pillar1.desc":
      "Membangun layanan API berkinerja tinggi, alur kerja bertahap, dan transaksi pembayaran idempoten dengan Go, Laravel 12, serta REST/gRPC.",
    "about.pillar2.title": "Database & Caching",
    "about.pillar2.desc":
      "Merancang struktur relasional bersih, row-level locking, indeks, dan lapisan caching Redis untuk konsistensi data tinggi dan query cepat.",
    "about.pillar3.title": "Frontend & UI Engineering",
    "about.pillar3.desc":
      "Merancang antarmuka pengguna yang interaktif, dashboard responsif, dan manajemen state reaktif menggunakan React 19, Next.js, SvelteKit, TypeScript, dan Tailwind CSS.",
    "about.pillar4.title": "DevOps & Architecture",
    "about.pillar4.desc":
      "Menjalankan containerisasi aplikasi full-stack dengan Docker, integrasi webhook pihak ketiga, dan kontrak layanan tipe-aman.",

    // Status
    "status.liveTime": "Bandar Lampung, ID",

    // Projects
    "projects.label": "Proyek",
    "projects.heading": "Proyek Pilihan",
    "projects.subheading":
      "Koleksi proyek rekayasa perangkat lunak untuk otomasi alur kerja dan keandalan sistem pembayaran.",
    "projects.searchPlaceholder": "Cari proyek atau teknologi...",
    "projects.all": "Semua",
    "projects.readCaseStudy": "Baca Studi Kasus",
    "projects.liveDemo": "Demo Langsung",
    "projects.empty": "Tidak ada proyek yang sesuai dengan pencarian Anda.",
    "projects.overview": "Ringkasan",
    "projects.problem": "Masalah",
    "projects.solution": "Solusi",
    "projects.architecture": "Arsitektur Sistem",
    "projects.challenges": "Tantangan & Pelajaran",
    "projects.techStack": "Tumpukan Teknologi",
    "projects.engChallenge": "Tantangan Rekayasa:",
    "projects.keyTakeaway": "Pelajaran Utama:",

    // Experience
    "experience.label": "Pengalaman",
    "experience.heading": "Pengalaman & Organisasi",
    "experience.subheading":
      "Telusuri linimasa 3D—arahkan kursor untuk efek tilt 3D dan balik kartu untuk membaca rincian tanggung jawab.",
    "experience.filterAll": "Semua",
    "experience.filterWork": "Magang",
    "experience.filterLeadership": "Organisasi",
    "experience.filterTeaching": "Akademik",
    "experience.flipToDetails": "Balik Kartu 3D",
    "experience.flipToFront": "Kembali",
    "experience.latest": "TERBARU",
    "experience.responsibilities": "Tanggung Jawab Utama",

    // Contact
    "contact.label": "Kontak",
    "contact.heading": "Sapa Saya & Buku Tamu",
    "contact.subheading":
      "Tinggalkan pesan di buku tamu, salin email langsung saya, atau terhubung melalui kanal sosial pilihan Anda.",
    "contact.directChannels": "Kanal Langsung",
    "contact.directDesc":
      "Salin alamat email langsung di bawah atau hubungi saya lewat akun sosial.",
    "contact.copyEmail": "Salin Email",
    "contact.writeNew": "Tulis Pesan Baru",
    "contact.writeDesc":
      "Punya masukan, saran, atau sekadar ingin menyapa? Kirim pesan Anda ke buku tamu ini.",
    "contact.yourName": "Nama Anda",
    "contact.namePlaceholder": "Nama atau alias Anda...",
    "contact.yourMessage": "Pesan Anda",
    "contact.messagePlaceholder": "Tulis pesan Anda di sini...",
    "contact.send": "Kirim Pesan",
    "contact.sending": "Mengirim...",
    "contact.feed": "Pesan Masuk",
    "contact.feedHidden": "Pesan Disembunyikan",
    "contact.feedClick": "Klik di bawah untuk memuat pesan pengunjung.",
    "contact.openFeed": "Buka Pesan",
    "contact.close": "Tutup",

    // Footer
    "footer.rights": "Hak cipta dilindungi.",
    "footer.top": "Atas",
    "footer.visits": "Kunjungan",
    "footer.online": "Aktif",
  },
};

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // Read persisted/browser language after mount (SSR-safe: first render is always "en").
    // Deferred to avoid a synchronous setState inside the effect body.
    const id = setTimeout(() => {
      try {
        const saved = localStorage.getItem("ebimsa-lang") as Lang | null;
        if (saved === "en" || saved === "id") {
          setLangState(saved);
        } else if (navigator.language && navigator.language.toLowerCase().startsWith("id")) {
          setLangState("id");
        }
      } catch {
        // Ignore localStorage access issues
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("ebimsa-lang", newLang);
    } catch {
      // Ignore
    }
  };

  const t = (key: string): string => {
    return dict[lang]?.[key] || dict["en"]?.[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  return useContext(I18nContext);
}
