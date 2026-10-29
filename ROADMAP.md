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
- [ ] Define Prisma schema models reflecting business entities (services, inquiries, content).
- [ ] Execute migrations using Prisma.
- [ ] Build Express REST API endpoints to serve data dynamically.

## Session 5: SEO Optimization & Metadata
- [ ] Implement semantic HTML structures across all React components.
- [ ] Add OpenGraph, Twitter cards, and structured JSON-LD data in Italian.
- [ ] Optimize asset loading and performance metrics.

## Session 6: Staging Deployment (GitHub Pages)
- [ ] Configure static export build or mock client-side state adapter for preview testing.
- [ ] Deploy temporary live preview to GitHub Pages for client presentation.

## Session 7: Final Client Handover & Production Deployment
- [ ] Collect client feedback.
- [ ] Migrate from temporary staging setup to final target hosting server based on client choice.

## Deployment Strategy
1. Primary preview deployment: temporary hosting on GitHub Pages for client showcase.
2. Final deployment: shift to production server or hosting provider selected after client approval.
