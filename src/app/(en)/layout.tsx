import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { getAllProjects } from "@/content/projects";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  // Just what the footer needs to tailor itself on project pages.
  const projectPages = getAllProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    inProgress: !!p.inProgress,
  }));

  return (
    <>
      <Nav locale="en" />
      {/* No min-h-screen here: forcing every route to fill the full
          viewport height, even ones shorter than that (a case study
          page, a short project grid), was what left a stretch of empty
          black space between the last element and the Footer below.
          The home page sets its own min-height on the hero section, so
          it's unaffected. */}
      <main className="pt-20">{children}</main>
      <Footer locale="en" projectPages={projectPages} />
      <BackToTop locale="en" />
    </>
  );
}
