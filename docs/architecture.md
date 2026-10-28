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
    public/
      works/              Artwork images, copied by npm run assets
    src/
      components/         Layout, header, footer, page header, lightbox
      data/               Generated catalogue, series config, site copy
      hooks/              usePageTitle
      lib/                asset path resolver, catalogue helpers
      pages/              One file per route
      styles/             Design system, see below
      App.jsx             Route table
      main.jsx            Entry point
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
  scripts/                Catalogue and asset build steps
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
| `npm run assets` | Copy artwork images into `client/public/works` with normalised names |
| `npm run catalog:extract` | Regenerate `docs/catalog-raw.json` from the saved source pages |
| `npm run catalog` | Regenerate `client/src/data/catalog.js` from `docs/catalog-raw.json` |

## Environment

The server reads `server/.env`, which is git ignored. `server/.env.example` is the committed template.

| Variable | Purpose | Default |
| --- | --- | --- |
| `DATABASE_URL` | MySQL connection string, also used by Prisma | none |
| `PORT` | Express port | 4000 |
| `CLIENT_ORIGIN` | Allowed CORS origin | http://localhost:5173 |

The contact form needs a mail transport configuration. The destination mailbox is question Q6 and remains open, so no mail variables are declared yet.

## Front end

Routes built in Session 3:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/artista` | L'artista |
| `/opere` | Series index |
| `/opere/:serie` | Single series |
| `/opere/:serie/:opera` | Single work |
| `/testi` | Critical texts |
| `/testi/:testo` | Single text |
| `/contatti` | Contact |
| `/note-legali` | Legal notes placeholder |
| `/privacy` | Privacy placeholder |
| `*` | 404 |

Routing is client side with `react-router-dom` 7. GitHub Pages needs a SPA fallback, handled in Session 6 together with the `base` option in `vite.config.js`. The dev server proxies `/api` to `http://localhost:4000`, so the client can call the API with relative paths in both environments.

The legal and privacy pages are placeholders with verifiable data only. They exist so the footer never shows a dead link. Their final text depends on Q29.

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

The static catalogue is generated, not handwritten:

```text
_reference/html/                        saved source pages, latin1 encoded
  -> npm run catalog:extract            docs/catalog-raw.json, extracted catalogue
_reference/gallery, _reference/full    scraped image files
  -> npm run assets                    client/public/works, normalised names
docs/catalog-raw.json                  extracted catalogue, source of truth
client/src/data/series-config.js       hand written titles, years, categories
  -> npm run catalog                   client/src/data/catalog.js
```

`scripts/extract-catalog-raw.mjs` parses the saved HTML pages. Zoom pages are authoritative for title, year and dimensions; the band caption row is the fallback for works without a zoom page. Captions are matched to thumbnails by cell index so empty spacer cells keep alignment, and a band with no title text continues the preceding series.

`scripts/lib/normalise-name.mjs` holds the one naming rule used by both steps, so a copied file and a generated path always agree. Italian interface copy lives in `client/src/data/site.js`.

Images are served from `client/public/works/` and resolved through `client/src/lib/asset.js`, which prefixes `import.meta.env.BASE_URL` so the same paths work under the GitHub Pages subpath.

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
| 2026-10-27 | react-router-dom 7 for client routing | Nested routes, 404 handling, not a UI library |
| 2026-10-27 | Generated catalogue data module | 76 works across 17 series derive from the extracted source, no manual lists |
| 2026-10-27 | Catalogue extracted from saved source pages | Zoom pages carry title, year, dimensions; band captions are the fallback |
