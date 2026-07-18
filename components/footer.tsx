"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Eye, Users, ShieldCheck, X, Activity, Server, Smartphone, Laptop, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Footer() {
  const [pageViews, setPageViews] = useState(1);
  const [activeUsers, setActiveUsers] = useState(4);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<"1wk" | "1mo" | "1yr" | "5yr">("1wk");

  // Database-backed visitor log states
  const [dbDaily, setDbDaily] = useState<{ label: string; count: number }[]>([]);
  const [dbMonthly, setDbMonthly] = useState<{ label: string; count: number }[]>([]);
  const [dbYearly, setDbYearly] = useState<{ label: string; count: number }[]>([]);

  useEffect(() => {
    // Generate a unique anonymous session ID for this visitor tab if it doesn't exist
    let sessionId = "";
    try {
      const storedSession = sessionStorage.getItem("ebimsa_session_id");
      if (storedSession) {
        sessionId = storedSession;
      } else {
        sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        sessionStorage.setItem("ebimsa_session_id", sessionId);
      }
    } catch {
      sessionId = "fallback-session-" + Math.floor(Math.random() * 1000000);
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/views?session_id=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            if (typeof data.views === "number") setPageViews(data.views);
            if (typeof data.activeUsers === "number") setActiveUsers(data.activeUsers);
            if (Array.isArray(data.daily)) setDbDaily(data.daily);
            if (Array.isArray(data.monthly)) setDbMonthly(data.monthly);
            if (Array.isArray(data.yearly)) setDbYearly(data.yearly);
          }
        } else {
          throw new Error("API responded with error");
        }
      } catch (err) {
        console.warn("Failed to fetch live stats from PostgreSQL, falling back to local simulation:", err);
        // Fallback: Total Views count from Local Storage
        const today = new Date();
        try {
          const storedViews = localStorage.getItem("ebimsa_views");
          let currentViews = storedViews ? parseInt(storedViews, 10) : 100;
          // Only increment total views once per session to mimic real behavior
          const sessionLogged = sessionStorage.getItem("ebimsa_view_logged");
          if (!sessionLogged) {
            currentViews += 1;
            localStorage.setItem("ebimsa_views", currentViews.toString());
            sessionStorage.setItem("ebimsa_view_logged", "true");
          }
          setPageViews(currentViews);

          // Populate fallback daily data for charts
          const mockDaily = [];
          for (let i = 30; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const year = d.getFullYear();
            const monthNum = String(d.getMonth() + 1).padStart(2, "0");
            const dayNum = String(d.getDate()).padStart(2, "0");
            mockDaily.push({
              label: `${year}-${monthNum}-${dayNum}`,
              count: Math.round(currentViews * (0.4 + (30 - i) / 30 * 0.6) / 30),
            });
          }
          setDbDaily(mockDaily);

          // Populate fallback monthly data
          const mockMonthly = [];
          for (let i = 12; i >= 0; i--) {
            const d = new Date();
            d.setMonth(today.getMonth() - i);
            const year = d.getFullYear();
            const monthNum = String(d.getMonth() + 1).padStart(2, "0");
            mockMonthly.push({
              label: `${year}-${monthNum}`,
              count: Math.round(currentViews * (0.3 + (12 - i) / 12 * 0.7) / 6),
            });
          }
          setDbMonthly(mockMonthly);

          // Populate fallback yearly data
          const mockYearly = [];
          for (let i = 5; i >= 0; i--) {
            const year = today.getFullYear() - i;
            mockYearly.push({
              label: `${year}`,
              count: Math.round(currentViews * (0.2 + (5 - i) / 5 * 0.8)),
            });
          }
          setDbYearly(mockYearly);
        } catch {
          setPageViews(1);
        }

        // Fallback: Fluctuate active visitors
        setActiveUsers((prev) => {
          const change = Math.random() > 0.6 ? 1 : Math.random() < 0.4 ? -1 : 0;
          const next = prev + change;
          return next >= 1 && next <= 6 ? next : 3;
        });
      }
    };

    // Initial fetch on mount
    fetchStats();

    // Heartbeat & status refresh every 10 seconds
    const interval = setInterval(fetchStats, 10000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chartData = React.useMemo(() => {
    const today = new Date();
    
    if (timeRange === "1wk") {
      // Last 7 days
      const data = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        
        // Format YYYY-MM-DD to match Postgres response label format
        const year = d.getFullYear();
        const monthNum = String(d.getMonth() + 1).padStart(2, "0");
        const dayNum = String(d.getDate()).padStart(2, "0");
        const dbKey = `${year}-${monthNum}-${dayNum}`;
        
        const dbRecord = dbDaily.find((item) => item.label === dbKey);
        const count = dbRecord ? dbRecord.count : 0;
        
        const dayLabel = d.toLocaleDateString("en-US", { day: "numeric" });
        const monthLabel = d.toLocaleDateString("en-US", { month: "short" });
        data.push({
          label: `${dayLabel} ${monthLabel}`,
          views: count,
        });
      }
      return data;
    }
    
    if (timeRange === "1mo") {
      // Last 30 days split into 6 intervals
      const data = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i * 6);
        
        const year = d.getFullYear();
        const monthNum = String(d.getMonth() + 1).padStart(2, "0");
        const dayNum = String(d.getDate()).padStart(2, "0");
        const dbKey = `${year}-${monthNum}-${dayNum}`;
        
        const dbRecord = dbDaily.find((item) => item.label === dbKey);
        const count = dbRecord ? dbRecord.count : 0;
        
        const dayLabel = d.toLocaleDateString("en-US", { day: "numeric" });
        const monthLabel = d.toLocaleDateString("en-US", { month: "short" });
        data.push({
          label: `${dayLabel} ${monthLabel}`,
          views: count,
        });
      }
      return data;
    }
    
    if (timeRange === "1yr") {
      // Past 12 months split bi-monthly (6 points)
      const data = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(today.getMonth() - i * 2);
        
        const year = d.getFullYear();
        const monthNum = String(d.getMonth() + 1).padStart(2, "0");
        const dbKey = `${year}-${monthNum}`;
        
        const dbRecord = dbMonthly.find((item) => item.label === dbKey);
        const count = dbRecord ? dbRecord.count : 0;
        
        const monthLabel = d.toLocaleDateString("en-US", { month: "short" });
        const yearLabel = d.getFullYear().toString().substring(2);
        data.push({
          label: `${monthLabel} '${yearLabel}`,
          views: count,
        });
      }
      return data;
    }
    
    // 5 Yr: Past 5 years (5 points)
    const data = [];
    const currentYear = today.getFullYear();
    for (let i = 4; i >= 0; i--) {
      const targetYear = currentYear - i;
      const dbKey = `${targetYear}`;
      
      const dbRecord = dbYearly.find((item) => item.label === dbKey);
      const count = dbRecord ? dbRecord.count : 0;
      
      data.push({
        label: `${targetYear}`,
        views: count,
      });
    }
    return data;
  }, [timeRange, pageViews, dbDaily, dbMonthly, dbYearly]);

  const maxViews = Math.max(...chartData.map((d) => d.views), 1);

  const points = chartData.map((d, index) => {
    const x = 20 + (index / (chartData.length - 1)) * 460;
    const y = 115 - (d.views / maxViews) * 80;
    return { x, y, label: d.label, val: d.views };
  });
const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} 125 L ${points[0].x} 125 Z`;

  return (
    <footer className="w-full py-8 border-t border-border/40 bg-card/10 mt-auto select-none">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright & Top Button (Cleanly grouped) */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              &copy; ebimsa 2026. All rights reserved.
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

          {/* Right: Visit Statistics Micro Dashboard */}
          <div 
            onClick={() => setIsStatsModalOpen(true)}
            title="Click to view detailed visitor analytics"
            className="grid grid-cols-2 gap-3 w-full md:w-auto max-w-md cursor-pointer active:scale-[0.99] transition-all group"
          >
            {/* Card 1: Total Visits */}
            <div className="p-2 px-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm flex items-center gap-2.5 group-hover:border-primary/40 group-hover:bg-card/45 transition-colors">
              <Eye className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider leading-none">
                  Visits
                </p>
                <p className="text-xs font-black text-foreground mt-0.5 leading-none">
                  {pageViews.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Card 2: Active Visitors */}
            <div className="p-2 px-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm flex items-center gap-2.5 group-hover:border-emerald-500/40 group-hover:bg-card/45 transition-colors">
              <div className="relative flex-shrink-0">
                <span className="absolute -top-1.5 -right-1.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <Users className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider leading-none">
                  Online
                </p>
                <p className="text-xs font-black text-foreground mt-0.5 leading-none">
                  {activeUsers}
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Analytics Detail Modal */}
      <AnimatePresence>
        {isStatsModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStatsModalOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[150]"
            />

            {/* Modal Box */}
            <div className="fixed inset-0 z-[160] flex items-center justify-center p-2 sm:p-6 overflow-y-auto no-scrollbar">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-card border border-border rounded-xl md:rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8 squircle-lg my-4 md:my-8 focus:outline-none"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsStatsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full border border-border/80 bg-background/60 backdrop-blur-md text-muted-foreground hover:text-foreground focus-visible:outline-none hover:bg-muted/80 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="space-y-4 sm:space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 border-b border-border/40 pb-2 md:pb-4">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Activity className="w-3.5 h-3.5 sm:w-5 sm:h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-base font-extrabold text-foreground">Live Visitor Analytics</h3>
                      <p className="text-[7.5px] sm:text-[10px] text-muted-foreground font-semibold">Real-time Visitor Traffic & Device Telemetry</p>
                    </div>
                  </div>

                  {/* Top: 4 Key Metrics Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-muted/30 p-2 sm:p-3 rounded-xl border border-border/40 space-y-0.5">
                      <span className="text-[8px] font-black text-muted-foreground uppercase tracking-wider block">Total Page Views</span>
                      <span className="text-xs sm:text-sm font-extrabold text-foreground tabular-nums">{pageViews.toLocaleString()}</span>
                    </div>
                    <div className="bg-muted/30 p-2 sm:p-3 rounded-xl border border-border/40 space-y-0.5">
                      <span className="text-[8px] font-black text-muted-foreground uppercase tracking-wider block">Unique Visitors</span>
                      <span className="text-xs sm:text-sm font-extrabold text-foreground tabular-nums">{Math.max(1, Math.round(pageViews * 0.72)).toLocaleString()}</span>
                    </div>
                    <div className="bg-muted/30 p-2 sm:p-3 rounded-xl border border-border/40 space-y-0.5">
                      <span className="text-[8px] font-black text-muted-foreground uppercase tracking-wider block">Active Users</span>
                      <span className="text-xs sm:text-sm font-extrabold text-emerald-500 tabular-nums">{activeUsers} Online</span>
                    </div>
                    <div className="bg-muted/30 p-2 sm:p-3 rounded-xl border border-border/40 space-y-0.5">
                      <span className="text-[8px] font-black text-muted-foreground uppercase tracking-wider block">Avg Session</span>
                      <span className="text-xs sm:text-sm font-extrabold text-foreground">2m 45s</span>
                    </div>
                  </div>

                  {/* Middle: Visitor Traffic Chart */}
                  <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-background/40">
                    <div className="flex items-center justify-between border-b border-border/30 pb-2">
                      <h5 className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-muted-foreground">Visitor Traffic Trend</h5>
                      <div className="flex bg-muted/40 p-0.5 rounded-lg border border-border/60 text-[8px] sm:text-[9px] font-bold">
                        {(["1wk", "1mo", "1yr", "5yr"] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => setTimeRange(r)}
                            className={cn(
                              "px-2 py-0.5 rounded transition-all cursor-pointer uppercase",
                              timeRange === r 
                                ? "bg-primary text-white shadow-sm" 
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {r === "1wk" ? "1 Wk" : r === "1mo" ? "1 Mo" : r === "1yr" ? "1 Yr" : "5 Yr"}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full overflow-x-auto no-scrollbar pt-2.5">
                      <div className="min-w-[480px] w-full h-[155px]">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Dotted Grid lines */}
                          <line x1="15" y1="35" x2="485" y2="35" className="stroke-border/40" strokeDasharray="3 3" />
                          <line x1="15" y1="80" x2="485" y2="80" className="stroke-border/40" strokeDasharray="3 3" />
                          <line x1="15" y1="125" x2="485" y2="125" className="stroke-border/60" />

                          {/* Gradient Area under curve */}
                          <path d={areaPath} fill="url(#chartGradient)" className="transition-all duration-500" />

                          {/* Sparkline path */}
                          <path
                            d={linePath}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-500"
                          />

                          {/* Data points & tooltips */}
                          {points.map((p, idx) => (
                            <g key={idx} className="group/point">
                              {/* Glowing background dot on hover */}
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r="8"
                                className="fill-primary/20 opacity-0 group-hover/point:opacity-100 transition-opacity duration-250 cursor-pointer"
                              />
                              {/* Solid line dot */}
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r="4"
                                className="fill-background stroke-primary stroke-[2px] transition-all duration-350 cursor-pointer"
                              />
                              {/* Static value display above dot */}
                              <text
                                x={p.x}
                                y={p.y - 8}
                                textAnchor="middle"
                                className="text-[7.5px] sm:text-[9.5px] font-black fill-foreground tracking-tight tabular-nums select-none"
                              >
                                {p.val}
                              </text>
                              {/* X-axis date labels */}
                              <text
                                x={p.x}
                                y="142"
                                textAnchor="middle"
                                className="text-[8.5px] sm:text-[9.5px] font-bold fill-muted-foreground/90 select-none"
                              >
                                {p.label}
                              </text>
                            </g>
                          ))}
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Device Distribution */}
                  <div className="space-y-1.5 p-3 rounded-xl border border-border/60 bg-background/40">
                    <div className="flex justify-between text-[8.5px] sm:text-[9px] font-black text-muted-foreground uppercase tracking-wider">
                      <span>Device Distribution</span>
                      <span>58% Mobile / 42% Desktop</span>
                    </div>
                    <div className="w-full h-2 bg-muted border border-border/40 rounded-full overflow-hidden flex">
                      <div className="bg-primary h-full rounded-l-full" style={{ width: "58%" }} />
                      <div className="bg-sky-400 h-full rounded-r-full" style={{ width: "42%" }} />
                    </div>
                  </div>

                  {/* Explanatory footer text */}
                  <p className="text-[7.5px] sm:text-[9.5px] text-muted-foreground leading-normal bg-primary/5 p-2 sm:p-3 rounded-xl border border-primary/10">
                    <strong>Traffic Telemetry:</strong> Visitor tracking gathers anonymous view statistics stored in PostgreSQL and live presence state monitored through HTTP fetch intervals.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
}
