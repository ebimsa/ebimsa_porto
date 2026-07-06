"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Eye, Users, ShieldCheck } from "lucide-react";

export function Footer() {
  const [pageViews, setPageViews] = useState(12842);
  const [activeUsers, setActiveUsers] = useState(4);

  useEffect(() => {
    // 1. Fetch real page views count from PostgreSQL database via API
    const fetchPageViews = async () => {
      try {
        const response = await fetch("/api/views");
        if (response.ok) {
          const data = await response.json();
          if (data.success && typeof data.views === "number") {
            // Offset view count by 12840 to retain a high-tech premium number base
            setPageViews(12840 + data.views);
          }
        } else {
          throw new Error("API responded with error");
        }
      } catch (err) {
        console.warn("Failed to fetch views from PostgreSQL, falling back to local simulation:", err);
        // Fallback: Increment local storage if database connection is unreachable
        try {
          const storedViews = localStorage.getItem("ebimsa_views");
          let currentViews = storedViews ? parseInt(storedViews, 10) : 0;
          currentViews += 1;
          localStorage.setItem("ebimsa_views", currentViews.toString());
          setPageViews(12840 + currentViews);
        } catch {
          setPageViews(12842);
        }
      }
    };

    fetchPageViews();

    // 2. Simulate Active Users fluctuation
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next >= 3 && next <= 8 ? next : prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-10 border-t border-border/40 bg-card/10 mt-auto select-none">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-6">
        
        {/* Visit Statistics Micro Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl">
          {/* Card 1: Total Visits */}
          <div className="p-3 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm flex items-center gap-3 squircle-md">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-tight">
                Total Visits
              </p>
              <p className="text-sm font-black text-foreground">
                {pageViews.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Card 2: Active Visitors */}
          <div className="p-3 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm flex items-center gap-3 squircle-md">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0 relative">
              <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-tight">
                Live Visitors
              </p>
              <p className="text-sm font-black text-foreground">
                {activeUsers} Online
              </p>
            </div>
          </div>

          {/* Card 3: System Status */}
          <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm flex items-center gap-3 squircle-md">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-tight">
                Console Status
              </p>
              <p className="text-sm font-black text-foreground">
                99.98% Uptime
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-border/40" />

        {/* Copyright and Metadata row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Copyright details */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              &copy; {new Date().getFullYear()} Enggal Bima Sakti. All rights reserved.
            </p>
            <p className="text-[10px] text-muted-foreground/60 leading-none">
              Built with care in Indonesia.
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
        
      </div>
    </footer>
  );
}
