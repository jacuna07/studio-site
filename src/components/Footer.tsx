import Link from "next/link";
import Container from "./Container";

type Locale = "en" | "es";

const copy: Record<
  Locale,
  {
    talk: string;
    email: string;
    location: string;
    cta: string;
    contactHref: string;
    nav: { href: string; label: string }[];
    social: string;
    rights: string;
    tagline: string;
  }
> = {
  en: {
    talk: "Let’s talk",
    email: "[EMAIL PLACEHOLDER]",
    location: "COSTA RICA",
    cta: "Start a project",
    contactHref: "/contact",
    nav: [
      { href: "/work", label: "WORK" },
      { href: "/about", label: "ABOUT" },
      { href: "/contact", label: "CONTACT" },
    ],
    social: "[INSTAGRAM] · [LINKEDIN]",
    rights: "ALL RIGHTS RESERVED.",
    tagline: "BRANDING & IDENTITY",
  },
  es: {
    talk: "Hablemos",
    email: "[MARCADOR DE CORREO]",
    location: "COSTA RICA",
    cta: "Empecemos un proyecto",
    contactHref: "/es/contact",
    nav: [
      { href: "/es/work", label: "TRABAJO" },
      { href: "/es/about", label: "NOSOTROS" },
      { href: "/es/contact", label: "CONTACTO" },
    ],
    social: "[INSTAGRAM] · [LINKEDIN]",
    rights: "TODOS LOS DERECHOS RESERVADOS.",
    tagline: "IDENTIDAD DE MARCA",
  },
};

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <footer className="border-t border-mist mt-24">
      <Container className="pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <Link
              href={t.contactHref}
              className="font-display text-5xl md:text-6xl font-normal inline-block hover:text-cobalt transition-colors"
            >
              {t.talk}
              <span className="text-cobalt">.</span>
            </Link>
            <p className="font-mono text-xs tracking-[0.2em] text-stone mt-6">
              {t.email} &middot; {t.location}
            </p>
            <Link
              href={t.contactHref}
              className="inline-block mt-8 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:border-cobalt hover:bg-cobalt hover:text-paper transition-colors"
            >
              {t.cta}
            </Link>
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-stone flex flex-col items-start md:items-end gap-3">
            <div className="flex gap-6">
              {t.nav.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-cobalt hover:font-bold transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div>{t.social}</div>
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
