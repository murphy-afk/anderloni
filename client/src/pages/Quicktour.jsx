import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import BrowseAll from '../components/BrowseAll.jsx';
import useSeo from '../hooks/useSeo.js';
import useCatalog from '../hooks/useCatalog.js';
import { micro, quicktour } from '../data/site.js';

// Quick tour: the browse dialog for the whole catalogue, opened as soon as
// the page loads, the role the quicktour slideshow had on the original site.
// Closing the dialog leaves the page with a button to open it again.
export default function Quicktour() {
  const series = useCatalog();
  // The id forces a fresh mount on every open, so the dialog always runs its
  // open effect again even if a close event ever arrives out of sync.
  const [gallery, setGallery] = useState({ open: true, id: 0 });
  const openGallery = () => setGallery((state) => ({ open: true, id: state.id + 1 }));

  const browseEntries = series.flatMap((item) =>
    item.works
      .filter((work) => work.image || work.thumb)
      .map((work) => ({ series: item, work }))
  );

  useSeo({
    title: 'Quick tour, Guido Anderloni',
    description:
      'Tutte le opere di Guido Anderloni in sequenza, una alla volta, in ordine di serie: il quick tour del catalogo.',
    path: '/quicktour',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Quick tour, Guido Anderloni',
      url: 'https://www.anderloni.com/quicktour',
      numberOfItems: browseEntries.length,
    },
  });

  return (
    <div className="page container">
      <PageHeader eyebrow={quicktour.eyebrow} title={quicktour.title} intro={quicktour.intro} />

      <div className="catalog-actions">
        <button className="button" type="button" onClick={openGallery}>
          {micro.browseAll}
        </button>
        <Link className="link-arrow" to="/opere">
          Torna al catalogo
        </Link>
      </div>

      {gallery.open && browseEntries.length > 0 ? (
        <BrowseAll
          key={gallery.id}
          entries={browseEntries}
          index={0}
          onClose={() => setGallery((state) => ({ ...state, open: false }))}
        />
      ) : null}
    </div>
  );
}
