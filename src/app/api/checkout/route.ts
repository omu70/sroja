// ------------------------------------------------------------------------
// API: Create Payment Order
//
// Server code that creates a Razorpay order. Always prices the cart on the
// server (never trusts the browser). Used by Buy Now and the cart.
// ------------------------------------------------------------------------

import { NextResponse } from "next/server";
import { z } from "zod";
import { getPiece } from "@/data/pieces";

const CheckoutSchema = z.object({
  // single-piece (Buy Now) — optional
  piece: z.string().min(1).max(120).optional(),
  // cart — optional
  items: z
    .array(z.object({ slug: z.string().min(1).max(120), qty: z.number().int().min(1).max(20) }))
    .max(50)
    .optional(),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(6).max(20),
  address: z.string().min(8).max(600),
});

/**
 * Creates a Razorpay order for a single piece OR a whole cart.
 * — Amounts are ALWAYS computed from the server-side catalogue (never the client).
 * — Without RAZORPAY keys, responds { configured: false } so the storefront can
 *   fall back gracefully.
 */
export async function POST(req: Request) {
  let data: z.infer<typeof CheckoutSchema>;
  try {
    data = CheckoutSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid details." }, { status: 400 });
  }

  // Resolve line items from server data
  const requested = data.items?.length
    ? data.items
    : data.piece
      ? [{ slug: data.piece, qty: 1 }]
      : [];

  const lines = requested
    .map((r) => ({ piece: getPiece(r.slug), qty: r.qty }))
    .filter((l): l is { piece: NonNullable<ReturnType<typeof getPiece>>; qty: number } => !!l.piece);

  if (lines.length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to check out." }, { status: 400 });
  }

  const amount = lines.reduce((sum, l) => sum + l.piece.price * l.qty, 0) * 100; // paise

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ ok: true, configured: false });
  }

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `sroja_${Date.now().toString(36)}`,
        notes: {
          items: lines.map((l) => `${l.piece.name} ×${l.qty}`).join(", ").slice(0, 480),
          buyer: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address.slice(0, 400),
        },
      }),
    });

    if (!res.ok) {
      console.error("[checkout] Razorpay order failed:", (await res.text()).slice(0, 300));
      return NextResponse.json(
        { ok: false, error: "Payment service unavailable. Please try again." },
        { status: 502 }
      );
    }

    const order = (await res.json()) as { id: string; amount: number; currency: string };
    return NextResponse.json({
      ok: true,
      configured: true,
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("[checkout] error:", err);
    return NextResponse.json(
      { ok: false, error: "Payment service unavailable. Please try again." },
      { status: 502 }
    );
  }
}
