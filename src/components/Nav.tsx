"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

type Locale = "en" | "es";

const copy: Record<Locale, { home: string; links: { href: string; label: string }[] }> = {
  en: {
    home: "/",
    links: [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  es: {
    home: "/es",
    links: [
      { href: "/es/work", label: "Trabajo" },
      { href: "/es/about", label: "Nosotros" },
      { href: "/es/contact", label: "Contacto" },
    ],
  },
};

export default function Nav({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const t = copy[locale];

  const enHref = locale === "en" ? pathname : pathname.replace(/^\/es/, "") || "/";
  const esHref = locale === "es" ? pathname : `/es${pathname === "/" ? "" : pathname}`;

  return (
    <header className="relative z-50">
      <Container className="relative z-50 flex items-center justify-between py-6">
        <Link href={t.home} className="block" onClick={() => setOpen(false)}>
          <Image
            src="/images/wordmark.svg"
            alt="Tresunotres"
            width={140}
            height={8}
            className="hidden md:block h-5 w-auto"
            priority
          />
          <Image
            src="/images/circled-wordmark.svg"
            alt="Tresunotres"
            width={386}
            height={386}
            className="md:hidden h-8 w-8"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-8 font-sans text-base">
            {t.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-cobalt hover:font-bold underline-offset-4 hover:underline transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-stone">
            <Link
              href={enHref}
              className={locale === "en" ? "text-paper" : "hover:text-cobalt hover:font-bold transition-colors"}
            >
              EN
            </Link>
            <span>/</span>
            <Link
              href={esHref}
              className={locale === "es" ? "text-paper" : "hover:text-cobalt hover:font-bold transition-colors"}
            >
              SP
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="md:hidden relative flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-px w-6 bg-paper transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-paper transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </Container>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-6">
            {t.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-normal hover:text-cobalt hover:font-bold transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-stone">
            <Link
              href={enHref}
              onClick={() => setOpen(false)}
              className={locale === "en" ? "text-paper" : "hover:text-cobalt hover:font-bold transition-colors"}
            >
              EN
            </Link>
            <span>/</span>
            <Link
              href={esHref}
              onClick={() => setOpen(false)}
              className={locale === "es" ? "text-paper" : "hover:text-cobalt hover:font-bold transition-colors"}
            >
              SP
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
