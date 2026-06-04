import ParallaxImage from "./ParallaxImage";
import { IconLotus } from "./icons";

interface ImageBandProps {
  src: string;
  alt: string;
  line?: string;
  height?: string;
}

/**
 * A full-bleed photographic interlude — the page breathes between chapters.
 * Image drifts in parallax; one line at most.
 */
export default function ImageBand({
  src,
  alt,
  line,
  height = "h-[46vh] md:h-[60vh]",
}: ImageBandProps) {
  return (
    <section className={`relative w-full overflow-hidden ${height}`}>
      <ParallaxImage src={src} alt={alt} className="h-full w-full" sizes="100vw" strength={10} />
      <div className="absolute inset-0 bg-charcoal-deep/25" />
      {line && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <IconLotus size={22} className="text-gold animate-pulse-soft" />
            <p className="display max-w-3xl text-3xl italic text-ivory md:text-5xl">{line}</p>
          </div>
        </div>
      )}
    </section>
  );
}
