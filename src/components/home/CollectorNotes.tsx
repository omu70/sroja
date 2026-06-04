"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COLLECTOR_NOTES } from "@/data/site";

/** Collector Notes — correspondence, not reviews. */
export default function CollectorNotes() {
  const [index, setIndex] = useState(0);
  const note = COLLECTOR_NOTES[index];

  return (
    <section className="relative border-t border-charcoal-line bg-charcoal py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
        <p className="eyebrow text-gold">Collector Notes</p>

        <div className="relative mt-14 min-h-[16rem] md:min-h-[14rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="display text-3xl leading-[1.25] text-ivory md:text-[2.6rem]">
                <span aria-hidden className="text-gold">“</span>
                {note.quote}
                <span aria-hidden className="text-gold">”</span>
              </blockquote>
              <figcaption className="eyebrow mt-10 text-stone">
                {note.name} — {note.place}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex items-center justify-center gap-3">
          {COLLECTOR_NOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Collector note ${i + 1}`}
              className={`h-px transition-all duration-700 ${
                i === index ? "w-14 bg-gold" : "w-7 bg-charcoal-line hover:bg-stone-dark"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
