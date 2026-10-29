import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import useTexts from '../hooks/useTexts.js';
import { textsIntro } from '../data/site.js';

// Index of the critical texts.
export default function Testi() {
  usePageTitle('Testi, Guido Anderloni');
  const texts = useTexts();

  return (
    <div className="page container">
      <PageHeader eyebrow="Testi" title="Testi" intro={textsIntro} />

      <ul className="text-list" role="list">
        {texts.map((text) => (
          <li key={text.slug} className="text-list__item">
            <Link className="text-card" to={`/testi/${text.slug}`}>
              <span className="text-card__title">{text.title}</span>
              <span className="text-card__meta">
                {text.author}
                {text.year !== 'da confermare' ? ` · ${text.year}` : ''}
              </span>
              <span className="text-card__languages">{text.languages.join(', ')}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}