import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import IconWhatsapp from "@/components/icons/IconWhatsapp";

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
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-8">
          A tailor-made process, refined at the core.
        </h1>

        <div className="space-y-6 text-stone text-lg">
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
          <div className="space-y-4 text-stone">
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
      </Container>

      <Container className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-8">
          Our method
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {method.map((item) => (
            <div
              key={item.label}
              tabIndex={0}
              className="group relative overflow-hidden rounded-2xl border border-paper/20 bg-cobalt h-[380px] md:h-[440px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <div className="absolute inset-x-0 bottom-0 h-[35%] flex items-center p-6 md:p-8">
                <p className="text-paper text-sm leading-snug">{item.description}</p>
              </div>

              <div className="absolute inset-x-0 top-0 flex h-[65%] md:h-full flex-col justify-between bg-ink p-8 transition-[height] duration-300 ease-out md:group-hover:h-[65%] md:group-focus:h-[65%]">
                <span className="font-display font-bold text-6xl md:text-7xl leading-none text-paper -mt-2 md:-mt-3">
                  {item.number}
                </span>
                <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-paper max-w-[14ch]">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
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
                  className="text-stone hover:text-cobalt transition-colors"
                >
                  <IconWhatsapp className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
