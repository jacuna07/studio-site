import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact. Tresunotres" };

export default function ContactPage() {
  return (
    <section className="py-16">
      <Container className="max-w-2xl">
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-4">
          Contact
        </h1>
        <p className="text-stone mb-10">
          Tell us a bit about your project and we&apos;ll get back to you.
        </p>
        <ContactForm />
      </Container>
    </section>
  );
}
