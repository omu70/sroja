"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Piece } from "@/data/types";
import { formatINR } from "@/data/pieces";
import { SITE } from "@/data/site";
import BrandLogo from "./BrandLogo";
import { IconCrate, IconShield } from "./icons";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type Stage = "form" | "creating" | "paying" | "verifying" | "paid";

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

/** The edition register — sold numbers struck, yours glowing next. */
function EditionRegister({ piece }: { piece: Piece }) {
  const tokens = Array.from({ length: Math.min(piece.edition.of, 50) }, (_, i) => i + 1);
  return (
    <div>
      <p className="eyebrow text-stone">Edition Availability</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tokens.map((n) => {
          const sold = n < piece.edition.number;
          const yours = n === piece.edition.number;
          return (
            <span
              key={n}
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-[0.5rem] tracking-wide transition-colors ${
                yours
                  ? "border-gold bg-gold font-medium text-charcoal-deep shadow-[0_0_18px_rgba(198,167,94,0.45)]"
                  : sold
                    ? "border-charcoal-line text-stone-dark/60 line-through"
                    : "border-charcoal-line text-stone/70"
              }`}
              title={yours ? "Yours on payment" : sold ? "Sold" : "Not yet released"}
            >
              {String(n).padStart(2, "0")}
            </span>
          );
        })}
      </div>
      <p className="eyebrow mt-3 text-gold">
        No. {String(piece.edition.number).padStart(2, "0")} becomes yours on payment
      </p>
    </div>
  );
}

/**
 * The Secure Checkout — a full-screen ritual, not a checkout.
 * Sign the certificate line, watch your name take the edition, then pay.
 */
export default function CheckoutOverlay({
  piece,
  open,
  onClose,
}: {
  piece: Piece;
  open: boolean;
  onClose: () => void;
}) {
  const [stage, setStage] = useState<Stage>("form");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const signed = form.name.trim().length > 1;

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && stage !== "paying" && onClose();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open, onClose, stage]);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStage("creating");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ piece: piece.slug, ...form }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not start payment.");

      if (!data.configured) {
        setStage("form");
        setError(`Online payment is being enabled. Write to ${SITE.email} and we will reserve No. ${String(piece.edition.number).padStart(2, "0")} for you today.`);
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
        description: `${piece.name} — Edition ${piece.edition.number}/${piece.edition.of}`,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { piece: piece.slug },
        theme: { color: "#9A7A42" },
        modal: { ondismiss: () => setStage("form") },
        handler: async (resp: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          setStage("verifying");
          try {
            const v = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...resp, piece: piece.slug, email: form.email, name: form.name }),
            });
            const vd = await v.json();
            if (!v.ok || !vd.ok) throw new Error("verify");
            setStage("paid");
          } catch {
            setStage("paid");
            setError("Payment received — final confirmation arrives by email.");
          }
        },
      });
      rzp.open();
    } catch (err) {
      setStage("form");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const field =
    "w-full border-b border-ivory/20 bg-transparent py-3 text-ivory placeholder:text-stone-dark focus:border-gold focus:outline-none transition-colors duration-500";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[85] flex bg-charcoal-deep/60 backdrop-blur-sm"
          onClick={() => stage !== "paying" && onClose()}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative m-auto grid max-h-[94svh] w-[min(72rem,94vw)] grid-cols-1 overflow-hidden border border-brass/30 bg-charcoal-deep shadow-[0_80px_160px_-60px_rgba(0,0,0,0.8)] lg:grid-cols-2"
          >
            {/* The piece */}
            <div className="relative hidden lg:block">
              <Image src={piece.images[0]} alt={piece.name} fill sizes="36rem" className="img-luxe object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-charcoal-deep/30" />
              <div className="absolute bottom-8 left-8 right-8">
                <BrandLogo variant="mark" tone="gold" className="h-6 w-6 animate-pulse-soft" />
                <p className="display mt-3 text-4xl text-ivory">{piece.name}</p>
                <p className="eyebrow mt-2 text-ivory/70">
                  {piece.craft} · {piece.hours} artisan-hours
                </p>
              </div>
            </div>

            {/* The ritual */}
            <div className="overflow-y-auto p-7 md:p-12">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                ✕
              </button>

              {stage === "paid" ? (
                <div className="flex min-h-full flex-col items-center justify-center py-16 text-center">
                  <BrandLogo variant="mark" tone="gold" className="h-9 w-9 animate-pulse-soft" />
                  <p className="display mt-7 text-4xl text-gold">
                    No. {String(piece.edition.number).padStart(2, "0")} is yours.
                  </p>
                  <p className="display mt-4 max-w-sm text-xl italic text-ivory/85">
                    {piece.name}, certificate in the name of {form.name || "you"}.
                  </p>
                  <p className="mt-6 max-w-xs text-sm leading-relaxed text-stone">
                    Confirmation is on its way by email. The certificate travels with the piece.
                  </p>
                  {error && <p className="mt-4 text-xs text-brass-bright">{error}</p>}
                </div>
              ) : (
                <>
                  <p className="eyebrow text-gold">Secure Checkout</p>
                  <p className="display mt-3 text-3xl text-ivory md:text-4xl">
                    {piece.name}
                    <span className="ml-4 text-brass-bright">{formatINR(piece.price)}</span>
                  </p>

                  <div className="mt-8">
                    <EditionRegister piece={piece} />
                  </div>

                  {/* The certificate line — signs itself as you type */}
                  <div className="mt-9 border border-brass/30 bg-charcoal px-6 py-5">
                    <p className="eyebrow text-stone">The certificate will read</p>
                    <p className="display mt-2 text-lg leading-relaxed text-ivory/90 md:text-xl">
                      Edition No. {String(piece.edition.number).padStart(2, "0")} of{" "}
                      {piece.edition.of}, held by{" "}
                      <span className={signed ? "italic text-gold" : "text-stone-dark"}>
                        {signed ? form.name : "…………………"}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={pay} className="mt-8 grid gap-5">
                    <div>
                      <label htmlFor="co-name" className="eyebrow mb-1 block text-stone">
                        Full name *
                      </label>
                      <input
                        id="co-name"
                        required
                        value={form.name}
                        onChange={set("name")}
                        className={`${field} display text-2xl italic`}
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                    </div>

                    <AnimatePresence>
                      {signed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="grid gap-5 overflow-hidden"
                        >
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label htmlFor="co-phone" className="eyebrow mb-1 block text-stone">
                                Phone *
                              </label>
                              <input id="co-phone" required value={form.phone} onChange={set("phone")} className={field} placeholder="+91…" autoComplete="tel" />
                            </div>
                            <div>
                              <label htmlFor="co-email" className="eyebrow mb-1 block text-stone">
                                Email *
                              </label>
                              <input id="co-email" required type="email" value={form.email} onChange={set("email")} className={field} placeholder="you@example.com" autoComplete="email" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="co-address" className="eyebrow mb-1 block text-stone">
                              Delivery address *
                            </label>
                            <textarea id="co-address" required rows={2} value={form.address} onChange={set("address")} className={field} placeholder="Street, city, state, PIN" autoComplete="street-address" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={!signed || stage === "creating" || stage === "verifying"}
                      className="eyebrow mt-2 flex w-full items-center justify-center gap-3 border border-gold bg-gold px-10 py-6 text-sm text-charcoal-deep transition-all duration-700 hover:bg-brass-bright disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {stage === "creating"
                        ? "Preparing secure payment…"
                        : stage === "verifying"
                          ? "Confirming your order…"
                          : `Pay ${formatINR(piece.price)} — Reserve No. ${String(piece.edition.number).padStart(2, "0")}`}
                    </button>

                    {error && <p className="text-sm leading-relaxed text-brass-bright">{error}</p>}

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="eyebrow flex items-center gap-2 text-[0.52rem] text-stone">
                        <IconShield size={13} className="text-gold" /> UPI · Cards · Netbanking — Razorpay
                      </span>
                      <span className="eyebrow flex items-center gap-2 text-[0.52rem] text-stone">
                        <IconCrate size={13} className="text-gold" /> Insured worldwide · 30-day returns
                      </span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
