import { Router } from 'express';
import { prisma } from '../db/prisma.js';

const router = Router();

const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;
const REQUIRED = 'Campo obbligatorio';
const INVALID_EMAIL = 'Indirizzo email non valido';

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// The contact form posts once and expects { status: "ok" } back. Validation
// errors return the Italian interface labels from docs/content-model.md 9.
router.post('/', async (request, response) => {
  const body = request.body ?? {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name) {
    response.status(400).json({ error: REQUIRED, field: 'name' });
    return;
  }
  if (!email) {
    response.status(400).json({ error: REQUIRED, field: 'email' });
    return;
  }
  if (!isEmail(email) || email.length > MAX_EMAIL) {
    response.status(400).json({ error: INVALID_EMAIL, field: 'email' });
    return;
  }
  if (!message) {
    response.status(400).json({ error: REQUIRED, field: 'message' });
    return;
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      name: name.slice(0, MAX_NAME),
      email,
      message: message.slice(0, MAX_MESSAGE),
    },
    select: { id: true, createdAt: true },
  });

  response.status(201).json({ status: 'ok', id: inquiry.id });
});

export default router;
