# Guido Anderloni

New website for the painter Guido Anderloni, based on https://www.anderloni.com.

React single page application, Express API, MySQL through Prisma, custom CSS. The interface is in Italian.

## Requirements

- Node.js 22.18 or later
- npm 10 or later
- MySQL 8 for the database work in Session 4

## Setup

```bash
npm install
Copy-Item server/.env.example server/.env
npm run prisma:generate
npm run dev
```

The client runs on http://localhost:5173 and proxies `/api` to the server on http://localhost:4000.

## Scripts

| Command | Effect |
| --- | --- |
| `npm run dev` | Client and server together |
| `npm run build` | Production build in `client/dist` |
| `npm run preview` | Preview the production build |
| `npm run prisma:generate` | Regenerate Prisma Client |
| `npm run prisma:migrate` | Create and apply a migration |
| `npm run prisma:studio` | Open Prisma Studio |

## Documentation

- `ROADMAP.md` tracks the execution phases.
- `AGENTS.md` holds the working rules.
- `QUESTIONS.md` is the running list of client questions.
- `docs/scrape-analysis.md` covers the source site and the visual direction.
- `docs/content-model.md` is the Italian content source of truth.
- `docs/architecture.md` documents the technical setup.
