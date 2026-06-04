"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MANIFESTO } from "@/data/site";
import { IconLotus } from "@/components/icons";

function ManifestoLine({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 48%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [22, 0]);

  const emphasised = index % 2 === 1;

  return (
    <motion.p
      ref={ref}
      style={{ opacity, y }}
      className={`display mx-auto max-w-5xl text-center ${
        emphasised
          ? "text-4xl italic text-brass md:text-6xl"
          : "text-4xl text-charcoal md:text-6xl"
      }`}
    >
      {text}
    </motion.p>
  );
}

/** Why SROJA Exists — the manifesto, read at reading pace. */
export default function ManifestoSection() {
  return (
    <section className="relative overflow-hidden border-t border-ivory-mute bg-ivory py-28 md:py-44">
      {/* Perpetual watermarks */}
      <IconLotus
        size={300}
        className="pointer-events-none absolute -left-24 top-10 text-ivory-soft animate-spin-slow"
      />
      <IconLotus
        size={200}
        className="pointer-events-none absolute -right-16 bottom-10 text-ivory-soft animate-spin-slow"
      />

      <div className="relative px-6">
        <p className="eyebrow mb-16 text-center text-brass">Why SROJA Exists</p>
        <div className="space-y-14 md:space-y-20">
          {MANIFESTO.map((line, i) => (
            <ManifestoLine key={i} text={line} index={i} />
          ))}
        </div>
        <p className="eyebrow mt-20 text-center text-stone-dark">
          — The House Manifesto, written by Archit
        </p>
      </div>
    </section>
  );
}
