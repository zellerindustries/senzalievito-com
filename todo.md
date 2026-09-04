# TODO

## Housekeeping

- [ ] Commit the pending SEO auto-fixes on `develop` (14 modified files + `src/public/llms.txt`, `README.md`) — uncommitted as of now
- [ ] Merge `develop` into `main` when ready to release (repo follows git-flow; `main` stays release-only)
- [ ] Fix pre-existing Prettier formatting drift in ~17 files (unrelated to recent work; run `npm run format` when there's time to review the diff)

## SEO — deferred PROPOSED-tier fixes (from the `claude-seo-ai` audit, dry-run reviewed but not applied)

- [ ] Add `ProfessionalService`/Organization JSON-LD to `index.html` (name, url, logo, email, phone, address, sameAs)
- [ ] Consolidate the 3 fragmented `Person` schema nodes (`chi-sono.html`, `valentina.html`, `vcard/index.html`) onto one canonical `@id`
- [ ] Add `Service` JSON-LD entities to `servizi.html` for the 6 core services
- [ ] Replace `glossario.html`'s `CollectionPage` schema with `DefinedTermSet` + `DefinedTerm` entries (reuses existing `#id` anchors)
- [ ] Add `ContactPoint` to the Organization schema + link `contatti.html`'s `ContactPage.about` to it
- [ ] Add `BreadcrumbList` to chi-sono, servizi, contatti, glossario, valentina
- [ ] Add an internal link from `chi-sono.html` to `/valentina` (currently an orphan page, not in any nav)
- [ ] Add contextual internal links to `/glossario` from `servizi.html`/`chi-sono.html` (currently linked from homepage only)
- [ ] Restore a minimal footer/back-to-home link on `form.html` (currently `<footer></footer>`, a dead end)
- [ ] Differentiate the near-duplicate title/description on `form.html` vs `contatti.html`
- [ ] Demote the hidden `sr-only` branding `<h1>` in the shared header to a `<span>`/`<p>` (fixes duplicate-H1 on 10 pages)

## SEO — advisory / needs a decision (won't be auto-fixed)

- [ ] **Replace the 3 stock/placeholder photos on `/valentina`** (picsum.photos) with real photos of Valentina — flagged as an authenticity/trust risk by the audit since they sit beside first-person "this is my story" copy with no disclosure
- [ ] Design and add a real `og:image`/`twitter:image` (1200×630) — currently none on any page, so social shares (LinkedIn, WhatsApp) show no preview thumbnail
- [ ] Run Lighthouse/PageSpeed Insights against the deployed site once live (Core Web Vitals couldn't be measured from the local static build)
- [ ] If Valentina has a personal LinkedIn profile (separate from the company page), add it to the `sameAs` schema fields

## Other flagged cleanup (not urgent, no visible impact today)

- [x] Prune dead CSS targeting IDs that don't exist in any page markup: `#linkinbio-header`, `#links` (`src/styles/ids.css`), `#footer-social` (`src/styles/footer.css`) — leftover from an older page concept
- [ ] Consider a real `.eyebrow` style (small-caps/letter-spacing) — currently used site-wide as a label above headings but has zero CSS rules, just inherits parent text styling. Visual-identity change, needs a design decision before touching site-wide
