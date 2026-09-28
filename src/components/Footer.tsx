"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import CtaBlock from "./CtaBlock";
import IconInstagram from "./icons/IconInstagram";
import IconWhatsapp from "./icons/IconWhatsapp";
import IconMail from "./icons/IconMail";

type Locale = "en" | "es";
type NavSection = "home" | "work" | "about" | "contact";

// TODO: swap in the real Instagram profile URL — no real handle exists
// anywhere in the codebase yet, so this is a placeholder.
const INSTAGRAM_HREF = "#";
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
    labels: Record<NavSection, string>;
    location: string;
    email: string;
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
    labels: { home: "Home", work: "Work", about: "Studio", contact: "Contact" },
    location: "SAN JOSÉ, COSTA RICA",
    email: EMAIL,
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
    labels: { home: "Inicio", work: "Trabajo", about: "Nosotros", contact: "Contacto" },
    location: "SAN JOSÉ, COSTA RICA",
    email: EMAIL,
  },
};

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const pathname = usePathname() || "/";

  const sections: { id: NavSection; href: string; label: string }[] = [
    { id: "home", href: t.home, label: t.labels.home },
    { id: "work", href: t.workHref, label: t.labels.work },
    { id: "about", href: t.aboutHref, label: t.labels.about },
    { id: "contact", href: t.contactHref, label: t.labels.contact },
  ];

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

  const navLinks = sections.filter((s) => s.id !== currentSection);

  const isContactPage = currentSection === "contact";
  const ctaHref = isContactPage ? t.home : t.contactHref;
  const ctaLine1 = isContactPage ? t.backHeadlineLine1 : t.headlineLine1;
  const ctaLine2 = isContactPage ? t.backHeadlineLine2 : t.headlineLine2;

  // md: only — on mobile, an element with an unguarded :hover style
  // needs a first tap just to enter that state and a second to
  // actually follow the link.
  const linkHover =
    "md:hover:text-cobalt md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] underline-offset-4 md:hover:underline transition-colors";
  const iconHover = "md:hover:text-cobalt transition-colors";

  return (
    // Spacing: every page closes its content with 64px of bottom padding
    // (the shared "py-16" sections), so mt-4 (16px) makes the space
    // before the footer's top divider 80px, matching the CTA block's own
    // 80px inside. Home is the exception: it ends with its own CTA block
    // ("See all projects"), so the footer stacks straight onto it and the
    // two blocks share a divider.
    <footer className={currentSection === "home" ? "" : "mt-4"}>
      {/* The big CTA. Hovering it turns this block cobalt, down to the
          divider below; the bottom of the footer always stays ink. */}
      <CtaBlock href={ctaHref}>
        {ctaLine1}
        <br />
        {ctaLine2}
      </CtaBlock>

      <div className="border-t border-mist">
        <Container className="pt-16 pb-20">
          {/* Wraps (links drop below the icons) only if a narrow phone
              can't fit both on one line. */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-6">
            <div className="flex items-center gap-4 md:gap-5 text-stone">
              <a
                href={INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={iconHover}
              >
                <IconInstagram className="h-[18px] w-[18px] md:h-6 md:w-6" />
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={iconHover}
              >
                <IconWhatsapp className="h-[18px] w-[18px] md:h-6 md:w-6" />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" className={iconHover}>
                <IconMail className="h-[18px] w-[18px] md:h-6 md:w-6" />
              </a>
            </div>

            {/* Always links to the site's other sections, never back to
                the one you're already on. */}
            <nav
              aria-label="Footer"
              className="flex gap-6 md:gap-8 font-sans text-sm md:text-lg uppercase tracking-wide"
            >
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className={linkHover}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mt-4 md:mt-6 text-[10px] md:text-sm font-mono tracking-[0.2em] text-stone">
            <p>
              &copy; {new Date().getFullYear()} TRESUNOTRES
            </p>
            <a href={`mailto:${t.email}`} className={`uppercase ${linkHover}`}>
              {t.email}
            </a>
            <p>{t.location}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
