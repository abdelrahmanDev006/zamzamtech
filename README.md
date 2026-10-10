# ZAMZAM TECH — Portfolio & Presentation

Marketing website and interactive company presentation for **Zamzam Tech**, a software house building web apps, offline-first desktop systems, and POS/CRM platforms.

## Tech Stack

- **React 19** + **TypeScript**, bundled with **Vite 8**
- **React Router v7** (`HashRouter`, required for GitHub Pages)
- **Framer Motion** for animation and slide transitions
- **i18next / react-i18next** for Arabic (default, RTL) and English
- **lucide-react** icons, **oxlint** for linting

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page: hero, services, process, filterable portfolio, contact form (FormSubmit) |
| `/project/:id` | Project details: tech stack, features, gallery with lightbox |
| `/presentation` | 12-slide company profile (Arabic/English, keyboard navigation, fullscreen, laser pointer, contents, PDF print) |
| `/thank-you` | Post-submission confirmation page |

Project data lives in `src/data/projects.ts`; all copy is in `src/locales/{ar,en}.json`.

## Presentation Shortcuts

`←` / `→` navigate · `Space` next · `F` fullscreen · `G` slide grid · `L` laser pointer · `Esc` close overlay

## Scripts

```bash
npm install       # install dependencies
npm run dev       # start dev server
npm run build     # typecheck + production build to dist/
npm run lint      # run oxlint
npm run preview   # preview the production build
npm run deploy    # build and publish dist/ to gh-pages
```

## Deployment

Deployed to GitHub Pages at `https://abdelrahmandev006.github.io/zamzamtech/`. The Vite `base` is set to `/zamzamtech/`, so keep asset URLs base-aware (`import.meta.env.BASE_URL` or `%BASE_URL%` in `index.html`) when adding new files.
