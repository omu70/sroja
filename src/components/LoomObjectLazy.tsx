// ------------------------------------------------------------------------
// 3D Thread Loader
//
// Loads the 3D object only when it scrolls into view (keeps the site fast).
// ------------------------------------------------------------------------

"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";

const LoomObject = dynamic(() => import("./LoomObject"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

/** Mounts the 3D thread only when on stage — the orchestra doesn't play to an empty hall. */
export default function LoomObjectLazy({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "20% 0px 20% 0px" });
  return (
    <div ref={ref} className={className}>
      {inView ? <LoomObject className="h-full w-full" /> : null}
    </div>
  );
}
