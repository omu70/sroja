/**
 * Seeds the PostgreSQL archive from the curated static data.
 * Requires DATABASE_URL. Run: npm run db:push && npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import { PIECES } from "../src/data/pieces";

const prisma = new PrismaClient();

async function main() {
  for (const p of PIECES) {
    await prisma.piece.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        name: p.name,
        collection: p.collection,
        craft: p.craft,
        region: p.region,
        price: p.price,
        hours: p.hours,
        artisans: p.artisans,
        editionSize: p.edition.of,
        materials: p.materials.join(" · "),
        dimensions: p.dimensions,
        description: p.description,
        designersNote: p.designersNote,
        inspiration: p.inspiration,
        story: p.story,
        uniqueness: p.uniqueness,
        images: p.images,
        featured: Boolean(p.featured),
      },
      update: {
        price: p.price,
        hours: p.hours,
        editionSize: p.edition.of,
        images: p.images,
        featured: Boolean(p.featured),
      },
    });
  }
  console.log(`Seeded ${PIECES.length} pieces.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
