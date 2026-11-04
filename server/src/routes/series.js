import { Router } from 'express';
import { prisma } from '../db/prisma.js';

const router = Router();

function shapeWork(work) {
  return {
    slug: work.slug,
    title: work.title,
    year: work.year,
    dimensionsPrimary: work.dimensionsPrimary,
    dimensionsSecondary: work.dimensionsSecondary,
    thumb: work.thumb,
    thumbWidth: work.thumbWidth,
    thumbHeight: work.thumbHeight,
    image: work.image,
    imageWidth: work.imageWidth,
    imageHeight: work.imageHeight,
    video: work.video,
    missingSource: work.missingSource,
  };
}

// Cover dimensions come from the same source work the cover path comes from,
// so the card keeps the ratio of the file it actually loads.
function shapeSeries(row) {
  const coverWork = row.works.find((work) => work.thumb || work.image) || null;
  const usesThumb = Boolean(coverWork && coverWork.thumb);

  return {
    slug: row.slug,
    title: row.title,
    year: row.year,
    category: row.category,
    cover: row.cover,
    coverWidth: coverWork ? (usesThumb ? coverWork.thumbWidth : coverWork.imageWidth) : null,
    coverHeight: coverWork ? (usesThumb ? coverWork.thumbHeight : coverWork.imageHeight) : null,
    works: row.works.map(shapeWork),
  };
}

// Shape mirrors client/src/data/catalog.js, so the client keeps its accessors.
router.get('/', async (_request, response) => {
  const rows = await prisma.series.findMany({
    orderBy: { position: 'asc' },
    include: { works: { orderBy: { position: 'asc' } } },
  });

  response.json({ series: rows.map(shapeSeries) });
});

router.get('/:slug', async (request, response) => {
  const row = await prisma.series.findUnique({
    where: { slug: request.params.slug },
    include: { works: { orderBy: { position: 'asc' } } },
  });

  if (!row) {
    response.status(404).json({ error: 'Serie non trovata.' });
    return;
  }

  response.json({ series: shapeSeries(row) });
});

export default router;
