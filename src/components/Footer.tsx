"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
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
const EMAIL = "hola@tresunotres.com";

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
    rights: string;
    location: string;
    email: string;
  }
> = {
  en: {
    home: "/",
    workHref: "/work",
    aboutHref: "/about",
    contactHref: "/contact",
    headlineLine1: "Tell us",
    headlineLine2: "about the next big thing.",
    backHeadlineLine1: "Take me",
    backHeadlineLine2: "home.",
    labels: { home: "Home", work: "Work", about: "About", contact: "Contact" },
    rights: "ALL RIGHTS RESERVED.",
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
    rights: "TODOS LOS DERECHOS RESERVADOS.",
    location: "SAN JOSÉ, COSTA RICA",
    email: EMAIL,
  },
};

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const pathname = usePathname() || "/";
  const [hot, setHot] = useState(false);

  // Footer nav always links to the site's other three sections, never
  // back to the one you're already on.
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

  const muted = hot ? "text-paper/80" : "text-stone";
  const divider = hot ? "border-paper/20" : "border-mist";
  // md: only — on mobile, an element with an unguarded :hover style
  // needs a first tap just to enter that state and a second to
  // actually follow the link.
  const secondaryHover = hot
    ? "md:hover:text-paper md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] underline-offset-4 md:hover:underline transition-colors"
    : "md:hover:text-cobalt md:hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] underline-offset-4 md:hover:underline transition-colors";
  const iconHover = hot ? "md:hover:text-paper transition-colors" : "md:hover:text-cobalt transition-colors";

  return (
    <footer
      className={`border-t mt-24 transition-colors duration-300 ${
        hot ? "bg-cobalt border-cobalt" : "bg-ink " + divider
      }`}
    >
      {/* Symmetric top/bottom padding on the outer module, and the
          same gap (mt-16 above / pt-16 below) on either side of the
          divider that splits the two modules beneath it — kept equal
          so the divider reads as a centered break rather than sitting
          closer to one module than the other. */}
      <Container className="py-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <Link
              href={ctaHref}
              onMouseEnter={() => setHot(true)}
              onMouseLeave={() => setHot(false)}
              className="font-display text-4xl md:text-6xl font-normal leading-[1.08] inline-block text-paper"
            >
              {ctaLine1}
              <br />
              {ctaLine2}
            </Link>
          </div>
          <div className="flex gap-6 font-sans text-sm uppercase tracking-wide">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={secondaryHover}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={`mt-16 pt-16 border-t ${divider} transition-colors duration-300`}>
          <div className={`flex items-center gap-4 ${muted} transition-colors duration-300`}>
            <a
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={iconHover}
            >
              <IconInstagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={iconHover}
            >
              <IconWhatsapp className="h-[18px] w-[18px]" />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className={iconHover}>
              <IconMail className="h-[18px] w-[18px]" />
            </a>
          </div>

          <div
            className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mt-8 text-[10px] font-mono tracking-[0.2em] ${muted} transition-colors duration-300`}
          >
            <p>
              &copy; {new Date().getFullYear()} TRESUNOTRES. {t.rights}
            </p>
            <a href={`mailto:${t.email}`} className={`uppercase ${secondaryHover}`}>
              {t.email}
            </a>
            <p>{t.location}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
