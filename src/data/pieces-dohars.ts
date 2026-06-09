// ------------------------------------------------------------------------
// Products: Dohars
//
// The dohar (light blanket) products and all their details.
// ------------------------------------------------------------------------

import type { Piece } from "./types";
import { img } from "./site";
import { chettinadProcess } from "./process";

export const DOHARS: Piece[] = [
  {
    slug: "charcoal-line-dohar",
    name: "Charcoal Line",
    collection: "dohars",
    craft: "Chettinad Handweaving",
    region: "Tamil Nadu",
    price: 15499,
    hours: 96,
    artisans: 4,
    edition: { number: 4, of: 18 },
    materials: ["100% Handwoven Cotton", "Reinforced edges"],
    dimensions: "Queen Size (65\" × 90\")",
    description:
      "A textured charcoal base with a single line running across — almost a quiet pause in the fabric. It drapes softly, holds its shape, and settles into the room without asking for attention.",
    designersNote:
      "One line. That is the entire design, and it took the longest to approve. On a charcoal field, a single pale line has nowhere to hide — the weave itself becomes the subject. This is SROJA at its most architectural.",
    inspiration:
      "The horizon at four a.m. — one pale seam between two darknesses.",
    story:
      "Handwoven by skilled artisans using 100% cotton, the Charcoal Line dohar celebrates the beauty of simplicity and thoughtful craftsmanship. Every weave carries subtle variations that reflect the human hand behind it. Lightweight, breathable and exceptionally soft, it is designed for year-round comfort and finished with reinforced edges for lasting durability.",
    uniqueness:
      "A solid handwoven field is the hardest surface to keep even — every pick visible, every correction recorded in cloth.",
    process: chettinadProcess(96, "the single pale line"),
    images: [
      img("1780559338807_6vh68ihzqx4.png"),
      img("1780559338807_s9m7prm5nv.png"),
      img("1780559338807_6rpgr3jc9tb.png"),
      img("1780559338807_mma6f1bgdc.png"),
      img("1780559338807_4n9g07m3nv4.png"),
    ],
    palette: ["#3A3733", "#B9B2A6", "#8A4B3A"],
    featured: true,
  },
  {
    slug: "baagh-check-dohar",
    name: "Baagh Check",
    collection: "dohars",
    craft: "Chettinad Handweaving",
    region: "Tamil Nadu",
    price: 15499,
    hours: 104,
    artisans: 4,
    edition: { number: 7, of: 18 },
    materials: ["100% Cotton", "Yarn-dyed handwoven checks"],
    dimensions: "Queen Size (65\" × 90\")",
    description:
      "Warm checks in rich, earthy tones — light enough for everyday use, cosy enough to curl into. Familiar, lived-in warmth for your space.",
    designersNote:
      "The dohar is the most intimate format we make — it touches more than it is seen. I scaled the Baagh grid up until it breathed at body distance, then had it beaten soft enough to forget.",
    inspiration:
      "An afternoon verandah in Karaikudi, the fan slow, the light in squares.",
    story:
      "Woven by skilled artisans using traditional Chettinad techniques, the Baagh Check dohar is crafted from 100% cotton — timeless checks with handcrafted character. Lightweight, breathable and exceptionally soft, it is designed for year-round comfort, finished with care for lasting durability, rooted in a rich weaving heritage.",
    uniqueness:
      "Yarn-dyed and handwoven at full dohar width — a loom discipline few workshops still attempt at this scale.",
    process: chettinadProcess(104, "the full-width Baagh grid"),
    images: [
      img("1780559170135_celf7b5sge.png"),
      img("1780559170135_q20xg8hcq8.png"),
      img("1780559170136_tff0a4w8eds.png"),
      img("1780559170136_n4s9n468i3a.png"),
      img("1780559170136_0y6wtqc6chma.png"),
      img("1780559170136_0cwgoymyrzbr.png"),
    ],
    palette: ["#7B5C3A", "#9C4633", "#D9CDB8"],
  },
];
