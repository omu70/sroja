"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Piece } from "@/data/types";
import { formatINR } from "@/data/pieces";
import InquiryForm from "./InquiryForm";
import { IconLotus, IconShield, IconCrate, IconCertificate } from "./icons";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type Stage = "form" | "creating" | "paying" | "verifying" | "paid" | "error";

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

/**
 * The acquisition panel — pay online (Razorpay: UPI, cards, netbanking)
 * or switch to the advisor conversation. If payment keys aren't configured,
 * it falls back to the enquiry flow automatically.
 */
export default function AcquisitionPanel({ piece }: { piece: Piece }) {
  const [mode, setMode] = useState<"buy" | "enquire">("buy");
  const [stage, setStage] = useState<Stage>("form");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const remaining = Math.max(piece.edition.of - piece.edition.number, 0);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

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
        // Payments not yet enabled on the server — fall back to enquiry.
        setMode("enquire");
        setStage("form");
        setError("Online payment is being enabled. Reserve this piece via enquiry meanwhile.");
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
              body: JSON.stringify({
                ...resp,
                piece: piece.slug,
                email: form.email,
                name: form.name,
              }),
            });
            const vd = await v.json();
            if (!v.ok || !vd.ok) throw new Error("Verification failed.");
            setStage("paid");
          } catch {
            setStage("error");
            setError(
              "Payment received but verification is pending — we will confirm by email shortly."
            );
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
    "w-full border-b border-ivory-mute bg-transparent py-3.5 text-charcoal placeholder:text-stone focus:border-brass focus:outline-none transition-colors duration-500";
  const label = "eyebrow mb-1.5 block text-stone-dark";

  if (stage === "paid") {
    return (
      <div className="border border-brass/40 bg-ivory-bright px-8 py-14 text-center">
        <IconLotus size={30} className="mx-auto text-brass animate-pulse-soft" />
        <p className="display mt-6 text-3xl text-brass">Acquisition confirmed.</p>
        <p className="mt-4 text-sm leading-relaxed text-stone-dark">
          {piece.name} — edition {piece.edition.number} of {piece.edition.of} — is yours.
          A confirmation email is on its way; your certificate travels with the piece.
        </p>
        <div className="mt-8 flex items-center justify-center gap-8">
          {[
            { Icon: IconCertificate, t: "Certificate enclosed" },
            { Icon: IconCrate, t: "Insured dispatch" },
          ].map(({ Icon, t }) => (
            <span key={t} className="eyebrow flex items-center gap-2 text-stone-dark">
              <Icon size={15} className="text-brass" /> {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {remaining > 0 && (
        <p className="eyebrow mb-5 flex items-center gap-2 text-brass">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brass animate-pulse-soft" />
          {remaining} of {piece.edition.of} still available in this edition
        </p>
      )}

      {/* Mode switch */}
      <div className="mb-8 flex border border-ivory-mute">
        {(
          [
            ["buy", "Acquire & Pay Online"],
            ["enquire", "Enquire First"],
          ] as const
        ).map(([m, t]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`eyebrow flex-1 px-4 py-4 transition-colors duration-500 ${
              mode === m
                ? "bg-charcoal text-gold"
                : "bg-ivory-bright text-stone-dark hover:text-charcoal"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mode === "buy" ? (
          <motion.form
            key="buy"
            onSubmit={pay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="acq-name" className={label}>
                  Full Name *
                </label>
                <input id="acq-name" required value={form.name} onChange={set("name")} className={field} placeholder="As it should appear on the certificate" />
              </div>
              <div>
                <label htmlFor="acq-phone" className={label}>
                  Phone *
                </label>
                <input id="acq-phone" required value={form.phone} onChange={set("phone")} className={field} placeholder="+91…" />
              </div>
            </div>
            <div>
              <label htmlFor="acq-email" className={label}>
                Email *
              </label>
              <input id="acq-email" required type="email" value={form.email} onChange={set("email")} className={field} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="acq-address" className={label}>
                Delivery Address *
              </label>
              <textarea id="acq-address" required rows={3} value={form.address} onChange={set("address")} className={field} placeholder="Street, city, state, PIN — anywhere in the world" />
            </div>

            <button
              type="submit"
              disabled={stage === "creating" || stage === "verifying"}
              className="eyebrow group flex w-full items-center justify-center gap-4 border border-brass bg-charcoal px-10 py-6 text-gold transition-all duration-700 hover:bg-charcoal-deep disabled:opacity-60"
            >
              {stage === "creating"
                ? "Preparing secure payment…"
                : stage === "verifying"
                  ? "Confirming payment…"
                  : `Pay ${formatINR(piece.price)} Securely`}
            </button>

            {error && <p className="text-sm leading-relaxed text-brass">{error}</p>}

            <div className="space-y-2">
              <p className="eyebrow flex items-center gap-2 text-[0.55rem] text-stone-dark">
                <IconShield size={14} className="shrink-0 text-brass" />
                UPI · Cards · Netbanking — secured by Razorpay
              </p>
              <p className="eyebrow flex items-center gap-2 text-[0.55rem] text-stone-dark">
                <IconCrate size={14} className="shrink-0 text-brass" />
                Free shipping over ₹15,000 · 30-day returns · Certificate included
              </p>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="enquire"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {error && <p className="mb-6 text-sm leading-relaxed text-brass">{error}</p>}
            <InquiryForm defaultPiece={piece.slug} defaultType="Enquire About A Piece" compact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
