// ------------------------------------------------------------------------
// Cart Drawer (slide-in basket)
//
// The basket panel that slides in from the right: items, quantities,
// free-shipping progress, 'complete the set' upsell, and checkout.
// ------------------------------------------------------------------------

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { PIECES, getPiece, formatINR } from "@/data/pieces";
import { SITE } from "@/data/site";
import BrandLogo from "../BrandLogo";
import { IconArrow, IconBag, IconCrate, IconShield } from "../icons";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const FREE_SHIP = 15000;

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function CartDrawer() {
  const { lines, open, closeCart, setQty, remove, clear } = useCart();
  const [stage, setStage] = useState<"idle" | "form" | "creating" | "paying" | "paid">("idle");
  const [error, setError] = useState("");
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "", address: "" });

  const items = useMemo(
    () =>
      lines
        .map((l) => ({ piece: getPiece(l.slug), qty: l.qty }))
        .filter((x): x is { piece: NonNullable<ReturnType<typeof getPiece>>; qty: number } => !!x.piece),
    [lines]
  );

  const subtotal = items.reduce((s, x) => s + x.piece.price * x.qty, 0);
  const toFree = Math.max(FREE_SHIP - subtotal, 0);
  const freePct = Math.min((subtotal / FREE_SHIP) * 100, 100);

  // Upsell: cheapest pieces not already in cart
  const inCart = new Set(lines.map((l) => l.slug));
  const upsell = useMemo(
    () => PIECES.filter((p) => !inCart.has(p.slug)).sort((a, b) => a.price - b.price).slice(0, 6),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lines]
  );

  const set =
    (k: keyof typeof buyer) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setBuyer((b) => ({ ...b, [k]: e.target.value }));

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStage("creating");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines, ...buyer }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not start checkout.");

      if (!data.configured) {
        setStage("form");
        setError(`Online payment is being switched on. Email ${SITE.email} and we'll reserve your pieces today.`);
        return;
      }
      const ok = await loadRazorpay();
      if (!ok || !window.Razorpay) throw new Error("Could not load the secure payment window.");

      setStage("paying");
      const rzp = new window.Razorpay({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount,
        currency: data.currency,
        name: "SROJA",
        description: `${items.length} piece${items.length > 1 ? "s" : ""}`,
        prefill: { name: buyer.name, email: buyer.email, contact: buyer.phone },
        theme: { color: "#9A7A42" },
        modal: { ondismiss: () => setStage("form") },
        handler: async (resp: Record<string, string>) => {
          await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...resp, email: buyer.email, name: buyer.name }),
          }).catch(() => {});
          setStage("paid");
          clear();
        },
      });
      rzp.open();
    } catch (err) {
      setStage("form");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const field =
    "w-full border-b border-ivory-mute bg-transparent py-3 text-charcoal placeholder:text-stone focus:border-brass focus:outline-none transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[90] bg-charcoal-deep/50 backdrop-blur-sm"
          onClick={closeCart}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-full flex-col bg-ivory-bright shadow-2xl sm:w-[30rem]"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ivory-mute px-5 py-5 md:px-7">
              <div className="flex items-center gap-3">
                <IconBag size={18} className="text-brass" />
                <p className="eyebrow text-charcoal">
                  Your Cart{items.length > 0 ? ` · ${items.length}` : ""}
                </p>
              </div>
              <button onClick={closeCart} aria-label="Close cart" className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory-mute text-stone-dark transition-colors hover:border-brass hover:text-brass">
                ✕
              </button>
            </div>

            {stage === "paid" ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <BrandLogo variant="mark" tone="gold" className="h-10 w-10 animate-pulse-soft" />
                <p className="display mt-6 text-3xl text-brass">Order confirmed.</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-dark">
                  Thank you. A confirmation email is on its way; your pieces will be
                  prepared and dispatched with care.
                </p>
                <button onClick={closeCart} className="eyebrow mt-8 border border-brass px-8 py-4 text-brass transition-colors hover:bg-charcoal hover:text-gold">
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <IconBag size={34} className="text-ivory-mute" />
                <p className="display mt-5 text-2xl text-charcoal">Your cart is empty.</p>
                <p className="mt-2 text-sm text-stone-dark">Every piece is a numbered, one-of-its-kind edition.</p>
                <Link href="/collections" onClick={closeCart} className="eyebrow mt-8 inline-flex items-center gap-3 border border-brass bg-charcoal px-8 py-4 text-gold transition-colors hover:bg-charcoal-deep">
                  Shop The Collection <IconArrow size={14} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 md:px-7">
                  {/* Free-ship progress — the gentle upsell nudge */}
                  <div className="py-5">
                    <p className="eyebrow flex items-center gap-2 text-stone-dark">
                      <IconCrate size={14} className="text-brass" />
                      {toFree > 0 ? (
                        <>Add {formatINR(toFree)} for free shipping</>
                      ) : (
                        <span className="text-brass">You've unlocked free shipping ✦</span>
                      )}
                    </p>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ivory-mute">
                      <div className="h-full rounded-full bg-gradient-to-r from-brass to-gold transition-all duration-700" style={{ width: `${freePct}%` }} />
                    </div>
                  </div>

                  {/* Line items */}
                  <ul className="divide-y divide-ivory-mute border-t border-ivory-mute">
                    {items.map(({ piece, qty }) => (
                      <li key={piece.slug} className="flex gap-4 py-5">
                        <Link href={`/piece/${piece.slug}`} onClick={closeCart} className="relative h-24 w-20 shrink-0 overflow-hidden bg-ivory-soft">
                          <Image src={piece.images[0]} alt={piece.name} fill sizes="80px" className="img-luxe object-cover" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="display text-lg text-charcoal">{piece.name}</p>
                              <p className="eyebrow mt-0.5 text-[0.5rem] text-stone-dark">
                                Edition No. {String(piece.edition.number).padStart(2, "0")} / {piece.edition.of}
                              </p>
                            </div>
                            <button onClick={() => remove(piece.slug)} aria-label="Remove" className="text-stone-dark transition-colors hover:text-terracotta">
                              ✕
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-ivory-mute">
                              <button onClick={() => setQty(piece.slug, qty - 1)} aria-label="Decrease" className="flex h-8 w-8 items-center justify-center text-stone-dark transition-colors hover:text-charcoal">−</button>
                              <span className="w-7 text-center text-sm text-charcoal">{qty}</span>
                              <button onClick={() => setQty(piece.slug, qty + 1)} aria-label="Increase" className="flex h-8 w-8 items-center justify-center text-stone-dark transition-colors hover:text-charcoal">+</button>
                            </div>
                            <p className="display text-lg text-brass">{formatINR(piece.price * qty)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Upsell — Complete the set */}
                  {upsell.length > 0 && (
                    <div className="border-t border-ivory-mute py-6">
                      <p className="eyebrow text-brass">Complete the set</p>
                      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {upsell.map((p) => (
                          <UpsellCard key={p.slug} slug={p.slug} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Checkout details form (revealed on checkout) */}
                  <AnimatePresence>
                    {stage === "form" && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={pay}
                        className="grid gap-4 overflow-hidden border-t border-ivory-mute py-6"
                      >
                        <p className="eyebrow text-brass">Delivery details</p>
                        <input required value={buyer.name} onChange={set("name")} className={field} placeholder="Full name *" autoComplete="name" />
                        <div className="grid gap-4 sm:grid-cols-2">
                          <input required value={buyer.phone} onChange={set("phone")} className={field} placeholder="Phone *" autoComplete="tel" />
                          <input required type="email" value={buyer.email} onChange={set("email")} className={field} placeholder="Email *" autoComplete="email" />
                        </div>
                        <textarea required rows={2} value={buyer.address} onChange={set("address")} className={field} placeholder="Delivery address *" autoComplete="street-address" />
                        {error && <p className="text-sm text-terracotta">{error}</p>}
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer — subtotal + checkout */}
                <div className="border-t border-ivory-mute bg-paper px-5 py-5 md:px-7">
                  <div className="flex items-baseline justify-between">
                    <p className="eyebrow text-stone-dark">Subtotal</p>
                    <p className="display text-3xl text-charcoal">{formatINR(subtotal)}</p>
                  </div>
                  <p className="mt-1 text-xs text-stone-dark">
                    {toFree > 0 ? "Shipping calculated at delivery" : "Free shipping included"}
                  </p>

                  {stage !== "form" && error && <p className="mt-3 text-sm text-terracotta">{error}</p>}

                  <button
                    onClick={(e) => (stage === "form" ? pay(e) : setStage("form"))}
                    disabled={stage === "creating" || stage === "paying"}
                    className="eyebrow mt-4 flex w-full items-center justify-center gap-3 border border-brass bg-charcoal px-8 py-5 text-gold transition-all duration-500 hover:bg-charcoal-deep disabled:opacity-60"
                  >
                    {stage === "creating"
                      ? "Preparing secure payment…"
                      : stage === "form"
                        ? `Pay ${formatINR(subtotal)} Securely`
                        : "Checkout"}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-5">
                    <span className="eyebrow flex items-center gap-1.5 text-[0.5rem] text-stone-dark">
                      <IconShield size={12} className="text-brass" /> Razorpay secure
                    </span>
                    <span className="eyebrow flex items-center gap-1.5 text-[0.5rem] text-stone-dark">
                      <IconCrate size={12} className="text-brass" /> Secure · 30-day returns
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function UpsellCard({ slug }: { slug: string }) {
  const { add } = useCart();
  const piece = getPiece(slug);
  if (!piece) return null;
  return (
    <div className="w-32 shrink-0">
      <Link href={`/piece/${piece.slug}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-soft">
          <Image src={piece.images[0]} alt={piece.name} fill sizes="128px" className="img-luxe object-cover" />
        </div>
      </Link>
      <p className="display mt-2 truncate text-sm text-charcoal">{piece.name}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="eyebrow text-[0.5rem] text-brass">{formatINR(piece.price)}</span>
        <button onClick={() => add(piece.slug, 1)} aria-label={`Add ${piece.name}`} className="eyebrow border border-brass/50 px-2.5 py-1 text-[0.5rem] text-brass transition-colors hover:bg-charcoal hover:text-gold">
          Add
        </button>
      </div>
    </div>
  );
}
