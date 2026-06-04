"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A brass hairline along the top — how far through the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-brass via-gold to-brass"
    />
  );
}
