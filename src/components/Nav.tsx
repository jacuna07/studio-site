"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50">
      <Container className="relative z-50 flex items-center justify-between py-6">
        <Link href="/" className="block" onClick={() => setOpen(false)}>
          <Image
            src="/images/wordmark.svg"
            alt="Tresunotres"
            width={140}
            height={8}
            className="hidden md:block h-4 w-auto"
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

        <div className="hidden md:flex items-center gap-9 font-mono text-xs uppercase tracking-[0.2em]">
          <nav className="flex gap-9">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-stone transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-stone">
            <span className="text-paper">EN</span>
            <span>/</span>
            <span className="cursor-default">SP</span>
          </div>
        </div>

        <button
          type="button"
          className="md:hidden relative flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </Container>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-normal hover:text-stone transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-stone">
            <span className="text-paper">EN</span>
            <span>/</span>
            <span className="cursor-default">SP</span>
          </div>
        </div>
      )}
    </header>
  );
}
