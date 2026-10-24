"use client";

import React from "react";
import { TechIcon } from "@/components/tech-icons";

const TECH_ITEMS = [
  "Go (Golang)",
  "Fiber",
  "Laravel 12",
  "Laravel Octane",
  "RoadRunner",
  "PostgreSQL",
  "JSONB & GIN Index",
  "Redis",
  "React 19",
  "Next.js",
  "Svelte",
  "Tailwind CSS",
  "Docker",
  "gRPC",
  "CAS 2.0 SSO",
  "Playwright",
];

export function TechMarquee() {
  const repeated = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-border/40 bg-card/20 py-4 select-none"
      aria-label="Technology stack marquee"
    >
      {/* Left/Right edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex w-max animate-marquee items-center">
        {repeated.map((tech, idx) => (
          <div
            key={`${tech}-${idx}`}
            className="flex items-center gap-2.5 px-5 text-xs sm:text-sm font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <TechIcon name={tech} className="w-4 h-4 shrink-0" />
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
