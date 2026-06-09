// ------------------------------------------------------------------------
// Home: Made in India
//
// The India map section listing the four craft regions + shipping promises.
// ------------------------------------------------------------------------

import Reveal from "@/components/Reveal";
import IndiaMap from "@/components/IndiaMap";
import { WORLD_CITIES } from "@/data/site";
import { IconCrate, IconGlobe, IconHand, IconLeaf, IconLoom, IconPencil, IconShield } from "@/components/icons";

const REGIONS = [
  { Icon: IconPencil, place: "Gurugram", craft: "The studio — where every piece is drawn", dot: "#9A7A42" },
  { Icon: IconLeaf, place: "Rajasthan", craft: "Hand block printing", dot: "#D05E29" },
  { Icon: IconLoom, place: "Kutch, Gujarat", craft: "Bhujodi handweaving", dot: "#D05E29" },
  { Icon: IconHand, place: "Tamil Nadu", craft: "Chettinad handweaving", dot: "#D05E29" },
] as const;

const PROMISES = [
  { Icon: IconCrate, label: "Archival packing" },
  { Icon: IconShield, label: "Fully insured" },
  { Icon: IconGlobe, label: "Worldwide delivery" },
] as const;

/** Made in India — a real map of the four homes of the craft. */
export default function GlobalSection() {
  const cities = WORLD_CITIES.filter((c) => c.city !== "Gurugram").map((c) => c.city);

  return (
    <section className="relative border-t border-ivory-mute bg-ivory py-20 md:py-32">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow text-brass">Made in India</p>
          <h2 className="display mt-4 max-w-4xl text-5xl text-charcoal md:text-7xl">
            Four regions.
            <span className="italic text-stone-dark"> One country of craft.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* The real India map */}
          <Reveal className="lg:col-span-6">
            <div className="mx-auto max-w-sm lg:max-w-md">
              <IndiaMap className="h-auto w-full" />
            </div>
          </Reveal>

          {/* The regions */}
          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <ul className="divide-y divide-ivory-mute border-y border-ivory-mute">
                {REGIONS.map(({ Icon, place, craft, dot }) => (
                  <li key={place} className="flex items-center gap-4 py-5">
                    <span className="icon-chip shrink-0">
                      <Icon size={20} />
                    </span>
                    <div className="flex-1">
                      <p className="display text-2xl text-charcoal">{place}</p>
                      <p className="text-sm text-stone-dark">{craft}</p>
                    </div>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: dot }} />
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Shipped worldwide */}
            <Reveal delay={0.2}>
              <div className="mt-10">
                <p className="eyebrow text-brass">Shipped worldwide</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-dark">
                  Collected across {cities.slice(0, 6).join(", ")} and beyond — every
                  piece travels fully insured, in archival packing, with its certificate.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {PROMISES.map(({ Icon, label }) => (
                    <div key={label} className="group flex flex-col items-center gap-3 border border-ivory-mute bg-ivory-bright px-3 py-5 text-center">
                      <span className="icon-chip">
                        <Icon size={19} />
                      </span>
                      <span className="eyebrow text-[0.52rem] text-stone-dark">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
