import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import { micro } from '../data/site.js';

export default function NotFound() {
  usePageTitle('Pagina non trovata, Guido Anderloni');

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