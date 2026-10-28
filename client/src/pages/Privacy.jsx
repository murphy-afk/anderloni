import PageHeader from '../components/PageHeader.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { contact } from '../data/site.js';

// Placeholder until the GDPR text arrives, see QUESTIONS.md Q29.
export default function Privacy() {
  usePageTitle('Privacy, Guido Anderloni');

  return (
    <div className="page container">
      <PageHeader eyebrow="Informazioni" title="Privacy" />
      <div className="flow">
        <p>
          L'informativa privacy è in fase di redazione e verrà pubblicata prima della consegna del sito.
        </p>
        <p>
          <strong>Trattamento dei dati:</strong> {contact.privacyNote}
        </p>
        <p>
          Per richiedere l'accesso, la correzione o la cancellazione dei dati inviati è possibile scrivere a{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </div>
    </div>
  );
}