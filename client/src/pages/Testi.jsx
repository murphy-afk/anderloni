import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import useSeo from '../hooks/useSeo.js';
import useTexts from '../hooks/useTexts.js';
import { textsIntro } from '../data/site.js';

// Index of the critical texts.
export default function Testi() {
  useSeo({
    title: 'Testi, Guido Anderloni',
    description:
      "Testi critici e note d'autore pubblicati in occasione delle mostre di Guido Anderloni.",
    path: '/testi',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Testi, Guido Anderloni',
      url: 'https://www.anderloni.com/testi',
    },
  });
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