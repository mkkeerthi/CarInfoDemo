# Car Info Demo

A lightweight, internal React + TypeScript website about cars sold in India. It exists primarily as a **QA playground**: it spreads a wide set of HTML elements and web interactions (forms, tables, tree views, expanders, tooltips, and ~50 "the-internet"-style example pages) across a multi-page app so that test automation frameworks such as Playwright or Selenium have stable, ID-tagged targets to exercise.

Car catalog data (makes, models, variants, specifications, features, colors) is loaded from either local JSON files or a normalized Supabase (Postgres) database.

> This is not a production application. Write access is deliberately open for the demo (see [Security Notes](#security-notes)).

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Data Sources](#data-sources)
- [Getting Started](#getting-started)
- [Supabase Setup](#supabase-setup)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [API Layer](#api-layer)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Conventions](#conventions)
- [Security Notes](#security-notes)
- [Troubleshooting](#troubleshooting)

---

## Overview

| Item | Value |
| --- | --- |
| Purpose | Internal end-to-end testing / QA demo site |
| Domain | Cars sold in India (makes, models, variants, specs, features) |
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS (dark mode) |
| Icons | Font Awesome 6 (CDN) |
| Routing | React Router v6 |
| Backend / data | Supabase (Postgres + PostgREST), with local JSON fallback |
| Responsiveness | Desktop-optimized |
| Theme | Dark mode (`class="dark"` on `<html>`) |

### Key Features

- **Catalog browsing** — home page with brands and top cars, searchable/filterable cars list, per-car detail page, and a side-by-side compare page (up to 3 cars).
- **Data-driven catalog** — all car data comes from a normalized relational model (brands → models → variants, plus feature groups → features and variant-feature links).
- **Dual data source** — automatically uses Supabase when configured, otherwise falls back to bundled JSON.
- **UI Elements playground** — `/ui-elements` reproduces the classic [the-internet](https://the-internet.herokuapp.com/) example set (checkboxes, dropdowns, drag & drop, alerts, frames, shadow DOM, file upload/download, dynamic loading, etc.) plus Expander, Collapser, Scrollbar, Tooltip, and List View examples.
- **Stable element IDs** — nearly every interactive element and section carries a static `id` so automation tests can target it reliably.
- **CRUD API layer** — typed wrappers over the six base tables plus a read-only catalog view (`v_car_catalog`).

---

## Tech Stack

**Runtime / UI**
- React 18.3
- React DOM 18.3
- React Router DOM 6.26

**Data**
- `@supabase/supabase-js` 2.x (PostgREST queries)
- Local JSON fixtures bundled via Vite

**Tooling**
- TypeScript 5.5 (`strict`, `noUnusedLocals`, `noUnusedParameters`)
- Vite 5.4 + `@vitejs/plugin-react`
- Tailwind CSS 3.4 + PostCSS + Autoprefixer

**Scripts (Node ESM, `.mjs`)**
- `generate-seed.mjs` — builds `supabase/seed.sql` from the JSON fixtures
- `run-brand-tests.mjs` — runs the brand CRUD test suite against Supabase

---

## Architecture

High-level flow:

```
index.html
  └─ src/main.tsx
       └─ BrowserRouter
            └─ CatalogProvider            (loads catalog once, exposes useCatalog)
                 └─ App.tsx               (route table)
                      └─ Layout           (Header + <Outlet/> + Footer)
                           └─ pages/*     (Home, CarsList, CarDetail, Compare, Contact, UiElements)
```

### Data loading pipeline

`CatalogProvider` (in `src/data/CatalogContext.tsx`) decides the source at startup:

```
useSupabaseSource =
  import.meta.env.VITE_DATA_SOURCE !== 'json'   // not forced to JSON
  && isSupabaseConfigured                        // VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY both set
```

- **Supabase path:** `loadCatalogFromSupabase()` → `fetchCatalogRows()` fetches all six tables in parallel → `buildCatalog()` joins them into a flat `Catalog`.
- **JSON path:** `localCatalog` is built synchronously at module load from `src/data/*.json` through the same `buildCatalog()`.

Both paths converge on the same in-memory shape:

```ts
interface Catalog {
  brands: Brand[];
  cars: Car[];              // one entry per car variant, flattened with model + brand data
  featureGroups: FeatureGroup[];
}
```

`useCatalog()` exposes `brands`, `cars`, `featureGroups`, `getCarById(id)`, `getTopCars(count)`, `loading`, and `error`. There is no client-side persistence or state library — catalog data is fetched once and held in React state.

### Layering rules

- **Pages** consume `useCatalog()`. They never talk to Supabase directly.
- **`src/data/`** owns catalog assembly (`buildCatalog`), source selection (`jsonSource`, `supabaseRepository`), and React context.
- **`src/api/`** is a thin, typed PostgREST layer. `core.ts` holds generic CRUD helpers driven by a `TableSpec`; each table module (`brands.ts`, `carModels.ts`, …) declares its spec and exports a namespaced API object. `src/api/index.ts` aggregates them as `api.brands.list()`, `api.carCatalog.search()`, etc. The UI currently does not import `api/` directly — it is used by `supabaseRepository` and the test scripts.
- **`src/types/`** holds the app-facing domain types (`car.ts`) and the DB row types (`database.ts`).

### Mapping notes

- PostgREST responses are aliased to camelCase in each `TableSpec.select` (e.g. `logoText:logo_text`).
- Writes translate camelCase payloads to snake_case columns (`core.ts` `mapValues`), validated against `TableSpec.columns`.
- `Car` is a **variant-level** record: `id` is the variant id; make/model come from joined parent rows.

---

## Project Structure

```
CarInfoDemo/
├─ index.html                  # Vite entry, mounts #root, loads Font Awesome CDN
├─ package.json
├─ vite.config.ts
├─ tailwind.config.js          # darkMode: 'class'
├─ postcss.config.js
├─ tsconfig.json / tsconfig.node.json
├─ .env.example                # copy to .env.local
├─ public/
│  └─ downloads/               # file-download test fixtures
├─ scripts/
│  ├─ generate-seed.mjs        # JSON -> supabase/seed.sql
│  └─ run-brand-tests.mjs      # runs src/api/tests/brandTest.ts via Vite SSR
├─ supabase/
│  ├─ migrations/
│  │  ├─ 20260101000000_init_schema.sql     # schema, view, RLS read policies
│  │  └─ 20260102000000_write_policies.sql  # public write policies (demo)
│  └─ seed.sql                 # generated sample data
└─ src/
   ├─ main.tsx                 # Router + CatalogProvider
   ├─ App.tsx                  # route table
   ├─ index.css                # Tailwind directives + base styles
   ├─ Prompt.md                # original build brief
   ├─ api/                     # typed PostgREST CRUD layer
   │  ├─ core.ts               # generic helpers + TableSpec
   │  ├─ index.ts              # `api` namespace
   │  ├─ <table>.ts            # one module per table
   │  ├─ catalog.ts            # parallel fetch of all six tables
   │  └─ tests/brandTest.ts    # brands CRUD end-to-end tests
   ├─ components/
   │  ├─ layout/               # Layout, Header, Footer, Banner
   │  └─ ui/                   # CarTable, CarListView, TreeView, Expander, Collapser, Tooltip, Scrollbar
   ├─ data/
   │  ├─ catalog.ts            # buildCatalog()
   │  ├─ CatalogContext.tsx    # provider + useCatalog()
   │  ├─ jsonSource.ts         # local JSON -> Catalog
   │  ├─ supabaseRepository.ts # Supabase -> Catalog
   │  └─ *.json                # seed fixtures (brands, carModels, carVariants, featureGroups, features, carVariantFeatures)
   ├─ pages/                   # HomePage, CarsListPage, CarDetailPage, ComparePage, ContactPage, UiElementsPage
   │  └─ ui-elements/          # ~50 example pages + examples.ts registry + EmbedPage
   ├─ lib/supabase.ts          # client factory + isSupabaseConfigured
   └─ types/                   # car.ts (domain), database.ts (rows)
```

---

## Data Model

Normalized relational Schema (see `supabase/migrations/20260101000000_init_schema.sql`):

| Table | Purpose | Key columns |
| --- | --- | --- |
| `brands` | Manufacturer | `id`, `name` (unique), `origin`, `logo_text` |
| `car_models` | Model under a brand | `id`, `brand_id → brands`, `name`, `body_type`, `safety_rating` (0–5), `colors` (comma-separated), unique `(brand_id, name)` |
| `car_variants` | Purchasable trim | `id`, `model_id → car_models`, `trim_name`, `price_lakh`, `fuel_type`, `transmission`, `seats`, `engine_cc`, `power_bhp`, `mileage_kmpl`, unique `(model_id, trim_name)` |
| `feature_groups` | Feature category | `id`, `label` (unique), `sort_order` |
| `features` | Individual feature | `id`, `group_id → feature_groups`, `label`, `sort_order` |
| `car_variant_features` | Variant ↔ feature link | `id`, `variant_id → car_variants`, `feature_id → features`, `is_standard`, unique `(variant_id, feature_id)` |

**Enums**
- `fuel_type` = `Petrol | Diesel | CNG | Electric | Hybrid`
- `transmission` = `Manual | Automatic`
- `body_type` (checked) = `Hatchback | Sedan | SUV | MUV`

**Read model** — `v_car_catalog` joins variants → models → brands into a flat, queryable catalog view.

**Triggers** — `car_variants.updated_at` is maintained by the `set_updated_at()` trigger.

**Seed dataset** (`src/data/*.json`, also compiled into `supabase/seed.sql`):

| File | Rows |
| --- | --- |
| `brands.json` | 6 (Maruti Suzuki, Hyundai, Tata, Mahindra, Honda, Toyota) |
| `carModels.json` | 8 |
| `carVariants.json` | 8 |
| `featureGroups.json` | 4 |
| `features.json` | 42 |
| `carVariantFeatures.json` | 32 |

---

## Data Sources

### Option A — Local JSON (zero setup, default fallback)

If Supabase is **not** configured, the app runs entirely from the bundled JSON fixtures. No network, no database, no env vars required.

You can also force JSON even when Supabase credentials exist:

```bash
# .env.local
VITE_DATA_SOURCE=json
```

### Option B — Supabase

Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see [Supabase Setup](#supabase-setup)). The app then fetches all six tables on load and builds the catalog client-side.

Source decision summary:

| `VITE_DATA_SOURCE` | Supabase creds set | Result |
| --- | --- | --- |
| unset / `supabase` | yes | Supabase |
| unset / `supabase` | no | Local JSON |
| `json` | either | Local JSON |

---

## Getting Started

### Prerequisites

- **Node.js 18+** (20 LTS recommended) and npm
- A Supabase project **only if** you want the database-backed mode

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment (optional)

Skip this to run against local JSON. To use Supabase:

```bash
# Copy the template (Windows: copy .env.example .env.local)
cp .env.example .env.local
```

Then edit `.env.local`:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
# Remove or leave as-is; set to "json" to force the JSON fallback
VITE_DATA_SOURCE=supabase
```

Find these under **Supabase Dashboard → Project Settings → API**.

### 3. Run the dev server

```bash
npm run dev
```

Open **http://localhost:5173**. The Vite server binds to `host: true` (all interfaces).

### 4. Build for production

```bash
npm run build      # runs `tsc` typecheck then `vite build`
npm run preview    # serve the built output locally
```

### 5. Explore

- `/` — home (brands, top cars)
- `/cars` — search/filter list with a data table
- `/cars/:id` — detail page (specs, feature tree, expanders, tooltip)
- `/compare` — compare up to 3 cars
- `/contact` — form demo
- `/ui-elements` — the QA example playground

---

## Supabase Setup

1. Create a Supabase project (or use an existing one).
2. In the **SQL Editor**, run the migrations **in order**:
   1. `supabase/migrations/20260101000000_init_schema.sql` — creates enums, tables, indexes, trigger, the `v_car_catalog` view, RLS **read** policies, and grants.
   2. `supabase/migrations/20260102000000_write_policies.sql` — adds public insert/update/delete policies and grants (needed only for the CRUD API / test scripts).
3. Seed data. Either paste the generated `supabase/seed.sql` into the SQL Editor, or regenerate it from the JSON fixtures first:

   ```bash
   npm run seed:generate   # writes supabase/seed.sql from src/data/*.json
   ```

   > `init_schema.sql` drops and recreates the tables, so re-running it **deletes existing car data**. This is intentional for the demo.

4. Copy the project URL and anon key into `.env.local` (see [Getting Started](#getting-started)).

Notes:
- The schema uses enums (`fuel_type`, `transmission`) so the API layer sends/reads plain strings.
- Identity columns use `generated always as identity`; inserts in `seed.sql` use `overriding system value` to keep fixed IDs, and `setval(...)` resets sequences afterwards.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server (http://localhost:5173) |
| `npm run build` | Type-check with `tsc` then build with Vite |
| `npm run preview` | Serve the production build locally |
| `npm run seed:generate` | Regenerate `supabase/seed.sql` from `src/data/*.json` |
| `node scripts/run-brand-tests.mjs` | Run the brands CRUD test suite against Supabase |

---

## Application Routes

| Path | Page | Description |
| --- | --- | --- |
| `/` | HomePage | Banner, sample image, brand grid (tooltips), top cars list |
| `/cars` | CarsListPage | Search box, fuel radio group, body-type checkboxes, results table |
| `/cars/:id` | CarDetailPage | Specs, feature tree, expanders/collapser, tooltip |
| `/compare` | ComparePage | Pick up to 3 cars, comparison table |
| `/contact` | ContactPage | Accessible form (inputs, radios, textarea, checkbox) |
| `/ui-elements` | UiElementsPage | Index of example pages |
| `/ui-elements/:example` | — | Individual UI example (see `src/pages/ui-elements/examples.ts`) |
| `/embed/:name` | EmbedPage | Bare documents used as iframe sources (no site chrome) |
| `*` | HomePage | Catch-all fallback |

`src/pages/ui-elements/examples.ts` is the single registry that drives both the index list and the nested route table. Adding an example = create the component and add one entry there.

---

## API Layer

`src/api/` is a typed PostgREST wrapper. Each table module exports a `TableSpec` (table name, aliased select list, writable column map, id column, default order) and a namespaced object of methods.

Common methods (per table): `list`, `getById`, `create`, `createMany`, `update`, `upsertMany`, `remove`, `count`, plus table-specific helpers (e.g. `brands.getByName`, `updateByName`, `removeByName`, `removeWhere`).

```ts
import { api } from './src/api';

const brands = await api.brands.list({ orderBy: 'name', limit: 5 });
const car = await api.carCatalog.getById(3);
```

Key behaviors in `core.ts`:
- `getClient()` throws `"Supabase is not configured"` when no client exists.
- Write helpers reject empty payloads; `updateWhere`/`deleteWhere`/`selectOne` require at least one filter.
- `list()` supports `filters`, `orderBy`, `ascending`, `limit`, `offset`. Offset-only queries are capped at 10,000 rows (PostgREST has no unbounded range).

---

## Testing

### Brand CRUD suite

`src/api/tests/brandTest.ts` exercises every `brandsApi` method against a live Supabase project. It is loaded through Vite's SSR loader (not plain Node) because the API reads `import.meta.env`.

```bash
# All tests, sequentially (requires configured .env.local)
node scripts/run-brand-tests.mjs

# List test names
node scripts/run-brand-tests.mjs --list

# Run a single test with inputs
node scripts/run-brand-tests.mjs list         --origin "India" --limit 5
node scripts/run-brand-tests.mjs getById      --id 12
node scripts/run-brand-tests.mjs getByName    --name "Maruti Suzuki"
node scripts/run-brand-tests.mjs create       --name "Tesla" --origin "USA" --keep
node scripts/run-brand-tests.mjs update       --id 12 --new-origin "United States"
node scripts/run-brand-tests.mjs removeWhere  --origin "USA"
node scripts/run-brand-tests.mjs count        --origin "India"
```

- With no flags, each test provisions uniquely-named rows and cleans them up, so it is safe to re-run.
- `create` / `createMany` delete their rows unless `--keep` is passed (upserts always persist).
- Tests require the **write policies** migration and a valid `.env.local`.

### UI automation

The app is designed for Playwright/Selenium-style tests: pages render stable static `id`s (e.g. `car-search`, `fuel-radio-group`, `cars-table`, `compare-table`, `contact-form`, `car-detail-title`) and accessible roles/labels.

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | For Supabase mode | Project URL (`https://<ref>.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | For Supabase mode | Public anon key |
| `VITE_DATA_SOURCE` | No | Set to `json` to force the local JSON fallback |

All are `VITE_`-prefixed because they are embedded at build time. `.env.local` and `.env.*` are gitignored (except `.env.example`).

---

## Conventions

- **TypeScript** is strict: unused locals/params, no fallthrough, `noEmit`. Run `npm run build` (which runs `tsc`) before considering a change done.
- **Styling** uses Tailwind utility classes. Dark mode is class-based (`dark` on `<html>`); the palette centers on neutral grays with an `emerald` accent. Transition timing is `duration-200 ease-in-out`.
- **IDs matter.** Give every new interactive element/section a stable, static `id` — QA automation depends on it.
- **No state library.** Catalog state lives in React context; forms use local `useState`.
- **Pages don't import `api/` directly** — go through `useCatalog()` / `src/data`.
- **Adding a UI example:** create the component under `src/pages/ui-elements/`, then register it in `examples.ts` (pick `hidden: true` for child routes not shown on the index).
- **Adding a catalog table field:** update the DB migration, the row type in `src/types/database.ts`, the `buildCatalog` mapping, and the relevant `TableSpec`/insert types in `src/api/`.

---

## Security Notes

This project is **intentionally insecure** for demo/QA purposes:

- `20260102000000_write_policies.sql` grants **public insert/update/delete to `anon`**. Anyone with the anon key can modify data.
- RLS is enabled, but policies are `using (true)` / `with check (true)` for reads and writes.
- `init_schema.sql` drops tables on re-run.

Before any real deployment: scope write policies to authenticated users, remove the public grants, rotate keys, and treat the anon key as public (never put a service-role key in this frontend).

---

## Troubleshooting

| Symptom | Cause / Fix |
| --- | --- |
| "Failed to load cars: Supabase is not configured" | Supabase creds missing but a Supabase path was expected. Add `VITE_*` vars or set `VITE_DATA_SOURCE=json`. |
| Data looks stale after DB edits | Catalog is fetched once on load; reload the page. |
| `seed:generate` output rejected by Supabase | Run `init_schema.sql` first; seeds depend on the enums/tables. |
| Brand tests fail immediately | Missing `.env.local`, or the write-policies migration was not applied. |
| Type errors on build | `npm run build` runs strict `tsc`; fix unused symbols and type mismatches. |
| Port 5173 busy | Stop the other process or run `npm run dev -- --port <n>`. |

---

## License / Status

Internal demo project. Not for production use. Data (prices, specs, features) is illustrative and dummy.
