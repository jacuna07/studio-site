"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import CtaBlock from "./CtaBlock";
import Wordmark from "./icons/Wordmark";
import RollText from "./RollText";

type Locale = "en" | "es";
type NavSection = "home" | "work" | "about" | "contact";

const INSTAGRAM_HREF = "https://www.instagram.com/tresunotrescr/";
// Reuses the first number already published on the Contact page.
const WHATSAPP_HREF = "https://wa.me/50687060833";
const EMAIL = "hola@tresunotres.co";

const copy: Record<
  Locale,
  {
    home: string;
    workHref: string;
    aboutHref: string;
    contactHref: string;
    /** The big CTA's lines (to Contact), plus an optional emoji after the last. */
    ctaLines: string[];
    ctaEmoji?: string;
    /** On the Contact page itself, the CTA points back home instead. */
    backLines: string[];
    /** On an in-progress project page: ask about that project (to Contact). */
    askLines: (title: string) => string[];
    contactLabel: string;
    moreLabel: string;
    labels: Record<Exclude<NavSection, "home">, string>;
    homeLabel: string;
    location: string;
  }
> = {
  en: {
    home: "/",
    workHref: "/work",
    aboutHref: "/studio",
    contactHref: "/contact",
    ctaLines: ["Say hi"],
    ctaEmoji: "👋",
    backLines: ["Take me", "home."],
    askLines: (title) => [`Curious about ${title}?`, "Ask us about it."],
    contactLabel: "Get in touch",
    moreLabel: "Where to next?",
    labels: { work: "Work", about: "Studio", contact: "Contact" },
    homeLabel: "Tresunotres, home",
    location: "San José, Costa Rica",
  },
  es: {
    home: "/es",
    workHref: "/es/work",
    aboutHref: "/es/about",
    contactHref: "/es/contact",
    ctaLines: ["Contanos", "sobre tu próximo proyecto."],
    backLines: ["Llévame", "a casa."],
    askLines: (title) => [`¿Te da curiosidad ${title}?`, "Preguntanos."],
    contactLabel: "Escribinos",
    moreLabel: "¿Querés ver más?",
    labels: { work: "Trabajo", about: "Nosotros", contact: "Contacto" },
    homeLabel: "Tresunotres, inicio",
    location: "San José, Costa Rica",
  },
};

// Hover (set 2026-10-05): the nav's roll, the label rolling up to a
// cobalt copy (RollText). Desktop only, as before.
const linkHover = "group inline-block align-top";

// One size for everything in the footer's bottom half (18px desktop, 16px
// phones), with hierarchy by color alone: gray labels, white links.
const text = "text-base md:text-lg leading-snug";

// `external`: a plain <a> (mailto, other sites); `newTab`: opens in a new tab.
type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
  newTab?: boolean;
  current?: boolean;
};

/** A gray label (display font) over a short stack of white links. */
function LinkGroup({
  label,
  links,
  className = "",
}: {
  label: string;
  links: FooterLink[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={`font-display text-stone ${text}`}>{label}</p>
      <ul className={`mt-2 font-sans ${text}`}>
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a
                href={l.href}
                {...(l.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={linkHover}
              >
                <RollText>{l.label}</RollText>
              </a>
            ) : (
              <Link
                href={l.href}
                aria-current={l.current ? "page" : undefined}
                className={linkHover}
              >
                <RollText>{l.label}</RollText>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export type FooterProjectPage = { slug: string; title: string; inProgress: boolean };

export default function Footer({
  locale = "en",
  projectPages = [],
}: {
  locale?: Locale;
  /** Every project page (from the layout), so the footer can tell when
   *  it's on a case study or an in-progress page. */
  projectPages?: FooterProjectPage[];
}) {
  const t = copy[locale];
  const pathname = usePathname() || "/";
  const project = projectPages.find((p) => pathname === `${t.workHref}/${p.slug}`);

  const currentSection: NavSection | null =
    pathname === t.home
      ? "home"
      : pathname === t.workHref || pathname.startsWith(`${t.workHref}/`)
        ? "work"
        : pathname === t.aboutHref
          ? "about"
          : pathname === t.contactHref
            ? "contact"
            : null;

  // The big CTA: "Say hi 👋" (to Contact) almost everywhere; "Take me
  // home." on Contact itself; and on an in-progress project page, an
  // invitation to ask about that project.
  const isContactPage = currentSection === "contact";
  const ctaHref = isContactPage ? t.home : t.contactHref;
  const ctaLines = isContactPage
    ? t.backLines
    : project?.inProgress
      ? t.askLines(project.title)
      : t.ctaLines;
  const ctaEmoji = isContactPage || project?.inProgress ? undefined : t.ctaEmoji;

  // Pages that close with their own "See all projects" block (Home, case
  // studies, in-progress pages): the footer stacks straight onto it.
  const flush = currentSection === "home" || !!project;

  const contactLinks: FooterLink[] = [
    { href: `mailto:${EMAIL}`, label: EMAIL, external: true },
    { href: WHATSAPP_HREF, label: "WhatsApp", external: true, newTab: true },
    { href: INSTAGRAM_HREF, label: "Instagram", external: true, newTab: true },
  ];
  // Always the same three; the wordmark below is the way home.
  const pageLinks: FooterLink[] = [
    { href: t.workHref, label: t.labels.work, current: currentSection === "work" },
    { href: t.aboutHref, label: t.labels.about, current: currentSection === "about" },
    { href: t.contactHref, label: t.labels.contact, current: currentSection === "contact" },
  ];

  return (
    // Spacing: every page closes its content with 64px of bottom padding
    // (the shared "py-16" sections), so mt-4 (16px) makes the space
    // before the footer's top divider 80px. Pages that end with their own
    // "See all projects" block (see `flush`) have no gap: the two blocks
    // stack and share a divider.
    <footer className={flush ? "" : "mt-4"}>
      {/* The big CTA. Hovering it turns this block cobalt, down to the
          divider below; the bottom of the footer always stays ink. */}
      <CtaBlock href={ctaHref}>
        {ctaLines.map((line, i) => (
          <span key={line} className="block">
            {line}
            {/* The emoji is decoration: hidden from screen readers so the
                link just reads "Say hi". The non-breaking space keeps it
                from wrapping onto a line of its own. */}
            {ctaEmoji && i === ctaLines.length - 1 && (
              <span aria-hidden="true">{"\u00a0"}{ctaEmoji}</span>
            )}
          </span>
        ))}
      </CtaBlock>

      {/* Home, phones only (set 2026-10-06, moved here from the end of
          the page): "Made with love in Costa Rica" looping across the
          screen, edge to edge, right to left (.animate-marquee in
          globals.css), small and in dark gray (Ink 600), in a band
          between "Say hi" and the links. Two identical halves, so the
          loop is seamless. Reduced motion: the line once, still. */}
      {currentSection === "home" && locale === "en" && (
        <div className="border-t border-mist py-6 md:hidden">
          <Container>
            <p className="sr-only font-display font-normal text-lg leading-[1.25] tracking-normal text-ink-600 motion-reduce:not-sr-only">
              Made with love in Costa Rica
            </p>
            <div aria-hidden="true" className="-mx-6 overflow-hidden motion-reduce:hidden">
              <div className="flex w-max animate-marquee font-display font-normal text-lg leading-[1.25] tracking-normal text-ink-600">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="shrink-0 whitespace-nowrap">
                    Made with love in Costa Rica<span className="px-[0.5em]">•</span>
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}

      <div className="border-t border-mist">
        {/* Phones: everything stacked, contact and pages up top, the
            wordmark sign-off 80px below. Desktop: one row sitting at the
            bottom of a 360px band (lots of room above, as on Tinge), inset
            from the bottom like the side margins (48px tablets, 64px from
            lg). From lg up, "Where to
            next?" starts a quarter of the way across the page; below that
            (tablets) the two groups just sit 64px apart. */}
        <Container className="flex flex-col pt-8 pb-6 md:min-h-[360px] md:flex-row md:items-end md:justify-between md:gap-8 md:pt-12 md:pb-12 lg:pb-16">
          <div className="flex flex-col gap-8 md:flex-row md:gap-16 lg:w-1/2 lg:gap-0">
            <LinkGroup label={t.contactLabel} links={contactLinks} className="lg:w-1/2" />
            <LinkGroup label={t.moreLabel} links={pageLinks} className="lg:w-1/2" />
          </div>

          <div className="mt-20 md:mt-0 md:flex md:flex-col md:items-end md:text-right">
            <Link
              href={t.home}
              aria-label={t.homeLabel}
              className="inline-block md:hover:text-cobalt transition-colors"
            >
              <Wordmark className="block h-3 w-auto md:h-[15px]" />
            </Link>
            <p className={`mt-3 md:mt-4 font-sans text-stone ${text}`}>
              &copy; {new Date().getFullYear()}
              <br />
              {t.location}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
