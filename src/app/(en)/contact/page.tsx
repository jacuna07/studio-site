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
          {/* Desktop: the statement on the left; the form, then the
              WhatsApp section, on the right. Phones: the same, stacked. */}
          <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-16">
            {/* The column is a size container so the statement can be
                sized against it (cqw): as large as it can be while "We
                want to hear about" still fits on one line, capped at 72px.
                That keeps the draft's two lines at any screen width. */}
            <div className="[container-type:inline-size]">
              {/* Same line by line entrance as the Home intro. */}
              <h1 className="font-display font-normal text-[min(72px,9.7cqw)] leading-[1.2] tracking-normal">
                <span className="block animate-line" style={{ animationDelay: "0ms" }}>
                  We want to hear about
                </span>{" "}
                <span className="block animate-line" style={{ animationDelay: "150ms" }}>
                  what excites you.
                </span>
              </h1>
            </div>

            <div>
              <ContactForm />

              <div className="mt-8 border-t border-mist pt-10">
                <h2 className="font-display text-xl md:text-2xl text-paper">More questions?</h2>
                <p className="mt-1 text-stone">Feel free to reach us via WhatsApp:</p>
                <div className="mt-8 grid grid-cols-2 gap-4">
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
          </div>
        </Container>
      </section>
    </CaseStudyBackSwipe>
  );
}
