// ------------------------------------------------------------------------
// Interactive Origins Map (craft page)
//
// Hover a material and its home region lights up on the real India map.
// ------------------------------------------------------------------------

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { img } from "@/data/site";
import { IconLotus, IconPin } from "./icons";

/**
 * Where it comes from — hover a material, watch its home light up on India.
 * The map is deliberately stylised: a brand object, not an atlas.
 */

interface Origin {
  key: string;
  material: string;
  place: string;
  state: string;
  fact: string;
  /** position in the real-map viewBox (611.86 × 695.70) */
  x: number;
  y: number;
  image: string;
}

// Coordinates projected from the map's geo-viewBox (lon/lat → svg units).
const ORIGINS: Origin[] = [
  {
    key: "kala",
    material: "Kala Cotton",
    place: "Bhujodi, Kutch",
    state: "Gujarat",
    fact: "Rain-fed cotton, handspun and woven by a handful of families for 500 years.",
    x: 31,
    y: 318,
    image: img("1778764935406_iwtxps5smha.png"),
  },
  {
    key: "block",
    material: "Hand Block Printing",
    place: "Sanganer & Bagru, Jaipur",
    state: "Rajasthan",
    fact: "Carved teak blocks and dye vats — the printing tables of the pink city.",
    x: 159,
    y: 235,
    image: img("1778575721257_htsug72o4vf.webp"),
  },
  {
    key: "cambric",
    material: "Cotton Cambric & Dyes",
    place: "Jaipur belt",
    state: "Rajasthan",
    fact: "Fine cambric, indigo and madder — mastered beside the block tables.",
    x: 168,
    y: 224,
    image: img("1778664354453_6dqmk575fh7.webp"),
  },
  {
    key: "chettinad",
    material: "Yarn-Dyed Cotton",
    place: "Karaikudi, Chettinad",
    state: "Tamil Nadu",
    fact: "Checks and stripes woven in the palette of the mansion country.",
    x: 222,
    y: 620,
    image: img("1778737621268_wl49d1fh08h.webp"),
  },
  {
    key: "studio",
    material: "Design Studio",
    place: "Gurugram",
    state: "Haryana",
    fact: "Where every motif is drawn, numbered and certified before the looms begin.",
    x: 185,
    y: 198,
    image: img("1778767833856_4t842ktzits.png"),
  },
];

const VB_W = 611.85999;
const VB_H = 695.70178;

export default function OriginsMap() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const origin = ORIGINS[active];

  /* Ambient rotation until the visitor takes over */
  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % ORIGINS.length), 4500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [touched]);

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <section className="relative border-t border-ivory-mute bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-brass">
            <IconPin size={14} /> Origins
          </p>
          <h2 className="font-brand mt-4 max-w-3xl text-4xl tracking-wide text-charcoal md:text-6xl">
            Where your piece <span className="text-terracotta">comes from.</span>
          </h2>
          <p className="lede mt-4 max-w-xl text-lg text-stone-dark">
            Hover a material — its home lights up.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          {/* The index — hover to travel */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-ivory-mute border-y border-ivory-mute">
              {ORIGINS.map((o, i) => (
                <li key={o.key}>
                  <button
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    onClick={() => select(i)}
                    className={`group flex w-full items-center gap-5 px-2 py-5 text-left transition-colors duration-500 ${
                      active === i ? "bg-blush/40" : "hover:bg-blush/20"
                    }`}
                  >
                    <span
                      className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full border transition-colors duration-500 ${
                        active === i ? "border-terracotta" : "border-ivory-mute"
                      }`}
                    >
                      <Image src={o.image} alt={o.material} fill sizes="56px" className="img-luxe object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`display block truncate text-2xl transition-colors duration-500 ${
                          active === i ? "text-terracotta" : "text-charcoal group-hover:text-charcoal"
                        }`}
                      >
                        {o.material}
                      </span>
                      <span className="eyebrow mt-0.5 block text-stone-dark">
                        {o.place} · {o.state}
                      </span>
                    </span>
                    <IconPin
                      size={17}
                      className={`shrink-0 transition-all duration-500 ${
                        active === i ? "text-terracotta opacity-100" : "opacity-25"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* The fact line for the active origin */}
            <AnimatePresence mode="wait">
              <motion.p
                key={origin.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="lede mt-6 min-h-[3.5rem] max-w-md text-lg leading-snug text-charcoal/85"
              >
                {origin.fact}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* The map */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative mx-auto w-full max-w-xl border border-ivory-mute bg-ivory-bright p-6 shadow-[0_40px_80px_-50px_rgba(27,24,19,0.3)] md:p-8">
              <div className="relative" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
                {/* Real India outline */}
                <img
                  src="/india-map.svg"
                  alt="A map of India showing where each material comes from"
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />

                {/* Marker overlay — same coordinate space as the map */}
                <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" aria-hidden>
                  {/* Thread from the studio to the active origin */}
                  {origin.key !== "studio" && (
                    <motion.path
                      key={`thread-${origin.key}`}
                      d={`M 185 198 Q ${(185 + origin.x) / 2 + 40} ${(198 + origin.y) / 2} ${origin.x} ${origin.y}`}
                      fill="none"
                      stroke="#D05E29"
                      strokeWidth="2.4"
                      strokeDasharray="7 8"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.85 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}

                  {/* All origin dots, quiet */}
                  {ORIGINS.map((o, idx) => (
                    <circle key={o.key} cx={o.x} cy={o.y} r="5" fill={o.key === "studio" ? "#2D3131" : "#9A7A42"} opacity={active === idx ? 0 : 0.7} />
                  ))}

                  {/* The active pin — travels */}
                  <motion.g
                    animate={{ x: origin.x, y: origin.y }}
                    transition={{ type: "spring", stiffness: 70, damping: 14 }}
                  >
                    <circle r="20" fill="none" stroke="#D05E29" strokeWidth="2.2">
                      <animate attributeName="r" from="9" to="33" dur="2.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.9" to="0" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                    <circle r="9" fill="#D05E29" />
                    <circle r="3.4" fill="#FAF8F5" />
                  </motion.g>
                </svg>
              </div>

              {/* The label plate */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={origin.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45 }}
                  className="pointer-events-none absolute bottom-5 left-5 border border-brass/40 bg-paper/95 px-5 py-4 backdrop-blur-sm md:bottom-8 md:left-8"
                >
                  <p className="eyebrow flex items-center gap-2 text-terracotta">
                    <IconLotus size={12} className="animate-pulse-soft" /> {origin.state}
                  </p>
                  <p className="font-brand mt-1 text-xl text-charcoal md:text-2xl">{origin.place}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Local Reveal — avoids importing the server-flavoured wrapper into this client file */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
