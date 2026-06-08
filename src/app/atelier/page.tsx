import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ZoomImage from "@/components/ZoomImage";
import CountUp from "@/components/CountUp";
import OriginsMap from "@/components/OriginsMap";
import { CRAFTS, img } from "@/data/site";
import { PIECES } from "@/data/pieces";
import { MATERIAL_SCHOOL, HAND_VS_MACHINE, GLOSSARY } from "@/data/materials-edu";
import {
  IconArrow,
  IconEye,
  IconHand,
  IconLeaf,
  IconLotus,
  IconSparkle,
  IconThread,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "The Craft — Know Your Materials",
  description:
    "What kala cotton is, why yarn-dyed colour never fades, how to spot a real hand block print. The materials behind every SROJA piece, explained simply.",
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

/* Brand-manual accents per chapter plate */
const ACCENT: Record<string, { bar: string; num: string; chip: string }> = {
  softgold: { bar: "bg-softgold", num: "text-softgold-deep", chip: "bg-softgold/30" },
  terracotta: { bar: "bg-terracotta", num: "text-terracotta", chip: "bg-terracotta/15" },
  rosewood: { bar: "bg-rosewood", num: "text-rosewood", chip: "bg-rosewood/20" },
  blush: { bar: "bg-blush", num: "text-rosewood", chip: "bg-blush/60" },
  pine: { bar: "bg-pine", num: "text-pine", chip: "bg-pine/10" },
};

export default function CraftPage() {
  const totalHours = PIECES.reduce((a, p) => a + p.hours, 0);

  return (
    <>
      {/* ── Hero — soft light, per the manual ─────────────────── */}
      <section className="relative bg-paper pb-20 pt-44 md:pb-28 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-brass">
              <IconLotus size={14} className="animate-pulse-soft" /> The Craft · The Material School
            </p>
            <h1 className="font-brand mt-6 max-w-5xl text-5xl leading-[1.05] tracking-wide text-charcoal md:text-[5.5rem]">
              Know what
              <span className="block text-terracotta">you are holding.</span>
            </h1>
            <p className="lede mt-8 max-w-2xl text-lg text-stone-dark md:text-xl">
              Six materials, explained simply — what they are, why they cost more,
              and how to spot the real thing.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-ivory-mute bg-ivory-mute md:grid-cols-4">
              {[
                { stat: <CountUp to={totalHours} />, label: "artisan-hours of work" },
                { stat: <>3</>, label: "living craft traditions" },
                { stat: <>500</>, label: "years — the oldest technique" },
                { stat: <>0</>, label: "machines that could replace them" },
              ].map((s, i) => (
                <div key={i} className="bg-paper p-8 md:p-10">
                  <p className="display text-5xl text-brass md:text-6xl">{s.stat}</p>
                  <p className="eyebrow mt-3 text-stone-dark">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Origins — hover a material, India answers ─────────── */}
      <OriginsMap />

      {/* ── The Material School — six chapters ────────────────── */}
      {MATERIAL_SCHOOL.map((m, mi) => {
        const accent = ACCENT[m.accent];
        const flip = mi % 2 === 1;
        return (
          <section
            key={m.key}
            className={`border-t border-ivory-mute py-16 md:py-24 ${mi % 2 ? "bg-paper" : "bg-ivory-bright"}`}
          >
            <div className="mx-auto grid max-w-[1700px] items-center gap-12 px-6 md:px-12 lg:grid-cols-12">
              {/* The cloth, up close */}
              <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                <div className="grid grid-cols-3 gap-4">
                  <Reveal className="col-span-2">
                    <ZoomImage src={m.image} alt={`${m.name} in macro`} className="aspect-[4/5] w-full" sizes="(max-width:1024px) 66vw, 33vw" />
                  </Reveal>
                  {m.detailImage && (
                    <Reveal delay={0.1} className="mt-10">
                      <ZoomImage src={m.detailImage} alt={`${m.name} — detail`} className="aspect-[3/4] w-full" sizes="(max-width:1024px) 33vw, 16vw" />
                    </Reveal>
                  )}
                </div>
              </div>

              {/* The lesson */}
              <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className={`font-brand text-5xl ${accent.num}`}>
                      {String(mi + 1).padStart(2, "0")}
                    </span>
                    <div className={`h-px flex-1 ${accent.bar}`} />
                  </div>
                  <h2 className="font-brand mt-5 text-4xl tracking-wide text-charcoal md:text-5xl">
                    {m.name}
                  </h2>
                  <p className="eyebrow mt-2 text-brass">{m.origin}</p>

                  <dl className="mt-8 space-y-5">
                    {(
                      [
                        [IconLeaf, "What it is", m.what],
                        [IconSparkle, "Why it costs more", m.why],
                        [IconHand, "How it feels", m.feel],
                      ] as const
                    ).map(([Icon, k, v]) => (
                      <div key={k} className="flex gap-4">
                        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${accent.chip}`}>
                          <Icon size={17} className="text-charcoal/70" />
                        </span>
                        <div>
                          <dt className="eyebrow text-stone-dark">{k}</dt>
                          <dd className="mt-1 text-sm leading-relaxed text-charcoal/85 md:text-base">{v}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  {/* Spot the real thing */}
                  <div className={`mt-8 border-l-2 pl-5 ${accent.bar.replace("bg-", "border-")}`}>
                    <p className="eyebrow flex items-center gap-2 text-stone-dark">
                      <IconEye size={14} className="text-brass" /> Spot the real thing
                    </p>
                    <p className="lede mt-2 text-lg leading-snug text-charcoal md:text-xl">{m.spot}</p>
                  </div>

                  {/* Care, as chips */}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {m.care.map((c) => (
                      <span key={c} className="eyebrow border border-ivory-mute bg-paper px-3.5 py-2 text-[0.52rem] text-stone-dark">
                        {c}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Hand vs machine — the lesson in one table ─────────── */}
      <section className="border-t border-ivory-mute bg-pine py-16 md:py-24">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-softgold">The Difference</p>
            <h2 className="font-brand mt-4 text-4xl tracking-wide text-paper md:text-6xl">
              Handmade vs machine-made
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden border border-paper/15">
              <div className="grid grid-cols-3 gap-px bg-paper/15 text-paper">
                <p className="eyebrow bg-pine px-4 py-4 text-paper/60 md:px-6">&nbsp;</p>
                <p className="eyebrow flex items-center gap-2 bg-pine px-4 py-4 text-softgold md:px-6">
                  <IconHand size={14} /> By hand
                </p>
                <p className="eyebrow bg-pine px-4 py-4 text-paper/60 md:px-6">By machine</p>
                {HAND_VS_MACHINE.map((row) => (
                  <div key={row.aspect} className="contents">
                    <p className="eyebrow bg-pine px-4 py-5 text-paper/80 md:px-6">{row.aspect}</p>
                    <p className="bg-pine px-4 py-5 text-sm text-paper md:px-6">{row.hand}</p>
                    <p className="bg-pine px-4 py-5 text-sm text-paper/50 md:px-6">{row.machine}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The three crafts, in brief ─────────────────────────── */}
      {CRAFTS.map((craft, ci) => {
        const imgs = CRAFT_IMAGES[craft.key] ?? [];
        const flip = ci % 2 === 1;
        return (
          <section key={craft.key} className="border-t border-ivory-mute bg-ivory py-16 md:py-24">
            <div className="mx-auto grid max-w-[1700px] items-center gap-12 px-6 md:grid-cols-12 md:px-12">
              <div className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
                <div className="grid grid-cols-2 gap-6">
                  {imgs.map((im, i) => (
                    <Reveal key={im.src} delay={0.08 * i} className={i === 1 ? "mt-12" : ""}>
                      <ParallaxImage src={im.src} alt={im.caption} className="aspect-[3/4] w-full" sizes="(max-width: 768px) 50vw, 25vw" />
                      <p className="eyebrow mt-3 text-stone-dark">{im.caption}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <Reveal>
                  <p className="eyebrow text-brass">
                    {craft.region} · {craft.age}
                  </p>
                  <h2 className="font-brand mt-4 text-4xl tracking-wide text-charcoal md:text-5xl">{craft.name}</h2>
                  <p className="lede mt-5 text-xl text-stone-dark">{craft.line}</p>
                  <p className="mt-5 text-base leading-relaxed text-charcoal/80">{craft.detail}</p>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Glossary — words on our labels ────────────────────── */}
      <section className="border-t border-ivory-mute bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-brass">
              <IconThread size={15} /> Small Glossary
            </p>
            <h2 className="font-brand mt-4 text-4xl tracking-wide text-charcoal md:text-6xl">
              Words on our labels
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-ivory-mute bg-ivory-mute sm:grid-cols-2 lg:grid-cols-4">
            {GLOSSARY.map((g, i) => (
              <Reveal key={g.term} delay={0.04 * i} className="h-full">
                <div className="h-full bg-paper p-7 transition-colors duration-500 hover:bg-blush/40">
                  <p className="font-brand text-2xl text-charcoal">{g.term}</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-dark">{g.def}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close — into the shop ─────────────────────────────── */}
      <section className="border-t border-ivory-mute bg-ivory-bright py-20 text-center md:py-28">
        <Reveal>
          <p className="display mx-auto max-w-3xl px-6 text-4xl leading-[1.15] text-charcoal md:text-6xl">
            Now you know what your hands will know
            <span className="italic text-terracotta"> the moment it arrives.</span>
          </p>
          <Link
            href="/collections"
            className="eyebrow group mt-12 inline-flex items-center gap-4 border border-brass bg-charcoal px-12 py-6 text-gold transition-all duration-700 hover:bg-charcoal-deep"
          >
            Shop The Pieces
            <IconArrow size={16} className="transition-transform duration-700 group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
