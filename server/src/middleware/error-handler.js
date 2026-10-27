export function notFound(request, response) {
  response.status(404).json({ error: 'Risorsa non trovata.' });
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  console.error(error);
  response.status(500).json({ error: 'Errore interno del server.' });
}
