// ------------------------------------------------------------------------
// Scrolling Word Strip
//
// The slow-scrolling band of craft words (e.g. 'Hand Block Printing').
// ------------------------------------------------------------------------

import { IconLotus } from "./icons";

const WORDS = [
  "Hand Block Printing",
  "Bhujodi Handweaving",
  "Kala Cotton",
  "Chettinad Looms",
  "Carved Teak Blocks",
  "Deep Indigo",
  "Numbered Editions",
  "Original Drawings",
];

/** A slow filmstrip of the house's vocabulary — perpetual, hypnotic. */
export default function Marquee({ dark = false }: { dark?: boolean }) {
  const row = [...WORDS, ...WORDS];
  return (
    <div
      className={`overflow-hidden border-y py-5 ${
        dark ? "border-charcoal-line bg-charcoal" : "border-ivory-mute bg-ivory"
      }`}
    >
      <div className="flex w-max animate-marquee items-center">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className={`eyebrow whitespace-nowrap ${dark ? "text-stone" : "text-stone-dark"}`}>
              {w}
            </span>
            <IconLotus size={13} className="mx-8 shrink-0 text-brass/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
