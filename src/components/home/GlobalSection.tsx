import Reveal from "@/components/Reveal";
import { WORLD_CITIES } from "@/data/site";

/** The World of SROJA — a quiet map of where the pieces live. */
export default function GlobalSection() {
  return (
    <section className="relative border-t border-charcoal-line bg-charcoal py-28 md:py-40">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow text-gold">Global Presence</p>
          <h2 className="display mt-4 max-w-4xl text-5xl text-ivory md:text-7xl">
            Made in India.
            <span className="italic text-stone"> Kept everywhere.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          {/* Map */}
          <Reveal className="lg:col-span-8">
            <div className="relative w-full overflow-hidden border border-charcoal-line bg-charcoal-deep">
              <svg
                viewBox="0 0 100 80"
                className="h-auto w-full"
                role="img"
                aria-label="A world map marking the cities where SROJA pieces are collected"
              >
                {/* Dotted world — abstract graticule */}
                <defs>
                  <pattern id="dots" x="0" y="0" width="2.2" height="2.2" patternUnits="userSpaceOnUse">
                    <circle cx="1.1" cy="1.1" r="0.16" fill="#3a342a" />
                  </pattern>
                </defs>
                <rect width="100" height="80" fill="url(#dots)" />

                {/* Meridian arcs */}
                {[20, 40, 60, 80].map((x) => (
                  <path
                    key={x}
                    d={`M ${x} 4 Q ${x + 4} 40 ${x} 76`}
                    stroke="#2c2820"
                    strokeWidth="0.18"
                    fill="none"
                  />
                ))}
                <line x1="2" y1="40" x2="98" y2="40" stroke="#2c2820" strokeWidth="0.18" />

                {/* Routes from the atelier */}
                {WORLD_CITIES.filter((c) => c.city !== "Gurugram").map((c) => (
                  <path
                    key={c.city}
                    d={`M 66.5 44 Q ${(66.5 + c.x) / 2} ${Math.min(44, c.y) - 14} ${c.x} ${c.y}`}
                    stroke="#a0804a"
                    strokeWidth="0.22"
                    strokeDasharray="0.8 1.2"
                    fill="none"
                    opacity="0.55"
                  />
                ))}

                {/* Cities */}
                {WORLD_CITIES.map((c) => (
                  <g key={c.city}>
                    <circle cx={c.x} cy={c.y} r={c.city === "Gurugram" ? 1.15 : 0.62} fill={c.city === "Gurugram" ? "#c6a75e" : "#f2ede2"} />
                    {c.city === "Gurugram" && (
                      <circle cx={c.x} cy={c.y} r="2.3" fill="none" stroke="#c6a75e" strokeWidth="0.18" opacity="0.7" />
                    )}
                  </g>
                ))}
              </svg>
              <p className="eyebrow absolute bottom-4 left-4 text-stone">
                ● The Atelier, Gurugram — lines mark collector cities
              </p>
            </div>
          </Reveal>

          {/* Ledger */}
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <ul className="divide-y divide-charcoal-line border-y border-charcoal-line">
                {WORLD_CITIES.map((c) => (
                  <li key={c.city} className="flex items-baseline justify-between py-4">
                    <span className="display text-2xl text-ivory">{c.city}</span>
                    <span className="eyebrow text-stone">{c.role}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-stone">
                Collectors, interior designers and architects work with the house
                across four continents. Each acquisition travels fully insured, in
                archival packing, with its certificate — and a design advisor remains
                your single point of correspondence from enquiry to installation.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
