"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { PROJECTS_DATA, type Project } from "@/lib/projects";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { TechBadge } from "@/components/tech-icons";
import {
  DocCaseStudyIllustration,
  CompassIllustration,
  ShieldAlertIllustration,
  LightbulbIdeaIllustration,
  ArchitectureNodesIllustration,
  PuzzlePieceIllustration,
  ArrowRightIllustration,
  ExternalLinkIllustration,
  CloseIconIllustration,
} from "@/components/ui-icons";

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { lang, t } = useT();

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--ry", `${(x / r.width - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${(0.5 - y / r.height) * 8}deg`);
  };

  const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  const currentTagline = lang === "id" && project.taglineId ? project.taglineId : project.tagline;

  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      onClick={onClick}
      className="cursor-pointer h-full active:scale-[0.99] [perspective:900px]"
    >
      <div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
        className="group relative flex flex-col bg-card border border-border hover:border-primary rounded-xl md:rounded-2xl overflow-hidden transition-[border-color,transform] duration-300 transform-gpu will-change-transform squircle-lg h-full"
      >
        {/* Top: Browser Mockup with Cover Video */}
        <div className="relative w-full aspect-video bg-muted border-b border-border/40 overflow-hidden shrink-0">
          {project.videoUrl ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            >
              <source src={project.videoUrl.replace(/\.mp4$/, ".webm")} type="video/webm" />
              <source src={project.videoUrl} type="video/mp4" />
            </video>
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
            <div className="flex items-center justify-end">
              <span className="text-[10px] font-mono text-muted-foreground/60">
                {project.demoUrl.replace("https://", "")}
              </span>
            </div>
            <h3 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {currentTagline}
            </p>
          </div>

          <div className="space-y-4">
            {/* Tech tags list with official logos */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <TechBadge key={tag} name={tag} size="xs" />
              ))}
              {project.tags.length > 4 && (
                <span className="text-[9px] px-2 py-0.5 bg-muted/65 text-muted-foreground/80 border border-border/45 rounded font-mono">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>

            {/* Action Link to full case study page */}
            <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs font-bold text-primary">
              <Link
                href={`/projects/${project.id}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <DocCaseStudyIllustration className="w-3.5 h-3.5" />
                <span>{t("projects.readCaseStudy")}</span>
                <ArrowRightIllustration className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { lang, t } = useT();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16">
          <SectionHeading
            index="02"
            label={t("projects.label")}
            title={t("projects.heading")}
            subtitle={t("projects.subheading")}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>

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
                  className="relative w-full max-w-4xl bg-card border border-border rounded-xl md:rounded-2xl overflow-hidden shadow-2xl squircle-lg my-4 focus:outline-none flex flex-col max-h-[90vh] md:max-h-[85vh]"
                  tabIndex={-1}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full border border-border/80 bg-background/60 backdrop-blur-md text-muted-foreground hover:text-foreground focus-visible:outline-none hover:bg-muted/80 transition-all cursor-pointer"
                    aria-label="Close details"
                  >
                    <CloseIconIllustration className="w-4 h-4" />
                  </button>

                  {/* Header Cover Banner */}
                  <div className="relative w-full aspect-video md:max-h-[320px] bg-black overflow-hidden flex items-center justify-center shrink-0">
                    {activeProject.videoUrl ? (
                      <video
                        controls
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                      >
                        <source
                          src={activeProject.videoUrl.replace(/\.mp4$/, ".webm")}
                          type="video/webm"
                        />
                        <source src={activeProject.videoUrl} type="video/mp4" />
                      </video>
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

                  {/* Project Title Block */}
                  <div className="px-6 pt-5 sm:px-8 sm:pt-6 md:px-10 border-b border-border/40 pb-3 shrink-0 flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      {activeProject.title}
                    </h2>
                    <Link
                      href={`/projects/${activeProject.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:underline"
                    >
                      <DocCaseStudyIllustration className="w-3.5 h-3.5" />
                      <span>{t("projects.readCaseStudy")}</span>
                    </Link>
                  </div>

                  {/* Content details scroll block */}
                  <div className="p-6 sm:p-8 md:p-10 pt-4 space-y-8 overflow-y-auto no-scrollbar flex-1">
                    {/* Headline Tagline */}
                    <p className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground leading-snug">
                      {lang === "id" ? activeProject.taglineId : activeProject.tagline}
                    </p>

                    {/* Overview & Quick Specs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border/60 pt-6">
                      {/* Left: Deep Dive sections */}
                      <div className="md:col-span-8 space-y-6">
                        <div className="space-y-2.5">
                          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                            <CompassIllustration className="w-4 h-4" />
                            {t("projects.overview")}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {lang === "id" ? activeProject.overviewId : activeProject.overview}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                              <ShieldAlertIllustration className="w-4 h-4" />
                              {t("projects.problem")}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {lang === "id" ? activeProject.problemId : activeProject.problem}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                              <LightbulbIdeaIllustration className="w-4 h-4" />
                              {t("projects.solution")}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {lang === "id" ? activeProject.solutionId : activeProject.solution}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                            <ArchitectureNodesIllustration className="w-4 h-4" />
                            {t("projects.architecture")}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {lang === "id"
                              ? activeProject.architectureId
                              : activeProject.architecture}
                          </p>
                          <ArchitectureDiagram projectId={activeProject.id} />
                        </div>

                        <div className="space-y-2.5">
                          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                            <PuzzlePieceIllustration className="w-4 h-4" />
                            {t("projects.challenges")}
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-muted/40 p-4 rounded-2xl border border-border/40 squircle-sm">
                              <span className="text-xs font-bold text-foreground block mb-1">
                                {t("projects.engChallenge")}
                              </span>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {lang === "id"
                                  ? activeProject.challengesId
                                  : activeProject.challenges}
                              </p>
                            </div>
                            <div className="bg-muted/40 p-4 rounded-2xl border border-border/40 squircle-sm">
                              <span className="text-xs font-bold text-foreground block mb-1">
                                {t("projects.keyTakeaway")}
                              </span>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {lang === "id" ? activeProject.lessonsId : activeProject.lessons}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Tech Stack list with Official Logos & Links */}
                      <div className="md:col-span-4 space-y-6">
                        <div className="space-y-3 p-5 rounded-2xl border border-border bg-card/30 squircle-md">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            {t("projects.techStack")}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProject.techStack.map((tech) => (
                              <TechBadge key={tech} name={tech} size="sm" />
                            ))}
                          </div>
                        </div>

                        {/* Demo/Case Study Actions */}
                        <div className="flex flex-col gap-2">
                          <a
                            href={activeProject.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl btn-logo-glossy font-semibold text-sm"
                          >
                            <ExternalLinkIllustration className="w-4 h-4" />
                            <span>{t("projects.liveDemo")}</span>
                          </a>
                          <Link
                            href={`/projects/${activeProject.id}`}
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border bg-card hover:border-primary/50 font-semibold text-sm text-foreground transition-colors"
                          >
                            <DocCaseStudyIllustration className="w-4 h-4" />
                            <span>{t("projects.readCaseStudy")}</span>
                          </Link>
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
