# Senza Lievito

Static Italian marketing site (`lang="it"`) for a digital strategy consultant, built with `@minimaz/sitekit` (the `mz` build tool). No framework, no routing: plain HTML/CSS/TS bundled into static output.

## Commands

Requires Node `26.x` (`.nvmrc` / `package.json` engines; `.npmrc` sets `engine-strict=true`, so other
versions fail `npm install` outright).

```bash
npm run build    # mz b --overwrite — builds ./src into ./dist
npm run start     # build, then serve ./dist locally via `serve`
npm run format    # prettier --write ./src
npm run lint      # htmlhint + stylelint + cspell (it/en); also lint:a11y and lint:links, which build first
```

There is no test suite. Lint config (`.htmlhintrc`, `.stylelintrc.json`, `cspell.json`) is shared with `zellerindustries-com`; add legitimate names to `cspell.json` `words` rather than editing copy.

## Deploy & hooks

- **Deploy**: `.github/workflows/deploy.yml` runs on push to `main` (or manual dispatch): `npm ci --omit=dev` →
  `npm run build` → rsync `dist/` to the server over SSH (`--delete`, so `dist/` is the full source of truth
  for the live site). `main` is release-only (git-flow) — merging into it deploys.
- **Husky** (`.husky/pre-commit`) runs `format:check`, `lint:html`, `lint:css` and `lint:spelling`; the `prepare` script installs it.

## Architecture

- **Build tool**: `@minimaz/sitekit`, configured via `minimaz.config.json`. Input is `./src`, output is `./dist`.
  The `mapping` config flattens `src/pages`, `src/scripts`, `src/styles`, and `src/public` into the root of
  `dist` (e.g. `src/pages/contatti.html` → `dist/contatti.html`; `src/pages/legal/*.html` → `dist/legal/*.html`,
  preserving subfolders). CSS bundles/minifies to `dist/style.css`, JS to `dist/script.js`.
- **Pages** (`src/pages/*.html`): each is a full standalone HTML document — no templating/include/partial
  system. Shared markup (head meta/OG tags, header, footer) is duplicated per page rather than componentized;
  when changing shared chrome (nav, footer, meta tag patterns), grep across all pages in `src/pages/` and
  `src/pages/legal/` and update each one. Subfolders under `src/pages/` (e.g. `legal/`, `vcard/`) preserve
  their path in `dist/` and may carry their own scoped CSS (e.g. `legal/legal.css`, `vcard/vcard.css`)
  alongside the page. A top-level page can do the same without a subfolder — e.g. `valentina.html` +
  `valentina.css` both flatten to `dist/` and the page links its CSS directly
  (`<link rel="stylesheet" href="/valentina.css">`), bypassing the global `style.css` bundle. `404.html`
  builds to `dist/404.html`, the conventional fallback path static hosts (and `serve`, used by `npm run
  start`) serve for unmatched routes.
- **Scripts**: `src/script.ts` is the single entry point. It imports one `init`-style function per feature
  from `src/scripts/*.ts` — accessibility fallback, flip cards, contact form, header nav, image fallback,
  smooth scroll, right-click easter-egg gif. Add new page behavior as a new module exporting a single
  `init`-style function, then call it from `script.ts`.
- **Styles**: `src/styles/*.css`, one concern per file (layout, buttons, forms, header, footer, bento-\*,
  animations, accessibility, responsive, etc.), bundled together by the build — no CSS build step/preprocessor,
  plain CSS. `src/pages/legal/legal.css` is scoped to the legal pages only.
- **Contact form** (`src/scripts/form.ts`): client-side validation + spam mitigation (honeypot field, minimum
  fill-time check, 24h resubmission lock via `localStorage`), then POSTs JSON to a hardcoded AWS Lambda
  function URL. No backend code lives in this repo.
- **Assets**: `src/public/` (images, fonts, favicon, `robots.txt`, `sitemap.xml`, `llms.txt`) is copied to
  `dist/` root. `bootstrap-icons` font files are remapped from `node_modules` to `/fonts` via
  `minimaz.config.json`'s `output.replace` rules — don't hardcode a different bootstrap-icons asset path.
  `sitemap.xml` entries carry a `<lastmod>` sourced from real git commit history per page — don't hand-wave a
  date when adding a page, pull it from `git log -1 --format=%cs -- <file>`.

## Structured data (JSON-LD) convention

Pages use a `@graph` array (not a single top-level entity) so a page can declare its `WebPage`/`AboutPage`/
etc. alongside related entities in one `<script type="application/ld+json">` block. Two canonical entities
are defined once and referenced by `@id` everywhere else, rather than redeclared inline — do the same when
adding a page that touches identity or org info, instead of writing a fresh inline `Person`/`Organization`:
- `https://senzalievito.com/#organization` (`ProfessionalService`, declared on `index.html`)
- `https://senzalievito.com/valentina#person` (`Person`, declared on `valentina.html`) — `chi-sono.html` and
  `vcard/index.html` both just reference it (`"mainEntity": { "@id": "..." }`) rather than duplicating it.

## SEO tooling

Maintainers may use the optional `claude-seo-ai` Claude Code plugin (installed per checkout, not part of this repo). Its `audit` skill scores Search SEO and AI visibility; its `/claude-seo-ai:fix` command applies findings (dry-run by default, user-invoked only). Nothing in the build depends on it.

## Scope

@SCOPE.md
