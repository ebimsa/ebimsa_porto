"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { useT } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { TechBadge } from "@/components/tech-icons";
import {
  CompassIllustration,
  ShieldAlertIllustration,
  LightbulbIdeaIllustration,
  ArchitectureNodesIllustration,
  PuzzlePieceIllustration,
  ChartGrowthIllustration,
  ArrowLeftIllustration,
  ExternalLinkIllustration,
} from "@/components/ui-icons";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { lang, t } = useT();
  const isId = lang === "id";

  const tagline = isId ? project.taglineId : project.tagline;
  const overview = isId ? project.overviewId : project.overview;
  const problem = isId ? project.problemId : project.problem;
  const solution = isId ? project.solutionId : project.solution;
  const architecture = isId ? project.architectureId : project.architecture;
  const challenges = isId ? project.challengesId : project.challenges;
  const lessons = isId ? project.lessonsId : project.lessons;
  const results = isId ? project.resultsId : project.results;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeftIllustration className="w-4 h-4" />
            <span>{isId ? "Kembali ke Proyek" : "Back to Projects"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-logo-glossy inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold"
            >
              <ExternalLinkIllustration className="w-3.5 h-3.5" />
              <span>{t("projects.liveDemo")}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
        {/* Title & Summary */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            <span>CASE STUDY</span>
            <span className="opacity-40">/</span>
            <span>{project.category}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} name={tech} size="md" />
            ))}
          </div>
        </div>

        {/* Media Preview */}
        <div className="relative w-full aspect-video rounded-2xl border border-border bg-black overflow-hidden shadow-xl">
          {project.videoUrl ? (
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            >
              <source src={project.videoUrl.replace(/\.mp4$/, ".webm")} type="video/webm" />
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* Overview */}
        <section className="space-y-3 border-t border-border/60 pt-10">
          <h2 className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-primary">
            <CompassIllustration className="w-4 h-4" />
            {t("projects.overview")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {overview}
          </p>
        </section>

        {/* Problem -> Decision/Solution -> Impact/Results */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border/60 pt-10">
          <div className="p-6 rounded-2xl border border-border bg-card/40 space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary">
              <ShieldAlertIllustration className="w-4 h-4" />
              01 · {t("projects.problem")}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {problem}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card/40 space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary">
              <LightbulbIdeaIllustration className="w-4 h-4" />
              02 · {isId ? "Keputusan & Solusi" : "Decisions & Solution"}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {solution}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 space-y-3">
            <h3 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary">
              <ChartGrowthIllustration className="w-4 h-4" />
              03 · {isId ? "Dampak & Hasil" : "Impact & Results"}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-mono">
              {results}
            </p>
          </div>
        </section>

        {/* System Architecture + SVG Diagram */}
        <section className="space-y-4 border-t border-border/60 pt-10">
          <h2 className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-primary">
            <ArchitectureNodesIllustration className="w-4 h-4" />
            {t("projects.architecture")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {architecture}
          </p>
          <ArchitectureDiagram projectId={project.id} />
        </section>

        {/* Challenges & Key Takeaways */}
        <section className="space-y-4 border-t border-border/60 pt-10">
          <h2 className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-primary">
            <PuzzlePieceIllustration className="w-4 h-4" />
            {t("projects.challenges")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card/40 space-y-2">
              <span className="text-xs font-bold text-foreground block">
                {t("projects.engChallenge")}
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {challenges}
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card/40 space-y-2">
              <span className="text-xs font-bold text-foreground block">
                {t("projects.keyTakeaway")}
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {lessons}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
