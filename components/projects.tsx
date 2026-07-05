"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Github, X, Code, ShieldCheck, Cpu, GitBranch, Lightbulb } from "lucide-react";

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
    tagline: "High-Performance Multi-Agent Orchestration & RAG Pipeline",
    coverImage: "/lumina_ai.png",
    category: "AI/ML",
    tags: ["FastAPI", "pgvector", "Qdrant", "LangChain", "Redis"],
    overview: "LuminaAI is a production-grade Retrieval-Augmented Generation (RAG) platform that coordinates multiple specialized AI agents. It intelligently routes unstructured multi-format data, performs semantic chunking, indexes vectors into Qdrant, and runs automated reasoning pipelines for enterprises.",
    problem: "Processing massive sets of unstructured files (PDFs, Markdown, PPTs) and orchestrating multiple LLM agents created high latency, high API costs, and context limits. Traditional single-prompt architectures couldn't handle complex, multi-step logical operations.",
    solution: "Designed a distributed microservice architecture. A Go-based file processor performs semantic layout analysis. We built a custom multi-agent routing loop in Python using LangGraph. Relevant context is stored in pgvector and Qdrant, cached with Redis to reduce duplicate LLM requests.",
    architecture: "Frontend built on Next.js 16 communicating via WebSockets. Backend consists of a Python FastAPI router, a Go worker queue, Qdrant as the main vector database, Redis for session cache, and PostgreSQL (pgvector) for metadata logging.",
    techStack: ["Next.js", "FastAPI", "Go", "Qdrant", "Redis", "pgvector", "Docker"],
    process: "We started by benchmarking different semantic chunking strategies (fixed-size vs layout-aware). Then, we designed the routing orchestrator to decide whether a query needs semantic search, internet search, or direct execution. Finally, we set up load testing to optimize caching latency.",
    challenges: "Handling agent loop divergence (where agents get stuck in infinite feedback loops). We resolved this by building a cycle-detection middleware and setting a token-sensitive budget limit per session.",
    lessons: "Complex agent routing should be deterministic where possible. Hybrid search (keyword + semantic vector) yields 40% higher precision than raw vector searches alone.",
    githubUrl: "https://github.com/ebimsa/lumina-ai",
    demoUrl: "https://lumina.ebimsa.com",
  },
  {
    id: "nova-cloud",
    title: "NovaCloud",
    tagline: "Distributed Serverless Event Broker & Task Scheduler",
    coverImage: "/nova_cloud.png",
    category: "Systems & Cloud",
    tags: ["Go", "gRPC", "Kubernetes", "Prometheus", "Consensus"],
    overview: "NovaCloud is an event-driven pub/sub broker designed to handle millions of tasks. Built in Go, it guarantees at-least-once message delivery, partition rebalancing, and decentralized task scheduling with real-time health checks.",
    problem: "When managing millions of scheduled background jobs, existing solutions suffered from thread starvation, partition loss during node failure, and lacked fine-grained metrics for queue congestion.",
    solution: "Developed a custom log-structured merge-tree partition storage engine in Go. Integrated Raft consensus for leader election, allowing seamless partition rebalancing. Integrated Prometheus and Grafana for active load metrics.",
    architecture: "NovaCloud deploys as a StatefulSet on Kubernetes. Communication between nodes uses highly optimized gRPC. Clients publish events over HTTP/2 or WebSockets. State consensus is monitored by HashiCorp Raft.",
    techStack: ["Go", "gRPC", "Kubernetes", "Raft Consensus", "Prometheus", "Grafana"],
    process: "Wrote the initial protocol buffer schemas, implemented the WAL (Write-Ahead Log) storage layer, built the cluster consensus layer, and then integrated Kubernetes horizontal autoscaling rules based on queue depth metrics.",
    challenges: "Resolving network partitions (split-brain) during K8s node updates. We mitigated this by fine-tuning the Raft heartbeat interval and implementing graceful node termination protocols.",
    lessons: "Simplicity in network protocols beats complex feature sets. Writing our own lightweight consensus binding in Go drastically reduced runtime overhead compared to external heavy message queues.",
    githubUrl: "https://github.com/ebimsa/nova-cloud",
    demoUrl: "https://nova.ebimsa.com",
  },
  {
    id: "synth-editor",
    title: "SynthEditor",
    tagline: "Block-Based Collaborative Editor with Real-Time Sync",
    coverImage: "/synth_editor.png",
    category: "Full Stack",
    tags: ["Next.js", "Tailwind CSS", "Yjs", "WebSockets", "TipTap"],
    overview: "SynthEditor is a premium, block-based collaborative workspace that mimics Notion's typing experience. It supports real-time editing, slash commands, multiplayer cursors, offline sync, and inline AI text generation.",
    problem: "Synchronizing state changes across multiple concurrent users without central locks often results in editing conflicts, high server resource usage, or out-of-order layouts.",
    solution: "Used Conflict-free Replicated Data Types (CRDTs) via Yjs. We built a custom WebSocket provider to sync binary document updates and integrated Tiptap for the block structure, rendering peer cursor locations in real-time.",
    architecture: "A Next.js client component utilizes Tailwind CSS for styling. The server is a Node.js WebSocket hub with Redis Adapter to synchronize document states across multiple node instances, backed by a PostgreSQL database.",
    techStack: ["Next.js", "Tailwind CSS", "Yjs", "WebSockets", "Node.js", "PostgreSQL"],
    process: "We researched CRDT vs Operational Transformation (OT), choosing Yjs for its performance. Built the rich text block schemas, integrated standard markdown shortcuts, and implemented the local-first caching strategy using IndexDB.",
    challenges: "Handling rapid document editing on high-latency mobile networks. We resolved this by batching WebSocket packets and writing local-optimistic visual transitions.",
    lessons: "Building local-first apps forces you to treat the server simply as a sync node. Caching states locally via IndexedDB makes the application feel instantaneous and robust against network drops.",
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Deep-dives into systems architecture, production codebases, and artificial intelligence models.
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`project-container-${project.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card/50 hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all squircle-lg"
                onClick={() => setActiveProject(project)}
              >
                {/* Cover Image Container */}
                <div className="relative w-full aspect-video overflow-hidden border-b border-border/40 bg-muted">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge overlay */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-wider text-foreground bg-background/90 backdrop-blur-sm border border-border/40 rounded-full uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Badges footer */}
                  <div className="flex flex-wrap gap-1.5 pt-5 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-medium border border-border/60 bg-muted/50 rounded-md text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium border border-border/60 bg-muted/50 rounded-md text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
                            Verify Codebase
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
