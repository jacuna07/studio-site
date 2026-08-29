import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = { title: "About — Studio" };

export default function AboutPage() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-8">
          About
        </h1>
        <div className="space-y-4 text-stone text-lg">
          <p>
            PLACEHOLDER — Replace with a paragraph introducing the studio: how
            it started, what it believes about branding, and the kind of
            clients it works best with.
          </p>
          <p>
            PLACEHOLDER — Replace with a short list of services offered
            (identity, packaging, brand guidelines, etc.) and the industries
            you focus on.
          </p>
        </div>
      </Container>
    </section>
  );
}
