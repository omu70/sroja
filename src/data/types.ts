// ------------------------------------------------------------------------
// Data Shapes (TypeScript types)
//
// Defines the 'shape' of a product and a collection so the code stays safe.
// ------------------------------------------------------------------------

export type CollectionSlug =
  | "cushions"
  | "bed-linens"
  | "quilts"
  | "dohars"
  | "curtains";

export type Craft =
  | "Hand Block Printing"
  | "Bhujodi Handweaving"
  | "Chettinad Handweaving";

export interface ProcessStep {
  phase: string;
  detail: string;
  hours: number;
}

export interface Edition {
  number: number;
  of: number;
}

export interface Piece {
  slug: string;
  name: string;
  collection: CollectionSlug;
  craft: Craft;
  region: string;
  /** INR */
  price: number;
  /** total artisan-hours across the making */
  hours: number;
  artisans: number;
  edition: Edition;
  materials: string[];
  dimensions: string;
  /** brief poetic description (cover line) */
  description: string;
  /** first-person note from Archit */
  designersNote: string;
  inspiration: string;
  story: string;
  uniqueness: string;
  process: ProcessStep[];
  /** full public URLs, first = hero */
  images: string[];
  /** hex swatches of the piece's palette */
  palette: string[];
  featured?: boolean;
}

export interface CollectionMeta {
  slug: CollectionSlug;
  /** editorial name, e.g. "Baithak" */
  name: string;
  title: string;
  subtitle: string;
  manifesto: string[];
}
