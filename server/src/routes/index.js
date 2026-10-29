import { Router } from 'express';
import seriesRouter from './series.js';
import textsRouter from './texts.js';
import inquiriesRouter from './inquiries.js';

export const apiRouter = Router();

apiRouter.get('/health', (request, response) => {
  response.json({
    status: 'ok',
    service: 'anderloni-api',
    uptime: Math.round(process.uptime()),
  });
});

apiRouter.use('/series', seriesRouter);
apiRouter.use('/texts', textsRouter);
apiRouter.use('/inquiries', inquiriesRouter);
