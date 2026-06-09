// ------------------------------------------------------------------------
// Home: Authenticity
//
// The 'original, protected, certified' section with a certificate card.
// ------------------------------------------------------------------------

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";
import { IconArrow, IconCertificate, IconHash, IconLotus, IconShield } from "@/components/icons";

const PILLARS = [
  { Icon: IconShield, title: "Protected", line: "Original designs under IPR — no one else may make them." },
  { Icon: IconHash, title: "Numbered", line: "Small editions; the count is real and it ends." },
  { Icon: IconCertificate, title: "Certified", line: "Signed certificate with every order." },
] as const;

/** Intellectual Property — framed as exclusivity, presented like a certificate. */
export default function ProvenanceSection() {
  return (
    <section className="relative border-t border-ivory-mute bg-ivory-bright py-24 md:py-36">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-brass">Authenticity & Protection</p>
              <h2 className="display mt-4 text-5xl leading-[1.02] text-charcoal md:text-7xl">
                Original. Protected.
                <span className="italic text-stone-dark"> Unrepeatable.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 grid gap-px overflow-hidden border border-ivory-mute bg-ivory-mute sm:grid-cols-3">
                {PILLARS.map(({ Icon, title, line }) => (
                  <div key={title} className="group bg-ivory-bright p-6">
                    <span className="icon-chip">
                      <Icon size={20} />
                    </span>
                    <p className="display mt-5 text-2xl text-charcoal">{title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-stone-dark">{line}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/provenance"
                className="link-line eyebrow mt-9 inline-flex items-center gap-3 text-brass"
              >
                The Charter of Authenticity <IconArrow size={15} />
              </Link>
            </Reveal>
          </div>

          {/* Certificate plate — kept charcoal: ink on the light page */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.2}>
              <div className="relative border border-brass/40 bg-charcoal p-10 shadow-[0_60px_110px_-60px_rgba(27,24,19,0.7)] md:p-14">
                <div className="absolute inset-2 border border-brass/25" />
                <IconLotus size={26} className="text-gold animate-pulse-soft" />
                <p className="eyebrow mt-6 text-brass-bright">Certificate of Authenticity</p>
                <p className="display mt-7 text-3xl leading-snug text-ivory md:text-4xl">
                  Certified an original SROJA design, executed by master
                  artisans for {SITE.name}.
                </p>
                <dl className="mt-9 space-y-3 text-sm">
                  <div className="flex justify-between border-t border-charcoal-line pt-3">
                    <dt className="eyebrow text-stone">Edition</dt>
                    <dd className="text-ivory">No. — of —</dd>
                  </div>
                  <div className="flex justify-between border-t border-charcoal-line pt-3">
                    <dt className="eyebrow text-stone">Artisan-hours</dt>
                    <dd className="text-ivory">Recorded at the atelier</dd>
                  </div>
                </dl>
                <p className="display mt-9 text-right text-xl tracking-[0.42em] text-gold">SROJA</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
