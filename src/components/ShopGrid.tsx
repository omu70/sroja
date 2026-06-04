"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { CollectionSlug, Piece } from "@/data/types";
import { COLLECTIONS } from "@/data/site";
import { formatINR } from "@/data/pieces";
import { IconHash, IconClock } from "./icons";

type Filter = "all" | CollectionSlug;

/** Every piece, one page. Filter chips, hover swap, Buy Now on each card. */
export default function ShopGrid({ pieces }: { pieces: Piece[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () => (filter === "all" ? pieces : pieces.filter((p) => p.collection === filter)),
    [filter, pieces]
  );

  const chips: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All Pieces", count: pieces.length },
    ...COLLECTIONS.map((c) => ({
      key: c.slug as Filter,
      label: c.title.replace("The ", "").replace(" Collection", "s").replace("ss", "s"),
      count: pieces.filter((p) => p.collection === c.slug).length,
    })),
  ];

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2.5">
        {chips.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`eyebrow border px-5 py-3 transition-all duration-500 ${
              filter === c.key
                ? "border-charcoal bg-charcoal text-gold"
                : "border-ivory-mute bg-ivory-bright text-stone-dark hover:border-brass/50 hover:text-charcoal"
            }`}
          >
            {c.label} <span className="opacity-60">({c.count})</span>
          </button>
        ))}
      </div>

      {/* The grid */}
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {shown.map((piece, i) => (
          <motion.div
            key={piece.slug}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group">
              <Link href={`/piece/${piece.slug}`} className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-soft">
                  <Image
                    src={piece.images[0]}
                    alt={piece.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className={`img-luxe object-cover transition-all duration-700 ${
                      piece.images[1] ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"
                    }`}
                  />
                  {piece.images[1] && (
                    <Image
                      src={piece.images[1]}
                      alt={`${piece.name} — detail`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="img-luxe object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                  )}
                  <span className="eyebrow absolute left-3 top-3 bg-ivory-bright/90 px-2.5 py-1.5 text-[0.5rem] text-charcoal backdrop-blur-sm">
                    Ed. {piece.edition.of}
                  </span>
                </div>
              </Link>

              <div className="mt-3">
                <div className="flex items-baseline justify-between gap-2">
                  <Link
                    href={`/piece/${piece.slug}`}
                    className="display truncate text-lg text-charcoal transition-colors duration-500 hover:text-brass md:text-xl"
                  >
                    {piece.name}
                  </Link>
                  <span className="display shrink-0 text-lg text-brass md:text-xl">
                    {formatINR(piece.price)}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <span className="eyebrow flex items-center gap-2 text-[0.52rem] text-stone-dark">
                    <IconClock size={11} className="text-brass" /> {piece.hours} hrs
                    <IconHash size={11} className="ml-1 text-brass" />
                    {Math.max(piece.edition.of - piece.edition.number, 0)} left
                  </span>
                  <Link
                    href={`/piece/${piece.slug}#acquire`}
                    className="eyebrow border border-brass/50 px-3.5 py-2 text-[0.52rem] text-brass transition-all duration-500 hover:border-charcoal hover:bg-charcoal hover:text-gold"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
