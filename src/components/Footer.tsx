"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";

type Locale = "en" | "es";

const copy: Record<
  Locale,
  {
    headlineLine1: string;
    headlineLine2: string;
    instagram: string;
    linkedin: string;
    contactHref: string;
    nav: { href: string; label: string }[];
    rights: string;
    location: string;
    email: string;
  }
> = {
  en: {
    headlineLine1: "Let’s talk —",
    headlineLine2: "about your next project.",
    instagram: "[INSTAGRAM]",
    linkedin: "[LINKEDIN]",
    contactHref: "/contact",
    nav: [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    rights: "ALL RIGHTS RESERVED.",
    location: "SAN JOSÉ, COSTA RICA",
    email: "hola@tresunotres.com",
  },
  es: {
    headlineLine1: "Hablemos —",
    headlineLine2: "de tu próximo proyecto.",
    instagram: "[INSTAGRAM]",
    linkedin: "[LINKEDIN]",
    contactHref: "/es/contact",
    nav: [
      { href: "/es/work", label: "Trabajo" },
      { href: "/es/about", label: "Nosotros" },
      { href: "/es/contact", label: "Contacto" },
    ],
    rights: "TODOS LOS DERECHOS RESERVADOS.",
    location: "SAN JOSÉ, COSTA RICA",
    email: "hola@tresunotres.com",
  },
};

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [hot, setHot] = useState(false);

  const muted = hot ? "text-paper/80" : "text-stone";
  const divider = hot ? "border-paper/20" : "border-mist";
  const secondaryHover = hot
    ? "hover:text-paper hover:font-bold underline-offset-4 hover:underline transition-colors"
    : "hover:text-cobalt hover:font-bold underline-offset-4 hover:underline transition-colors";

  return (
    <footer
      className={`border-t mt-24 transition-colors duration-300 ${
        hot ? "bg-cobalt border-cobalt" : "bg-ink " + divider
      }`}
    >
      <Container className="pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <Link
              href={t.contactHref}
              onMouseEnter={() => setHot(true)}
              onMouseLeave={() => setHot(false)}
              className="font-display text-4xl md:text-6xl font-normal leading-[1.08] inline-block text-paper"
            >
              {t.headlineLine1}
              <br />
              {t.headlineLine2}
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex gap-6 font-sans text-sm uppercase tracking-wide">
              {t.nav.map((l) => (
                <Link key={l.href} href={l.href} className={secondaryHover}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div
              className={`font-mono text-[11px] tracking-[0.2em] ${muted} flex flex-col gap-1 md:items-end transition-colors duration-300`}
            >
              <div>{t.instagram}</div>
              <div>{t.linkedin}</div>
            </div>
          </div>
          <div
            className={`font-mono text-[10px] tracking-[0.2em] ${muted} flex flex-col gap-2 md:items-end transition-colors duration-300`}
          >
            <p>
              &copy; {new Date().getFullYear()} TRESUNOTRES. {t.rights}
            </p>
            <a href={`mailto:${t.email}`} className={secondaryHover}>
              {t.email}
            </a>
            <p>{t.location}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
