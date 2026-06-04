"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProcessStep } from "@/data/types";

/**
 * The making as a ledger of bars — each phase weighed in hours.
 * Replaces paragraphs with proportion.
 */
export default function HoursBars({ steps, total }: { steps: ProcessStep[]; total: number }) {
  const reduce = useReducedMotion();
  const max = Math.max(...steps.map((s) => s.hours));

  return (
    <ol className="space-y-7">
      {steps.map((step, i) => {
        const pct = Math.max((step.hours / max) * 100, 6);
        return (
          <li key={step.phase}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="flex items-baseline gap-3">
                <span className="display text-xl text-brass/70">0{i + 1}</span>
                <span className="display text-2xl text-charcoal md:text-3xl">{step.phase}</span>
              </p>
              <p className="eyebrow shrink-0">
                <span className="display text-2xl text-brass">{step.hours}</span>
                <span className="ml-1 text-stone-dark">hrs</span>
              </p>
            </div>
            <div className="mt-3 h-[3px] w-full overflow-hidden bg-ivory-mute">
              <motion.div
                className="h-full bg-gradient-to-r from-brass to-gold"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.4, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: `${pct}%`, transformOrigin: "left" }}
              />
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-stone-dark first-letter:uppercase md:text-sm">
              {step.detail}
            </p>
          </li>
        );
      })}
      <li className="flex items-baseline justify-between border-t border-ivory-mute pt-5">
        <span className="eyebrow text-stone-dark">Total, recorded at the atelier</span>
        <span className="display text-3xl text-brass">{total} hrs</span>
      </li>
    </ol>
  );
}
