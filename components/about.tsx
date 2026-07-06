"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Server, Brain, Code, Cpu } from "lucide-react";

export function About() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  const pillars = [
    {
      icon: Server,
      title: "Backend Development",
      desc: "Learning to build API services, handle databases, and understand server logic using Go, Node.js, and SQL.",
    },
    {
      icon: Brain,
      title: "AI & LLM Integration",
      desc: "Exploring how to connect LLMs with custom data sources (RAG) and building simple, helpful AI utilities.",
    },
    {
      icon: Code,
      title: "Web Development",
      desc: "Building responsive, modern user interfaces using Next.js, React, and standard CSS.",
    },
    {
      icon: Cpu,
      title: "Systems & Cloud",
      desc: "Experimenting with containerized environments using Docker and learning about cloud-native basics.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Profile Image */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 overflow-hidden squircle-md border border-border bg-card shadow-sm group">
              <Image
                src="/semipro_enggal.png"
                alt="Enggal Bima Sakti"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
                Biography
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                Learning and building step by step.
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                Hi! I am Enggal Bima Sakti, currently in my final year of studying Computer Science at Universitas Indonesia. I enjoy building things with code and exploring new technologies.
              </p>
              <p>
                I am particularly interested in backend engineering and artificial intelligence. I try my best to write clean, easy-to-understand code and learn from every project I work on.
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/60">
              <div>
                <p className="text-sm font-bold text-foreground">Education</p>
                <p className="text-xs text-muted-foreground font-medium">CS Student, Universitas Indonesia</p>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Focus</p>
                <p className="text-xs text-muted-foreground font-medium">Backend & Web Applications</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Engineering Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border bg-card hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[180px] sm:min-h-[220px]"
                >
                  {/* Subtle Glowing Corner Decoration on Hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-muted border border-border flex items-center justify-center text-foreground group-hover:text-primary group-hover:border-primary/25 transition-all duration-300 squircle-sm">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="font-bold text-xs sm:text-base md:text-lg text-foreground tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
