"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, MessageSquare, ListFilter, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type GuestMessage = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch messages on mount
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

  // 2. Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
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
        // Prepend new message dynamically with motion slide
        setMessages((prev) => [data.message, ...prev]);
        setMessage(""); // clear message input only (retain name for convenience)
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

  // Helper to generate consistent gradient avatar based on hash of guest name
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

  // Slice list locally for instant expand/collapse toggle
  const displayedMessages = viewAll ? messages : messages.slice(0, 5);

  return (
    <section id="guestbook" className="py-24 relative overflow-hidden border-t border-border/40">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/3 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20">
            <Sparkles className="w-3 h-3" />
            Guestbook
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Buku Tamu & Pesan
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Punya saran, kritik, atau sekadar ingin menyapa? Silakan tuliskan pesan Anda di bawah ini secara global.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-6 rounded-3xl border border-border bg-card/45 backdrop-blur-md squircle-lg space-y-6"
          >
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-foreground tracking-tight">
                Tulis Pesan Baru
              </h3>
              <p className="text-xs text-muted-foreground">
                Semua kolom wajib diisi. Pesan Anda akan langsung diposting secara publik.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="guest-name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Nama Anda
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80" />
                  <input
                    id="guest-name"
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Masukkan nama/alias..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder-muted-foreground/70 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all squircle-md"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <label htmlFor="guest-message" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Pesan Anda
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground/80" />
                  <textarea
                    id="guest-message"
                    required
                    maxLength={500}
                    rows={4}
                    placeholder="Tuliskan saran, sapaan, atau pesan Anda di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder-muted-foreground/70 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none squircle-md"
                  />
                </div>
              </div>

              {/* Error banner */}
              {error && (
                <div className="text-xs text-rose-500 font-semibold bg-rose-500/10 border border-rose-500/25 p-3 rounded-xl squircle-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !name.trim() || !message.trim()}
                className="w-full py-3 rounded-xl btn-logo-glossy font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className={cn("w-4 h-4", submitting && "animate-pulse")} />
                {submitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Messages Feed */}
          <div className="lg:col-span-7 space-y-4 w-full">
            {/* Header info */}
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ListFilter className="w-3.5 h-3.5" />
                Daftar Pesan ({messages.length})
              </span>
            </div>

            {loading ? (
              // Loading Skeleton
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-2xl border border-border/60 bg-card/25 animate-pulse" />
                ))}
              </div>
            ) : messages.length === 0 ? (
              // Empty State
              <div className="text-center py-12 rounded-3xl border border-dashed border-border/80 bg-card/10 squircle-lg space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">Belum ada pesan masuk.</p>
                <p className="text-xs text-muted-foreground/70">Jadilah yang pertama mengirimkan sapaan di buku tamu ini!</p>
              </div>
            ) : (
              // Messages Feed List
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {displayedMessages.map((msg) => {
                    const avatarColor = getAvatarColor(msg.name);
                    const formattedDate = new Date(msg.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: -15, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="group p-4 rounded-2xl border border-border bg-card/35 hover:bg-card/65 transition-all duration-300 squircle-md flex gap-4"
                      >
                        {/* Avatar */}
                        <div className={cn(
                          "w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-sm font-bold uppercase shadow-sm squircle-sm flex-shrink-0",
                          avatarColor
                        )}>
                          {msg.name.charAt(0)}
                        </div>

                        {/* Content */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                            <h4 className="font-extrabold text-xs sm:text-sm text-foreground tracking-tight truncate">
                              {msg.name}
                            </h4>
                            <span className="text-[9px] sm:text-xs text-muted-foreground/75 font-medium shrink-0">
                              {formattedDate}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed break-words whitespace-pre-wrap select-text">
                            {msg.message}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Show All / Collapse Toggle Button */}
                {messages.length > 5 && (
                  <button
                    onClick={() => setViewAll(!viewAll)}
                    className="w-full py-2.5 rounded-xl border border-border bg-card/25 hover:bg-muted text-muted-foreground hover:text-foreground font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-none cursor-pointer"
                  >
                    {viewAll ? "Tampilkan Sedikit" : `Tampilkan Semua (${messages.length - 5} Pesan Lainnya)`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
