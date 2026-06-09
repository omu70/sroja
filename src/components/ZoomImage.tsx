// ------------------------------------------------------------------------
// Zoomable Image
//
// Click an image to open a full-screen zoom view.
// ------------------------------------------------------------------------

"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

/** Click to study — ultra-high-resolution viewing, like leaning into the vitrine. */
export default function ZoomImage({ src, alt, className = "", sizes }: ZoomImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`group relative block w-full cursor-zoom-in overflow-hidden bg-ivory-soft ${className}`}
        aria-label={`Study ${alt} in detail`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className="img-luxe object-cover transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.04]"
        />
        <span className="eyebrow absolute bottom-4 right-4 bg-ivory-bright/90 px-3 py-2 text-[0.55rem] text-charcoal opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
          Study +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center bg-charcoal-deep/95 p-4 backdrop-blur-md md:p-12"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full"
            >
              <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
            </motion.div>
            <p className="eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-dark">
              {alt} — click anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
