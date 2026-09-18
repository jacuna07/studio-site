import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import IconWhatsapp from "@/components/icons/IconWhatsapp";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import MethodCarousel from "@/components/MethodCarousel";

export const metadata: Metadata = { title: "About. Tresunotres" };

const method = [
  {
    number: "3",
    label: "Creative minds",
    description:
      "Two seasoned brand designers, each with over a decade of experience across multiple fields, teaming up with you — the third pillar of the process.",
  },
  {
    number: "1",
    label: "High-end, polished product",
    description:
      "One final product, refined at its core. Our commitment: never deliver something we don't love ourselves.",
  },
  {
    number: "3",
    label: "Refined phases",
    description:
      "Three tailor-made phases, perfected over the years. No guesswork — just an efficient result.",
  },
];

const team = [
  {
    name: "Adrián Jiménez",
    role: "Brand designer",
    photo: { src: "/images/about/adrian.jpg", alt: "Portrait of Adrián Jiménez" },
    whatsapp: "#",
  },
  {
    name: "Javier Acuña",
    role: "Brand designer",
    photo: { src: "/images/about/javier.jpg", alt: "Portrait of Javier Acuña" },
    whatsapp: "#",
  },
];

export default function AboutPage() {
  return (
    <CaseStudyBackSwipe targetHref="/work" targetLabel="Work" hint={false}>
    <section className="py-16 animate-page-in">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h1 className="font-display font-normal text-3xl md:text-[56px] md:leading-tight tracking-normal mb-8">
              A tailor-made process, refined at the core.
            </h1>

            <div className="space-y-6 text-paper text-lg">
              <p>
                Tresunotres is a brand design studio based in Costa Rica. Most
                studios design the brand and hope the product catches up. We
                start on the other side, inside the product or service itself,
                using its actual structure as the base the brand is built on. The
                visible identity comes after, once that foundation holds.
              </p>
            </div>

            <div className="mt-16">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-4">
                What we do
              </h2>
              <div className="space-y-4 text-paper md:text-lg">
                <p>
                  We work in the shadows, by design. Once a project starts, we
                  stay close. Hand in hand with the client through the whole
                  process, rather than disappearing to design in isolation and
                  resurfacing with a finished deck.
                </p>
                <p>
                  Every project we&apos;ve taken on so far has come to us through
                  word of mouth. A past client recommending us to someone they
                  trust. We&apos;ve kept it that way on purpose. It keeps the
                  studio small, and it means every client gets both of us, start
                  to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-8">
          Our method
        </h2>
        <MethodCarousel items={method} />
      </Container>

      <Container className="max-w-3xl mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-8">
          The team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {team.map((person) => (
            <div key={person.name}>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist">
                <Image
                  src={person.photo.src}
                  alt={person.photo.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-lg mt-4">{person.name}</h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone mt-1">
                {person.role}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href={person.whatsapp}
                  aria-label={`${person.name} on WhatsApp`}
                  className="text-stone md:hover:text-cobalt transition-colors"
                >
                  <IconWhatsapp className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
    </CaseStudyBackSwipe>
  );
}
