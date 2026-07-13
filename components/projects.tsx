"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Github, X, Code, ShieldCheck, Cpu, GitBranch, Lightbulb, ArrowRight, Play } from "lucide-react";

type Project = {
  id: string;
  title: string;
  tagline: string;
  coverImage: string;
  category: "AI/ML" | "Systems & Cloud" | "Full Stack";
  tags: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  process: string;
  challenges: string;
  lessons: string;
  githubUrl: string;
  demoUrl: string;
  videoUrl?: string;
};

const PROJECTS_DATA: Project[] = [
  {
    id: "saidata",
    title: "Saidata",
    tagline: "Integrated administrative services hub and e-Government platform",
    coverImage: "/saidata.png",
    category: "Full Stack",
    tags: ["React 19", "Laravel 12", "Octane", "PostgreSQL", "CAS SSO"],
    overview: "An e-Government portal (e-ULT Unila) that automates administrative services, workflows, and document generation for all Lampung University divisions.",
    problem: "Legacy academic databases were siloed and administrative approvals were slow, paper-heavy, and untrackable in real-time.",
    solution: "Developed a unified administrative entrypoint with dynamic multi-stage workflow engines, automatic Word/PDF generators, and Telegram validator notifications.",
    architecture: "React 19 client (Recharts/Quill), Laravel 12 + Laravel Octane (RoadRunner) backend, and a hybrid relational-document PostgreSQL schema.",
    techStack: ["React 19", "Vite", "Tailwind CSS", "Laravel 12", "Octane", "RoadRunner", "PostgreSQL", "CAS SSO"],
    process: "Mapped complex organizational approval chains, built dynamic PDF generators with verification QR codes, and integrated SSO CAS 2.0 authentication.",
    challenges: "Synchronizing data across conflicting campus systems and bypassing Cloudflare. Solved by implementing Node.js + Playwright bypass microservices and GIN index optimizations.",
    lessons: "Mastered stateful PHP architectures (Octane), CAS token single sign-on protocols, and indexing performance tuning on massive JSONB datasets.",
    githubUrl: "https://github.com/enggalbima/saidata",
    demoUrl: "https://saidata.unila.ac.id",
    videoUrl: "/saidata.mp4",
  },
  {
    id: "doripay",
    title: "DoriPay",
    tagline: "PPOB billing and digital product payment platform",
    coverImage: "/doripay.png",
    category: "Full Stack",
    tags: ["Go", "Fiber", "Svelte", "PostgreSQL", "Tripay", "Digiflazz"],
    overview: "A full-stack PPOB payment system designed for secure, automated online billing and digital product transactions (credit, data packages, electricity tokens).",
    problem: "Processing concurrent wallet transactions and avoiding race conditions on balance mutations during heavy customer traffic peaks.",
    solution: "Implemented idempotent transaction requests with pessimistic row-locking in PostgreSQL, integrated with Tripay payment gateway and Digiflazz/Orkut PPOB provider APIs.",
    architecture: "Svelte client dashboard (Svelte Stores), Golang Fiber backend structured in Clean Architecture, PostgreSQL database with high-performance pgx driver.",
    techStack: ["Go", "Fiber", "Svelte", "PostgreSQL", "Tripay", "Digiflazz", "Orkut"],
    process: "Implemented ACID-compliant wallet mutation logic, mapped tiered pricing systems for agents, designed granular RBAC controls, and established reliable webhook callbacks.",
    challenges: "Managing double-spend attempts on instant wallet deductions. Mitigated by enforcing strict database locks and request idempotency validations.",
    lessons: "Gained deep knowledge in secure financial ledger engineering, Svelte stores state synchronization, and integrating external payment gateway API endpoints.",
    githubUrl: "https://github.com/enggalbima/doripay",
    demoUrl: "https://doripay.com",
    videoUrl: "/doripay.mp4",
  },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      onClick={onClick}
      className="group flex flex-col bg-card/45 dark:bg-card/35 backdrop-blur-md border border-border rounded-3xl overflow-hidden hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 squircle-lg cursor-pointer h-full"
    >
      {/* Top: Browser Mockup with Cover Image / Always Playing Video */}
      <div className="relative w-full aspect-video bg-muted border-b border-border/40 overflow-hidden shrink-0">
        {/* Mac OS dot indicators */}
        <div className="absolute top-2.5 left-3 flex items-center gap-1 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
        </div>
        
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            poster={project.coverImage}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
        ) : (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
        )}
      </div>

      {/* Bottom: Card Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex px-2 py-0.5 text-[8px] font-bold tracking-widest text-primary border border-primary/20 bg-primary/10 rounded-full uppercase">
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/60">{project.demoUrl.replace("https://", "")}</span>
          </div>
          <h3 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>

        <div className="space-y-4">
          {/* Tech tags list */}
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[9px] px-2 py-0.5 bg-muted/65 text-muted-foreground border border-border/45 rounded font-mono">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[9px] px-2 py-0.5 bg-muted/65 text-muted-foreground/80 border border-border/45 rounded font-mono">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Action Link */}
          <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs font-bold text-primary">
            <span>Read Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["all", "Full Stack"];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="projects" className="py-24 relative border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              A selection of coding projects I built to learn new concepts, frameworks, and programming patterns.
            </p>
          </div>

          {/* Filtering & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-border bg-card/50 focus:bg-card focus-visible:outline-none transition-colors squircle-sm"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl border border-border bg-card/60 no-scrollbar overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none ${
                    selectedCategory === cat
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border rounded-3xl">
            <p className="text-muted-foreground text-sm font-medium">
              No projects match your current search criteria.
            </p>
          </div>
        )}

        {/* Interactive Overlay modal for project details */}
        <AnimatePresence>
          {activeProject && (
            <>
              {/* Darkened backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="fixed inset-0 bg-background z-50 backdrop-blur-sm"
              />

              {/* Scrollable details container */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto no-scrollbar">
                <motion.div
                  layoutId={`project-container-${activeProject.id}`}
                  className="relative w-full max-w-4xl bg-card border border-border rounded-[32px] overflow-hidden shadow-2xl squircle-lg my-4 focus:outline-none flex flex-col max-h-[90vh] md:max-h-[85vh]"
                  tabIndex={-1}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full border border-border/80 bg-background/60 backdrop-blur-md text-muted-foreground hover:text-foreground focus-visible:outline-none hover:bg-muted/80 transition-all"
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header Cover Banner */}
                  <div className="relative w-full aspect-video md:max-h-[320px] bg-black overflow-hidden flex items-center justify-center shrink-0">
                    {activeProject.videoUrl ? (
                      <video
                        src={activeProject.videoUrl}
                        controls
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        <Image
                          src={activeProject.coverImage}
                          alt={activeProject.title}
                          fill
                          priority
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      </>
                    )}
                  </div>

                  {/* Project Title Block (Below banner) */}
                  <div className="px-6 pt-5 sm:px-8 sm:pt-6 md:px-10 border-b border-border/40 pb-3 shrink-0">
                    <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest text-primary border border-primary/20 bg-primary/10 rounded-full uppercase inline-block">
                      {activeProject.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-2">
                      {activeProject.title}
                    </h2>
                  </div>

                  {/* Content details scroll block */}
                  <div className="p-6 sm:p-8 md:p-10 pt-4 sm:pt-4 md:pt-4 space-y-8 overflow-y-auto no-scrollbar flex-1">
                    {/* Headline Tagline */}
                    <p className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground leading-snug">
                      {activeProject.tagline}
                    </p>

                    {/* Overview & Quick Specs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border/60 pt-6">
                      {/* Left: Deep Dive sections */}
                      <div className="md:col-span-8 space-y-6">
                        <div className="space-y-2.5">
                          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                            <Cpu className="w-4 h-4" />
                            Overview
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {activeProject.overview}
                          </p>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                              <ShieldCheck className="w-4 h-4" />
                              The Problem
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {activeProject.problem}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                              <Code className="w-4 h-4" />
                              The Solution
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {activeProject.solution}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                            <GitBranch className="w-4 h-4" />
                            System Architecture
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {activeProject.architecture}
                          </p>
                        </div>

                        <div className="space-y-2.5">
                          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                            <Lightbulb className="w-4 h-4" />
                            Challenges & Learnings
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-muted/40 p-4 rounded-2xl border border-border/40 squircle-sm">
                              <span className="text-xs font-bold text-foreground block mb-1">Engineering Challenge:</span>
                              <p className="text-xs text-muted-foreground leading-relaxed">{activeProject.challenges}</p>
                            </div>
                            <div className="bg-muted/40 p-4 rounded-2xl border border-border/40 squircle-sm">
                              <span className="text-xs font-bold text-foreground block mb-1">Key Takeaway:</span>
                              <p className="text-xs text-muted-foreground leading-relaxed">{activeProject.lessons}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Tech Stack list & Links */}
                      <div className="md:col-span-4 space-y-6">
                        <div className="space-y-3 p-5 rounded-2xl border border-border bg-card/30 squircle-md">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Technology Stack
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProject.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-medium border border-border/80 bg-card rounded-md text-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Demo/Code Actions */}
                        <div className="flex flex-col gap-2">
                          <a
                            href={activeProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl btn-logo-glossy font-semibold text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demonstration
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
