"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { ArrowDownIllustration } from "@/components/ui-icons";
import { TechIcon } from "@/components/tech-icons";

const LETTERS = [
  { char: "E", targetChar: "e", keep: true },
  { char: "n", targetChar: "", keep: false },
  { char: "g", targetChar: "", keep: false },
  { char: "g", targetChar: "", keep: false },
  { char: "a", targetChar: "", keep: false },
  { char: "l", targetChar: "", keep: false },
  { char: " ", targetChar: "", keep: false, isSpace: true },
  { char: "B", targetChar: "b", keep: true },
  { char: "i", targetChar: "i", keep: true },
  { char: "m", targetChar: "m", keep: true },
  { char: "a", targetChar: "", keep: false },
  { char: " ", targetChar: "", keep: false, isSpace: true },
  { char: "S", targetChar: "s", keep: true },
  { char: "a", targetChar: "a", keep: true },
  { char: "k", targetChar: "", keep: false },
  { char: "t", targetChar: "", keep: false },
  { char: "i", targetChar: "", keep: false },
];

/**
 * Merged Hero Heading:
 * Starts as "Enggal Bima Sakti" and smoothly collapses into "ebimsa" right in the Hero
 * without any blocking loading screen. Hovering/clicking lets the visitor peek at the full name.
 */
function HeroNameMorph() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCollapsed(true);
    }, 950);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      onClick={() => setCollapsed((prev) => !prev)}
      title="Enggal Bima Sakti (ebimsa)"
      className="inline-flex flex-col items-center justify-center cursor-pointer select-none"
    >
      {/* Morphing Name Heading */}
      <h1
        aria-label="Enggal Bima Sakti (ebimsa)"
        className="flex items-end justify-center font-black tracking-tight leading-[0.98] text-4xl sm:text-7xl md:text-8xl"
      >
        {LETTERS.map((item, index) => {
          const showChar = collapsed && item.keep ? item.targetChar : item.char;
          const isCollapsing = collapsed && !item.keep;

          return (
            <motion.span
              key={index}
              className={`inline-block overflow-hidden whitespace-nowrap text-center align-bottom transition-colors duration-300 ${
                collapsed && item.keep
                  ? "text-logo-gradient font-black"
                  : "text-foreground font-black"
              }`}
              initial={{ opacity: 0, y: 14, maxWidth: "90px" }}
              animate={{
                opacity: isCollapsing ? 0 : 1,
                y: 0,
                maxWidth: isCollapsing ? "0px" : "90px",
                marginRight: isCollapsing
                  ? "0px"
                  : item.isSpace
                  ? "0.22em"
                  : "0.005em",
              }}
              transition={{
                opacity: {
                  duration: isCollapsing ? 0.25 : 0.3,
                  delay: isCollapsing ? 0 : index * 0.015,
                },
                y: {
                  duration: 0.3,
                  delay: index * 0.015,
                  type: "spring",
                  stiffness: 140,
                },
                maxWidth: {
                  duration: 0.42,
                  ease: "easeInOut",
                },
                marginRight: {
                  duration: 0.42,
                  ease: "easeInOut",
                },
              }}
            >
              {showChar}
            </motion.span>
          );
        })}
      </h1>

      {/* Solid Accent Underline */}
      <motion.div
        className="h-1 bg-[#38bdf8] mt-4 rounded-full"
        initial={{ width: "180px", opacity: 0.85 }}
        animate={{
          width: collapsed ? "96px" : "200px",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </div>
  );
}

/** Typewriter that cycles through roles. */
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const delay = deleting ? 28 : text === word ? 1600 : 60;
    const t = setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        return setIdx((i) => (i + 1) % words.length);
      }
      setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, idx, words]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle animate-pulse" />
    </span>
  );
}

/** Interactive particle network that reacts to the cursor. */
function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      raf = 0;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];

    const color = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#38bdf8";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.floor((w * h) / 14000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const c = color();
      const LINK = 120;
      const MOUSE = 170;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE && d > 0) {
            p.x += (dx / d) * 1.2;
            p.y += (dy / d) * 1.2;
          }
        }
        ctx.globalAlpha = 0.78;
        ctx.fillStyle = i % 7 === 0 ? "#fbbf24" : i % 3 === 0 ? "#a7f3d0" : c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, i % 7 === 0 ? 2 : 1.6, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.35;
            ctx.strokeStyle = c;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (md < MOUSE) {
          ctx.globalAlpha = (1 - md / MOUSE) * 0.6;
          ctx.strokeStyle = c;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
}

export function Hero() {
  const { t } = useT();

  const roles = [
    t("hero.role1"),
    t("hero.role2"),
    t("hero.role3"),
    t("hero.role4"),
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-background"
    >
      <ParticleField />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center space-y-7">
        <HeroNameMorph />

        <p className="text-base sm:text-xl md:text-2xl font-mono text-muted-foreground min-h-[2lh]">
          <span className="text-[#fbbf24] font-bold">&gt;</span> <Typewriter words={roles} />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <a
            href="#projects"
            className="btn-logo-glossy inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          >
            <span>{t("hero.viewProjects")}</span>
            <ArrowDownIllustration className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/enggalbima"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-border bg-card hover:border-primary transition-all"
          >
            <TechIcon name="github" className="w-4 h-4" />
            <span>{t("hero.github")}</span>
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#console"
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-80 hover:opacity-100 transition-opacity"
      >
        <ArrowDownIllustration className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
