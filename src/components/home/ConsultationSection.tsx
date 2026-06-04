import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

const WAYS = [
  {
    title: "Request Acquisition",
    text: "Reserve a numbered piece from the current editions. An advisor confirms availability, provenance and delivery.",
  },
  {
    title: "Schedule Private Consultation",
    text: "A one-to-one conversation about your rooms, your light, and which works belong in them.",
  },
  {
    title: "Speak With A Design Advisor",
    text: "For architects and interior designers composing projects with the archive.",
  },
] as const;

/** Private Consultation — luxury buys begin as conversations. */
export default function ConsultationSection() {
  return (
    <section className="relative overflow-hidden border-t border-charcoal-line bg-charcoal py-28 md:py-44">
      {/* Quiet brass halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #c6a75e 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-[1700px] px-6 text-center md:px-12">
        <Reveal>
          <p className="eyebrow text-gold">Private Consultation</p>
          <h2 className="display mx-auto mt-6 max-w-4xl text-5xl leading-[1.02] text-ivory md:text-8xl">
            Significant pieces begin
            <span className="italic text-gold"> as conversations.</span>
          </h2>
          <p className="lede mx-auto mt-8 max-w-2xl text-lg text-stone md:text-xl">
            There is no cart at {SITE.name}. There is correspondence — and then there
            is a crate arriving with your name on the certificate.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden border border-charcoal-line bg-charcoal-line text-left md:grid-cols-3">
          {WAYS.map((w, i) => (
            <Reveal key={w.title} delay={0.1 * i} className="h-full">
              <div className="h-full bg-charcoal p-10 transition-colors duration-700 hover:bg-charcoal-soft md:p-12">
                <p className="display text-[2.6rem] leading-none text-brass/60">
                  0{i + 1}
                </p>
                <p className="display mt-6 text-2xl text-ivory md:text-3xl">{w.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-stone">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Link
            href="/consultation"
            className="eyebrow group mt-16 inline-flex items-center gap-4 border border-brass/60 px-12 py-6 text-gold transition-all duration-700 hover:border-gold hover:bg-gold hover:text-charcoal-deep"
          >
            Begin The Conversation
            <span aria-hidden className="transition-transform duration-700 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
