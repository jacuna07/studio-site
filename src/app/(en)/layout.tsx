import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav locale="en" />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer locale="en" />
      <BackToTop locale="en" />
    </>
  );
}
