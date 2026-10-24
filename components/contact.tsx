"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeDropdown } from "./resume-dropdown";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import { TechIcon } from "@/components/tech-icons";
import {
  MailboxIllustration,
  PenWriteIllustration,
  ChatBubblesIllustration,
  DocCaseStudyIllustration,
  CheckMarkIllustration,
  CopyClipboardIllustration,
  SendPaperPlaneIllustration,
  ExternalLinkIllustration,
  ArrowDownIllustration,
} from "@/components/ui-icons";

type GuestMessage = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export function Contact() {
  const { t } = useT();

  // --- Contact Logic ---
  const [copied, setCopied] = useState(false);
  const emailAddress = "enggalbimas8@gmail.com";

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
      logoName: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/enggal-bima-sakti-67902a305/",
      handle: "Enggal Bima",
      logoName: "linkedin",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/ebimsa",
      handle: "@ebimsa",
      logoName: "instagram",
    },
    {
      name: "Resume",
      url: "/resume.pdf",
      handle: "Download PDF",
      disabled: false,
    },
  ];

  // --- Guestbook Logic ---
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formMountedAt, setFormMountedAt] = useState<number>(() => Date.now());
  const [cooldown, setCooldown] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [feedOpen, setFeedOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Fetch messages on mount (safely capped at 100 max)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages?limit=100");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.messages)) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.error("Failed to load guestbook messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Handle submit message
  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0 || submitting) return;
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setError(null);

    const tempName = name.trim();
    const tempMsg = message.trim();

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tempName,
          message: tempMsg,
          website: honeypot,
          timestamp: formMountedAt,
        }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [data.message, ...prev]);
        setMessage(""); // clear message input only
        setCooldown(15); // 15-second cooldown
        setFormMountedAt(Date.now());
      } else {
        setError(data.error || "Gagal mengirim pesan.");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi. Silakan coba lagi.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getAvatarColor = (guestName: string) => {
    const colors = [
      "bg-[#0284c7]",
      "bg-[#0ea5e9]",
      "bg-[#1e293b] border border-[#38bdf8]",
    ];
    let sum = 0;
    for (let i = 0; i < guestName.length; i++) {
      sum += guestName.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const displayedMessages = viewAll ? messages : messages.slice(0, 10);

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-border/40 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">
        {/* Section Header */}
        <SectionHeading
          index="04"
          label={t("contact.label")}
          title={t("contact.heading")}
          subtitle={t("contact.subheading")}
        />

        {/* Modular 3-Column Grid Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch w-full">
          {/* COLUMN 1: Direct channels & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col bg-card/45 backdrop-blur-md border border-border/60 hover:border-primary/40 rounded-xl md:rounded-2xl p-5 sm:p-6 squircle-lg shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_35px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_35px_rgba(0,0,0,0.25)] transition-all duration-500 transform-gpu will-change-transform justify-between h-auto md:h-[500px]"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <MailboxIllustration className="w-4 h-4" />
                <h3 className="font-extrabold text-sm text-foreground uppercase tracking-wider">
                  {t("contact.directChannels")}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("contact.directDesc")}
              </p>

              {/* Direct Email Card */}
              <div className="p-3 rounded-xl border border-border/80 bg-background/50 space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">
                  {t("contact.copyEmail")}
                </span>
                <div className="flex items-center justify-between gap-3 p-2 rounded-lg border border-border bg-background squircle-sm">
                  <span className="font-mono text-xs font-medium text-foreground truncate select-all">
                    {emailAddress}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <CheckMarkIllustration className="w-3.5 h-3.5" />
                    ) : (
                      <CopyClipboardIllustration className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Social List with Original Brand Logos & Illustrated Icons */}
            <div className="space-y-2.5 mt-4 md:mt-0">
              {socials.map((soc) => {
                const isResume = soc.name === "Resume";
                const isLink = !soc.disabled && !isResume;
                const Component = isLink ? "a" : "div";
                const extraProps = isLink
                  ? {
                      href: soc.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : !isResume
                  ? {
                      title: "Resume coming soon",
                    }
                  : {};

                const cardInner = (
                  <>
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-7 h-7 rounded-md bg-muted border border-border/85 flex items-center justify-center flex-shrink-0">
                        {soc.logoName ? (
                          <TechIcon name={soc.logoName} className="w-4 h-4" />
                        ) : (
                          <DocCaseStudyIllustration className="w-4 h-4" />
                        )}
                      </div>
                      <div className="overflow-hidden text-left">
                        <p className="font-bold text-foreground truncate leading-none">
                          {soc.name}
                        </p>
                        <p className="text-[9px] text-muted-foreground truncate mt-0.5">
                          {soc.handle}
                        </p>
                      </div>
                    </div>
                    {isResume ? (
                      <ArrowDownIllustration className="w-3.5 h-3.5 transition-transform duration-200 group-data-popup-open:rotate-180" />
                    ) : (
                      isLink && (
                        <ExternalLinkIllustration className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      )
                    )}
                  </>
                );

                if (isResume) {
                  return (
                    <ResumeDropdown
                      key={soc.name}
                      side="top"
                      align="start"
                      sideOffset={6}
                      triggerClassName="group w-full p-2.5 rounded-xl border border-border/80 bg-card/40 hover:bg-card hover:border-primary/30 hover:shadow-inner transition-all squircle-sm flex items-center justify-between text-xs cursor-pointer"
                    >
                      {cardInner}
                    </ResumeDropdown>
                  );
                }

                return (
                  <Component
                    key={soc.name}
                    {...extraProps}
                    className="group p-2.5 rounded-xl border border-border/80 bg-card/40 hover:bg-card hover:border-primary/30 hover:shadow-inner transition-all squircle-sm flex items-center justify-between text-xs"
                  >
                    {cardInner}
                  </Component>
                );
              })}
            </div>
          </motion.div>

          {/* COLUMN 2: Guestbook Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col bg-card/45 backdrop-blur-md border border-border/60 hover:border-primary/40 rounded-xl md:rounded-2xl p-5 sm:p-6 squircle-lg shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_35px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_35px_rgba(0,0,0,0.25)] transition-all duration-500 transform-gpu will-change-transform justify-between h-auto md:h-[500px]"
          >
            <div className="space-y-4 w-full flex-1">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <PenWriteIllustration className="w-4 h-4" />
                <h3 className="font-extrabold text-sm text-foreground uppercase tracking-wider">
                  {t("contact.writeNew")}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("contact.writeDesc")}
              </p>

              <form onSubmit={handleSubmitMessage} className="space-y-3 pt-2">
                {/* Honeypot field - completely hidden from genuine users */}
                <div className="opacity-0 absolute -z-50 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="guest-website">Website</label>
                  <input
                    id="guest-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Name Input */}
                <div className="space-y-1">
                  <label htmlFor="guest-name" className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                    {t("contact.yourName")}
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    maxLength={50}
                    placeholder={t("contact.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all squircle-sm"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1">
                  <label htmlFor="guest-message" className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                    {t("contact.yourMessage")}
                  </label>
                  <textarea
                    id="guest-message"
                    required
                    maxLength={500}
                    rows={4}
                    placeholder={t("contact.messagePlaceholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none squircle-sm"
                  />
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="text-[10px] text-rose-500 font-semibold bg-rose-500/10 border border-rose-500/25 p-2 rounded-md squircle-sm">
                    {error}
                  </div>
                )}
              </form>
            </div>

            {/* Action button at bottom */}
            <div className="pt-4 md:pt-0">
              <button
                onClick={handleSubmitMessage}
                disabled={submitting || cooldown > 0 || !name.trim() || !message.trim()}
                className="w-full py-2.5 rounded-lg btn-logo-glossy font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow"
              >
                <SendPaperPlaneIllustration className="w-3.5 h-3.5" />
                <span>{submitting ? t("contact.sending") : cooldown > 0 ? `Wait ${cooldown}s...` : t("contact.send")}</span>
              </button>
            </div>
          </motion.div>

          {/* COLUMN 3: Scrollable Guestbook Messages Feed */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "flex flex-col bg-card/45 backdrop-blur-md border border-border/60 hover:border-primary/40 rounded-xl md:rounded-2xl p-5 sm:p-6 squircle-lg shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_35px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_35px_rgba(0,0,0,0.25)] transition-all duration-500 transform-gpu will-change-transform justify-between md:h-[500px]",
              feedOpen ? "h-[500px]" : "h-auto"
            )}
          >
            <div className="flex flex-col h-full w-full overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/40 pb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <ChatBubblesIllustration className="w-4 h-4" />
                  <h3 className="font-extrabold text-sm text-foreground uppercase tracking-wider">
                    {t("contact.feed")}
                  </h3>
                  <span className="text-[10px] font-bold text-muted-foreground/80">
                    {messages.length}
                  </span>
                </div>
                {feedOpen && (
                  <button
                    onClick={() => setFeedOpen(false)}
                    className="text-[9px] font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {t("contact.close")}
                  </button>
                )}
              </div>

              {!feedOpen ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-4 px-2">
                  <div className="w-9 h-9 rounded-xl bg-muted/65 border border-border/60 flex items-center justify-center shrink-0">
                    <ChatBubblesIllustration className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground">{t("contact.feedHidden")}</p>
                    <p className="text-[10px] text-muted-foreground/60 leading-normal max-w-[200px]">
                      {t("contact.feedClick")}
                    </p>
                  </div>
                  <button
                    onClick={() => setFeedOpen(true)}
                    className="w-full max-w-[180px] py-1.5 rounded-xl border border-border bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground font-bold text-[10px] transition-all cursor-pointer shadow-sm focus-visible:outline-none"
                  >
                    {t("contact.openFeed")} ({messages.length})
                  </button>
                </div>
              ) : (
                <>
                  {/* Feed scroll container */}
                  <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-3">
                    {loading ? (
                      <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="h-16 rounded-xl border border-border/60 bg-card/25 animate-pulse" />
                        ))}
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center py-16 rounded-2xl border border-dashed border-border/80 bg-card/10 squircle-md space-y-2 h-full flex flex-col justify-center">
                        <p className="text-xs font-bold text-muted-foreground">No messages yet.</p>
                        <p className="text-[10px] text-muted-foreground/60">Be the first to say hello!</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5 font-sans">
                        <AnimatePresence initial={false}>
                          {displayedMessages.map((msg) => {
                            const avatarColor = getAvatarColor(msg.name);
                            const dateObj = new Date(msg.created_at);
                            const formattedDate = dateObj.toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            });
                            const formattedTime = dateObj.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            });

                            return (
                              <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-3 rounded-xl border border-border/80 bg-card/35 hover:bg-card/65 transition-all duration-300 squircle-sm flex gap-3"
                              >
                                <div
                                  className={cn(
                                    "w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold uppercase shadow-sm flex-shrink-0",
                                    avatarColor
                                  )}
                                >
                                  {msg.name.charAt(0)}
                                </div>
                                <div className="space-y-0.5 flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="font-extrabold text-[11px] text-foreground truncate">
                                      {msg.name}
                                    </h4>
                                    <span className="text-[8px] text-muted-foreground font-semibold shrink-0">
                                      {formattedDate} • {formattedTime}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground leading-relaxed break-words whitespace-pre-wrap select-text font-normal">
                                    {msg.message}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* View all toggle */}
                  {messages.length > 10 && (
                    <div className="pt-2 border-t border-border/40 shrink-0">
                      <button
                        onClick={() => setViewAll(!viewAll)}
                        className="w-full py-1.5 rounded-lg border border-border bg-card/25 hover:bg-muted text-muted-foreground hover:text-foreground font-bold text-[10px] transition-colors flex items-center justify-center gap-1 cursor-pointer focus-visible:outline-none"
                      >
                        {viewAll ? "Show Less" : `Show All (${messages.length - 10})`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
