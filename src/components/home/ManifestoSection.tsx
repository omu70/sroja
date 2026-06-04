"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MANIFESTO } from "@/data/site";

function ManifestoLine({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 45%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.14, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  const emphasised = index % 2 === 1;

  return (
    <motion.p
      ref={ref}
      style={{ opacity, y }}
      className={`display mx-auto max-w-5xl text-center ${
        emphasised
          ? "text-4xl italic text-gold md:text-6xl"
          : "text-4xl text-ivory md:text-6xl"
      }`}
    >
      {text}
    </motion.p>
  );
}

/** Why SROJA Exists — the manifesto, read at reading pace. */
export default function ManifestoSection() {
  return (
    <section className="relative border-t border-charcoal-line bg-charcoal-deep py-32 md:py-48">
      <div className="px-6">
        <p className="eyebrow mb-20 text-center text-brass">Why SROJA Exists</p>
        <div className="space-y-16 md:space-y-24">
          {MANIFESTO.map((line, i) => (
            <ManifestoLine key={i} text={line} index={i} />
          ))}
        </div>
        <p className="eyebrow mt-24 text-center text-stone">
          — The House Manifesto, written by Archit
        </p>
      </div>
    </section>
  );
}
