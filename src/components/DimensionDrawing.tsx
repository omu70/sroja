/**
 * The dimensional drawing — every dossier carries its technical sheet,
 * drafted like a page from the atelier's drawing board.
 * Parses dimension strings such as `16" × 16"`, `Queen Size (65" × 90")`, `7 ft`.
 */

function parseDims(s: string): { w: number; h: number; wLabel: string; hLabel: string } {
  const nums = s.match(/(\d+(?:\.\d+)?)/g)?.map(Number) ?? [];
  if (/ft/i.test(s) && nums.length === 1) {
    // curtain drop
    const ft = nums[0];
    return { w: 48, h: ft * 12, wLabel: `~48"`, hLabel: `${ft} ft drop` };
  }
  if (nums.length >= 2) {
    return { w: nums[0], h: nums[1], wLabel: `${nums[0]}"`, hLabel: `${nums[1]}"` };
  }
  return { w: 16, h: 16, wLabel: s, hLabel: "" };
}

export default function DimensionDrawing({
  dimensions,
  name,
}: {
  dimensions: string;
  name: string;
}) {
  const { w, h, wLabel, hLabel } = parseDims(dimensions);

  // Fit drawing into a 300×300 stage with margins for dimension lines
  const stage = 300;
  const margin = 52;
  const avail = stage - margin * 2;
  const scale = Math.min(avail / w, avail / h);
  const rw = w * scale;
  const rh = h * scale;
  const x = (stage - rw) / 2;
  const y = (stage - rh) / 2;

  const brass = "#9A7A42";
  const ink = "#1B1813";

  return (
    <figure className="border border-ivory-mute bg-ivory-bright p-6">
      <svg viewBox={`0 0 ${stage} ${stage}`} className="h-auto w-full" role="img" aria-label={`Dimensional drawing of ${name}: ${dimensions}`}>
        {/* drafting grid */}
        <defs>
          <pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.55" fill="#E2DAC7" />
          </pattern>
        </defs>
        <rect width={stage} height={stage} fill="url(#grid)" />

        {/* the piece */}
        <rect x={x} y={y} width={rw} height={rh} fill="#F4EFE5" stroke={ink} strokeWidth="1.1" />
        <rect x={x + 7} y={y + 7} width={Math.max(rw - 14, 4)} height={Math.max(rh - 14, 4)} fill="none" stroke={brass} strokeWidth="0.6" strokeDasharray="3 3" />

        {/* corner ticks */}
        {[[x, y], [x + rw, y], [x, y + rh], [x + rw, y + rh]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.6" fill={brass} />
        ))}

        {/* width dimension line */}
        <g stroke={brass} strokeWidth="0.8">
          <line x1={x} y1={y - 18} x2={x + rw} y2={y - 18} />
          <line x1={x} y1={y - 23} x2={x} y2={y - 13} />
          <line x1={x + rw} y1={y - 23} x2={x + rw} y2={y - 13} />
        </g>
        <text x={x + rw / 2} y={y - 26} textAnchor="middle" fontSize="11" fill={ink} fontFamily="var(--font-sans), sans-serif" letterSpacing="1.5">
          {wLabel}
        </text>

        {/* height dimension line */}
        {hLabel && (
          <>
            <g stroke={brass} strokeWidth="0.8">
              <line x1={x - 18} y1={y} x2={x - 18} y2={y + rh} />
              <line x1={x - 23} y1={y} x2={x - 13} y2={y} />
              <line x1={x - 23} y1={y + rh} x2={x - 13} y2={y + rh} />
            </g>
            <text
              x={x - 26}
              y={y + rh / 2}
              textAnchor="middle"
              fontSize="11"
              fill={ink}
              fontFamily="var(--font-sans), sans-serif"
              letterSpacing="1.5"
              transform={`rotate(-90 ${x - 26} ${y + rh / 2})`}
            >
              {hLabel}
            </text>
          </>
        )}

        {/* title block */}
        <g fontFamily="var(--font-sans), sans-serif">
          <line x1={stage - 118} y1={stage - 34} x2={stage - 12} y2={stage - 34} stroke={brass} strokeWidth="0.7" />
          <text x={stage - 12} y={stage - 22} textAnchor="end" fontSize="8.5" fill={ink} letterSpacing="2">
            {name.toUpperCase()}
          </text>
          <text x={stage - 12} y={stage - 11} textAnchor="end" fontSize="7.5" fill="#766E60" letterSpacing="1.5">
            SROJA — ATELIER SHEET
          </text>
        </g>
      </svg>
      <figcaption className="eyebrow mt-4 text-stone-dark">
        Dimensional drawing — {dimensions}
      </figcaption>
    </figure>
  );
}
