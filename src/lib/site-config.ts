// Flip this to true once the site is ready for a public, indexed launch.
// While it's false, search engines are told not to index or crawl the
// site (see src/app/robots.ts and the `robots` metadata in
// src/app/layout.tsx) — most project pages still carry placeholder
// copy and imagery, and we don't want that showing up in search
// results or link previews before real launch.
export const SITE_IS_LIVE = false;

// Flip this to true to bring the Spanish version of the site back.
// While it's false, every /es route redirects to its English
// equivalent (see src/middleware.ts) and the EN/SP language switcher
// is hidden (see Nav.tsx) — the Spanish content itself is untouched
// under src/app/es, so re-enabling is just this one flag.
export const SPANISH_ENABLED = false;
