# Easy WordPress Book

This documentation site is built with [Rspress](https://rspress.rs/).

## Development

Rspress requires Node.js 20.19+ or Node.js 22.12+.

```bash
npm install
npm run dev
```

The production site can be built and previewed locally with:

```bash
npm run build
npm run preview
```

The generated static site is written to `doc_build/`.

## Documentation versions

The `legacy` version contains the original mdBook content. It is the default version, so its routes keep the existing paths, including `.html` pages such as `/intro.html` and `/theme/intro.html`.

The `v2` version is initialized at `/v2/` and can evolve independently. Rspress adds the version prefix automatically for version-specific navigation and search.

The version configuration lives in `rspress.config.ts`, and versioned content is organized under `docs/legacy/` and `docs/v2/`.

## Deployment

The GitHub Actions workflow builds `doc_build/` and deploys it to the existing EdgeOne Pages project. A Docker image, when needed, serves the same directory through Nginx.
