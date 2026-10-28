// Site wide Italian copy. Extracted from docs/content-model.md, which is the
// source of truth until Session 4 moves this content into MySQL.

export const site = {
  name: 'Guido Anderloni',
  role: 'Pittore',
  locality: 'Invorio (NO), Italia',
  email: 'info@anderloni.com',
  address: 'Cascina Comperto, 28045 Invorio (NO), Italia',
  domain: 'https://www.anderloni.com',
};

export const navigation = [
  { label: 'Home', to: '/' },
  { label: "L'artista", to: '/artista' },
  { label: 'Opere', to: '/opere' },
  { label: 'Testi', to: '/testi' },
  { label: 'Contatti', to: '/contatti' },
];

export const footerLinks = [
  { label: 'Note legali', to: '/note-legali' },
  { label: 'Privacy', to: '/privacy' },
];

export const home = {
  eyebrow: 'Pittore',
  title: 'Guido Anderloni',
  subtitle: 'Opere 1994 - 2010',
  // Hero image: a dark ground still life, full width.
  heroImage: '/works/full/images_____06_10_cen002.jpg',
  heroAlt: 'Natura morta su fondo nero: un insetto coperto di cenere',
  lead:
    "Il lavoro di Guido Anderloni si muove sul confine tra ciò che è vivo e ciò che è morto. Nature morte, insetti, fiori appassiti e oggetti domestici diventano il pretesto per un'indagine paziente sulla trasformazione della materia.",
  second:
    'La luce, costruita con la precisione del chiaroscuro, apre uno spazio sospeso tra notte e giorno. Ciò che resta, il residuo, è il vero soggetto dell\'opera.',
  quote: {
    text:
      'La drammaticità mi aiuta a riclassificare quelle componenti più marginali, più effimere, come la muffa, l\'insetto, il fiorellino di campagna che nessuno noterebbe.',
    author: 'Guido Anderloni',
  },
  feature: {
    eyebrow: 'Catalogo',
    title: 'Opere',
    text: 'Diciassette serie, dal 1994 al 2010. Pittura, disegno, fotografia, incisione e video.',
    action: 'Sfoglia il catalogo',
    to: '/opere',
  },
};

export const artist = {
  title: "Guido Anderloni",
  // Provisional paragraphs. Replace when the client sends the official
  // biography, see QUESTIONS.md Q7. No birth year, training or exhibitions
  // are invented here.
  paragraphs: [
    'Guido Anderloni vive e lavora a Invorio, in provincia di Novara. La sua ricerca attraversa pittura, disegno, fotografia, incisione e video, con una predilezione costante per la natura morta e per il ritratto.',
    'Il punto di partenza è quasi sempre un reperto: un insetto coperto di cenere, un fiore che ha perso colore, un oggetto domestico osservato da vicino. Da qui nasce una riflessione sulla caducità e sulla energia che resta nelle cose quando la vita le ha lasciate.',
    'Il suo linguaggio visivo si collega alla tradizione secentesca della vanitas e alla lezione del chiaroscuro, ma la restituisce con una precisione che appartiene alla fotografia. L\'immagine è insieme documento e messa in scena.',
    'Ha esposto, tra gli altri, alla Jacob Karpio Gallery e alla DAB Gallery. Il ciclo Quod superest, presentato nel 2009, è accompagnato da un testo critico di Alessandra Piolotto.',
  ],
  facts: [
    { label: 'Vive e lavora', value: 'Invorio (NO), Italia' },
    { label: 'Tecniche', value: 'pittura, disegno, fotografia, incisione, video' },
    { label: 'Anni di attività documentati', value: '1994 - 2010' },
  ],
};

export const categoryIntros = {
  'Natura morta':
    'Composizioni sospese tra il residuo organico e la pietra. Il fondo scuro isola il soggetto e lo rende reperto.',
  Pittura:
    'Dipinti costruiti attorno alla luce. Il fondo scuro della natura morta si allarga alla stanza, alla parete e all\'oggetto domestico osservato da vicino.',
  Ritratto:
    'Figure in piedi, spesso di spalle o in controluce, costruite per sottrazione. Il volto è quasi sempre negato.',
  Interni:
    'Spazi domestici ridotti a geometrie di luce, dove l\'arredo diventa misura dello sguardo.',
  Installazione:
    'Opere che occupano la stanza, con lastre di vetro, piani di appoggio e immagini sospese.',
  Disegno:
    'Studi preparatori e prove di segno, dove la composizione si cerca prima di essere dipinta.',
  Fotografia:
    'Il passaggio dall\'immagine dipinta all\'immagine impressa, con lo stesso trattamento della luce.',
  Incisione:
    'Il passaggio dall\'immagine dipinta all\'immagine impressa, con lo stesso trattamento della luce.',
  Video:
    'Lavori brevi, tra il 1997 e il 2005, in cui il corpo e il paesaggio entrano in movimento.',
};

// Critical texts index. Language and author values come from
// docs/content-model.md section 8, where uncertain fields are marked.
export const texts = [
  {
    slug: 'quod-superest',
    title: 'Quod superest',
    author: 'Alessandra Piolotto',
    year: '2009',
    languages: ['Italiano', 'Español'],
    bodyPath: '/testi',
  },
  {
    slug: 'ritratti',
    title: 'Ritratti',
    author: 'Alicia Murria',
    year: 'da confermare',
    languages: ['Spagnolo', 'Inglese'],
    bodyPath: '/testi',
  },
  {
    slug: 'cuando-llueve-diluvia',
    title: 'Cuando llueve diluvia',
    author: 'Aurelio Horta',
    year: 'da confermare',
    languages: ['Spagnolo'],
    bodyPath: '/testi',
  },
  {
    slug: 'dettagli-personali',
    title: 'Dettagli personali',
    author: 'da confermare',
    year: '1996',
    languages: ['Spagnolo'],
    bodyPath: '/testi',
  },
  {
    slug: 'il-sole-nell-hangar',
    title: "Il sole nell'hangar",
    author: 'Francesca Pasini',
    year: 'da confermare',
    languages: ['Italiano'],
    bodyPath: '/testi',
  },
  {
    slug: 'il-colore-della-luce',
    title: 'Il colore della luce',
    author: 'Francesca Pasini',
    year: 'da confermare',
    languages: ['Italiano', 'Inglese'],
    bodyPath: '/testi',
  },
  {
    slug: 'after-man-ray',
    title: 'After Man Ray',
    author: 'da confermare',
    year: 'da confermare',
    languages: ['Inglese', 'Spagnolo'],
    bodyPath: '/testi',
  },
  {
    slug: '103-africans',
    title: '103 africans',
    author: 'Guido Anderloni',
    year: '1997',
    languages: ['Italiano'],
    bodyPath: '/testi',
  },
  {
    slug: 'video',
    title: 'Video',
    author: 'Guido Anderloni',
    year: 'da confermare',
    languages: ['Italiano'],
    bodyPath: '/testi',
  },
];

export const textsIntro =
  "Testi critici e note d'autore pubblicati in occasione delle mostre.";

export const contact = {
  title: 'Contatti',
  intro:
    'Per informazioni sulle opere, sulle mostre e sulla stampa è possibile scrivere.',
  email: 'info@anderloni.com',
  address: 'Cascina Comperto, 28045 Invorio (NO), Italia',
  fields: {
    name: 'Nome e cognome',
    email: 'Indirizzo email',
    message: 'Messaggio',
    submit: 'Invia richiesta',
  },
  success: 'Messaggio inviato. Grazie, risponderemo al più presto.',
  error: 'Errore di invio. Riprova o scrivi a info@anderloni.com.',
  required: 'Campo obbligatorio',
  invalidEmail: 'Indirizzo email non valido',
  privacyNote: 'I dati inviati vengono utilizzati esclusivamente per rispondere alla richiesta.',
};

export const micro = {
  loading: 'Caricamento in corso',
  empty: 'Nessun risultato per questa selezione.',
  notFound: 'Pagina non trovata. Torna alla home.',
  backToTop: 'Torna su',
  menu: 'Menu',
  closeMenu: 'Chiudi menu',
  imageMissing: 'Immagine non disponibile',
  // Interface labels shared by the catalogue pages.
  previousWork: 'Opera precedente',
  nextWork: 'Opera successiva',
  backToSeries: 'Torna alla serie',
  enlarge: 'Ingrandisci',
  close: 'Chiudi',
  openInNewTab: 'Apri in una nuova scheda',
  readText: 'Leggi il testo',
  languageOriginal: 'Lingua originale',
  languageTranslation: 'Traduzione',
  noItalianVersion: 'Testo non disponibile in italiano.',
  seriesWorks: (count) => (count === 1 ? '1 opera' : `${count} opere`),
};