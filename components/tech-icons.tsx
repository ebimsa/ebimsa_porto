import React from "react";
import { cn } from "@/lib/utils";

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

function getDeviconUrl(name: string): { url: string; invertDark?: boolean } | null {
  const key = name.toLowerCase();

  if (key.includes("go") || key.includes("fiber")) {
    return { url: `${DEVICON_BASE}/go/go-original.svg` };
  }
  if (key.includes("laravel") || key.includes("octane")) {
    return { url: `${DEVICON_BASE}/laravel/laravel-original.svg` };
  }
  if (key.includes("postgres") || key.includes("jsonb") || key.includes("pgx")) {
    return { url: `${DEVICON_BASE}/postgresql/postgresql-original.svg` };
  }
  if (key.includes("redis")) {
    return { url: `${DEVICON_BASE}/redis/redis-original.svg` };
  }
  if (key.includes("react")) {
    return { url: `${DEVICON_BASE}/react/react-original.svg` };
  }
  if (key.includes("next")) {
    return { url: `${DEVICON_BASE}/nextjs/nextjs-original.svg` };
  }
  if (key.includes("svelte")) {
    return { url: `${DEVICON_BASE}/svelte/svelte-original.svg` };
  }
  if (key.includes("vite")) {
    return { url: `${DEVICON_BASE}/vitejs/vitejs-original.svg` };
  }
  if (key.includes("tailwind")) {
    return { url: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` };
  }
  if (key.includes("docker")) {
    return { url: `${DEVICON_BASE}/docker/docker-original.svg` };
  }
  if (key.includes("grpc")) {
    return { url: `${DEVICON_BASE}/grpc/grpc-original.svg` };
  }
  if (key.includes("node")) {
    return { url: `${DEVICON_BASE}/nodejs/nodejs-original.svg` };
  }
  if (key.includes("playwright")) {
    return { url: `${DEVICON_BASE}/playwright/playwright-original.svg` };
  }
  if (key.includes("android") || key.includes("mobile")) {
    return { url: `${DEVICON_BASE}/android/android-original.svg` };
  }
  if (key.includes("github")) {
    return { url: `${DEVICON_BASE}/github/github-original.svg`, invertDark: true };
  }
  if (key.includes("linkedin")) {
    return { url: `${DEVICON_BASE}/linkedin/linkedin-original.svg` };
  }

  return null;
}

export function TechIcon({
  name,
  className = "w-4 h-4",
}: {
  name: string;
  className?: string;
}) {
  const key = name.toLowerCase();
  const devicon = getDeviconUrl(name);

  if (devicon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={devicon.url}
        alt={name}
        loading="lazy"
        className={cn(
          "object-contain select-none",
          devicon.invertDark && "dark:invert",
          className
        )}
      />
    );
  }

  // Official Instagram gradient logo
  if (key.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
        <rect x="4.8" y="4.8" width="14.4" height="14.4" rx="4" stroke="#fff" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.4" stroke="#fff" strokeWidth="1.6" />
        <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
      </svg>
    );
  }

  // RoadRunner illustrated mark
  if (key.includes("roadrunner")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#6366F1" />
        <path d="M6.5 16L10.5 8l3 5.5L17.5 8" stroke="#E0E7FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // CAS SSO security shield
  if (key.includes("cas") || key.includes("sso")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 2L4.5 5.5v5.5c0 5 3.2 9.4 7.5 10.8 4.3-1.4 7.5-5.8 7.5-10.8V5.5L12 2Z" fill="#10B981" />
        <path d="M9 12l2 2 4-4" stroke="#ECFDF5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Payment Gateways: Tripay, Digiflazz, Orkut
  if (key.includes("tripay") || key.includes("digiflazz") || key.includes("orkut")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="2" y="4.5" width="20" height="15" rx="3" fill="#0EA5E9" />
        <rect x="2" y="8" width="20" height="3" fill="#0369A1" />
        <circle cx="17" cy="15" r="1.8" fill="#FBBF24" />
        <circle cx="14.5" cy="15" r="1.8" fill="#F43F5E" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#38BDF8" />
      <circle cx="12" cy="12" r="4" fill="#FFFFFF" />
    </svg>
  );
}

export function TechBadge({
  name,
  size = "sm",
  className,
}: {
  name: string;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const sizeClasses =
    size === "xs"
      ? "text-[9px] px-2 py-0.5 gap-1.5"
      : size === "sm"
      ? "text-[11px] px-2.5 py-1 gap-1.5"
      : "text-xs px-3 py-1.5 gap-2";
  const iconSize = size === "xs" ? "w-3 h-3" : size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border/70 bg-muted/60 text-foreground font-mono font-medium transition-colors hover:border-primary/40 hover:bg-card",
        sizeClasses,
        className
      )}
    >
      <TechIcon name={name} className={cn(iconSize, "shrink-0")} />
      <span>{name}</span>
    </span>
  );
}
