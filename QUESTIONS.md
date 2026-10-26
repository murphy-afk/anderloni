# QUESTIONS.md

Running list of questions for the client. Update after every conversation. Move answered items to the Answered section with the answer and the date.

Format: `ID | question | impact | status`

Status values: open, answered, deferred, dropped.

## Answered

| ID | Question | Answer |
| --- | --- | --- |
| Q1 | Should the telephone numbers be published? | No. Email only. Phones removed from the content model on 2026-10-26. |
| Q2 | Do we need an official biography before building the site? | No. Proceed with placeholder copy built only on verifiable facts. Replace later. 2026-10-26. |
| Q3 | Are prices published on the current site? | No. No price, currency, or price request appears on any page. |
| Q4 | Should prices be shown on the new site? | No. This is a gallery portfolio, not a shop. No price field, no price block, no "su richiesta" label. Confirmed 2026-10-26. |
| Q5 | Do you have a price list? | Not needed. Question dropped. |

## Blocking before the front end can ship

| ID | Question | Impact |
| --- | --- | --- |
| Q6 | Where should the contact form send messages? Which mailbox? | Blocks the Express endpoint and the mail configuration in Session 4. |

## Deferred by client decision, 2026-10-26

Work continues with the assets already scraped. Broken or low quality images are handled later, not now.

| ID | Question | Status |
| --- | --- | --- |
| Q10 | Are higher resolution files available? | Deferred. We use the 400 to 900 px files already downloaded. |
| Q14 | Where are the 5 videos hosted? | Deferred. Poster frames only for now. |
| Q15 | The image `pag3/__c%2Bj 530x800.jpg` returns a server error. | Deferred. The work stays out of the catalogue until a file arrives. |
| Q16 | Are there images of the other installations? | Deferred. We use the four captured installation views. |
| Q11 | Photography credit for the artwork images? | Deferred to final review. |
| Q12 | Do you own the rights to the images? | Deferred to final review. |

## Content needed

| ID | Question | Impact |
| --- | --- | --- |
| Q7 | What is the official biography, including year of birth, place of birth, and training? | The L'artista page is provisional until this arrives. |
| Q8 | Is there a complete exhibition list, solo and group, with year, venue, and city? | Needed for a credible Mostre section. The current site names only Jacob Karpio Gallery and DAB Gallery. |
| Q9 | Is there a catalogue or press review to quote? | Would feed the Testi section and structured data. |
| Q13 | Which technique should be declared for each work, for example olio su tela, tecnica mista, fotografia? | The current site never states the technique, only the size. |

## Texts

| ID | Question | Impact |
| --- | --- | --- |
| Q17 | Should the critical texts be published in the original language only, or with Italian translations? | Most texts are in Spanish. Italian readers need a translation. |
| Q18 | Who wrote the "After Man Ray" and "Personal details" texts? | Both are unsigned. Attribution is required before publishing. |
| Q19 | In "Personal details" the signature says Madrid, September 1996. Who signed it? | Same reason as Q18. |
| Q20 | The Italian version of Quod superest attributes a quote to "Robert Filiou", the Spanish to "Robert Liliou". The artist is Robert Filliou. Should we correct the spelling? | Small editorial fix, needs approval. |
| Q21 | Should the work titles stay in the original language, English and Spanish, or be translated for the Italian site? | Currently the content model keeps originals. Confirm. |
| Q22 | Do you want a section for texts by yourself, separate from the critics? | Would affect the Testi page structure. |

## Data and structure

| ID | Question | Impact |
| --- | --- | --- |
| Q23 | Should the address be written as "C.na Comperto" or "Cascina Comperto"? | Currently expanded to Cascina. Confirm. |
| Q24 | Are the years and dimensions on the current site correct? Several entries mix centimetres and inches inconsistently. | Data clean up before migration into MySQL. |
| Q25 | Should the Quicktour slideshow survive as an automatic carousel, or be dropped in favour of the catalogue? | Affects the home page build. |
| Q26 | Do you have social profiles, Instagram or similar, to link in the footer? | Small addition, useful for collectors. |
| Q27 | Is anything missing from the current site that you want in the new one, for example a newsletter or a curated press page? | Scope control. |

## Technical and commercial

| ID | Question | Impact |
| --- | --- | --- |
| Q28 | Which domain and hosting provider will be used for the final deployment? | Decides the Session 7 migration target. |
| Q29 | Do you need a privacy policy and a cookie notice? The site will be Italian, so GDPR applies. | Legal requirement, even for a simple form. |
| Q30 | Should the site be in Italian only, or Italian plus English for international collectors? | Affects routing and content model. Currently Italian only. |
| Q31 | Will you update the site yourself, for example adding a new series each year? | Decides whether we need a small admin panel or just seed data. |
| Q32 | Is there a deadline or a linked event, such as an exhibition opening? | Sets the staging date for GitHub Pages. |

## Open editorial choices

These are decisions we can propose, but the client should confirm.

| ID | Question | Impact |
| --- | --- | --- |
| Q33 | Do we keep the sage and sand palette of the current site, modernised, or move to a neutral gallery white? | Proposal is to keep the palette, rebuilt from the artwork. |
| Q34 | Should the artwork pages be dark, with the image on near black, or light? | Proposal is dark, to match the still lifes. |
| Q35 | Should dimensions appear in both centimetres and inches, or centimetres only? | Proposal is centimetres primary, inches in small type. |
