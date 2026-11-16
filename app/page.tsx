"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { StatusStrip } from "@/components/status-strip";
import { TechMarquee } from "@/components/tech-marquee";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Single Page Content Flow */}
      <main className="flex-1 w-full bg-background transition-colors duration-300">
        {/* Creative Hero (with merged Enggal Bima Sakti -> ebimsa morph) */}
        <Hero />

        {/* Interactive Status Section */}
        <StatusStrip />

        {/* About Section */}
        <About />

        {/* Infinite Tech Stack Marquee */}
        <TechMarquee />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Contact & Guestbook Section */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
