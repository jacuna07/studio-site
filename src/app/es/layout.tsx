import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav locale="es" />
      <main className="min-h-screen">{children}</main>
      <Footer locale="es" />
    </>
  );
}
