import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import IconWhatsapp from "@/components/icons/IconWhatsapp";

export const metadata: Metadata = { title: "Contacto. Tresunotres" };

const whatsappNumbers = [
  { label: "+506 8706 0833", href: "https://wa.me/50687060833" },
  { label: "+506 7075 3929", href: "https://wa.me/50670753929" },
];

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

        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-4">
            ¿Más preguntas?
          </h2>
          <p className="text-stone mb-6">Escríbenos por WhatsApp:</p>
          <div className="flex flex-wrap gap-4">
            {whatsappNumbers.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-paper/20 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-cobalt hover:bg-cobalt"
              >
                <IconWhatsapp className="h-4 w-4" />
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
