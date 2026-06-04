"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconLotus } from "./icons";

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
            initial={{ scale: 0.7, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <IconLotus size={44} className="text-gold" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.42em" }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-6 text-2xl text-ivory"
          >
            SROJA
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
