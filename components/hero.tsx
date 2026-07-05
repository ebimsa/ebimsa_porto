"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, ArrowRight } from "lucide-react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const subheadlines = [
    "Computer Science Student",
    "Software Engineer",
    "Full Stack Developer",
    "AI Enthusiast",
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 overflow-hidden bg-dot-pattern">
      {/* Decorative Glowing Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Central Spotlight Glow (Duck Egg Green glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px] dark:bg-primary/5 opacity-80" />
        
        {/* Subtle Accent Glow (Top Right) */}
        <div className="absolute top-1/4 right-[15%] w-[350px] h-[350px] rounded-full bg-primary/8 blur-[100px] dark:bg-primary/3 animate-pulse-slow" />
        
        {/* Subtle Accent Glow (Bottom Left) */}
        <div className="absolute bottom-1/4 left-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[90px] dark:bg-primary/2" />

        {/* Center Geometric Wireframe Backdrop (Contours reflecting the logo geometry without initials) */}
        <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex justify-center items-center opacity-25 dark:opacity-15 select-none pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full stroke-primary/30 dark:stroke-primary/20 stroke-[1.25] animate-float"
            >
              <defs>
                <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Nested Squircle Wireframe Contours */}
              <rect x="10" y="10" width="180" height="180" rx="56" stroke="url(#wireGrad)" />
              <rect x="25" y="25" width="150" height="150" rx="46" stroke="url(#wireGrad)" />
              <rect x="40" y="40" width="120" height="120" rx="36" stroke="url(#wireGrad)" />
              <rect x="55" y="55" width="90" height="90" rx="26" stroke="url(#wireGrad)" />
              <rect x="70" y="70" width="60" height="60" rx="16" stroke="url(#wireGrad)" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col items-start justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col gap-6"
        >
          {/* Subheadline Badges / Stack */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 items-center">
            {subheadlines.map((text) => (
              <span
                key={text}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground border border-border bg-card/60 rounded-full"
              >
                {text}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground"
          >
            Building{" "}
            <span className="text-logo-gradient">
              intelligent software
            </span>{" "}
            with elegant engineering.
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl"
          >
            I am Enggal Bima Sakti (Ebimsa), a Computer Science Student, Software Engineer, Full Stack Developer, and AI enthusiast from Indonesia. I build high-performance applications, robust backend microservices, and modern user experiences.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2 pt-2"
          >
            {/* Primary CTA */}
            <a
              href="#projects"
              className="group btn-logo-glossy flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm squircle-md"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm text-foreground hover:bg-muted/80 font-semibold text-sm transition-all squircle-md hover:border-foreground/20"
            >
              <FileText className="w-4 h-4 text-muted-foreground" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest">Discover</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
