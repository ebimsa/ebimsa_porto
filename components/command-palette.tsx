"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SearchGlassIllustration,
  CompassIllustration,
  TeamUsersIllustration,
  BrowserCodeIllustration,
  GradCapIllustration,
  MailboxIllustration,
  SunIllustration,
  MoonIllustration,
  FlagEN,
  FlagID,
  DocCaseStudyIllustration,
  CloseIconIllustration,
  ArrowRightIllustration,
} from "@/components/ui-icons";
import { TechIcon } from "@/components/tech-icons";
import { useTheme } from "./theme-provider";
import { useT } from "@/lib/i18n";

function GitHubActionIcon({ className }: { className?: string }) {
  return <TechIcon name="GitHub" className={className} />;
}

type CommandAction = {
  id: string;
  label: string;
  group: string;
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  onSelect: () => void;
};

export function CommandPalette() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isId = lang === "id";

  const scrollTo = (hash: string) => {
    setOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.assign(`/${hash}`);
    }
  };

  const actions: CommandAction[] = [
    {
      id: "nav-home",
      label: isId ? "Ke Beranda (Hero)" : "Go to Home (Hero)",
      group: isId ? "Navigasi" : "Navigation",
      icon: CompassIllustration,
      onSelect: () => scrollTo("#home"),
    },
    {
      id: "nav-about",
      label: isId ? "Ke Bagian Tentang (01)" : "Go to About (01)",
      group: isId ? "Navigasi" : "Navigation",
      icon: TeamUsersIllustration,
      onSelect: () => scrollTo("#about"),
    },
    {
      id: "nav-projects",
      label: isId ? "Ke Bagian Proyek (02)" : "Go to Projects (02)",
      group: isId ? "Navigasi" : "Navigation",
      icon: BrowserCodeIllustration,
      onSelect: () => scrollTo("#projects"),
    },
    {
      id: "nav-experience",
      label: isId ? "Ke Bagian Pengalaman (03)" : "Go to Experience (03)",
      group: isId ? "Navigasi" : "Navigation",
      icon: GradCapIllustration,
      onSelect: () => scrollTo("#experience"),
    },
    {
      id: "nav-contact",
      label: isId ? "Ke Bagian Kontak & Buku Tamu (04)" : "Go to Contact & Guestbook (04)",
      group: isId ? "Navigasi" : "Navigation",
      icon: MailboxIllustration,
      onSelect: () => scrollTo("#contact"),
    },
    {
      id: "pref-lang",
      label: isId ? "Ganti Bahasa ke Inggris (EN)" : "Switch Language to Indonesian (ID)",
      group: isId ? "Preferensi" : "Preferences",
      shortcut: "EN/ID",
      icon: isId ? FlagEN : FlagID,
      onSelect: () => {
        setLang(lang === "en" ? "id" : "en");
        setOpen(false);
      },
    },
    {
      id: "pref-theme",
      label:
        theme === "light"
          ? isId
            ? "Ganti ke Mode Gelap"
            : "Switch to Dark Mode"
          : isId
          ? "Ganti ke Mode Terang"
          : "Switch to Light Mode",
      group: isId ? "Preferensi" : "Preferences",
      icon: theme === "light" ? MoonIllustration : SunIllustration,
      onSelect: () => {
        setTheme(theme === "light" ? "dark" : "light");
        setOpen(false);
      },
    },
    {
      id: "cv-en",
      label: isId ? "Unduh CV (Bahasa Inggris - PDF)" : "Download CV (English - PDF)",
      group: isId ? "Dokumen & Tautan" : "Documents & Links",
      icon: DocCaseStudyIllustration,
      onSelect: () => {
        window.open("/CV_Enggal_Bima_Sakti_EN.pdf", "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    },
    {
      id: "cv-id",
      label: isId ? "Unduh CV (Bahasa Indonesia - PDF)" : "Download CV (Indonesian - PDF)",
      group: isId ? "Dokumen & Tautan" : "Documents & Links",
      icon: DocCaseStudyIllustration,
      onSelect: () => {
        window.open("/CV_Enggal_Bima_Sakti_ID.pdf", "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    },
    {
      id: "link-github",
      label: isId ? "Buka Profil GitHub (@ebimsa)" : "Open GitHub Profile (@ebimsa)",
      group: isId ? "Dokumen & Tautan" : "Documents & Links",
      icon: GitHubActionIcon,
      onSelect: () => {
        window.open("https://github.com/ebimsa", "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) {
            setQuery("");
            setActiveIndex(0);
          }
          return next;
        });
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    const onCustomOpen = () => {
      setQuery("");
      setActiveIndex(0);
      setOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(id);
    }
  }, [open]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filtered[activeIndex] ?? filtered[0];
      target?.onSelect();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-background/75 backdrop-blur-sm z-[200]"
          />

          <div className="fixed inset-0 z-[210] flex items-start justify-center pt-[14vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.16 }}
              role="dialog"
              aria-modal="true"
              aria-label="Command Palette"
              className="pointer-events-auto w-full max-w-lg rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60">
                <SearchGlassIllustration className="w-4 h-4 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder={
                    isId
                      ? "Ketik perintah atau cari tujuan..."
                      : "Type a command or search destination..."
                  }
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
                  aria-label="Close command palette"
                >
                  <CloseIconIllustration className="w-4 h-4" />
                </button>
              </div>

              {/* Action List */}
              <div className="max-h-[320px] overflow-y-auto p-2 no-scrollbar space-y-1">
                {filtered.length === 0 ? (
                  <div className="py-10 text-center text-xs font-mono text-muted-foreground">
                    {isId ? "Tidak ada perintah yang cocok." : "No matching commands found."}
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const Icon = item.icon;
                    const active = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={item.onSelect}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                          active
                            ? "bg-primary/15 text-primary font-bold"
                            : "text-foreground hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {item.group}
                          </span>
                          {active && <ArrowRightIllustration className="w-3.5 h-3.5 opacity-90" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer Hints */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border/50 bg-muted/30 text-[10px] font-mono text-muted-foreground">
                <span>↑↓ {isId ? "navigasi" : "navigate"} · ↵ {isId ? "pilih" : "select"}</span>
                <span>ESC {isId ? "tutup" : "close"}</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
