// Maps the source order of the three gallery pages to the series records in
// docs/content-model.md section 6. Kept separate from the generated
// catalogue, scripts/build-catalog.mjs, so titles, years and categories stay
// editable by hand. Order must match the source: gallery.htm, gallery2.htm,
// gallery3.htm.

export const seriesConfig = [
  { slug: 'quod-superest', title: 'Quod superest', year: '2009', category: 'Natura morta' },
  { slug: 'preliminary-study', title: 'Preliminary study', year: '2006', category: 'Pittura' },
  { slug: 'senza-titolo-2008', title: 'Senza titolo', year: '2008', category: 'Natura morta' },
  { slug: 'natura-morta', title: 'Natura morta', year: '2006 - 2010', category: 'Natura morta' },
  { slug: 'senza-titolo-2006-2007', title: 'Senza titolo', year: '2006 - 2007', category: 'Natura morta' },
  { slug: 'disegni-e-altri-lavori', title: 'Disegni e altri lavori', year: '2005', category: 'Disegno' },
  { slug: 'video', title: 'Video', year: '2002 - 2005', category: 'Video' },
  { slug: 'incisione-fotografica', title: 'Incisione fotografica', year: '2004', category: 'Incisione' },
  { slug: 'after-man-ray', title: 'After Man Ray', year: '2000', category: 'Fotografia' },
  { slug: 'cuando-llueve-diluvia', title: 'Cuando llueve diluvia', year: '2003', category: 'Pittura' },
  { slug: 'ritratti-2001', title: 'Ritratti', year: '2001', category: 'Ritratto' },
  { slug: '103-africans', title: '103 africans', year: '1997', category: 'Pittura' },
  { slug: 'dettagli-personali', title: 'Dettagli personali', year: '1996', category: 'Ritratto' },
  { slug: 'il-sole-nell-hangar', title: "Il sole nell'hangar", year: '1998', category: 'Installazione' },
  { slug: 'ritratti-1994-2004', title: 'Ritratti', year: '1994 e 2004', category: 'Ritratto' },
  { slug: 'interni', title: 'Interni', year: '1998', category: 'Pittura' },
  { slug: 'il-colore-della-luce', title: 'Il colore della luce', year: '1998', category: 'Pittura' },
];