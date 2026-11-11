"use client";

import React, { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";

function RouteProgressBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Complete progress whenever the pathname or query changes
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept click on links to start route loading progress
  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");

      if (
        !href ||
        target === "_blank" ||
        href.startsWith("#") ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        href.startsWith("javascript:") ||
        href.startsWith("http://") ||
        href.startsWith("https://")
      ) {
        return;
      }

      if (href === pathname || href === window.location.pathname) {
        return;
      }

      setLoading(true);
      setProgress(25);

      const creep1 = setTimeout(() => setProgress(55), 150);
      const creep2 = setTimeout(() => setProgress(78), 350);
      const creep3 = setTimeout(() => setProgress(88), 650);

      const cleanup = () => {
        clearTimeout(creep1);
        clearTimeout(creep2);
        clearTimeout(creep3);
      };

      window.addEventListener("popstate", cleanup, { once: true });
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <>
      {/* 1. Ultra-sleek Top Glowing Golden Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[99998] pointer-events-none h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-300 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(245,158,11,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. Cinematic Page-Change Floating Badge */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-[99997] pointer-events-none"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-stone-950/90 backdrop-blur-md border border-amber-400/40 text-white shadow-2xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="text-xs font-black tracking-wide text-amber-100">
                Ghar Jaisa Swad Loading...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function RouteProgressBar() {
  return (
    <Suspense fallback={null}>
      <RouteProgressBarContent />
    </Suspense>
  );
}
