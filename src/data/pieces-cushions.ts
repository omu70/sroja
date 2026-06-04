import type { Piece } from "./types";
import { img } from "./site";
import { blockProcess, bhujodiProcess, chettinadProcess } from "./process";

export const CUSHIONS: Piece[] = [
  {
    slug: "gul-meher-cushion-cover",
    name: "Gul Meher",
    collection: "cushions",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 990,
    hours: 24,
    artisans: 3,
    edition: { number: 7, of: 50 },
    materials: ["100% Cotton", "Hand Block Print", "Natural-tone pigments"],
    dimensions: "16\" × 16\"",
    description:
      "A delicately hand block printed floral buta in blush and teal, framed by a detailed border — quiet, refined elegance for the sitting room.",
    designersNote:
      "Gul Meher began as a margin sketch — a single flower I kept redrawing until it stopped being a flower and became a rhythm. I wanted blush and teal to sit together the way they do at dusk: improbable, and then inevitable.",
    inspiration:
      "Dusk light on a Jaipur courtyard wall — the hour when pink masonry and deep shade agree with each other.",
    story:
      "Crafted from 100% cotton and hand block printed by artisans, Gul Meher celebrates a centuries-old craft in which every motif is stamped by hand using carved wooden blocks. The slight variations in print are the mark of authentic craftsmanship, making each cushion one of a kind — soft, breathable, and made to carry timeless pattern, warmth and character.",
    uniqueness:
      "No two impressions of the Gul Meher buta land identically. Each cover is a unique print, traceable to its edition number.",
    process: blockProcess(24, "the Gul Meher buta"),
    images: [
      img("1778575720825_4pl3lngkkex.webp"),
      img("1778575721257_htsug72o4vf.webp"),
      img("1778575721525_euljttos1hs.webp"),
      img("1778575721813_0yi17j082ma.webp"),
    ],
    palette: ["#C98A8A", "#4E7B74", "#EFE6D8"],
  },
  {
    slug: "baagh-check-cushion",
    name: "Baagh Check",
    collection: "cushions",
    craft: "Chettinad Handweaving",
    region: "Tamil Nadu",
    price: 1990,
    hours: 32,
    artisans: 2,
    edition: { number: 11, of: 40 },
    materials: ["100% Cotton", "Yarn-dyed handwoven checks"],
    dimensions: "16\" × 16\"",
    description:
      "Earthy checks in olive, wine and warm neutrals — easy, familiar and comforting, like something you have always had, but somehow better.",
    designersNote:
      "Checks are the most democratic pattern in India — every railway blanket, every verandah chair. With Baagh I wanted to take that familiarity and tune it like a chord: olive against wine, weighted so the eye rests.",
    inspiration:
      "The painted lime walls and tiled floors of Chettinad mansions, reduced to a woven grid.",
    story:
      "Woven by skilled artisans using traditional Chettinad techniques, the Baagh Check cushion is defined by its timeless checks and handcrafted character. Each weave carries subtle variations that reflect the human hand behind it. Thoughtfully finished for durability and softness, it is designed to age beautifully — bringing a relaxed, lived-in warmth to any space.",
    uniqueness:
      "Yarn-dyed and handwoven, each face carries its own micro-variations in beat and tension — a fingerprint in cloth.",
    process: chettinadProcess(32, "the Baagh grid"),
    images: [
      img("1778737621268_bk5knbhj74e.webp"),
      img("1778737621268_wl49d1fh08h.webp"),
      img("1778737621268_q9lxch0hal.webp"),
      img("1778737621268_su0qoyjths.webp"),
      img("1778737621268_v69kdpprmc.webp"),
    ],
    palette: ["#6B6B3A", "#7B3B47", "#D9CDB8"],
  },
  {
    slug: "kendra-bhujodi-cushion",
    name: "Kendra Bhujodi",
    collection: "cushions",
    craft: "Bhujodi Handweaving",
    region: "Kutch, Gujarat",
    price: 3900,
    hours: 68,
    artisans: 3,
    edition: { number: 5, of: 25 },
    materials: ["Handspun Kala Cotton", "Extra-weft Bhujodi weave"],
    dimensions: "16\" × 16\"",
    description:
      "A bold central motif against handspun kala cotton, balanced with fine lines and small details — structured yet easy, a piece that quietly holds the room together.",
    designersNote:
      "Kendra means centre. I drew one strong form and then spent weeks taking things away from around it. On the loom, restraint is the hardest thing to weave.",
    inspiration:
      "The single bindu of Indian geometry — one point from which the whole composition radiates.",
    story:
      "Handwoven in Kutch using a 500-year-old Bhujodi weaving tradition, Kendra is crafted from authentic kala cotton by artisans whose knowledge has been passed down through generations. Every weave carries subtle variations that reflect the human hand behind it, celebrating a rare textile heritage while adding warmth, texture and timeless character.",
    uniqueness:
      "Each motif is lifted thread by thread as extra weft — woven by memory, not by machine. No two faces can ever match.",
    process: bhujodiProcess(68, "the Kendra medallion"),
    images: [
      img("1778737972859_5bv8e4f6bk6.webp"),
      img("1778737972859_ldqlv7aqiem.webp"),
      img("1778737972859_aqf11yfrr4.webp"),
      img("1778737972859_sy858sq1nx9.webp"),
    ],
    palette: ["#E8E0CE", "#8A3B2E", "#27333D"],
    featured: true,
  },
  {
    slug: "gulnaar-baagh-cushion-cover",
    name: "Gulnaar Baagh",
    collection: "cushions",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 990,
    hours: 26,
    artisans: 3,
    edition: { number: 14, of: 50 },
    materials: ["100% Cotton", "Hand Block Print"],
    dimensions: "16\" × 16\"",
    description:
      "A paneled arrangement of hand block floral buta in deep maroon and muted greens — old-world charm with intricate detailing and balanced composition.",
    designersNote:
      "Gulnaar is my homage to heritage garden textiles — the panelled florals you find in old havelis, faded to perfection. I drew it as if it had already lived eighty years.",
    inspiration:
      "Pressed flowers between the pages of an old account book — colour kept, time stopped.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, Gulnaar Baagh brings together traditional craftsmanship and timeless design. Each floral motif is carefully stamped by hand using carved wooden blocks, creating subtle variations that make every piece unique — inspired by the charm of old gardens in bloom and designed to be cherished for years.",
    uniqueness:
      "The panelled repeat means every cover crops the garden differently — each one a unique view through the same gate.",
    process: blockProcess(26, "the Gulnaar panels"),
    images: [
      img("1778665104407_e4ocxwu7ums.webp"),
      img("1778665104634_vr2k9kg8cn.webp"),
      img("1778665104895_nv6xbrfwarg.webp"),
      img("1778665105231_sex2fihe04n.webp"),
    ],
    palette: ["#6E2F35", "#5E6B4A", "#EBE2CF"],
  },
  {
    slug: "chaap-bhujodi-cushion",
    name: "Chaap Bhujodi",
    collection: "cushions",
    craft: "Bhujodi Handweaving",
    region: "Kutch, Gujarat",
    price: 2990,
    hours: 54,
    artisans: 3,
    edition: { number: 9, of: 25 },
    materials: ["Handspun Kala Cotton", "Extra-weft Bhujodi weave"],
    dimensions: "16\" × 13\"",
    description:
      "Small woven chaaps sit gently across handspun kala cotton — balanced, minimal, quietly detailed, with an easy rhythm of craft.",
    designersNote:
      "Chaap means stamp, an imprint. I scattered the smallest possible marks across the cloth and let the kala cotton do the talking. It is the quietest piece in the collection, and the one I keep on my own chair.",
    inspiration:
      "Footprints across morning sand in the Rann — small marks, immense field.",
    story:
      "Handwoven in Kutch using the 500-year-old Bhujodi tradition, Chaap is crafted from authentic kala cotton by artisans whose knowledge has been passed down through generations. Every weave carries subtle variations that reflect the human hand behind it — a rare textile heritage, finished for durability, softness and breathability.",
    uniqueness:
      "Each chaap is placed by the weaver's hand and eye. The intervals are human — which is to say, unrepeatable.",
    process: bhujodiProcess(54, "the scattered chaap marks"),
    images: [
      img("1778737855890_axfsle9io7k.webp"),
      img("1778737855890_n4k922ki6h.webp"),
      img("1778737855890_npqqwh7ox7.webp"),
      img("1778737855890_a4y7tg11rcf.webp"),
    ],
    palette: ["#E9E1CF", "#39424E", "#9C4633"],
  },
  {
    slug: "lehar-bhujodi-cushion",
    name: "Lehar Bhujodi",
    collection: "cushions",
    craft: "Bhujodi Handweaving",
    region: "Kutch, Gujarat",
    price: 4900,
    hours: 72,
    artisans: 3,
    edition: { number: 4, of: 25 },
    materials: ["Handspun Kala Cotton", "Extra-weft Bhujodi weave"],
    dimensions: "27\" × 14\"",
    description:
      "Soft lines and small woven details flow across handspun kala cotton in a gentle, easy rhythm — light, relaxed, made to live with.",
    designersNote:
      "Lehar is a wave. On a long lumbar face the weave can actually travel, so I drew a current — lines that rise and settle the way water does when nobody is watching.",
    inspiration:
      "The long horizontals of the Kutch horizon — land, salt, sky — translated into weft.",
    story:
      "Handwoven in Kutch using the 500-year-old Bhujodi tradition, Lehar is crafted from authentic kala cotton by artisans whose knowledge has been passed down through generations. Every weave carries subtle variations that reflect the human hand behind it — warmth, texture and timeless character for the modern room.",
    uniqueness:
      "The long format demands days of continuous, even handweaving — a discipline very few looms still keep.",
    process: bhujodiProcess(72, "the Lehar current"),
    images: [
      img("1778738113770_2btgcpahxut.webp"),
      img("1778738113770_ah49kvg9x89.webp"),
      img("1778738113770_l4jvxmmj7vs.webp"),
      img("1778738113770_2mjiasuy67.webp"),
    ],
    palette: ["#E7DFCC", "#46505C", "#7A5C3E"],
  },
  {
    slug: "rekha-bhujodi-cushion",
    name: "Rekha Bhujodi",
    collection: "cushions",
    craft: "Bhujodi Handweaving",
    region: "Kutch, Gujarat",
    price: 2990,
    hours: 48,
    artisans: 3,
    edition: { number: 13, of: 25 },
    materials: ["Handspun Kala Cotton", "Extra-weft Bhujodi weave"],
    dimensions: "12\" × 12\"",
    description:
      "Fine lines and small woven motifs on handspun kala cotton — understated, but full of detail, with a quiet rhythm that sits easily anywhere.",
    designersNote:
      "Rekha is a line — the first mark every designer ever makes. I wanted a small square that rewards the second look: from across the room it is calm; in the hand it is a city of detail.",
    inspiration:
      "Ruled notebook pages and the discipline of the drawn line.",
    story:
      "Handwoven in Kutch using the 500-year-old Bhujodi tradition, Rekha is crafted from authentic kala cotton by artisans whose knowledge has been passed down through generations. Every weave carries subtle variations that reflect the human hand behind it — heritage, texture and character in a compact face.",
    uniqueness:
      "At twelve inches, the weaver's tolerances are at their finest — each face is a miniature, signed in thread.",
    process: bhujodiProcess(48, "the Rekha lines"),
    images: [
      img("1778737749763_3mdxk4s5a1b.webp"),
      img("1778737749763_oq821hhv2n.webp"),
      img("1778737749763_68czu5t11h7.webp"),
      img("1778737749763_yw3ikzybap.webp"),
    ],
    palette: ["#E9E1CF", "#2F3A46", "#8A6B4A"],
  },
  {
    slug: "rangrez-baithak-cushion",
    name: "Rangrez Baithak",
    collection: "cushions",
    craft: "Chettinad Handweaving",
    region: "Tamil Nadu",
    price: 1990,
    hours: 34,
    artisans: 2,
    edition: { number: 8, of: 40 },
    materials: ["100% Cotton", "Yarn-dyed handwoven plaid"],
    dimensions: "16\" × 16\"",
    description:
      "Marigold, teal and deep wine in a structured plaid — rooted in the colour stories of Indian homes, familiar yet elevated.",
    designersNote:
      "Rangrez means the dyer — the man who decides what a street wears. This plaid is my portrait of him: marigold for festival mornings, wine for the evening, teal for everything in between.",
    inspiration:
      "Dye vats drying in a Chettinad courtyard, colour by colour, in rows.",
    story:
      "Woven by skilled artisans using traditional Chettinad techniques, Rangrez Baithak is crafted from 100% cotton with textured checks and handcrafted detail. Each weave carries subtle variations that reflect the human hand behind it — a rich weaving heritage finished for warmth, texture and character.",
    uniqueness:
      "Yarn-dyed before the loom, the colour is structural — woven in, not printed on — and each crossing lands by hand.",
    process: chettinadProcess(34, "the Rangrez plaid"),
    images: [
      img("1778764482908_yi4hqc3ma.png"),
      img("1778764482911_xkftym54s2k.png"),
      img("1778764482912_gsccvtwo5fu.png"),
      img("1778764482912_q0erqnio0na.png"),
    ],
    palette: ["#D9952B", "#3E6B66", "#6E2F3B"],
  },
  {
    slug: "reva-bhujodi-cushion",
    name: "Reva Bhujodi",
    collection: "cushions",
    craft: "Bhujodi Handweaving",
    region: "Kutch, Gujarat",
    price: 6499,
    hours: 86,
    artisans: 4,
    edition: { number: 3, of: 20 },
    materials: ["Handspun Kala Cotton", "Natural undyed base", "Indigo & madder tones"],
    dimensions: "16\" × 16\"",
    description:
      "Fine linear detailing and minimal geometric motifs in deep indigo and madder, set against a natural undyed base — quiet, intentional, full of craft.",
    designersNote:
      "Reva is the old name of the Narmada — a river that carves slowly and permanently. This is the most demanding face in the Baithak collection: nearly ninety hours for one cushion. I refused to simplify it.",
    inspiration:
      "River-carved stone at Bhedaghat — soft lines cut by patient force.",
    story:
      "Handwoven in Kutch using the 500-year-old Bhujodi tradition, Reva is crafted from authentic kala cotton by artisans whose knowledge has been passed down through generations. Set against a natural, undyed base, its geometry feels quiet yet intentional — warmth, craft and restraint in equal measure.",
    uniqueness:
      "The undyed kala ground means the cotton's own colour — grown, not dyed — is part of the design. No batch repeats.",
    process: bhujodiProcess(86, "the Reva geometry"),
    images: [
      img("1778764935405_7ewoq21c7t8.png"),
      img("1778764935405_3pjnf41enkv.png"),
      img("1778764935406_iwtxps5smha.png"),
      img("1778764935406_rlpb3bze86.png"),
      img("1778764935406_jkl6yg35xa.png"),
    ],
    palette: ["#2C3A52", "#94402F", "#EFE8D7"],
    featured: true,
  },
  {
    slug: "neel-gul-bagh-cushion-cover",
    name: "Neel Gul Bagh",
    collection: "cushions",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 990,
    hours: 24,
    artisans: 3,
    edition: { number: 18, of: 50 },
    materials: ["100% Cotton", "Hand Block Print", "Soft ivory base"],
    dimensions: "16\" × 16\"",
    description:
      "Traditional hand block printing on a soft ivory base — each piece carrying the slight variations, the marks of the artisan's hand, that make it one of a kind.",
    designersNote:
      "Neel Gul Bagh is the blue garden — the companion piece to our bedsheet of the same name. I like a room where the bed and the chair speak the same language at different volumes.",
    inspiration:
      "Indigo florals climbing an ivory wall — the garden at its coolest hour.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, Neel Gul Bagh celebrates a craft passed down through generations. Each floral motif is carefully stamped by hand using traditional wooden blocks, creating subtle variations that make every piece unique — warmth, colour and timeless craftsmanship for the living space.",
    uniqueness:
      "Printed in the same block family as the Shayan bedsheet — letting collectors compose a room from one drawing.",
    process: blockProcess(24, "the blue garden buta"),
    images: [
      img("1778765884275_uxwxg7hjgi.png"),
      img("1778765884275_gzyp91xrvck.png"),
      img("1778765884276_79pxtyscuj2.png"),
    ],
    palette: ["#2E4A6B", "#A0392E", "#F0EADB"],
  },
];
