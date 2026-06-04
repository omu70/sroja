import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IPR_STATEMENT, SITE } from "@/data/site";

/** Intellectual Property — framed as exclusivity, presented like a certificate. */
export default function ProvenanceSection() {
  return (
    <section className="relative border-t border-charcoal-line bg-charcoal-deep py-28 md:py-40">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-gold">Provenance & Protection</p>
              <h2 className="display mt-4 text-5xl leading-[1.02] text-ivory md:text-7xl">
                {IPR_STATEMENT.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-6 text-base leading-[1.9] text-ivory/80 md:text-lg">
                {IPR_STATEMENT.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
              <Link href="/provenance" className="link-line eyebrow mt-10 inline-block text-gold">
                The Charter of Authenticity →
              </Link>
            </Reveal>
          </div>

          {/* Certificate plate */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.2}>
              <div className="relative border border-brass/40 bg-charcoal p-10 md:p-14">
                <div className="absolute inset-2 border border-brass/20" />
                <p className="eyebrow text-brass">Certificate of Authenticity</p>
                <p className="display mt-8 text-3xl leading-snug text-ivory md:text-4xl">
                  This work is certified an original design by {SITE.founder},
                  executed by master artisans for {SITE.name}.
                </p>
                <dl className="mt-10 space-y-3 text-sm text-stone">
                  <div className="flex justify-between border-t border-charcoal-line pt-3">
                    <dt className="eyebrow">Edition</dt>
                    <dd className="text-ivory">No. — of —</dd>
                  </div>
                  <div className="flex justify-between border-t border-charcoal-line pt-3">
                    <dt className="eyebrow">Artisan-hours</dt>
                    <dd className="text-ivory">Recorded at the atelier</dd>
                  </div>
                  <div className="flex justify-between border-t border-charcoal-line pt-3">
                    <dt className="eyebrow">Design rights</dt>
                    <dd className="text-ivory">Protected under IPR</dd>
                  </div>
                </dl>
                <p className="display mt-10 text-right text-2xl italic text-gold">{SITE.founder}</p>
                <p className="eyebrow mt-1 text-right text-stone">{SITE.founderTitle}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
