import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import useSeo from '../hooks/useSeo.js';
import useTexts from '../hooks/useTexts.js';
import useCatalog from '../hooks/useCatalog.js';
import { getSeries } from '../lib/catalog.js';
import { micro } from '../data/site.js';

// Single critical text. Body copy comes from the cleaned transcriptions in
// client/src/data/texts/, editorial masters in docs/source-texts/.
export default function Testo() {
  const { testo } = useParams();
  const texts = useTexts();
  const series = useCatalog();
  const text = texts.find((item) => item.slug === testo);
  const linkedSeries = text
    ? (text.seriesSlugs || []).map((slug) => getSeries(series, slug)).filter(Boolean)
    : [];

  useSeo({
    title: text ? `${text.title}, Guido Anderloni` : 'Testo, Guido Anderloni',
    description: text
      ? `${text.title}, di ${text.author}. Testo critico pubblicato sulle opere di Guido Anderloni.`
      : 'Testo critico di Guido Anderloni.',
    path: `/testi/${testo}`,
    jsonLd: text
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: text.title,
          author: { '@type': 'Person', name: text.author },
          url: `https://www.anderloni.com/testi/${text.slug}`,
          inLanguage: text.languages,
        }
      : undefined,
  });

  if (!text) {
    return (
      <div className="page container">
        <PageHeader eyebrow="Testo" title={micro.notFound} />
        <p>
          <Link to="/opere">Torna al catalogo</Link>
        </p>
      </div>
    );
  }

  const sections = text.sections || [];

  return (
    <div className="page container">
      <article className="text">
        <PageHeader eyebrow="Testo" title={text.title} />

        <dl className="facts text__facts">
          <div className="facts__row">
            <dt className="facts__label">Autore</dt>
            <dd className="facts__value">{text.author}</dd>
          </div>
          <div className="facts__row">
            <dt className="facts__label">Anno</dt>
            <dd className="facts__value">{text.year}</dd>
          </div>
          <div className="facts__row">
            <dt className="facts__label">Lingue</dt>
            <dd className="facts__value">{text.languages.join(', ')}</dd>
          </div>
          {linkedSeries.length > 0 ? (
            <div className="facts__row">
              <dt className="facts__label">Serie</dt>
              <dd className="facts__value">
                {linkedSeries.map((item, index) => (
                  <span key={item.slug}>
                    {index > 0 ? ', ' : ''}
                    <Link to={`/opere/${item.slug}`}>
                      {item.title}, {item.year}
                    </Link>
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>

        <div className="text__body flow">
          {sections.length > 0 ? (
            sections.map((section) => (
              <section className="text__section" key={section.language}>
                {sections.length > 1 ? (
                  <h2 className="text__language">{section.language}</h2>
                ) : null}
                {section.paragraphs.map((paragraph, index) => (
                  <p className="text__paragraph" key={`${section.language}-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))
          ) : (
            <p className="text__pending">Il testo completo sarà pubblicato dopo la revisione editoriale.</p>
          )}
          {!text.languages.includes('Italiano') ? (
            <p className="text__note">{micro.noItalianVersion}</p>
          ) : null}
        </div>

        <p className="text__back">
          {linkedSeries.length > 0 ? (
            <Link to={`/opere/${linkedSeries[0].slug}`}>
              ← {micro.backToSeries}: {linkedSeries[0].title}
            </Link>
          ) : (
            <Link to="/opere">Torna al catalogo</Link>
          )}
        </p>
      </article>
    </div>
  );
}
