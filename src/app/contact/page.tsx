import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact — Studio" };

export default function ContactPage() {
  return (
    <section className="py-16">
      <Container className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight mb-4">
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
