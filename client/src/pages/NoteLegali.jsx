import PageHeader from '../components/PageHeader.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { site } from '../data/site.js';

// Placeholder until the legal notes arrive. Only verifiable data is shown.
export default function NoteLegali() {
  usePageTitle('Note legali, Guido Anderloni');

  return (
    <div className="page container">
      <PageHeader eyebrow="Informazioni" title="Note legali" />
      <div className="flow">
        <p>Il testo delle note legali è in fase di redazione e verrà pubblicato prima della consegna del sito.</p>
        <dl className="facts">
          <div className="facts__row">
            <dt className="facts__label">Responsabile del contenuto</dt>
            <dd className="facts__value">{site.name}</dd>
          </div>
          <div className="facts__row">
            <dt className="facts__label">Indirizzo</dt>
            <dd className="facts__value">{site.address}</dd>
          </div>
          <div className="facts__row">
            <dt className="facts__label">Email</dt>
            <dd className="facts__value">
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}