// Seeds the business content into MySQL. Source of truth until the client
// pages move to the API: client/src/data/catalog.js for the catalogue and
// client/src/data/site.js for the critical texts.
// Run with: npm run db:seed (server workspace)

import { prisma } from './prisma.js';
import { series } from '../../../client/src/data/catalog.js';
import { texts } from '../../../client/src/data/site.js';

// Contact form submissions are never wiped by a re-seed.
async function main() {
  await prisma.work.deleteMany();
  await prisma.series.deleteMany();
  await prisma.criticalText.deleteMany();

  for (const [index, item] of series.entries()) {
    await prisma.series.create({
      data: {
        slug: item.slug,
        title: item.title,
        year: item.year,
        category: item.category,
        cover: item.cover,
        position: index + 1,
        works: {
          create: item.works.map((work, workIndex) => ({
            slug: work.slug,
            title: work.title,
            year: work.year,
            dimensionsPrimary: work.dimensionsPrimary,
            dimensionsSecondary: work.dimensionsSecondary,
            thumb: work.thumb,
            image: work.image,
            video: work.video,
            missingSource: work.missingSource,
            position: workIndex + 1,
          })),
        },
      },
    });
  }

  for (const [index, item] of texts.entries()) {
    await prisma.criticalText.create({
      data: {
        slug: item.slug,
        title: item.title,
        author: item.author,
        year: item.year,
        languages: item.languages,
        position: index + 1,
      },
    });
  }

  const [seriesCount, workCount, textCount, inquiryCount] = await Promise.all([
    prisma.series.count(),
    prisma.work.count(),
    prisma.criticalText.count(),
    prisma.inquiry.count(),
  ]);

  console.log(
    `Seeded ${seriesCount} series, ${workCount} works, ${textCount} texts. ${inquiryCount} inquiries kept.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
