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
  /** position in the 100×112 map viewBox */
  x: number;
  y: number;
  image: string;
}

const ORIGINS: Origin[] = [
  {
    key: "kala",
    material: "Kala Cotton",
    place: "Bhujodi, Kutch",
    state: "Gujarat",
    fact: "Rain-fed cotton, handspun and woven by a handful of families for 500 years.",
    x: 13,
    y: 50,
    image: img("1778764935406_iwtxps5smha.png"),
  },
  {
    key: "block",
    material: "Hand Block Printing",
    place: "Sanganer & Bagru, Jaipur",
    state: "Rajasthan",
    fact: "Carved teak blocks and dye vats — the printing tables of the pink city.",
    x: 28,
    y: 36,
    image: img("1778575721257_htsug72o4vf.webp"),
  },
  {
    key: "cambric",
    material: "Cotton Cambric & Dyes",
    place: "Jaipur belt",
    state: "Rajasthan",
    fact: "Fine cambric, indigo and madder — mastered beside the block tables.",
    x: 30,
    y: 33,
    image: img("1778664354453_6dqmk575fh7.webp"),
  },
  {
    key: "chettinad",
    material: "Yarn-Dyed Cotton",
    place: "Karaikudi, Chettinad",
    state: "Tamil Nadu",
    fact: "Checks and stripes woven in the palette of the mansion country.",
    x: 41,
    y: 93,
    image: img("1778737621268_wl49d1fh08h.webp"),
  },
  {
    key: "studio",
    material: "Design Studio",
    place: "Gurugram",
    state: "Haryana",
    fact: "Where every motif is drawn, numbered and certified before the looms begin.",
    x: 33,
    y: 27,
    image: img("1778767833856_4t842ktzits.png"),
  },
];

/** Stylised India silhouette — brand object, not survey geometry. */
const INDIA_PATH =
  "M 40 5 C 44 4, 47 7, 46 11 C 52 13, 58 15, 63 19 C 69 21, 75 22, 80 25 C 84 26, 88 29, 85 33 C 82 34, 79 32, 77 35 C 74 39, 70 41, 67 43 C 65 49, 63 56, 60 63 C 56 74, 51 85, 45 96 C 43 101, 41 105, 39 107 C 38 108, 37 107, 36 104 C 33 96, 31 88, 28 80 C 25 72, 22 66, 19 61 C 15 59, 10 57, 8 53 C 6 50, 7 45, 11 45 C 14 45, 16 47, 18 49 C 18 44, 19 40, 22 39 C 22 32, 23 24, 27 18 C 30 13, 35 8, 40 5 Z";

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
              <svg viewBox="0 0 100 112" className="h-auto w-full" role="img" aria-label="A stylised map of India showing where each material comes from">
                <defs>
                  <pattern id="india-dots" width="2.4" height="2.4" patternUnits="userSpaceOnUse">
                    <circle cx="1.2" cy="1.2" r="0.3" fill="#C0A290" opacity="0.55" />
                  </pattern>
                  <clipPath id="india-clip">
                    <path d={INDIA_PATH} />
                  </clipPath>
                </defs>

                {/* The land — dotted, soft light */}
                <path d={INDIA_PATH} fill="#F5E1D1" opacity="0.55" />
                <rect width="100" height="112" fill="url(#india-dots)" clipPath="url(#india-clip)" />
                <path d={INDIA_PATH} fill="none" stroke="#9A7A42" strokeWidth="0.5" strokeLinejoin="round" />

                {/* Thread from the studio to the active origin */}
                {origin.key !== "studio" && (
                  <motion.path
                    key={`thread-${origin.key}`}
                    d={`M 33 27 Q ${(33 + origin.x) / 2 + 8} ${(27 + origin.y) / 2} ${origin.x} ${origin.y}`}
                    fill="none"
                    stroke="#D05E29"
                    strokeWidth="0.45"
                    strokeDasharray="1.4 1.6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}

                {/* All origin dots, quiet */}
                {ORIGINS.map((o) => (
                  <circle key={o.key} cx={o.x} cy={o.y} r="0.9" fill={o.key === "studio" ? "#2D3131" : "#9A7A42"} opacity={active === ORIGINS.indexOf(o) ? 0 : 0.7} />
                ))}

                {/* The active pin — travels */}
                <motion.g
                  animate={{ x: origin.x, y: origin.y }}
                  transition={{ type: "spring", stiffness: 70, damping: 14 }}
                >
                  <circle r="3.4" fill="none" stroke="#D05E29" strokeWidth="0.4">
                    <animate attributeName="r" from="1.6" to="5.5" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle r="1.5" fill="#D05E29" />
                  <circle r="0.55" fill="#FAF8F5" />
                </motion.g>
              </svg>

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

              <p className="eyebrow absolute bottom-5 right-5 text-[0.5rem] text-stone md:bottom-8 md:right-8">
                Stylised map
              </p>
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
