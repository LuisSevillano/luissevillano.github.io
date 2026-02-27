# Luis Sevillano Portfolio

Personal site built with SvelteKit and deployed to GitHub Pages.

## Requirements

- Node.js 20+
- npm 10+

## Local development

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

`npm run build` outputs static files in `build/` using `@sveltejs/adapter-static`.

## Main content locations

- Case studies: `src/content/work/*.md`
- Project metadata: `src/lib/content/projects.generated.json`
- Routes: `src/routes`
- Static media: `static/assets`

## Deployment

GitHub Pages deployment is handled by `.github/workflows/pages.yml`.

On push to `main`, the workflow:

1. Installs dependencies with `npm ci`
2. Builds with `npm run build`
3. Publishes `build/` as the Pages artifact
