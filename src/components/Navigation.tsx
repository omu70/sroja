"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/data/site";
import BrandLogo from "./BrandLogo";
import { IconBag, IconEnvelope, IconSearch } from "./icons";

const ICON_LINKS = [
  { href: "/collections", label: "Search the collection", Icon: IconSearch },
  { href: "/consultation", label: "Contact us", Icon: IconEnvelope },
  { href: "/collections", label: "Shop the collection", Icon: IconBag },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const onHero = pathname === "/" || pathname?.startsWith("/piece/");
  const lightText = onHero && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-editorial ${
          scrolled && !open
            ? "border-b border-ivory-mute/80 bg-ivory-bright/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1700px] items-center justify-between px-6 md:px-12">
          {/* Real SROJA logo from the brand manual */}
          <Link href="/" aria-label="SROJA — home" className="group relative z-50">
            <BrandLogo
              tone={lightText ? "ivory" : "charcoal"}
              className="h-9 w-auto transition-opacity duration-500 group-hover:opacity-80 md:h-10"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-line eyebrow transition-colors duration-500 ${
                  pathname?.startsWith(item.href)
                    ? "text-brass"
                    : lightText
                      ? "text-ivory/85 hover:text-ivory"
                      : "text-charcoal/75 hover:text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icon cluster */}
          <div className="relative z-50 flex items-center gap-2 md:gap-3">
            {ICON_LINKS.map(({ href, label, Icon }, i) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                title={label}
                className={`hidden h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-charcoal-deep md:flex ${
                  lightText
                    ? "border-ivory/30 text-ivory"
                    : "border-brass/30 text-brass"
                } ${i === 1 ? "hidden xl:flex" : ""}`}
              >
                <Icon size={17} />
              </Link>
            ))}

            {/* Menu trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className={`flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full border transition-colors duration-500 lg:hidden ${
                lightText && !open ? "border-ivory/30" : "border-brass/30"
              }`}
            >
              <span
                className={`h-px transition-all duration-500 ${
                  open
                    ? "w-5 translate-y-[3.5px] rotate-45 bg-charcoal"
                    : `w-5 ${lightText ? "bg-ivory" : "bg-charcoal"}`
                }`}
              />
              <span
                className={`h-px transition-all duration-500 ${
                  open
                    ? "w-5 -translate-y-[3.5px] -rotate-45 bg-charcoal"
                    : `w-3.5 ${lightText ? "bg-ivory" : "bg-charcoal"}`
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ivory-bright px-8 md:px-16"
          >
            <BrandLogo
              variant="mark"
              tone="charcoal"
              className="pointer-events-none absolute right-[-1.5rem] top-16 h-28 w-28 opacity-10 animate-spin-slow"
            />
            <nav className="flex flex-col gap-2">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="display block py-2 text-5xl text-charcoal transition-colors duration-500 hover:text-brass md:text-7xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="eyebrow mt-12 text-stone-dark"
            >
              Designed to be collected — Gurugram, India
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
