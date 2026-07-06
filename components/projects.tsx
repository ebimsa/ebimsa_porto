"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Github, X, Code, ShieldCheck, Cpu, GitBranch, Lightbulb, ArrowRight } from "lucide-react";

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
};

const PROJECTS_DATA: Project[] = [
  {
    id: "lumina-ai",
    title: "LuminaAI",
    tagline: "An experimental RAG pipeline exploring multi-agent routing",
    coverImage: "/lumina_ai.png",
    category: "AI/ML",
    tags: ["FastAPI", "pgvector", "Qdrant", "LangChain", "Redis"],
    overview: "A learning project built to understand Retrieval-Augmented Generation (RAG). It coordinates specialized AI agents to process documents and answer questions based on semantic search.",
    problem: "Getting LLM agents to coordinate and fetch context reliably without hitting token limits or looping infinitely.",
    solution: "Built a simple router in Python using LangGraph and integrated pgvector/Qdrant to perform vector similarity search on document chunks.",
    architecture: "Next.js frontend, Python FastAPI router, Qdrant vector database, and Redis cache.",
    techStack: ["Next.js", "FastAPI", "Python", "Qdrant", "Redis", "pgvector", "Docker"],
    process: "Benchmarked semantic chunking strategies, built the routing orchestrator, and integrated basic load testing.",
    challenges: "Preventing infinite loops in agent reasoning. Resolved by adding a basic cycle-detector and step limit in the routing logic.",
    lessons: "Learned how chunking strategies and hybrid search affect the accuracy of the model's responses.",
    githubUrl: "https://github.com/ebimsa/lumina-ai",
    demoUrl: "https://lumina.ebimsa.com",
  },
  {
    id: "nova-cloud",
    title: "NovaCloud",
    tagline: "A simplified event broker and job scheduler in Go",
    coverImage: "/nova_cloud.png",
    category: "Systems & Cloud",
    tags: ["Go", "gRPC", "Kubernetes", "Prometheus", "Consensus"],
    overview: "A school/personal project designed in Go to study how message brokers queue and schedule background tasks using gRPC.",
    problem: "Scheduling tasks reliably and handling node disconnects in a multi-worker setup.",
    solution: "Implemented a basic worker coordinator in Go using gRPC for node communication and standard database transactions for task states.",
    architecture: "NovaCloud worker node system communicating via gRPC with simple node replication.",
    techStack: ["Go", "gRPC", "Kubernetes", "PostgreSQL", "Docker", "Prometheus"],
    process: "Wrote protobuf schemas, implemented simple write-ahead logs, and set up Docker containers for simulation.",
    challenges: "Handling race conditions when multiple workers attempt to fetch the same job. Mitigated by implementing row locking in the task queue database.",
    lessons: "Gained hands-on experience with Go concurrency primitives, channels, and designing clear protobuf APIs.",
    githubUrl: "https://github.com/ebimsa/nova-cloud",
    demoUrl: "https://nova.ebimsa.com",
  },
  {
    id: "synth-editor",
    title: "SynthEditor",
    tagline: "A collaborative rich-text editor with real-time sync",
    coverImage: "/synth_editor.png",
    category: "Full Stack",
    tags: ["Next.js", "Tailwind CSS", "Yjs", "WebSockets", "TipTap"],
    overview: "A collaborative block-based document editor. Built to explore CRDTs (Conflict-free Replicated Data Types) for real-time document editing.",
    problem: "Syncing cursor positions and text edits between concurrent users without overwriting each other's work.",
    solution: "Integrated Yjs and TipTap with a Node.js WebSocket backend to sync binary document updates and cursors.",
    architecture: "Next.js client using Tailwind CSS. Node.js WebSocket hub with Redis Adapter to synchronize document states.",
    techStack: ["Next.js", "Tailwind CSS", "Yjs", "WebSockets", "Node.js", "PostgreSQL"],
    process: "Selected Yjs CRDT for performance, built rich text block schemas, and implemented local-first caching using IndexDB.",
    challenges: "Handling WebSocket reconnection and local state persistence when network drops.",
    lessons: "Learned the benefits of local-first architectures and caching document states using IndexedDB.",
    githubUrl: "https://github.com/ebimsa/synth-editor",
    demoUrl: "https://synth.ebimsa.com",
  },
];

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["all", "AI/ML", "Systems & Cloud", "Full Stack"];

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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
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

        {/* Projects Stack */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  layoutId={`project-container-${project.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="group rounded-[32px] border border-border bg-card/45 dark:bg-card/35 backdrop-blur-md overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 hover:border-primary/30 hover:shadow-[0_12px_45px_-12px_rgba(136,216,199,0.1)] dark:hover:shadow-[0_12px_45px_-12px_rgba(136,216,199,0.15)] transition-all duration-300"
                >
                  {/* Left Column: Details */}
                  <div className={`flex-1 flex flex-col justify-between space-y-6 ${!isEven ? "lg:order-2" : ""}`}>
                    <div className="space-y-4">
                      {/* Category Badge */}
                      <div>
                        <span className="inline-flex px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-primary border border-primary/20 bg-primary/10 rounded-full uppercase">
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-primary tracking-wide">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                        {project.overview}
                      </p>

                      {/* Technical stats summary */}
                      <div className="grid grid-cols-2 gap-4 pt-2 max-w-md">
                        <div className="border-l-2 border-border pl-3 space-y-0.5">
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">The Challenge</span>
                          <span className="text-xs text-foreground font-semibold line-clamp-1">{project.problem}</span>
                        </div>
                        <div className="border-l-2 border-border pl-3 space-y-0.5">
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block">The System</span>
                          <span className="text-xs text-foreground font-semibold line-clamp-1">{project.solution}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech stack & Actions */}
                    <div className="space-y-4 pt-4 border-t border-border/40">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((t) => (
                          <span key={t} className="px-2.5 py-0.5 text-[10px] font-semibold bg-muted/65 border border-border text-muted-foreground rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 pt-2">
                        <button
                          onClick={() => setActiveProject(project)}
                          className="btn-logo-glossy px-4 py-2 rounded-xl font-bold text-xs focus-visible:outline-none"
                        >
                          Read Case Study
                        </button>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary hover:border-primary/40 font-bold text-xs transition-colors focus-visible:outline-none"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground font-bold text-xs transition-colors focus-visible:outline-none"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Source
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Browser Window Mockup */}
                  <div className={`flex-1 relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted dark:bg-card/50 shadow-inner ${!isEven ? "lg:order-1" : ""}`}>
                    {/* Browser Chrome Header */}
                    <div className="absolute top-0 left-0 right-0 h-6 border-b border-border bg-muted/95 dark:bg-card/95 flex items-center justify-between px-3 z-10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      </div>
                      <span className="text-[8px] font-mono text-muted-foreground/80 select-none">{project.id}.ebimsa.com</span>
                      <div className="w-6" /> {/* spacer */}
                    </div>

                    {/* Screenshot Container */}
                    <div className="absolute inset-0 pt-6">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
                  className="relative w-full max-w-4xl bg-card border border-border rounded-[32px] overflow-hidden shadow-2xl squircle-lg my-8 focus:outline-none"
                  tabIndex={-1}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full border border-border/80 bg-background/60 backdrop-blur-md text-muted-foreground hover:text-foreground focus-visible:outline-none hover:bg-muted/80 transition-all"
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header Cover Banner */}
                  <div className="relative w-full h-48 sm:h-72 bg-muted">
                    <Image
                      src={activeProject.coverImage}
                      alt={activeProject.title}
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    {/* Floating Brand Title overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest text-foreground bg-background/90 border border-border/50 rounded-full uppercase">
                        {activeProject.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2 drop-shadow-sm">
                        {activeProject.title}
                      </h2>
                    </div>
                  </div>

                  {/* Content details scroll block */}
                  <div className="p-6 sm:p-8 md:p-10 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
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
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition-all hover:border-foreground/10"
                          >
                            <Github className="w-4 h-4" />
                            View Source Code
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
