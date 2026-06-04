import CountUp from "./CountUp";
import type { SVGProps } from "react";

export interface LedgerItem {
  icon: (p: SVGProps<SVGSVGElement> & { size?: number }) => React.ReactNode;
  /** numeric values count up into view */
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
}

const COLS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

/**
 * The Value Ledger — the price justification, written in numerals instead of
 * paragraphs. Hours, hands, editions: the arithmetic of worth.
 */
export default function ValueLedger({
  items,
  dark = false,
  className = "",
}: {
  items: LedgerItem[];
  dark?: boolean;
  className?: string;
}) {
  const cols = COLS[Math.min(items.length, 5)] ?? "md:grid-cols-4";
  return (
    <div
      className={`grid grid-cols-2 gap-px overflow-hidden border ${cols} ${
        dark ? "border-charcoal-line bg-charcoal-line" : "border-ivory-mute bg-ivory-mute"
      } ${className}`}
    >
      {items.map(({ icon: Icon, value, prefix, suffix, label }) => (
        <div
          key={label}
          className={`group flex flex-col items-center px-4 py-8 text-center md:py-10 ${
            dark ? "bg-charcoal" : "bg-ivory-bright"
          }`}
        >
          <span className="icon-chip">
            <Icon size={20} />
          </span>
          <p
            className={`display mt-5 text-4xl leading-none md:text-5xl ${
              dark ? "text-gold" : "text-brass"
            }`}
          >
            {prefix}
            {typeof value === "number" ? <CountUp to={value} /> : value}
            {suffix}
          </p>
          <p className={`eyebrow mt-3 ${dark ? "text-stone" : "text-stone-dark"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}
