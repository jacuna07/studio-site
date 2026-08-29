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
            className="h-4 w-auto"
            priority
          />
        </Link>
        <nav className="flex gap-9 font-mono text-xs uppercase tracking-widest">
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
