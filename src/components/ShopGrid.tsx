"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { CollectionSlug, Piece } from "@/data/types";
import { COLLECTIONS } from "@/data/site";
import { formatINR } from "@/data/pieces";
import { useCart } from "./cart/CartProvider";
import { IconBag } from "./icons";

type Filter = "all" | CollectionSlug;

function Card({ piece, index }: { piece: Piece; index: number }) {
  const { add } = useCart();
  const remaining = Math.max(piece.edition.of - piece.edition.number, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min((index % 8) * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <Link href={`/piece/${piece.slug}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-soft">
          <Image
            src={piece.images[0]}
            alt={piece.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`img-luxe object-cover transition-all duration-700 ${
              piece.images[1] ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"
            }`}
          />
          {piece.images[1] && (
            <Image
              src={piece.images[1]}
              alt={`${piece.name} — detail`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="img-luxe object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          <span className="eyebrow absolute left-2.5 top-2.5 bg-ivory-bright/90 px-2.5 py-1.5 text-[0.5rem] text-charcoal backdrop-blur-sm">
            No. {String(piece.edition.number).padStart(2, "0")}/{piece.edition.of}
          </span>
          {remaining <= 5 && remaining > 0 && (
            <span className="eyebrow absolute right-2.5 top-2.5 bg-terracotta/90 px-2.5 py-1.5 text-[0.5rem] text-ivory-bright backdrop-blur-sm">
              {remaining} left
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <Link
          href={`/piece/${piece.slug}`}
          className="display truncate text-lg text-charcoal transition-colors duration-500 hover:text-brass md:text-xl"
        >
          {piece.name}
        </Link>
        <span className="display shrink-0 text-base text-brass md:text-lg">{formatINR(piece.price)}</span>
      </div>
      <p className="eyebrow mt-1 text-[0.5rem] text-stone-dark">{piece.craft}</p>

      {/* Always-visible Add to Cart */}
      <button
        onClick={() => add(piece.slug, 1)}
        aria-label={`Add ${piece.name} to cart`}
        className="eyebrow mt-3 flex w-full items-center justify-center gap-2 border border-brass bg-charcoal py-3 text-[0.55rem] text-gold transition-all duration-500 hover:bg-charcoal-deep active:scale-[0.98]"
      >
        <IconBag size={13} /> Add to Cart
      </button>
    </motion.div>
  );
}

/** The Shop wall — clean, uniform, shoppable. */
export default function ShopGrid({ pieces }: { pieces: Piece[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () => (filter === "all" ? pieces : pieces.filter((p) => p.collection === filter)),
    [filter, pieces]
  );

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: pieces.length },
    ...COLLECTIONS.map((c) => ({
      key: c.slug as Filter,
      label: c.title.replace("The ", "").replace(" Collection", "s").replace("Linens", "Linen"),
      count: pieces.filter((p) => p.collection === c.slug).length,
    })),
  ];

  return (
    <div>
      {/* Filter pills — horizontal scroll on mobile */}
      <div className="-mx-6 flex gap-2.5 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`eyebrow shrink-0 whitespace-nowrap border px-5 py-3 transition-all duration-500 ${
              filter === t.key
                ? "border-charcoal bg-charcoal text-gold"
                : "border-ivory-mute bg-ivory-bright text-stone-dark hover:border-brass hover:text-brass"
            }`}
          >
            {t.label} <span className="opacity-60">({t.count})</span>
          </button>
        ))}
      </div>

      {/* The grid — uniform, 2 cols on mobile */}
      <div
        key={filter}
        className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4"
      >
        {shown.map((piece, i) => (
          <Card key={piece.slug} piece={piece} index={i} />
        ))}
      </div>
    </div>
  );
}
