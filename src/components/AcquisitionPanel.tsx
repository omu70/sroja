"use client";

import { useEffect, useState } from "react";
import type { Piece } from "@/data/types";
import { formatINR } from "@/data/pieces";
import CheckoutOverlay from "./CheckoutOverlay";
import { useCart } from "./cart/CartProvider";
import BrandLogo from "./BrandLogo";
import { IconBag, IconCertificate, IconCrate, IconShield } from "./icons";

/**
 * The plaque — a museum label with a single intention.
 * No form in sight; the Private Acquisition opens as its own moment.
 */
export default function AcquisitionPanel({ piece }: { piece: Piece }) {
  const [open, setOpen] = useState(false);
  const { add } = useCart();
  const remaining = Math.max(piece.edition.of - piece.edition.number, 0);

  // The sticky bar (and anything else) can summon the acquisition.
  useEffect(() => {
    const summon = () => setOpen(true);
    window.addEventListener("sroja:buy", summon);
    return () => window.removeEventListener("sroja:buy", summon);
  }, []);

  return (
    <>
      <div className="relative border border-brass/40 bg-ivory-bright p-8 md:p-10">
        <div className="pointer-events-none absolute inset-2 border border-brass/20" />

        <BrandLogo variant="mark" tone="gold" className="h-5 w-5 animate-pulse-soft" />

        <p className="display mt-5 text-2xl text-charcoal md:text-3xl">{piece.name}</p>
        <p className="eyebrow mt-1 text-stone-dark">
          Edition No. {String(piece.edition.number).padStart(2, "0")} of {piece.edition.of}
        </p>

        <p className="display mt-7 text-6xl text-brass">{formatINR(piece.price)}</p>

        {remaining > 0 && (
          <p className="eyebrow mt-3 flex items-center gap-2 text-brass">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brass animate-pulse-soft" />
            Only {remaining} of {piece.edition.of} remain
          </p>
        )}

        <button
          onClick={() => setOpen(true)}
          className="eyebrow mt-8 flex w-full items-center justify-center gap-3 border border-brass bg-charcoal px-10 py-5 text-sm text-gold transition-all duration-700 hover:bg-charcoal-deep"
        >
          Buy Now — {formatINR(piece.price)}
        </button>

        <button
          onClick={() => add(piece.slug, 1)}
          className="eyebrow mt-3 flex w-full items-center justify-center gap-2.5 border border-brass/50 px-10 py-4 text-sm text-brass transition-all duration-500 hover:border-brass hover:bg-blush/40 active:scale-[0.99]"
        >
          <IconBag size={15} /> Add to Cart
        </button>

        <div className="mt-7 grid grid-cols-3 gap-2 border-t border-ivory-mute pt-6">
          {[
            { Icon: IconShield, t: "Razorpay secure" },
            { Icon: IconCertificate, t: "Certificate" },
            { Icon: IconCrate, t: "Insured delivery" },
          ].map(({ Icon, t }) => (
            <span key={t} className="flex flex-col items-center gap-2 text-center">
              <Icon size={17} className="text-brass" />
              <span className="eyebrow text-[0.5rem] text-stone-dark">{t}</span>
            </span>
          ))}
        </div>
      </div>

      <CheckoutOverlay piece={piece} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
