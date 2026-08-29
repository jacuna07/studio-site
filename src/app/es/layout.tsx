import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav locale="es" />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer locale="es" />
      <BackToTop locale="es" />
    </>
  );
}
