// ------------------------------------------------------------------------
// Trust Badges Row
//
// The reassurance row: free shipping, returns, certificate, payment methods.
// ------------------------------------------------------------------------

import { IconCrate, IconCertificate, IconShield, IconArrow } from "./icons";

const ITEMS = [
  { Icon: IconCrate, label: "Free insured shipping ₹15,000+" },
  { Icon: IconArrow, label: "30-day returns" },
  { Icon: IconCertificate, label: "Certificate included" },
  { Icon: IconShield, label: "UPI · Cards · Netbanking" },
] as const;

/** The reassurance line — four facts, no sentences. Lives beside every buy decision. */
export default function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-2 gap-px overflow-hidden border border-ivory-mute bg-ivory-mute md:grid-cols-4 ${className}`}
    >
      {ITEMS.map(({ Icon, label }) => (
        <span
          key={label}
          className="flex items-center justify-center gap-2.5 bg-ivory-bright px-3 py-4 text-center"
        >
          <Icon size={15} className="shrink-0 text-brass" />
          <span className="eyebrow text-[0.52rem] text-stone-dark">{label}</span>
        </span>
      ))}
    </div>
  );
}
