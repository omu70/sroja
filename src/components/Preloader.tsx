"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

/**
 * The intro — one breath of the house mark before the first page.
 * Plays once per session; skipped entirely under reduced motion.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("sroja-intro")) return;
    sessionStorage.setItem("sroja-intro", "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-charcoal-deep"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandLogo tone="gold" className="h-12 w-auto md:h-14" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
