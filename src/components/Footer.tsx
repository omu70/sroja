// ------------------------------------------------------------------------
// Footer
//
// The dark footer at the bottom of every page: links, contact, payment info.
// ------------------------------------------------------------------------

import Link from "next/link";
import { NAV, SITE, COLLECTIONS } from "@/data/site";
import BrandLogo from "./BrandLogo";
import { IconEnvelope, IconPin, IconCalendar } from "./icons";

/** The footer stays charcoal — the page's signature in ink. */
export default function Footer() {
  return (
    <footer className="relative border-t border-ivory-mute bg-charcoal-deep">
      <div className="mx-auto max-w-[1700px] px-6 py-16 md:px-12 md:py-24">
        {/* Statement */}
        <div className="flex flex-wrap items-start justify-between gap-8">
          <p className="display max-w-3xl text-4xl text-ivory md:text-6xl">
            Designed to be collected.
            <span className="text-stone"> Crafted to be inherited.</span>
          </p>
          <BrandLogo variant="mark" tone="gold" className="h-14 w-14 shrink-0 animate-spin-slow opacity-70" />
        </div>

        <div className="rule mt-14 mb-12" />

        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <BrandLogo tone="ivory" className="h-8 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              A luxury design house from India. Original designs, handcrafted in
              deliberately small, numbered editions.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5 text-brass-bright">The House</p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-line text-sm text-ivory/75 hover:text-ivory">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-brass-bright">The Shop</p>
            <ul className="space-y-3">
              {COLLECTIONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="link-line text-sm text-ivory/75 hover:text-ivory"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-brass-bright">Contact</p>
            <ul className="space-y-4 text-sm text-ivory/75">
              <li className="flex items-start gap-3">
                <IconEnvelope size={16} className="mt-0.5 shrink-0 text-brass-bright" />
                <a href={`mailto:${SITE.email}`} className="link-line hover:text-ivory">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IconPin size={16} className="mt-0.5 shrink-0 text-brass-bright" />
                <address className="not-italic leading-relaxed text-stone">
                  {SITE.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex items-start gap-3">
                <IconCalendar size={16} className="mt-0.5 shrink-0 text-brass-bright" />
                <span className="text-stone">By appointment</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-solid mt-14 mb-8 opacity-30" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-stone-dark">
            Every design here is an original SROJA work, protected under
            Intellectual Property Rights. Copying or commercial use without
            permission is prohibited.
          </p>
          <div className="shrink-0 text-right">
            <p className="eyebrow text-[0.52rem] text-stone-dark">
              UPI · Visa · Mastercard · Netbanking — secured by Razorpay
            </p>
            <p className="mt-2 text-xs text-stone-dark">
              © {new Date().getFullYear()} {SITE.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
