"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, LayoutTemplate, Database, BrainCircuit, Cloud, Terminal, Settings2 } from "lucide-react";

type Skill = {
  name: string;
  detail: string;
};

type SkillCategory = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  skills: Skill[];
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories: SkillCategory[] = [
    {
      id: "languages",
      name: "Programming Languages",
      icon: Code2,
      description: "Core languages used for building applications, analysis, and scripting.",
      skills: [
        { name: "Go", detail: "Microservices & concurrent pipelines" },
        { name: "Python", detail: "Data analysis, AI/ML, and scraping" },
        { name: "TypeScript", detail: "Type-safe web development" },
        { name: "Rust", detail: "Systems engineering & memory safety" },
        { name: "JavaScript", detail: "Asynchronous web scripting" },
        { name: "C++", detail: "Algorithms & performance critical apps" },
        { name: "SQL", detail: "Relational database querying" },
      ],
    },
    {
      id: "backend",
      name: "Backend Architecture",
      icon: Database,
      description: "Technologies for powering core application servers, APIs, and databases.",
      skills: [
        { name: "Node.js", detail: "Scalable network applications" },
        { name: "FastAPI", detail: "High-performance Python APIs" },
        { name: "PostgreSQL", detail: "Complex queries & JSON fields" },
        { name: "Redis", detail: "In-memory caching & pub/sub" },
        { name: "gRPC", detail: "Inter-service communication" },
        { name: "Qdrant", detail: "Vector database for semantic search" },
        { name: "MongoDB", detail: "Flexible document-based NoSQL" },
      ],
    },
    {
      id: "frontend",
      name: "Frontend Development",
      icon: LayoutTemplate,
      description: "Frameworks and libraries for crafting accessible, high-performance user interfaces.",
      skills: [
        { name: "Next.js", detail: "RSC, dynamic routing & SSR" },
        { name: "React", detail: "Component-driven development" },
        { name: "Tailwind CSS", detail: "Utility-first modern styling" },
        { name: "Framer Motion", detail: "Fluid layout animations" },
        { name: "HTML5/CSS3", detail: "Semantic design & responsiveness" },
      ],
    },
    {
      id: "ai",
      name: "Artificial Intelligence",
      icon: BrainCircuit,
      description: "Machine learning integration, LLM pipelines, and cognitive computing.",
      skills: [
        { name: "LLM Orchestration", detail: "LangChain & LlamaIndex pipelines" },
        { name: "RAG Systems", detail: "Semantic chunking & vector search" },
        { name: "PyTorch", detail: "Deep learning model prototyping" },
        { name: "Hugging Face", detail: "Transformers & model hubs" },
        { name: "Model Fine-tuning", detail: "Quantization & LoRA adaptation" },
      ],
    },
    {
      id: "cloud",
      name: "Cloud Infrastructure",
      icon: Cloud,
      description: "Hosting platforms, storage, and serverless architectures.",
      skills: [
        { name: "AWS", detail: "EC2, S3, RDS, Lambda functions" },
        { name: "Vercel", detail: "Serverless web deployment" },
        { name: "GCP", detail: "Cloud Run & Google AI Studio" },
      ],
    },
    {
      id: "devops",
      name: "DevOps & CI/CD",
      icon: Terminal,
      description: "Tools for containerization, automated testing, and software delivery pipelines.",
      skills: [
        { name: "Docker", detail: "Containerized environments" },
        { name: "Kubernetes", detail: "Container orchestration & scaling" },
        { name: "GitHub Actions", detail: "Automated test & build pipelines" },
        { name: "CI/CD Setup", detail: "Seamless code verification & deployment" },
      ],
    },
    {
      id: "tools",
      name: "Developer Tools",
      icon: Settings2,
      description: "Daily drivers and productivity suites for writing quality software.",
      skills: [
        { name: "Git", detail: "Branching, rebasing & version control" },
        { name: "VS Code / Neovim", detail: "Optimized developer IDEs" },
        { name: "Linux / Bash", detail: "Scripting & command line operations" },
        { name: "Postman", detail: "REST & WebSocket API testing" },
        { name: "Figma", detail: "UI prototypes & mockups" },
      ],
    },
  ];

  const filteredCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-24 relative bg-dot-pattern bg-card/20 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Skills
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Technical Stack & Toolkit
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Hover over specific skills to view contextual details and real-world engineering applications.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl border border-border bg-card max-w-fit no-scrollbar overflow-x-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none ${
                activeCategory === "all"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Categories
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none ${
                  activeCategory === c.id
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group p-6 rounded-3xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all squircle-lg flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground group-hover:text-primary group-hover:border-primary/25 transition-all squircle-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-foreground text-base sm:text-lg tracking-tight">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Skills Badges with detailed hover tooltips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="relative group/badge">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium border border-border bg-card hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-help squircle-sm">
                        {skill.name}
                      </span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 scale-0 group-hover/badge:scale-100 transition-all duration-200 origin-bottom z-20 pointer-events-none">
                        <div className="bg-foreground text-background text-[10px] sm:text-xs py-2 px-3 rounded-xl shadow-lg border border-border/50 text-center font-medium leading-snug">
                          {skill.detail}
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
