import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { img, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Maison — The Vision of Archit",
  description:
    "SROJA is a luxury design house founded by fashion designer Archit — original drawings, master artisans, numbered editions. The story of the maison.",
};

const PRINCIPLES = [
  {
    title: "The drawing is law",
    text: "Nothing enters the archive that did not begin as an original drawing by Archit. No licensed patterns, no trend boards, no borrowed motifs. The sketchbook is the constitution of the house.",
  },
  {
    title: "Hands over machines",
    text: "If a machine can make it identically twice, it does not belong here. Every technique in the maison — block, loom, needle — leaves human evidence in the cloth.",
  },
  {
    title: "Editions, not inventory",
    text: "Works are released in deliberately small, numbered editions. When an edition closes, the blocks rest. Scarcity is not a strategy; it is a consequence of honesty about time.",
  },
  {
    title: "Generations as the unit of time",
    text: "A SROJA piece is judged by a single question: will it be argued over in a will? Design for the decade is decoration. Design for the century is the brief.",
  },
] as const;

export default function MaisonPage() {
  return (
    <>
      {/* Portrait hall */}
      <section className="relative bg-ivory-bright pb-24 pt-44 md:pb-32 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">The Maison</p>
            <h1 className="display mt-6 max-w-5xl text-6xl leading-[0.98] text-charcoal md:text-[7rem]">
              A fashion designer&apos;s eye,
              <span className="block italic text-stone-dark">loaned to the home.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* The founder */}
      <section className="border-t border-ivory-mute bg-ivory py-24 md:py-36">
        <div className="mx-auto grid max-w-[1700px] gap-14 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-5">
            <Reveal>
              <ParallaxImage
                src={img("1778767833856_4t842ktzits.png")}
                alt="The maison's work in study — the Neel Rekha weave"
                className="aspect-[3/4] w-full"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <p className="eyebrow mt-4 text-stone-dark">
                Portrait of the work — the founder prefers the pieces photographed in his place
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="eyebrow text-brass">Founder & Creative Director</p>
              <h2 className="display mt-4 text-5xl text-charcoal md:text-7xl">{SITE.founder}</h2>
              <div className="mt-10 space-y-7 text-base leading-[1.95] text-charcoal/80 md:text-lg">
                <p>
                  Archit trained as a fashion designer — a discipline where a
                  collection lives or dies by the originality of its drawing and the
                  fidelity of its making. SROJA began when he turned that discipline
                  away from the runway and toward the rooms we actually live in.
                </p>
                <p>
                  What he found was an industry of copies: motifs licensed by the
                  thousand, “handmade” as a label rather than a fact. The maison was
                  founded as the refusal of that — a house where every motif is drawn
                  by one hand, executed by master artisans, and released in editions
                  small enough that each owner holds something the world cannot
                  reorder.
                </p>
                <p>
                  His obsession is detail at the threshold of visibility: the drift
                  of an impression, the rise of an extra weft, the half-tone where
                  indigo exhausts itself. The work is designed to reward the second
                  decade of looking, not the second glance.
                </p>
                <p className="lede text-xl text-charcoal md:text-2xl">
                  “Luxury is not the price. Luxury is the refusal to hurry.”
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-ivory-mute bg-ivory-bright py-24 md:py-36">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">The Principles</p>
            <h2 className="display mt-4 text-5xl text-charcoal md:text-7xl">
              Four laws of the house.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden border border-ivory-mute bg-ivory-mute md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i} className="h-full">
                <div className="h-full bg-ivory-bright p-10 md:p-14">
                  <p className="display text-5xl text-brass/50">0{i + 1}</p>
                  <p className="display mt-6 text-3xl text-charcoal md:text-4xl">{p.title}</p>
                  <p className="mt-5 text-sm leading-[1.9] text-stone-dark md:text-base">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Onward */}
      <section className="border-t border-ivory-mute bg-ivory py-24 text-center md:py-32">
        <Reveal>
          <p className="lede mx-auto max-w-2xl px-6 text-xl text-stone-dark md:text-2xl">
            The vision is only half the house. The other half has calluses.
          </p>
          <Link
            href="/atelier"
            className="eyebrow group mt-10 inline-flex items-center gap-4 border border-brass/60 px-10 py-5 text-brass transition-all duration-700 hover:border-charcoal hover:bg-charcoal hover:text-gold"
          >
            Meet The Atelier
            <span aria-hidden className="transition-transform duration-700 group-hover:translate-x-2">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
