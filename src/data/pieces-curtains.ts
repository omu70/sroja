import type { Piece } from "./types";
import { img } from "./site";
import { blockProcess, chettinadProcess } from "./process";

export const CURTAINS: Piece[] = [
  {
    slug: "handwoven-madras-checks-i",
    name: "Handwoven Madras Checks I",
    collection: "curtains",
    craft: "Chettinad Handweaving",
    region: "Tamil Nadu",
    price: 4299,
    hours: 58,
    artisans: 3,
    edition: { number: 10, of: 40 },
    materials: ["100% Cotton", "Handwoven checks", "Handcrafted loop details"],
    dimensions: "7 ft",
    description:
      "Woven cotton curtains with textured stripes and handcrafted loop details — soft, durable, designed to add warmth to everyday spaces.",
    designersNote:
      "Madras checks once travelled the world as the most copied cloth India ever made. Hanging them at a window returns them to where they are best read — backlit, so every crossing of yarn shows.",
    inspiration:
      "Sun through a handloom sari left to dry across a courtyard line.",
    story:
      "Woven by skilled artisans using traditional Chettinad techniques, this curtain is crafted from 100% cotton with textured, timeless character. Lightweight and breathable, it gently filters light while adding warmth, texture and understated elegance — finished for durability, softness and a natural drape that ages beautifully.",
    uniqueness:
      "Daylight is part of the design: each weave's small irregularities render differently at every hour.",
    process: chettinadProcess(58, "the Madras grid at window scale"),
    images: [
      img("1778755396443_ctvlrexcimm.png"),
      img("1778755396443_8jap5k98ywo.png"),
      img("1778755396444_qrjwtq2glkm.png"),
      img("1778755396444_h2i5ufalrx5.png"),
    ],
    palette: ["#5E6B3A", "#D9952B", "#8A4B2E"],
  },
  {
    slug: "handwoven-madras-checks-ii",
    name: "Handwoven Madras Checks II",
    collection: "curtains",
    craft: "Chettinad Handweaving",
    region: "Tamil Nadu",
    price: 4699,
    hours: 66,
    artisans: 3,
    edition: { number: 6, of: 40 },
    materials: ["100% Cotton", "Handwoven plaid", "Handcrafted loop details"],
    dimensions: "9 ft",
    description:
      "A play of earthy greens, marigold and deep rust — this plaid brings the warmth of Indian homes into a quiet, elevated space.",
    designersNote:
      "The nine-foot drop changes everything — the plaid stops being a pattern and becomes a wall of colour. I tuned the rust deeper for this length so evening light has something to burn against.",
    inspiration:
      "Painted mansion façades of Chettinad at golden hour.",
    story:
      "Woven by skilled artisans using traditional Chettinad techniques, this curtain is crafted from 100% cotton and defined by its textured plaid and timeless character. It gently filters light while adding warmth, texture and understated elegance — finished for durability and a graceful natural drape.",
    uniqueness:
      "At nine feet, the loom must hold the grid true across its longest run — each length is a sustained performance.",
    process: chettinadProcess(66, "the nine-foot plaid"),
    images: [
      img("1778755809426_dh0mv0ymqo7.png"),
      img("1778755809427_9z73gybpm4r.png"),
      img("1778755809428_lk0mhjzldtj.png"),
      img("1778755809428_zvk5jmte349.png"),
    ],
    palette: ["#5E6B3A", "#D9952B", "#8A4B2E"],
  },
  {
    slug: "rang-sutra-stripe-curtains",
    name: "Rang Sutra Stripe",
    collection: "curtains",
    craft: "Chettinad Handweaving",
    region: "Tamil Nadu",
    price: 4299,
    hours: 62,
    artisans: 3,
    edition: { number: 9, of: 40 },
    materials: ["100% Cotton", "Handwoven stripes", "Handcrafted loop details"],
    dimensions: "7 ft",
    description:
      "Rhythmic textured stripes with handcrafted loop details — movement, warmth and understated sophistication for any space.",
    designersNote:
      "Rang Sutra — the thread of colour. Stripes are weaving's oldest sentence, and I wanted to write it slowly: each band a register, like lines of a raga laid vertically against the light.",
    inspiration:
      "The vertical rhythm of a tanpura's strings — drone, interval, return.",
    story:
      "Woven by skilled artisans using traditional Chettinad techniques, the Rang Sutra curtain is distinguished by its textured stripes and handcrafted character. Each weave carries subtle variations that reflect the human hand behind it — rhythmic stripes and a light, breathable weave bringing movement and warmth.",
    uniqueness:
      "Each stripe is a separate warp decision — the curtain's rhythm is set thread by thread before weaving begins.",
    process: chettinadProcess(62, "the Rang Sutra registers"),
    images: [
      img("1778754809814_3tk2kt347wd.png"),
      img("1778754809815_jnirjut41bc.png"),
      img("1778754809815_xz7doxpeij.png"),
      img("1778754809815_uwezj3060vh.png"),
    ],
    palette: ["#8A4B2E", "#3E5C6B", "#D9B05A"],
  },
  {
    slug: "gulbagh-curtain-i",
    name: "Gulbagh I",
    collection: "curtains",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 2990,
    hours: 64,
    artisans: 3,
    edition: { number: 15, of: 40 },
    materials: ["100% Suiting Cotton", "Hand Block Print"],
    dimensions: "7 ft",
    description:
      "Rows of cypress trees and deep floral butas in a slow, rhythmic repeat on substantial suiting cotton — warmth and quiet character without ornament.",
    designersNote:
      "Gulbagh hangs cypresses in rows the way a garden plants them — patience made visible. I chose suiting cotton so the curtain falls with the calm weight of a coat, not the flutter of a veil.",
    inspiration:
      "The cypress avenues of Mughal gardens, drawn at walking pace.",
    story:
      "Hand block printed by skilled artisans on 100% suiting cotton, the Gulbagh curtain celebrates a craft passed down through generations. Each cypress and buta is stamped by hand using traditional wooden blocks — subtle variations making every length unique, framing your space with warmth, texture and timeless charm.",
    uniqueness:
      "Printing on substantial suiting cotton demands a heavier hand at every strike — fewer workshops attempt it.",
    process: blockProcess(64, "the cypress rows"),
    images: [
      img("1780558799983_85cyrfva0iu.png"),
      img("1780558799984_l9nbwvhwjf8.png"),
      img("1780558799984_ew1op2ag2hs.png"),
      img("1780558799984_24b6hxt9hcy.png"),
    ],
    palette: ["#3E4A3A", "#7B3B35", "#E5DCC6"],
  },
  {
    slug: "gulbagh-curtain-ii",
    name: "Gulbagh II",
    collection: "curtains",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 3499,
    hours: 72,
    artisans: 3,
    edition: { number: 11, of: 40 },
    materials: ["100% Suiting Cotton", "Hand Block Print"],
    dimensions: "9 ft",
    description:
      "The Gulbagh garden at its full nine-foot height — cypress rows and deep butas falling with calm, architectural weight.",
    designersNote:
      "At nine feet the cypresses finally stand life-size. This is the drop I drew the repeat for — the garden at the height you would walk through it.",
    inspiration:
      "Standing at the foot of a chinar-lined walk, looking up.",
    story:
      "Hand block printed by skilled artisans on 100% suiting cotton, the Gulbagh curtain celebrates a craft passed down through generations. Each motif is stamped by hand using traditional wooden blocks — soft, breathable, finished for durability and a natural drape that ages beautifully with use.",
    uniqueness:
      "Nine feet of registered hand printing — over a hundred strikes per length, each landed by eye.",
    process: blockProcess(72, "the full-height cypress garden"),
    images: [
      img("1780558886405_vzjwdqjybw.png"),
      img("1780558886405_ilu9hk0cxsk.png"),
      img("1780558886405_2yf91x0pv5o.png"),
      img("1780558886405_e1hyxx2fgz.png"),
    ],
    palette: ["#3E4A3A", "#7B3B35", "#E5DCC6"],
  },
  {
    slug: "mehr-gul-curtain-i",
    name: "Mehr Gul I",
    collection: "curtains",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 2990,
    hours: 60,
    artisans: 3,
    edition: { number: 13, of: 40 },
    materials: ["100% Suiting Cotton", "Hand Block Print"],
    dimensions: "7 ft",
    description:
      "Deep floral butas and slender cypress motifs on textured suiting cotton — old courtyards, softened light, homes that feel quietly lived in.",
    designersNote:
      "Mehr is kindness; gul is the rose. This curtain is about the quality of light in old houses — never bright, never dark, always forgiving. I drew the butas loose so the sun could finish them.",
    inspiration:
      "Late light through a Gurugram haveli door left ajar.",
    story:
      "Hand block printed by skilled artisans on 100% cotton, the Mehr Gul curtain celebrates a craft passed down through generations. Each floral motif is stamped by hand using traditional wooden blocks — inspired by blooming rose gardens, it gently filters light, bringing softness, warmth and quiet elegance.",
    uniqueness:
      "The loose-drawn butas read differently with every hour of sun — a design completed daily by daylight.",
    process: blockProcess(60, "the Mehr Gul roses and cypress"),
    images: [
      img("1780559048415_mzlqnc92zod.png"),
      img("1780559048415_pbfo77n20g.png"),
      img("1780559048415_8f2jmzq6jfy.png"),
      img("1780559048415_9dgd4t1bf0c.png"),
      img("1780559048415_bneodb2x4t9.png"),
    ],
    palette: ["#6E4A3B", "#9C5C46", "#EDE5D2"],
  },
  {
    slug: "mehr-gul-curtain-ii",
    name: "Mehr Gul II",
    collection: "curtains",
    craft: "Hand Block Printing",
    region: "Rajasthan",
    price: 3499,
    hours: 70,
    artisans: 3,
    edition: { number: 8, of: 40 },
    materials: ["100% Suiting Cotton", "Hand Block Print"],
    dimensions: "9 ft",
    description:
      "The Mehr Gul garden at nine feet — deep butas and slender cypresses filtering daylight into something older and softer.",
    designersNote:
      "For the taller drop I respaced the repeat by hand so the cypresses keep their patience over nine feet. The drawing took three weeks; the light does the rest.",
    inspiration:
      "Courtyard light measured in cypress shadows.",
    story:
      "Hand block printed by skilled artisans on 100% cotton suiting, the Mehr Gul curtain celebrates a craft passed down through generations — each motif stamped by hand, every length unique, designed to age beautifully while filtering light into warmth.",
    uniqueness:
      "A respaced repeat exclusive to the nine-foot edition — the same garden, grown taller.",
    process: blockProcess(70, "the respaced Mehr Gul repeat"),
    images: [
      img("1780559016566_t82lfhrar9.png"),
      img("1780559016566_3jkgabp2xkn.png"),
      img("1780559016566_3rd24wxmq2u.png"),
      img("1780559016566_kkhaioxda1g.png"),
      img("1780559016566_0x2pomchtsgr.png"),
    ],
    palette: ["#6E4A3B", "#9C5C46", "#EDE5D2"],
    featured: true,
  },
];
