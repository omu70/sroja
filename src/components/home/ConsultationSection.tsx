import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconArrow, IconCalendar, IconChat, IconEnvelope, IconLotus } from "@/components/icons";

const WAYS = [
  { Icon: IconEnvelope, title: "Request Acquisition", line: "Reserve a numbered piece." },
  { Icon: IconCalendar, title: "Private Consultation", line: "Your rooms, your light, one hour." },
  { Icon: IconChat, title: "Design Advisor", line: "For architects & designers." },
] as const;

/** Private Consultation — luxury buys begin as conversations. */
export default function ConsultationSection() {
  return (
    <section className="relative overflow-hidden border-t border-ivory-mute bg-ivory py-24 md:py-40">
      {/* Quiet brass halo + drifting marks */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[55rem] w-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1]"
        style={{ background: "radial-gradient(circle, #C6A75E 0%, transparent 60%)" }}
      />
      <IconLotus size={20} className="absolute left-[10%] top-[28%] hidden text-brass/40 animate-float md:block" />
      <IconLotus size={14} className="absolute right-[12%] top-[40%] hidden text-brass/30 animate-float-late md:block" />

      <div className="relative mx-auto max-w-[1700px] px-6 text-center md:px-12">
        <Reveal>
          <p className="eyebrow text-brass">Private Consultation</p>
          <h2 className="display mx-auto mt-6 max-w-4xl text-5xl leading-[1.02] text-charcoal md:text-8xl">
            Significant pieces begin
            <span className="italic text-brass"> as conversations.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-ivory-mute bg-ivory-mute text-left md:grid-cols-3">
          {WAYS.map(({ Icon, title, line }, i) => (
            <Reveal key={title} delay={0.1 * i} className="h-full">
              <Link
                href="/consultation"
                className="group flex h-full flex-col bg-ivory-bright p-9 transition-colors duration-700 hover:bg-ivory md:p-11"
              >
                <span className="icon-chip">
                  <Icon size={21} />
                </span>
                <p className="display mt-7 text-2xl text-charcoal md:text-3xl">{title}</p>
                <p className="mt-3 text-sm text-stone-dark">{line}</p>
                <span className="link-line eyebrow mt-auto inline-flex items-center gap-2 pt-7 text-brass">
                  Begin <IconArrow size={13} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Link
            href="/consultation"
            className="eyebrow group mt-14 inline-flex items-center gap-4 border border-brass/60 px-12 py-6 text-brass transition-all duration-700 hover:border-charcoal hover:bg-charcoal hover:text-gold"
          >
            Begin The Conversation
            <IconArrow size={16} className="transition-transform duration-700 group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
