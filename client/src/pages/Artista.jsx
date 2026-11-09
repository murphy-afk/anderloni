import PageHeader from '../components/PageHeader.jsx';
import useSeo from '../hooks/useSeo.js';
import { artist } from '../data/site.js';

// L'artista. Official biography provided by the client, see QUESTIONS.md Q7.
export default function Artista() {
  useSeo({
    title: `L'artista, ${artist.title}`,
    description:
      'Guido Anderloni vive e lavora a Invorio (NO). Pittura, disegno, fotografia, incisione e video, tra natura morta e ritratto.',
    path: '/artista',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: "L'artista, Guido Anderloni",
      url: 'https://www.anderloni.com/artista',
    },
  });

  return (
    <div className="page container">
      <PageHeader title={artist.title} eyebrow="L'artista" />

      <div className="artist">
        <div className="artist__body flow">
          {artist.paragraphs.map((paragraph) => (
            <p key={paragraph} className="artist__paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="artist__facts" aria-label="Scheda sintetica">
          <dl className="facts">
            {artist.facts.map((fact) => (
              <div className="facts__row" key={fact.label}>
                <dt className="facts__label">{fact.label}</dt>
                <dd className="facts__value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}