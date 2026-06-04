import type { ProcessStep } from "./types";

/**
 * Process builders — distribute a piece's total artisan-hours across the
 * named phases of its craft. Hours are editorial estimates set by the house;
 * adjust totals in each piece's entry and the breakdown follows.
 */

function distribute(total: number, weights: number[]): number[] {
  const raw = weights.map((w) => Math.round(total * w));
  const diff = total - raw.reduce((a, b) => a + b, 0);
  raw[raw.length - 1] += diff;
  return raw;
}

export function blockProcess(total: number, motif: string): ProcessStep[] {
  const h = distribute(total, [0.16, 0.22, 0.1, 0.32, 0.1, 0.1]);
  return [
    {
      phase: "The Drawing",
      detail: `Archit draws ${motif} by hand, refining the repeat until it breathes — the original work from which everything follows.`,
      hours: h[0],
    },
    {
      phase: "The Block",
      detail:
        "Master carvers translate the drawing into teak printing blocks — one block per colour, carved in mirror image.",
      hours: h[1],
    },
    {
      phase: "The Dye",
      detail:
        "Pigments are mastered in small batches against the original drawing, matched by eye under north light.",
      hours: h[2],
    },
    {
      phase: "The Impression",
      detail:
        "Printers walk the table striking each impression by hand. The slight drift between strikes is the signature of the craft.",
      hours: h[3],
    },
    {
      phase: "The Wash & Sun",
      detail:
        "Lengths are washed, sun-cured and rested so the colour settles into the fibre rather than sitting upon it.",
      hours: h[4],
    },
    {
      phase: "The Examination & Finish",
      detail:
        "Examined against light edge to edge, then cut, stitched, pressed and numbered. Pieces that do not pass are never sold under the name.",
      hours: h[5],
    },
  ];
}

export function quiltProcess(total: number, motif: string): ProcessStep[] {
  const h = distribute(total, [0.12, 0.16, 0.08, 0.26, 0.24, 0.06, 0.08]);
  return [
    {
      phase: "The Drawing",
      detail: `Archit draws ${motif}, composing field, border and corner as one architecture.`,
      hours: h[0],
    },
    {
      phase: "The Block",
      detail:
        "A family of teak blocks is carved — field, border, corner — each in mirror image, one per colour.",
      hours: h[1],
    },
    {
      phase: "The Dye",
      detail:
        "Pigments mastered in small vats against the drawing; indigo for depth, warm tones for the garden.",
      hours: h[2],
    },
    {
      phase: "The Impression",
      detail:
        "Metres of cotton are printed impression by impression, the printer's rhythm setting the cloth's heartbeat.",
      hours: h[3],
    },
    {
      phase: "The Layering & Quilting",
      detail:
        "Printed faces are layered with soft cotton filling and quilted through by hand-guided needle, line after line.",
      hours: h[4],
    },
    {
      phase: "The Wash & Sun",
      detail:
        "Washed and sun-rested so the quilt arrives already soft, already settled.",
      hours: h[5],
    },
    {
      phase: "The Examination & Finish",
      detail:
        "Examined against light, bound at the edges, pressed and numbered with its certificate.",
      hours: h[6],
    },
  ];
}

export function bhujodiProcess(total: number, motif: string): ProcessStep[] {
  const h = distribute(total, [0.12, 0.18, 0.15, 0.4, 0.07, 0.08]);
  return [
    {
      phase: "The Drawing",
      detail: `Archit composes ${motif} for the loom — geometry that must be buildable thread by thread.`,
      hours: h[0],
    },
    {
      phase: "The Spinning",
      detail:
        "Indigenous rain-fed kala cotton is handspun — a short-staple fibre with a dry, living texture no mill can imitate.",
      hours: h[1],
    },
    {
      phase: "The Warp",
      detail:
        "The loom is dressed by hand, hundreds of ends measured, tied and tensioned before a single pick is thrown.",
      hours: h[2],
    },
    {
      phase: "The Weave",
      detail:
        "Working the five-century-old Bhujodi tradition, the weaver lifts each motif as extra weft — thread by thread, by memory.",
      hours: h[3],
    },
    {
      phase: "The Wash",
      detail: "Washed and finished so the kala cotton relaxes into its soft, textured hand.",
      hours: h[4],
    },
    {
      phase: "The Examination & Finish",
      detail:
        "Examined, cut, finished and numbered. Each face carries the small irregularities that prove the hand.",
      hours: h[5],
    },
  ];
}

export function chettinadProcess(total: number, motif: string): ProcessStep[] {
  const h = distribute(total, [0.12, 0.18, 0.18, 0.38, 0.14]);
  return [
    {
      phase: "The Drawing",
      detail: `Archit sets ${motif} on paper first — proportions tuned like a façade.`,
      hours: h[0],
    },
    {
      phase: "The Yarn & Dye",
      detail:
        "Cotton yarns are dyed before weaving — the Chettinad way — so colour lives inside the cloth, not on it.",
      hours: h[1],
    },
    {
      phase: "The Warp",
      detail:
        "Warps are laid to the drawing's geometry, the check resolved at the loom before it exists in cloth.",
      hours: h[2],
    },
    {
      phase: "The Weave",
      detail:
        "Woven on handlooms and beaten dense for a calm, garment-like drape that holds its line for decades.",
      hours: h[3],
    },
    {
      phase: "The Examination & Finish",
      detail:
        "Examined against light, finished by hand — loops, hems, edges — then pressed and numbered.",
      hours: h[4],
    },
  ];
}
