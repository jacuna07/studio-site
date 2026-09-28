"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import CtaBlock from "./CtaBlock";
import Wordmark from "./icons/Wordmark";

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
    headlineLine1: string;
    headlineLine2: string;
    backHeadlineLine1: string;
    backHeadlineLine2: string;
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
    headlineLine1: "Tell us",
    headlineLine2: "about the next big thing.",
    backHeadlineLine1: "Take me",
    backHeadlineLine2: "home.",
    contactLabel: "Get in touch",
    moreLabel: "Fancy more?",
    labels: { work: "Work", about: "Studio", contact: "Contact" },
    homeLabel: "Tresunotres, home",
    location: "San José, Costa Rica",
  },
  es: {
    home: "/es",
    workHref: "/es/work",
    aboutHref: "/es/about",
    contactHref: "/es/contact",
    headlineLine1: "Contanos",
    headlineLine2: "sobre tu próximo proyecto.",
    backHeadlineLine1: "Llévame",
    backHeadlineLine2: "a casa.",
    contactLabel: "Escribinos",
    moreLabel: "¿Querés ver más?",
    labels: { work: "Trabajo", about: "Nosotros", contact: "Contacto" },
    homeLabel: "Tresunotres, inicio",
    location: "San José, Costa Rica",
  },
};

// md: only — on mobile, an element with an unguarded :hover style needs a
// first tap just to enter that state and a second to follow the link.
const linkHover =
  "md:hover:text-cobalt md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] underline-offset-4 md:hover:underline transition-colors";

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
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                aria-current={l.current ? "page" : undefined}
                className={linkHover}
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const pathname = usePathname() || "/";

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

  const isContactPage = currentSection === "contact";
  const ctaHref = isContactPage ? t.home : t.contactHref;
  const ctaLine1 = isContactPage ? t.backHeadlineLine1 : t.headlineLine1;
  const ctaLine2 = isContactPage ? t.backHeadlineLine2 : t.headlineLine2;

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
    // before the footer's top divider 80px. Home is the exception: it ends
    // with its own CTA block ("See all projects"), so the footer stacks
    // straight onto it and the two blocks share a divider.
    <footer className={currentSection === "home" ? "" : "mt-4"}>
      {/* The big CTA. Hovering it turns this block cobalt, down to the
          divider below; the bottom of the footer always stays ink. */}
      <CtaBlock href={ctaHref}>
        {ctaLine1}
        <br />
        {ctaLine2}
      </CtaBlock>

      <div className="border-t border-mist">
        {/* Phones: everything stacked, contact and pages up top, the
            wordmark sign-off 80px below. Desktop: one row sitting at the
            bottom of a 360px band (lots of room above, as on Tinge), inset
            32px from the bottom like the side margins. From lg up, "Fancy
            more?" starts a quarter of the way across the page; below that
            (tablets) the two groups just sit 64px apart. */}
        <Container className="flex flex-col pt-8 pb-6 md:min-h-[360px] md:flex-row md:items-end md:justify-between md:gap-8 md:pt-12 md:pb-8">
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
