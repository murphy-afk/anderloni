import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import useSeo from '../hooks/useSeo.js';
import { asset } from '../lib/asset.js';
import useCatalog from '../hooks/useCatalog.js';
import { getSeries } from '../lib/catalog.js';
import { categoryIntros, micro } from '../data/site.js';
import useTexts from '../hooks/useTexts.js';

// Works of a single series.
export default function Serie() {
  const { serie } = useParams();
  const series = useCatalog();
  const texts = useTexts();
  const item = getSeries(series, serie);

  useSeo({
    title: item ? `${item.title}, Guido Anderloni` : 'Serie, Guido Anderloni',
    description: item
      ? `${item.title} (${item.year}), ${item.category.toLowerCase()}: ${micro.seriesWorks(item.works.length)} di Guido Anderloni.`
      : 'Serie di opere di Guido Anderloni nel catalogo.',
    path: `/opere/${serie}`,
    jsonLd: item
      ? {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${item.title}, Guido Anderloni`,
          url: `https://www.anderloni.com/opere/${item.slug}`,
          numberOfItems: item.works.length,
        }
      : undefined,
  });

  if (!item) {
    return <NotFoundSeries />;
  }

  const intro = categoryIntros[item.category];
  const text = texts.find((entry) => entry.seriesSlugs?.includes(item.slug));

  return (
    <div className="page container">
      <header className="series-header flow">
        <p className="eyebrow">
          <Link to="/opere">Opere</Link>
        </p>
        <h1 className="page-header__title">{item.title}</h1>
        <p className="series-header__meta">
          <span>{item.year}</span>
          <span>{item.category}</span>
          <span>{micro.seriesWorks(item.works.length)}</span>
        </p>
        {intro ? <p className="series-header__intro">{intro}</p> : null}
      </header>

      {text ? (
        <aside className="series-text">
          <p className="series-text__label">Testo</p>
          <p className="series-text__title">{text.title}</p>
          <p className="series-text__meta">
            {[
              text.author !== 'da confermare' ? text.author : null,
              text.year !== 'da confermare' ? text.year : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <Link className="series-text__link" to={`/testi/${text.slug}`}>
            {micro.readText} →
          </Link>
        </aside>
      ) : null}

      <ul className="works-grid" role="list">
        {item.works.map((work) => (
          <li key={work.slug}>
            <Link className="work-card" to={`/opere/${item.slug}/${work.slug}`}>
              <span className="work-card__plate">
                <img
                  className="work-card__image"
                  src={asset(work.image || work.thumb)}
                  alt={work.title ? `${work.title}, ${work.year || item.year}` : `Serie ${item.title}`}
                  loading="lazy"
                  {...(work.image && work.imageWidth && work.imageHeight
                    ? { width: work.imageWidth, height: work.imageHeight }
                    : work.thumb && work.thumbWidth && work.thumbHeight
                      ? { width: work.thumbWidth, height: work.thumbHeight }
                      : {})} />
              </span>
              <span className="work-card__title">{work.title || item.title}</span>
              <span className="work-card__year">{work.video ? 'Video' : work.year || item.year}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotFoundSeries() {
  return (
    <div className="page container">
      <PageHeader eyebrow="Opere" title={micro.notFound} />
      <p>
        <Link to="/opere">Torna al catalogo</Link>
      </p>
    </div>
  );
}