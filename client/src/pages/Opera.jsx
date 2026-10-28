import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Lightbox from '../components/Lightbox.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { asset } from '../lib/asset.js';
import { getSeries, getWork } from '../lib/catalog.js';
import { micro } from '../data/site.js';

// Single artwork: dark plate, exhibition caption, previous and next control.
export default function Opera() {
  const { serie, opera } = useParams();
  const item = getSeries(serie);
  const work = item ? getWork(item, opera) : null;
  const [enlarged, setEnlarged] = useState(false);

  usePageTitle(
    work && item ? `${work.title}, ${work.year || item.year}, Guido Anderloni` : 'Opera, Guido Anderloni',
  );

  if (!item || !work) {
    return <NotFoundWork serie={serie} />;
  }

  const index = item.works.findIndex((entry) => entry.slug === work.slug);
  const previous = index > 0 ? item.works[index - 1] : null;
  const next = index < item.works.length - 1 ? item.works[index + 1] : null;
  const title = work.title || item.title;
  const year = work.year || item.year;

  return (
    <div className="artwork">
      <div className="container artwork__back">
        <Link to={`/opere/${item.slug}`}>← {micro.backToSeries}: {item.title}</Link>
      </div>

      <div className="artwork__plate">
        {work.image ? (
          <img
            className="artwork__image"
            src={asset(work.image)}
            alt={`${title}, ${year}`}
            width={1200}
            height={900} />
        ) : (
          <p className="artwork__row">{micro.imageMissing}</p>
        )}
      </div>

      <div className="page container">
        <div className="artwork__caption">
          <h1 className="artwork__title">{title}</h1>
          <p className="artwork__year">{year}</p>
          <div className="artwork__data">
            {work.dimensionsPrimary ? (
              <p className="artwork__row">{work.dimensionsPrimary}</p>
            ) : null}
            {work.dimensionsSecondary ? (
              <p className="artwork__row artwork__row--secondary">{work.dimensionsSecondary}</p>
            ) : null}
          </div>
          <div className="artwork__actions">
            {work.image ? (
              <button className="artwork__action" type="button" onClick={() => setEnlarged(true)}>
                {micro.enlarge}
              </button>
            ) : null}
            {work.image ? (
              <a href={asset(work.image)} target="_blank" rel="noreferrer">
                {micro.openInNewTab}
              </a>
            ) : null}
          </div>
        </div>

        <nav className="artwork__nav" aria-label="Navigazione tra le opere">
          {previous ? (
            <Link className="artwork__nav-link" to={`/opere/${item.slug}/${previous.slug}`}>
              ← {micro.previousWork}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="artwork__nav-link" to={`/opere/${item.slug}/${next.slug}`}>
              {micro.nextWork} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      {enlarged && work.image ? (
        <Lightbox src={asset(work.image)} alt={`${title}, ${year}`} onClose={() => setEnlarged(false)} />
      ) : null}
    </div>
  );
}

function NotFoundWork({ serie }) {
  return (
    <div className="page container">
      <div className="flow">
        <p className="eyebrow">Opere</p>
        <h1>{micro.notFound}</h1>
        <p>
          <Link to={serie ? `/opere/${serie}` : '/opere'}>Torna al catalogo</Link>
        </p>
      </div>
    </div>
  );
}