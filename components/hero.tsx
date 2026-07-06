"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

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

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden bg-dot-pattern">
      {/* Decorative Glowing Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Teal Center Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-primary/10 blur-[110px] dark:bg-primary/5 animate-pulse-slow" />
      </div>

      {/* Main Hero Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center gap-6"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-foreground"
          >
            Hi, I&apos;m <span className="text-logo-gradient">Enggal Bima Sakti.</span>
          </motion.h1>

          {/* Concise Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl"
          >
            I am a final-year Computer Science student at Universitas Indonesia. I enjoy building backend services, exploring AI, and crafting simple, functional web applications.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <a
              href="#projects"
              className="group btn-logo-glossy flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-xs squircle-md w-full sm:w-auto"
            >
              Explore Projects
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Secondary CTA */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-border bg-card/60 backdrop-blur-sm text-foreground hover:bg-muted/80 font-semibold text-xs transition-all squircle-md hover:border-foreground/20 w-full sm:w-auto"
            >
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
