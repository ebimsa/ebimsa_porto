"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { PROJECTS_DATA, type Project } from "@/lib/projects";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { TechBadge } from "@/components/tech-icons";
import {
  DocCaseStudyIllustration,
  EyeIllustration,
  ArchitectureNodesIllustration,
  ShieldAlertIllustration,
  CompassIllustration,
  LightbulbIdeaIllustration,
  PuzzlePieceIllustration,
  ServerRackIllustration,
  DatabaseCylinderIllustration,
  BrowserCodeIllustration,
  ArrowRightIllustration,
  ExternalLinkIllustration,
  CloseIconIllustration,
} from "@/components/ui-icons";
import { cn } from "@/lib/utils";

function ProjectArchitectureBlueprint({
  projectId,
  isId,
}: {
  projectId: "saidata" | "doripay" | "rasi" | "resqnet";
  isId: boolean;
}) {
  if (projectId === "saidata") {
    return (
      <div className="w-full h-full p-3 sm:p-4 flex flex-col justify-between bg-card text-foreground select-none">
        <div className="flex items-center justify-between border-b border-border/80 pb-2 text-[10px]">
          <span className="text-[#52519e] dark:text-[#9493d9] font-bold">TOPOLOGY :: SAIDATA</span>
          <span className="text-muted-foreground text-[9px]">CAS 2.0 SSO</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2 text-center">
          <div className="p-2 rounded-lg border border-border bg-muted/60 flex flex-col items-center justify-center gap-1">
            <BrowserCodeIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-foreground">React 19</span>
            <span className="text-[8px] text-muted-foreground">Inertia / Vite</span>
          </div>
          <div className="p-2 rounded-lg border border-[#8584cc]/60 bg-muted/60 flex flex-col items-center justify-center gap-1">
            <ServerRackIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-[#52519e] dark:text-[#9493d9]">Laravel 12</span>
            <span className="text-[8px] text-muted-foreground">Octane RoadRunner</span>
          </div>
          <div className="p-2 rounded-lg border border-border bg-muted/60 flex flex-col items-center justify-center gap-1">
            <DatabaseCylinderIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-foreground">PostgreSQL</span>
            <span className="text-[8px] text-muted-foreground">JSONB + GIN Index</span>
          </div>
        </div>
        <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">
            {isId ? "Alur Pengesahan" : "Workflow"}
          </span>
          <span className="font-bold text-[#4d6639] dark:text-[#b0c59c] text-[9px] sm:text-[10px]">
            {isId ? "Multi-Stage + QR Verifikasi" : "Multi-Stage + QR Signed"}
          </span>
        </div>
      </div>
    );
  }

  if (projectId === "rasi") {
    return (
      <div className="w-full h-full p-3 sm:p-4 flex flex-col justify-between bg-card text-foreground select-none">
        <div className="flex items-center justify-between border-b border-border/80 pb-2 text-[10px]">
          <span className="text-[#52519e] dark:text-[#9493d9] font-bold">TOPOLOGY :: RASI</span>
          <span className="text-muted-foreground text-[9px]">Hackathon UI</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2 text-center">
          <div className="p-2 rounded-lg border border-border bg-muted/60 flex flex-col items-center justify-center gap-1">
            <BrowserCodeIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-foreground">Next.js</span>
            <span className="text-[8px] text-muted-foreground">App Router</span>
          </div>
          <div className="p-2 rounded-lg border border-[#8584cc]/60 bg-muted/60 flex flex-col items-center justify-center gap-1">
            <ServerRackIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-[#52519e] dark:text-[#9493d9]">TypeScript</span>
            <span className="text-[8px] text-muted-foreground">Adaptive UI</span>
          </div>
          <div className="p-2 rounded-lg border border-border bg-muted/60 flex flex-col items-center justify-center gap-1">
            <DatabaseCylinderIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-foreground">Unit Tests</span>
            <span className="text-[8px] text-muted-foreground">Verified Metrics</span>
          </div>
        </div>
        <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">
            {isId ? "Fokus Riset" : "Research Flow"}
          </span>
          <span className="font-bold text-[#4d6639] dark:text-[#b0c59c] text-[9px] sm:text-[10px]">
            {isId ? "4 Tahap + Radar Pasar" : "4-Stage + Market Radar"}
          </span>
        </div>
      </div>
    );
  }

  if (projectId === "resqnet") {
    return (
      <div className="w-full h-full p-3 sm:p-4 flex flex-col justify-between bg-card text-foreground select-none">
        <div className="flex items-center justify-between border-b border-border/80 pb-2 text-[10px]">
          <span className="text-[#52519e] dark:text-[#9493d9] font-bold">TOPOLOGY :: RESQ-NET</span>
          <span className="text-[#4d6639] dark:text-[#b0c59c] text-[9px] font-bold">PIMNAS 39</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2 text-center">
          <div className="p-2 rounded-lg border border-border bg-muted/60 flex flex-col items-center justify-center gap-1">
            <ServerRackIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-foreground">ESP32</span>
            <span className="text-[8px] text-muted-foreground">WiFi Sniffing</span>
          </div>
          <div className="p-2 rounded-lg border border-[#8584cc]/60 bg-muted/60 flex flex-col items-center justify-center gap-1">
            <DatabaseCylinderIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-[#52519e] dark:text-[#9493d9]">LoRa Mesh</span>
            <span className="text-[8px] text-muted-foreground">Binary Protocol</span>
          </div>
          <div className="p-2 rounded-lg border border-border bg-muted/60 flex flex-col items-center justify-center gap-1">
            <BrowserCodeIllustration className="w-4 h-4" />
            <span className="text-[10px] font-bold text-foreground">Command UI</span>
            <span className="text-[8px] text-muted-foreground">Offline SAR Map</span>
          </div>
        </div>
        <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">
            {isId ? "Konektivitas" : "Connectivity"}
          </span>
          <span className="font-bold text-[#4d6639] dark:text-[#b0c59c] text-[9px] sm:text-[10px]">
            {isId ? "Zero-Internet Multi-Hop" : "Zero-Internet Multi-Hop"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-3 sm:p-4 flex flex-col justify-between bg-card text-foreground select-none">
      <div className="flex items-center justify-between border-b border-border/80 pb-2 text-[10px]">
        <span className="text-[#52519e] dark:text-[#9493d9] font-bold">TOPOLOGY :: DORIPAY</span>
        <span className="text-muted-foreground text-[9px]">ACID Ledger</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2 text-center">
        <div className="p-2 rounded-lg border border-border bg-muted/60 flex flex-col items-center justify-center gap-1">
          <BrowserCodeIllustration className="w-4 h-4" />
          <span className="text-[10px] font-bold text-foreground">Svelte UI</span>
          <span className="text-[8px] text-muted-foreground">Reactive Stores</span>
        </div>
        <div className="p-2 rounded-lg border border-[#8584cc]/60 bg-muted/60 flex flex-col items-center justify-center gap-1">
          <ServerRackIllustration className="w-4 h-4" />
          <span className="text-[10px] font-bold text-[#52519e] dark:text-[#9493d9]">Go Fiber</span>
          <span className="text-[8px] text-muted-foreground">Clean Architecture</span>
        </div>
        <div className="p-2 rounded-lg border border-border bg-muted/60 flex flex-col items-center justify-center gap-1">
          <DatabaseCylinderIllustration className="w-4 h-4" />
          <span className="text-[10px] font-bold text-foreground">PostgreSQL</span>
          <span className="text-[8px] text-muted-foreground">pgx + Row Locks</span>
        </div>
      </div>
      <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[10px]">
        <span className="text-muted-foreground">
          {isId ? "Integritas Saldo" : "Balance Guard"}
        </span>
        <span className="font-bold text-[#4d6639] dark:text-[#b0c59c] text-[9px] sm:text-[10px]">
          {isId ? "Idempotensi & Anti Double-Spend" : "Idempotency & Anti Double-Spend"}
        </span>
      </div>
    </div>
  );
}

function Project3DCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const { lang, t } = useT();
  const isId = lang === "id";
  const [viewMode, setViewMode] = useState<"ui" | "arch">("ui");
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start 95%", "end 5%"],
  });

  const scrollRotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [10, 0, 0, -10]
  );
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.94, 1, 1, 0.95]
  );
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.45, 1, 1, 0.45]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const el = cardRef.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((0.5 - y / r.height) * 12).toFixed(2);
    const ry = (((x / r.width) - 0.5) * 14).toFixed(2);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", "0deg");
    cardRef.current.style.setProperty("--ry", "0deg");
  };

  const currentTagline = isId && project.taglineId ? project.taglineId : project.tagline;

  return (
    <motion.div
      ref={scrollTargetRef}
      style={{
        rotateX: scrollRotateX,
        scale: scrollScale,
        opacity: scrollOpacity,
        transformPerspective: 1200,
      }}
      className="h-full [perspective:1400px] will-change-transform"
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={onClick}
        style={{
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        }}
        className={cn(
          "group relative flex flex-col justify-between bg-card/80 dark:bg-card/45 backdrop-blur-md rounded-xl md:rounded-2xl border border-border/60 hover:border-primary/40 p-3.5 sm:p-6 squircle-lg",
          "shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_35px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_35px_rgba(0,0,0,0.25)]",
          "transition-all duration-500 ease-out cursor-pointer select-none [transform-style:preserve-3d]",
          "transform-gpu will-change-transform h-full space-y-3 sm:space-y-5"
        )}
      >
        {/* ================= LAYER 1: 3D TOP CONSOLE HEADER ================= */}
        <div
          style={{ transform: "translateZ(26px)" }}
          className="flex items-center justify-between gap-2 sm:gap-3 border-b border-border/80 pb-2 sm:pb-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-muted-foreground">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#b0c59c] animate-pulse" />
            <span className="truncate max-w-[120px] sm:max-w-[200px]">
              {project.demoUrl.replace("https://", "")}
            </span>
          </div>
        </div>

        {/* ================= LAYER 2: 3D STAGE SCREEN (DUAL VIEW 3D REVOLVING STAGE) ================= */}
        <div
          style={{ transform: "translateZ(38px)" }}
          className="relative w-full rounded-xl border border-border/80 bg-muted/60 p-1.5 sm:p-2.5 flex flex-col gap-1.5 sm:gap-2 [transform-style:preserve-3d]"
        >
          {/* Top Stage Bar */}
          <div className="flex items-center justify-between px-1 sm:px-1.5 py-0.5 select-none">
            {/* Window control dots */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#8584cc]" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#b0c59c]" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#b0c59c]" />
            </div>

            {/* Segmented 3D View Switcher with Animated Pill */}
            <div
              className="flex items-center gap-0.5 sm:gap-1 p-0.5 rounded-lg bg-card border border-border shadow-2xs"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setViewMode("ui")}
                className={cn(
                  "relative inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-bold transition-colors cursor-pointer select-none",
                  viewMode === "ui"
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {viewMode === "ui" && (
                  <motion.span
                    layoutId={`view-tab-pill-${project.id}`}
                    className="absolute inset-0 rounded-md bg-[#4e4d96] shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <EyeIllustration className="w-3 h-3" />
                  <span>{t("projects.viewUI")}</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("arch")}
                className={cn(
                  "relative inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-bold transition-colors cursor-pointer select-none",
                  viewMode === "arch"
                    ? "text-[#52519e] dark:text-[#9493d9]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {viewMode === "arch" && (
                  <motion.span
                    layoutId={`view-tab-pill-${project.id}`}
                    className="absolute inset-0 rounded-md bg-[#1e1f2e] border border-[#8584cc] shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <ArchitectureNodesIllustration className="w-3 h-3" />
                  <span>{t("projects.viewArch")}</span>
                </span>
              </button>
            </div>
          </div>

          {/* 3D Flipping Screen Stage Wrapper */}
          <div
            className="relative w-full aspect-[16/10] sm:aspect-video [perspective:1200px]"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode((prev) => (prev === "ui" ? "arch" : "ui"));
            }}
            title={isId ? "Klik untuk membalik ke cetak biru arsitektur" : "Click to flip between UI and Architecture"}
          >
            <div
              className={cn(
                "relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-out cursor-pointer",
                viewMode === "arch" && "[transform:rotateY(180deg)]"
              )}
            >
              {/* ===== FRONT FACE: UI PREVIEW (0 DEG) ===== */}
              <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-border/80 bg-black/10 dark:bg-black/40 [backface-visibility:hidden]">
                {project.videoUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  >
                    <source
                      src={project.videoUrl.replace(/\.mp4$/, ".webm")}
                      type="video/webm"
                    />
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                )}

                {/* Corner Quick Tag */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#1e1f2e]/85 border border-[#8584cc]/40 text-[9px] font-bold text-[#eceed6] backdrop-blur-xs select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8584cc] animate-pulse" />
                  <span>{isId ? "Tinjauan Langsung" : "Live Interface"}</span>
                </div>
              </div>

              {/* ===== BACK FACE: ARCHITECTURE BLUEPRINT (180 DEG) ===== */}
              <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-[#8584cc]/70 bg-card [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-inner">
                <ProjectArchitectureBlueprint
                  projectId={project.id}
                  isId={isId}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= LAYER 3: 3D TITLE & SPECS NARRATIVE ================= */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="space-y-1.5 sm:space-y-2"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg sm:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {currentTagline}
          </p>
        </div>

        {/* ================= LAYER 4: 3D FLOATING TECH BADGES ================= */}
        <div
          style={{ transform: "translateZ(46px)" }}
          className="pt-0.5 sm:pt-1"
        >
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <TechBadge key={tag} name={tag} size="xs" />
            ))}
            {project.tags.length > 5 && (
              <span className="text-[9px] px-2 py-0.5 bg-muted/80 text-muted-foreground border border-border rounded font-bold">
                +{project.tags.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* ================= LAYER 5: 3D ACTION FOOTER ================= */}
        <div
          style={{ transform: "translateZ(26px)" }}
          className="pt-2.5 sm:pt-3 border-t border-border/80 flex items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs font-bold"
        >
          <Link
            href={`/projects/${project.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-primary hover:underline"
          >
            <DocCaseStudyIllustration className="w-3.5 h-3.5" />
            <span>{t("projects.readCaseStudy")}</span>
            <ArrowRightIllustration className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <span className="text-[10px] text-muted-foreground font-semibold group-hover:text-foreground transition-colors">
            {t("projects.viewDetails")} ↗
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { lang, t } = useT();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-14 sm:py-24 relative border-t border-border/40 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-14">
          <SectionHeading
            title={t("projects.heading")}
            subtitle={t("projects.subheading")}
          />
        </div>

        {/* Projects 3D Decks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
          {PROJECTS_DATA.map((project) => (
            <Project3DCard
              key={project.id}
              project={project}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>

        {/* Interactive Overlay modal for full project details */}
        <AnimatePresence>
          {activeProject && (
            <>
              {/* Darkened backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="fixed inset-0 bg-[#14151f]/75 z-50 backdrop-blur-xs"
              />

              {/* Scrollable details container */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-scrollbar">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 14 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className={cn(
                    "relative w-full max-w-[94vw] sm:max-w-4xl bg-card/95 backdrop-blur-md border border-border/80 hover:border-primary/40 rounded-xl sm:rounded-2xl overflow-hidden my-2 sm:my-4 focus:outline-none flex flex-col max-h-[84vh] sm:max-h-[88vh]",
                    "shadow-2xl transition-all duration-300"
                  )}
                  tabIndex={-1}
                >
                  {/* Top Window HUD Bar */}
                  <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-border bg-muted/70 select-none">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      {/* Window dots */}
                      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#8584cc]" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#b0c59c]" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#b0c59c]" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary truncate">
                        {activeProject.category} :: {activeProject.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-[#b0c59c] animate-pulse" />
                        {activeProject.demoUrl.replace("https://", "")}
                      </span>
                      <button
                        onClick={() => setActiveProject(null)}
                        className="p-1 sm:p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        aria-label="Close details"
                      >
                        <CloseIconIllustration className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Header Cover Banner */}
                  <div className="relative w-full aspect-video max-h-[175px] sm:max-h-[260px] md:max-h-[300px] bg-black/90 overflow-hidden flex items-center justify-center shrink-0 border-b border-border">
                    {activeProject.videoUrl ? (
                      <video
                        controls
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                      >
                        <source
                          src={activeProject.videoUrl.replace(/\.mp4$/, ".webm")}
                          type="video/webm"
                        />
                        <source src={activeProject.videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={activeProject.coverImage}
                        alt={activeProject.title}
                        fill
                        priority
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Project Title Block */}
                  <div className="px-4 py-3 sm:px-8 sm:py-4 border-b border-border bg-card/60 shrink-0 flex items-center justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-3xl font-black tracking-tight text-foreground truncate">
                        {activeProject.title}
                      </h2>
                    </div>
                    <Link
                      href={`/projects/${activeProject.id}`}
                      className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-primary hover:underline shrink-0"
                    >
                      <DocCaseStudyIllustration className="w-3.5 h-3.5" />
                      <span>{t("projects.readCaseStudy")}</span>
                    </Link>
                  </div>

                  {/* Content details scroll block */}
                  <div className="p-4 sm:p-8 pt-3 sm:pt-4 space-y-4 sm:space-y-7 overflow-y-auto no-scrollbar flex-1 font-sans">
                    {/* Headline Tagline */}
                    <p className="text-sm sm:text-lg font-bold tracking-tight text-foreground leading-snug">
                      {lang === "id" ? activeProject.taglineId : activeProject.tagline}
                    </p>

                    {/* Overview & Quick Specs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 border-t border-border pt-4 sm:pt-6">
                      {/* Left: Deep Dive sections */}
                      <div className="md:col-span-8 space-y-4 sm:space-y-6">
                        <div className="space-y-1.5 sm:space-y-2 p-3 sm:p-4 rounded-xl border border-border bg-muted/40">
                          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                            <CompassIllustration className="w-4 h-4" />
                            {t("projects.overview")}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {lang === "id" ? activeProject.overviewId : activeProject.overview}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2 p-4 rounded-xl border border-border bg-muted/40">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                              <ShieldAlertIllustration className="w-4 h-4" />
                              {t("projects.problem")}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {lang === "id" ? activeProject.problemId : activeProject.problem}
                            </p>
                          </div>
                          <div className="space-y-2 p-4 rounded-xl border border-border bg-muted/40">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                              <LightbulbIdeaIllustration className="w-4 h-4" />
                              {t("projects.solution")}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {lang === "id" ? activeProject.solutionId : activeProject.solution}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 p-4 rounded-xl border border-border bg-muted/30">
                          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                            <ArchitectureNodesIllustration className="w-4 h-4" />
                            {t("projects.architecture")}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {lang === "id"
                              ? activeProject.architectureId
                              : activeProject.architecture}
                          </p>
                          <div className="pt-2">
                            <ArchitectureDiagram projectId={activeProject.id} />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                            <PuzzlePieceIllustration className="w-4 h-4" />
                            {t("projects.challenges")}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-muted/50 p-4 rounded-xl border border-border space-y-1">
                              <span className="text-[11px] font-bold text-foreground block">
                                {t("projects.engChallenge")}
                              </span>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {lang === "id"
                                  ? activeProject.challengesId
                                  : activeProject.challenges}
                              </p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-xl border border-border space-y-1">
                              <span className="text-[11px] font-bold text-[#4d6639] dark:text-[#b0c59c] block">
                                {t("projects.keyTakeaway")}
                              </span>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {lang === "id" ? activeProject.lessonsId : activeProject.lessons}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Tech Stack list & Links */}
                      <div className="md:col-span-4 space-y-3.5 sm:space-y-5">
                        <div className="space-y-2.5 sm:space-y-3 p-3.5 sm:p-5 rounded-xl border border-border bg-card/60">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {t("projects.techStack")}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProject.techStack.map((tech) => (
                              <TechBadge key={tech} name={tech} size="sm" />
                            ))}
                          </div>
                        </div>

                        {/* Demo/Case Study Actions */}
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                          <a
                            href={activeProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl btn-logo-glossy font-semibold text-xs sm:text-sm"
                          >
                            <ExternalLinkIllustration className="w-4 h-4" />
                            <span>{t("projects.liveDemo")}</span>
                          </a>
                          <Link
                            href={`/projects/${activeProject.id}`}
                            className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-xl border border-border bg-card/60 hover:border-primary/40 font-semibold text-xs sm:text-sm text-foreground transition-colors shadow-xs"
                          >
                            <DocCaseStudyIllustration className="w-4 h-4" />
                            <span>{t("projects.readCaseStudy")}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
