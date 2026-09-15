import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav locale="es" />
      {/* No min-h-screen here: forcing every route to fill the full
          viewport height, even ones shorter than that (a case study
          page, a short project grid), was what left a stretch of empty
          black space between the last element and the Footer below.
          The home page sets its own min-height on the hero section, so
          it's unaffected. */}
      <main className="pt-20">{children}</main>
      <Footer locale="es" />
      <BackToTop locale="es" />
    </>
  );
}
