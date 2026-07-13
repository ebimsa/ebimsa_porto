"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Building, Users, BookOpen } from "lucide-react";

type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: "Internship" | "Teaching Assistant" | "Leadership";
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
  tags: string[];
};

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-himakom",
    role: "Secretary of Media & Information",
    organization: "HIMAKOM Unila",
    period: "Mar 2024 - Dec 2024",
    type: "Leadership",
    icon: Users,
    details: [
      "Managed administrative supporting tasks, organization correspondence, and comprehensive documentation to ensure seamless division operations.",
      "Coordinated internal communications within the division and assisted in planning digital content publication workflows."
    ],
    tags: ["Administration", "Documentation", "Communication", "Content Planning"],
  },
  {
    id: "exp-bem",
    role: "Head of Media & Information",
    organization: "BEM FMIPA Unila",
    period: "Mar 2025 - Dec 2025",
    type: "Leadership",
    icon: Users,
    details: [
      "Led a creative team in designing and executing digital communication and branding strategies for the organization.",
      "Managed social media publications and coordinated cross-departmental efforts to promote organization programs and build a strong online presence."
    ],
    tags: ["Creative Direction", "Digital Strategy", "Social Media", "Branding"],
  },
  {
    id: "exp-pkl",
    role: "Data Management Intern",
    organization: "Telkom Witel Kedaton",
    period: "Jun 2025 - Aug 2025",
    type: "Internship",
    icon: Building,
    details: [
      "Inputted customer network infrastructure data into the company's internal management systems.",
      "Validated and matched records to ensure the absolute accuracy and integrity of operational data tracking."
    ],
    tags: ["Data Entry", "Data Integrity", "Network Infra", "Operational Audit"],
  },
  {
    id: "exp-ta",
    role: "Teaching Assistant",
    organization: "Universitas Lampung",
    period: "Feb 2026 - Jun 2026",
    type: "Teaching Assistant",
    icon: BookOpen,
    details: [
      "Managed laboratory practicum sessions for Systems Analysis & Design and Mobile Application Technology courses.",
      "Mentored undergraduate students in Android application development and systems modeling, and resolved technical troubleshooting issues.",
      "Evaluated student assignments, provided constructive feedback on software design, and created learning materials."
    ],
    tags: ["Systems Analysis", "Mobile Apps", "Android", "Troubleshooting"],
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    setScrollProgress(container.scrollLeft / maxScroll);
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        const canScrollLeft = container.scrollLeft > 0;
        const canScrollRight =
          container.scrollLeft < container.scrollWidth - container.clientWidth - 1;

        if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const rotations = ["rotate-[-1.5deg]", "rotate-[1deg]", "rotate-[-1deg]", "rotate-[1.5deg]"];

  return (
    <section id="experience" className="relative bg-dot-pattern border-t border-border/40 py-20">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/2 blur-[120px] pointer-events-none -z-10" />

      {/* 1. Desktop Horizontal scroll container */}
      <div className="hidden md:flex flex-col justify-center overflow-hidden">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 w-full mb-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Experience & Organizations
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mt-2">
            Scroll over the cards to navigate through my professional work and organizational leadership timeline.
          </p>
        </div>

        {/* Horizontal Scroll Window */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="relative w-full overflow-x-auto no-scrollbar pl-[8%] pr-[20%] min-h-[500px]"
        >
          <motion.div
            className="flex gap-8 relative pb-12 w-max"
          >
            {/* The Horizontal Timeline Line */}
            <div className="absolute top-[88px] left-[32px] right-[300px] h-[2px] bg-border/80 z-0">
              {/* Dynamic scroll progress highlights active parts of the line */}
              <motion.div
                style={{ scaleX: scrollProgress }}
                className="absolute inset-0 bg-primary origin-left"
              />
            </div>

            {EXPERIENCE_DATA.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;
              const wrapperPadding = isEven ? "pt-[112px]" : "pt-[160px]";
              const verticalLineHeight = isEven ? "h-[16px]" : "h-[64px]";
              const rotationClass = rotations[index % rotations.length];

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col shrink-0 w-[300px] sm:w-[420px] select-none z-10 ${wrapperPadding}`}
                >
                  {/* Timeline node dot */}
                  <div className="absolute top-[80px] left-8 w-4 h-4 rounded-full border-2 border-primary bg-background z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  </div>

                  {/* Vertical connector line hanging from node to card */}
                  <div className={`absolute top-[96px] left-[39px] w-[2px] bg-border/80 z-0 ${verticalLineHeight}`} />

                  {/* Glassmorphic Bento Card */}
                  <div className={`group relative p-6 sm:p-8 rounded-3xl border border-border bg-card/45 dark:bg-card/35 backdrop-blur-md transition-all duration-500 squircle-lg flex flex-col justify-between min-h-[310px] hover:border-primary/35 hover:shadow-primary/10 hover:shadow-2xl ${rotationClass} hover:rotate-0 hover:scale-[1.01]`}>
                    
                    {/* Glowing Theme Color decoration in background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                    {/* Corner glow accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

                    <div className="space-y-4">
                      {/* Card Header */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex px-2 py-0.5 text-[9px] font-bold tracking-widest border border-primary/20 bg-primary/10 text-primary rounded-full uppercase">
                            {exp.type}
                          </span>
                          <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-muted-foreground/80 flex items-center gap-1.5">
                          <span className="p-1 rounded-lg border border-primary/20 bg-primary/10 text-primary">
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          {exp.organization}
                        </p>
                      </div>

                      {/* Details Bullet List */}
                      <ul className="space-y-2 list-disc pl-4 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="marker:text-foreground/35">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Tags Footer */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40 mt-6">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[10px] font-medium border border-primary/15 bg-primary/5 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* 2. Mobile horizontal touch-swipe scroll container */}
      <div className="block md:hidden w-full relative">
        {/* Section Header */}
        <div className="px-4 md:px-6 mb-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Experience & Organizations
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Swipe left/right to navigate my professional timeline.
          </p>
        </div>

        {/* Horizontal Swipe Viewport Container */}
        <div className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12">
          <div className="flex gap-6 relative pl-[8%] pr-[20%] w-max">
            
            {/* The Horizontal Timeline Line */}
            <div className="absolute top-[88px] left-[32px] right-[300px] h-[2px] bg-border/80 z-0" />

            {EXPERIENCE_DATA.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;
              const wrapperPadding = isEven ? "pt-[112px]" : "pt-[160px]";
              const verticalLineHeight = isEven ? "h-[16px]" : "h-[64px]";
              const rotationClass = rotations[index % rotations.length];

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col shrink-0 w-[82vw] max-w-[320px] snap-center select-none z-10 ${wrapperPadding}`}
                >
                  {/* Timeline node dot */}
                  <div className="absolute top-[80px] left-8 w-4 h-4 rounded-full border-2 border-primary bg-background z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>

                  {/* Vertical connector line hanging from node to card */}
                  <div className={`absolute top-[96px] left-[39px] w-[2px] bg-border/80 z-0 ${verticalLineHeight}`} />

                  {/* Glassmorphic Bento Card */}
                  <div className={`group relative p-6 rounded-3xl border border-border bg-card/45 dark:bg-card/35 backdrop-blur-md transition-all duration-500 squircle-lg flex flex-col justify-between min-h-[310px] hover:border-primary/35 hover:shadow-primary/10 hover:shadow-2xl ${rotationClass} hover:rotate-0 hover:scale-[1.01]`}>
                    
                    {/* Glowing Theme Color decoration in background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                    {/* Corner glow accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

                    <div className="space-y-4">
                      {/* Card Header */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex px-2 py-0.5 text-[9px] font-bold tracking-widest border border-primary/20 bg-primary/10 text-primary rounded-full uppercase">
                            {exp.type}
                          </span>
                          <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-muted-foreground/80 flex items-center gap-1.5">
                          <span className="p-1 rounded-lg border border-primary/20 bg-primary/10 text-primary">
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          {exp.organization}
                        </p>
                      </div>

                      {/* Details Bullet List */}
                      <ul className="space-y-2 list-disc pl-4 text-muted-foreground text-xs leading-relaxed">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="marker:text-foreground/35">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Tags Footer */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40 mt-6">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[10px] font-medium border border-primary/15 bg-primary/5 text-primary rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
