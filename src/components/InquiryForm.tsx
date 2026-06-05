"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PIECES } from "@/data/pieces";
import { IconLotus } from "./icons";

const TYPES = [
  "Order a piece",
  "Ask a question",
  "Talk to an advisor",
  "Trade / interior design project",
] as const;

interface InquiryFormProps {
  defaultPiece?: string;
  defaultType?: (typeof TYPES)[number];
  compact?: boolean;
}

export default function InquiryForm({
  defaultPiece = "",
  defaultType = "Order a piece",
  compact = false,
}: InquiryFormProps) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    type: defaultType as string,
    name: "",
    email: "",
    country: "",
    piece: defaultPiece,
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full border-b border-ivory-mute bg-transparent py-4 text-charcoal placeholder:text-stone focus:border-brass focus:outline-none transition-colors duration-500";
  const label = "eyebrow mb-2 block text-stone-dark";

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-brass/40 bg-ivory-bright px-8 py-12 text-center"
          >
            <IconLotus size={28} className="mx-auto text-brass animate-pulse-soft" />
            <p className="display mt-6 text-3xl text-brass">Received with thanks.</p>
            <p className="mt-4 text-sm leading-relaxed text-stone-dark">
              A design advisor will write to you within one working day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={false}
            className={`grid gap-8 ${compact ? "" : "md:grid-cols-2"}`}
          >
            <div className={compact ? "" : "md:col-span-2"}>
              <label htmlFor="inq-type" className={label}>
                How can we help?
              </label>
              <select id="inq-type" value={form.type} onChange={set("type")} className={`${field} appearance-none`}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="inq-name" className={label}>
                Name *
              </label>
              <input id="inq-name" required value={form.name} onChange={set("name")} className={field} placeholder="Your full name" />
            </div>

            <div>
              <label htmlFor="inq-email" className={label}>
                Email *
              </label>
              <input
                id="inq-email"
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                className={field}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="inq-country" className={label}>
                Country / City
              </label>
              <input id="inq-country" value={form.country} onChange={set("country")} className={field} placeholder="For shipping estimate" />
            </div>

            <div>
              <label htmlFor="inq-piece" className={label}>
                Which piece?
              </label>
              <select id="inq-piece" value={form.piece} onChange={set("piece")} className={`${field} appearance-none`}>
                <option value="">— General / undecided —</option>
                {PIECES.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name} · {p.dimensions}
                  </option>
                ))}
              </select>
            </div>

            <div className={compact ? "" : "md:col-span-2"}>
              <label htmlFor="inq-message" className={label}>
                Message *
              </label>
              <textarea
                id="inq-message"
                required
                rows={4}
                value={form.message}
                onChange={set("message")}
                className={field}
                placeholder="Tell us about the space, the occasion, or the piece you have in mind."
              />
            </div>

            <div className={compact ? "" : "md:col-span-2"}>
              <button
                type="submit"
                disabled={state === "sending"}
                className="eyebrow w-full border border-brass/60 px-10 py-5 text-brass transition-all duration-700 hover:border-charcoal hover:bg-charcoal hover:text-gold disabled:opacity-50 md:w-auto"
              >
                {state === "sending" ? "Sending…" : "Send Message"}
              </button>
              {state === "error" && (
                <p className="mt-4 text-sm text-brass">
                  Something interrupted the message — please write to us directly at
                  hello@sroja.in.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
