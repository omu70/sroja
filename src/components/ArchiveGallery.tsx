"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Piece } from "@/data/types";
import { COLLECTIONS } from "@/data/site";
import { getByCollection, formatINR } from "@/data/pieces";
import { useCart } from "./cart/CartProvider";
import { IconArrow, IconBag } from "./icons";

/**
 * The Archive — pieces presented as a curated gallery, grouped into chapters
 * (one per collection) with a manifesto line and an asymmetric, staggered
 * layout. Deliberately unlike a uniform e-commerce grid.
 */
export default function ArchiveGallery() {
  return (
    <div>
      {/* Chapter anchors */}
      <nav className="-mx-6 mb-2 flex gap-x-7 gap-y-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {COLLECTIONS.map((c, i) => (
          <a
            key={c.slug}
            href={`#${c.slug}`}
            className="eyebrow shrink-0 whitespace-nowrap text-stone-dark transition-colors duration-300 hover:text-brass"
          >
            <span className="text-brass">0{i + 1}</span> &nbsp;{c.name}
          </a>
        ))}
      </nav>

      {COLLECTIONS.map((collection, ci) => {
        const pieces = getByCollection(collection.slug);
        if (pieces.length === 0) return null;
        return (
          <section key={collection.slug} id={collection.slug} className="scroll-mt-28 border-t border-ivory-mute pt-14 md:pt-20">
            {/* Chapter header — editorial */}
            <div className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="eyebrow text-brass">
                  Chapter 0{ci + 1} · {collection.name} · {pieces.length} works
                </p>
                <h2 className="display mt-3 text-5xl leading-[0.98] text-charcoal md:text-7xl">
                  {collection.title.replace("The ", "")}
                </h2>
              </div>
              <p className="lede text-lg leading-snug text-stone-dark md:col-span-5 md:text-xl">
                {collection.manifesto[0]}
              </p>
            </div>

            {/* Pieces — staggered editorial wall */}
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-12 md:gap-x-8">
              {pieces.map((piece, i) => (
                <ArchiveCard key={piece.slug} piece={piece} index={i} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* Editorial spans + vertical offsets create the gallery rhythm. */
function layout(i: number): string {
  const cycle = i % 6;
  switch (cycle) {
    case 0:
      return "md:col-span-7";
    case 1:
      return "md:col-span-5 md:mt-20";
    case 2:
      return "md:col-span-4";
    case 3:
      return "md:col-span-4 md:mt-16";
    case 4:
      return "md:col-span-4";
    default:
      return "md:col-span-5 md:col-start-5 md:mt-8";
  }
}

function aspect(i: number): string {
  const cycle = i % 6;
  if (cycle === 0) return "aspect-[16/12]";
  if (cycle === 2 || cycle === 4) return "aspect-[3/4]";
  return "aspect-[4/5]";
}

function ArchiveCard({ piece, index }: { piece: Piece; index: number }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const remaining = Math.max(piece.edition.of - piece.edition.number, 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col ${layout(index)}`}
    >
      <Link href={`/piece/${piece.slug}`} className="relative block overflow-hidden bg-ivory-soft">
        <div className={`relative w-full ${aspect(index)}`}>
          <Image
            src={piece.images[0]}
            alt={piece.name}
            fill
            sizes="(max-width: 768px) 50vw, 40vw"
            className={`img-luxe object-cover transition-all duration-[1.2s] ease-editorial ${
              piece.images[1] ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"
            }`}
          />
          {piece.images[1] && (
            <Image
              src={piece.images[1]}
              alt={`${piece.name} — detail`}
              fill
              sizes="(max-width: 768px) 50vw, 40vw"
              className="img-luxe object-cover opacity-0 transition-opacity duration-[1.2s] group-hover:opacity-100"
            />
          )}
        </div>

        {/* Gallery label — top-left, like a museum tag */}
        <span className="eyebrow absolute left-0 top-4 bg-paper/95 py-1.5 pl-4 pr-3 text-[0.5rem] tracking-[0.25em] text-charcoal backdrop-blur-sm">
          No. {String(piece.edition.number).padStart(2, "0")} / {piece.edition.of}
        </span>
        {remaining <= 5 && remaining > 0 && (
          <span className="eyebrow absolute right-4 top-4 text-[0.5rem] text-ivory-bright">
            <span className="bg-terracotta/90 px-2 py-1 backdrop-blur-sm">{remaining} left</span>
          </span>
        )}
      </Link>

      {/* Caption — editorial, not a product box */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={`/piece/${piece.slug}`}
            className="display block truncate text-2xl text-charcoal transition-colors duration-500 hover:text-brass md:text-3xl"
          >
            {piece.name}
          </Link>
          <p className="eyebrow mt-1.5 text-stone-dark">{piece.craft}</p>
        </div>
        <p className="display shrink-0 text-xl text-brass md:text-2xl">{formatINR(piece.price)}</p>
      </div>

      {/* Quiet acquire row — a refined link + add, not a slab button */}
      <div className="mt-4 flex items-center gap-5">
        <Link
          href={`/piece/${piece.slug}`}
          className="link-line eyebrow inline-flex items-center gap-2 text-charcoal/70 hover:text-charcoal"
        >
          View Piece <IconArrow size={13} />
        </Link>
        <span className="h-3 w-px bg-ivory-mute" />
        <button
          onClick={() => {
            add(piece.slug, 1);
            setAdded(true);
            setTimeout(() => setAdded(false), 1400);
          }}
          aria-label={`Add ${piece.name} to cart`}
          className="link-line eyebrow inline-flex items-center gap-2 text-brass hover:text-charcoal"
        >
          <IconBag size={13} /> {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </motion.article>
  );
}
