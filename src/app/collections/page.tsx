import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { COLLECTIONS } from "@/data/site";
import { getByCollection, PIECES } from "@/data/pieces";
import { IconArrow, IconClock, IconHash, IconLayers, IconLotus } from "@/components/icons";
import CountUp from "@/components/CountUp";

export const metadata: Metadata = {
  title: "The Archive — Curated Design Collections",
  description:
    "The complete SROJA archive: collectible handcrafted textile art in numbered editions — cushions, bed linens, quilts, dohars and curtains designed by Archit.",
};

/** The Archive — five wings of a gallery. Images first; words as labels. */
export default function CollectionsPage() {
  const totalHours = PIECES.reduce((a, p) => a + p.hours, 0);

  return (
    <>
      {/* Hall */}
      <section className="relative bg-ivory-bright pb-16 pt-44 md:pb-20 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">The Archive</p>
            <h1 className="display mt-6 max-w-5xl text-6xl leading-[0.98] text-charcoal md:text-8xl">
              Twenty-eight works.
              <span className="block italic text-stone-dark">Five rooms. One hand.</span>
            </h1>
          </Reveal>

          {/* The archive's arithmetic */}
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
              {[
                { Icon: IconLayers, value: <CountUp to={28} />, label: "numbered works" },
                { Icon: IconClock, value: <CountUp to={totalHours} />, label: "artisan-hours" },
                { Icon: IconLotus, value: <>3</>, label: "living crafts" },
                { Icon: IconHash, value: <>≤50</>, label: "per edition" },
              ].map(({ Icon, value, label }) => (
                <span key={label} className="flex items-center gap-3">
                  <Icon size={19} className="text-brass" />
                  <span className="display text-3xl text-charcoal md:text-4xl">{value}</span>
                  <span className="eyebrow text-stone-dark">{label}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wings */}
      {COLLECTIONS.map((collection, ci) => {
        const pieces = getByCollection(collection.slug);
        const roomHours = pieces.reduce((a, p) => a + p.hours, 0);
        const gallery = pieces.slice(0, 4);
        return (
          <section
            key={collection.slug}
            className="border-t border-ivory-mute bg-ivory py-20 md:py-28"
          >
            <div className="mx-auto max-w-[1700px] px-6 md:px-12">
              {/* Masthead */}
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="eyebrow text-brass">
                      Room {String(ci + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display mt-3 text-5xl text-charcoal md:text-7xl">
                      {collection.title}
                    </h2>
                    <p className="lede mt-2 text-lg text-stone-dark">{collection.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="hidden items-center gap-2 md:flex">
                      <IconLayers size={17} className="text-brass" />
                      <span className="display text-3xl text-charcoal">{pieces.length}</span>
                      <span className="eyebrow text-stone-dark">works</span>
                    </span>
                    <span className="hidden items-center gap-2 md:flex">
                      <IconClock size={17} className="text-brass" />
                      <span className="display text-3xl text-charcoal">{roomHours}</span>
                      <span className="eyebrow text-stone-dark">hours</span>
                    </span>
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="link-line eyebrow inline-flex items-center gap-3 text-brass"
                    >
                      Enter <IconArrow size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Image wall — staggered quartet */}
              <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
                {gallery.map((piece, i) => (
                  <Reveal
                    key={piece.slug}
                    delay={0.07 * i}
                    className={i % 2 === 1 ? "md:mt-14" : ""}
                  >
                    <Link href={`/piece/${piece.slug}`} className="group block">
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-soft">
                        <Image
                          src={piece.images[0]}
                          alt={piece.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="img-luxe object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.05]"
                        />
                        <span className="eyebrow absolute bottom-3 left-3 bg-ivory-bright/90 px-3 py-2 text-[0.52rem] text-charcoal opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                          {piece.hours} hrs · Ed. {piece.edition.of}
                        </span>
                      </div>
                      <p className="display mt-3 text-xl text-charcoal transition-colors duration-500 group-hover:text-brass">
                        {piece.name}
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {pieces.length > 4 && (
                <Reveal delay={0.2}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="link-line eyebrow mt-8 inline-flex items-center gap-3 text-stone-dark hover:text-brass"
                  >
                    + {pieces.length - 4} further works <IconArrow size={13} />
                  </Link>
                </Reveal>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
