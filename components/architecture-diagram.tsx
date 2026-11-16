"use client";

import React from "react";

interface ArchitectureDiagramProps {
  projectId: "saidata" | "doripay" | "rasi" | "resqnet";
}

export function ArchitectureDiagram({ projectId }: ArchitectureDiagramProps) {
  if (projectId === "saidata") {
    return (
      <div className="w-full overflow-x-auto rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
        <div className="min-w-[600px]">
          <svg
            viewBox="0 0 720 260"
            className="w-full h-auto select-none"
            role="img"
            aria-label="Saidata System Architecture Diagram"
          >
            <defs>
              <marker
                id="arrow-saidata"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" className="fill-primary" />
              </marker>
            </defs>

            {/* Connecting Lines */}
            {/* React -> Laravel */}
            <line
              x1="175"
              y1="120"
              x2="255"
              y2="120"
              className="stroke-primary"
              strokeWidth="2"
              markerEnd="url(#arrow-saidata)"
            />
            {/* Laravel -> PostgreSQL */}
            <line
              x1="445"
              y1="120"
              x2="525"
              y2="120"
              className="stroke-primary"
              strokeWidth="2"
              markerEnd="url(#arrow-saidata)"
            />
            {/* Laravel <-> CAS SSO (Top) */}
            <line
              x1="350"
              y1="82"
              x2="350"
              y2="52"
              className="stroke-primary/70"
              strokeWidth="1.75"
              strokeDasharray="4 3"
              markerEnd="url(#arrow-saidata)"
            />
            {/* Laravel -> Playwright Sync (Bottom Left) */}
            <path
              d="M 310 158 L 310 205 L 225 205"
              fill="none"
              className="stroke-primary/70"
              strokeWidth="1.75"
              strokeDasharray="4 3"
              markerEnd="url(#arrow-saidata)"
            />
            {/* Laravel -> Telegram Bot (Bottom Right) */}
            <path
              d="M 390 158 L 390 205 L 475 205"
              fill="none"
              className="stroke-primary/70"
              strokeWidth="1.75"
              strokeDasharray="4 3"
              markerEnd="url(#arrow-saidata)"
            />

            {/* Node 1: React 19 Client */}
            <rect
              x="25"
              y="84"
              width="150"
              height="72"
              rx="12"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            <text x="100" y="114" textAnchor="middle" className="fill-foreground text-[12px] font-bold">
              React 19 Client
            </text>
            <text x="100" y="134" textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
              Vite · Recharts · Quill
            </text>

            {/* Node 2: Laravel 12 + Octane */}
            <rect
              x="255"
              y="82"
              width="190"
              height="76"
              rx="12"
              className="fill-primary/10 stroke-primary"
              strokeWidth="2"
            />
            <text x="350" y="110" textAnchor="middle" className="fill-foreground text-[12px] font-bold">
              Laravel 12 + Octane
            </text>
            <text x="350" y="128" textAnchor="middle" className="fill-primary text-[9.5px] font-semibold">
              RoadRunner · Workflow Engine
            </text>
            <text x="350" y="144" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              Word/PDF + QR Generator
            </text>

            {/* Node 3: PostgreSQL */}
            <rect
              x="525"
              y="84"
              width="170"
              height="72"
              rx="12"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            <text x="610" y="114" textAnchor="middle" className="fill-foreground text-[12px] font-bold">
              PostgreSQL
            </text>
            <text x="610" y="134" textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
              Relational + JSONB (GIN)
            </text>

            {/* Top Branch: CAS 2.0 SSO */}
            <rect
              x="265"
              y="10"
              width="170"
              height="40"
              rx="10"
              className="fill-background stroke-border"
              strokeWidth="1.25"
            />
            <text x="350" y="34" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">
              Campus CAS 2.0 SSO
            </text>

            {/* Bottom Left Branch: Node.js + Playwright */}
            <rect
              x="45"
              y="182"
              width="180"
              height="48"
              rx="10"
              className="fill-background stroke-border"
              strokeWidth="1.25"
            />
            <text x="135" y="203" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">
              Node.js + Playwright
            </text>
            <text x="135" y="219" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              Legacy Campus Sync Service
            </text>

            {/* Bottom Right Branch: Telegram Bot */}
            <rect
              x="475"
              y="182"
              width="180"
              height="48"
              rx="10"
              className="fill-background stroke-border"
              strokeWidth="1.25"
            />
            <text x="565" y="203" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">
              Telegram Bot API
            </text>
            <text x="565" y="219" textAnchor="middle" className="fill-muted-foreground text-[9px]">
              Real-time Validator Alerts
            </text>
          </svg>
        </div>
      </div>
    );
  }

  if (projectId === "rasi") {
    return (
      <div className="w-full overflow-x-auto rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
        <div className="min-w-[600px]">
          <svg
            viewBox="0 0 720 240"
            className="w-full h-auto select-none"
            role="img"
            aria-label="RASI System Architecture Diagram"
          >
            <defs>
              <marker
                id="arrow-rasi"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" className="fill-primary" />
              </marker>
            </defs>

            <line x1="175" y1="110" x2="255" y2="110" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-rasi)" />
            <line x1="445" y1="110" x2="525" y2="110" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-rasi)" />
            <line x1="350" y1="148" x2="210" y2="180" className="stroke-primary/70" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-rasi)" />
            <line x1="350" y1="148" x2="490" y2="180" className="stroke-primary/70" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-rasi)" />

            <rect x="25" y="75" width="150" height="70" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
            <text x="100" y="106" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Next.js App</text>
            <text x="100" y="124" textAnchor="middle" className="fill-muted-foreground text-[10px]">TypeScript · Tailwind</text>

            <rect x="260" y="70" width="180" height="78" rx="12" className="fill-card stroke-primary" strokeWidth="2" />
            <text x="350" y="103" textAnchor="middle" className="fill-foreground text-[12px] font-bold">4-Stage Research UI</text>
            <text x="350" y="121" textAnchor="middle" className="fill-primary text-[9.5px] font-semibold">Risk · Broker · Radar · AI</text>

            <rect x="530" y="75" width="160" height="70" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
            <text x="610" y="106" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Market Data</text>
            <text x="610" y="124" textAnchor="middle" className="fill-muted-foreground text-[10px]">IDX Ticker Analytics</text>

            <rect x="80" y="178" width="210" height="44" rx="10" className="fill-background stroke-border" strokeWidth="1.25" />
            <text x="185" y="198" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">Adaptive Design System</text>
            <text x="185" y="212" textAnchor="middle" className="fill-muted-foreground text-[9px]">Light / Dark Mode + Motion</text>

            <rect x="420" y="178" width="210" height="44" rx="10" className="fill-background stroke-border" strokeWidth="1.25" />
            <text x="525" y="198" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">Unit Test Suite</text>
            <text x="525" y="212" textAnchor="middle" className="fill-muted-foreground text-[9px]">Verified Metric Calculations</text>
          </svg>
        </div>
      </div>
    );
  }

  if (projectId === "resqnet") {
    return (
      <div className="w-full overflow-x-auto rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
        <div className="min-w-[600px]">
          <svg
            viewBox="0 0 720 240"
            className="w-full h-auto select-none"
            role="img"
            aria-label="ResQ-NET Tactical Mesh Architecture Diagram"
          >
            <defs>
              <marker
                id="arrow-resqnet"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" className="fill-primary" />
              </marker>
            </defs>

            <line x1="175" y1="110" x2="255" y2="110" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-resqnet)" />
            <line x1="445" y1="110" x2="525" y2="110" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrow-resqnet)" />
            <line x1="350" y1="148" x2="210" y2="180" className="stroke-primary/70" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-resqnet)" />
            <line x1="350" y1="148" x2="490" y2="180" className="stroke-primary/70" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-resqnet)" />

            <rect x="25" y="75" width="150" height="70" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
            <text x="100" y="106" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Field ESP32 Node</text>
            <text x="100" y="124" textAnchor="middle" className="fill-muted-foreground text-[10px]">Passive WiFi Sniffing</text>

            <rect x="260" y="70" width="180" height="78" rx="12" className="fill-card stroke-primary" strokeWidth="2" />
            <text x="350" y="103" textAnchor="middle" className="fill-foreground text-[12px] font-bold">LoRa Mesh 433MHz</text>
            <text x="350" y="121" textAnchor="middle" className="fill-primary text-[9.5px] font-semibold">Binary Protocol · Multi-Hop</text>

            <rect x="530" y="75" width="160" height="70" rx="12" className="fill-card stroke-border" strokeWidth="1.5" />
            <text x="610" y="106" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Command Center</text>
            <text x="610" y="124" textAnchor="middle" className="fill-muted-foreground text-[10px]">Offline SAR Map UI</text>

            <rect x="80" y="178" width="210" height="44" rx="10" className="fill-background stroke-border" strokeWidth="1.25" />
            <text x="185" y="198" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">Victim Detection</text>
            <text x="185" y="212" textAnchor="middle" className="fill-muted-foreground text-[9px]">Blank Spot Probe Telemetry</text>

            <rect x="420" y="178" width="210" height="44" rx="10" className="fill-background stroke-border" strokeWidth="1.25" />
            <text x="525" y="198" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">Gateway Serial Link</text>
            <text x="525" y="212" textAnchor="middle" className="fill-muted-foreground text-[9px]">Zero-Internet Real-Time Sync</text>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
      <div className="min-w-[600px]">
        <svg
          viewBox="0 0 720 260"
          className="w-full h-auto select-none"
          role="img"
          aria-label="DoriPay System Architecture Diagram"
        >
          <defs>
            <marker
              id="arrow-doripay"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" className="fill-primary" />
            </marker>
          </defs>

          {/* Connecting Lines */}
          {/* Svelte -> Go Fiber */}
          <line
            x1="175"
            y1="115"
            x2="255"
            y2="115"
            className="stroke-primary"
            strokeWidth="2"
            markerEnd="url(#arrow-doripay)"
          />
          {/* Go Fiber -> PostgreSQL */}
          <line
            x1="445"
            y1="115"
            x2="525"
            y2="115"
            className="stroke-primary"
            strokeWidth="2"
            markerEnd="url(#arrow-doripay)"
          />
          {/* Go Fiber -> Tripay (Bottom Left) */}
          <path
            d="M 310 153 L 310 205 L 225 205"
            fill="none"
            className="stroke-primary/70"
            strokeWidth="1.75"
            strokeDasharray="4 3"
            markerEnd="url(#arrow-doripay)"
          />
          {/* Go Fiber -> Digiflazz / Orkut (Bottom Right) */}
          <path
            d="M 390 153 L 390 205 L 475 205"
            fill="none"
            className="stroke-primary/70"
            strokeWidth="1.75"
            strokeDasharray="4 3"
            markerEnd="url(#arrow-doripay)"
          />
          {/* Webhook Callback -> Go Fiber (Top) */}
          <line
            x1="350"
            y1="50"
            x2="350"
            y2="77"
            className="stroke-primary"
            strokeWidth="1.75"
            markerEnd="url(#arrow-doripay)"
          />

          {/* Node 1: Svelte Client */}
          <rect
            x="25"
            y="79"
            width="150"
            height="72"
            rx="12"
            className="fill-background stroke-border"
            strokeWidth="1.5"
          />
          <text x="100" y="109" textAnchor="middle" className="fill-foreground text-[12px] font-bold">
            Svelte Client
          </text>
          <text x="100" y="129" textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
            Svelte Stores · RBAC UI
          </text>

          {/* Node 2: Go Fiber */}
          <rect
            x="255"
            y="77"
            width="190"
            height="76"
            rx="12"
            className="fill-primary/10 stroke-primary"
            strokeWidth="2"
          />
          <text x="350" y="105" textAnchor="middle" className="fill-foreground text-[12px] font-bold">
            Go Fiber Backend
          </text>
          <text x="350" y="123" textAnchor="middle" className="fill-primary text-[9.5px] font-semibold">
            Clean Architecture · ACID
          </text>
          <text x="350" y="139" textAnchor="middle" className="fill-muted-foreground text-[9px]">
            Idempotency Key Guard
          </text>

          {/* Node 3: PostgreSQL */}
          <rect
            x="525"
            y="79"
            width="170"
            height="72"
            rx="12"
            className="fill-background stroke-border"
            strokeWidth="1.5"
          />
          <text x="610" y="109" textAnchor="middle" className="fill-foreground text-[12px] font-bold">
            PostgreSQL (pgx)
          </text>
          <text x="610" y="129" textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
            Pessimistic Row Locking
          </text>

          {/* Top Branch: Webhook Callback */}
          <rect
            x="255"
            y="10"
            width="190"
            height="40"
            rx="10"
            className="fill-background stroke-border"
            strokeWidth="1.25"
          />
          <text x="350" y="34" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">
            Signed Webhook Callbacks
          </text>

          {/* Bottom Left Branch: Tripay Gateway */}
          <rect
            x="45"
            y="182"
            width="180"
            height="48"
            rx="10"
            className="fill-background stroke-border"
            strokeWidth="1.25"
          />
          <text x="135" y="203" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">
            Tripay Gateway
          </text>
          <text x="135" y="219" textAnchor="middle" className="fill-muted-foreground text-[9px]">
            QRIS · Virtual Account · E-Wallet
          </text>

          {/* Bottom Right Branch: Digiflazz & Orkut */}
          <rect
            x="475"
            y="182"
            width="180"
            height="48"
            rx="10"
            className="fill-background stroke-border"
            strokeWidth="1.25"
          />
          <text x="565" y="203" textAnchor="middle" className="fill-foreground text-[10.5px] font-bold">
            Digiflazz & Orkut API
          </text>
          <text x="565" y="219" textAnchor="middle" className="fill-muted-foreground text-[9px]">
            PPOB Fulfillment Providers
          </text>
        </svg>
      </div>
    </div>
  );
}

