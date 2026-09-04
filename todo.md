# TODO

## Housekeeping

- [x] Commit the pending SEO auto-fixes on `develop`
- [ ] Merge `develop` into `main` when ready to release (repo follows git-flow; `main` stays release-only)
- [x] Fix pre-existing Prettier formatting drift

## SEO — deferred PROPOSED-tier fixes (from the `claude-seo-ai` audit)

- [x] Add `ProfessionalService`/Organization JSON-LD to `index.html`
- [x] Consolidate the 3 fragmented `Person` schema nodes onto one canonical `@id`
- [x] Add `Service` JSON-LD entities to `servizi.html`
- [x] Replace `glossario.html`'s `CollectionPage` schema with `DefinedTermSet` + `DefinedTerm` entries
- [x] Add `ContactPoint` to the Organization schema + link `contatti.html`'s `ContactPage.about` to it
- [x] Add `BreadcrumbList` to chi-sono, servizi, contatti, glossario, valentina
- [x] Add an internal link from `chi-sono.html` to `/valentina`
- [x] Add contextual internal links to `/glossario` from `servizi.html`/`chi-sono.html`
- [x] Restore a minimal footer/back-to-home link on `form.html`
- [x] Differentiate the near-duplicate title/description on `form.html` vs `contatti.html`
- [x] Demote the hidden `sr-only` branding `<h1>` in the shared header to a `<p>`
- [x] Add descriptive alt text + a visible "Immagine illustrativa" disclosure badge to the 3 stock photos on `/valentina`

## SEO — advisory / needs a decision (won't be auto-fixed)

- [ ] **Replace the 3 stock/placeholder photos on `/valentina`** with real photos of Valentina — a visible disclosure badge is now in place as a stopgap, but real photos are still the real fix
- [ ] Design and add a real `og:image`/`twitter:image` (1200×630) — currently none on any page, so social shares (LinkedIn, WhatsApp) show no preview thumbnail
- [ ] Run Lighthouse/PageSpeed Insights against the deployed site once live (Core Web Vitals couldn't be measured from the local static build)
- [ ] If Valentina has a personal LinkedIn profile (separate from the company page), add it to the `sameAs` schema fields

## Other flagged cleanup

- [x] Prune dead CSS targeting IDs that don't exist in any page markup (`#linkinbio-header`, `#links`, `#footer-social`)
- [ ] Consider a real `.eyebrow` style (small-caps/letter-spacing) — currently used site-wide as a label above headings but has zero CSS rules. Visual-identity change, needs a design decision before touching site-wide
