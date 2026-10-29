import { Router } from 'express';
import { prisma } from '../db/prisma.js';

const router = Router();

function toClientShape(row) {
  return {
    slug: row.slug,
    title: row.title,
    author: row.author,
    year: row.year,
    languages: row.languages,
  };
}

// Shape mirrors client/src/data/site.js, texts array.
router.get('/', async (_request, response) => {
  const rows = await prisma.criticalText.findMany({ orderBy: { position: 'asc' } });
  response.json({ texts: rows.map(toClientShape) });
});

router.get('/:slug', async (request, response) => {
  const row = await prisma.criticalText.findUnique({ where: { slug: request.params.slug } });

  if (!row) {
    response.status(404).json({ error: 'Testo non trovato.' });
    return;
  }

  response.json({ text: toClientShape(row) });
});

export default router;
