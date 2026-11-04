import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import useSeo from '../hooks/useSeo.js';
import { asset } from '../lib/asset.js';
import useCatalog from '../hooks/useCatalog.js';
import { categoryIntros, micro } from '../data/site.js';

const ALL = 'Tutte';

// Catalogue index: category filters plus series cards.
export default function Opere() {
  const series = useCatalog();

  useSeo({
    title: 'Opere, Guido Anderloni',
    description:
      'Diciassette serie di Guido Anderloni dal 1994 al 2010: pittura, disegno, fotografia, incisione e video.',
    path: '/opere',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Opere, Guido Anderloni',
      url: 'https://www.anderloni.com/opere',
      numberOfItems: series.length,
    },
  });

  const categories = [ALL, ...Array.from(new Set(series.map((item) => item.category)))];
  const [active, setActive] = useState(ALL);
  const visible = active === ALL ? series : series.filter((item) => item.category === active);
  const intro = active === ALL ? null : categoryIntros[active];

  return (
    <div className="page container">
      <PageHeader eyebrow="Catalogo" title="Opere" />

      <div className="filters" role="group" aria-label="Filtra per categoria">
        {categories.map((category) => {
          const count =
            category === ALL ? series.length : series.filter((item) => item.category === category).length;
          return (
            <button
              key={category}
              type="button"
              className={`filter${active === category ? ' is-active' : ''}`}
              aria-pressed={active === category}
              onClick={() => setActive(category)}>
              {category}
              <span className="filter__count">{count}</span>
            </button>
          );
        })}
      </div>

      {intro ? <p className="series-note">{intro}</p> : null}

      {visible.length === 0 ? (
        <p className="series-empty">{micro.empty}</p>
      ) : (
        <ul className="series-grid" role="list">
          {visible.map((item) => (
            <li key={item.slug}>
              <Link className="series-card" to={`/opere/${item.slug}`}>
                <span className="series-card__plate">
                  <img
                    className="series-card__image"
                    src={asset(item.cover)}
                    alt={`${item.title}, ${item.year}`}
                    loading="lazy"
                    {...(item.coverWidth && item.coverHeight
                      ? { width: item.coverWidth, height: item.coverHeight }
                      : {})} />
                </span>
                <span className="series-card__title">{item.title}</span>
                <span className="series-card__meta">
                  {item.year} · {item.category} · {micro.seriesWorks(item.works.length)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}