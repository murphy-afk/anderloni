# AGENTS.md

## Core Constraints & Rules
- Do not use emdashes (-- or —).
- Do not use emojis anywhere in the codebase, comments, or documentation.
- Do not create lines that only contain '>' or '/>'.
- Never commit without asking for explicit user permission.
- Do not use Prettier or automated code formatters that alter structure.
- All code, variable names, and comments must be written in English.
- All end-user facing website content must be written in Italian.
- Commit messages must be minimal, concise, and contain only essential info (average around 12 words per commit, e.g., 'added crud', 'removed tailwindcss').

## Technical Stack Architecture
- Frontend: React (SPA for temporary GitHub Pages deployment).
- Backend: Express.js.
- Database: MySQL (managed via MySQL Workbench).
- ORM & Migrations: Prisma.
- Styling: Custom CSS (No utility frameworks or Tailwind CSS).
- SEO: Optimized meta tags, semantic HTML, structured metadata, and performance optimization.

## Project Execution Roadmap
- The phased execution plan is maintained in `ROADMAP.md`.
- Read `ROADMAP.md` before starting work and update its checkboxes as sessions progress.
- Do not duplicate roadmap content in this file.