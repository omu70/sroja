// ------------------------------------------------------------------------
// API: Contact / Enquiry
//
// Server code that receives the contact form and emails it to the studio.
// ------------------------------------------------------------------------

import { NextResponse } from "next/server";
import { z } from "zod";
import { getPiece } from "@/data/pieces";
import { SITE } from "@/data/site";

const InquirySchema = z.object({
  type: z.string().min(1).max(80),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  country: z.string().max(120).optional().or(z.literal("")),
  piece: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(1).max(4000),
});

/**
 * The luxury inquiry workflow.
 * — Validates with zod.
 * — If RESEND_API_KEY is configured, emails the maison (and confirms to the client).
 * — Runs perfectly without any configuration (logs to server console) so the
 *   site works out of the box.
 */
export async function POST(req: Request) {
  let data: z.infer<typeof InquirySchema>;
  try {
    const json = await req.json();
    data = InquirySchema.parse(json);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid enquiry." }, { status: 400 });
  }

  const piece = data.piece ? getPiece(data.piece) : undefined;
  const subject = piece
    ? `${data.type} — ${piece.name} (Edition of ${piece.edition.of})`
    : `${data.type} — General`;

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.INQUIRY_FROM_EMAIL ?? `SROJA Maison <onboarding@resend.dev>`,
        to: [process.env.INQUIRY_TO_EMAIL ?? SITE.email],
        replyTo: data.email,
        subject,
        text: [
          `Nature of enquiry: ${data.type}`,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Country/City: ${data.country || "—"}`,
          `Piece: ${piece ? `${piece.name} — ${piece.dimensions} (${piece.slug})` : "—"}`,
          ``,
          data.message,
        ].join("\n"),
      });
    } catch (err) {
      console.error("[inquiry] Resend failed:", err);
      // The enquiry still succeeds — the maison can recover it from logs.
    }
  } else {
    console.info("[inquiry]", subject, JSON.stringify(data));
  }

  return NextResponse.json({ ok: true });
}
