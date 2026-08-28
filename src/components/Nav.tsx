import Link from "next/link";
import Container from "./Container";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-mist">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Studio
        </Link>
        <nav className="flex gap-8 text-sm uppercase tracking-wide">
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
      </Container>
    </header>
  );
}
