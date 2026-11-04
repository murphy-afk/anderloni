import PageHeader from '../components/PageHeader.jsx';
import useSeo from '../hooks/useSeo.js';
import { contact } from '../data/site.js';

// Placeholder until the GDPR text arrives, see QUESTIONS.md Q29.
export default function Privacy() {
  useSeo({
    title: 'Privacy, Guido Anderloni',
    description:
      'Informativa privacy del sito di Guido Anderloni: trattamento dei dati inviati tramite il modulo di contatto.',
    path: '/privacy',
  });

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