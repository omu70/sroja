import Link from "next/link";
import HeroFilm from "@/components/HeroFilm";
import Marquee from "@/components/Marquee";
import ImageBand from "@/components/ImageBand";
import VisionSection from "@/components/home/VisionSection";
import CraftTimeline from "@/components/CraftTimeline";
import MaterialLibrary from "@/components/MaterialLibrary";
import GlobalSection from "@/components/home/GlobalSection";
import ProvenanceSection from "@/components/home/ProvenanceSection";
import CollectorNotes from "@/components/home/CollectorNotes";
import AtelierStrip from "@/components/home/AtelierStrip";
import PieceShowcase from "@/components/PieceShowcase";
import Reveal from "@/components/Reveal";
import ValueLedger from "@/components/ValueLedger";
import TrustStrip from "@/components/TrustStrip";
import { IconArrow, IconClock, IconHash, IconLayers, IconLotus } from "@/components/icons";
import { getFeatured, PIECES } from "@/data/pieces";
import { img } from "@/data/site";

const HERO_FRAMES = [
  {
    src: img("1778767833856_zyu279v552.png"),
    alt: "Neel Rekha — indigo line handwoven over 186 hours",
  },
  {
    src: img("1778764935406_iwtxps5smha.png"),
    alt: "Handspun kala cotton in macro — the Reva weave",
  },
  {
    src: img("1778575721257_htsug72o4vf.webp"),
    alt: "Hand block printing — the Gul Meher impression",
  },
  {
    src: img("1780559338807_s9m7prm5nv.png"),
    alt: "The Charcoal Line dohar — a single pale seam",
  },
];

export default function HomePage() {
  const featured = getFeatured();
  const totalHours = PIECES.reduce((a, p) => a + p.hours, 0);

  return (
    <>
      <HeroFilm frames={HERO_FRAMES} />
      <Marquee />

      {/* The arithmetic + the reassurance — wordless justification */}
      <section className="bg-ivory-bright py-12 md:py-16">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <ValueLedger
              items={[
                { icon: IconClock, value: totalHours, label: "artisan-hours in the archive" },
                { icon: IconLayers, value: PIECES.length, label: "numbered works" },
                { icon: IconLotus, value: 3, label: "living craft traditions" },
                { icon: IconHash, value: "≤50", label: "pieces per edition" },
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <TrustStrip className="mt-5" />
          </Reveal>
        </div>
      </section>

      {/* Products first — the funnel starts immediately */}
      <section className="relative border-t border-ivory-mute bg-ivory-bright pt-20 md:pt-28">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-brass">Signature Pieces</p>
                <h2 className="display mt-4 max-w-4xl text-5xl text-charcoal md:text-7xl">
                  From the
                  <span className="italic text-stone-dark"> current editions.</span>
                </h2>
              </div>
              <Link
                href="/collections"
                className="link-line eyebrow inline-flex items-center gap-3 text-brass"
              >
                Shop All {PIECES.length} <IconArrow size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="mt-6">
          {featured.map((piece, i) => (
            <PieceShowcase key={piece.slug} piece={piece} index={i} />
          ))}
        </div>
        <div className="border-t border-ivory-mute py-14 text-center">
          <Link
            href="/collections"
            className="eyebrow group inline-flex items-center gap-4 border border-brass bg-charcoal px-12 py-6 text-gold transition-all duration-700 hover:bg-charcoal-deep"
          >
            Shop All {PIECES.length} Pieces
            <IconArrow size={16} className="transition-transform duration-700 group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      <CraftTimeline />

      <ImageBand
        src={img("1778664354807_msia342n03.webp")}
        alt="The printed field — Neel Gul Bagh under north light"
        line="A machine repeats. A hand remembers."
      />

      <VisionSection />
      <MaterialLibrary />

      <ImageBand
        src={img("1778737274664_pn4aiafoyzm.webp")}
        alt="The quilting frame — Genda Baagh in progress"
        line="Twenty-eight pieces. Every one numbered."
      />

      <ProvenanceSection />
      <CollectorNotes />
      <GlobalSection />
      <AtelierStrip />

      {/* Final CTA — straight to the shop */}
      <section className="relative overflow-hidden border-t border-ivory-mute bg-ivory py-24 text-center md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1]"
          style={{ background: "radial-gradient(circle, #C6A75E 0%, transparent 60%)" }}
        />
        <Reveal>
          <h2 className="display mx-auto max-w-4xl px-6 text-5xl leading-[1.02] text-charcoal md:text-8xl">
            Own an <span className="italic text-brass">original.</span>
          </h2>
          <Link
            href="/collections"
            className="eyebrow group mt-12 inline-flex items-center gap-4 border border-brass bg-charcoal px-12 py-6 text-gold transition-all duration-700 hover:bg-charcoal-deep"
          >
            Shop All {PIECES.length} Pieces
            <IconArrow size={16} className="transition-transform duration-700 group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </section>

      <Marquee dark />
    </>
  );
}
