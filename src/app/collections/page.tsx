import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ShopGrid from "@/components/ShopGrid";
import TrustStrip from "@/components/TrustStrip";
import CountUp from "@/components/CountUp";
import { PIECES } from "@/data/pieces";
import { IconClock, IconHash, IconLayers, IconLotus } from "@/components/icons";

export const metadata: Metadata = {
  title: "Shop — All Limited Edition Pieces",
  description:
    "Shop the complete SROJA collection: 28 limited-edition handcrafted pieces — cushions, bed linens, quilts, dohars and curtains. Buy online with UPI, cards or netbanking.",
};

/** The Shop — every piece on one page. */
export default function ShopPage() {
  const totalHours = PIECES.reduce((a, p) => a + p.hours, 0);

  return (
    <section className="bg-ivory-bright pb-20 pt-32 md:pb-24 md:pt-52">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow text-brass">The Shop</p>
          <h1 className="display mt-4 text-5xl leading-[0.98] text-charcoal md:text-8xl">
            All {PIECES.length} <span className="italic text-stone-dark">pieces.</span>
          </h1>
          <p className="lede mt-3 text-lg text-stone-dark md:hidden">
            Numbered, certified, handcrafted — every one an original.
          </p>

          {/* Stats — desktop only, keeps the mobile header tight */}
          <div className="mt-8 hidden flex-wrap items-center gap-x-9 gap-y-3 md:flex">
            {[
              { Icon: IconLayers, value: <CountUp to={PIECES.length} />, label: "numbered pieces" },
              { Icon: IconClock, value: <CountUp to={totalHours} />, label: "artisan-hours" },
              { Icon: IconLotus, value: <>3</>, label: "living crafts" },
              { Icon: IconHash, value: <>≤50</>, label: "per edition" },
            ].map(({ Icon, value, label }) => (
              <span key={label} className="flex items-center gap-2.5">
                <Icon size={17} className="text-brass" />
                <span className="display text-2xl text-charcoal md:text-3xl">{value}</span>
                <span className="eyebrow text-stone-dark">{label}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <TrustStrip className="mt-7 md:mt-9" />
        </Reveal>

        <div className="mt-9">
          <ShopGrid pieces={PIECES} />
        </div>
      </div>
    </section>
  );
}
