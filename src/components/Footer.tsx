import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-mist mt-24">
      <Container className="pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <Link
              href="/contact"
              className="font-display text-5xl md:text-6xl font-normal inline-block hover:text-stone transition-colors"
            >
              Let&rsquo;s talk<span className="text-cobalt">.</span>
            </Link>
            <p className="font-mono text-xs tracking-[0.2em] text-stone mt-6">
              [EMAIL PLACEHOLDER] &middot; COSTA RICA
            </p>
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-stone flex flex-col items-start md:items-end gap-3">
            <div className="flex gap-6">
              <Link href="/work" className="hover:text-paper transition-colors">
                01. WORK
              </Link>
              <Link href="/about" className="hover:text-paper transition-colors">
                02. ABOUT
              </Link>
              <Link href="/contact" className="hover:text-paper transition-colors">
                03. CONTACT
              </Link>
            </div>
            <div>[INSTAGRAM] &middot; [LINKEDIN]</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mt-16 pt-6 border-t border-mist text-[10px] font-mono tracking-[0.2em] text-stone">
          <p>&copy; {new Date().getFullYear()} TRESUNOTRES. ALL RIGHTS RESERVED.</p>
          <p>BRANDING &amp; IDENTITY</p>
        </div>
      </Container>
    </footer>
  );
}
