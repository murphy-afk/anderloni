# ROADMAP.md

Project: new website for Guido Anderloni (painter), based on https://www.anderloni.com

Working rules live in `AGENTS.md`. This file tracks execution phases only.

## Status legend
- [ ] not started
- [x] done

## Session 1: Information Gathering & Scrape Analysis
- [x] Extract data, metadata, text content, image assets, and business details from the target link.
- [x] Analyze visual identity from scraped assets (colors, fonts, overall vibe).
- [x] Structure raw business info into Italian content models.
- Output: `docs/scrape-analysis.md`, `docs/content-model.md`, `_reference/`
- Client questions are tracked in `QUESTIONS.md`, which stays open until handover.

## Session 2: Environment Setup & Architecture Definition
- [x] Initialize React frontend application.
- [x] Initialize Express backend server.
- [x] Configure Prisma ORM with MySQL connection schema.
- [x] Setup custom CSS structure (variables, resets, base styles).
- Output: `docs/architecture.md`, `README.md`

## Session 3: Frontend Layout & UI Components (Italian Content)
- [x] Build responsive navigation, hero section, services, gallery, and contact components.
- [x] Apply styling using custom CSS derived from business photo aesthetic.
- [x] Populate all copy in standard, professional Italian.

## Session 4: Backend API & Database Schema
- [x] Define Prisma schema models reflecting business entities (services, inquiries, content).
- [x] Execute migrations using Prisma.
- [x] Build Express REST API endpoints to serve data dynamically.

## Session 5: SEO Optimization & Metadata
- [x] Implement semantic HTML structures across all React components.
- [x] Add OpenGraph, Twitter cards, and structured JSON-LD data in Italian.
- [x] Optimize asset loading and performance metrics.

## Session 6: Staging Deployment (GitHub Pages)
- [x] Configure static export build or mock client-side state adapter for preview testing.
- [x] Deploy temporary live preview to GitHub Pages for client presentation.

## Session 7: Final Client Handover & Production Deployment
- [ ] Collect client feedback.
- [ ] Migrate from temporary staging setup to final target hosting server based on client choice.

## Session 8: Content restructure (texts, series, gallery)
- [x] Tie each critical text to the series that published it, on the series and text pages.
- [x] Transcribe the nine text bodies from the saved source pages into `docs/source-texts/` and `client/src/data/texts/`.
- [x] Correct text metadata (authors, years, languages) against the transcriptions.
- [x] State catalogue totals on the index (17 series, 76 works) and label filter counts as series.
- [x] Rebuild the index as one band per series: title on top, single row of up to six previews, no wrapping, opening the series page.
- [x] Remove the texts index, keep the text pages under their series, redirect `/testi` to `/opere`.
- [x] Move the browse dialog to a Quick tour page opened from the Home "Sfoglia tutte le opere" button, replacing Testi in the navigation.
- [x] Put the prev and next arrows on the sides of the full screen image, in both the quick tour and the artwork lightbox.
- [ ] Confirm transcription questions with the client (`QUESTIONS.md` Q17 to Q21, Q36 to Q39).

## Deployment Strategy
1. Primary preview deployment: temporary hosting on GitHub Pages for client showcase.
2. Final deployment: shift to production server or hosting provider selected after client approval.
