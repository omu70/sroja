import { IconHand, IconLeaf, IconLoom, IconPencil } from "./icons";

/**
 * A recognizable outline of India with the four homes of the craft marked.
 * The path is a hand-traced silhouette (factual geography) — broad north,
 * the western Gujarat/Kutch bulge, the long southern peninsula to Kanyakumari,
 * and the north-eastern extension. Sri Lanka sits off the south-east.
 */

const INDIA_PATH =
  "M168 28 C150 32 142 44 150 58 C132 70 120 96 128 120 C112 140 96 150 100 170 " +
  "C84 168 70 178 80 196 C96 200 104 196 116 200 C110 214 120 226 108 236 " +
  "C122 240 134 232 142 242 C150 256 160 262 168 280 C176 308 186 332 196 356 " +
  "C204 380 210 400 214 418 C222 430 230 432 232 418 C240 398 248 372 256 348 " +
  "C268 320 278 292 286 264 C296 238 306 216 312 196 C322 178 330 168 322 158 " +
  "C336 152 348 156 352 142 C366 150 380 146 384 132 C372 126 360 130 350 124 " +
  "C338 120 330 112 318 112 C300 104 280 100 262 92 C240 82 218 66 200 52 " +
  "C188 42 178 30 168 28 Z";

const PINS = [
  { Icon: IconPencil, x: 165, y: 96, label: "Gurugram", note: "The studio" },
  { Icon: IconLeaf, x: 132, y: 124, label: "Rajasthan", note: "Hand block printing" },
  { Icon: IconLoom, x: 96, y: 198, label: "Kutch", note: "Bhujodi handweaving" },
  { Icon: IconHand, x: 238, y: 356, label: "Tamil Nadu", note: "Chettinad looms" },
];

export default function IndiaMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 470"
      className={className}
      role="img"
      aria-label="A map of India marking the four regions where SROJA pieces are made"
    >
      <defs>
        <linearGradient id="india-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E1D1" />
          <stop offset="100%" stopColor="#EFE8D9" />
        </linearGradient>
        <pattern id="india-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="0.7" fill="#C0A290" opacity="0.5" />
        </pattern>
      </defs>

      {/* Land */}
      <path d={INDIA_PATH} fill="url(#india-fill)" stroke="#9A7A42" strokeWidth="1.4" strokeLinejoin="round" />
      <path d={INDIA_PATH} fill="url(#india-dots)" opacity="0.6" />

      {/* Sri Lanka */}
      <ellipse cx="250" cy="452" rx="11" ry="16" fill="url(#india-fill)" stroke="#9A7A42" strokeWidth="1.1" />

      {/* Threads linking the studio to each craft region */}
      {PINS.slice(1).map((p) => (
        <line key={p.label} x1={165} y1={96} x2={p.x} y2={p.y} stroke="#9A7A42" strokeWidth="0.8" strokeDasharray="2 2.5" opacity="0.5" />
      ))}

      {/* Pins */}
      {PINS.map((p, i) => {
        const studio = i === 0;
        return (
          <g key={p.label}>
            {studio && (
              <circle cx={p.x} cy={p.y} r="4" fill="none" stroke="#9A7A42" strokeWidth="0.9">
                <animate attributeName="r" from="4" to="13" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p.x} cy={p.y} r={studio ? 4 : 3} fill={studio ? "#9A7A42" : "#D05E29"} stroke="#FAF8F5" strokeWidth="1.1" />
          </g>
        );
      })}
    </svg>
  );
}

export { PINS };
