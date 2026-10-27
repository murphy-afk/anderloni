# Architecture

Technical decisions taken in Session 2. Business content lives in `docs/content-model.md`, visual analysis in `docs/scrape-analysis.md`.

## Stack

| Layer | Choice | Version |
| --- | --- | --- |
| Front end | React, single page application | 19 |
| Build tool | Vite | 7 |
| Back end | Express | 5 |
| ORM | Prisma | 7 |
| Database | MySQL | 8 |
| Styling | Custom CSS with design tokens | none |

No utility CSS framework, no component library, no CSS in JS. Styling is plain CSS files imported from `client/src/styles/index.css`.

## Repository layout

```text
anderloni/
  client/                 React application
    public/               Static files served as is, favicon
    src/
      App.jsx             Temporary shell, replaced in Session 3
      main.jsx            Entry point
      styles/             Design system, see below
    index.html            Document shell, Italian metadata
    vite.config.js        Dev server, API proxy, build config
  server/                 Express API
    prisma/
      schema.prisma       Datasource and generator, models in Session 4
    src/
      config/env.js       Environment parsing and defaults
      db/prisma.js        Prisma Client with MariaDB driver adapter
      middleware/         Error and not found handlers
      routes/             API routers, mounted under /api
      app.js              Express app factory
      index.js            Process entry, HTTP listener, shutdown
    prisma.config.ts      Prisma 7 CLI configuration
  docs/                   Analysis, content model, architecture
  _reference/             Scraped source assets, read only
  ROADMAP.md              Execution phases
  QUESTIONS.md            Running client questions
```

The repository is an npm workspace. Both packages share one `node_modules` and one lockfile at the root.

## Scripts

Run from the repository root.

| Command | Effect |
| --- | --- |
| `npm install` | Install both workspaces |
| `npm run dev` | Start Vite and Express together |
| `npm run dev:client` | Start only Vite on port 5173 |
| `npm run dev:server` | Start only Express on port 4000 |
| `npm run build` | Production build of the client into `client/dist` |
| `npm run preview` | Serve the production build on port 4173 |
| `npm run prisma:generate` | Regenerate Prisma Client |
| `npm run prisma:migrate` | Create and apply a development migration |
| `npm run prisma:studio` | Open Prisma Studio |

## Environment

The server reads `server/.env`, which is git ignored. `server/.env.example` is the committed template.

| Variable | Purpose | Default |
| --- | --- | --- |
| `DATABASE_URL` | MySQL connection string, also used by Prisma | none |
| `PORT` | Express port | 4000 |
| `CLIENT_ORIGIN` | Allowed CORS origin | http://localhost:5173 |

The contact form needs a mail transport configuration. The destination mailbox is question Q6 and remains open, so no mail variables are declared yet.

## Front end

Routes planned for Session 3:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/artista` | L'artista |
| `/opere` | Series index |
| `/opere/:serie/:opera` | Single work |
| `/testi` | Critical texts |
| `/contatti` | Contact |

Routing is client side. GitHub Pages needs a SPA fallback, handled in Session 6 together with the `base` option in `vite.config.js`. The dev server proxies `/api` to `http://localhost:4000`, so the client can call the API with relative paths in both environments.

### Styling system

Load order in `client/src/styles/index.css`:

1. `variables.css` holds every design token.
2. `reset.css` normalises the browser defaults.
3. `base.css` sets element styles and the layout primitives `.container`, `.page`, `.flow`, `.eyebrow`, `.visually-hidden`, `.plate`.

Tokens are named by role, not by raw colour: `--text-primary`, `--surface-plate`, `--border-hairline`. Component files must use tokens. The palette and type direction come from `docs/scrape-analysis.md`, section 6.

Fonts are declared with local fallbacks. Display is an old style serif, text is a neutral grotesque. Self hosted font files are added in Session 5, where asset weight is part of the performance work.

## Back end

`createApp()` in `server/src/app.js` returns a configured Express app without opening a port, so tests can import it later. `src/index.js` starts the listener and handles `SIGINT` and `SIGTERM`.

Current endpoint:

| Method | Path | Response |
| --- | --- | --- |
| GET | `/api/health` | `{ "status": "ok", "service": "anderloni-api", "uptime": 12 }` |

Error contract: every failure returns JSON with an `error` string in Italian, because those messages can surface in the interface.

Unknown routes return 404. Thrown errors return 500 and are logged server side.

## Data layer

Prisma 7 differs from Prisma 6 in three ways that shape this setup:

1. The connection URL lives in `server/prisma.config.ts`, not in the `datasource` block.
2. The `prisma-client` generator writes TypeScript into `server/src/generated/prisma`, which is git ignored and regenerated with `npm run prisma:generate`.
3. The runtime uses a driver adapter, `@prisma/adapter-mariadb` over the `mariadb` package, instead of the Rust query engine.

The generated TypeScript client is loaded by the native type stripping built into Node.js 22.18 and later. This is why `engines.node` is set to `>=22.18`. The server source itself stays plain JavaScript.

Session 4 adds the business models to `prisma/schema.prisma` and the first migration to `prisma/migrations`. Migrations are committed. The generated client is not.

## Data flow

Until Session 4, `docs/content-model.md` is the single source of truth and the React components import static data. In Session 4 the same content is seeded into MySQL and served by the API. The shape of the static data should follow the Prisma models, so the swap is a data source change and not a rewrite of the components.

## Deployment path

1. Session 6 builds `client/dist` and publishes it to GitHub Pages as a temporary client preview, with the API replaced by a static adapter or build time data.
2. Session 7 moves the client and the API to the hosting provider chosen by the client. The domain and host are question Q28.

## Decisions log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-10-26 | npm workspaces with `client` and `server` | One install, one lockfile, shared scripts |
| 2026-10-26 | Vite instead of Create React App | Maintained, fast, static export fits GitHub Pages |
| 2026-10-26 | Custom CSS tokens, no Tailwind | Project rule, and the design is a small fixed system |
| 2026-10-26 | Prisma 7 with MariaDB adapter | Current stable line, no Rust engine binary |
| 2026-10-26 | Generated Prisma client excluded from git | Regenerable from schema, avoids stale code |
| 2026-10-26 | Node.js 22.18 or later | Native TypeScript loading for the generated client |
