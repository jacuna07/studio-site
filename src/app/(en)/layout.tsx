import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav locale="en" />
      <main className="min-h-screen">{children}</main>
      <Footer locale="en" />
    </>
  );
}
