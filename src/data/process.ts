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
    { phase: "The Drawing", detail: `${motif} drawn by hand at the maison.`, hours: h[0] },
    { phase: "The Block", detail: "Teak blocks carved in mirror image — one per colour.", hours: h[1] },
    { phase: "The Dye", detail: "Pigments mastered by eye under north light.", hours: h[2] },
    { phase: "The Impression", detail: "Struck by hand; the slight drift is the signature.", hours: h[3] },
    { phase: "The Wash & Sun", detail: "Washed, sun-cured, rested.", hours: h[4] },
    { phase: "The Finish", detail: "Examined against light, stitched, pressed, numbered.", hours: h[5] },
  ];
}

export function quiltProcess(total: number, motif: string): ProcessStep[] {
  const h = distribute(total, [0.12, 0.16, 0.08, 0.26, 0.24, 0.06, 0.08]);
  return [
    { phase: "The Drawing", detail: `${motif} composed at the maison — field, border, corner.`, hours: h[0] },
    { phase: "The Block", detail: "A family of teak blocks, carved in mirror image.", hours: h[1] },
    { phase: "The Dye", detail: "Small vats, matched against the drawing.", hours: h[2] },
    { phase: "The Impression", detail: "Metres printed impression by impression.", hours: h[3] },
    { phase: "The Quilting", detail: "Layered and quilted by hand-guided needle.", hours: h[4] },
    { phase: "The Wash & Sun", detail: "Arrives already soft, already settled.", hours: h[5] },
    { phase: "The Finish", detail: "Examined, bound, pressed, numbered.", hours: h[6] },
  ];
}

export function bhujodiProcess(total: number, motif: string): ProcessStep[] {
  const h = distribute(total, [0.12, 0.18, 0.15, 0.4, 0.07, 0.08]);
  return [
    { phase: "The Drawing", detail: `${motif} composed for the loom, thread by thread.`, hours: h[0] },
    { phase: "The Spinning", detail: "Rain-fed kala cotton, handspun.", hours: h[1] },
    { phase: "The Warp", detail: "Hundreds of ends tied and tensioned by hand.", hours: h[2] },
    { phase: "The Weave", detail: "Motifs lifted as extra weft — by memory.", hours: h[3] },
    { phase: "The Wash", detail: "Relaxed into its soft, textured hand.", hours: h[4] },
    { phase: "The Finish", detail: "Examined, finished, numbered.", hours: h[5] },
  ];
}

export function chettinadProcess(total: number, motif: string): ProcessStep[] {
  const h = distribute(total, [0.12, 0.18, 0.18, 0.38, 0.14]);
  return [
    { phase: "The Drawing", detail: `${motif} set on paper, tuned like a façade.`, hours: h[0] },
    { phase: "The Yarn & Dye", detail: "Dyed before weaving — colour lives inside the cloth.", hours: h[1] },
    { phase: "The Warp", detail: "The geometry resolved at the loom first.", hours: h[2] },
    { phase: "The Weave", detail: "Beaten dense for a calm, garment-like drape.", hours: h[3] },
    { phase: "The Finish", detail: "Examined against light; hems and loops by hand.", hours: h[4] },
  ];
}
