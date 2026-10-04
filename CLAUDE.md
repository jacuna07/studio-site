# Tresunotres site (tresunotres.co)

Brand design studio portfolio. Next.js 14 (App Router), TypeScript, Tailwind 3.4, deployed on Vercel from GitHub (`main`).
The full, detailed rules live in the Claude Project doc `claude/working-rules.md`. This file is the short version.

## Who I'm working with
Javier is a designer with little web dev background. Explain in plain language, keep replies short, lead with what changed and what to check. If a draft and his note disagree, follow the draft and say so.

## Hard rules
- Never `git push`. Commit locally only; Javier pushes from GitHub Desktop. End each change with a one line summary of the commit to push.
- English site only. Don't touch `src/app/es/**` or `src/content/projects-es/**` (Spanish is parked, `SPANISH_ENABLED = false`).
- Mobile (below 768px) is signed off. Don't change mobile layout unless asked.
- Site copy: no em dashes or hyphens as punctuation. Plain international English.
- No placeholder imagery on the live site. Use `inProgress: true` in the project file instead.
- Never use any GitHub token pasted in chat.

## After every change
Run `npx tsc --noEmit` and `npx next lint` (separate calls). Check `git status -sb` before starting.

## Where things live
- Projects: `src/content/projects/<slug>.ts`; images in `public/images/<slug>/` (`cover.jpg`, `og.jpg` 1200x630 under ~250KB, `NN-gallery.*`).
- Site constants and metadata: `src/lib/site-config.ts`, `src/lib/metadata.ts`.
- Brand colors are tokens in `tailwind.config.ts` (ink, cobalt, stone, mist). Don't hardcode hex.
- Scroll reveals: reuse `src/components/Reveal.tsx`.

## Automatic guardrails
`.claude/settings.json` runs hooks (Claude Code only): blocks `git push`, blocks edits to the Spanish folders, and runs tsc + lint when Claude finishes a turn.
