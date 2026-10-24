"use client";

import React from "react";
import { useT } from "@/lib/i18n";
import { FlagEN, FlagID } from "@/components/ui-icons";

export function LanguageToggle() {
  const { lang, setLang } = useT();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "id" : "en")}
      className="flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-border/80 bg-background/50 hover:bg-muted/80 text-muted-foreground hover:text-foreground focus-visible:outline-none transition-colors cursor-pointer select-none"
      title="Toggle Language (EN / ID)"
      aria-label="Toggle Language"
    >
      <span className={`inline-flex items-center gap-1 ${lang === "en" ? "text-foreground font-black" : "opacity-45"}`}>
        <FlagEN className="w-3.5 h-2.5" />
        <span>EN</span>
      </span>
      <span className="opacity-30 mx-0.5">/</span>
      <span className={`inline-flex items-center gap-1 ${lang === "id" ? "text-foreground font-black" : "opacity-45"}`}>
        <FlagID className="w-3.5 h-2.5" />
        <span>ID</span>
      </span>
    </button>
  );
}
