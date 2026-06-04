"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PIECES } from "@/data/pieces";

const TYPES = [
  "Request Acquisition",
  "Schedule Private Consultation",
  "Speak With A Design Advisor",
  "Enquire About A Piece",
] as const;

interface InquiryFormProps {
  defaultPiece?: string;
  defaultType?: (typeof TYPES)[number];
  compact?: boolean;
}

export default function InquiryForm({
  defaultPiece = "",
  defaultType = "Request Acquisition",
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
    "w-full border-b border-charcoal-line bg-transparent py-4 text-ivory placeholder:text-stone-dark focus:border-gold focus:outline-none transition-colors duration-500";
  const label = "eyebrow mb-2 block text-stone";

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-brass/40 px-8 py-12 text-center"
          >
            <p className="display text-3xl text-gold">Received with thanks.</p>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              A design advisor will write to you within one working day to begin the
              conversation. Significant pieces deserve unhurried correspondence.
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
                Nature of Enquiry
              </label>
              <select id="inq-type" value={form.type} onChange={set("type")} className={`${field} appearance-none`}>
                {TYPES.map((t) => (
                  <option key={t} value={t} className="bg-charcoal text-ivory">
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
              <input id="inq-country" value={form.country} onChange={set("country")} className={field} placeholder="For shipping & advisory" />
            </div>

            <div>
              <label htmlFor="inq-piece" className={label}>
                Piece of Interest
              </label>
              <select id="inq-piece" value={form.piece} onChange={set("piece")} className={`${field} appearance-none`}>
                <option value="" className="bg-charcoal text-ivory">
                  — General / undecided —
                </option>
                {PIECES.map((p) => (
                  <option key={p.slug} value={p.slug} className="bg-charcoal text-ivory">
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
                className="eyebrow w-full border border-brass/60 px-10 py-5 text-gold transition-all duration-700 hover:border-gold hover:bg-gold hover:text-charcoal-deep disabled:opacity-50 md:w-auto"
              >
                {state === "sending" ? "Sending…" : "Begin The Conversation"}
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
