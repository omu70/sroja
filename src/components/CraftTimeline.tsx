"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
 * The Making — a horizontal strip of icon-led phase cards.
 * GSAP scrubs it sideways as the page scrolls (no pinning — by design:
 * pinned sections and smooth-scroll libraries are a fragile pairing).
 */
export default function CraftTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -(track.scrollWidth - section.clientWidth) - 48,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 15%",
              scrub: 1.1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-ivory-mute bg-ivory py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-brass">The Making</p>
              <h2 className="display mt-4 text-5xl text-charcoal md:text-7xl">
                Slowness, <span className="italic text-stone-dark">staged.</span>
              </h2>
            </div>
            <IconLotus size={34} className="mb-2 shrink-0 animate-spin-slow text-brass/60" />
          </div>
          <div className="rule-live mt-10" />
        </Reveal>
      </div>

      {/* The strip */}
      <div className="mt-14 pl-6 md:pl-12">
        <div ref={trackRef} className="flex flex-col gap-6 md:w-max md:flex-row md:gap-8">
          {TIMELINE.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={step.phase} delay={0.06 * i} className="md:w-[26rem] md:shrink-0">
                <article className="group relative h-full border border-ivory-mute bg-ivory-bright p-9 transition-all duration-700 hover:border-brass/50 hover:shadow-[0_30px_60px_-30px_rgba(27,24,19,0.25)] md:p-11">
                  <span className="display pointer-events-none absolute right-6 top-4 text-[5.5rem] leading-none text-ivory-soft transition-colors duration-700 group-hover:text-ivory-mute">
                    0{i + 1}
                  </span>

                  <span className="icon-chip">
                    <Icon size={22} />
                  </span>

                  <p className="eyebrow mt-8 text-brass">{step.phase}</p>
                  <h3 className="display mt-3 text-4xl text-charcoal">{step.title}</h3>
                  <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-dark">
                    {step.text}
                  </p>

                  <div className="mt-9 flex items-end gap-3 border-t border-ivory-mute pt-6">
                    <span className="display text-5xl leading-none text-brass">{step.stat}</span>
                    <span className="eyebrow pb-1 text-stone-dark">{step.statLabel}</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <p className="eyebrow mt-10 px-6 text-stone-dark md:px-12">
        Scroll — the table moves with you
      </p>
    </section>
  );
}
