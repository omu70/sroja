"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/data/site";

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-editorial ${
          scrolled && !open
            ? "bg-charcoal-deep/85 backdrop-blur-md border-b border-charcoal-line/60"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1700px] items-center justify-between px-6 md:px-12">
          {/* Wordmark */}
          <Link href="/" aria-label="SROJA — home" className="group relative z-50">
            <span className="display text-[1.55rem] tracking-[0.42em] text-ivory transition-colors duration-500 group-hover:text-gold">
              SROJA
            </span>
            <span className="mt-0.5 hidden text-[0.52rem] uppercase tracking-luxe text-stone md:block">
              Design House · India
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-line eyebrow transition-colors duration-500 ${
                  pathname?.startsWith(item.href) ? "text-gold" : "text-ivory/80 hover:text-ivory"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className="eyebrow border border-brass/60 px-6 py-3 text-gold transition-all duration-500 hover:border-gold hover:bg-gold hover:text-charcoal-deep"
            >
              Private Enquiries
            </Link>
          </nav>

          {/* Menu trigger (mobile / tablet) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-10 w-12 flex-col items-end justify-center gap-[7px] lg:hidden"
          >
            <span
              className={`h-px bg-ivory transition-all duration-500 ${
                open ? "w-7 translate-y-[4px] rotate-45" : "w-7"
              }`}
            />
            <span
              className={`h-px bg-ivory transition-all duration-500 ${
                open ? "w-7 -translate-y-[4px] -rotate-45" : "w-5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-charcoal-deep px-8 md:px-16"
          >
            <nav className="flex flex-col gap-2">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="display block py-2 text-5xl text-ivory transition-colors duration-500 hover:text-gold md:text-7xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="eyebrow mt-12 text-stone"
            >
              Designed to be collected — Gurugram, India
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
