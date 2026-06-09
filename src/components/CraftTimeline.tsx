// ------------------------------------------------------------------------
// Process Steps (home)
//
// The five-step 'how every piece is made' cards on the home page.
// ------------------------------------------------------------------------

import Reveal from "./Reveal";
import {
  IconPencil,
  IconLeaf,
  IconHand,
  IconEye,
  IconCertificate,
  IconLotus,
} from "./icons";
import { TIMELINE } from "@/data/site";

const ICONS = [IconPencil, IconLeaf, IconHand, IconEye, IconCertificate] as const;

/**
 * The Process — five steps, always fully visible.
 * A plain grid: no pinning, no scroll-jacking, nothing hidden off-screen.
 */
export default function CraftTimeline() {
  return (
    <section className="relative border-t border-ivory-mute bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-brass">The Process</p>
              <h2 className="display mt-4 text-5xl text-charcoal md:text-7xl">
                How every piece <span className="italic text-stone-dark">is made.</span>
              </h2>
            </div>
            <IconLotus size={34} className="mb-2 hidden shrink-0 animate-spin-slow text-brass/60 md:block" />
          </div>
          <div className="rule-live mt-10" />
        </Reveal>

        {/* Five steps — a clean, fully visible grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TIMELINE.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={step.phase} delay={0.06 * i} className="h-full">
                <article className="group relative flex h-full flex-col border border-ivory-mute bg-ivory-bright p-7 transition-all duration-700 hover:border-brass/50 hover:shadow-[0_30px_60px_-30px_rgba(27,24,19,0.25)] md:p-8">
                  <span className="display pointer-events-none absolute right-4 top-2 text-[4rem] leading-none text-ivory-soft transition-colors duration-700 group-hover:text-ivory-mute">
                    0{i + 1}
                  </span>

                  <span className="icon-chip">
                    <Icon size={21} />
                  </span>

                  <h3 className="display mt-6 text-3xl text-charcoal">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-dark">{step.text}</p>

                  <div className="mt-auto flex items-end gap-2.5 border-t border-ivory-mute pt-5">
                    <span className="display text-4xl leading-none text-brass">{step.stat}</span>
                    <span className="eyebrow pb-0.5 text-[0.52rem] text-stone-dark">
                      {step.statLabel}
                    </span>
                  </div>

                  {/* connector arrow between steps */}
                  {i < TIMELINE.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -right-[15px] top-1/2 z-10 hidden h-[26px] w-[26px] -translate-y-1/2 items-center justify-center rounded-full border border-ivory-mute bg-ivory-bright text-brass xl:flex"
                    >
                      →
                    </span>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
