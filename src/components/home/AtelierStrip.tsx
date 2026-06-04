import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { img, CRAFTS } from "@/data/site";

const STRIP = [
  {
    src: img("1778575721257_htsug72o4vf.webp"),
    caption: "The block table — impressions in sequence",
  },
  {
    src: img("1778737972859_ldqlv7aqiem.webp"),
    caption: "Bhujodi loom — extra-weft detail rising",
  },
  {
    src: img("1778737274664_pn4aiafoyzm.webp"),
    caption: "Quilting frame — the needle's slow geography",
  },
];

/** The Atelier — a glimpse of the hands. */
export default function AtelierStrip() {
  return (
    <section className="relative border-t border-charcoal-line bg-charcoal-deep py-28 md:py-40">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gold">The Atelier</p>
              <h2 className="display mt-4 max-w-2xl text-5xl text-ivory md:text-7xl">
                Where hours
                <span className="italic text-stone"> become heirlooms.</span>
              </h2>
            </div>
            <Link href="/atelier" className="link-line eyebrow text-gold">
              Enter The Atelier →
            </Link>
          </div>
        </Reveal>

        {/* Asymmetric strip */}
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <ParallaxImage
              src={STRIP[0].src}
              alt={STRIP[0].caption}
              className="aspect-[3/4] w-full"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <p className="eyebrow mt-3 text-stone">{STRIP[0].caption}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:mt-24">
            <ParallaxImage
              src={STRIP[1].src}
              alt={STRIP[1].caption}
              className="aspect-square w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <p className="eyebrow mt-3 text-stone">{STRIP[1].caption}</p>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-3 md:mt-48">
            <ParallaxImage
              src={STRIP[2].src}
              alt={STRIP[2].caption}
              className="aspect-[3/4] w-full"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <p className="eyebrow mt-3 text-stone">{STRIP[2].caption}</p>
          </Reveal>
        </div>

        {/* Craft index */}
        <div className="mt-20 grid gap-px overflow-hidden border border-charcoal-line bg-charcoal-line md:grid-cols-3">
          {CRAFTS.map((c) => (
            <div key={c.key} className="bg-charcoal-deep p-8 md:p-10">
              <p className="eyebrow text-brass">
                {c.region} · {c.age}
              </p>
              <p className="display mt-3 text-2xl text-ivory md:text-3xl">{c.name}</p>
              <p className="mt-4 text-sm leading-relaxed text-stone">{c.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
