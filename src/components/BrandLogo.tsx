// ------------------------------------------------------------------------
// Brand Logo
//
// Shows the real SROJA logo image in the right colour (dark/ivory/gold).
// ------------------------------------------------------------------------

/* eslint-disable @next/next/no-img-element */

/**
 * The real SROJA logo, extracted verbatim from the brand manual
 * (public/brand/*.png — the star mark + wordmark in Cormorant Unicase).
 * Three baked inks match the brand "Soft Light" system:
 *   charcoal — for light backgrounds
 *   ivory    — for dark backgrounds (hero, footer, checkout)
 *   gold     — accent
 */

type Tone = "charcoal" | "ivory" | "gold";

interface LogoProps {
  tone?: Tone;
  className?: string;
  /** wordmark + star (default) or the star mark alone */
  variant?: "full" | "mark";
}

const TONE_FILE: Record<Tone, string> = {
  charcoal: "dark",
  ivory: "light",
  gold: "gold",
};

export default function BrandLogo({
  tone = "charcoal",
  className = "",
  variant = "full",
}: LogoProps) {
  const part = variant === "mark" ? "mark" : "lockup";
  const file = `sroja-${part}-${TONE_FILE[tone]}`;
  return (
    <img
      src={`/brand/${file}.png`}
      alt="SROJA"
      className={className}
      draggable={false}
      decoding="async"
    />
  );
}
