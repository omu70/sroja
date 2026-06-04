"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface HeroFilmProps {
  frames: { src: string; alt: string }[];
}

/**
 * Cinematic hero — a slow film of craft close-ups (Ken Burns crossfade).
 * Swap `frames` for a <video> of hands at the block table when footage exists.
 */
export default function HeroFilm({ frames }: HeroFilmProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % frames.length), 6400);
    return () => clearInterval(id);
  }, [frames.length, reduce]);

  return (
    <section className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal-deep">
      {/* The film */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? undefined : { scale: 1.12 }}
            animate={reduce ? undefined : { scale: 1.0 }}
            transition={{ duration: 9, ease: "linear" }}
          >
            <Image
              src={frames[index].src}
              alt={frames[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="img-luxe object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Cinematic grade */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/70 via-charcoal-deep/30 to-charcoal-deep" />
      <div className="absolute inset-0 bg-charcoal-deep/25" />

      {/* Copy */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.4 }}
          className="eyebrow mb-8 text-gold"
        >
          A Luxury Design House from India
        </motion.p>

        <h1 className="display text-[13vw] leading-[0.95] text-ivory md:text-[7.5vw]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Designed To Be
          </motion.span>
          <motion.span
            className="block italic text-gold"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Collected.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.4 }}
          className="lede mt-10 text-xl text-ivory/85 md:text-2xl"
        >
          Not manufactured. Crafted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <Link
            href="/collections"
            className="eyebrow group inline-flex items-center gap-4 border border-ivory/30 px-10 py-5 text-ivory transition-all duration-700 hover:border-gold hover:bg-gold hover:text-charcoal-deep"
          >
            Explore The Collection
            <span aria-hidden className="transition-transform duration-700 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="mx-auto h-14 w-px overflow-hidden bg-ivory/15">
          <motion.div
            className="h-1/2 w-px bg-gold"
            animate={{ y: [-30, 60] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
        </div>
        <p className="eyebrow mt-4 text-[0.55rem] text-stone">Scroll</p>
      </motion.div>
    </section>
  );
}
