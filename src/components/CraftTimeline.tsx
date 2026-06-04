"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/data/site";

/**
 * The Making — a pinned, horizontally-scrolling chapter.
 * Five phases of the craft, read like the spine of a book.
 */
export default function CraftTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-charcoal-deep">
      {/* Header overlay */}
      <div className="pointer-events-none absolute left-6 top-12 z-10 md:left-12 md:top-16">
        <p className="eyebrow text-gold">The Making</p>
        <h2 className="display mt-3 text-4xl text-ivory md:text-5xl">
          Slowness, <span className="italic text-stone">staged.</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col md:h-screen md:w-max md:flex-row md:items-center"
      >
        {TIMELINE.map((step, i) => (
          <article
            key={step.phase}
            className="flex min-h-[70vh] w-full shrink-0 flex-col justify-center border-b border-charcoal-line px-6 py-20 md:h-screen md:min-h-0 md:w-[60vw] md:border-b-0 md:border-r md:px-20 md:py-0 lg:w-[44vw]"
          >
            <p className="eyebrow text-brass">{step.phase}</p>
            <h3 className="display mt-6 text-5xl text-ivory md:text-7xl">{step.title}</h3>
            <p className="mt-8 max-w-md text-base leading-relaxed text-stone md:text-lg">
              {step.text}
            </p>
            <div className="mt-12 flex items-end gap-4">
              <span className="display text-6xl leading-none text-gold md:text-7xl">
                {step.stat}
              </span>
              <span className="eyebrow pb-2 text-stone">{step.statLabel}</span>
            </div>
            <p className="display mt-12 text-[9rem] leading-none text-charcoal-soft md:text-[13rem]">
              0{i + 1}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
