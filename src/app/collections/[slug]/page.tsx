import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PieceShowcase from "@/components/PieceShowcase";
import { COLLECTIONS } from "@/data/site";
import { getByCollection } from "@/data/pieces";
import type { CollectionSlug } from "@/data/types";

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

/** A single room of the archive — manifesto first, then the works. */
export default async function CollectionRoom({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const pieces = getByCollection(collection.slug);

  return (
    <>
      {/* Manifesto wall */}
      <section className="relative bg-ivory-bright pb-24 pt-44 md:pb-32 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">
              The Archive — {pieces.length} numbered works
            </p>
            <h1 className="display mt-6 text-6xl leading-[0.98] text-charcoal md:text-[7rem]">
              {collection.name}
              <span className="block text-4xl italic text-stone-dark md:text-5xl">
                {collection.subtitle}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 max-w-3xl space-y-6 border-l border-brass/40 pl-8">
              {collection.manifesto.map((p) => (
                <p key={p} className="lede text-xl leading-[1.7] text-charcoal/85 md:text-2xl">
                  {p}
                </p>
              ))}
              <p className="eyebrow pt-2 text-stone-dark">— {collection.title}, a note from the house</p>
            </div>
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
          <p className="eyebrow text-stone-dark">Continue through the archive</p>
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
