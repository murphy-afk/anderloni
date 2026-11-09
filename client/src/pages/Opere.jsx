import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import useSeo from '../hooks/useSeo.js';
import { asset } from '../lib/asset.js';
import useCatalog from '../hooks/useCatalog.js';
import { micro } from '../data/site.js';

// Preview images per band: one row, no wrapping, enough to span the width.
const BAND_PREVIEW = 6;

// Catalogue index: one band per series, in source order. The summary line
// states the total of works, so the page cannot be read as if the catalogue
// held only seventeen works. Each band opens the series page, which holds the
// full grid and the critical text. The browse dialog lives on the Quick tour
// page.
export default function Opere() {
  const series = useCatalog();
  const totalWorks = series.reduce((sum, item) => sum + item.works.length, 0);

  useSeo({
    title: 'Opere, Guido Anderloni',
    description:
      'Diciassette serie e 76 opere di Guido Anderloni dal 1994 al 2010: pittura, disegno, fotografia, incisione e video.',
    path: '/opere',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Opere, Guido Anderloni',
      url: 'https://www.anderloni.com/opere',
      numberOfItems: totalWorks,
    },
  });

  return (
    <div className="page container">
      <PageHeader
        eyebrow="Catalogo"
        title="Opere"
        intro={`${series.length} serie e ${totalWorks} opere, dal 1994 al 2010.`}
      />

      {series.length === 0 ? (
        <p className="series-empty">{micro.empty}</p>
      ) : (
        <div className="series-bands">
          {series.map((item, bandIndex) => {
            const preview = item.works
              .filter((work) => work.image || work.thumb)
              .slice(0, BAND_PREVIEW);
            return (
              <section
                className="series-band"
                key={item.slug}
                aria-label={item.title ? item.title : `${item.year} ${item.category}`}>
                <div className="series-band__header">
                  <div className="series-band__heading">
                    {item.title ? (
                      <h2 className="series-band__title">
                        <Link to={`/opere/${item.slug}`}>{item.title}</Link>
                      </h2>
                    ) : null}
                    <p className="series-band__meta">
                      <span>{item.year}</span>
                      <span>{item.category}</span>
                      <span>{micro.seriesWorks(item.works.length)}</span>
                    </p>
                  </div>
                  <Link className="link-arrow series-band__more" to={`/opere/${item.slug}`}>
                    {micro.seeSeries}
                  </Link>
                </div>
                <ul className="series-band__row" role="list">
                  {preview.map((work) => (
                    <li className="series-band__item" key={work.slug}>
                      <Link
                        className="series-band__link"
                        to={`/opere/${item.slug}`}
                        tabIndex={-1}
                        aria-hidden="true">
                        <img
                          className="series-band__image"
                          src={asset(work.image || work.thumb)}
                          alt=""
                          loading={bandIndex === 0 ? 'eager' : 'lazy'}
                          {...(work.image && work.imageWidth && work.imageHeight
                            ? { width: work.imageWidth, height: work.imageHeight }
                            : work.thumb && work.thumbWidth && work.thumbHeight
                              ? { width: work.thumbWidth, height: work.thumbHeight }
                              : {})} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}