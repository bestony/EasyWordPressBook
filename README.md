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

The `home` version is the public homepage at `/`. The `legacy` version contains the original mdBook content under `/legacy/`, and the `v2` version is initialized at `/v2/` so it can evolve independently.

Rspress adds the version prefix automatically for non-default versions. The old Legacy `.html` URLs, such as `/intro.html` and `/theme/intro.html`, are kept as HTTP 301 redirects to their `/legacy/` equivalents. The redirect configuration is included in the generated `doc_build/edgeone.json`, and the Docker Nginx configuration contains the same rules.

The version configuration lives in `rspress.config.ts`, and versioned content is organized under `docs/home/`, `docs/legacy/`, and `docs/v2/`.

## Deployment

The GitHub Actions workflow builds `doc_build/` and deploys it to the existing EdgeOne Pages project. A Docker image, when needed, serves the same directory through Nginx.
