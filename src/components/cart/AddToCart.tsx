"use client";

import { useCart } from "./CartProvider";
import { IconBag } from "../icons";

interface AddToCartProps {
  slug: string;
  label?: string;
  className?: string;
  size?: "sm" | "lg";
  iconOnly?: boolean;
}

/** Reusable Add-to-Cart button — opens the drawer on add. */
export default function AddToCart({
  slug,
  label = "Add to Cart",
  className = "",
  size = "lg",
  iconOnly = false,
}: AddToCartProps) {
  const { add } = useCart();
  const pad = size === "lg" ? "px-8 py-4 md:py-5" : "px-5 py-3";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(slug, 1);
      }}
      aria-label={`Add to cart`}
      className={`eyebrow group inline-flex items-center justify-center gap-2.5 border border-brass bg-charcoal text-gold transition-all duration-500 hover:bg-charcoal-deep active:scale-[0.98] ${pad} ${className}`}
    >
      <IconBag size={size === "lg" ? 16 : 14} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
      {!iconOnly && label}
    </button>
  );
}
