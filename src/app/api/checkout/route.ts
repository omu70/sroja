import { NextResponse } from "next/server";
import { z } from "zod";
import { getPiece } from "@/data/pieces";

const CheckoutSchema = z.object({
  piece: z.string().min(1).max(120),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(6).max(20),
  address: z.string().min(8).max(600),
});

/**
 * Creates a Razorpay order for a piece.
 * — The amount is ALWAYS taken from the server-side archive (never the client).
 * — Without RAZORPAY keys configured, responds { configured: false } so the
 *   storefront can fall back to the enquiry flow gracefully.
 */
export async function POST(req: Request) {
  let data: z.infer<typeof CheckoutSchema>;
  try {
    data = CheckoutSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid details." }, { status: 400 });
  }

  const piece = getPiece(data.piece);
  if (!piece) {
    return NextResponse.json({ ok: false, error: "Unknown piece." }, { status: 404 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ ok: true, configured: false });
  }

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: piece.price * 100, // paise — server-side price only
        currency: "INR",
        receipt: `sroja_${piece.slug.slice(0, 30)}_${Date.now().toString(36)}`,
        notes: {
          piece: piece.slug,
          edition: `${piece.edition.number}/${piece.edition.of}`,
          buyer: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address.slice(0, 500),
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[checkout] Razorpay order failed:", err.slice(0, 300));
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
      pieceName: piece.name,
    });
  } catch (err) {
    console.error("[checkout] error:", err);
    return NextResponse.json(
      { ok: false, error: "Payment service unavailable. Please try again." },
      { status: 502 }
    );
  }
}
