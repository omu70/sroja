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

/** A slow brass filmstrip of the house's vocabulary. */
export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden border-y border-charcoal-line bg-charcoal py-5">
      <div className="flex w-max animate-marquee items-center">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="eyebrow whitespace-nowrap text-stone">{w}</span>
            <span aria-hidden className="mx-8 text-brass">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
