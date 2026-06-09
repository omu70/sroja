// ------------------------------------------------------------------------
// India Map (home)
//
// The real map of India on the home page, marking the craft regions.
// ------------------------------------------------------------------------

/* eslint-disable @next/next/no-img-element */
/**
 * Real, accurate map of India (state boundaries) with the four homes of the
 * craft marked. Base outline is /public/india-map.svg; the marker overlay uses
 * the same viewBox so pins sit on their true geographic coordinates.
 */

const VB_W = 611.85999;
const VB_H = 695.70178;

// Projected from the map's geo-viewBox (lon/lat → svg units)
const PINS = [
  { x: 185.1, y: 197.8, label: "Gurugram", studio: true },
  { x: 159.4, y: 233.6, label: "Rajasthan", studio: false },
  { x: 31.1, y: 317.3, label: "Kutch", studio: false },
  { x: 221.8, y: 619.6, label: "Tamil Nadu", studio: false },
];

export default function IndiaMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      {/* Real India outline */}
      <img
        src="/india-map.svg"
        alt="Map of India marking the regions where SROJA pieces are made"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {/* Marker overlay — same coordinate space as the map */}
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        {/* Threads from the studio to each craft region */}
        {PINS.filter((p) => !p.studio).map((p) => (
          <line
            key={p.label}
            x1={185.1}
            y1={197.8}
            x2={p.x}
            y2={p.y}
            stroke="#9A7A42"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            opacity="0.55"
          />
        ))}

        {PINS.map((p) => (
          <g key={p.label}>
            {p.studio && (
              <circle cx={p.x} cy={p.y} r="7" fill="none" stroke="#9A7A42" strokeWidth="1.5">
                <animate attributeName="r" from="7" to="22" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={p.studio ? 7 : 5.5}
              fill={p.studio ? "#9A7A42" : "#D05E29"}
              stroke="#FAF8F5"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
