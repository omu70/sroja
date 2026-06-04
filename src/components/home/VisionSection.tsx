import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { img } from "@/data/site";

/** The Vision of Archit — the designer, presented as a designer. */
export default function VisionSection() {
  return (
    <section className="relative bg-charcoal py-28 md:py-44">
      <div className="mx-auto grid max-w-[1700px] gap-14 px-6 md:grid-cols-12 md:px-12">
        {/* Portrait / atelier study */}
        <div className="md:col-span-5">
          <Reveal>
            <ParallaxImage
              src={img("1778764935406_iwtxps5smha.png")}
              alt="The hand of the atelier — handspun kala cotton under study"
              className="aspect-[3/4] w-full"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <p className="eyebrow mt-4 text-stone">
              The atelier, Gurugram — material study for the Reva weave
            </p>
          </Reveal>
        </div>

        {/* The text */}
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="eyebrow text-gold">The Vision</p>
            <h2 className="display mt-4 text-5xl leading-[1.02] text-ivory md:text-7xl">
              Archit draws first.
              <span className="block italic text-stone">Everything else follows.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 space-y-7 text-base leading-[1.9] text-ivory/80 md:text-lg">
              <p>
                SROJA exists because its founder could not find the thing he wanted to
                live with. Trained in fashion, obsessed with the drawn line, Archit
                kept meeting the same wall: objects made to be sold, never objects
                made to be kept.
              </p>
              <p>
                So the house begins where fashion houses begin — at the sketchbook.
                Every motif in the archive is an original drawing, redrawn until the
                repeat breathes, then entrusted to master artisans in Rajasthan,
                Kutch and Tamil Nadu who translate it into cloth the slow way: carved
                teak, handspun kala cotton, looms older than nations.
              </p>
              <p className="lede text-xl text-ivory md:text-2xl">
                “I am not decorating homes. I am making the heirlooms their
                grandchildren will argue over.”
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 flex items-center gap-6">
              <div>
                <p className="display text-2xl text-ivory">Archit</p>
                <p className="eyebrow mt-1 text-stone">Founder & Creative Director</p>
              </div>
              <div className="rule-solid h-px flex-1" />
              <Link href="/maison" className="link-line eyebrow shrink-0 text-gold">
                The Maison →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
