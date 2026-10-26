# Beyond Kinematic Tracking — Project Website

Project page for **Beyond Kinematic Tracking: Preserving Expressive Characteristics in Humanoid Whole-Body Control**.

- Paper: https://arxiv.org/abs/2610.19393
- Video: https://www.youtube.com/watch?v=5EmDvZdKiBY
- Website: https://ihcr.github.io/Beyond_Kinematic_Tracking/

Built with [vinext](https://www.npmjs.com/package/vinext) (Next.js App Router on Vite) and deployed to GitHub Pages from `main` by `.github/workflows/deploy-pages.yml`.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build        # Cloudflare Workers output (dist/server + dist/client)
npm run build:pages  # prerenders routes to static HTML for GitHub Pages
```

`build:pages` is what CI runs. It sets `GITHUB_PAGES=true` and a base path
matching the repository name, so the published site works under
`/<repo>/`; the workflow reads that name from `GITHUB_REPOSITORY`, meaning
a repository rename needs no change here.

The repository must have GitHub Pages set to deploy from **GitHub Actions**
(Settings → Pages → Source). The workflow asks GitHub to enable it on the
first run; if that step fails, flip the setting once and re-run the workflow.
