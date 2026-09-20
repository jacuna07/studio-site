import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import IconWhatsapp from "@/components/icons/IconWhatsapp";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";

export const metadata: Metadata = { title: "Contacto. Tresunotres" };

const whatsappNumbers = [
  { label: "+506 8706 0833", hoverLabel: "Escribirle a Adrián", href: "https://wa.me/50687060833" },
  { label: "+506 7075 3929", hoverLabel: "Escribirle a Javier", href: "https://wa.me/50670753929" },
];

export default function ContactPageEs() {
  return (
    <CaseStudyBackSwipe targetHref="/es/work" targetLabel="Trabajo" hint={false}>
    <section className="py-16 animate-page-in">
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
                className="group inline-flex items-center gap-2 rounded-2xl border border-paper/20 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors md:hover:border-cobalt md:hover:bg-cobalt"
              >
                <IconWhatsapp className="h-4 w-4 flex-shrink-0" />
                {/* Desktop only: hovering swaps the phone number for who it reaches.
                    Both labels sit in the same grid cell so the pill never resizes. */}
                <span className="grid">
                  <span className="col-start-1 row-start-1 transition-opacity duration-200 md:group-hover:opacity-0">
                    {n.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-start-1 row-start-1 opacity-0 transition-opacity duration-200 hidden md:inline md:group-hover:opacity-100"
                  >
                    {n.hoverLabel}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
    </CaseStudyBackSwipe>
  );
}
