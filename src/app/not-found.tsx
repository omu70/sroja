import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-ivory-bright px-6 text-center">
      <p className="eyebrow text-brass">404</p>
      <h1 className="display mt-6 text-6xl text-charcoal md:text-8xl">
        Page <span className="italic text-stone-dark">not found.</span>
      </h1>
      <p className="lede mt-8 max-w-md text-lg text-stone-dark">
        The piece may have moved, or the edition may have closed.
      </p>
      <Link
        href="/"
        className="eyebrow mt-12 border border-brass/60 px-10 py-5 text-brass transition-all duration-700 hover:border-charcoal hover:bg-charcoal hover:text-gold"
      >
        Back To Home
      </Link>
    </section>
  );
}
