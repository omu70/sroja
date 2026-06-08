import type { Metadata } from "next";
import { serif, sans, brand } from "@/lib/fonts";
import { SITE } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Collectible Handcrafted Design | Luxury Indian Design House`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "luxury handcrafted textiles",
    "collectible design objects",
    "functional art pieces",
    "designer handcrafted creations",
    "limited edition luxury decor",
    "artisan-made luxury products",
    "luxury Indian design house",
    "premium handcrafted collectibles",
    "hand block printing",
    "Bhujodi weaving",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Designed To Be Collected`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  founder: { "@type": "Person", name: SITE.founder, jobTitle: SITE.founderTitle },
  address: {
    "@type": "PostalAddress",
    streetAddress: "IRIS Tech Tower, A-06–10, Sector 48",
    addressLocality: "Gurugram",
    postalCode: "122018",
    addressCountry: "IN",
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${brand.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <Cursor />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
