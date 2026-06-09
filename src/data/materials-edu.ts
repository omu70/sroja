// ------------------------------------------------------------------------
// Material Education Content
//
// The teaching content for the craft page: what each material is, why it
// costs more, how it feels, how to care for it, how to spot the real thing.
// ------------------------------------------------------------------------

import { img } from "./site";

/**
 * The Material School — the education layer of The Craft page.
 * Plain answers to the four questions every buyer actually has:
 * what is it, why does it cost more, how does it feel, how do I care for it.
 */

export interface MaterialChapter {
  key: string;
  name: string;
  origin: string;
  /** brand-manual accent for the chapter plate */
  accent: "softgold" | "terracotta" | "rosewood" | "blush" | "pine";
  image: string;
  detailImage?: string;
  what: string;
  why: string;
  feel: string;
  care: string[];
  spot: string; // how to spot the real thing
}

export const MATERIAL_SCHOOL: MaterialChapter[] = [
  {
    key: "kala",
    name: "Kala Cotton",
    origin: "Kutch, Gujarat",
    accent: "softgold",
    image: img("1778764935406_iwtxps5smha.png"),
    detailImage: img("1778737972859_ldqlv7aqiem.webp"),
    what: "India's original rain-fed cotton — never irrigated, never genetically modified, spun entirely by hand.",
    why: "One of the rarest cottons in the world: only a handful of Kutch families still spin and weave it.",
    feel: "Dry, textured, alive — closer to raw silk than to mill cotton. It softens with every year.",
    care: ["Gentle hand wash, cold", "Dry flat in shade", "No bleach, ever"],
    spot: "Look for slubs — tiny natural thickenings in the thread. Machines remove them; the hand keeps them.",
  },
  {
    key: "cambric",
    name: "Cotton Cambric",
    origin: "Printing tables, Rajasthan",
    accent: "blush",
    image: img("1778664354807_msia342n03.webp"),
    detailImage: img("1778575721257_htsug72o4vf.webp"),
    what: "A fine, close-woven cotton — smooth enough for sleep, thirsty enough to drink hand-applied dye.",
    why: "Printers choose it because colour sits in it like watercolour, not on it like ink.",
    feel: "Cool, smooth, breathable — the bedsheet cotton of old Indian summers.",
    care: ["Machine wash gentle, cold", "Iron on reverse", "Wash dark colours separately first time"],
    spot: "Hold it to light: hand-printed cambric shows slight colour drift at the motif edges. That drift is the signature.",
  },
  {
    key: "suiting",
    name: "Suiting Cotton",
    origin: "The curtain lengths",
    accent: "rosewood",
    image: img("1780558799984_l9nbwvhwjf8.png"),
    detailImage: img("1780559016566_3jkgabp2xkn.png"),
    what: "A heavier, structured cotton — the weight tailors use for jackets, here hung at windows.",
    why: "Substance: it falls in calm folds and filters daylight into a warm glow instead of a glare.",
    feel: "Dense and quiet in the hand; drapes like a garment, not a veil.",
    care: ["Dry clean or gentle wash", "Hang to dry", "Steam, don't press hard"],
    spot: "Pinch and release — real suiting cotton recovers slowly and holds a soft body, never a crease-snap.",
  },
  {
    key: "yarn-dyed",
    name: "Yarn-Dyed Cotton",
    origin: "Chettinad, Tamil Nadu",
    accent: "terracotta",
    image: img("1778737621268_wl49d1fh08h.webp"),
    detailImage: img("1780559338807_6rpgr3jc9tb.png"),
    what: "Threads dyed before weaving, so the colour is built into the cloth — checks and stripes woven, not printed.",
    why: "Colour that cannot peel, fade unevenly, or wash off — it goes all the way through.",
    feel: "Crisp at first, then famously soft — the texture of a well-loved lungi or Madras shirt.",
    care: ["Machine wash gentle", "Colours stay true", "Tumble low or line dry"],
    spot: "Flip it over. Yarn-dyed cloth is identical on both sides; a print always has a paler back.",
  },
  {
    key: "dyes",
    name: "Indigo & Madder",
    origin: "The dye vats",
    accent: "pine",
    image: img("1778664354453_6dqmk575fh7.webp"),
    detailImage: img("1778767833856_4t842ktzits.png"),
    what: "The two oldest dyes in India — indigo leaf for deep blue, madder root for warm red.",
    why: "Mastered by eye in small vats; they age into softer, richer versions of themselves instead of dying.",
    feel: "Nothing on the surface — natural-tone dye leaves the cotton's hand unchanged.",
    care: ["First wash alone", "Mild detergent", "Shade-dry to keep depth"],
    spot: "Natural indigo is never flat: tilt it in daylight and the blue shifts between ink and sky.",
  },
  {
    key: "blocks",
    name: "Carved Teak Blocks",
    origin: "Rajasthan",
    accent: "softgold",
    image: img("1778575721257_htsug72o4vf.webp"),
    detailImage: img("1778665104634_vr2k9kg8cn.webp"),
    what: "The tool behind every print — one teak block per colour, carved in mirror image by master carvers.",
    why: "A complex motif demands a fortnight of carving before the first impression is ever struck.",
    feel: "You feel it in the cloth: each strike lands with slightly different pressure. That is a human heartbeat.",
    care: ["Nothing to do — the block's work is done", "The print outlives the block"],
    spot: "Repeat-check: find the same flower twice. If the two are perfectly identical, a machine made it.",
  },
];

/** Handmade vs machine — the education in one glance. */
export const HAND_VS_MACHINE = [
  { aspect: "Thread", hand: "Handspun, alive with slubs", machine: "Mill-spun, uniform" },
  { aspect: "Colour", hand: "Dyed through the fibre", machine: "Printed on the surface" },
  { aspect: "Pattern", hand: "No two pieces identical", machine: "Endless exact copies" },
  { aspect: "Time", hand: "24–186 hours per piece", machine: "Minutes per metre" },
  { aspect: "Ageing", hand: "Softens, deepens, lasts decades", machine: "Fades and pills in seasons" },
] as const;

/** Words on the labels, explained in one line each. */
export const GLOSSARY = [
  { term: "Buta / Buti", def: "A single flowering motif; buti is its smaller sister." },
  { term: "Jaal", def: "Motifs joined into a continuous net across the cloth." },
  { term: "Baagh", def: "Garden — a field of pattern in bloom." },
  { term: "Dohar", def: "A light three-layer summer blanket." },
  { term: "Razai", def: "The Indian quilt — filled, stitched, inherited." },
  { term: "Extra-weft", def: "Motifs lifted thread by thread while weaving." },
  { term: "Bhujodi", def: "A Kutch village; 500 years of weaving by name." },
  { term: "Chettinad", def: "Tamil mansion country famous for bold checks." },
] as const;
