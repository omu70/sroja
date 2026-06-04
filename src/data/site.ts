import type { CollectionMeta } from "./types";

export const IMG_BASE =
  "https://mpwxnfrzhphqncigthrk.supabase.co/storage/v1/object/public/products/";

export const img = (file: string) => `${IMG_BASE}${file}`;

export const SITE = {
  name: "SROJA",
  legalName: "SROJA Design House",
  tagline: "Designed To Be Collected.",
  subTagline: "Not manufactured. Crafted.",
  description:
    "SROJA is a luxury design house from India. Every piece is a collectible work of textile art — designed by Archit, handcrafted by master artisans, produced in deliberately small editions and protected as original intellectual property.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sroja.in",
  founder: "Archit",
  founderTitle: "Founder & Creative Director",
  email: "hello@sroja.in",
  address: ["IRIS Tech Tower, A-06–10", "Sector 48, Gurugram 122018", "India"],
  established: "Gurugram, India",
};

export const NAV = [
  { label: "The Archive", href: "/collections" },
  { label: "Maison", href: "/maison" },
  { label: "Atelier", href: "/atelier" },
  { label: "Provenance", href: "/provenance" },
  { label: "Consultation", href: "/consultation" },
] as const;

export const COLLECTIONS: CollectionMeta[] = [
  {
    slug: "cushions",
    name: "Baithak",
    title: "The Baithak Collection",
    subtitle: "Objects of the sitting room",
    manifesto: [
      "In the old houses of India, the baithak was never furnished. It was composed — cushion by cushion, weave by weave — until a room became a conversation.",
      "These are not accessories. Each cushion is a small canvas: block-printed in Rajasthan or woven on five-century-old looms in Kutch, carrying motifs drawn by Archit and executed by hands that learned their craft from their grandparents.",
    ],
  },
  {
    slug: "bed-linens",
    name: "Shayan",
    title: "The Shayan Collection",
    subtitle: "The architecture of rest",
    manifesto: [
      "A third of a life is spent within the bed. SROJA treats that territory as architecture — planes of hand-printed cotton, gardens pressed into cloth one wooden block at a time.",
      "No two impressions land identically. That is not a tolerance. That is the signature.",
    ],
  },
  {
    slug: "quilts",
    name: "Razai",
    title: "The Razai Collection",
    subtitle: "The quilted canvas",
    manifesto: [
      "The razai is India's oldest heirloom — the object most often handed down, mended, and remembered. Ours are built to deserve that inheritance.",
      "Each quilt passes through more artisan-hours than any other object in the house: printing, layering, quilting, washing, sunning, examining. Slowness is the material.",
    ],
  },
  {
    slug: "dohars",
    name: "Dohar",
    title: "The Dohar Collection",
    subtitle: "The summer layer",
    manifesto: [
      "A dohar is weight made considerate — the layer for verandah evenings and ceiling-fan afternoons. It must drape like a garment and breathe like one.",
      "Woven, not printed; structured, not stiff. The restraint is the luxury.",
    ],
  },
  {
    slug: "curtains",
    name: "Jharokha",
    title: "The Jharokha Collection",
    subtitle: "Portraits of light",
    manifesto: [
      "A window is a frame; the curtain decides the picture. These lengths of handwoven and block-printed cotton are designed to edit daylight the way a jharokha once did — softening it, slowing it, giving it grain.",
      "Hung, they are architecture. Backlit, they are stained glass in cloth.",
    ],
  },
];

export const CRAFTS = [
  {
    key: "block",
    name: "Hand Block Printing",
    region: "Rajasthan",
    age: "c. 12th century",
    line: "Carved teak blocks, pressed by hand, one impression at a time.",
    detail:
      "Archit's drawings are translated by master carvers into teak blocks — one block per colour. Printers walk the table for days, striking each impression by eye. The micro-misregistrations between strikes are the proof of the hand.",
  },
  {
    key: "bhujodi",
    name: "Bhujodi Handweaving",
    region: "Kutch, Gujarat",
    age: "c. 500 years",
    line: "Indigenous kala cotton, handspun and woven with extra-weft motifs.",
    detail:
      "In the village of Bhujodi, weaving families work rain-fed kala cotton — handspun, undyed at its heart — lifting each motif thread by thread as extra weft. A single cushion face can take a week at the loom.",
  },
  {
    key: "chettinad",
    name: "Chettinad Handweaving",
    region: "Tamil Nadu",
    age: "c. 19th century",
    line: "Architectural checks and stripes from the mansion country of the south.",
    detail:
      "The Chettinad palette — olive, wine, marigold, rust — comes from the painted mansions of Karaikudi. Our weavers set those geometries in yarn-dyed cotton, beat dense enough to drape with calm weight.",
  },
] as const;

export const TIMELINE = [
  {
    phase: "01 — The Drawing",
    title: "Design",
    text: "Every piece begins in Archit's sketchbook — a motif redrawn until the repeat breathes. Nothing borrowed.",
    stat: "20+",
    statLabel: "studies per motif",
  },
  {
    phase: "02 — The Sourcing",
    title: "Material",
    text: "Rain-fed kala cotton, fine cambric, dyes mastered by eye under north light.",
    stat: "3",
    statLabel: "craft regions",
  },
  {
    phase: "03 — The Making",
    title: "Craft",
    text: "Teak blocks struck by hand; motifs lifted thread by thread. There is no fast version of this.",
    stat: "24–186",
    statLabel: "artisan-hours per piece",
  },
  {
    phase: "04 — The Examination",
    title: "Inspection",
    text: "Examined against light, edge to edge. What fails is never sold under the name.",
    stat: "100%",
    statLabel: "examined by hand",
  },
  {
    phase: "05 — The Signature",
    title: "Finishing",
    text: "Washed, sun-cured, pressed — numbered and certified before it leaves.",
    stat: "1 of few",
    statLabel: "numbered editions",
  },
] as const;

export const MANIFESTO = [
  "Mass production asks how fast a thing can be made.",
  "We ask how long a thing can be loved.",
  "Trends expire. Drawings endure.",
  "We make few things, slowly, so that each one can outlive us.",
] as const;

export const COLLECTOR_NOTES = [
  {
    quote:
      "I stopped thinking of it as a quilt the day I saw the printer's hand in the repeat — the slight drift of indigo at the border. It hangs in our bedroom like a painting we are allowed to sleep under.",
    name: "Private Collector",
    place: "New Delhi",
  },
  {
    quote:
      "My clients buy art for their walls without blinking. SROJA is the first house I have found that brings that same standard to what they actually live with.",
    name: "Interior Architect",
    place: "Dubai",
  },
  {
    quote:
      "The dossier arrived before the piece did — the sketches, the hours, the artisans' names. By the time the dohar came, it already had a biography.",
    name: "Collector",
    place: "London",
  },
] as const;

export const WORLD_CITIES = [
  { city: "Gurugram", role: "The Atelier", x: 66.5, y: 44 },
  { city: "Mumbai", role: "Collectors", x: 65, y: 50 },
  { city: "Dubai", role: "Interior Architects", x: 60, y: 46 },
  { city: "London", role: "Collectors", x: 46.5, y: 30 },
  { city: "Paris", role: "Design Advisors", x: 48.5, y: 32 },
  { city: "Milan", role: "Collectors", x: 50, y: 34 },
  { city: "New York", role: "Collectors", x: 27, y: 35 },
  { city: "Singapore", role: "Collectors", x: 76, y: 56 },
  { city: "Sydney", role: "Collectors", x: 88, y: 72 },
  { city: "Tokyo", role: "Collectors", x: 86, y: 38 },
] as const;

export const MATERIALS_LIB = [
  {
    key: "kala",
    name: "Kala Cotton",
    origin: "Kutch, Gujarat",
    note: "Indigenous, rain-fed, handspun. A short-staple cotton with a dry, living texture — the canvas of the Bhujodi loom.",
    image: img("1778764935406_iwtxps5smha.png"),
  },
  {
    key: "block",
    name: "Carved Teak Blocks",
    origin: "Rajasthan",
    note: "One block per colour, carved in mirror image. A complex motif can demand a fortnight of carving before a single impression is struck.",
    image: img("1778575721257_htsug72o4vf.webp"),
  },
  {
    key: "cambric",
    name: "Fine Cotton Cambric",
    origin: "Printing tables, Rajasthan",
    note: "Smooth, close-woven, thirsty for dye — chosen so florals sit on the surface like watercolour rather than ink.",
    image: img("1778664354807_msia342n03.webp"),
  },
  {
    key: "suiting",
    name: "Suiting Cotton",
    origin: "The Jharokha Collection",
    note: "A substantial drape with calm weight. Hung at a window it folds like a garment and edits daylight into grain.",
    image: img("1780558799984_l9nbwvhwjf8.png"),
  },
  {
    key: "chettinad",
    name: "Chettinad Checks",
    origin: "Tamil Nadu",
    note: "Yarn-dyed geometries beaten dense at the loom — olive, wine, marigold, rust. The palette of Karaikudi's painted mansions.",
    image: img("1778737621268_wl49d1fh08h.webp"),
  },
  {
    key: "indigo",
    name: "Deep Indigo & Madder",
    origin: "The dye masters",
    note: "Colour mastered in small vats against the original drawing. Indigo for depth, madder for warmth — tuned by eye, not by code.",
    image: img("1778664354453_6dqmk575fh7.webp"),
  },
] as const;

export const IPR_STATEMENT = {
  headline: "Original. Protected. Unrepeatable.",
  lines: [
    "Every SROJA design originates as an original work by Archit and is protected under Intellectual Property Rights.",
    "These designs cannot be replicated, reproduced, or commercially utilised without authorisation — which is precisely why owning one means owning something no one else can make.",
    "Each piece is released in a deliberately small edition, numbered, and accompanied by a certificate of authenticity signed by the house.",
  ],
};
