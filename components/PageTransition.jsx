"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  // If in admin view, don't animate transitions
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.85, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.16,
        ease: "easeOut",
      }}
      className="w-full max-w-full overflow-x-hidden flex-1"
    >
      {children}
    </motion.div>
  );
}


