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

- **Resend** — set `RESEND_API_KEY` (+ `INQUIRY_TO_EMAIL`) and the consultation form emails the maison. Without it, inquiries log to the server console and still succeed.
- **PostgreSQL/Prisma** — `npm run db:push && npm run db:seed` persists the archive and inquiries. The site itself reads from `src/data/` (fast, static, CDN-friendly); swap queries to Prisma when a CMS workflow is needed.
- **Stripe** — intentionally absent from the UI (consultation-driven sales). Add a deposit flow later if desired.
- **Vercel** — `vercel deploy`. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Editorial content — review before launch

These were written for the brand voice and **should be confirmed/adjusted by the house** in `src/data/`:

1. **Artisan-hours** per piece (`hours`, distributed across `process`) — editorial estimates (24–186 hrs by craft/format).
2. **Edition numbers** (`edition: { number, of }`) — placeholders until real edition sizes are set.
3. **Designer's notes / inspiration / collector notes** — written in Archit's voice; he should make them his own.
4. **Dimensions** for Baagh Check & Kendra cushions (16″×16″ assumed) and Genda Baagh quilt (Queen assumed) — not listed on the current site.
5. Contact phone is omitted (current site shows a placeholder); address & email carried over.

## Replacing the hero film

`src/components/HeroFilm.tsx` ships as a slow Ken Burns crossfade of macro craft photography. When real footage of hands/carving/printing exists, drop a `<video>` in its place — the component is documented for the swap.
