import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { img } from "@/data/site";
import { IconArrow, IconHand, IconPencil, IconShield } from "@/components/icons";

const MARKS = [
  { Icon: IconPencil, k: "Every motif", v: "drawn by one hand" },
  { Icon: IconHand, k: "Every piece", v: "made by master artisans" },
  { Icon: IconShield, k: "Every design", v: "protected as original IP" },
] as const;

/** The Vision of Archit — fewer words, stronger marks. */
export default function VisionSection() {
  return (
    <section className="relative bg-ivory-bright py-24 md:py-40">
      <div className="mx-auto grid max-w-[1700px] items-center gap-14 px-6 md:grid-cols-12 md:px-12">
        {/* Portrait / atelier study */}
        <div className="md:col-span-5">
          <Reveal>
            <div className="relative">
              <ParallaxImage
                src={img("1778764935406_iwtxps5smha.png")}
                alt="The hand of the atelier — handspun kala cotton under study"
                className="aspect-[3/4] w-full"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute -bottom-5 -right-5 hidden border border-brass/40 bg-ivory-bright px-6 py-4 md:block">
                <p className="display text-2xl text-charcoal">Archit</p>
                <p className="eyebrow mt-1 text-stone-dark">Founder & Creative Director</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The text — reduced to its essence */}
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="eyebrow text-brass">The Designer</p>
            <h2 className="display mt-4 text-5xl leading-[1.02] text-charcoal md:text-7xl">
              Every piece begins
              <span className="block italic text-stone-dark">with a drawing.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="lede mt-10 max-w-xl text-2xl leading-snug text-charcoal/85 md:text-3xl">
              “I am not decorating homes. I am making the heirlooms their
              grandchildren will argue over.”
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12 grid gap-px overflow-hidden border border-ivory-mute bg-ivory-mute sm:grid-cols-3">
              {MARKS.map(({ Icon, k, v }) => (
                <div key={v} className="group bg-ivory-bright p-6">
                  <span className="icon-chip">
                    <Icon size={20} />
                  </span>
                  <p className="eyebrow mt-5 text-stone-dark">{k}</p>
                  <p className="display mt-1 text-xl text-charcoal">{v}</p>
                </div>
              ))}
            </div>

            <Link href="/maison" className="link-line eyebrow mt-10 inline-flex items-center gap-3 text-brass">
              The Maison <IconArrow size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
