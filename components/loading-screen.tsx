"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState(0); // 0: enter/intro, 1: show full, 2: collapse others, 3: transform case & scale/glow, 4: exit

  const letters = [
    { char: "E", targetChar: "e", keep: true },
    { char: "n", targetChar: "", keep: false },
    { char: "g", targetChar: "", keep: false },
    { char: "g", targetChar: "", keep: false },
    { char: "a", targetChar: "", keep: false },
    { char: "l", targetChar: "", keep: false },
    { char: " ", targetChar: "", keep: false, isSpace: true },
    { char: "B", targetChar: "b", keep: true },
    { char: "i", targetChar: "i", keep: true },
    { char: "m", targetChar: "m", keep: true },
    { char: "a", targetChar: "", keep: false },
    { char: " ", targetChar: "", keep: false, isSpace: true },
    { char: "S", targetChar: "s", keep: true },
    { char: "a", targetChar: "a", keep: true },
    { char: "k", targetChar: "", keep: false },
    { char: "t", targetChar: "", keep: false },
    { char: "i", targetChar: "", keep: false },
  ];

  useEffect(() => {
    // Stage Timers
    const t1 = setTimeout(() => setStage(1), 500);  // show full name quickly
    const t2 = setTimeout(() => setStage(2), 1200); // start collapse animation
    const t3 = setTimeout(() => setStage(3), 1950); // reveal logo and glow
    const t4 = setTimeout(() => setStage(4), 2650); // start exit fade out
    const t5 = setTimeout(() => {
      onComplete();
    }, 3000); // trigger complete callback

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={stage === 4 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Soft Glow in Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className="w-[180px] h-[180px] rounded-full bg-primary/15 blur-[60px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: stage >= 3 ? 1.3 : stage >= 1 ? 0.9 : 0,
            opacity: stage >= 1 ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Main Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Brand Logo Image Reveal with smooth size & margin animation */}
        <motion.div
          className="relative rounded-full border border-border bg-card shadow-md flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.6, y: -15, height: 0, width: 0, marginBottom: 0, borderWidth: 0 }}
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            scale: stage >= 3 ? 1 : 0.6,
            y: stage >= 3 ? 0 : -15,
            height: stage >= 3 ? "4.5rem" : 0, // 72px
            width: stage >= 3 ? "4.5rem" : 0,
            marginBottom: stage >= 3 ? "1rem" : 0,
            borderWidth: stage >= 3 ? 1 : 0,
          }}
          style={{
            maxWidth: "4.5rem",
            maxHeight: "4.5rem",
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        >
          {stage >= 3 && (
            <Image
              src="/ebimsa.png"
              alt="Ebimsa Logo"
              fill
              priority
              className="object-cover rounded-full p-1"
            />
          )}
        </motion.div>

        <motion.div
          className="flex items-end justify-center select-none font-black tracking-normal text-3xl sm:text-5xl md:text-6xl"
          animate={{
            scale: stage === 3 ? 1.08 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
        >
          {letters.map((item, index) => {
            const showChar = stage >= 2 && item.keep ? item.targetChar : item.char;
            const isCollapsing = stage >= 2 && !item.keep;

            return (
              <motion.span
                key={index}
                className={`inline-block overflow-hidden whitespace-nowrap text-center align-bottom ${
                  stage >= 2 && item.keep
                    ? "text-logo-gradient font-black"
                    : "text-foreground font-black"
                }`}
                initial={{ opacity: 0, y: 15, maxWidth: "80px" }}
                animate={{
                  opacity: isCollapsing ? 0 : 1,
                  y: 0,
                  maxWidth: isCollapsing ? "0px" : "80px",
                  marginRight: isCollapsing ? "0px" : item.isSpace ? "0.22em" : "0.01em",
                }}
                transition={{
                  opacity: {
                    duration: isCollapsing ? 0.25 : 0.35,
                    delay: isCollapsing ? 0 : index * 0.02,
                  },
                  y: {
                    duration: 0.35,
                    delay: index * 0.02,
                    type: "spring",
                    stiffness: 120,
                  },
                  maxWidth: {
                    duration: 0.45,
                    ease: "easeInOut",
                  },
                  marginRight: {
                    duration: 0.45,
                    ease: "easeInOut",
                  },
                }}
              >
                {showChar}
              </motion.span>
            );
          })}
        </motion.div>

        {/* Decorative Line under the logo */}
        <motion.div
          className="h-1 bg-logo-gradient mt-6 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: stage >= 3 ? "100px" : stage >= 1 ? "220px" : "0px",
            opacity: stage >= 1 ? 0.75 : 0,
          }}
          transition={{
            width: { duration: 0.45, ease: "easeInOut" },
            opacity: { duration: 0.3 },
          }}
        />
      </div>

    </motion.div>
  );
}
