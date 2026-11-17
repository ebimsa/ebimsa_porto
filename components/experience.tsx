"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import {
  EXPERIENCE_ENTRIES,
  type ExperienceCategory,
  type ExperienceEntry,
  type ExperiencePhoto,
} from "@/lib/experience";
import { TechIcon } from "@/components/tech-icons";
import {
  CalendarIllustration,
  TeamUsersIllustration,
  MegaphoneIllustration,
  OfficeBuildingIllustration,
  GradCapIllustration,
  TrophyAwardIllustration,
  CompassIllustration,
  Flip3DIllustration,
} from "@/components/ui-icons";
import { cn } from "@/lib/utils";

function EntryIllustration({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  if (id === "exp-pimnas") return <TrophyAwardIllustration className={className} />;
  if (id === "exp-ta") return <GradCapIllustration className={className} />;
  if (id === "exp-pkl") return <OfficeBuildingIllustration className={className} />;
  if (id === "exp-bem") return <MegaphoneIllustration className={className} />;
  return <TeamUsersIllustration className={className} />;
}

function ExperienceTag({ tag }: { tag: string }) {
  const hasTechLogo =
    tag.toLowerCase().includes("android") || tag.toLowerCase().includes("mobile");
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-medium bg-muted/70 text-foreground/90 border border-border/60 rounded-md">
      {hasTechLogo && <TechIcon name={tag} className="w-3 h-3 shrink-0" />}
      <span>{tag}</span>
    </span>
  );
}

function Experience3DCard({
  entry,
  idx,
  isId,
  t,
  onOpenPhoto,
}: {
  entry: ExperienceEntry;
  idx: number;
  isId: boolean;
  t: (k: string) => string;
  onOpenPhoto: (photos: ExperiencePhoto[], index: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const backScrollRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [scrollInfo, setScrollInfo] = useState({
    canScroll: false,
    thumbHeight: 40,
    thumbTop: 0,
    atBottom: false,
  });
  const prefersReducedMotion = useReducedMotion();

  const updateScrollInfo = useCallback(() => {
    const el = backScrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const canScroll = scrollHeight > clientHeight + 2;
    if (!canScroll) {
      setScrollInfo((prev) =>
        prev.canScroll
          ? { canScroll: false, thumbHeight: 100, thumbTop: 0, atBottom: true }
          : prev
      );
      return;
    }
    const thumbHeight = Math.max((clientHeight / scrollHeight) * 100, 18);
    const maxScroll = scrollHeight - clientHeight;
    const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
    const thumbTop = scrollFraction * (100 - thumbHeight);
    const atBottom = scrollTop + clientHeight >= scrollHeight - 6;
    setScrollInfo({ canScroll: true, thumbHeight, thumbTop, atBottom });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(updateScrollInfo);
    window.addEventListener("resize", updateScrollInfo);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateScrollInfo);
    };
  }, [flipped, isId, updateScrollInfo]);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 92%", "end 8%"],
  });

  // 3D depth effect as card travels through viewport
  const scrollRotateX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [16, 0, 0, -16]
  );
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.9, 1, 1, 0.9]
  );
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.35, 1, 1, 0.35]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !tiltRef.current) return;
    const el = tiltRef.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const ry = ((x / r.width) - 0.5) * 12;
    const rx = (0.5 - (y / r.height)) * 10;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  };

  const handlePointerLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.setProperty("--rx", "0deg");
    tiltRef.current.style.setProperty("--ry", "0deg");
  };

  const role = isId ? entry.roleId : entry.role;
  const period = isId ? entry.periodId : entry.period;
  const duration = isId ? entry.durationId : entry.duration;
  const typeLabel = isId ? entry.typeLabelId : entry.typeLabel;
  const summary = isId ? entry.summaryId : entry.summary;
  const details = isId ? entry.detailsId : entry.details;
  const isLeftOnDesktop = idx % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: scrollRotateX,
        scale: scrollScale,
        opacity: scrollOpacity,
        transformPerspective: 1200,
      }}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-8 pl-12 md:pl-0",
        "will-change-transform"
      )}
    >
      {/* Center 3D Holographic Node on the Timeline Spine */}
      <div className="  absolute left-0 md:left-1/2 top-8 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-[#8584cc] bg-[#1e1f2e] shadow-[0_0_20px_rgba(100,99,177,0.35)]">
          <span className="absolute inset-0 rounded-xl bg-[#6463b1]/20 animate-ping opacity-40" />
          <span className="relative text-[11px] font-black text-[#b0c59c]">
            {entry.index}
          </span>
        </div>
      </div>

      {/* Desktop Date / Meta Readout on the opposite side of the spine */}
      <div
        className={cn(
          "hidden md:flex flex-col gap-1.5",
          isLeftOnDesktop
            ? "md:col-span-5 md:col-start-8 md:items-start md:pl-6 text-left"
            : "md:col-span-5 md:col-start-1 md:row-start-1 md:items-end md:pr-6 text-right"
        )}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-border/80 bg-card/60 backdrop-blur-sm text-xs font-bold text-foreground shadow-xs">
          <CalendarIllustration className="w-3.5 h-3.5" />
          <span>{period}</span>
          <span className="text-muted-foreground">· {duration}</span>
        </div>
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
          {entry.organization}
        </span>
      </div>

      {/* 3D Interactive Tilt + Flip Card Container */}
      <div
        className={cn(
          "md:col-span-5 [perspective:1400px]",
          isLeftOnDesktop
            ? "md:col-start-1 md:row-start-1"
            : "md:col-start-8"
        )}
      >
        <div
          ref={tiltRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={() => setFlipped((f) => !f)}
          style={{
            transform:
              "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          }}
          className="group relative cursor-pointer select-none transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        >
          {/* Inner 180-degree 3D Flip Stage */}
          <div
            className={cn(
              "relative w-full min-h-[300px] sm:min-h-[310px] transition-transform duration-700 [transform-style:preserve-3d]",
              flipped && "[transform:rotateY(180deg)]"
            )}
          >
            {/* ================= FRONT FACE ================= */}
            <div
              className={cn(
                "relative w-full min-h-[300px] sm:min-h-[310px] rounded-xl md:rounded-2xl border border-border/60 group-hover:border-primary/40 bg-card/45 backdrop-blur-md p-5 sm:p-6 squircle-lg shadow-sm group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_35px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_20px_35px_rgba(0,0,0,0.25)] transition-all duration-500 flex flex-col justify-between gap-4 [backface-visibility:hidden]",
                flipped && "pointer-events-none"
              )}
            >
              {/* Top Meta & Role Header */}
              <div className="relative z-10 space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      {typeLabel}
                    </span>
                    {entry.photos && entry.photos.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-[9px] font-bold text-muted-foreground border border-border/60">
                        <ImageIcon className="w-2.5 h-2.5 text-primary" />
                        <span>{entry.photos.length}</span>
                      </span>
                    )}
                  </div>

                  {/* Mobile Date Pill */}
                  <span className="md:hidden inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                    <CalendarIllustration className="w-3 h-3" />
                    {period}
                  </span>
                </div>

                {/* Floating 3D Organization Badge & Role */}
                <div className="flex items-start gap-3.5 pt-0.5">
                  <div className="w-11 h-11 rounded-xl bg-muted/80 border border-border flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary/40 group-hover:scale-105 transition-all">
                    <EntryIllustration id={entry.id} className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
                      {role}
                    </h3>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {entry.organization} · {duration}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* Bottom Tags & 3D Flip Trigger */}
              <div className="relative z-10 space-y-3 pt-3 border-t border-border/50">
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <ExperienceTag key={tag} tag={tag} />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-primary pt-0.5">
                  <span className="inline-flex items-center gap-1.5 group-hover:underline">
                    <Flip3DIllustration className="w-4 h-4" />
                    <span>{t("experience.flipToDetails")}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-normal">
                    3D · 180°
                  </span>
                </div>
              </div>
            </div>

            {/* ================= BACK FACE (ROTATED 180 DEG) ================= */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full overflow-hidden rounded-xl md:rounded-2xl border border-primary/40 bg-card/45 backdrop-blur-md p-5 sm:p-6 squircle-lg shadow-sm flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]",
                !flipped && "pointer-events-none"
              )}
            >
              <div className="relative min-h-0 flex-1 flex gap-1.5">
                <div
                  ref={backScrollRef}
                  onScroll={updateScrollInfo}
                  className="min-h-0 flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1"
                >
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <EntryIllustration id={entry.id} className="w-4 h-4 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-extrabold text-foreground truncate">
                      {role} — {entry.organization}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-primary shrink-0">
                    {period}
                  </span>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {t("experience.responsibilities")}
                </p>

                <ul className="space-y-2 list-disc pl-4 text-xs text-muted-foreground leading-relaxed">
                  {details.map((item, i) => (
                    <li key={i} className="marker:text-primary">
                      {item}
                    </li>
                  ))}
                </ul>

                {entry.photos && entry.photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {entry.photos.map((photo, pIdx) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPhoto(entry.photos!, pIdx);
                        }}
                        className="group/photo relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-border/80 hover:border-primary transition-colors cursor-pointer"
                        title={isId ? photo.captionId : photo.captionEn}
                      >
                        <Image
                          src={photo.src}
                          alt={isId ? photo.captionId : photo.captionEn}
                          fill
                          sizes="160px"
                          className="object-cover group-hover/photo:scale-105 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                )}
                </div>

                {/* Visible custom scrollbar track on the right side when scrollable */}
                {scrollInfo.canScroll && (
                  <div
                    aria-hidden="true"
                    className="w-1 shrink-0 rounded-full bg-border/50 relative my-0.5 overflow-hidden"
                  >
                    <div
                      className="absolute inset-x-0 rounded-full bg-primary/80 transition-[top] duration-75"
                      style={{
                        height: `${scrollInfo.thumbHeight}%`,
                        top: `${scrollInfo.thumbTop}%`,
                      }}
                    />
                  </div>
                )}

                {/* Subtle bottom fade to cue scrollable content below */}
                {scrollInfo.canScroll && !scrollInfo.atBottom && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 right-2.5 h-8 bg-gradient-to-t from-card via-card/75 to-transparent"
                  />
                )}
              </div>

              <div className="shrink-0 pt-3 border-t border-border/50 flex items-center justify-between gap-2 text-[11px] font-bold text-primary">
                <span className="inline-flex items-center gap-1.5 hover:underline">
                  <Flip3DIllustration className="w-4 h-4" />
                  <span>{t("experience.flipToFront")}</span>
                </span>
                <div className="flex items-center gap-2.5">
                  {entry.link && (
                    <a
                      href={entry.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{isId ? entry.link.labelId : entry.link.labelEn}</span>
                    </a>
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {entry.index} / {String(EXPERIENCE_ENTRIES.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { lang, t } = useT();
  const isId = lang === "id";
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<"all" | ExperienceCategory>("all");
  const [lightbox, setLightbox] = useState<{ photos: ExperiencePhoto[]; index: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  const filters: {
    id: "all" | ExperienceCategory;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "all", label: t("experience.filterAll"), icon: CompassIllustration },
    { id: "achievement", label: t("experience.filterAchievement"), icon: TrophyAwardIllustration },
    { id: "teaching", label: t("experience.filterTeaching"), icon: GradCapIllustration },
    { id: "work", label: t("experience.filterWork"), icon: OfficeBuildingIllustration },
    { id: "leadership", label: t("experience.filterLeadership"), icon: MegaphoneIllustration },
  ];

  const filteredEntries = EXPERIENCE_ENTRIES.filter((item) =>
    selectedCategory === "all" ? true : item.category === selectedCategory
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 overflow-hidden border-t border-border/40 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-14">
        {/* Header & Category Filter Chips */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            title={t("experience.heading")}
            subtitle={t("experience.subheading")}
          />

          {/* Interactive Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-md self-start md:self-auto">
            {filters.map((f) => {
              const FilterIcon = f.icon;
              const active = selectedCategory === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedCategory(f.id)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer focus-visible:outline-none",
                    active
                      ? "text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="exp-filter-pill"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      className="absolute inset-0 rounded-lg bg-foreground -z-10 shadow-xs"
                    />
                  )}
                  <FilterIcon className="w-3.5 h-3.5" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Depth Timeline Corridor */}
        <div className="relative">
          {/* Central / Left Vertical Spine Track */}
          <div className="absolute left-[17px] md:left-1/2 top-4 bottom-4 w-[2px] md:-translate-x-1/2 bg-border rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: smoothProgress }}
              className="w-full h-full bg-[#52519e] dark:bg-[#9493d9] origin-top"
            />
          </div>

          {/* Timeline Entries */}
          <div className="space-y-10 md:space-y-14 relative z-10">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry, idx) => (
                <Experience3DCard
                  key={entry.id}
                  entry={entry}
                  idx={idx}
                  isId={isId}
                  t={t}
                  onOpenPhoto={(photos, index) => setLightbox({ photos, index })}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-border bg-card shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:text-primary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={lightbox.photos[lightbox.index].src}
                  alt={isId ? lightbox.photos[lightbox.index].captionId : lightbox.photos[lightbox.index].captionEn}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <div className="px-4 py-3 bg-card border-t border-border flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-foreground">
                  {isId ? lightbox.photos[lightbox.index].captionId : lightbox.photos[lightbox.index].captionEn}
                </p>
                {lightbox.photos.length > 1 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox((prev) =>
                          prev ? { ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length } : null
                        )
                      }
                      className="p-1.5 rounded-lg border border-border hover:bg-muted cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox((prev) =>
                          prev ? { ...prev, index: (prev.index + 1) % prev.photos.length } : null
                        )
                      }
                      className="p-1.5 rounded-lg border border-border hover:bg-muted cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
