import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import CountUp from "@/components/CountUp";
import { CRAFTS, img } from "@/data/site";
import { PIECES } from "@/data/pieces";

export const metadata: Metadata = {
  title: "The Atelier — Master Artisans & Living Craft",
  description:
    "Inside the SROJA atelier: hand block printing in Rajasthan, 500-year-old Bhujodi weaving in Kutch, Chettinad looms in Tamil Nadu. The hands behind the house.",
};

const CRAFT_IMAGES: Record<string, { src: string; caption: string }[]> = {
  block: [
    { src: img("1778575721257_htsug72o4vf.webp"), caption: "Impression studies — Gul Meher" },
    { src: img("1778664354807_msia342n03.webp"), caption: "The printed field — Neel Gul Bagh" },
  ],
  bhujodi: [
    { src: img("1778737972859_ldqlv7aqiem.webp"), caption: "Extra-weft rising — Kendra" },
    { src: img("1778764935406_iwtxps5smha.png"), caption: "Kala cotton in macro — Reva" },
  ],
  chettinad: [
    { src: img("1778737621268_wl49d1fh08h.webp"), caption: "Yarn-dyed grid — Baagh Check" },
    { src: img("1780559338807_6rpgr3jc9tb.png"), caption: "The solid field — Charcoal Line" },
  ],
};

export default function AtelierPage() {
  const totalHours = PIECES.reduce((a, p) => a + p.hours, 0);

  return (
    <>
      <section className="relative bg-ivory-bright pb-24 pt-44 md:pb-32 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">The Atelier</p>
            <h1 className="display mt-6 max-w-5xl text-6xl leading-[0.98] text-charcoal md:text-[7rem]">
              Three regions.
              <span className="block italic text-stone-dark">Dozens of hands. One standard.</span>
            </h1>
            <p className="lede mt-10 max-w-2xl text-lg text-stone-dark md:text-xl">
              No factories — only workshops where the knowledge predates the brand
              by centuries.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-ivory-mute bg-ivory-mute md:grid-cols-4">
              {[
                { stat: <CountUp to={totalHours} />, label: "artisan-hours in the current archive" },
                { stat: <>3</>, label: "living craft traditions" },
                { stat: <>500</>, label: "years — the oldest technique we keep" },
                { stat: <>0</>, label: "machines that could replace them" },
              ].map((s, i) => (
                <div key={i} className="bg-ivory-bright p-8 md:p-10">
                  <p className="display text-5xl text-brass md:text-6xl">{s.stat}</p>
                  <p className="eyebrow mt-3 text-stone-dark">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Craft chapters */}
      {CRAFTS.map((craft, ci) => {
        const imgs = CRAFT_IMAGES[craft.key] ?? [];
        const flip = ci % 2 === 1;
        return (
          <section
            key={craft.key}
            className="border-t border-ivory-mute bg-ivory py-24 md:py-36"
          >
            <div className="mx-auto grid max-w-[1700px] items-center gap-14 px-6 md:grid-cols-12 md:px-12">
              <div className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
                <div className="grid grid-cols-2 gap-6">
                  {imgs.map((im, i) => (
                    <Reveal key={im.src} delay={0.08 * i} className={i === 1 ? "mt-12" : ""}>
                      <ParallaxImage
                        src={im.src}
                        alt={im.caption}
                        className="aspect-[3/4] w-full"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <p className="eyebrow mt-3 text-stone-dark">{im.caption}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <Reveal>
                  <p className="eyebrow text-brass">
                    Chapter {String(ci + 1).padStart(2, "0")} · {craft.region} · {craft.age}
                  </p>
                  <h2 className="display mt-4 text-5xl text-charcoal md:text-6xl">{craft.name}</h2>
                  <p className="lede mt-6 text-xl text-stone-dark">{craft.line}</p>
                  <p className="mt-8 text-base leading-[1.95] text-charcoal/80">{craft.detail}</p>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* Emotional close */}
      <section className="border-t border-ivory-mute bg-ivory-bright py-28 text-center md:py-40">
        <Reveal>
          <p className="display mx-auto max-w-4xl px-6 text-4xl leading-[1.2] text-charcoal md:text-6xl">
            When you acquire a SROJA piece, you are not paying for cloth.
            <span className="italic text-brass"> You are underwriting a craft&apos;s next generation.</span>
          </p>
          <Link
            href="/collections"
            className="eyebrow group mt-14 inline-flex items-center gap-4 border border-brass/60 px-10 py-5 text-brass transition-all duration-700 hover:border-charcoal hover:bg-charcoal hover:text-gold"
          >
            View The Works
            <span aria-hidden className="transition-transform duration-700 group-hover:translate-x-2">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
