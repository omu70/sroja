// ------------------------------------------------------------------------
// Home Hero Banner
//
// The full-screen image slideshow with the headline at the top of the home page.
// ------------------------------------------------------------------------

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import BrandLogo from "./BrandLogo";
import { IconArrow, IconHand, IconHash, IconShield, IconLotus } from "./icons";

interface HeroFilmProps {
  frames: { src: string; alt: string }[];
}

const PROOFS = [
  { icon: IconHand, label: "Entirely By Hand" },
  { icon: IconHash, label: "Numbered Editions" },
  { icon: IconShield, label: "Design Protected" },
] as const;

/**
 * Cinematic hero — CSS-only crossfade + Ken Burns (no layout animation),
 * deliberately simple so it can never stall hydration.
 * Swap the frames for a <video> of hands at the block table when footage exists.
 */
export default function HeroFilm({ frames }: HeroFilmProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % frames.length), 6500);
    return () => clearInterval(id);
  }, [frames.length]);

  return (
    <section className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal-deep">
      {/* The film — stacked frames, opacity crossfade, perpetual Ken Burns */}
      {frames.map((frame, i) => (
        <div
          key={frame.src}
          className="absolute inset-0 transition-opacity duration-[2400ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <div className="absolute inset-0 animate-kenburns">
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="img-luxe object-cover"
            />
          </div>
        </div>
      ))}

      {/* Cinematic grade — fades into the light page below */}
      <div className="absolute inset-0 bg-charcoal-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/60 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#FAF7EF]" />

      {/* Floating house marks — quiet, perpetual */}
      <IconLotus
        size={26}
        className="absolute left-[12%] top-[30%] z-10 hidden text-gold/50 animate-float md:block"
      />
      <IconLotus
        size={16}
        className="absolute right-[14%] top-[22%] z-10 hidden text-ivory/40 animate-float-late md:block"
      />
      <IconLotus
        size={20}
        className="absolute right-[22%] bottom-[30%] z-10 hidden text-gold/40 animate-float md:block"
      />

      {/* Copy */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <BrandLogo variant="mark" tone="gold" className="mb-7 h-8 w-8 animate-[spin_28s_linear_infinite]" />
        <p className="eyebrow mb-8 text-gold animate-fade-up">
          A Luxury Design House from India
        </p>

        <h1 className="display text-[13vw] leading-[0.95] text-ivory md:text-[7.5vw]">
          <span className="block animate-fade-up [animation-delay:150ms]">
            Designed To Be
          </span>
          <span className="block italic text-gold animate-fade-up [animation-delay:350ms]">
            Collected.
          </span>
        </h1>

        <p className="lede mt-9 text-xl text-ivory/90 md:text-2xl animate-fade-up [animation-delay:600ms]">
          Not manufactured. Crafted.
        </p>

        <div className="mt-12 animate-fade-up [animation-delay:800ms]">
          <Magnetic>
            <Link
              href="/collections"
              className="eyebrow group inline-flex items-center gap-4 border border-ivory/35 bg-charcoal-deep/20 px-10 py-5 text-ivory backdrop-blur-sm transition-all duration-700 hover:border-gold hover:bg-gold hover:text-charcoal-deep"
            >
              Shop The Collection
              <IconArrow size={16} className="transition-transform duration-700 group-hover:translate-x-2" />
            </Link>
          </Magnetic>
        </div>

        {/* Icon proofs */}
        <div className="mt-14 flex items-center gap-8 animate-fade-up [animation-delay:1000ms] md:gap-12">
          {PROOFS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <Icon size={22} className="text-gold" />
              <span className="eyebrow text-[0.5rem] text-ivory/80">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="mx-auto h-12 w-px overflow-hidden bg-charcoal/20">
          <div className="h-1/2 w-px bg-brass animate-scrollcue" />
        </div>
      </div>
    </section>
  );
}
