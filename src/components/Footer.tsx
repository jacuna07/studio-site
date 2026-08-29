import Link from "next/link";
import Container from "./Container";

type Locale = "en" | "es";

const copy: Record<
  Locale,
  {
    headlineLine1: string;
    headlineLine2: string;
    email: string;
    location: string;
    instagram: string;
    linkedin: string;
    contactHref: string;
    nav: { href: string; label: string }[];
    rights: string;
    tagline: string;
  }
> = {
  en: {
    headlineLine1: "Let’s talk —",
    headlineLine2: "about your next project.",
    email: "[EMAIL PLACEHOLDER]",
    location: "COSTA RICA",
    instagram: "[INSTAGRAM]",
    linkedin: "[LINKEDIN]",
    contactHref: "/contact",
    nav: [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    rights: "ALL RIGHTS RESERVED.",
    tagline: "BRANDING & IDENTITY",
  },
  es: {
    headlineLine1: "Hablemos —",
    headlineLine2: "de tu próximo proyecto.",
    email: "[MARCADOR DE CORREO]",
    location: "COSTA RICA",
    instagram: "[INSTAGRAM]",
    linkedin: "[LINKEDIN]",
    contactHref: "/es/contact",
    nav: [
      { href: "/es/work", label: "Trabajo" },
      { href: "/es/about", label: "Nosotros" },
      { href: "/es/contact", label: "Contacto" },
    ],
    rights: "TODOS LOS DERECHOS RESERVADOS.",
    tagline: "IDENTIDAD DE MARCA",
  },
};

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <footer className="border-t border-mist mt-24">
      <Container className="pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <Link
              href={t.contactHref}
              className="font-display text-4xl md:text-6xl font-normal leading-[1.08] inline-block hover:text-cobalt transition-colors"
            >
              {t.headlineLine1}
              <br />
              {t.headlineLine2}
            </Link>
            <div className="font-mono text-xs tracking-[0.2em] text-stone mt-8 space-y-1.5">
              <div>{t.email}</div>
              <div>{t.location}</div>
              <div>{t.instagram}</div>
              <div>{t.linkedin}</div>
            </div>
          </div>
          <div className="flex gap-6 font-sans text-sm">
            {t.nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-cobalt hover:font-bold underline-offset-4 hover:underline transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mt-16 pt-6 border-t border-mist text-[10px] font-mono tracking-[0.2em] text-stone">
          <p>
            &copy; {new Date().getFullYear()} TRESUNOTRES. {t.rights}
          </p>
          <p>{t.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
