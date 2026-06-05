"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CollectionSlug, Piece } from "@/data/types";
import { COLLECTIONS } from "@/data/site";
import { formatINR } from "@/data/pieces";
import { IconClock, IconHash, IconLotus } from "./icons";

type Filter = "all" | CollectionSlug;

/* Editorial rhythm — aspect ratios cycle so the wall never feels like a grid of boxes. */
const RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"] as const;

function Card({ piece, index }: { piece: Piece; index: number }) {
  const feature = index % 9 === 0;
  const ratio = feature ? "aspect-[16/10]" : RATIOS[index % RATIOS.length];
  const remaining = Math.max(piece.edition.of - piece.edition.number, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min((index % 12) * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className={feature ? "col-span-2" : ""}
    >
      <div className="group">
        <Link href={`/piece/${piece.slug}`} className="block">
          <div className={`relative w-full overflow-hidden bg-ivory-soft ${ratio}`}>
            <Image
              src={piece.images[0]}
              alt={piece.name}
              fill
              sizes={feature ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              className={`img-luxe object-cover transition-all duration-700 ${
                piece.images[1] ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"
              }`}
            />
            {piece.images[1] && (
              <Image
                src={piece.images[1]}
                alt={`${piece.name} — detail`}
                fill
                sizes={feature ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                className="img-luxe object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            )}

            {/* Hover dossier strip */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-charcoal-deep/85 to-transparent p-4 pt-12 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="eyebrow text-[0.5rem] text-gold">{piece.craft}</p>
              <div className="mt-2 flex items-center gap-1.5">
                {piece.palette.map((hex) => (
                  <span
                    key={hex}
                    className="h-3.5 w-3.5 rounded-full border border-ivory/30"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>

            <span className="eyebrow absolute left-3 top-3 bg-ivory-bright/90 px-2.5 py-1.5 text-[0.5rem] text-charcoal backdrop-blur-sm">
              № {String(piece.edition.number).padStart(2, "0")}/{piece.edition.of}
            </span>
            {remaining <= 5 && remaining > 0 && (
              <span className="eyebrow absolute right-3 top-3 bg-charcoal/85 px-2.5 py-1.5 text-[0.5rem] text-gold backdrop-blur-sm">
                {remaining} left
              </span>
            )}
          </div>
        </Link>

        <div className="mt-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <Link
              href={`/piece/${piece.slug}`}
              className={`display truncate text-charcoal transition-colors duration-500 hover:text-brass ${
                feature ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
              }`}
            >
              {piece.name}
            </Link>
            <span className="display shrink-0 text-lg text-brass md:text-xl">
              {formatINR(piece.price)}
            </span>
          </div>
          {feature && (
            <p className="lede mt-1 line-clamp-1 text-base text-stone-dark">{piece.description}</p>
          )}
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="eyebrow flex items-center gap-1.5 text-[0.52rem] text-stone-dark">
              <IconClock size={11} className="text-brass" /> {piece.hours} hrs
            </span>
            <Link
              href={`/piece/${piece.slug}`}
              className="eyebrow border border-brass/50 px-4 py-2 text-[0.52rem] text-brass transition-all duration-500 hover:border-charcoal hover:bg-charcoal hover:text-gold"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** The Shop wall — every piece at once, hung with editorial rhythm. */
export default function ShopGrid({ pieces }: { pieces: Piece[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () => (filter === "all" ? pieces : pieces.filter((p) => p.collection === filter)),
    [filter, pieces]
  );

  const active = COLLECTIONS.find((c) => c.slug === filter);

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All Pieces", count: pieces.length },
    ...COLLECTIONS.map((c) => ({
      key: c.slug as Filter,
      label: c.title.replace("The ", "").replace(" Collection", "s").replace("Linens", "Linen"),
      count: pieces.filter((p) => p.collection === c.slug).length,
    })),
  ];

  return (
    <div>
      {/* Serif tabs with a travelling underline */}
      <div className="flex flex-wrap gap-x-9 gap-y-3 border-b border-ivory-mute">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className="group relative pb-4 text-left"
          >
            <span
              className={`display text-2xl transition-colors duration-500 md:text-3xl ${
                filter === t.key ? "text-charcoal" : "text-stone hover:text-stone-dark"
              }`}
            >
              {t.label}
            </span>
            <sup
              className={`eyebrow ml-1.5 text-[0.5rem] ${
                filter === t.key ? "text-brass" : "text-stone"
              }`}
            >
              {t.count}
            </sup>
            {filter === t.key && (
              <motion.span
                layoutId="shop-tab"
                className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-brass to-gold"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      {/* One line of the active room's voice */}
      <div className="mt-6 flex min-h-[2rem] items-center gap-3">
        <IconLotus size={14} className="shrink-0 text-brass animate-pulse-soft" />
        <AnimatePresence mode="wait">
          <motion.p
            key={filter}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="lede text-lg text-stone-dark md:text-xl"
          >
            {active
              ? `${active.subtitle} — ${active.manifesto[1] ?? active.manifesto[0]}`
              : "Every piece an original of the maison — numbered, certified, handcrafted."}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* The wall — remounts per filter so each room enters fresh */}
      <div
        key={filter}
        className="mt-10 grid grid-cols-2 items-start gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4"
      >
        {shown.map((piece, i) => (
          <Card key={piece.slug} piece={piece} index={i} />
        ))}
      </div>
    </div>
  );
}
