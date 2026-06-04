import type { CollectionSlug, Piece } from "./types";
import { CUSHIONS } from "./pieces-cushions";
import { BED_LINENS } from "./pieces-bed";
import { QUILTS } from "./pieces-quilts";
import { DOHARS } from "./pieces-dohars";
import { CURTAINS } from "./pieces-curtains";

export const PIECES: Piece[] = [
  ...CUSHIONS,
  ...BED_LINENS,
  ...QUILTS,
  ...DOHARS,
  ...CURTAINS,
];

export const getPiece = (slug: string): Piece | undefined =>
  PIECES.find((p) => p.slug === slug);

export const getByCollection = (collection: CollectionSlug): Piece[] =>
  PIECES.filter((p) => p.collection === collection);

export const getFeatured = (): Piece[] => PIECES.filter((p) => p.featured);

/** “From the Designer’s Collection” — related by craft first, then collection */
export const getRelated = (piece: Piece, count = 3): Piece[] => {
  const sameCraft = PIECES.filter(
    (p) => p.slug !== piece.slug && p.craft === piece.craft && p.collection !== piece.collection
  );
  const sameCollection = PIECES.filter(
    (p) => p.slug !== piece.slug && p.collection === piece.collection
  );
  const rest = PIECES.filter((p) => p.slug !== piece.slug);
  const pool = [...sameCraft, ...sameCollection, ...rest];
  const seen = new Set<string>();
  const out: Piece[] = [];
  for (const p of pool) {
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      out.push(p);
      if (out.length === count) break;
    }
  }
  return out;
};

export const formatINR = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;
