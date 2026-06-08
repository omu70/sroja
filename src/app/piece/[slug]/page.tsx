import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ZoomImage from "@/components/ZoomImage";
import AcquisitionPanel from "@/components/AcquisitionPanel";
import TrustStrip from "@/components/TrustStrip";
import StickyBuyBar from "@/components/StickyBuyBar";
import HoursBars from "@/components/HoursBars";
import DimensionDrawing from "@/components/DimensionDrawing";
import CountUp from "@/components/CountUp";
import { COLLECTIONS, SITE } from "@/data/site";
import { PIECES, getPiece, getRelated, formatINR } from "@/data/pieces";
import { getCare } from "@/data/care";
import {
  IconClock,
  IconCrate,
  IconHand,
  IconHash,
  IconLayers,
  IconLeaf,
  IconRuler,
  IconShield,
  IconThread,
} from "@/components/icons";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return PIECES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) return {};
  const collection = COLLECTIONS.find((c) => c.slug === piece.collection);
  return {
    title: `${piece.name} — ${collection?.title ?? "Shop"} | Buy Limited Edition Handcrafted Design`,
    description: `${piece.description} ${piece.hours} artisan-hours, edition of ${piece.edition.of}, IPR-protected. Buy online — UPI, cards, netbanking.`,
    openGraph: { images: [{ url: piece.images[0] }] },
  };
}

/** The product page — buy first, story as captions. Light and fast. */
export default async function PiecePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) notFound();

  const collection = COLLECTIONS.find((c) => c.slug === piece.collection);
  const related = getRelated(piece);
  const care = getCare(piece.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${piece.name} — ${collection?.title ?? ""}`,
    image: piece.images,
    description: piece.description,
    brand: { "@type": "Brand", name: SITE.name },
    material: piece.materials.join(", "),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: piece.price,
      availability: "https://schema.org/LimitedAvailability",
      url: `${SITE.url}/piece/${piece.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StickyBuyBar piece={piece} />

      {/* ── 1 · The work ──────────────────────────────────────── */}
      <section className="grain relative h-[72svh] min-h-[480px] overflow-hidden">
        <Image
          src={piece.images[0]}
          alt={piece.name}
          fill
          priority
          sizes="100vw"
          className="img-luxe object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-charcoal-deep/40" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#FAF7EF]" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-14 md:px-12">
          <div className="mx-auto max-w-[1700px]">
            <Reveal y={22}>
              <p className="eyebrow text-gold">
                {collection?.title} · {piece.craft}
              </p>
              <h1 className="display mt-3 text-5xl text-ivory md:text-8xl">{piece.name}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#acquire"
                  className="eyebrow border border-gold bg-gold px-6 py-3 text-charcoal-deep transition-all duration-500 hover:bg-ivory hover:border-ivory"
                >
                  Buy Now — {formatINR(piece.price)}
                </a>
                <span className="eyebrow flex items-center gap-2 border border-ivory/25 bg-charcoal-deep/40 px-4 py-3 text-ivory/90 backdrop-blur-sm">
                  <IconHash size={13} className="text-gold" />
                  Edition {String(piece.edition.number).padStart(2, "0")}/{piece.edition.of}
                </span>
                <span className="eyebrow hidden items-center gap-2 border border-ivory/25 bg-charcoal-deep/40 px-4 py-3 text-ivory/90 backdrop-blur-sm sm:flex">
                  <IconClock size={13} className="text-gold" />
                  {piece.hours} hrs
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2 · Gallery + Buy ─────────────────────────────────── */}
      <section id="acquire" className="bg-ivory-bright py-16 md:py-24">
        <div className="mx-auto grid max-w-[1700px] gap-10 px-6 md:px-12 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {piece.images.slice(0, 4).map((src, i) => (
                <Reveal key={src} delay={0.05 * i} className={i === 0 ? "col-span-2" : ""}>
                  <ZoomImage
                    src={src}
                    alt={`${piece.name} — view ${i + 1}`}
                    className={i === 0 ? "aspect-[16/10] w-full" : "aspect-square w-full"}
                  />
                </Reveal>
              ))}
            </div>
            <p className="lede mt-5 text-lg text-stone-dark">{piece.inspiration}</p>
          </div>

          {/* Buy panel */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <AcquisitionPanel piece={piece} />
                <TrustStrip className="mt-5" />
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {piece.palette.map((hex) => (
                    <span
                      key={hex}
                      className="h-8 w-8 rounded-full border border-charcoal/10 shadow-sm"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                  <span className="eyebrow self-center pl-1 text-stone-dark">The palette</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3 · Specs + drawing ───────────────────────────────── */}
      <section className="border-t border-ivory-mute bg-ivory py-16 md:py-24">
        <div className="mx-auto grid max-w-[1700px] items-start gap-12 px-6 md:px-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-brass">Specifications</p>
              <div className="mt-6">
                <DimensionDrawing dimensions={piece.dimensions} name={piece.name} />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.08}>
              <dl className="divide-y divide-ivory-mute border-y border-ivory-mute">
                {(
                  [
                    [IconLayers, "Materials", piece.materials.join(" · ")],
                    [IconThread, "Textile", care?.textile ?? piece.craft],
                    [IconRuler, "Dimensions", piece.dimensions],
                    ...(care?.components ? [[IconCrate, "What's included", care.components] as const] : []),
                    [IconHand, "Craft", `${piece.craft} — ${piece.region}`],
                    [IconHash, "Edition", `${piece.edition.number} of ${piece.edition.of} · numbered & certified`],
                    [IconClock, "Made in", `${piece.hours} artisan-hours · ${piece.artisans} artisans`],
                    [IconShield, "Authenticity", "Original SROJA design — legally protected"],
                  ] as const
                ).map(([Icon, k, v]) => (
                  <div key={k} className="grid grid-cols-3 items-baseline gap-6 py-4">
                    <dt className="eyebrow flex items-center gap-3 text-stone-dark">
                      <Icon size={15} className="shrink-0 self-center text-brass" />
                      {k}
                    </dt>
                    <dd className="col-span-2 text-sm leading-relaxed text-charcoal md:text-base">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Care — straight from the product sheet */}
              {care?.care?.length ? (
                <Reveal delay={0.12}>
                  <div className="mt-8 border border-ivory-mute bg-paper p-6 md:p-8">
                    <p className="eyebrow flex items-center gap-2.5 text-brass">
                      <IconLeaf size={15} /> Care
                    </p>
                    <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {care.care.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-sm text-charcoal/85">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-t border-ivory-mute pt-4 text-xs leading-relaxed text-stone-dark">
                      Minor irregularities in print, weave and colour are inherent to
                      handcrafted textiles — the signature of the human hand, not a flaw.
                    </p>
                  </div>
                </Reveal>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4 · The making (hours) ────────────────────────────── */}
      <section className="border-t border-ivory-mute bg-ivory-bright py-16 md:py-24">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">Why it costs what it costs</p>
            <h2 className="display mt-3 text-4xl text-charcoal md:text-6xl">
              <CountUp to={piece.hours} className="text-brass" /> hours, by hand.
            </h2>
          </Reveal>
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
            <Reveal delay={0.08} className="lg:col-span-7">
              <HoursBars steps={[...piece.process]} total={piece.hours} />
            </Reveal>
            <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
              <Reveal delay={0.15}>
                <ZoomImage
                  src={piece.images[2] ?? piece.images[0]}
                  alt={`${piece.name} — in the making`}
                  className="aspect-[3/4] w-full"
                  sizes="33vw"
                />
              </Reveal>
              <Reveal delay={0.22}>
                <ZoomImage
                  src={piece.images[3] ?? piece.images[1] ?? piece.images[0]}
                  alt={`${piece.name} — detail study`}
                  className="mt-6 aspect-square w-full"
                  sizes="33vw"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 · More like this ────────────────────────────────── */}
      <section className="border-t border-ivory-mute bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="display text-3xl text-charcoal md:text-5xl">More like this</h2>
              <Link href="/collections" className="link-line eyebrow text-brass">
                Shop All →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={0.06 * i}>
                <Link href={`/piece/${r.slug}`} className="group block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-soft">
                    <Image
                      src={r.images[0]}
                      alt={r.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="img-luxe object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <p className="display text-xl text-charcoal transition-colors duration-500 group-hover:text-brass md:text-2xl">
                      {r.name}
                    </p>
                    <p className="eyebrow shrink-0 text-brass">{formatINR(r.price)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
