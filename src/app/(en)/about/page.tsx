import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import IconInstagram from "@/components/icons/IconInstagram";
import IconLinkedin from "@/components/icons/IconLinkedin";

export const metadata: Metadata = { title: "About. Tresunotres" };

const method = [
  {
    number: "3",
    label: "Creative minds",
    description:
      "[DESCRIPTION PLACEHOLDER] Replace with a short description of the studio's creative team and how it approaches each project.",
  },
  {
    number: "1",
    label: "High-end, polished product",
    description:
      "[DESCRIPTION PLACEHOLDER] Replace with a short description of the studio's commitment to a refined final product.",
  },
  {
    number: "3",
    label: "Refined phases",
    description:
      "[DESCRIPTION PLACEHOLDER] Replace with a short description of the studio's three-phase process.",
  },
];

const team = [
  {
    name: "Adrián Jiménez",
    role: "Co-founder & Designer",
    photo: { src: "/images/about/adrian.jpg", alt: "Portrait of Adrián Jiménez" },
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Javier Acuña",
    role: "Co-founder & Designer",
    photo: { src: "/images/about/javier.jpg", alt: "Portrait of Javier Acuña" },
    instagram: "#",
    linkedin: "#",
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
              className="group relative overflow-hidden rounded-2xl border border-paper/20 bg-cobalt h-[380px] md:h-[440px]"
            >
              <div className="absolute inset-x-0 bottom-0 flex items-center p-6 md:p-8">
                <p className="text-paper text-sm leading-snug">{item.description}</p>
              </div>

              <div className="absolute inset-x-0 top-0 flex h-full flex-col justify-between bg-ink p-8 transition-[height] duration-300 ease-out group-hover:h-[65%]">
                <span className="font-display font-bold text-6xl md:text-7xl text-paper">
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
                  href={person.instagram}
                  aria-label={`${person.name} on Instagram`}
                  className="text-stone hover:text-cobalt transition-colors"
                >
                  <IconInstagram className="h-5 w-5" />
                </a>
                <a
                  href={person.linkedin}
                  aria-label={`${person.name} on LinkedIn`}
                  className="text-stone hover:text-cobalt transition-colors"
                >
                  <IconLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
