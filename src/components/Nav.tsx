"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Wordmark from "./icons/Wordmark";
import CircledWordmark from "./icons/CircledWordmark";

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
  const [visible, setVisible] = useState(true);
  const pathname = usePathname() || "/";
  const t = copy[locale];

  const enHref = locale === "en" ? pathname : pathname.replace(/^\/es/, "") || "/";
  const esHref = locale === "es" ? pathname : `/es${pathname === "/" ? "" : pathname}`;

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const goingDown = currentY > lastY;

      setVisible(currentY < 80 ? true : !goingDown);
      lastY = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      id="top"
      className={`fixed top-0 inset-x-0 z-50 bg-ink transition-transform duration-300 ${
        visible || open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Container className="relative z-50 flex items-center justify-between h-20">
        <Link
          href={t.home}
          className="block text-paper hover:text-cobalt transition-colors"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Tresunotres</span>
          <Wordmark className="hidden md:block h-[15px] w-auto" />
          <CircledWordmark className="md:hidden h-[60px] w-[60px]" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-9 font-sans text-base uppercase tracking-[0.2em]">
            {t.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] underline-offset-4 hover:underline transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
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
        <div className="md:hidden fixed inset-x-0 top-0 z-40 flex h-dvh flex-col justify-between bg-ink px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-6">
            {t.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-normal hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-stone">
            <Link
              href={enHref}
              onClick={() => setOpen(false)}
              className={locale === "en" ? "text-paper" : "hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"}
            >
              EN
            </Link>
            <span>/</span>
            <Link
              href={esHref}
              onClick={() => setOpen(false)}
              className={locale === "es" ? "text-paper" : "hover:text-cobalt hover:[text-shadow:0_0_0.6px_currentColor,0_0_0.6px_currentColor] transition-colors"}
            >
              SP
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
