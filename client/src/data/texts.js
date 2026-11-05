// Critical texts index. Every text belongs to the series it was published
// with on the original site: the small "text" button inside each gallery
// band opened one of these pages, see docs/scrape-analysis.md section 2.
// Body copy lives in ./texts/<slug>.js and is a cleaned transcription of
// _reference/html/zoom/, editorial masters in docs/source-texts/.

import afterManRay from './texts/after-man-ray.js';
import cuandoLlueveDiluvia from './texts/cuando-llueve-diluvia.js';
import dettagliPersonali from './texts/dettagli-personali.js';
import ilColoreDellaLuce from './texts/il-colore-della-luce.js';
import ilSoleNellHangar from './texts/il-sole-nell-hangar.js';
import quodSuperest from './texts/quod-superest.js';
import ritratti from './texts/ritratti.js';
import text103Africans from './texts/103-africans.js';
import video from './texts/video.js';

// Author, year and language values come from docs/content-model.md section 8,
// where uncertain fields are marked. seriesSlugs record which series the
// original site linked the text from: the Ritratti text was reachable from
// two different series.
export const texts = [
  {
    slug: 'quod-superest',
    title: 'Quod superest',
    author: 'Alessandra Piolotto',
    year: '2009',
    languages: ['Español', 'Italiano'],
    seriesSlugs: ['quod-superest'],
    sections: quodSuperest,
  },
  {
    slug: 'ritratti',
    title: 'Ritratti',
    author: 'Alicia Murría e José Angel Artetxe',
    year: 'da confermare',
    languages: ['Inglese', 'Spagnolo'],
    seriesSlugs: ['ritratti-2001', 'ritratti-1994-2004'],
    sections: ritratti,
  },
  {
    slug: 'cuando-llueve-diluvia',
    title: 'Cuando llueve diluvia',
    author: 'Patricia Molins, José Emilio Pacheco, Clara Concepción Astiasarán, Lidia Blanco e Aurelio Horta',
    year: 'da confermare',
    languages: ['Spagnolo'],
    seriesSlugs: ['cuando-llueve-diluvia'],
    sections: cuandoLlueveDiluvia,
  },
  {
    slug: 'dettagli-personali',
    title: 'Dettagli personali',
    author: 'Gianni Romano, Dawn Michelle Baude, Emanuela De Cecco e Alessandra Pioselli',
    year: '1996 - 1997',
    languages: ['Inglese', 'Italiano', 'Español'],
    seriesSlugs: ['dettagli-personali'],
    sections: dettagliPersonali,
  },
  {
    slug: 'il-sole-nell-hangar',
    title: "Il sole nell'hangar",
    author: 'Francesca Pasini',
    year: 'da confermare',
    languages: ['Italiano'],
    seriesSlugs: ['il-sole-nell-hangar'],
    sections: ilSoleNellHangar,
  },
  {
    slug: 'il-colore-della-luce',
    title: 'Il colore della luce',
    author: 'da confermare',
    year: 'da confermare',
    languages: ['Inglese', 'Spagnolo'],
    seriesSlugs: ['il-colore-della-luce'],
    sections: ilColoreDellaLuce,
  },
  {
    slug: 'after-man-ray',
    title: 'After Man Ray',
    author: 'da confermare',
    year: 'da confermare',
    languages: ['Inglese', 'Spagnolo'],
    seriesSlugs: ['after-man-ray'],
    sections: afterManRay,
  },
  {
    slug: '103-africans',
    title: '103 africans',
    author: 'Guido Anderloni',
    year: '1997',
    languages: ['Inglese', 'Spagnolo', 'Italiano'],
    seriesSlugs: ['103-africans'],
    sections: text103Africans,
  },
  {
    slug: 'video',
    title: 'Video',
    author: 'Guido Anderloni',
    year: 'da confermare',
    languages: ['Spagnolo'],
    seriesSlugs: ['video'],
    sections: video,
  },
];

export const textsIntro =
  "Testi critici e note d'autore che accompagnano le serie del catalogo.";
