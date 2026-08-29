import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const links = [
  { href: "/work", index: "01", label: "Work" },
  { href: "/about", index: "02", label: "About" },
  { href: "/contact", index: "03", label: "Contact" },
];

export default function Nav() {
  return (
    <header>
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="block">
          <Image
            src="/images/wordmark.svg"
            alt="Tresunotres"
            width={140}
            height={8}
            className="hidden sm:block h-4 w-auto"
            priority
          />
          <Image
            src="/images/circled-wordmark.svg"
            alt="Tresunotres"
            width={386}
            height={386}
            className="sm:hidden h-8 w-8"
            priority
          />
        </Link>
        <nav className="flex gap-9 font-mono text-xs uppercase tracking-[0.2em]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-stone transition-colors"
            >
              {l.index}. {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
