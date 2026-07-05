"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Building, Landmark, Trophy, Users, BookOpen } from "lucide-react";

type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: "Internship" | "Research" | "Teaching Assistant" | "Leadership" | "Competition";
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
  tags: string[];
};

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-research",
    role: "Research Assistant",
    organization: "Universitas Indonesia - Natural Language Processing Lab",
    period: "Oct 2024 - Present",
    type: "Research",
    icon: Landmark,
    details: [
      "Conducting research on resource-efficient fine-tuning of transformer models for low-resource languages.",
      "Optimized tokenization pipelines and implemented LoRA adapters, reducing training hardware requirements by 30%.",
      "Collaborating with senior researchers to publish findings in regional NLP conferences.",
    ],
    tags: ["Python", "PyTorch", "Hugging Face", "Transformers", "LoRA"],
  },
  {
    id: "exp-intern",
    role: "Backend Software Engineer Intern",
    organization: "GoTo Group (Gojek / Tokopedia)",
    period: "Jun 2024 - Sep 2024",
    type: "Internship",
    icon: Building,
    details: [
      "Refactored Go-based order-ingestion APIs, handling 15,000+ peak concurrent writes.",
      "Integrated Redis caching layers for catalog endpoints, resulting in a 25% decrease in p99 API latency.",
      "Collaborated with QA engineers to establish automated integration test suites, reducing regression rates by 18%.",
    ],
    tags: ["Go", "Redis", "Kafka", "PostgreSQL", "Docker", "gRPC"],
  },
  {
    id: "exp-ta",
    role: "Teaching Assistant",
    organization: "Universitas Indonesia - Faculty of Computer Science",
    period: "Aug 2023 - Present",
    type: "Teaching Assistant",
    icon: BookOpen,
    details: [
      "Lecturing undergraduate students on Data Structures & Algorithms and Database Systems.",
      "Grading programming assignments (C++ & Java) and hosting weekly tutorials on runtime complexity.",
      "Designed automatic grading scripts using Python, reducing submission grading cycle time by 40%.",
    ],
    tags: ["Data Structures", "Algorithms", "C++", "Python", "SQL"],
  },
  {
    id: "exp-leadership",
    role: "Head of Engineering",
    organization: "Computer Science Student Association (BEM Fasilkom UI)",
    period: "Jan 2024 - Dec 2024",
    type: "Leadership",
    icon: Users,
    details: [
      "Directed a team of 15 software developers managing internal academic applications and event platforms.",
      "Enforced code reviews, TypeScript schemas, and consolidated CI/CD builds on GitHub Actions.",
      "Successfully delivered 4 web apps serving over 2,000 active student users.",
    ],
    tags: ["Project Management", "React", "CI/CD", "TypeScript", "Next.js"],
  },
  {
    id: "exp-hackathon",
    role: "1st Place Winner",
    organization: "National Informatics Hackathon (Informatics Expo)",
    period: "Mar 2024",
    type: "Competition",
    icon: Trophy,
    details: [
      "Developed a serverless supply chain distribution coordinator that matches logistics operators dynamically.",
      "Implemented a graph-theoretic shortest-path routing algorithm on AWS Lambda.",
      "Pitched the final product architecture to industry leaders, winning first place out of 120 teams.",
    ],
    tags: ["AWS Lambda", "Node.js", "Serverless", "Graph Algorithms", "Pitching"],
  },
];

export function Experience() {
  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5, ease: "easeInOut" as const },
    },
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-dot-pattern border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="space-y-3 mb-16 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
            Timeline
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
            A chronological record of software engineering internships, research fellowships, and academic leadership.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical central tracking line (for larger viewports, left aligned) */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="absolute left-4 md:left-8 top-2 bottom-2 w-[2px] bg-border origin-top z-0"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {EXPERIENCE_DATA.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12 md:pl-20 z-10 group"
                >
                  {/* Minimal Node Point */}
                  <div className="absolute left-2 md:left-6 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-background border-2 border-border flex items-center justify-center z-20 group-hover:border-primary/50 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  </div>

                  {/* Main Card */}
                  <div className="p-6 rounded-3xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all squircle-lg max-w-4xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      {/* Left: Role and Organization */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-foreground border border-border bg-muted/65">
                            {exp.type}
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5">
                          <Icon className="w-4 h-4 text-muted-foreground/80" />
                          {exp.organization}
                        </p>
                      </div>
                    </div>

                    {/* Bullet Achievements */}
                    <ul className="space-y-2 mb-6 list-disc pl-4 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="marker:text-foreground/45">
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Technical tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-medium border border-border/80 bg-card rounded-md text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
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
