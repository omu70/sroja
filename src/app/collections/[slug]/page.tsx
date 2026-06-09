// ------------------------------------------------------------------------
// Single Collection Page (/collections/<name>)
//
// Shows the products of one collection (e.g. quilts) with its intro text.
// ------------------------------------------------------------------------

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PieceShowcase from "@/components/PieceShowcase";
import ValueLedger from "@/components/ValueLedger";
import { COLLECTIONS } from "@/data/site";
import { getByCollection } from "@/data/pieces";
import type { CollectionSlug } from "@/data/types";
import { IconClock, IconHand, IconHash, IconLayers } from "@/components/icons";

interface Params {
  slug: CollectionSlug;
}

export function generateStaticParams(): Params[] {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return {};
  return {
    title: `${collection.title} — ${collection.subtitle}`,
    description: collection.manifesto[0],
  };
}

/** A single room of the archive — one line of manifesto, then the works. */
export default async function CollectionRoom({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const pieces = getByCollection(collection.slug);
  const roomHours = pieces.reduce((a, p) => a + p.hours, 0);
  const maxEdition = Math.max(...pieces.map((p) => p.edition.of));
  const crafts = [...new Set(pieces.map((p) => p.craft))];
  const manifestoLine = collection.manifesto[0].split(". ")[0] + ".";

  return (
    <>
      {/* Manifesto wall — one line, then numbers */}
      <section className="relative bg-ivory-bright pb-16 pt-44 md:pb-24 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">The Shop · {collection.name}</p>
            <h1 className="display mt-6 text-6xl leading-[0.98] text-charcoal md:text-[7rem]">
              {collection.title}
              <span className="block text-3xl italic text-stone-dark md:text-4xl">
                {collection.subtitle}
              </span>
            </h1>
            <p className="lede mt-8 max-w-2xl border-l border-brass/40 pl-6 text-xl leading-snug text-charcoal/85 md:text-2xl">
              {manifestoLine}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ValueLedger
              className="mt-14"
              items={[
                { icon: IconLayers, value: pieces.length, label: "numbered works" },
                { icon: IconClock, value: roomHours, label: "artisan-hours" },
                { icon: IconHash, value: `≤${maxEdition}`, label: "per edition" },
                {
                  icon: IconHand,
                  value: crafts.length,
                  label: crafts.length === 1 ? "craft tradition" : "craft traditions",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* The works */}
      <section className="bg-ivory">
        {pieces.map((piece, i) => (
          <PieceShowcase key={piece.slug} piece={piece} index={i} />
        ))}
      </section>

      {/* Onward */}
      <section className="border-t border-ivory-mute bg-ivory-bright py-20 text-center">
        <Reveal>
          <p className="eyebrow text-stone-dark">More collections</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
            {COLLECTIONS.filter((c) => c.slug !== collection.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="display link-line text-2xl text-charcoal/80 hover:text-brass md:text-3xl"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
