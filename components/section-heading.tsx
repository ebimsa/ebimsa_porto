"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("space-y-2.5", className)}
    >
      <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
        <span className="text-[#fbbf24] font-black">{index}</span>
        <span className="text-primary/60">/</span>
        <span>{label ?? title}</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

