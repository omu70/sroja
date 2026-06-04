import Link from "next/link";
import type { Piece } from "@/data/types";
import { COLLECTIONS } from "@/data/site";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";

interface PieceShowcaseProps {
  piece: Piece;
  index: number;
}

/**
 * A full-bleed editorial showcase — one piece, hung like a work in a gallery.
 * Layouts alternate; nothing resembles a product card.
 */
export default function PieceShowcase({ piece, index }: PieceShowcaseProps) {
  const flip = index % 2 === 1;
  const collection = COLLECTIONS.find((c) => c.slug === piece.collection);

  return (
    <article className="border-t border-charcoal-line py-20 first:border-t-0 md:py-28">
      <div
        className={`mx-auto grid max-w-[1700px] items-center gap-10 px-6 md:grid-cols-12 md:gap-0 md:px-12`}
      >
        {/* Image */}
        <div className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
          <Reveal>
            <Link href={`/piece/${piece.slug}`} className="group block">
              <ParallaxImage
                src={piece.images[0]}
                alt={`${piece.name} — ${collection?.title}`}
                className="aspect-[4/5] w-full transition-opacity duration-700 group-hover:opacity-90 md:aspect-[16/11]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </Link>
          </Reveal>
        </div>

        {/* Dossier excerpt */}
        <div
          className={`md:col-span-5 ${
            flip
              ? "md:order-1 md:col-start-1 md:pr-16 lg:pr-24"
              : "md:pl-16 lg:pl-24"
          }`}
        >
          <Reveal delay={0.15}>
            <p className="eyebrow text-brass">
              {collection?.name} — {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="display mt-4 text-5xl text-ivory md:text-6xl">{piece.name}</h3>
            <p className="lede mt-6 text-lg leading-relaxed text-stone">{piece.description}</p>

            <dl className="mt-10 space-y-4 border-t border-charcoal-line pt-8">
              <div className="flex justify-between gap-6">
                <dt className="eyebrow text-stone">Edition</dt>
                <dd className="text-sm text-ivory">
                  {String(piece.edition.number).padStart(2, "0")} / {piece.edition.of}
                </dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="eyebrow text-stone">Crafted over</dt>
                <dd className="text-sm text-ivory">{piece.hours} artisan-hours</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="eyebrow text-stone">Craft</dt>
                <dd className="text-sm text-ivory">{piece.craft}</dd>
              </div>
            </dl>

            <Link
              href={`/piece/${piece.slug}`}
              className="link-line eyebrow mt-10 inline-block text-gold"
            >
              Open The Dossier →
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
