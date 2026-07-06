"use client";

import React, { useState } from "react";
import { Mail, Github, Linkedin, Instagram, FileText, Check, Copy, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "contact@ebimsa.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/ebimsa",
      handle: "@ebimsa",
      icon: Github,
      color: "hover:border-foreground/30 hover:text-foreground",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/enggal-bima-sakti-67902a305/",
      handle: "Enggal Bima Sakti",
      icon: Linkedin,
      color: "hover:border-primary/30 hover:text-primary",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/ebimsa",
      handle: "@ebimsa",
      icon: Instagram,
      color: "hover:border-foreground/30 hover:text-foreground",
    },
    {
      name: "Resume",
      url: "/resume.pdf",
      handle: "Download PDF",
      icon: FileText,
      color: "hover:border-primary/30 hover:text-primary",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dot-pattern border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading and Email copy */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
                Contact
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
                Say Hello!
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                I am always open to discussing new opportunities, collaborating on small projects, or just chatting about computer science and web development. Feel free to reach out!
              </p>
            </div>

            {/* Availability Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border border-border bg-card/60 text-sm font-semibold squircle-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-foreground">Open to internships & entry-level roles</span>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-3xl border border-border bg-card/40 backdrop-blur-sm max-w-md squircle-lg space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-border bg-background squircle-md">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="font-mono text-sm font-medium text-foreground truncate select-all">
                    {emailAddress}
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none flex-shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Social Links Cards */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {socials.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-border bg-card/50 hover:bg-card hover:shadow-sm transition-all squircle-md flex items-center justify-between",
                    soc.color
                  )}
                >
                  <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-muted/60 border border-border/80 flex items-center justify-center text-muted-foreground group-hover:text-inherit group-hover:bg-primary/5 dark:group-hover:bg-primary/10 transition-colors squircle-sm flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm font-bold text-foreground tracking-tight truncate">
                        {soc.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-[80px] sm:max-w-[150px]">
                        {soc.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3 h-3 sm:w-4 h-4 text-muted-foreground group-hover:text-inherit group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
