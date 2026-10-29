import { Router } from 'express';
import { prisma } from '../db/prisma.js';

const router = Router();

// Shape mirrors client/src/data/catalog.js, so the client keeps its accessors.
router.get('/', async (_request, response) => {
  const rows = await prisma.series.findMany({
    orderBy: { position: 'asc' },
    include: { works: { orderBy: { position: 'asc' } } },
  });

  response.json({
    series: rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      year: row.year,
      category: row.category,
      cover: row.cover,
      works: row.works.map((work) => ({
        slug: work.slug,
        title: work.title,
        year: work.year,
        dimensionsPrimary: work.dimensionsPrimary,
        dimensionsSecondary: work.dimensionsSecondary,
        thumb: work.thumb,
        image: work.image,
        video: work.video,
        missingSource: work.missingSource,
      })),
    })),
  });
});

router.get('/:slug', async (request, response) => {
  const series = await prisma.series.findUnique({
    where: { slug: request.params.slug },
    include: { works: { orderBy: { position: 'asc' } } },
  });

  if (!series) {
    response.status(404).json({ error: 'Serie non trovata.' });
    return;
  }

  response.json({
    series: {
      slug: series.slug,
      title: series.title,
      year: series.year,
      category: series.category,
      cover: series.cover,
      works: series.works.map((work) => ({
        slug: work.slug,
        title: work.title,
        year: work.year,
        dimensionsPrimary: work.dimensionsPrimary,
        dimensionsSecondary: work.dimensionsSecondary,
        thumb: work.thumb,
        image: work.image,
        video: work.video,
        missingSource: work.missingSource,
      })),
    },
  });
});

export default router;
