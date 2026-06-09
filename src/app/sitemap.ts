// ------------------------------------------------------------------------
// Sitemap generator (sitemap.xml)
//
// Lists every page so search engines (Google) can find them.
// ------------------------------------------------------------------------

import type { MetadataRoute } from "next";
import { SITE, COLLECTIONS } from "@/data/site";
import { PIECES } from "@/data/pieces";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...["collections", "maison", "atelier", "provenance", "consultation"].map((p) => ({
      url: `${SITE.url}/${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...COLLECTIONS.map((c) => ({
      url: `${SITE.url}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...PIECES.map((p) => ({
      url: `${SITE.url}/piece/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
