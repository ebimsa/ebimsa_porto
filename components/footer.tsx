"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-8 border-t border-border/40 bg-card/10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Copyright details */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} Enggal Bima Sakti. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground/60 leading-none">
            Designed and engineered from first principles in Indonesia.
          </p>
        </div>

        {/* Back to top & stack details */}
        <div className="flex items-center gap-6">
          <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
            Next.js 16 • Tailwind CSS v4 • Framer Motion
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-md p-1"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
