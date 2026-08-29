import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contacto. Tresunotres" };

export default function ContactPageEs() {
  return (
    <section className="py-16">
      <Container className="max-w-2xl">
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-4">
          Contacto
        </h1>
        <p className="text-stone mb-10">
          Queremos saber qué te emociona.
        </p>
        <ContactForm locale="es" />
      </Container>
    </section>
  );
}
