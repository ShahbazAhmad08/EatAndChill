"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CinematicLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth cinematic progress counter
    const startTime = Date.now();
    const duration = 1200; // 1.2s total smooth reveal

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="cinematic-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[99999] bg-stone-950 flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient Royal Red & Gold Background Glows */}
          <div className="absolute w-[520px] h-[520px] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute w-[420px] h-[420px] rounded-full bg-red-700/20 blur-[100px] pointer-events-none" />

          {/* Golden Rotating Dashed Orbit Ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{
              scale: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.5 },
              rotate: { duration: 16, repeat: Infinity, ease: "linear" },
            }}
            className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-dashed border-amber-400/30 pointer-events-none"
          />

          {/* Central Logo Container with Golden Glow */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center px-4 text-center"
          >
            {/* Logo Emblem Badge */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-2xl shadow-amber-500/40">
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-stone-950">
                <Image
                  src="/images/logo-square.jpg"
                  alt="Real Brother's Restaurant"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Pulsing Accent Ring */}
              <span className="absolute -inset-2.5 rounded-3xl border border-amber-400/40 animate-ping opacity-30 pointer-events-none" />
            </div>

            {/* Brand Title with Golden Typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 space-y-1.5"
            >
              <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 uppercase">
                REAL BROTHER&apos;S
              </h1>
              <div className="flex items-center justify-center gap-1.5 text-amber-400/90 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ghar Jaisa Swad • Estd. 2024</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </motion.div>

            {/* Luxury Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <div className="w-48 sm:w-56 h-1.5 bg-stone-900 rounded-full overflow-hidden p-0.5 border border-stone-800">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-300 rounded-full shadow-lg shadow-amber-500/60 transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400/70 tracking-widest">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
