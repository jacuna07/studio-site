import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = { title: "About — Tresunotres" };

const team = [
  {
    name: "Adrián Jiménez",
    role: "Co-founder & Designer",
    bio: "Ten-plus years building brand systems, most of them alongside Javier.",
  },
  {
    name: "Javier Acuña",
    role: "Co-founder & Designer",
    bio: "Ten-plus years building brand systems, most of them alongside Adrián.",
  },
];

export default function AboutPage() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-8">
          About
        </h1>

        <div className="space-y-6 text-stone text-lg">
          <p>
            Tresunotres is a brand design studio based in Costa Rica. Most
            studios design the brand and hope the product catches up — we
            start on the other side, inside the product or service itself,
            using its actual structure as the base the brand is built on. The
            visible identity comes after, once that foundation holds.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-wide text-stone mb-4">
            How we work
          </h2>
          <div className="space-y-4 text-stone">
            <p>
              We work in the shadows, by design. Once a project starts, we
              stay close — hand in hand with the client through the whole
              process, rather than disappearing to design in isolation and
              resurfacing with a finished deck.
            </p>
            <p>
              Every project we&apos;ve taken on so far has come to us through
              word of mouth — a past client recommending us to someone they
              trust. We&apos;ve kept it that way on purpose. It keeps the
              studio small, and it means every client gets both of us, start
              to finish.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-wide text-stone mb-8">
            The team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {team.map((person) => (
              <div key={person.name}>
                <div className="relative aspect-square bg-mist overflow-hidden flex items-center justify-center">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-stone">
                    Photo — placeholder
                  </span>
                </div>
                <h3 className="font-display text-lg mt-4">{person.name}</h3>
                <p className="font-mono text-[11px] uppercase tracking-wide text-stone mt-1">
                  {person.role}
                </p>
                <p className="text-stone mt-3">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
