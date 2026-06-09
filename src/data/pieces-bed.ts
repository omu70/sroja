// ------------------------------------------------------------------------
// Products: Bed Linens
//
// The bedsheet products and all their details.
// ------------------------------------------------------------------------

import type { Piece } from "./types";
import { img } from "./site";
import { blockProcess, quiltProcess } from "./process";

export const BED_LINENS: Piece[] = [
  {
    slug: "neel-gul-bagh-bedsheet-set",
    name: "Neel Gul Bagh",
    collection: "bed-linens",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 5100,
    hours: 74,
    artisans: 4,
    edition: { number: 6, of: 35 },
    materials: ["100% Cotton", "Hand Block Print", "Two hand-finished pillow covers"],
    dimensions: "King Size (108\" × 108\")",
    description:
      "A rhythmic hand block floral buta in deep indigo, red and green — a rich, garden-inspired elegance for everyday living.",
    designersNote:
      "A bedsheet is the largest canvas in any home — nine feet of drawing you live inside. Neel Gul Bagh is my night garden: indigo carrying the field, red and green flowering through it at intervals I marked out on the atelier floor.",
    inspiration:
      "Mughal garden charbaghs at night — geometry you sense more than see.",
    story:
      "Crafted from 100% cotton and hand block printed by skilled artisans, Neel Gul Bagh brings together traditional craftsmanship and everyday comfort. Each motif is carefully stamped by hand using carved wooden blocks, creating subtle variations that make every piece unique — finished for durability, softness and breathability, and designed to become more comfortable with time.",
    uniqueness:
      "Across a king-size field the printer strikes the buta more than a thousand times — and no two strikes are the same.",
    process: blockProcess(74, "the night-garden buta"),
    images: [
      img("1778664354203_6fvq1j5r378.webp"),
      img("1778664354453_6dqmk575fh7.webp"),
      img("1778664354807_msia342n03.webp"),
      img("1778664355040_pegfu51ks0t.webp"),
      img("1778664355339_fuay1smhlqm.webp"),
    ],
    palette: ["#2E4A6B", "#A0392E", "#4E6B4A"],
    featured: true,
  },
  {
    slug: "gulbaag-buti-quilted-bedsheet-set",
    name: "Gulbaag Buti",
    collection: "bed-linens",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 5999,
    hours: 118,
    artisans: 4,
    edition: { number: 4, of: 30 },
    materials: ["100% Cotton", "Hand Block Print", "Hand-guided quilting"],
    dimensions: "King Size (108\" × 108\")",
    description:
      "A quilted bedspread with delicate floral buti in soothing tones — lightweight, breathable, made for everyday comfort.",
    designersNote:
      "Gulbaag Buti is printed first and quilted after, so the needle has to negotiate with the flower. Watching our quilters trace around each buti without breaking its line is the closest thing the atelier has to a duet.",
    inspiration:
      "Petals under fresh snow — pattern softened by a second surface.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, the Gulbaag Buti set celebrates a craft passed down through generations. Each motif is stamped by hand using traditional wooden blocks, then thoughtfully quilted for added comfort — subtle variations making every piece unique, finished with attention to detail for lasting durability.",
    uniqueness:
      "Print and quilting interact differently on every piece — the needle's path is plotted around each unique impression.",
    process: quiltProcess(118, "the Gulbaag buti and its quilting grid"),
    images: [
      img("1780558625719_l3hosic40q.png"),
      img("1780558625719_vupmsvlewh.png"),
      img("1780558625719_96lopitux0s.png"),
      img("1780558625719_vr8i73erg0l.png"),
      img("1780558625719_ogn5p1a5yib.png"),
    ],
    palette: ["#C98030", "#6E7B5A", "#F2EBDD"],
  },
  {
    slug: "neel-baagh-palm-bedsheet-set",
    name: "Neel Baagh Palm",
    collection: "bed-linens",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 5100,
    hours: 78,
    artisans: 4,
    edition: { number: 12, of: 35 },
    materials: ["100% Cotton", "Hand Block Print", "Two hand-finished pillow covers"],
    dimensions: "King Size (108\" × 108\")",
    description:
      "Hand-drawn palm buti motifs in calming blue tones — lightweight, breathable, made for everyday comfort.",
    designersNote:
      "I drew these palms from memory after a week on the Konkan coast — not botanical studies, but the after-image you keep when you close your eyes. Blue, because memory cools everything it keeps.",
    inspiration:
      "Coastal palm groves at first light, their rhythm more than their likeness.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, the Neel Baagh Palm set celebrates a craft passed down through generations. Each palm is carefully stamped by hand using traditional wooden blocks, creating subtle variations that make every piece unique — freshness, character and timeless craftsmanship for the bedroom.",
    uniqueness:
      "Every palm leans slightly differently — a grove, not a pattern. The hand cannot plant the same tree twice.",
    process: blockProcess(78, "the palm grove repeat"),
    images: [
      img("1778666128383_bepmwck1w3.webp"),
      img("1778666128588_nnmdhwxc6s.webp"),
      img("1778666128789_usjo31cfu4e.webp"),
      img("1778666129140_ozarmovcfde.webp"),
      img("1778666129390_luic89hward.webp"),
    ],
    palette: ["#3E5C7B", "#9CB0BC", "#F2EDE0"],
  },
  {
    slug: "gulab-vana-jaal-bedsheet-set",
    name: "Gulab Vana Jaal",
    collection: "bed-linens",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 5100,
    hours: 82,
    artisans: 4,
    edition: { number: 9, of: 35 },
    materials: ["100% Cotton", "Hand Block Print", "Two hand-finished pillow covers"],
    dimensions: "King Size (108\" × 108\")",
    description:
      "A delicate hand block floral jaal in blush pink and sage green — calm, earthy elegance for everyday living.",
    designersNote:
      "A jaal is a net of flowers — the most unforgiving structure in block printing, because every impression must hold hands with the next. Gulab Vana took the longest to resolve on paper and remains the drawing I am proudest of.",
    inspiration:
      "Rose creepers netted across a trellis in an old rose farm outside Pushkar.",
    story:
      "A soft, breathable cotton bedsheet featuring a delicate hand block floral jaal in blush pink and sage green — printed by hand, impression by impression, so the net of roses joins seamlessly across nine feet of cloth. Subtle variations in the join are the printer's signature, crafted to bring calm, earthy elegance into everyday living.",
    uniqueness:
      "In a jaal, each impression must register against four neighbours — the highest difficulty in the printer's art.",
    process: blockProcess(82, "the rose jaal lattice"),
    images: [
      img("1778663419843_mdkfovenk1d.webp"),
      img("1778663420061_kqkoad7ppps.webp"),
      img("1778663420313_yadzjgex8gc.webp"),
      img("1778663420501_6wmdnkebrjh.webp"),
    ],
    palette: ["#C98A92", "#8FA08A", "#F4EEE2"],
  },
];
