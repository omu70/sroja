import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ShopGrid from "@/components/ShopGrid";
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
    <section className="bg-ivory-bright pb-24 pt-40 md:pt-52">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow text-brass">The Shop</p>
          <h1 className="display mt-5 text-6xl leading-[0.98] text-charcoal md:text-8xl">
            All {PIECES.length} <span className="italic text-stone-dark">pieces.</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-3">
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

        <div className="rule-live mt-10" />

        <div className="mt-10">
          <ShopGrid pieces={PIECES} />
        </div>
      </div>
    </section>
  );
}
