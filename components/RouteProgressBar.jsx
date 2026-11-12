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
    /* Ultra-sleek Top Glowing Golden Progress Bar (YouTube/Stripe style) */
    <div className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[2.5px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-300 transition-all duration-200 ease-out shadow-[0_0_8px_rgba(245,158,11,0.9)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? "width 150ms ease-out, opacity 250ms 100ms" : "width 200ms ease-out",
        }}
      />
    </div>
  );
}

export default function RouteProgressBar() {
  return (
    <Suspense fallback={null}>
      <RouteProgressBarContent />
    </Suspense>
  );
}
