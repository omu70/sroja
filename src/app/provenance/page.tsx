import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IPR_STATEMENT, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Provenance — Authenticity & Intellectual Property",
  description:
    "Every SROJA design is an original work by Archit, protected under Intellectual Property Rights, released in numbered editions with a certificate of authenticity.",
};

const PILLARS = [
  {
    title: "Original by birth",
    text: "Each design originates as a drawing by Archit at the maison. The archive holds the studies, dates and iterations of every released motif — a paper trail of authorship that precedes the cloth itself.",
  },
  {
    title: "Protected by law",
    text: "SROJA designs are protected under Intellectual Property Rights. They cannot be replicated, reproduced, or commercially utilised without authorisation. What you collect, no one else may lawfully make.",
  },
  {
    title: "Numbered by hand",
    text: "Editions are deliberately small. Each piece carries its number — 07 of 50 is not a marketing line; it is the count of how many will ever exist in that edition.",
  },
  {
    title: "Certified for generations",
    text: "Every acquisition includes a certificate recording edition number, artisan-hours, craft region and completion date — the document your estate will one day be glad you kept.",
  },
] as const;

export default function ProvenancePage() {
  return (
    <>
      <section className="relative bg-charcoal-deep pb-24 pt-44 md:pb-32 md:pt-56">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-gold">Provenance & Protection</p>
            <h1 className="display mt-6 max-w-5xl text-6xl leading-[0.98] text-ivory md:text-[7rem]">
              {IPR_STATEMENT.headline}
            </h1>
            <div className="mt-10 max-w-2xl space-y-6">
              {IPR_STATEMENT.lines.map((l) => (
                <p key={l} className="text-base leading-[1.9] text-ivory/80 md:text-lg">
                  {l}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-charcoal-line bg-charcoal py-24 md:py-36">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <div className="grid gap-px overflow-hidden border border-charcoal-line bg-charcoal-line md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i} className="h-full">
                <div className="h-full bg-charcoal p-10 md:p-14">
                  <p className="display text-5xl text-brass/50">0{i + 1}</p>
                  <p className="display mt-6 text-3xl text-ivory md:text-4xl">{p.title}</p>
                  <p className="mt-5 text-sm leading-[1.9] text-stone md:text-base">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Specimen certificate */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto mt-20 max-w-3xl border border-brass/40 bg-charcoal-deep p-10 text-center md:p-16">
              <div className="absolute inset-2 border border-brass/20" />
              <p className="eyebrow text-brass">Specimen — Certificate of Authenticity</p>
              <p className="display mt-8 text-2xl tracking-[0.42em] text-ivory">SROJA</p>
              <p className="display mt-8 text-2xl leading-relaxed text-ivory md:text-3xl">
                This certifies that the accompanying work is an original design by{" "}
                {SITE.founder}, handcrafted by master artisans for {SITE.legalName}.
              </p>
              <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-y-3 text-left text-sm">
                <span className="eyebrow text-stone">Work</span>
                <span className="text-ivory">———</span>
                <span className="eyebrow text-stone">Edition</span>
                <span className="text-ivory">No. —— of ——</span>
                <span className="eyebrow text-stone">Artisan-hours</span>
                <span className="text-ivory">———</span>
                <span className="eyebrow text-stone">Completed</span>
                <span className="text-ivory">———</span>
              </div>
              <p className="display mt-12 text-2xl italic text-gold">{SITE.founder}</p>
              <p className="eyebrow mt-1 text-stone">{SITE.founderTitle}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-16 max-w-2xl text-center text-sm leading-relaxed text-stone">
              For authentication queries, edition verification, or authorised
              collaboration requests, write to{" "}
              <a href={`mailto:${SITE.email}`} className="link-line text-gold">
                {SITE.email}
              </a>
              . The house responds to every serious enquiry personally.
            </p>
            <div className="mt-10 text-center">
              <Link
                href="/consultation"
                className="eyebrow group inline-flex items-center gap-4 border border-brass/60 px-10 py-5 text-gold transition-all duration-700 hover:border-gold hover:bg-gold hover:text-charcoal-deep"
              >
                Speak With The House
                <span aria-hidden className="transition-transform duration-700 group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
