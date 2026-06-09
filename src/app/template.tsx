// ------------------------------------------------------------------------
// Page Transition Wrapper
//
// Adds the soft fade-in animation when moving between pages.
// ------------------------------------------------------------------------

"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Route transitions — every page arrives like a turned leaf, never a jump cut. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
