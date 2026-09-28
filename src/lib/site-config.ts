// The live address. Every share preview, canonical link and sitemap entry
// is built from this (tresunotres.co without "www" redirects here).
export const SITE_URL = "https://www.tresunotres.co";

// Search engines may list the site (switched on 2026-09-28, at launch).
// Set back to false to hide the whole site from search again: see
// src/app/robots.ts and the `robots` metadata in src/app/layout.tsx.
// In-progress case studies stay hidden from search either way (they
// set their own noindex and are left out of the sitemap).
export const SITE_IS_LIVE = true;

// Flip this to true to bring the Spanish version of the site back.
// While it's false, every /es route redirects to its English
// equivalent (see src/middleware.ts) and the EN/SP language switcher
// is hidden (see Nav.tsx) — the Spanish content itself is untouched
// under src/app/es, so re-enabling is just this one flag.
export const SPANISH_ENABLED = false;
