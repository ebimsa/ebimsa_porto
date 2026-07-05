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
      title: "Backend Systems",
      desc: "Architecting high-throughput, low-latency APIs and serverless microservices. Specialized in Go, Rust, Node.js, and SQL/NoSQL databases.",
    },
    {
      icon: Brain,
      title: "Artificial Intelligence",
      desc: "Integrating machine learning models, designing Retrieval-Augmented Generation (RAG) pipelines, and orchestrating multi-agent LLM systems.",
    },
    {
      icon: Code,
      title: "Full Stack Craft",
      desc: "Creating pixel-perfect, accessible frontends using Next.js, React, and Tailwind CSS, coupled with robust server integrations.",
    },
    {
      icon: Cpu,
      title: "Scalable Applications",
      desc: "Utilizing modern cloud platforms, container orchestrators (Docker, Kubernetes), and queue engines (Redis, RabbitMQ) to handle heavy workloads.",
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

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Biography
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Engineering from first principles.
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                I am Enggal Bima Sakti (Ebimsa), a Computer Science student and Software Engineer based in Indonesia. My coding philosophy revolves around simplicity, clean architecture, and technical precision.
              </p>
              <p>
                Whether it&apos;s deploying high-performance distributed backend microservices or designing LLM applications, I focus on crafting scalable, well-documented, and thoroughly tested solutions.
              </p>
              <p>
                I constantly push myself to learn new architectural patterns, system design trade-offs, and advanced machine learning concepts. I thrive on solving complex, multi-dimensional problems that require out-of-the-box product thinking.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/60">
              <div>
                <p className="text-3xl font-bold text-foreground">95+</p>
                <p className="text-xs text-muted-foreground font-medium">Lighthouse Performance Target</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground font-medium">Commitment to Clean Code</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Engineering Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative p-6 rounded-3xl border border-border bg-card hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 squircle-lg flex flex-col justify-between min-h-[220px]"
                >
                  {/* Subtle Glowing Corner Decoration on Hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground group-hover:text-primary group-hover:border-primary/25 transition-all duration-300 squircle-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
