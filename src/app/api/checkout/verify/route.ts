// ------------------------------------------------------------------------
// API: Verify Payment
//
// Server code that confirms a Razorpay payment is genuine (checks the
// signature) and sends order-confirmation emails.
// ------------------------------------------------------------------------

import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { getPiece } from "@/data/pieces";
import { SITE } from "@/data/site";

const VerifySchema = z.object({
  razorpay_order_id: z.string().min(1).max(120),
  razorpay_payment_id: z.string().min(1).max(120),
  razorpay_signature: z.string().min(1).max(256),
  piece: z.string().max(120).optional(),
  email: z.string().email().max(200).optional(),
  name: z.string().max(120).optional(),
});

/**
 * Verifies the Razorpay payment signature (HMAC-SHA256 of `order_id|payment_id`
 * with the key secret). On success, notifies the maison (and the collector,
 * if Resend is configured).
 */
export async function POST(req: Request) {
  let data: z.infer<typeof VerifySchema>;
  try {
    data = VerifySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ ok: false, error: "Payments not configured." }, { status: 503 });
  }

  const expected = createHmac("sha256", keySecret)
    .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(data.razorpay_signature, "utf8");
  const valid = a.length === b.length && timingSafeEqual(a, b);

  if (!valid) {
    console.warn("[verify] signature mismatch for", data.razorpay_order_id);
    return NextResponse.json({ ok: false, error: "Verification failed." }, { status: 400 });
  }

  const piece = data.piece ? getPiece(data.piece) : undefined;
  console.info(
    "[order] PAID",
    data.razorpay_payment_id,
    piece ? `${piece.name} (${piece.slug})` : "",
    data.email ?? ""
  );

  // Notify via Resend when configured — never block the confirmation on email.
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const lines = [
        `Payment ID: ${data.razorpay_payment_id}`,
        `Order ID: ${data.razorpay_order_id}`,
        `Piece: ${piece ? `${piece.name} — ${piece.dimensions} (${piece.slug})` : "—"}`,
        `Buyer: ${data.name ?? "—"} <${data.email ?? "—"}>`,
        ``,
        `Full buyer details are on the Razorpay order notes.`,
      ].join("\n");

      await resend.emails.send({
        from: process.env.INQUIRY_FROM_EMAIL ?? "SROJA Maison <onboarding@resend.dev>",
        to: [process.env.INQUIRY_TO_EMAIL ?? SITE.email],
        subject: `★ Order paid — ${piece?.name ?? "SROJA piece"}`,
        text: lines,
      });

      if (data.email) {
        await resend.emails.send({
          from: process.env.INQUIRY_FROM_EMAIL ?? "SROJA Maison <onboarding@resend.dev>",
          to: [data.email],
          subject: `Your SROJA order is confirmed${piece ? ` — ${piece.name}` : ""}`,
          text: [
            `Thank you${data.name ? `, ${data.name}` : ""}.`,
            ``,
            `Your payment is confirmed (ref ${data.razorpay_payment_id}).`,
            piece
              ? `${piece.name} — edition ${piece.edition.number} of ${piece.edition.of} — will be prepared and dispatched with care.`
              : ``,
            `A design advisor will write to you with dispatch details shortly.`,
            ``,
            `— ${SITE.legalName}`,
          ].join("\n"),
        });
      }
    } catch (err) {
      console.error("[verify] Resend failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
