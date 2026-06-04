import Link from "next/link";
import type { Piece } from "@/data/types";
import { COLLECTIONS } from "@/data/site";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import { IconArrow, IconClock, IconHand, IconHash } from "./icons";

interface PieceShowcaseProps {
  piece: Piece;
  index: number;
}

/**
 * A full-bleed editorial showcase — one piece, hung like a work in a gallery.
 * Image leads; words are captions, not paragraphs.
 */
export default function PieceShowcase({ piece, index }: PieceShowcaseProps) {
  const flip = index % 2 === 1;
  const collection = COLLECTIONS.find((c) => c.slug === piece.collection);

  const stats = [
    { Icon: IconHash, label: `Edition ${String(piece.edition.number).padStart(2, "0")} / ${piece.edition.of}` },
    { Icon: IconClock, label: `${piece.hours} hours` },
    { Icon: IconHand, label: piece.craft.replace(" Handweaving", "").replace("Hand ", "") },
  ];

  return (
    <article className="border-t border-ivory-mute py-16 first:border-t-0 md:py-24">
      <div className="mx-auto grid max-w-[1700px] items-center gap-10 px-6 md:grid-cols-12 md:gap-0 md:px-12">
        {/* Image */}
        <div className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
          <Reveal>
            <Link href={`/piece/${piece.slug}`} className="group relative block overflow-hidden">
              <ParallaxImage
                src={piece.images[0]}
                alt={`${piece.name} — ${collection?.title}`}
                className="aspect-[4/5] w-full transition-opacity duration-700 group-hover:opacity-95 md:aspect-[16/11]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <span className="eyebrow absolute bottom-5 right-5 flex items-center gap-2 bg-ivory-bright/90 px-4 py-3 text-charcoal opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                Open Dossier <IconArrow size={13} />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Caption */}
        <div
          className={`md:col-span-5 ${
            flip ? "md:order-1 md:col-start-1 md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"
          }`}
        >
          <Reveal delay={0.15}>
            <p className="eyebrow text-brass">
              {collection?.name} — {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="display mt-4 text-5xl text-charcoal md:text-6xl">
              <Link href={`/piece/${piece.slug}`} className="transition-colors duration-500 hover:text-brass">
                {piece.name}
              </Link>
            </h3>
            <p className="lede mt-5 text-lg leading-relaxed text-stone-dark">
              {piece.description}
            </p>

            {/* Icon stats */}
            <div className="mt-9 flex flex-wrap gap-3">
              {stats.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2.5 border border-ivory-mute bg-ivory-bright px-4 py-2.5 text-xs text-charcoal/80"
                >
                  <Icon size={15} className="text-brass" />
                  {label}
                </span>
              ))}
            </div>

            <Link
              href={`/piece/${piece.slug}`}
              className="link-line eyebrow mt-9 inline-flex items-center gap-3 text-brass"
            >
              The Full Story <IconArrow size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
