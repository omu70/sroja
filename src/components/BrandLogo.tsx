/* eslint-disable @next/next/no-img-element */

/**
 * The real SROJA marks, extracted verbatim from the brand manual
 * (public/sroja-logo*.svg and public/sroja-mark*.svg).
 * Three baked colours match the brand "Soft Light" system:
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

export default function BrandLogo({
  tone = "charcoal",
  className = "",
  variant = "full",
}: LogoProps) {
  const file = variant === "mark" ? `sroja-mark-${tone}` : `sroja-logo-${tone}`;
  return (
    <img
      src={`/${file}.svg`}
      alt="SROJA"
      className={className}
      draggable={false}
      decoding="async"
    />
  );
}
