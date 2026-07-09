"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  // Hydration-safe theme toggle (Light / Dark only)
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-5 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[95%] max-w-4xl z-50">
      {/* Floating Main Navbar Pill */}
      <div className="flex items-center justify-between px-5 py-2.5 rounded-full border border-border/80 bg-background/75 dark:bg-card/75 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all duration-300">
        
        {/* Left: Brand Signature */}
        <a href="#" className="flex items-center gap-2.5 group focus-visible:outline-none">
          <div className="relative w-7 h-7 overflow-hidden rounded-full border border-border flex items-center justify-center p-0.5 bg-background dark:bg-card group-hover:border-primary/50 transition-colors">
            <Image
              src="/ebimsa.png"
              alt="Ebimsa Logo"
              width={24}
              height={24}
              priority
              className="object-cover rounded-full"
            />
          </div>
          <span className="font-bold tracking-tight text-sm text-foreground transition-colors group-hover:text-primary">
            ebimsa
          </span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors relative rounded-full group focus-visible:outline-none"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Controls Panel */}
        <div className="flex items-center gap-3">

          {/* Theme Switcher Toggle Button (Light/Dark only) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-border/80 bg-background/50 hover:bg-muted/80 text-muted-foreground hover:text-foreground focus-visible:outline-none transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <>
                {theme === "light" ? (
                  <Sun className="w-3.5 h-3.5" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
              </>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1.5 rounded-full border border-border/80 bg-background/50 hover:bg-muted/80 text-muted-foreground hover:text-foreground focus-visible:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Dropdown Card */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-5 rounded-3xl border border-border/80 bg-background/95 dark:bg-card/95 backdrop-blur-lg shadow-xl sm:hidden z-40 flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-foreground/85 hover:text-primary transition-colors py-1 focus-visible:outline-none"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
