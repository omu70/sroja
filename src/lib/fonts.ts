// ------------------------------------------------------------------------
// Fonts
//
// Loads the website fonts (serif, sans, and the brand display font).
// ------------------------------------------------------------------------

import { Cormorant_Garamond, Cormorant_Unicase, Inter } from "next/font/google";

export const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/** Brand display face per the SROJA logo manual. */
export const brand = Cormorant_Unicase({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-brand",
  display: "swap",
});

export const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});
