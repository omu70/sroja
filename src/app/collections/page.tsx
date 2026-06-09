import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ArchiveGallery from "@/components/ArchiveGallery";
import TrustStrip from "@/components/TrustStrip";
import { PIECES } from "@/data/pieces";
import { COLLECTIONS } from "@/data/site";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "The Archive — Limited Edition Handcrafted Pieces",
  description:
    "The SROJA archive — 28 limited-edition handcrafted pieces in five collections. Cushions, bed linens, quilts, dohars and curtains, each numbered and certified.",
};

export default function CollectionsPage() {
  return (
    <section className="bg-ivory-bright pb-24 pt-32 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        {/* Editorial masthead — reads like an archive, not a shop header */}
        <Reveal>
          <p className="eyebrow text-brass">The Archive</p>
          <h1 className="display mt-5 max-w-5xl text-6xl leading-[0.95] text-charcoal md:text-[8rem]">
            A catalogue of
            <span className="block italic text-stone-dark">{PIECES.length} originals.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-6 border-t border-ivory-mute pt-8 md:grid-cols-12 md:items-center">
            <p className="lede text-lg leading-snug text-charcoal/80 md:col-span-7 md:text-2xl">
              Five collections, each an original design — block-printed in Rajasthan,
              handwoven in Kutch and Tamil Nadu — numbered, certified, made to be kept.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-5 md:justify-end">
              {COLLECTIONS.map((c, i) => (
                <a key={c.slug} href={`#${c.slug}`} className="link-line eyebrow inline-flex items-center gap-2 text-brass">
                  <span className="text-stone-dark">0{i + 1}</span> {c.name} <IconArrow size={11} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <TrustStrip className="mt-10" />
        </Reveal>

        {/* The gallery */}
        <div className="mt-16 md:mt-24">
          <ArchiveGallery />
        </div>
      </div>
    </section>
  );
}
