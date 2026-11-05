import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import useSeo from '../hooks/useSeo.js';
import useTexts from '../hooks/useTexts.js';
import useCatalog from '../hooks/useCatalog.js';
import { getSeries } from '../lib/catalog.js';
import { textsIntro } from '../data/texts.js';

// Index of the critical texts. Each entry links back to the series that
// published it on the original site.
export default function Testi() {
  useSeo({
    title: 'Testi, Guido Anderloni',
    description:
      "Testi critici e note d'autore che accompagnano le serie del catalogo di Guido Anderloni.",
    path: '/testi',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Testi, Guido Anderloni',
      url: 'https://www.anderloni.com/testi',
    },
  });
  const texts = useTexts();
  const series = useCatalog();

  return (
    <div className="page container">
      <PageHeader eyebrow="Testi" title="Testi" intro={textsIntro} />

      <ul className="text-list" role="list">
        {texts.map((text) => {
          const linkedSeries = (text.seriesSlugs || [])
            .map((slug) => getSeries(series, slug))
            .filter(Boolean);
          const meta = [
            text.author !== 'da confermare' ? text.author : null,
            text.year !== 'da confermare' ? text.year : null,
          ]
            .filter(Boolean)
            .join(' · ');
          return (
            <li key={text.slug} className="text-list__item">
              <Link className="text-card" to={`/testi/${text.slug}`}>
                <span className="text-card__title">{text.title}</span>
                <span className="text-card__meta">{meta}</span>
                <span className="text-card__languages">{text.languages.join(', ')}</span>
              </Link>
              {linkedSeries.length > 0 ? (
                <span className="text-card__series">
                  Serie:
                  {linkedSeries.map((item, index) => (
                    <span key={item.slug}>
                      {index > 0 ? ',' : ''}
                      <Link to={`/opere/${item.slug}`}>
                        {' '}
                        {item.title}, {item.year}
                      </Link>
                    </span>
                  ))}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
