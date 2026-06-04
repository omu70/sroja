# SROJA — Maison

A luxury design house website. Not a store — an archive.

Built with **Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Three.js (React Three Fiber) · Lenis · Prisma (optional) · Resend (optional)**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

The site runs **with zero configuration** — no database or API keys required. All 28 works live in `src/data/` as a curated static archive, and imagery is served from the existing sroja.in Supabase storage.

## What's inside

| Route | Experience |
|---|---|
| `/` | Cinematic hero film, The Vision of Archit, GSAP horizontal craftsmanship timeline, manifesto, signature works, interactive Material Library (with 3D "Thread"), world map, IPR/provenance, Collector Notes, Atelier, Private Consultation |
| `/collections` | The Archive — five "rooms" with manifestos and asymmetric galleries |
| `/collections/[slug]` | A room: manifesto wall + full editorial showcases (no product grid) |
| `/piece/[slug]` | The Dossier — 9 acts: full-screen work, designer's note, story & inspiration, hour-by-hour making, specifications + palette, zoomable gallery, certificate, acquisition (Request Acquisition / consultation), "From the Designer's Collection" |
| `/maison` | Archit — the designer, the principles |
| `/atelier` | The three craft regions, artisan-hours, process |
| `/provenance` | IPR & authenticity charter + specimen certificate |
| `/consultation` | The inquiry workflow (no cart, ever) |

Plus: SEO metadata per page, JSON-LD (Organization + Product), `sitemap.xml`, `robots.txt`, prefers-reduced-motion support, lazy-mounted 3D.

## Optional wiring

Copy `.env.example` → `.env`:

- **Razorpay (online payments)** — set `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` (Dashboard → Settings → API Keys) and every piece page gets a working "Acquire & Pay Online" flow: UPI, cards, netbanking. Orders are created server-side at the server's price, signatures are verified with HMAC, and buyer + delivery details are stored on the Razorpay order notes. **Without keys, the buy button gracefully falls back to the enquiry flow** — the site never breaks.
- **Resend** — set `RESEND_API_KEY` (+ `INQUIRY_TO_EMAIL`) and (a) enquiries email the maison, (b) successful payments notify both the maison and the buyer. Without it, everything logs to the server console and still succeeds.
- **PostgreSQL/Prisma** — `npm run db:push && npm run db:seed` persists the archive and inquiries. The site itself reads from `src/data/` (fast, static, CDN-friendly).
- **Vercel** — `vercel deploy`. Set `NEXT_PUBLIC_SITE_URL` to the production domain, and add the Razorpay/Resend env vars in Project Settings.

## Editorial content — review before launch

These were written for the brand voice and **should be confirmed/adjusted by the house** in `src/data/`:

1. **Artisan-hours** per piece (`hours`, distributed across `process`) — editorial estimates (24–186 hrs by craft/format).
2. **Edition numbers** (`edition: { number, of }`) — placeholders until real edition sizes are set.
3. **Designer's notes / inspiration / collector notes** — written in Archit's voice; he should make them his own.
4. **Dimensions** for Baagh Check & Kendra cushions (16″×16″ assumed) and Genda Baagh quilt (Queen assumed) — not listed on the current site.
5. Contact phone is omitted (current site shows a placeholder); address & email carried over.

## Replacing the hero film

`src/components/HeroFilm.tsx` ships as a slow Ken Burns crossfade of macro craft photography. When real footage of hands/carving/printing exists, drop a `<video>` in its place — the component is documented for the swap.
