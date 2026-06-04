"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MATERIALS_LIB } from "@/data/site";
import Reveal from "./Reveal";
import LoomObjectLazy from "./LoomObjectLazy";

/**
 * The Material Library — an index of the house's raw vocabulary.
 * Hover a material to study it in macro.
 */
export default function MaterialLibrary() {
  const [active, setActive] = useState(0);
  const mat = MATERIALS_LIB[active];

  return (
    <section className="relative border-t border-ivory-mute bg-ivory-bright py-24 md:py-36">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow text-brass">The Material Library</p>
          <h2 className="display mt-4 max-w-3xl text-5xl text-charcoal md:text-7xl">
            The materials <span className="italic text-stone-dark">we choose.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Index */}
          <div className="order-2 lg:order-1">
            <ul>
              {MATERIALS_LIB.map((m, i) => (
                <li key={m.key}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-baseline justify-between gap-6 border-b py-5 text-left transition-colors duration-500 ${
                      active === i ? "border-brass/60" : "border-ivory-mute hover:border-stone-light"
                    }`}
                  >
                    <span
                      className={`display text-3xl transition-colors duration-500 md:text-4xl ${
                        active === i ? "text-brass" : "text-charcoal/80 group-hover:text-charcoal"
                      }`}
                    >
                      {m.name}
                    </span>
                    <span className="eyebrow shrink-0 text-stone-dark">{m.origin}</span>
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.p
                key={mat.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 max-w-lg text-base leading-relaxed text-stone-dark"
              >
                {mat.note}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Macro stage */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-soft shadow-[0_50px_90px_-50px_rgba(27,24,19,0.45)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={mat.key}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={mat.image}
                    alt={`${mat.name} — macro study`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="img-luxe object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/55 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="eyebrow text-gold">{mat.name}</p>
                <p className="mt-1 text-xs text-ivory/80">{mat.origin}</p>
              </div>
              {/* The Thread — 3D signature object */}
              <LoomObjectLazy className="pointer-events-none absolute -right-8 -top-8 hidden h-52 w-52 opacity-90 md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
