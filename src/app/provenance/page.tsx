import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IPR_STATEMENT, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Authenticity & Intellectual Property",
  description:
    "Every SROJA design is an original work by SROJA, protected under Intellectual Property Rights, released in numbered editions with a certificate of authenticity.",
};

const PILLARS = [
  {
    title: "Original by birth",
    text: "Every motif begins as a dated drawing in our studio records.",
  },
  {
    title: "Protected by law",
    text: "IPR-protected — no one else may lawfully make what you collect.",
  },
  {
    title: "Numbered by hand",
    text: "07 of 50 is not marketing. It is the count that will ever exist.",
  },
  {
    title: "Certified for generations",
    text: "Edition number, hours, region and date — recorded on your certificate.",
  },
] as const;

export default function ProvenancePage() {
  return (
    <>
      <section className="relative bg-ivory-bright pb-24 pt-44 md:pb-32 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">Authenticity & Protection</p>
            <h1 className="display mt-6 max-w-5xl text-6xl leading-[0.98] text-charcoal md:text-[7rem]">
              {IPR_STATEMENT.headline}
            </h1>
            <div className="mt-10 max-w-2xl space-y-6">
              {IPR_STATEMENT.lines.map((l) => (
                <p key={l} className="text-base leading-[1.9] text-charcoal/80 md:text-lg">
                  {l}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ivory-mute bg-ivory py-24 md:py-36">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <div className="grid gap-px overflow-hidden border border-ivory-mute bg-ivory-mute md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i} className="h-full">
                <div className="h-full bg-ivory p-10 md:p-14">
                  <p className="display text-5xl text-brass/50">0{i + 1}</p>
                  <p className="display mt-6 text-3xl text-charcoal md:text-4xl">{p.title}</p>
                  <p className="mt-5 text-sm leading-[1.9] text-stone-dark md:text-base">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Specimen certificate */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto mt-20 max-w-3xl border border-brass/40 bg-ivory-bright p-10 text-center md:p-16">
              <div className="absolute inset-2 border border-brass/20" />
              <p className="eyebrow text-brass">Specimen — Certificate of Authenticity</p>
              <p className="display mt-8 text-2xl tracking-[0.42em] text-charcoal">SROJA</p>
              <p className="display mt-8 text-2xl leading-relaxed text-charcoal md:text-3xl">
                This certifies that the accompanying work is an original SROJA design, handcrafted by master artisans for {SITE.legalName}.
              </p>
              <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-y-3 text-left text-sm">
                <span className="eyebrow text-stone-dark">Work</span>
                <span className="text-charcoal">———</span>
                <span className="eyebrow text-stone-dark">Edition</span>
                <span className="text-charcoal">No. —— of ——</span>
                <span className="eyebrow text-stone-dark">Artisan-hours</span>
                <span className="text-charcoal">———</span>
                <span className="eyebrow text-stone-dark">Completed</span>
                <span className="text-charcoal">———</span>
              </div>
              <p className="display mt-12 text-xl tracking-[0.42em] text-brass">SROJA</p>
              <p className="eyebrow mt-1 text-stone-dark">Gurugram, India</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-16 max-w-2xl text-center text-sm leading-relaxed text-stone-dark">
              For authentication queries, edition verification, or authorised
              collaboration requests, write to{" "}
              <a href={`mailto:${SITE.email}`} className="link-line text-brass">
                {SITE.email}
              </a>
              . We reply to every message personally.
            </p>
            <div className="mt-10 text-center">
              <Link
                href="/consultation"
                className="eyebrow group inline-flex items-center gap-4 border border-brass/60 px-10 py-5 text-brass transition-all duration-700 hover:border-charcoal hover:bg-charcoal hover:text-gold"
              >
                Contact Us
                <span aria-hidden className="transition-transform duration-700 group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
