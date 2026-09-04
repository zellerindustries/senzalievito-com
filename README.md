# Senza Lievito

Static marketing site for **Senza Lievito** — Valentina Battafarano, digital strategy & communication
consultant. Italian-language (`lang="it"`), no framework: plain HTML/CSS/TypeScript pages bundled and
minified into static output with [`minimaz-cli`](https://www.npmjs.com/package/minimaz-cli).

## Requirements

- Node.js `24.x` (see `.nvmrc` / `engines` in `package.json`; `.npmrc` sets `engine-strict=true`)

## Getting started

```bash
npm install
npm run start   # builds ./src into ./dist, then serves it locally via `serve`
```

## Scripts

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `npm run build`  | Builds `./src` into `./dist` (`npx mz b`) |
| `npm run start`  | Builds, then serves `./dist` locally      |
| `npm run format` | Formats `./src` with Prettier             |

There is no lint or test script — `npm run format` is the only source-checking step.

## Project structure

```
src/
  pages/     # one standalone .html document per route (flattened into dist/ root)
  scripts/   # one init-style TS module per page feature, wired up in script.ts
  styles/    # one CSS file per concern, bundled into dist/style.css
  public/    # static assets (images, fonts, favicon, robots.txt, sitemap.xml, llms.txt)
minimaz.config.json  # build configuration (input/output mapping, CSS/JS bundling)
```

Each page in `src/pages/` is a full standalone HTML document — there's no templating/include system, so
shared markup (header, footer, meta tags) is duplicated per page. See `.claude/CLAUDE.md` for the full
architecture notes.

## Deployment

`npm run build` produces a fully static `./dist` directory that can be served by any static host — no
server-side runtime required.

## License

See [LICENSE](./LICENSE).
