import Link from "next/link";
import { NAV, SITE, COLLECTIONS } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-charcoal-line bg-charcoal-deep">
      <div className="mx-auto max-w-[1700px] px-6 py-20 md:px-12 md:py-28">
        {/* Statement */}
        <p className="display max-w-4xl text-4xl text-ivory md:text-6xl">
          Designed to be collected.
          <span className="text-stone"> Crafted to be inherited.</span>
        </p>

        <div className="rule mt-16 mb-14" />

        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="display text-xl tracking-[0.42em] text-ivory">SROJA</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              A luxury design house from India. Original works by {SITE.founder},
              handcrafted by master artisans in deliberately small editions.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5 text-brass">The House</p>
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
            <p className="eyebrow mb-5 text-brass">The Archive</p>
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
            <p className="eyebrow mb-5 text-brass">Private Enquiries</p>
            <p className="text-sm leading-relaxed text-ivory/75">
              <a href={`mailto:${SITE.email}`} className="link-line hover:text-ivory">
                {SITE.email}
              </a>
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-stone">
              {SITE.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 text-sm text-stone">By appointment.</p>
          </div>
        </div>

        <div className="rule-solid mt-16 mb-8" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-stone-dark">
            Every SROJA design is an original work by {SITE.founder}, protected under
            Intellectual Property Rights. Reproduction or commercial use without
            authorisation is prohibited.
          </p>
          <p className="shrink-0 text-xs text-stone-dark">
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
