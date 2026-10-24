"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useT } from "@/lib/i18n";
import { PROJECTS_DATA } from "@/lib/projects";
import { EXPERIENCE_ENTRIES } from "@/lib/experience";
import { SectionHeading } from "@/components/section-heading";
import { TechBadge } from "@/components/tech-icons";
import {
  ServerRackIllustration,
  DatabaseCylinderIllustration,
  BrowserCodeIllustration,
  CloudNodesIllustration,
} from "@/components/ui-icons";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const PRIMARY_STACK = [
  "React 19",
  "Next.js",
  "Svelte",
  "TypeScript",
  "Tailwind CSS",
  "Go",
  "Laravel 12",
  "PostgreSQL",
  "Redis",
  "Docker",
  "gRPC",
];

export function About() {
  const { t } = useT();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  const pillars = [
    {
      icon: ServerRackIllustration,
      title: t("about.pillar1.title"),
      desc: t("about.pillar1.desc"),
    },
    {
      icon: DatabaseCylinderIllustration,
      title: t("about.pillar2.title"),
      desc: t("about.pillar2.desc"),
    },
    {
      icon: BrowserCodeIllustration,
      title: t("about.pillar3.title"),
      desc: t("about.pillar3.desc"),
    },
    {
      icon: CloudNodesIllustration,
      title: t("about.pillar4.title"),
      desc: t("about.pillar4.desc"),
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-border/40 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Focus Statement & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <SectionHeading
              index="01"
              label={t("about.label")}
              title={t("about.heading")}
            />

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                {t("about.p1")}
              </p>
              <p>
                {t("about.p2")}
              </p>
            </div>

            {/* Live Numerical Stats Counter */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/60">
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-black text-foreground font-mono">
                  <Counter value={PROJECTS_DATA.length} />
                </div>
                <p className="text-xs font-medium text-muted-foreground leading-snug">
                  {t("about.stat.projects")}
                </p>
              </div>
              <div className="space-y-0.5 pl-4 border-l border-border/60">
                <div className="text-2xl sm:text-3xl font-black text-foreground font-mono">
                  <Counter value={EXPERIENCE_ENTRIES.length} />
                </div>
                <p className="text-xs font-medium text-muted-foreground leading-snug">
                  {t("about.stat.experience")}
                </p>
              </div>
            </div>

            {/* Primary Stack with Official Logos */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">
                  {t("about.stackTitle")}
                </p>
                <span className="text-xs text-muted-foreground font-medium">
                  {t("about.focusDesc")}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRIMARY_STACK.map((tech) => (
                  <TechBadge key={tech} name={tech} size="sm" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Engineering Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6">
            {pillars.map((pillar) => {
              const Illustration = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-card hover:-translate-y-1.5 hover:border-primary/60 transition-all duration-300 transform-gpu will-change-transform squircle-lg flex flex-col justify-between min-h-[140px] sm:min-h-[220px]"
                >
                  <div className="space-y-2 sm:space-y-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-xl bg-muted border border-border flex items-center justify-center group-hover:border-primary/25 transition-all duration-300 squircle-sm">
                      <Illustration className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="font-bold text-[11px] sm:text-base md:text-lg text-foreground tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-[9px] sm:text-xs md:text-sm text-muted-foreground leading-normal sm:leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
