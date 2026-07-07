"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Database, Code, Cpu } from "lucide-react";

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
      desc: "Building performant API services, optimizing database schemas, and handling distributed transaction states using Go, Redis, and PostgreSQL.",
    },
    {
      icon: Database,
      title: "Database & Caching",
      desc: "Designing clean relational structures, indexes, and strategic caching layers to ensure high data consistency and sub-millisecond query responses.",
    },
    {
      icon: Code,
      title: "Web Development",
      desc: "Crafting highly responsive user interfaces and modular web apps using Next.js, React, and standard CSS styles.",
    },
    {
      icon: Cpu,
      title: "Systems & Cloud",
      desc: "Containerizing service environments using Docker and designing type-safe service communications via gRPC schemas.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-border/40">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Focus Statement & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
                Engineering Focus & Philosophy
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                My approach to software engineering centers around simplicity, typesafety, and architectural scalability. Rather than chasing trends, I focus on building reliable backend systems, optimizing databases, and writing clean, maintainable code.
              </p>
              <p>
                Whether it is reducing API latencies with caching strategies or containerizing web services for modern cloud deployment, I enjoy exploring the boundary where systems engineering meets clean product implementation.
              </p>
            </div>

            {/* Quick Stats/Spec Box */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/60">
              <div>
                <p className="text-sm font-bold text-foreground">Core Focus</p>
                <p className="text-xs text-muted-foreground font-medium">Backend & Web Engineering</p>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Primary Stack</p>
                <p className="text-xs text-muted-foreground font-medium">Golang, PostgreSQL, Next.js</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Engineering Pillars Grid - Restructured 2x2 for mobile */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative p-3 sm:p-6 rounded-xl sm:rounded-3xl border border-border bg-card hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 squircle-sm sm:squircle-lg flex flex-col justify-between min-h-[140px] sm:min-h-[220px]"
                >
                  {/* Subtle Glowing Corner Decoration on Hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

                  <div className="space-y-2 sm:space-y-4">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-md sm:rounded-xl bg-muted border border-border flex items-center justify-center text-foreground group-hover:text-primary group-hover:border-primary/25 transition-all duration-300 squircle-sm">
                      <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="font-bold text-[11px] sm:text-base md:text-lg text-foreground tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-[9px] sm:text-xs md:text-sm text-muted-foreground leading-normal sm:leading-relaxed">
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
