// ------------------------------------------------------------------------
// Icon Set
//
// All the small line-drawn icons used across the site (bag, search, etc.).
// ------------------------------------------------------------------------

/**
 * The SROJA icon vocabulary — thin-stroke, jewellery-weight line icons.
 * All inherit currentColor; stroke 1.3 for an engraved, premium feel.
 */
import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/** The house mark — an eight-point star/lotus, as above the wordmark. */
export const IconLotus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" strokeWidth="1.1" />
    <circle cx="12" cy="12" r="2.1" />
  </Base>
);

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </Base>
);

export const IconEnvelope = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
  </Base>
);

export const IconCalendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="M8 14h2.5" />
  </Base>
);

export const IconGlobe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.6 2.3 3.9 5.2 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.2-3.9-8.5s1.3-6.2 3.9-8.5z" />
  </Base>
);

export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l7 2.8v5.4c0 4.5-3 8.2-7 9.8-4-1.6-7-5.3-7-9.8V5.8L12 3z" />
    <path d="M9.2 12l2 2 3.6-3.8" />
  </Base>
);

export const IconCertificate = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 3.5h14v13.5l-2.8-1.6-2.2 1.6V3.5" />
    <path d="M5 17V3.5M5 17v3.5l2.5-1.4L10 20.5v-3.4" strokeWidth="1.1" />
    <path d="M8.5 7h7M8.5 10h4" />
  </Base>
);

export const IconHand = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 11.5V5.8a1.3 1.3 0 012.6 0v4.9M10.6 10.4V4.5a1.3 1.3 0 012.6 0v5.9M13.2 10.4V5.6a1.3 1.3 0 012.6 0v6.9" />
    <path d="M15.8 12.5c0-1 .5-1.8 1.4-2l1.2-.3c.6-.1 1.1.4.9 1l-1.5 5.6A5.5 5.5 0 0112.5 21h-1.2a5.5 5.5 0 01-4.6-2.5l-2.5-3.8a1.25 1.25 0 011.9-1.6l1.9 1.9" />
  </Base>
);

export const IconLoom = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4v16M9.3 4v16M14.6 4v16M20 4v16" strokeWidth="1.1" />
    <path d="M2.5 8.5h19M2.5 15.5h19" />
    <circle cx="12" cy="12" r="1.6" />
  </Base>
);

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.4 2" />
  </Base>
);

export const IconRuler = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="8.5" width="19" height="7" rx="0.8" transform="rotate(0)" />
    <path d="M6.5 8.5v3M10.5 8.5v4.2M14.5 8.5v3M18.5 8.5v4.2" strokeWidth="1.1" />
  </Base>
);

export const IconLayers = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5l9 4.7-9 4.7-9-4.7 9-4.7z" />
    <path d="M3.8 12.6L12 16.9l8.2-4.3M3.8 16.4L12 20.7l8.2-4.3" strokeWidth="1.1" />
  </Base>
);

export const IconHash = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 4l-2 16M16.5 4l-2 16M4.5 9h16M3.5 15h16" strokeWidth="1.1" />
  </Base>
);

export const IconArrow = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15.5M14 6.5l5.5 5.5-5.5 5.5" />
  </Base>
);

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-10.4a6.5 6.5 0 0113 0C18.5 15.4 12 21 12 21z" />
    <circle cx="12" cy="10.4" r="2.2" />
  </Base>
);

export const IconSparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4l1.8 5.4L19 12l-5.2 2.6L12 20l-1.8-5.4L5 12l5.2-2.6L12 4z" />
  </Base>
);

export const IconPencil = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20l1-4L16.5 4.5a1.9 1.9 0 012.7 0l.3.3a1.9 1.9 0 010 2.7L8 19l-4 1z" />
    <path d="M14.5 6.5l3 3" strokeWidth="1.1" />
  </Base>
);

export const IconLeaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19C5 9 11 4.5 20 4c-.5 9-5 15-15 15z" />
    <path d="M5 19c3-5.5 7-9.5 11.5-11.5" strokeWidth="1.1" />
  </Base>
);

export const IconThread = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M5.5 9c4-2.4 9-2.4 13 0M5.5 12c4-2.4 9-2.4 13 0M5.5 15c4-2.4 9-2.4 13 0" strokeWidth="1.1" />
  </Base>
);

export const IconCrate = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l8 4v10l-8 4-8-4V7l8-4z" />
    <path d="M4 7l8 4 8-4M12 11v10" strokeWidth="1.1" />
  </Base>
);

export const IconEye = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.6" />
  </Base>
);

export const IconBag = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 8h14l-1.2 12.5H6.2L5 8z" />
    <path d="M8.5 10.5V6.8a3.5 3.5 0 017 0v3.7" />
  </Base>
);

export const IconChat = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5.5h16v11H10l-4.5 3.5v-3.5H4v-11z" />
    <path d="M8 9.5h8M8 12.5h5" strokeWidth="1.1" />
  </Base>
);
