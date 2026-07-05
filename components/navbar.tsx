"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/70 backdrop-blur-md border-b border-border/40 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_30px_-15px_rgba(0,0,0,0.3)]"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo and Name */}
        <a href="#" className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg p-1">
          <div className="relative w-9 h-9 overflow-hidden squircle-sm border border-border bg-card group-hover:border-primary/50 transition-colors flex items-center justify-center p-0.5">
            <Image
              src="/ebimsa.png"
              alt="Ebimsa Logo"
              width={34}
              height={34}
              priority
              className="object-cover"
            />
          </div>
          <span className="font-semibold tracking-tight text-lg text-foreground group-hover:text-primary transition-colors">
            ebimsa
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative rounded-md group focus-visible:text-foreground focus-visible:outline-none"
            >
              {link.name}
              <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250" />
            </a>
          ))}
        </nav>

        {/* Action Panel */}
        <div className="hidden md:flex items-center gap-4">
          {/* Availability Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-muted-foreground">Available for projects</span>
          </div>

          {/* Theme Toggles */}
          <div className="flex items-center gap-0.5 p-1 rounded-full border border-border bg-card/30">
            {(["light", "dark", "system"] as const).map((t) => {
              const Icon = { light: Sun, dark: Moon, system: Monitor }[t];
              const isActive = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-1.5 rounded-full hover:bg-muted/80 transition-colors relative focus-visible:outline-none ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  aria-label={`Switch to ${t} theme`}
                >
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  {isActive && (
                    <motion.div
                      layoutId="navThemeBg"
                      className="absolute inset-0 bg-secondary/80 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu & Theme Controls Toggle */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Theme Switcher (Cycle through options) */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
            className="p-2 rounded-full border border-border bg-card/50 text-muted-foreground hover:text-foreground focus-visible:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "light" && <Sun className="w-4 h-4" />}
            {theme === "dark" && <Moon className="w-4 h-4" />}
            {theme === "system" && <Monitor className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-border bg-card/50 text-muted-foreground hover:text-foreground focus-visible:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-background/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed right-0 top-[61px] bottom-0 w-72 bg-background border-l border-border z-40 md:hidden flex flex-col p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-6 flex-1">
                {/* Navigation links */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Navigation</p>
                  <nav className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-1 focus-visible:outline-none"
                      >
                        {link.name}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="border-t border-border/80 my-2" />

                {/* Info / Availability details */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Availability</p>
                  <div className="flex items-center gap-2 p-3 rounded-xl border border-border bg-card text-sm font-medium">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-foreground/90">Available for projects</span>
                  </div>
                </div>

                <div className="border-t border-border/80 my-2" />

                {/* Theme Selector for Mobile */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Theme Preference</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(["light", "dark", "system"] as const).map((t) => {
                      const Icon = { light: Sun, dark: Moon, system: Monitor }[t];
                      const isActive = theme === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition-colors ${
                            isActive
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-card/50 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="capitalize">{t}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons in Drawer */}
              <div className="mt-auto space-y-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl btn-logo-glossy font-semibold text-sm"
                >
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
