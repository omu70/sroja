// ------------------------------------------------------------------------
// Home: Reviews
//
// Auto-rotating customer/collector quotes.
// ------------------------------------------------------------------------

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COLLECTOR_NOTES } from "@/data/site";
import { IconLotus } from "@/components/icons";

/** What Collectors Say — correspondence, not reviews. Rotates on its own, like a vitrine. */
export default function CollectorNotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % COLLECTOR_NOTES.length), 8000);
    return () => clearInterval(id);
  }, []);

  const note = COLLECTOR_NOTES[index];

  return (
    <section className="relative overflow-hidden border-t border-ivory-mute bg-ivory py-24 md:py-36">
      <span className="display pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 text-[16rem] leading-none text-ivory-soft">
        “
      </span>

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-12">
        <div className="flex items-center justify-center gap-3">
          <span className="rule w-16" />
          <IconLotus size={18} className="text-brass animate-pulse-soft" />
          <span className="rule w-16" />
        </div>
        <p className="eyebrow mt-5 text-brass">What Collectors Say</p>

        <div className="relative mt-12 min-h-[15rem] md:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="display text-3xl leading-[1.25] text-charcoal md:text-[2.5rem]">
                {note.quote}
              </blockquote>
              <figcaption className="eyebrow mt-9 text-stone-dark">
                {note.name} — {note.place}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          {COLLECTOR_NOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Collector note ${i + 1}`}
              className={`h-px transition-all duration-700 ${
                i === index ? "w-14 bg-brass" : "w-7 bg-ivory-mute hover:bg-stone-light"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
