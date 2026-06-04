import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ZoomImage from "@/components/ZoomImage";
import CountUp from "@/components/CountUp";
import InquiryForm from "@/components/InquiryForm";
import LoomObjectLazy from "@/components/LoomObjectLazy";
import { COLLECTIONS, SITE } from "@/data/site";
import { PIECES, getPiece, getRelated, formatINR } from "@/data/pieces";
import {
  IconClock,
  IconHand,
  IconHash,
  IconLayers,
  IconLotus,
  IconPin,
  IconRuler,
  IconShield,
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
    title: `${piece.name} — ${collection?.title ?? "The Archive"} | Limited Edition Handcrafted Design`,
    description: `${piece.description} An original ${piece.craft} work by ${SITE.founder}, crafted over ${piece.hours} artisan-hours. Edition of ${piece.edition.of}. Protected under IPR.`,
    openGraph: { images: [{ url: piece.images[0] }] },
  };
}

/** The Dossier — a museum label grown into a page. */
export default async function PieceDossier({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) notFound();

  const collection = COLLECTIONS.find((c) => c.slug === piece.collection);
  const related = getRelated(piece);
  const editionLabel = `Edition ${String(piece.edition.number).padStart(2, "0")} / ${piece.edition.of}`;

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

      {/* ── Act I — The work, full screen ─────────────────────── */}
      <section className="grain relative h-[100svh] min-h-[620px] overflow-hidden">
        <Image
          src={piece.images[0]}
          alt={`${piece.name} — hero study`}
          fill
          priority
          sizes="100vw"
          className="img-luxe object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal-deep/15 to-charcoal-deep/50" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#FAF7EF]" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 md:px-12 md:pb-24">
          <div className="mx-auto max-w-[1700px]">
            <Reveal y={26}>
              <p className="eyebrow text-gold">
                {collection?.title} · {piece.craft}
              </p>
              <h1 className="display mt-4 text-6xl text-ivory md:text-[7.5rem] md:leading-[0.95]">
                {piece.name}
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {[
                  { Icon: IconHash, label: editionLabel },
                  { Icon: IconClock, label: `${piece.hours} hours` },
                  { Icon: IconPin, label: piece.region },
                ].map(({ Icon, label }) => (
                  <span
                    key={label}
                    className="eyebrow flex items-center gap-2.5 border border-ivory/25 bg-charcoal-deep/40 px-4 py-2.5 text-ivory/90 backdrop-blur-sm"
                  >
                    <Icon size={14} className="text-gold" />
                    {label}
                  </span>
                ))}
                <span className="eyebrow flex items-center gap-2.5 border border-gold/50 bg-charcoal-deep/40 px-4 py-2.5 text-gold backdrop-blur-sm">
                  {formatINR(piece.price)}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Act II — From the designer ─────────────────────────── */}
      <section className="border-t border-ivory-mute bg-ivory-bright py-24 md:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">From The Designer</p>
            <p className="display mt-10 text-3xl leading-[1.3] text-charcoal md:text-[2.7rem]">
              <span aria-hidden className="text-brass">“</span>
              {piece.designersNote}
              <span aria-hidden className="text-brass">”</span>
            </p>
            <p className="display mt-10 text-2xl italic text-brass">{SITE.founder}</p>
            <p className="eyebrow mt-1 text-stone-dark">{SITE.founderTitle}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Act III — Story & inspiration ──────────────────────── */}
      <section className="border-t border-ivory-mute bg-ivory py-24 md:py-36">
        <div className="mx-auto grid max-w-[1700px] items-center gap-14 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-5">
            <Reveal>
              <ParallaxImage
                src={piece.images[1] ?? piece.images[0]}
                alt={`${piece.name} — detail`}
                className="aspect-[3/4] w-full"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="eyebrow text-brass">The Story</p>
              <p className="mt-8 text-base leading-[1.95] text-charcoal/85 md:text-lg">
                {piece.story}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-12 border-l border-brass/40 pl-6">
                <p className="eyebrow text-stone-dark">The Inspiration</p>
                <p className="lede mt-3 text-xl text-charcoal md:text-2xl">
                  {piece.inspiration}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-12 text-sm leading-relaxed text-stone-dark">
                {piece.uniqueness}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Act IV — The making, hour by hour ──────────────────── */}
      <section className="border-t border-ivory-mute bg-ivory-bright py-24 md:py-36">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">The Making</p>
            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
              <h2 className="display text-5xl text-charcoal md:text-7xl">
                Crafted over{" "}
                <CountUp to={piece.hours} className="text-brass" /> hours.
              </h2>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-dark">
              {piece.artisans} artisans · {piece.region} · hours recorded across the
              phases below
            </p>
          </Reveal>

          <ol className="mt-16 border-t border-ivory-mute">
            {piece.process.map((step, i) => (
              <Reveal key={step.phase}>
                <li className="grid gap-4 border-b border-ivory-mute py-8 md:grid-cols-12 md:items-baseline md:py-10">
                  <p className="display text-2xl text-brass/70 md:col-span-1">
                    0{i + 1}
                  </p>
                  <p className="display text-3xl text-charcoal md:col-span-3 md:text-4xl">
                    {step.phase}
                  </p>
                  <p className="text-sm leading-relaxed text-stone-dark md:col-span-6 md:text-base">
                    {step.detail}
                  </p>
                  <p className="eyebrow md:col-span-2 md:text-right">
                    <span className="text-brass">{step.hours}</span>
                    <span className="text-stone-dark"> hrs</span>
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Act V — The dossier (specifications) ───────────────── */}
      <section className="border-t border-ivory-mute bg-ivory py-24 md:py-36">
        <div className="mx-auto grid max-w-[1700px] gap-14 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow text-brass">The Dossier</p>
              <h2 className="display mt-4 text-5xl text-charcoal md:text-6xl">
                Specifications,
                <span className="italic text-stone-dark"> as drawn.</span>
              </h2>
              <div className="mt-10 hidden md:block">
                <LoomObjectLazy className="h-72 w-72 opacity-90" />
                <p className="eyebrow mt-2 text-stone-dark">
                  The Thread — digital maquette of the house
                </p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <dl className="divide-y divide-ivory-mute border-y border-ivory-mute">
                {(
                  [
                    [IconLayers, "Materials", piece.materials.join(" · ")],
                    [IconRuler, "Dimensions", piece.dimensions],
                    [IconHand, "Craft", `${piece.craft} — ${piece.region}`],
                    [IconHash, "Edition", `${editionLabel} — numbered & certified`],
                    [IconClock, "Creation time", `${piece.hours} artisan-hours`],
                    [IconLotus, "Artisans", `${piece.artisans} master hands`],
                    [IconShield, "Provenance", `Original design by ${SITE.founder}, protected under IPR`],
                  ] as const
                ).map(([Icon, k, v]) => (
                  <div key={k} className="grid grid-cols-3 items-baseline gap-6 py-5">
                    <dt className="eyebrow flex items-center gap-3 text-stone-dark">
                      <Icon size={16} className="shrink-0 self-center text-brass" />
                      {k}
                    </dt>
                    <dd className="col-span-2 text-sm leading-relaxed text-charcoal md:text-base">
                      {v}
                    </dd>
                  </div>
                ))}
                <div className="grid grid-cols-3 items-center gap-6 py-5">
                  <dt className="eyebrow text-stone-dark">Palette</dt>
                  <dd className="col-span-2 flex items-center gap-3">
                    {piece.palette.map((hex) => (
                      <span
                        key={hex}
                        className="h-8 w-8 rounded-full border border-charcoal/15 shadow-sm"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Act VI — The gallery ───────────────────────────────── */}
      {piece.images.length > 2 && (
        <section className="border-t border-ivory-mute bg-ivory-bright py-24 md:py-36">
          <div className="mx-auto max-w-[1700px] px-6 md:px-12">
            <Reveal>
              <p className="eyebrow text-brass">The Gallery</p>
              <h2 className="display mt-4 text-5xl text-charcoal md:text-6xl">
                Closer. <span className="italic text-stone-dark">Closer still.</span>
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-12">
              {piece.images.slice(1).map((src, i) => {
                const spans = [
                  "md:col-span-7 aspect-[16/11]",
                  "md:col-span-5 aspect-[3/4] md:mt-24",
                  "md:col-span-5 aspect-square",
                  "md:col-span-7 aspect-[16/10] md:mt-16",
                  "md:col-span-6 aspect-[4/3]",
                ];
                return (
                  <Reveal key={src} delay={0.06 * i} className={spans[i % spans.length]}>
                    <ZoomImage
                      src={src}
                      alt={`${piece.name} — study ${i + 2}`}
                      className="h-full w-full"
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Act VII — Certificate ──────────────────────────────── */}
      <section className="border-t border-ivory-mute bg-ivory py-24 md:py-36">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <Reveal>
            <div className="relative border border-brass/40 bg-ivory-bright p-10 text-center shadow-[0_50px_90px_-55px_rgba(27,24,19,0.4)] md:p-16">
              <div className="absolute inset-2 border border-brass/20" />
              <IconLotus size={26} className="mx-auto text-brass animate-pulse-soft" />
              <p className="eyebrow mt-5 text-brass">Certificate of Authenticity</p>
              <p className="display mt-8 text-3xl leading-snug text-charcoal md:text-4xl">
                {piece.name} is certified an original design by {SITE.founder} —
                designed at the maison, handcrafted by master artisans, released as{" "}
                {editionLabel.toLowerCase()}.
              </p>
              <p className="mt-8 text-sm leading-relaxed text-stone-dark">
                Protected under Intellectual Property Rights. This design cannot be
                replicated, reproduced, or commercially utilised without
                authorisation. The certificate accompanies the piece, recording its
                edition number, artisan-hours and date of completion.
              </p>
              <p className="display mt-10 text-2xl italic text-brass">{SITE.founder}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Act VIII — Acquisition ─────────────────────────────── */}
      <section id="acquire" className="border-t border-ivory-mute bg-ivory-bright py-24 md:py-36">
        <div className="mx-auto grid max-w-[1700px] gap-16 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow text-brass">Acquisition</p>
              <h2 className="display mt-4 text-5xl text-charcoal md:text-6xl">
                Begin the
                <span className="italic text-stone-dark"> conversation.</span>
              </h2>
              <p className="mt-8 text-base leading-[1.9] text-charcoal/80">
                {piece.name} is currently {editionLabel.toLowerCase()}, at{" "}
                <span className="text-brass">{formatINR(piece.price)}</span>. There is
                no checkout — a design advisor confirms the edition, walks you through
                provenance and care, and arranges insured delivery anywhere in the
                world.
              </p>
              <ul className="mt-10 space-y-4 text-sm text-stone-dark">
                <li className="flex items-center gap-3">
                  <IconHash size={16} className="shrink-0 text-brass" />
                  Request Acquisition · reserve this numbered edition
                </li>
                <li className="flex items-center gap-3">
                  <IconClock size={16} className="shrink-0 text-brass" />
                  Enquire About This Piece · ask anything first
                </li>
                <li className="flex items-center gap-3">
                  <IconLotus size={16} className="shrink-0 text-brass" />
                  Schedule Private Consultation · compose a whole room
                </li>
              </ul>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.12}>
              <InquiryForm defaultPiece={piece.slug} defaultType="Request Acquisition" compact />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Act IX — From the designer's collection ────────────── */}
      <section className="border-t border-ivory-mute bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-[1700px] px-6 md:px-12">
          <Reveal>
            <p className="eyebrow text-brass">From The Designer’s Collection</p>
            <h2 className="display mt-4 text-4xl text-charcoal md:text-5xl">
              Works that share its blood.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={0.08 * i}>
                <Link href={`/piece/${r.slug}`} className="group block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-soft">
                    <Image
                      src={r.images[0]}
                      alt={r.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="img-luxe object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="display mt-5 text-2xl text-charcoal transition-colors duration-500 group-hover:text-brass">
                    {r.name}
                  </p>
                  <p className="eyebrow mt-1 text-stone-dark">
                    {r.craft} · Edition of {r.edition.of}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
