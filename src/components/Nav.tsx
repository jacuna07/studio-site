"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Wordmark from "./icons/Wordmark";
import CircledWordmark from "./icons/CircledWordmark";
import { SPANISH_ENABLED } from "@/lib/site-config";
import { HERO_WORDMARK_EVENT, type HeroWordmarkDetail } from "./HomeHero";

type Locale = "en" | "es";

const copy: Record<Locale, { home: string; homeLabel: string; links: { href: string; label: string }[] }> = {
  en: {
    home: "/",
    homeLabel: "Home",
    links: [
      { href: "/work", label: "Work" },
      { href: "/studio", label: "Studio" },
      { href: "/contact", label: "Contact" },
    ],
  },
  es: {
    home: "/es",
    homeLabel: "Inicio",
    links: [
      { href: "/es/work", label: "Trabajo" },
      { href: "/es/about", label: "Nosotros" },
      { href: "/es/contact", label: "Contacto" },
    ],
  },
};

export default function Nav({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  // Desktop: whether the page has scrolled at all (see the header).
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const t = copy[locale];

  const enHref = locale === "en" ? pathname : pathname.replace(/^\/es/, "") || "/";
  const esHref = locale === "es" ? pathname : `/es${pathname === "/" ? "" : pathname}`;

  // Everywhere except the homepage itself (Work, About, Contact, and
  // case study pages), the drawer also offers a way back Home.
  const isHome = pathname === t.home;
  const drawerLinks = isHome ? t.links : [{ href: t.home, label: t.homeLabel }, ...t.links];

  // English Home: the nav's logo (the horizontal wordmark on desktop, the
  // small circled one on phones) stays hidden while the hero's circled
  // wordmark is on screen (from the first load), and appears once the
  // page has scrolled over it. The hero reports it (HomeHero).
  const isEnHome = pathname === "/";
  const [heroWordmarkOnScreen, setHeroWordmarkOnScreen] = useState(true);
  useEffect(() => {
    if (isEnHome) setHeroWordmarkOnScreen(true);
  }, [isEnHome]);
  useEffect(() => {
    function onHero(e: Event) {
      setHeroWordmarkOnScreen((e as CustomEvent<HeroWordmarkDetail>).detail.onScreen);
    }
    window.addEventListener(HERO_WORDMARK_EVENT, onHero);
    return () => window.removeEventListener(HERO_WORDMARK_EVENT, onHero);
  }, []);
  const hideWordmark = isEnHome && heroWordmarkOnScreen;

  // Desktop, English Home, while the hero's wordmark is on screen (set
  // 2026-10-05): just the three links as text, centered, no bar or pill.
  // The links' width is measured (and re-measured if it changes, e.g.
  // when the fonts load) so the box can shrink to them and grow back out.
  const linksRef = useRef<HTMLDivElement>(null);
  const [linksWidth, setLinksWidth] = useState(0);
  useEffect(() => {
    const el = linksRef.current;
    if (!el) return;
    const measure = () => setLinksWidth(el.offsetWidth);
    measure();
    const watch = new ResizeObserver(measure);
    watch.observe(el);
    return () => watch.disconnect();
  }, []);
  // Desktop, like wolffolins.com (set 2026-10-05): at the very top of a
  // page a full-width bar (the solid one from before the pill), the logo
  // and links on the page margins; as soon as the page scrolls it shrinks
  // into a centered floating pill. On the English Home hero, the links
  // only (see above).
  const navMode = hideWordmark ? "hero" : scrolled ? "pill" : "bar";
  const linksStyle = { "--links-w": `${linksWidth}px` } as CSSProperties;

  // Phones, English Home and Studio (set 2026-10-05): the whole bar stays
  // hidden while the hero is on screen, and slides in once the page's
  // panel (the element right after the hero) has come up to the bar.
  // Home: the hero's spacer; Studio: its CoverHero.
  const heroPage = pathname === "/" || pathname === "/studio";
  const [overHero, setOverHero] = useState(heroPage);
  useEffect(() => {
    if (!heroPage) {
      setOverHero(false);
      return;
    }
    let frame = 0;
    function check() {
      frame = 0;
      const hero =
        pathname === "/"
          ? document.querySelector("[data-hero]")?.parentElement
          : document.querySelector("[data-cover-hero]");
      const panel = hero?.nextElementSibling;
      setOverHero(panel ? panel.getBoundingClientRect().top > 80 : false);
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(check);
    }
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [heroPage, pathname]);

  // A link is "active" on an exact match (Home, About, Contact) or
  // anywhere under it (Work's own case study pages, e.g. /work/oxygen
  // still highlights Work). Used to mark the current page in the
  // drawer now that :hover can't do it on mobile. Home is exact-match
  // only — without that special case, the Spanish home ("/es") would
  // match the "/es/" prefix of every other Spanish page too.
  function isActive(href: string) {
    if (href === t.home) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const goingDown = currentY > lastY;

      setVisible(currentY < 80 ? true : !goingDown);
      setScrolled(currentY > 4);
      lastY = currentY;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Exposed so other swipe gestures on the page (e.g. the case study
    // back-to-work swipe) can tell whether the nav's own swipe-to-close
    // should take priority.
    document.body.dataset.navOpen = open ? "true" : "false";
    return () => {
      document.body.style.overflow = "";
      document.body.dataset.navOpen = "false";
    };
  }, [open]);

  // The drawer is a plain fixed overlay, not a native modal, so pinch or
  // double-tap zoom still reaches it and leaves it misaligned/clipped
  // against the zoomed viewport. Locking the page's zoom for as long as
  // the drawer is open, via the viewport meta tag, matches how a native
  // modal would behave; the original content is restored the moment the
  // drawer closes so zoom works normally everywhere else.
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;
    const original = meta.getAttribute("content");
    if (open) {
      const base = original ?? "width=device-width, initial-scale=1";
      meta.setAttribute("content", `${base}, maximum-scale=1, user-scalable=no`);
    }
    return () => {
      if (original !== null) meta.setAttribute("content", original);
    };
  }, [open]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!tracking) return;
      tracking = false;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

      // Right-to-left swipe opens the menu; left-to-right closes it
      // back, each past a threshold that rules out an ordinary
      // vertical scroll.
      if (!open && deltaX < -60 && isHorizontal) {
        setOpen(true);
      } else if (open && deltaX > 60 && isHorizontal) {
        setOpen(false);
      }
    }

    function onTouchCancel() {
      tracking = false;
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [open]);

  return (
    <>
      {/* No `will-change-transform` here anymore: it was added early on
          as a defensive guess for a burger-icon nudge bug that was
          later actually fixed elsewhere (locking horizontal
          overflow/overscroll, preventDefault on the swipe gesture), so
          it had gone vestigial. It also permanently promotes this
          header (already its own compositor layer from backdrop-blur)
          onto a persistent GPU layer — one candidate, among others
          still being investigated, for why whole sections of a page
          have been failing to paint on one real device while this
          fixed header and the Footer (styled without transform/blur)
          keep rendering fine. Removing it costs nothing either way. */}
      {/* Phones: a full-width bar that slides up out of view when
          scrolling down (and stays hidden over the Home and Studio heroes).
          Desktop (set 2026-10-05, after wolffolins.com/work): always in
          view. At the very top of a page it's the full-width solid bar
          (ink at 75%, blurred, 80px tall, logo and links on the page
          margins). Once the page scrolls, the bar shrinks into a floating
          pill: centered, 16px from the top, 72px tall, 70% of the page
          grid (640 to 960px wide), ink at 40% with a mist outline, logo
          and links 32px inside it. Width, height, corners and color all
          move together (650ms, a quick ease out). The bar/pill shape is
          its own layer behind the logo and links, so it can reach the
          screen edges. On the English Home hero: the links alone,
          centered, no shape. */}
      <header
        id="top"
        className={`fixed top-0 inset-x-0 z-50 bg-ink/75 backdrop-blur-md transition-transform duration-300 md:translate-y-0 md:bg-transparent md:backdrop-blur-none ${
          visible || open ? "" : "max-md:-translate-y-full"
        } ${overHero && !open ? "max-md:-translate-y-full" : ""}`}
      >
      <Container className="relative z-50 md:flex md:justify-center">
      <div
        style={linksStyle}
        className={`relative flex h-20 items-center justify-between md:shrink-0 md:justify-end md:transition-[width,height,margin] md:duration-[650ms] md:ease-[cubic-bezier(0.23,1,0.32,1)] ${
          navMode === "bar"
            ? "md:mt-0 md:h-20 md:w-full"
            : navMode === "pill"
              ? "md:mt-4 md:h-[72px] md:w-[clamp(576px,calc(70%_-_64px),896px)]"
              : `md:mt-4 md:h-[72px] ${linksWidth ? "md:w-[var(--links-w)]" : "md:w-fit"}`
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 -z-10 hidden border backdrop-blur-md transition-[left,right,border-radius,background-color,border-color,opacity] duration-[650ms] ease-[cubic-bezier(0.23,1,0.32,1)] md:block ${
            navMode === "bar"
              ? "left-[calc(50%_-_50vw)] right-[calc(50%_-_50vw)] rounded-none border-transparent bg-ink/75"
              : `-left-8 -right-8 rounded-[36px] border-mist bg-ink/40 ${navMode === "hero" ? "opacity-0" : ""}`
          }`}
        />
        <Link
          href={t.home}
          className={`block text-paper md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:hover:text-cobalt transition-colors ${
            hideWordmark ? "pointer-events-none" : ""
          }`}
          tabIndex={hideWordmark ? -1 : undefined}
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Tresunotres</span>
          <Wordmark
            className={`hidden md:block h-[13px] w-auto transition-opacity duration-500 ${
              hideWordmark ? "md:opacity-0" : "md:opacity-100 md:delay-300"
            }`}
          />
          <CircledWordmark
            className={`md:hidden h-[60px] w-[60px] animate-slow-spin transition-opacity duration-500 ${
              hideWordmark ? "opacity-0" : "opacity-100"
            }`}
          />
        </Link>

        <div ref={linksRef} className="hidden md:flex items-center gap-10">
          {/* Desktop nav type (set 2026-10-05): 14px, semibold, uppercase,
              tracked; the logo 13px tall. */}
          <nav className="flex gap-8 font-sans text-sm font-semibold uppercase tracking-[0.2em]">
            {t.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative inline-block hover:text-cobalt transition-colors"
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
                />
              </Link>
            ))}
          </nav>
          {SPANISH_ENABLED && (
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-stone">
              <Link
                href={enHref}
                className={locale === "en" ? "text-paper" : "hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"}
              >
                EN
              </Link>
              <span>/</span>
              <Link
                href={esHref}
                className={locale === "es" ? "text-paper" : "hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"}
              >
                SP
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="md:hidden relative flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-px w-6 bg-paper transition-transform duration-300 ease-out ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-paper transition-transform duration-300 ease-out ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>
      </Container>
      </header>

      {/* Deliberately a sibling of <header>, not a child: the header
          itself slides up out of view on scroll (its own translate-y
          transition), and nesting the drawer inside it meant opening
          the menu while that was mid-transition made the drawer's
          position compound with the header's, visibly "correcting"
          itself as the header settled. Anchoring the drawer directly
          to the viewport instead, with its own z-index between the
          header (z-50, so its close button stays on top and usable)
          and ordinary page content (z-40), keeps it independent of
          whatever the header is doing. */}
      <div
        aria-hidden={!open}
        // Opening stays snappy (300ms, ease-out); closing eases out
        // more gently over 500ms (the full 700ms the brief floated felt
        // sluggish for a menu people reopen often, so this splits the
        // difference — easy to push back up to 700ms if it still feels
        // too quick).
        className={`md:hidden fixed inset-x-0 top-0 z-[45] flex h-dvh flex-col bg-ink/75 backdrop-blur-md px-6 pt-24 pb-10 transition-[opacity,transform] ${
          open ? "duration-300 ease-out" : "duration-500 ease-in-out"
        } ${
          open ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {SPANISH_ENABLED && (
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-stone">
            <Link
              href={enHref}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={locale === "en" ? "text-paper" : "md:hover:text-cobalt md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"}
            >
              EN
            </Link>
            <span>/</span>
            <Link
              href={esHref}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={locale === "es" ? "text-paper" : "md:hover:text-cobalt md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"}
            >
              SP
            </Link>
          </div>
        )}
        {/* mt-auto so the links sit at the bottom of the drawer, within
            easy thumb reach on a phone, whether or not the language
            switcher above is showing. Hover only on desktop (md:) — on
            mobile, an element with an unguarded :hover style needs a
            first tap just to enter that state and a second to actually
            follow the link, which is exactly the "have to tap twice"
            feel this was causing on the drawer's own links. The
            current page is marked in cobalt (the same treatment hover
            gets on desktop) instead — that highlight doesn't depend on
            :hover, so it isn't affected by the same mobile quirk. */}
        <nav className="flex flex-col gap-6 mt-auto">
          {drawerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl font-normal transition-colors ${
                isActive(l.href)
                  ? "text-cobalt [text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor]"
                  : "md:hover:text-cobalt md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
