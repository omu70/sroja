import Reveal from "@/components/Reveal";
import { WORLD_CITIES } from "@/data/site";
import { IconCrate, IconGlobe, IconPin, IconShield } from "@/components/icons";

const PROMISES = [
  { Icon: IconCrate, label: "Archival packing" },
  { Icon: IconShield, label: "Fully insured" },
  { Icon: IconGlobe, label: "Worldwide delivery" },
] as const;

/** The World of SROJA — a quiet map of where the pieces live. */
export default function GlobalSection() {
  return (
    <section className="relative border-t border-ivory-mute bg-ivory py-24 md:py-36">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow text-brass">Global Presence</p>
          <h2 className="display mt-4 max-w-4xl text-5xl text-charcoal md:text-7xl">
            Made in India.
            <span className="italic text-stone-dark"> Kept everywhere.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          {/* Map */}
          <Reveal className="lg:col-span-8">
            <div className="relative w-full overflow-hidden border border-ivory-mute bg-ivory-bright shadow-[0_40px_80px_-50px_rgba(27,24,19,0.35)]">
              <svg
                viewBox="0 0 100 80"
                className="h-auto w-full"
                role="img"
                aria-label="A world map marking the cities where SROJA pieces are collected"
              >
                <defs>
                  <pattern id="dots" x="0" y="0" width="2.2" height="2.2" patternUnits="userSpaceOnUse">
                    <circle cx="1.1" cy="1.1" r="0.16" fill="#DCD3BE" />
                  </pattern>
                </defs>
                <rect width="100" height="80" fill="url(#dots)" />

                {[20, 40, 60, 80].map((x) => (
                  <path
                    key={x}
                    d={`M ${x} 4 Q ${x + 4} 40 ${x} 76`}
                    stroke="#E7DFCC"
                    strokeWidth="0.18"
                    fill="none"
                  />
                ))}
                <line x1="2" y1="40" x2="98" y2="40" stroke="#E7DFCC" strokeWidth="0.18" />

                {/* Routes from the atelier — drawn as living threads */}
                {WORLD_CITIES.filter((c) => c.city !== "Gurugram").map((c, i) => (
                  <path
                    key={c.city}
                    d={`M 66.5 44 Q ${(66.5 + c.x) / 2} ${Math.min(44, c.y) - 14} ${c.x} ${c.y}`}
                    stroke="#9A7A42"
                    strokeWidth="0.24"
                    strokeDasharray="0.9 1.3"
                    fill="none"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="22"
                      to="0"
                      dur={`${7 + i * 0.9}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                ))}

                {/* Cities */}
                {WORLD_CITIES.map((c) => (
                  <g key={c.city}>
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={c.city === "Gurugram" ? 1.15 : 0.62}
                      fill={c.city === "Gurugram" ? "#9A7A42" : "#1B1813"}
                    />
                    {c.city === "Gurugram" && (
                      <>
                        <circle cx={c.x} cy={c.y} r="2.3" fill="none" stroke="#9A7A42" strokeWidth="0.2">
                          <animate attributeName="r" from="1.4" to="4.4" dur="3s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.8" to="0" dur="3s" repeatCount="indefinite" />
                        </circle>
                      </>
                    )}
                  </g>
                ))}
              </svg>
              <p className="eyebrow absolute bottom-4 left-4 flex items-center gap-2 text-stone-dark">
                <IconPin size={13} className="text-brass" /> Our studio, Gurugram — threads mark collector cities
              </p>
            </div>
          </Reveal>

          {/* Ledger */}
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <ul className="divide-y divide-ivory-mute border-y border-ivory-mute">
                {WORLD_CITIES.slice(0, 7).map((c) => (
                  <li key={c.city} className="flex items-baseline justify-between py-3.5">
                    <span className="display text-2xl text-charcoal">{c.city}</span>
                    <span className="eyebrow text-stone-dark">{c.role}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {PROMISES.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="group flex flex-col items-center gap-3 border border-ivory-mute bg-ivory-bright px-3 py-6 text-center"
                  >
                    <span className="icon-chip">
                      <Icon size={20} />
                    </span>
                    <span className="eyebrow text-[0.52rem] text-stone-dark">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
