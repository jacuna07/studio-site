import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import { actionCardClass, ActionCardArrow } from "@/components/ActionCard";

export const metadata: Metadata = pageMetadata({
  page: "Contact",
  description: "Tell us about the next big thing. Brand design studio based in Costa Rica.",
  path: "/contact",
});

const whatsappContacts = [
  { name: "Adrian", number: "+506 8706 0833", href: "https://wa.me/50687060833" },
  { name: "Javier", number: "+506 7075 3929", href: "https://wa.me/50670753929" },
];

export default function ContactPage() {
  return (
    <CaseStudyBackSwipe targetHref="/work" targetLabel="Work" hint={false}>
      <section className="py-16 animate-page-in">
        <Container>
          {/* Desktop: two columns. Left, the big statement up top and the
              WhatsApp cards at the bottom; right, the form, spanning both
              rows so its Send card lines up with the WhatsApp cards.
              Phones: statement, form, then WhatsApp, in that order. */}
          <div className="grid gap-y-12 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-16">
            <div className="md:col-start-1 md:row-start-1">
              <p className="font-mono font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-stone">
                Contact
              </p>
              {/* Same type as the Home page's intro. */}
              <h1 className="mt-3 md:mt-4 font-display font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] text-balance">
                We want to hear about what excites you.
              </h1>
            </div>

            <div className="md:col-start-2 md:row-start-1 md:row-span-2">
              <ContactForm />
            </div>

            <div className="md:col-start-1 md:row-start-2 md:self-end">
              <h2 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-4">
                More questions?
              </h2>
              <p className="text-stone mb-6">Feel free to reach us via WhatsApp:</p>
              <div className="grid grid-cols-2 gap-4">
                {whatsappContacts.map((c) => (
                  <a
                    key={c.href}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Contact ${c.name} on WhatsApp (${c.number})`}
                    className={actionCardClass}
                  >
                    <ActionCardArrow />
                    <span>
                      Contact
                      <br />
                      {c.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </CaseStudyBackSwipe>
  );
}
