import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { micro } from '../data/site.js';

export default function NotFound() {
  useSeo({
    title: 'Pagina non trovata, Guido Anderloni',
    description: 'La pagina richiesta non esiste. Torna alla home del sito di Guido Anderloni.',
    noindex: true,
  });

  return (
    <div className="page container">
      <div className="flow">
        <p className="eyebrow">Errore 404</p>
        <h1>{micro.notFound}</h1>
        <p>
          <Link className="link-arrow" to="/">
            Torna alla home
          </Link>
        </p>
      </div>
    </div>
  );
}