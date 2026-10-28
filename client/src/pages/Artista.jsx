import PageHeader from '../components/PageHeader.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { artist } from '../data/site.js';

// L'artista. The paragraphs are provisional, see QUESTIONS.md Q7.
export default function Artista() {
  usePageTitle(`L'artista, ${artist.title}`);

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