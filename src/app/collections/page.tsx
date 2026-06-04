import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { COLLECTIONS } from "@/data/site";
import { getByCollection } from "@/data/pieces";

export const metadata: Metadata = {
  title: "The Archive — Curated Design Collections",
  description:
    "The complete SROJA archive: collectible handcrafted textile art in numbered editions — cushions, bed linens, quilts, dohars and curtains designed by Archit.",
};

/** The Archive — five curated collections, presented as wings of a gallery. */
export default function CollectionsPage() {
  return (
    <>
      {/* Hall */}
      <section className="relative bg-ivory-bright pb-20 pt-44 md:pb-28 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">The Archive</p>
            <h1 className="display mt-6 max-w-5xl text-6xl leading-[0.98] text-charcoal md:text-8xl">
              Twenty-eight works.
              <span className="block italic text-stone-dark">Five rooms. One hand.</span>
            </h1>
            <p className="lede mt-10 max-w-2xl text-lg text-stone-dark md:text-xl">
              Every piece in the archive is an original design by Archit, handcrafted
              in a numbered edition. Browse it as you would a private collection —
              slowly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Wings */}
      {COLLECTIONS.map((collection, ci) => {
        const pieces = getByCollection(collection.slug);
        const hero = pieces[0];
        return (
          <section
            key={collection.slug}
            className="border-t border-ivory-mute bg-ivory py-24 md:py-32"
          >
            <div className="mx-auto max-w-[1700px] px-6 md:px-12">
              {/* Collection masthead */}
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-6">
                  <div>
                    <p className="eyebrow text-brass">
                      Room {String(ci + 1).padStart(2, "0")} — {pieces.length} works
                    </p>
                    <h2 className="display mt-4 text-5xl text-charcoal md:text-7xl">
                      {collection.title}
                    </h2>
                    <p className="lede mt-3 text-lg text-stone-dark">{collection.subtitle}</p>
                  </div>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="link-line eyebrow text-brass"
                  >
                    Enter The Room →
                  </Link>
                </div>
              </Reveal>

              {/* Editorial spread: manifesto + asymmetric gallery */}
              <div className="mt-14 grid gap-10 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <div className="space-y-5 border-l border-brass/40 pl-6 text-base leading-[1.85] text-charcoal/75">
                    {collection.manifesto.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </Reveal>

                <div className="lg:col-span-8">
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                    {pieces.slice(0, 3).map((piece, i) => (
                      <Reveal
                        key={piece.slug}
                        delay={0.08 * i}
                        className={i === 0 ? "col-span-2 md:col-span-1 md:mt-10" : i === 2 ? "md:mt-20" : ""}
                      >
                        <Link href={`/piece/${piece.slug}`} className="group block">
                          <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-soft">
                            <Image
                              src={piece.images[0]}
                              alt={piece.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className="img-luxe object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.04]"
                            />
                          </div>
                          <p className="display mt-4 text-xl text-charcoal transition-colors duration-500 group-hover:text-brass md:text-2xl">
                            {piece.name}
                          </p>
                          <p className="eyebrow mt-1 text-stone-dark">
                            Edition {String(piece.edition.number).padStart(2, "0")} /{" "}
                            {piece.edition.of} · {piece.hours} hrs
                          </p>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                  {hero && pieces.length > 3 && (
                    <Reveal delay={0.2}>
                      <p className="eyebrow mt-8 text-stone-dark">
                        + {pieces.length - 3} further works in this room
                      </p>
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
