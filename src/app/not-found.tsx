import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-charcoal-deep px-6 text-center">
      <p className="eyebrow text-brass">Not In The Archive</p>
      <h1 className="display mt-6 text-6xl text-ivory md:text-8xl">
        This room <span className="italic text-stone">does not exist.</span>
      </h1>
      <p className="lede mt-8 max-w-md text-lg text-stone">
        Perhaps the edition closed, or the corridor was never built.
      </p>
      <Link
        href="/"
        className="eyebrow mt-12 border border-brass/60 px-10 py-5 text-gold transition-all duration-700 hover:border-gold hover:bg-gold hover:text-charcoal-deep"
      >
        Return To The Maison
      </Link>
    </section>
  );
}
