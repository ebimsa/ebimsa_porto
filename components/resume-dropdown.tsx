"use client";

import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { FileText, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const RESUME_OPTIONS = [
  {
    id: "id",
    label: "Bahasa Indonesia",
    sublabel: "Versi Indonesia • 121 KB",
    badge: "ID",
    url: "/CV_Enggal_Bima_Sakti_ID.pdf",
  },
  {
    id: "en",
    label: "English",
    sublabel: "English Version • 128 KB",
    badge: "EN",
    url: "/CV_Enggal_Bima_Sakti_EN.pdf",
  },
] as const;

interface ResumeDropdownProps {
  align?: "start" | "end" | "center";
  side?: "top" | "bottom";
  sideOffset?: number;
  triggerClassName?: string;
  children?: React.ReactNode;
}

export function ResumeDropdown({
  align = "start",
  side = "bottom",
  sideOffset = 6,
  triggerClassName,
  children,
}: ResumeDropdownProps) {
  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          "group flex items-center justify-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl border border-border/80 bg-card/40 text-muted-foreground hover:text-primary hover:border-primary/30 font-bold text-[10px] md:text-xs squircle-sm transition-all duration-300 cursor-pointer select-none outline-hidden data-popup-open:border-primary/40 data-popup-open:text-primary data-popup-open:bg-card/70",
          triggerClassName
        )}
      >
        {children ? (
          children
        ) : (
          <>
            <FileText className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground group-hover:text-primary group-data-popup-open:text-primary transition-colors" />
            <span>Resume</span>
            <ChevronDown className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground/70 group-hover:text-primary group-data-popup-open:rotate-180 group-data-popup-open:text-primary transition-transform duration-200" />
          </>
        )}
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          align={align}
          side={side}
          sideOffset={sideOffset}
          className="z-[100] outline-hidden"
        >
          <Menu.Popup className="min-w-[230px] rounded-xl border border-border/80 bg-card/95 backdrop-blur-md p-1.5 shadow-2xl squircle-sm text-foreground transition-all duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 outline-hidden">
            <div className="space-y-1">
              {RESUME_OPTIONS.map((opt) => (
                <Menu.LinkItem
                  key={opt.id}
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  closeOnClick
                  className="group/item flex items-center justify-between gap-3 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-150 hover:bg-muted/80 data-highlighted:bg-muted/80 select-none outline-hidden"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-muted/80 border border-border/85 font-black text-[10px] tracking-wider flex items-center justify-center text-muted-foreground group-hover/item:text-primary group-hover/item:border-primary/40 group-hover/item:bg-primary/10 transition-colors shrink-0 select-none">
                      {opt.badge}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-foreground group-hover/item:text-primary data-highlighted:text-primary transition-colors">
                        {opt.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        {opt.sublabel}
                      </span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-md bg-muted/60 border border-border/60 flex items-center justify-center text-muted-foreground group-hover/item:text-primary group-hover/item:border-primary/30 group-hover/item:bg-primary/10 transition-all shrink-0">
                    <ExternalLink className="w-3 h-3 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                  </div>
                </Menu.LinkItem>
              ))}
            </div>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
