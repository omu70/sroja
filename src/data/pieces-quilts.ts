import type { Piece } from "./types";
import { img } from "./site";
import { quiltProcess, chettinadProcess } from "./process";

export const QUILTS: Piece[] = [
  {
    slug: "genda-baagh-quilt",
    name: "Genda Baagh",
    collection: "quilts",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 8499,
    hours: 142,
    artisans: 5,
    edition: { number: 5, of: 20 },
    materials: ["100% Cotton", "Hand Block Print", "Soft cotton filling"],
    dimensions: "Queen Size (90\" × 108\")",
    description:
      "Vibrant marigold buti motifs with detailed borders — lightweight, breathable, made for everyday comfort.",
    designersNote:
      "Genda — the marigold — is the flower India gives away most freely and values least. I wanted to reverse that: to print it with the care usually reserved for roses, and quilt it into something kept for decades.",
    inspiration:
      "Strings of marigold over a doorway on a festival morning, before the first guest arrives.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, the Genda Baagh quilt celebrates a craft passed down through generations. Each marigold is stamped by hand using traditional wooden blocks, then layered and quilted for lasting comfort — subtle variations making every quilt unique, inspired by blooming marigold gardens.",
    uniqueness:
      "Each quilt passes through five pairs of hands — carver, dyer, printer, quilter, finisher — and carries traces of each.",
    process: quiltProcess(142, "the marigold field and its borders"),
    images: [
      img("1778737274664_yub5h5gqtno.webp"),
      img("1778737274664_pn4aiafoyzm.webp"),
      img("1778737274664_0toax9121o2p.webp"),
      img("1778737274664_l5dsoh6xvl.webp"),
      img("1778737274664_8gw7ztjkiw.webp"),
      img("1778737274664_x57pt1tjjy.webp"),
    ],
    palette: ["#D99A2B", "#B0452F", "#F0E8D6"],
  },
  {
    slug: "neel-jaali-palm-quilt",
    name: "Neel Jaali Palm",
    collection: "quilts",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 8499,
    hours: 138,
    artisans: 5,
    edition: { number: 8, of: 20 },
    materials: ["100% Cotton", "Hand Block Print", "Soft cotton filling"],
    dimensions: "Queen (90\" × 108\") · King (108\" × 108\")",
    description:
      "Palm motifs set in a delicate jaali pattern — lightweight, breathable, made for everyday comfort.",
    designersNote:
      "A jaali is a screen that lets the breeze through but keeps the sun honest. Setting palms inside that lattice felt like drawing a verandah you can sleep under.",
    inspiration:
      "Carved stone jaalis of Fatehpur Sikri, their shadows moving across the floor.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, the Neel Jaali Palm quilt celebrates a craft passed down through generations. Each palm is stamped by hand within its lattice using traditional wooden blocks, creating subtle variations that make every quilt unique — designed for everyday living while preserving the beauty of handmade textiles.",
    uniqueness:
      "Lattice and palm are separate blocks, registered by eye — their meeting is decided by the printer's hand on each strike.",
    process: quiltProcess(138, "the palm jaali"),
    images: [
      img("1778672752253_jkynzm0917k.webp"),
      img("1778672752253_enbdhlr1mw6.webp"),
      img("1778672752253_zlcs0no9ysl.webp"),
      img("1778672752253_z7sqat4o3v.webp"),
    ],
    palette: ["#3A5570", "#7BA08F", "#F0EADB"],
  },
  {
    slug: "zareen-gul-quilt",
    name: "Zareen Gul",
    collection: "quilts",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 8499,
    hours: 156,
    artisans: 5,
    edition: { number: 3, of: 20 },
    materials: ["100% Cotton", "Hand Block Print", "Rich teal border", "Light padding"],
    dimensions: "King Size (108\" × 108\")",
    description:
      "A timeless floral quilt finished with a rich teal border inspired by classic Indian textiles — lightly padded for all-season comfort.",
    designersNote:
      "Zareen means golden, and the gold here is in the discipline: a classical floral held inside a teal frame, like a miniature painting given a wall of its own. It is the most traditional drawing I have released — on purpose.",
    inspiration:
      "The borders of Pahari miniature paintings — the frame as important as the scene.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, Zareen Gul celebrates traditional craftsmanship and timeless floral design. Each motif is stamped by hand using carved wooden blocks, then lightly padded and finished with a deep teal border — subtle variations making every quilt unique, with warmth, elegance and enduring charm.",
    uniqueness:
      "Field, border and corner come from separate carved blocks — their alignment on each quilt is a one-time performance.",
    process: quiltProcess(156, "the Zareen floral field and teal frame"),
    images: [
      img("1778766030472_lw5s61l5pxa.png"),
      img("1778766030472_3zdsc4q5cyn.png"),
      img("1778766030472_0zpgvlmnwt5d.png"),
      img("1778766030472_cru7g3ut4lq.png"),
    ],
    palette: ["#2F6B66", "#B0452F", "#F0E8D6"],
    featured: true,
  },
  {
    slug: "neel-rekha-quilt",
    name: "Neel Rekha",
    collection: "quilts",
    craft: "Chettinad Handweaving",
    region: "Tamil Nadu",
    price: 16499,
    hours: 186,
    artisans: 5,
    edition: { number: 2, of: 15 },
    materials: ["100% Cotton, handwoven", "Yarn-dyed indigo lines", "Soft lavender ground"],
    dimensions: "Queen Size (90\" × 108\")",
    description:
      "A soft lavender base carrying a bold indigo rhythm — an ode to simplicity in Indian textiles, lightly textured and breathable, designed for comfort without excess.",
    designersNote:
      "Neel Rekha is one hundred and eighty-six hours of restraint. A woven quilt, not a printed one — the indigo lines are built into the cloth the way a draughtsman commits ink. It is the piece I would save first.",
    inspiration:
      "A single blue line drawn without lifting the pen — the confidence of the first mark.",
    story:
      "Woven by skilled artisans using traditional Chettinad techniques, Neel Rekha is crafted from 100% cotton and defined by its understated design and handcrafted character. Each weave carries subtle variations that reflect the human hand behind it — clean lines, gentle texture and timeless appeal, quilted for lasting comfort.",
    uniqueness:
      "The entire quilt is woven before it is quilted — one hundred and eighty-six artisan-hours in a single object. The house's most demanding piece.",
    process: chettinadProcess(150, "the indigo rekha").concat([
      {
        phase: "The Quilting",
        detail: "Quilted through by hand — stitching hidden inside the line-work.",
        hours: 36,
      },
    ]),
    images: [
      img("1778767833856_zyu279v552.png"),
      img("1778767833856_4t842ktzits.png"),
      img("1778767833856_kbmvpoo8yap.png"),
      img("1778767833856_jywp0usf4x.png"),
    ],
    palette: ["#C9C4D4", "#2E3E6B", "#EFEAE0"],
    featured: true,
  },
  {
    slug: "gulnaar-heritage-quilt",
    name: "Gulnaar Heritage",
    collection: "quilts",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 8499,
    hours: 162,
    artisans: 5,
    edition: { number: 6, of: 20 },
    materials: ["100% Cotton", "Hand Block Print", "Intricate borders"],
    dimensions: "108\" × 108\"",
    description:
      "A deep, vintage floral story on soft cotton with intricate borders — light, breathable, timeless in feel.",
    designersNote:
      "Heritage is not a style; it is a debt. Gulnaar Heritage repays it — the deepest, most layered printing we do, four colours struck in sequence, each waiting for the last to dry. Nothing about it can be hurried, which is the point.",
    inspiration:
      "A great-grandmother's trousseau chest, opened once a year.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, the Gulnaar Heritage quilt celebrates traditional craftsmanship and timeless design. Each floral motif is stamped by hand using carved wooden blocks — vintage florals in deep tones, subtle variations making every quilt unique, with warmth, elegance and enduring charm.",
    uniqueness:
      "Four separate colour blocks must land in register on every motif — printed wet-on-dry across days, not minutes.",
    process: quiltProcess(162, "the heritage florals, four blocks deep"),
    images: [
      img("1778737451476_k2vfqt1dtk.webp"),
      img("1778737451476_p9frl3560zi.webp"),
      img("1778737451476_cpc7khpjn3q.webp"),
      img("1778737451477_laqrd4uiih.webp"),
      img("1778737451477_eulhnedxfs.webp"),
    ],
    palette: ["#5E2F35", "#3E5546", "#E8DFC9"],
  },
];
