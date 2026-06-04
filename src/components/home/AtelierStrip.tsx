import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { img, CRAFTS } from "@/data/site";
import { IconArrow, IconHand, IconLoom, IconPencil } from "@/components/icons";

const STRIP = [
  { src: img("1778575721257_htsug72o4vf.webp"), caption: "The block table" },
  { src: img("1778737972859_ldqlv7aqiem.webp"), caption: "Bhujodi loom" },
  { src: img("1778737274664_pn4aiafoyzm.webp"), caption: "Quilting frame" },
];

const CRAFT_ICONS = [IconPencil, IconLoom, IconHand] as const;

/** The Atelier — a glimpse of the hands. Images first, captions only. */
export default function AtelierStrip() {
  return (
    <section className="relative border-t border-ivory-mute bg-ivory-bright py-24 md:py-36">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-brass">The Atelier</p>
              <h2 className="display mt-4 max-w-2xl text-5xl text-charcoal md:text-7xl">
                The hands behind
                <span className="italic text-stone-dark"> every piece.</span>
              </h2>
            </div>
            <Link
              href="/atelier"
              className="link-line eyebrow inline-flex items-center gap-3 text-brass"
            >
              Enter The Atelier <IconArrow size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Asymmetric strip */}
        <div className="mt-14 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <ParallaxImage
              src={STRIP[0].src}
              alt={STRIP[0].caption}
              className="aspect-[3/4] w-full"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <p className="eyebrow mt-3 text-stone-dark">{STRIP[0].caption}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:mt-20">
            <ParallaxImage
              src={STRIP[1].src}
              alt={STRIP[1].caption}
              className="aspect-square w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <p className="eyebrow mt-3 text-stone-dark">{STRIP[1].caption}</p>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-3 md:mt-40">
            <ParallaxImage
              src={STRIP[2].src}
              alt={STRIP[2].caption}
              className="aspect-[3/4] w-full"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <p className="eyebrow mt-3 text-stone-dark">{STRIP[2].caption}</p>
          </Reveal>
        </div>

        {/* Craft index — icon cards */}
        <div className="mt-16 grid gap-px overflow-hidden border border-ivory-mute bg-ivory-mute md:grid-cols-3">
          {CRAFTS.map((c, i) => {
            const Icon = CRAFT_ICONS[i];
            return (
              <Link
                key={c.key}
                href="/atelier"
                className="group bg-ivory-bright p-8 transition-colors duration-700 hover:bg-ivory md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="icon-chip">
                    <Icon size={21} />
                  </span>
                  <span className="eyebrow text-stone-dark">{c.age}</span>
                </div>
                <p className="display mt-6 text-2xl text-charcoal md:text-3xl">{c.name}</p>
                <p className="eyebrow mt-2 text-brass">{c.region}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
