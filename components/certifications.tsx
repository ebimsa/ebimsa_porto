"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ExternalLink, ShieldCheck, X, BookOpen, Layers } from "lucide-react";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  logo: string; // We can use standard icons instead of images
  description: string;
  topics: string[];
};

const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "cert-aws",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "September 2024",
    credentialId: "AWS-CCP-847291",
    verifyUrl: "https://aws.amazon.com/verification",
    logo: "Cloud",
    description: "Validates overall understanding of the AWS Cloud platform, covering basic global infrastructure, architectural principles, security compliance, key services (compute, database, storage), and billing metrics.",
    topics: ["Cloud Architecture", "AWS IAM & Security", "EC2, S3, RDS, Lambda", "Pricing Models"],
  },
  {
    id: "cert-dl",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    issueDate: "May 2024",
    credentialId: "COURSERA-DL-99381",
    verifyUrl: "https://coursera.org/verify",
    logo: "Brain",
    description: "A comprehensive 5-course series covering foundational neural networks, hyperparameter tuning, structuring ML projects, Convolutional Neural Networks (CNNs), and Sequence Models (LSTMs, GRUs, Transformers).",
    topics: ["Neural Networks", "Optimization Algorithms", "Convolutional Networks", "Sequence Models & Attention"],
  },
  {
    id: "cert-google-python",
    title: "Google IT Automation with Python",
    issuer: "Google / Coursera",
    issueDate: "December 2023",
    credentialId: "COURSERA-GIP-12739",
    verifyUrl: "https://coursera.org/verify",
    logo: "Code",
    description: "Covers Python programming, interacting with the operating system, regular expressions, automated testing, version control with Git/GitHub, and configuration management using Puppet.",
    topics: ["Python Scripting", "System Administration", "Git & GitHub Versioning", "Configuration Management"],
  },
];

export function Certifications() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-24 relative bg-dot-pattern border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="space-y-2 mb-12 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Professional Certifications
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Verified expertise in cloud computing, machine learning modeling, and systems automation.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS_DATA.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -5 }}
              onClick={() => setActiveCert(cert)}
              className="group cursor-pointer p-6 rounded-3xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all squircle-lg flex flex-col justify-between min-h-[180px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground group-hover:text-primary group-hover:border-primary/25 transition-all squircle-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.issueDate.split(" ")[1]}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight group-hover:text-foreground/80 transition-colors line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
                    {cert.issuer}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary font-semibold flex items-center gap-1.5 mt-4 group-hover:translate-x-1 transition-transform">
                View Credentials
                <ExternalLink className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>

        {/* Detailed Modal view using Framer Motion */}
        <AnimatePresence>
          {activeCert && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCert(null)}
                className="fixed inset-0 bg-background z-50 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-lg bg-card border border-border p-6 sm:p-8 rounded-[28px] shadow-2xl squircle-lg focus:outline-none"
                  tabIndex={-1}
                >
                  {/* Close */}
                  <button
                    onClick={() => setActiveCert(null)}
                    className="absolute top-4 right-4 p-2 rounded-full border border-border bg-background/60 text-muted-foreground hover:text-foreground focus-visible:outline-none hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-foreground squircle-md">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground leading-snug">
                          {activeCert.title}
                        </h3>
                        <p className="text-sm font-semibold text-muted-foreground">
                          {activeCert.issuer}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border/80 pt-4 space-y-4">
                      {/* Description */}
                      <div className="space-y-1.5">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5" />
                          Overview
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {activeCert.description}
                        </p>
                      </div>

                      {/* Covered Skills */}
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          <Layers className="w-3.5 h-3.5" />
                          Key Competencies Certified
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeCert.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2.5 py-1 text-xs font-medium border border-border bg-card rounded-md text-foreground"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Validation details */}
                      <div className="bg-muted/40 p-4 rounded-xl border border-border/40 squircle-sm space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-semibold">Credential ID:</span>
                          <span className="font-mono text-foreground font-medium">{activeCert.credentialId}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-semibold">Issued Date:</span>
                          <span className="text-foreground font-medium">{activeCert.issueDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <a
                        href={activeCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl btn-logo-glossy font-semibold text-sm"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Verify Credential
                      </a>
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
