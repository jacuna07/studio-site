# Studio Site

Branding studio portfolio. Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel.

## Structure

- `src/app` — pages: home, `/work`, `/work/[slug]` (case study template), `/about`, `/contact`
- `src/components` — shared UI
- `src/content/projects` — one file per project; each exports a `Project` object (see `types.ts`)
- `public/images/<slug>/` — images for each project (currently placeholder SVGs)

## Adding a new project

1. Add a new file in `src/content/projects/`, e.g. `my-new-project.ts`, copying the shape of an existing project file (see `aurora-coffee.ts`).
2. Add its images under `public/images/<slug>/`.
3. Register it in `src/content/projects/index.ts` by importing it and adding it to the `projects` array.
4. Commit and push — Vercel deploys automatically.

## Contact form

The contact form posts to Formspree. Set the real endpoint in `src/components/ContactForm.tsx` (`FORMSPREE_ENDPOINT`) once a Formspree form has been created.

## Local development

```
npm install
npm run dev
```
