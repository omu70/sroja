import Link from "next/link";
import HeroFilm from "@/components/HeroFilm";
import Marquee from "@/components/Marquee";
import VisionSection from "@/components/home/VisionSection";
import CraftTimeline from "@/components/CraftTimeline";
import ManifestoSection from "@/components/home/ManifestoSection";
import MaterialLibrary from "@/components/MaterialLibrary";
import GlobalSection from "@/components/home/GlobalSection";
import ProvenanceSection from "@/components/home/ProvenanceSection";
import CollectorNotes from "@/components/home/CollectorNotes";
import AtelierStrip from "@/components/home/AtelierStrip";
import ConsultationSection from "@/components/home/ConsultationSection";
import PieceShowcase from "@/components/PieceShowcase";
import Reveal from "@/components/Reveal";
import { getFeatured } from "@/data/pieces";
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

  return (
    <>
      <HeroFilm frames={HERO_FRAMES} />
      <Marquee />
      <VisionSection />
      <CraftTimeline />
      <ManifestoSection />

      {/* Signature Collections — pieces hung like works */}
      <section className="relative border-t border-charcoal-line bg-charcoal pt-28 md:pt-40">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-gold">Signature Works</p>
            <h2 className="display mt-4 max-w-4xl text-5xl text-ivory md:text-7xl">
              The current editions,
              <span className="italic text-stone"> hung for viewing.</span>
            </h2>
          </Reveal>
        </div>
        <div className="mt-10">
          {featured.map((piece, i) => (
            <PieceShowcase key={piece.slug} piece={piece} index={i} />
          ))}
        </div>
        <div className="border-t border-charcoal-line py-16 text-center">
          <Link
            href="/collections"
            className="eyebrow group inline-flex items-center gap-4 text-gold"
          >
            <span className="link-line">View The Complete Archive</span>
            <span aria-hidden className="transition-transform duration-700 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </section>

      <MaterialLibrary />
      <GlobalSection />
      <ProvenanceSection />
      <CollectorNotes />
      <AtelierStrip />
      <ConsultationSection />
    </>
  );
}
