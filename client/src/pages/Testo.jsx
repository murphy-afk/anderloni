import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { micro, texts } from '../data/site.js';

// Single critical text. Body copy is rendered once the cleaned transcriptions
// land, see docs/source-texts and QUESTIONS.md Q17.
export default function Testo() {
  const { testo } = useParams();
  const text = texts.find((item) => item.slug === testo);

  usePageTitle(text ? `${text.title}, Guido Anderloni` : 'Testo, Guido Anderloni');

  if (!text) {
    return (
      <div className="page container">
        <PageHeader eyebrow="Testi" title={micro.notFound} />
        <p>
          <Link to="/testi">Torna all'elenco dei testi</Link>
        </p>
      </div>
    );
  }

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
        </dl>

        <div className="text__body flow">
          <p className="text__pending">Il testo completo sarà pubblicato dopo la revisione editoriale.</p>
          {!text.languages.includes('Italiano') ? (
            <p className="text__note">{micro.noItalianVersion}</p>
          ) : null}
        </div>

        <p className="text__back">
          <Link to="/testi">Torna all'elenco dei testi</Link>
        </p>
      </article>
    </div>
  );
}