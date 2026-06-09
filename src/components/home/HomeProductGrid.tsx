"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Piece } from "@/data/types";
import { formatINR } from "@/data/pieces";
import { useCart } from "@/components/cart/CartProvider";
import { IconBag } from "@/components/icons";

/** A compact, shoppable product grid — two columns on mobile, four on desktop. */
export default function HomeProductGrid({ pieces }: { pieces: Piece[] }) {
  const { add } = useCart();

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
      {pieces.map((piece, i) => {
        const remaining = Math.max(piece.edition.of - piece.edition.number, 0);
        return (
          <motion.div
            key={piece.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
            className="group"
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
                {remaining <= 5 && remaining > 0 && (
                  <span className="eyebrow absolute right-2.5 top-2.5 bg-charcoal/85 px-2.5 py-1.5 text-[0.5rem] text-gold backdrop-blur-sm">
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
              <span className="display shrink-0 text-base text-brass md:text-lg">
                {formatINR(piece.price)}
              </span>
            </div>

            <button
              onClick={() => add(piece.slug, 1)}
              aria-label={`Add ${piece.name} to cart`}
              className="eyebrow mt-3 flex w-full items-center justify-center gap-2 border border-brass bg-charcoal py-3 text-[0.55rem] text-gold transition-all duration-500 hover:bg-charcoal-deep active:scale-[0.98]"
            >
              <IconBag size={13} /> Add to Cart
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
