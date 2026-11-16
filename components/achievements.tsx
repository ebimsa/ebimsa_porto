"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ExternalLink, MapPin, Sparkles, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

const PIMNAS_PHOTOS = [
  {
    src: "/pimnas-1.jpg",
    captionEn: "Universitas Lampung Delegation — Favorite Award PKM-KC 2 at PIMNAS 39",
    captionId: "Tim Universitas Lampung — Juara Favorit PKM-KC 2 pada PIMNAS ke-39",
  },
  {
    src: "/pimnas-2.jpg",
    captionEn: "Closing Ceremony & Awarding Stage — PIMNAS 39 (2026)",
    captionId: "Panggung Closing Ceremony & Awarding — PIMNAS ke-39 Tahun 2026",
  },
];

export function Achievements() {
  const { lang, t } = useT();
  const isId = lang === "id";
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextPhoto = () => setActivePhoto((p) => (p + 1) % PIMNAS_PHOTOS.length);
  const prevPhoto = () => setActivePhoto((p) => (p - 1 + PIMNAS_PHOTOS.length) % PIMNAS_PHOTOS.length);

  return (
    <section
      id="achievements"
      className="relative py-24 overflow-hidden border-t border-border/40 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">
        <SectionHeading
          title={t("achievements.heading")}
          subtitle={t("achievements.subheading")}
        />

        {/* Featured PIMNAS 39 Achievement Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-5 sm:p-8 shadow-sm hover:border-primary/40 transition-colors squircle-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Photo Gallery */}
            <div className="lg:col-span-6 space-y-3">
              <div
                onClick={() => setLightboxOpen(true)}
                className="group relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border bg-muted cursor-pointer"
                title={isId ? "Klik untuk memperbesar foto" : "Click to enlarge photo"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={PIMNAS_PHOTOS[activePhoto].src}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={PIMNAS_PHOTOS[activePhoto].src}
                      alt={isId ? PIMNAS_PHOTOS[activePhoto].captionId : PIMNAS_PHOTOS[activePhoto].captionEn}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1e293b]/85 border border-[#fbbf24]/50 text-[10px] font-bold text-[#fbbf24] backdrop-blur-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>PIMNAS 39 · 2026</span>
                </div>

                {/* Carousel Controls */}
                <div
                  className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                    className="pointer-events-auto w-8 h-8 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    aria-label="Next photo"
                    className="pointer-events-auto w-8 h-8 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Selector & Caption */}
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] text-muted-foreground font-medium truncate">
                  {isId ? PIMNAS_PHOTOS[activePhoto].captionId : PIMNAS_PHOTOS[activePhoto].captionEn}
                </p>
                <div className="flex items-center gap-1.5 shrink-0">
                  {PIMNAS_PHOTOS.map((photo, idx) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setActivePhoto(idx)}
                      className={cn(
                        "relative w-12 h-8 rounded-md overflow-hidden border transition-all cursor-pointer",
                        activePhoto === idx
                          ? "border-primary ring-2 ring-primary/25"
                          : "border-border opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={photo.src}
                        alt={`PIMNAS thumbnail ${idx + 1}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Award Details */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#fbbf24]/15 border border-[#fbbf24]/35 text-[11px] font-bold text-amber-600 dark:text-[#fbbf24]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isId ? "Juara Favorit Nasional" : "National Favorite Award"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Nov 2026</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground leading-snug">
                  {isId
                    ? "Juara Favorit PIMNAS ke-39 Tahun 2026 – PKM-KC 2 (Karsa Cipta)"
                    : "Favorite Award – 39th National Student Scientific Week (PIMNAS 2026), PKM-KC 2"}
                </h3>

                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isId
                      ? "Belmawa, Ditjen Dikti, Kemdiktisaintek · Indonesia"
                      : "Ditjen Dikti, Kemdiktisaintek · Indonesia"}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-muted/40 space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  ResQ-NET
                </p>
                <p className="text-xs sm:text-sm text-foreground font-semibold leading-relaxed">
                  {isId
                    ? "Sistem Komunikasi Taktis Mandiri Berbasis LoRa Mesh Network dan Passive WiFi Sniffing untuk Operasi SAR di Area Blank Spot"
                    : "An Independent Tactical Communication System Based on LoRa Mesh Network and Passive WiFi Sniffing for Search and Rescue Operations in Network Blackout Areas"}
                </p>
              </div>

              <ul className="space-y-2 list-disc pl-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <li className="marker:text-primary">
                  {isId
                    ? "Berperan sebagai Software Developer yang mengembangkan protokol komunikasi biner serta integrasi komunikasi antarperangkat ESP32."
                    : "Served as Software Developer, designing binary communication protocols and ESP32 device-to-device communication integration."}
                </li>
                <li className="marker:text-primary">
                  {isId
                    ? "Membangun Dashboard Command Center untuk pemantauan lokasi korban dan tim SAR secara real-time tanpa koneksi internet."
                    : "Built the Dashboard Command Center for real-time monitoring of victim and SAR team locations without internet connectivity."}
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://resq-net.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-logo-glossy inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isId ? "Kunjungi ResQ-NET" : "Visit ResQ-NET"}</span>
                </a>
                <Link
                  href="/projects/resqnet"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:border-primary/40 text-xs font-bold text-foreground transition-colors"
                >
                  <span>{t("projects.readCaseStudy")}</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal for Photos */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-border bg-card shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close lightbox"
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:text-primary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={PIMNAS_PHOTOS[activePhoto].src}
                  alt={isId ? PIMNAS_PHOTOS[activePhoto].captionId : PIMNAS_PHOTOS[activePhoto].captionEn}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <div className="px-4 py-3 bg-card border-t border-border flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-foreground">
                  {isId ? PIMNAS_PHOTOS[activePhoto].captionId : PIMNAS_PHOTOS[activePhoto].captionEn}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevPhoto}
                    className="p-1.5 rounded-lg border border-border hover:bg-muted cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    className="p-1.5 rounded-lg border border-border hover:bg-muted cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
