# Scrape Analysis

Source: https://www.anderloni.com
Date of extraction: 2026-10-26
Method: static fetch of every public page, download of gallery thumbnails, zoom pages, and full size images.

## 1. What the business is

The site is not a company website. It is the personal portfolio of Guido Anderloni, a painter.

Core facts found on the source:

- Name: Guido Anderloni
- Discipline: painting, drawing, photography, photoengraving, video
- Recurring subjects: still life, insects, withered flowers, portraits, interiors, domestic objects under glass
- Address: C.na Comperto, 28045 Invorio (NO), Italia
- Email: info@anderloni.com
- Solo exhibition venues mentioned: Jacob Karpio Gallery, DAB Gallery
- Critical texts by: Alessandra Piolotto, Francesca Pasini, Alicia Murria, Aurelio Horta
- Prices: not published anywhere on the source. No amount, currency, or price request appears on any page.

Interpretation for the redesign: the target audience is collectors, galleries, curators, and occasional press. The site must behave like a gallery catalogue, not like a service brochure. Discovery, quiet presentation, and image quality matter more than calls to action. The only conversion is a contact request.

Client decisions recorded in Session 1:

- The site is a gallery portfolio, not a shop. No prices, no price labels, no ecommerce.
- Telephone numbers are not published. Email only.
- The biography is deferred. Placeholder copy stays until the client sends a text.
- Work continues with the assets already scraped. Broken or low resolution images are handled later.

## 2. Source page inventory

| Page | Purpose | Notes |
| --- | --- | --- |
| index.htm | Cover | Image only, no text content |
| gallery.htm | Selected works, page 1 | Six series |
| gallery2.htm | Selected works, page 2 | Videos and three series |
| gallery3.htm | Selected works, page 3 | Seven series |
| quicktour.htm | Slideshow | 24 slides, JavaScript driven |
| contact.htm | Contact | Popup page, 300x300 px |
| text/00_Quod_superest.htm | Critical text | Italian and Spanish |
| text/00_Portraits.htm | Critical text | Alicia Murria |
| text/00_Cuando_llueve_diluvia.htm | Critical text | Aurelio Horta |
| text/00_personal_details.htm | Critical text | Signed Madrid, September 1996 |
| text/00_The_sun_in_the_hangar.htm | Critical text | Francesca Pasini, also covers The color of the light |
| text/00_103_AFRICANS.htm | Work notes | Technical description of the video |
| text/00_After_Man_Ray.htm | Work notes | No author attribution |
| text/00_videos.htm | Work notes | Autoportraits, autosculpture |

There is no about page, no biography, no exhibitions list, and no press page. The whole site is one horizontal menu with three items and a slideshow.

Important: the eight pages after gallery3.htm are reachable only through the small "text" button inside the gallery bands. They are easy to miss and they carry most of the written content of the site. All of them were captured in `_reference/html/zoom/` and flattened to plain text in `_reference/texts/`.

## 3. Catalog extracted from the source

Series and works, in the order they appear on the source site. Titles are kept as published. Dimensions are kept as published, including the original unit inconsistencies.

Page 1:

| Series | Year | Works | Notes |
| --- | --- | --- | --- |
| Quod superest | 2009 | 6 images | 50 x 38 cm, one 90 x 100 cm, has a critical text |
| Preliminary study | 2006 | 5 images | 140 x 140 cm, 100 x 100 cm, 130 x 100 cm |
| Untitled | 2008 | 4 images | 100 x 120 cm |
| Still life | 2006 to 2010 | 6 images | 100 x 150 cm, 90 x 120 cm |
| Untitled | 2006 to 2007 | 3 images | 180 x 130 cm, 130 x 100 cm |
| Drawings and others | 2005 | 4 images | 68 x 50 cm, 24 x 32 cm |

Page 2:

| Series | Year | Works | Notes |
| --- | --- | --- | --- |
| Videos | 2002 to 2005 | 5 videos | In/Out, Eo, You believe me, Tras la puerta, Selfportrait |
| Photoengraving | 2004 | 3 images | 40 x 34 cm |
| After Man Ray | 2000 | 4 images | 30 x 40 cm, 50 x 32 cm |
| Cuando llueve diluvia | 2003 | 3 images | Ay, mi padre, 50 x 25 cm |

Page 3:

| Series | Year | Works | Notes |
| --- | --- | --- | --- |
| Portraits | 2001 | 5 images | 100 x 160 cm |
| 103 africans | 1997 | 1 image plus 1 video | 100 x 130 cm, video 3 min |
| Personal details | 1996 | 5 images | 60 x 80 cm |
| The sun in the hangar | 1998 | 4 images | 100 x 160 x 35 cm |
| Portraits | 1994 and 2004 | 9 images | from 60 x 80 cm to 100 x 130 cm |
| Interiors | 1998 | 4 images | 100 x 130 cm |
| The color of the light | 1998 | 2 images | 200 x 30 cm, 200 x 150 cm |

Total: 17 series across the three pages, 68 images and 6 videos documented.

## 4. Technical state of the source site

Problems that justify the rebuild and that the new site must not repeat:

- Tables used for layout, nested up to three levels, with fixed pixel widths.
- Navigation built from GIF images with JavaScript rollovers. No text links, no accessibility.
- Gallery pages render nothing useful without JavaScript.
- Zoom links call `MM_openBrWindow`, so every artwork opens in a popup window sized in pixels.
- Every image lacks meaningful alt text. The only alt values are "click to zoom" and "click to play".
- Duplicate ids, malformed nesting, an HTML doctype inserted inside a paragraph in the critical text page.
- Iso-8859-1 and windows-1252 encodings mixed across pages.
- No meta description, no Open Graph, no structured data, no canonical, no sitemap.
- No responsive behaviour. The layout assumes a desktop viewport of about 700 px.
- Typography set to 10 px Verdana, which is unreadable on modern screens.
- Contact page is a 300x300 popup containing nothing but a phone number and an address.
- No favicon, no sharing image, no language declaration.

## 5. Visual identity of the source

Colors taken from the source markup:

| Role | Hex | Description |
| --- | --- | --- |
| Page background | #79897F | Muted sage green |
| Panels and contact | #979580 | Warm sand |
| Gallery bands | #687A6F | Deep sage |
| Footer band | #6D7971 | Dark sage grey |
| Body text | #3E3633 | Warm charcoal brown |

Typography: Verdana, Geneva, Arial. Sizes between 10 px and 12 px. No display face, no custom type.

Layout: left aligned bands of images, generous empty space, no centering, no grid. The overall impression is of a printed catalogue from the early 2000s, which is coherent with the work but rendered with web techniques that have aged badly.

Analysis of the artwork itself, which is the real source of the identity:

- Grounds are almost black, in the still life and insect series.
- Subjects are lit from one side, in a strong chiaroscuro derived from Caravaggio and Tintoretto.
- Palettes inside the paintings are dusty yellows, ochres, faded greens, and bone white.
- The installation views are white walls with pale concrete floors and no decoration.
- The critical text explicitly links the work to the `vanitas` tradition and to `De rerum natura`.

Conclusion: the existing sage and sand colors are a correct instinct. The mistake would be to replace them with generic black and white minimalism. The right modernisation keeps the desaturated greens and sands, keeps near black for the artwork plates, and adds a proper type system.

## 6. Proposed design direction

Palette, derived from the artwork rather than invented:

| Token | Hex | Use |
| --- | --- | --- |
| ink | #16180F | Image plates, footer, primary text on light |
| bark | #3E3633 | Secondary text |
| sage | #687A6F | Accents, rules, active states |
| sage light | #79897F | Section backgrounds |
| sand | #979580 | Warm panels, captions |
| paper | #F2EFE6 | Main background |
| bone | #DED8C8 | Borders, dividers |
| ochre | #B08130 | Single accent, links, focus |

Type system:

- Display: an old style serif, for the name, section titles, and series titles.
- Text: a neutral grotesque, for captions, dimensions, and body copy.
- Captions in the exhibition style, meaning title, year, technique, and dimensions on separate lines, small and letterspaced.

Layout direction:

- Full bleed dark plates for individual artworks, with the image as the only focus.
- A quiet sticky header with the name on the left and four items on the right.
- A series index that reads like a catalogue table of contents.
- An artwork page that holds the plate, the caption, and a next and previous control.
- Contact presented as a plain page, not a popup.

## 7. Asset inventory

Downloaded into `_reference/`:

| Folder | Content | Files | Size |
| --- | --- | --- | --- |
| `_reference/gallery` | Gallery thumbnails used on the three gallery pages | 75 | 1.56 MB |
| `_reference/full` | Full size images reached from the zoom pages | 65 | 2.94 MB |
| `_reference/html` | Saved source pages and the 83 zoom pages | 89 | 0.37 MB |
| `_reference/texts` | Critical texts flattened to plain text | 9 | 0.09 MB |
| `_reference/site` | Visual reference samples used for the palette analysis | 9 | 0.19 MB |

Known gaps:

- `pag3/__c%2Bj%20530x800.jpg` returns a server error on the source site. The file is missing and must be requested from the client.
- The 5 videos are not hosted on the site. The video cells reference small JPEG posters only, so the actual media must be requested from the client.
- Several original filenames contain spaces, accents, and `%20`, `%2B` escapes. All filenames must be normalised in Session 2.
- The plain text extraction in `_reference/texts` loses accented characters on three pages, because those pages declare windows-1252 while the rest declare iso-8859-1. Clean transcription into `docs/source-texts/` is required before publishing.

## 8. Open questions for the client

Moved to `QUESTIONS.md` in the project root. That file is the running list and should be updated after every client conversation.

