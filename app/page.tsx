"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { StatusSection } from "@/components/status-section";
import { LoadingScreen } from "@/components/loading-screen";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col"
          >
            {/* Sticky Blurred Glassmorphism Navigation */}
            <Navbar />

            {/* Main Single Page Content Flow */}
            <main className="flex-1 w-full bg-background transition-colors duration-300">
              {/* Interactive Status Section (Hero Dashboard) */}
              <StatusSection />

              {/* About Section */}
              <About />

              {/* Projects Section */}
              <Projects />

              {/* Experience Section */}
              <Experience />

              {/* Contact & Guestbook Section */}
              <Contact />
            </main>

            {/* Footer Section */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}