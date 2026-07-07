"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  FileText,
  Check,
  Copy,
  ArrowUpRight,
  Send,
  User,
  MessageSquare,
  ListFilter,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

type GuestMessage = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export function Contact() {
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
      icon: Github,
      color: "hover:border-foreground/30 hover:text-foreground",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/enggal-bima-sakti-67902a305/",
      handle: "Enggal Bima",
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
      handle: "Coming Soon",
      icon: FileText,
      color: "opacity-55 cursor-not-allowed border-dashed hover:bg-card/40 hover:shadow-none",
      disabled: true,
    },
  ];

  // --- Guestbook Logic ---
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages?limit=all");
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
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setError(null);

    const tempName = name.trim();
    const tempMsg = message.trim();

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tempName, message: tempMsg }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [data.message, ...prev]);
        setMessage(""); // clear message input only
      } else {
        setError(data.error || "Failed to submit message");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getAvatarColor = (guestName: string) => {
    const colors = [
      "from-sky-400 to-blue-500",
      "from-emerald-400 to-teal-500",
      "from-amber-400 to-orange-500",
      "from-rose-400 to-pink-500",
      "from-indigo-400 to-purple-500",
      "from-violet-400 to-fuchsia-500",
    ];
    let sum = 0;
    for (let i = 0; i < guestName.length; i++) {
      sum += guestName.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const displayedMessages = viewAll ? messages : messages.slice(0, 10);

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dot-pattern border-t border-border/40">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/3 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-4xl font-black tracking-tight text-foreground leading-none">
            Say Hello & Guestbook
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Leave a message in the guestbook, copy my direct email, or connect with me via your preferred social media channels.
          </p>
        </div>

        {/* Modular 3-Column Grid Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch w-full">
          
          {/* COLUMN 1: Direct channels & Socials */}
          <div className="flex flex-col bg-card/45 backdrop-blur-md border border-border/60 rounded-3xl p-5 sm:p-6 squircle-lg shadow-sm justify-between h-auto md:h-[500px]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <Mail className="w-4.5 h-4.5 text-primary shrink-0" />
                <h3 className="font-extrabold text-sm text-foreground uppercase tracking-wider">
                  Direct Channels
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Copy my direct email address below or connect with me via social handles.
              </p>

              {/* Direct Email Card */}
              <div className="p-3 rounded-xl border border-border/80 bg-background/50 space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">
                  Copy Email
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
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Social List */}
            <div className="space-y-2.5 mt-4 md:mt-0">
              {socials.map((soc) => {
                const Icon = soc.icon;
                const isLink = !soc.disabled;
                const Component = isLink ? "a" : "div";
                const extraProps = isLink ? {
                  href: soc.url,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {
                  title: "Resume coming soon"
                };

                return (
                  <Component
                    key={soc.name}
                    {...extraProps}
                    className={cn(
                      "group p-2.5 rounded-xl border border-border/80 bg-card/40 hover:bg-card hover:shadow-inner transition-all squircle-sm flex items-center justify-between text-xs",
                      soc.color
                    )}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-6.5 h-6.5 rounded-md bg-muted border border-border/85 flex items-center justify-center text-muted-foreground group-hover:text-inherit group-hover:bg-primary/5 dark:group-hover:bg-primary/10 transition-colors flex-shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-foreground truncate leading-none">
                          {soc.name}
                        </p>
                        <p className="text-[9px] text-muted-foreground truncate mt-0.5">
                          {soc.handle}
                        </p>
                      </div>
                    </div>
                    {isLink && (
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-inherit group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    )}
                  </Component>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: Guestbook Input Form */}
          <div className="flex flex-col bg-card/45 backdrop-blur-md border border-border/60 rounded-3xl p-5 sm:p-6 squircle-lg shadow-sm justify-between h-auto md:h-[500px]">
            <div className="space-y-4 w-full flex-1">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <Sparkles className="w-4.5 h-4.5 text-primary shrink-0" />
                <h3 className="font-extrabold text-sm text-foreground uppercase tracking-wider">
                  Write New Message
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Have feedback, suggestions, or just want to say hello? Send your message to this guestbook.
              </p>

              <form onSubmit={handleSubmitMessage} className="space-y-3 pt-2">
                {/* Name Input */}
                <div className="space-y-1">
                  <label htmlFor="guest-name" className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Your Name
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Your name/alias..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all squircle-sm"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1">
                  <label htmlFor="guest-message" className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Your Message
                  </label>
                  <textarea
                    id="guest-message"
                    required
                    maxLength={500}
                    rows={4}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none squircle-sm"
                  />
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="text-[10px] text-rose-500 font-semibold bg-rose-500/10 border border-rose-500/25 p-2 rounded-lg squircle-sm">
                    {error}
                  </div>
                )}
              </form>
            </div>

            {/* Action button at bottom */}
            <div className="pt-4 md:pt-0">
              <button
                onClick={handleSubmitMessage}
                disabled={submitting || !name.trim() || !message.trim()}
                className="w-full py-2.5 rounded-lg btn-logo-glossy font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow"
              >
                <Send className={cn("w-3.5 h-3.5", submitting && "animate-pulse")} />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>

          {/* COLUMN 3: Scrollable Guestbook Messages Feed */}
          <div className="flex flex-col bg-card/45 backdrop-blur-md border border-border/60 rounded-3xl p-5 sm:p-6 squircle-lg shadow-sm justify-between h-[500px]">
            <div className="flex flex-col h-full w-full overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/40 pb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <ListFilter className="w-4.5 h-4.5 text-primary shrink-0" />
                  <h3 className="font-extrabold text-sm text-foreground uppercase tracking-wider">
                    Message Feed
                  </h3>
                </div>
                <span className="text-[9px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border/40">
                  {messages.length}
                </span>
              </div>

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
                            <div className={cn(
                              "w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-[10px] font-bold uppercase shadow-sm flex-shrink-0",
                              avatarColor
                            )}>
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
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
