"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Piece } from "@/data/types";
import { formatINR } from "@/data/pieces";
import { IconHash } from "./icons";

/**
 * The sticky acquisition bar — price and CTA never more than a thumb away.
 * Appears once the hero is passed; hides near the acquisition section itself.
 */
export default function StickyBuyBar({ piece }: { piece: Piece }) {
  const [show, setShow] = useState(false);
  const remaining = Math.max(piece.edition.of - piece.edition.number, 0);

  useEffect(() => {
    const onScroll = () => {
      const acquire = document.getElementById("acquire");
      const nearAcquire = acquire
        ? acquire.getBoundingClientRect().top < window.innerHeight * 0.85
        : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearAcquire);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-brass/30 bg-ivory-bright/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-[1700px] items-center justify-between gap-4 px-5 py-3.5 md:px-12">
            <div className="min-w-0">
              <p className="display truncate text-lg text-charcoal md:text-2xl">{piece.name}</p>
              <p className="eyebrow mt-0.5 hidden items-center gap-1.5 text-[0.52rem] text-stone-dark sm:flex">
                <IconHash size={11} className="text-brass" />
                {remaining > 0
                  ? `${remaining} of ${piece.edition.of} available`
                  : `Edition of ${piece.edition.of}`}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 md:gap-5">
              <span className="display text-xl text-brass md:text-3xl">
                {formatINR(piece.price)}
              </span>
              <a
                href="#acquire"
                className="eyebrow border border-brass bg-charcoal px-5 py-3.5 text-gold transition-colors duration-500 hover:bg-charcoal-deep md:px-8 md:py-4"
              >
                Acquire
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
