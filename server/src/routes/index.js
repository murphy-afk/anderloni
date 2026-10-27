import { Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/health', (request, response) => {
  response.json({
    status: 'ok',
    service: 'anderloni-api',
    uptime: Math.round(process.uptime()),
  });
});
