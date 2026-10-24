import React from "react";
import { cn } from "@/lib/utils";

/*
 * UNIFIED ICON COLOR PALETTE
 * Based on GradCapIllustration (Teaching Assistant) & DatabaseCylinderIllustration (Database & Caching):
 * - Structural Dark Slate : #1E293B (paired with #38BDF8 stroke/rim)
 * - Deep Sky Blue         : #0284C7 (shadow / lower layer)
 * - Mid Sky Blue          : #0EA5E9 (primary body)
 * - Bright Sky Cyan       : #38BDF8 (top surface / rim highlight)
 * - Ice / Mint Highlights : #E0F2FE & #A7F3D0 (windows / indicator LEDs)
 * - Warm Gold Accent      : #FBBF24 (focal detail / tassel / spark)
 */

// --- FLAGS ---
export function FlagEN({ className = "w-4 h-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" fill="none" className={cn("rounded-[2px] shadow-2xs shrink-0", className)} aria-hidden="true">
      <rect width="28" height="20" rx="2" fill="#012169" />
      <path d="M0 0L28 20M28 0L0 20" stroke="#FFFFFF" strokeWidth="4" />
      <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" strokeWidth="2" />
      <path d="M14 0V20M0 10H28" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M14 0V20M0 10H28" stroke="#C8102E" strokeWidth="3.5" />
    </svg>
  );
}

export function FlagID({ className = "w-4 h-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" fill="none" className={cn("rounded-[2px] shadow-2xs shrink-0", className)} aria-hidden="true">
      <rect width="28" height="20" rx="2" fill="#FFFFFF" />
      <path d="M0 2C0 0.89543 0.89543 0 2 0H26C27.1046 0 28 0.89543 28 2V10H0V2Z" fill="#E70011" />
      <rect x="0.5" y="0.5" width="27" height="19" rx="1.5" stroke="#000000" strokeOpacity="0.15" />
    </svg>
  );
}

// --- WEATHER & TIME ---
export function SunIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3.8" fill="#FBBF24" />
      <path
        d="M12 2V4.5M12 19.5V22M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M2 12H4.5M19.5 12H22M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MoonIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path
        d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="1.4"
      />
      <path
        d="M18.2 14.8A6.8 6.8 0 0 1 8.8 5.4a6.8 6.8 0 1 0 9.4 9.4Z"
        fill="#0EA5E9"
      />
      <circle cx="18" cy="6" r="1.4" fill="#FBBF24" />
      <circle cx="14.5" cy="9" r="1" fill="#A7F3D0" />
    </svg>
  );
}

export function WeatherIllustration({
  code,
  isDay,
  className = "w-4 h-4",
}: {
  code: number;
  isDay: boolean;
  className?: string;
}) {
  if (code === 0) {
    return isDay ? <SunIllustration className={className} /> : <MoonIllustration className={className} />;
  }
  if (code >= 95) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
        <path
          d="M7 15.5H17.5a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.2 6.5 4.5 4.5 0 0 0 7 15.5Z"
          fill="#1E293B"
          stroke="#38BDF8"
          strokeWidth="1.3"
        />
        <path d="M13 12.5L10 17h3l-1 4.5 4.5-5.5h-3L13 12.5Z" fill="#FBBF24" />
      </svg>
    );
  }
  if (code >= 51 && code <= 82) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
        <path
          d="M7 15.5H17.5a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.2 6.5 4.5 4.5 0 0 0 7 15.5Z"
          fill="#0EA5E9"
          stroke="#38BDF8"
          strokeWidth="1.2"
        />
        <path d="M8.5 18v2.5M12 18v2.5M15.5 18v2.5" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="15.5" cy="11.5" r="1.1" fill="#A7F3D0" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="9" cy="8.5" r="4" fill="#FBBF24" />
      <path
        d="M8 17.5H18a4 4 0 0 0 .5-7.96A5 5 0 0 0 8.8 8.6 4.2 4.2 0 0 0 8 17.5Z"
        fill="#0EA5E9"
        stroke="#38BDF8"
        strokeWidth="1.3"
      />
      <circle cx="15.8" cy="14" r="1.1" fill="#A7F3D0" />
    </svg>
  );
}

export function LocationPinIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <ellipse cx="12" cy="20.5" rx="5.5" ry="1.8" fill="#0284C7" />
      <path
        d="M12 2.5C7.86 2.5 4.5 5.86 4.5 10C4.5 15.1 12 20.5 12 20.5C12 20.5 19.5 15.1 19.5 10C19.5 5.86 16.14 2.5 12 2.5Z"
        fill="#0EA5E9"
        stroke="#38BDF8"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="9.8" r="3.6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
      <circle cx="12" cy="9.8" r="1.5" fill="#FBBF24" />
    </svg>
  );
}

export function ClockIllustration({
  date,
  className = "w-4 h-4",
}: {
  date?: Date | null;
  className?: string;
}) {
  const h = date ? date.getHours() : 10;
  const m = date ? date.getMinutes() : 10;
  const s = date ? date.getSeconds() : 0;

  const hourAngle = ((h % 12) + m / 60) * 30;
  const minuteAngle = (m + s / 60) * 6;
  const secondAngle = s * 6;

  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#0EA5E9" />
      <circle cx="12" cy="12" r="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />

      {/* 12, 3, 6, 9 hour tick dots */}
      <circle cx="12" cy="5.5" r="0.7" fill="#A7F3D0" />
      <circle cx="18.5" cy="12" r="0.7" fill="#A7F3D0" />
      <circle cx="12" cy="18.5" r="0.7" fill="#A7F3D0" />
      <circle cx="5.5" cy="12" r="0.7" fill="#A7F3D0" />

      {/* Dynamic Hour Hand */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="7.5"
        stroke="#E0F2FE"
        strokeWidth="2.2"
        strokeLinecap="round"
        transform={`rotate(${hourAngle} 12 12)`}
      />

      {/* Dynamic Minute Hand */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="5.8"
        stroke="#38BDF8"
        strokeWidth="1.6"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle} 12 12)`}
      />

      {/* Dynamic Second Hand */}
      <line
        x1="12"
        y1="13.2"
        x2="12"
        y2="5"
        stroke="#FBBF24"
        strokeWidth="1"
        strokeLinecap="round"
        transform={`rotate(${secondAngle} 12 12)`}
      />

      {/* Center Pivot Pin */}
      <circle cx="12" cy="12" r="1.4" fill="#FBBF24" />
    </svg>
  );
}

// --- PILLARS & CORE ARCHITECTURE ---
export function ServerRackIllustration({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="3" y="3" width="18" height="5.2" rx="1.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <circle cx="6.2" cy="5.6" r="1.1" fill="#A7F3D0" />
      <circle cx="9.2" cy="5.6" r="1.1" fill="#FBBF24" />
      <rect x="14" y="4.9" width="4.5" height="1.4" rx="0.7" fill="#38BDF8" />

      <rect x="3" y="9.4" width="18" height="5.2" rx="1.5" fill="#0EA5E9" />
      <circle cx="6.2" cy="12" r="1.1" fill="#A7F3D0" />
      <circle cx="9.2" cy="12" r="1.1" fill="#E0F2FE" />
      <rect x="14" y="11.3" width="4.5" height="1.4" rx="0.7" fill="#E0F2FE" />

      <rect x="3" y="15.8" width="18" height="5.2" rx="1.5" fill="#0284C7" />
      <circle cx="6.2" cy="18.4" r="1.1" fill="#FBBF24" />
      <circle cx="9.2" cy="18.4" r="1.1" fill="#A7F3D0" />
      <rect x="14" y="17.7" width="4.5" height="1.4" rx="0.7" fill="#E0F2FE" />
    </svg>
  );
}

export function DatabaseCylinderIllustration({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M4 12.5v5c0 2.2 3.58 4 8 4s8-1.8 8-4v-5H4Z" fill="#0284C7" />
      <path d="M4 7.5v5c0 2.2 3.58 4 8 4s8-1.8 8-4v-5H4Z" fill="#0EA5E9" />
      <ellipse cx="12" cy="7.5" rx="8" ry="3.8" fill="#38BDF8" />
      <circle cx="16.5" cy="13" r="1.2" fill="#A7F3D0" />
      <circle cx="16.5" cy="18" r="1.2" fill="#A7F3D0" />
    </svg>
  );
}

export function BrowserCodeIllustration({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="2" y="3.5" width="20" height="17" rx="2.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M2.6 6a2 2 0 0 1 2-2h14.8a2 2 0 0 1 2 2v2.2H2.6V6Z" fill="#0EA5E9" />
      <circle cx="5.2" cy="6.1" r="1" fill="#FBBF24" />
      <circle cx="8" cy="6.1" r="1" fill="#A7F3D0" />
      <circle cx="10.8" cy="6.1" r="1" fill="#E0F2FE" />
      <path d="M9.5 11.8L6.5 14.3l3 2.5M14.5 11.8l3 2.5-3 2.5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 11L11 17.5" stroke="#FBBF24" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function CloudNodesIllustration({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path
        d="M6.5 15H17.5a3.8 3.8 0 0 0 .5-7.56A5.2 5.2 0 0 0 7.6 6.5a4.1 4.1 0 0 0-1.1 8.5Z"
        fill="#0EA5E9"
        stroke="#38BDF8"
        strokeWidth="1.2"
      />
      <path d="M8 15v3.2M12 15v4M16 15v3.2" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="19.8" r="1.9" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <circle cx="12" cy="20.6" r="2" fill="#FBBF24" />
      <circle cx="16" cy="19.8" r="1.9" fill="#0284C7" stroke="#A7F3D0" strokeWidth="1.2" />
    </svg>
  );
}

// --- PROJECT CASE STUDIES & SECTIONS ---
export function DocCaseStudyIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M5 4a2 2 0 0 1 2-2h7.5L19 6.5V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.3" />
      <path d="M14.2 2.2V6.8H18.8L14.2 2.2Z" fill="#0EA5E9" />
      <rect x="8" y="9" width="8" height="2" rx="1" fill="#38BDF8" />
      <rect x="8" y="13" width="8" height="1.6" rx="0.8" fill="#0EA5E9" />
      <rect x="8" y="16.5" width="5" height="1.6" rx="0.8" fill="#FBBF24" />
    </svg>
  );
}

export function SearchGlassIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M16 16L21 21" stroke="#FBBF24" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="11" cy="11" r="7" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.8" />
      <circle cx="11" cy="11" r="4.2" fill="#0EA5E9" />
      <path d="M9 8.8A2.8 2.8 0 0 1 12.8 8.2" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CompassIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
      <polygon points="16.5,7.5 13.5,13.5 10.5,10.5" fill="#FBBF24" />
      <polygon points="7.5,16.5 13.5,13.5 10.5,10.5" fill="#0EA5E9" />
      <circle cx="12" cy="12" r="1.3" fill="#A7F3D0" />
    </svg>
  );
}

export function ShieldAlertIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path
        d="M12 2.5L4.5 5.8v5.4c0 5 3.2 9.4 7.5 10.8 4.3-1.4 7.5-5.8 7.5-10.8V5.8L12 2.5Z"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="1.4"
      />
      <path
        d="M12 4.2v16.4c3.3-1.2 5.8-4.8 5.8-9.4V6.9L12 4.2Z"
        fill="#0EA5E9"
        fillOpacity="0.45"
      />
      <path d="M12 8v4.5" stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="12" cy="15.8" r="1.3" fill="#FBBF24" />
    </svg>
  );
}

export function LightbulbIdeaIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path
        d="M12 3a6.5 6.5 0 0 0-4 11.6V17a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 16 17v-2.4A6.5 6.5 0 0 0 12 3Z"
        fill="#0EA5E9"
        stroke="#38BDF8"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="9.5" r="2.8" fill="#FBBF24" />
      <rect x="9" y="18.8" width="6" height="2.6" rx="1.2" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
    </svg>
  );
}

export function ArchitectureNodesIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M7 7h10M7 7v10l10 0" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.8" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.3" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.8" fill="#0EA5E9" />
      <rect x="14" y="14" width="6.5" height="6.5" rx="1.8" fill="#0284C7" />
      <circle cx="6.75" cy="6.75" r="1.2" fill="#FBBF24" />
      <circle cx="17.25" cy="17.25" r="1.2" fill="#A7F3D0" />
    </svg>
  );
}

export function PuzzlePieceIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="3" y="3" width="8.2" height="8.2" rx="2" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <rect x="12.8" y="3" width="8.2" height="8.2" rx="2" fill="#38BDF8" />
      <rect x="3" y="12.8" width="8.2" height="8.2" rx="2" fill="#0EA5E9" />
      <rect x="12.8" y="12.8" width="8.2" height="8.2" rx="2" fill="#0284C7" />
      <circle cx="7.1" cy="7.1" r="1.3" fill="#FBBF24" />
      <circle cx="16.9" cy="16.9" r="1.3" fill="#A7F3D0" />
    </svg>
  );
}

export function ChartGrowthIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="3.5" y="13.5" width="4" height="7" rx="1.2" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <rect x="10" y="9" width="4" height="11.5" rx="1.2" fill="#0284C7" />
      <rect x="16.5" y="4.5" width="4" height="16" rx="1.2" fill="#0EA5E9" />
      <circle cx="18.5" cy="6.8" r="1.1" fill="#FBBF24" />
      <circle cx="12" cy="11.2" r="1.1" fill="#A7F3D0" />
    </svg>
  );
}

// --- EXPERIENCE & TIMELINE ---
export function CalendarIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" fill="#0284C7" />
      <path d="M3 7a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 7v2.8H3V7Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M8 2.8v3M16 2.8v3" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="6.5" y="12.2" width="3" height="2.6" rx="0.6" fill="#A7F3D0" />
      <rect x="10.8" y="12.2" width="3" height="2.6" rx="0.6" fill="#38BDF8" />
      <rect x="15" y="12.2" width="2.8" height="2.6" rx="0.6" fill="#E0F2FE" />
    </svg>
  );
}

export function TeamUsersIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="16.2" cy="8.5" r="2.8" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M12.5 19c.3-2.5 2.1-4.4 4.5-4.4 2 0 3.6 1.3 4.2 3.2v1.2h-8.7Z" fill="#0284C7" />
      <circle cx="9" cy="8" r="3.4" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.3" />
      <path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5H3Z" fill="#0EA5E9" />
      <circle cx="9" cy="16.2" r="1.2" fill="#FBBF24" />
    </svg>
  );
}

export function MegaphoneIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M18.5 4.2L8 9H4.5A1.5 1.5 0 0 0 3 10.5v3A1.5 1.5 0 0 0 4.5 15H8l10.5 4.8V4.2Z" fill="#0EA5E9" />
      <rect x="3" y="9" width="5" height="6" rx="1.4" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M6 15l1.2 4.5h2.6L8.8 15H6Z" fill="#0284C7" />
      <path d="M21 9.2v5.6" stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="15" cy="12" r="1.2" fill="#A7F3D0" />
    </svg>
  );
}

export function OfficeBuildingIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="4" y="3" width="11" height="18" rx="1.5" fill="#0EA5E9" />
      <rect x="14.5" y="8.5" width="5.5" height="12.5" rx="1.2" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <rect x="6.5" y="6" width="2.2" height="2.2" rx="0.4" fill="#A7F3D0" />
      <rect x="10.3" y="6" width="2.2" height="2.2" rx="0.4" fill="#E0F2FE" />
      <rect x="6.5" y="10" width="2.2" height="2.2" rx="0.4" fill="#E0F2FE" />
      <rect x="10.3" y="10" width="2.2" height="2.2" rx="0.4" fill="#A7F3D0" />
      <rect x="8" y="16" width="3" height="5" fill="#FBBF24" />
    </svg>
  );
}

export function GradCapIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <polygon points="12,3 2,8.5 12,14 22,8.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M6 11.2v4.8c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2v-4.8L12 14.5 6 11.2Z" fill="#0EA5E9" />
      <path d="M20.5 9.2v6.5" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// --- CONTACT & FORMS ---
export function MailboxIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="#0EA5E9" />
      <path d="M3 6l9 7 9-7" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="15.5" r="1.2" fill="#FBBF24" />
    </svg>
  );
}

export function PenWriteIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4.5 1.5L5 15 16.5 3.5Z" fill="#0EA5E9" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M14.5 5.5l3 3" stroke="#1E293B" strokeWidth="2" />
      <path d="M3.5 19.5L8 18l-3-3-1.5 4.5Z" fill="#FBBF24" />
    </svg>
  );
}

export function ChatBubblesIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H9l-5 4V5.5Z"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="1.4"
      />
      <circle cx="8.5" cy="9" r="1.3" fill="#38BDF8" />
      <circle cx="12" cy="9" r="1.3" fill="#A7F3D0" />
      <circle cx="15.5" cy="9" r="1.3" fill="#FBBF24" />
    </svg>
  );
}

// --- BUTTON & CONTROLS ILLUSTRATIONS ---
export function ArrowDownIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.4" />
      <path d="M12 7v9.5M8 13l4 4 4-4" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="1.1" fill="#FBBF24" />
    </svg>
  );
}

export function ArrowRightIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="12" r="1.6" fill="#FBBF24" />
    </svg>
  );
}

export function ArrowLeftIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M19 12H5M11 6L5 12l6 6" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="12" r="1.6" fill="#FBBF24" />
    </svg>
  );
}

export function ArrowUpIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="19" r="1.6" fill="#FBBF24" />
    </svg>
  );
}

export function ExternalLinkIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M15 3h6v6M10 14L21 3" stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIconIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.4" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#FBBF24" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

export function EyeIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.6" fill="#0EA5E9" />
      <circle cx="13" cy="11" r="1.2" fill="#FBBF24" />
    </svg>
  );
}

export function OnlineUsersIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="9" cy="8" r="3" fill="#0EA5E9" />
      <path d="M4 18c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.2" fill="#A7F3D0" />
      <path d="M15 17c.3-1.6 1.5-2.8 3-2.8s2.8 1.2 3 2.8" stroke="#A7F3D0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PulseActivityIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="2" y="3.5" width="20" height="17" rx="3" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.4" />
      <path d="M4 12h3.5l2-4 3.5 8 2.5-5 1.5 2.5H20" stroke="#A7F3D0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="7" r="1.1" fill="#FBBF24" />
    </svg>
  );
}

export function CopyClipboardIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="8" y="7" width="11" height="13" rx="2" fill="#0284C7" />
      <rect x="5" y="4" width="11" height="13" rx="2" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
      <line x1="8" y1="9" x2="13" y2="9" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12.5" x2="12" y2="12.5" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CheckMarkIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M8 12.5l2.5 2.5 5.5-6" stroke="#A7F3D0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SendPaperPlaneIllustration({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <polygon points="22,2 15,22 11,13 2,9" fill="#0EA5E9" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M22 2L11 13" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Flip3DIllustration({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} aria-hidden="true">
      <rect x="4" y="4" width="12" height="15" rx="2.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
      <rect x="6.5" y="7" width="7" height="2" rx="1" fill="#0EA5E9" />
      <path
        d="M19 8.5c1.5 1.2 2.2 2.6 2.2 4 0 2.8-3.8 5-8.5 5-.9 0-1.8-.1-2.6-.3"
        stroke="#FBBF24"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M11.5 15l-2 2.2 2.4 1.8" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
