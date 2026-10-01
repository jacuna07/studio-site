import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import IconWhatsapp from "@/components/icons/IconWhatsapp";
import IconInstagram from "@/components/icons/IconInstagram";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import MethodCarousel from "@/components/MethodCarousel";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = pageMetadata({
  page: "Studio",
  description:
    "Tresunotres (313) is a brand design studio based in Costa Rica. We build brands the way you'd build anything meant to last.",
  path: "/studio",
});

// Section labels ("What we do", "Our method", "The team"): bold, and a
// step up from 12px to 14px on desktop so they read as real headings.
const sectionLabel =
  "font-mono font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-stone";

const method = [
  {
    number: "3",
    label: "Creative minds",
    description: (
      <>
        Two seasoned brand designers who&apos;ve been working together for
        over a decade, with experience across multiple fields, teaming up
        with you:{" "}
        <strong className="font-bold">the third pillar of the process</strong>.
      </>
    ),
  },
  {
    number: "1",
    label: "High-end, polished product",
    description: (
      <>
        One final product, <strong className="font-bold">refined at its core</strong>. Our
        commitment: never deliver something we won&apos;t love ourselves.
      </>
    ),
  },
  {
    number: "3",
    label: "Refined phases",
    description: (
      <>
        Three tailor-made phases, perfected over the years.{" "}
        <strong className="font-bold">No guesswork</strong>. Just a precise result.
      </>
    ),
  },
];

const team = [
  {
    name: "Adrián Jiménez",
    role: "Brand designer",
    photo: { src: "/images/about/adrian.jpg", alt: "Portrait of Adrián Jiménez" },
    whatsapp: "#",
    instagram: "https://www.instagram.com/adro_jimenez/",
  },
  {
    name: "Javier Acuña",
    role: "Brand designer",
    photo: { src: "/images/about/javier.jpg", alt: "Portrait of Javier Acuña" },
    whatsapp: "#",
    instagram: "https://www.instagram.com/acuna07/",
  },
];

export default function StudioPage() {
  return (
    <CaseStudyBackSwipe targetHref="/work" targetLabel="Work" hint={false}>
    <section className="py-16 animate-page-in">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 max-w-copy">
            {/* Phones: the page comes in as a sequence. 01 the title and
                02 the intro on load (.reveal-on-load), then 03 to 07 rise
                and fade in tied to the scroll, following the finger both
                ways (Reveal). Desktop is unchanged. */}
            <h1 className="reveal-on-load font-display font-normal text-3xl md:text-[56px] md:leading-tight tracking-normal mb-8 md:mb-10">
              A tailor-made process, refined at the core.
            </h1>

            {/* Desktop type scale follows the reference studios
                (this.design, Tinge, Folk, Pupila): the intro is set as a
                large statement (~30px, tight leading) rather than body
                copy, and supporting paragraphs sit around 22px. */}
            <div
              className="reveal-on-load space-y-6 text-paper text-lg md:text-[30px] md:leading-[1.3]"
              style={{ animationDelay: "300ms" }}
            >
              <p>
                <strong className="font-bold">Tresunotres</strong> (313) is a brand design
                studio based in Costa Rica. We build brands the way you&apos;d
                build anything meant to last. We dig into the product first,
                and the identity only goes up once the foundation is set.
              </p>
            </div>

            <Reveal className="mt-16 md:mt-20">
              <h2 className={`${sectionLabel} mb-4 md:mb-6`}>What we do</h2>
              <div className="space-y-4 md:space-y-6 text-paper md:text-[22px] md:leading-[1.5]">
                <p>
                  We care about your product{" "}
                  <strong className="font-bold">as much as you do</strong>. Some
                  days, a little more.
                </p>
                <p>
                  We work in the shadows, by design. Once a project starts, we
                  stay close, hand in hand with the client through the whole
                  process. No surprises. Just a process built to hold up.
                </p>
                <p>
                  Every project we&apos;ve taken on so far has come to us through
                  word of mouth. A past client recommending us to someone they
                  trust. We&apos;ve kept it that way on purpose. It keeps the
                  studio small, and it means every client gets both of us,{" "}
                  <strong className="font-bold">start to finish</strong>.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      <Container className="mt-16 md:mt-24">
        <Reveal>
          <h2 className={`${sectionLabel} mb-8`}>Our method</h2>
          <MethodCarousel items={method} />
        </Reveal>
      </Container>

      {/* The team keeps the width it has always rendered at (the old
          max-w-3xl on this Container never actually applied), left aligned
          with the wider grid rather than growing with it. */}
      <Container className="mt-16 md:mt-24">
        <div className="max-w-[1360px]">
          <Reveal>
            <h2 className={`${sectionLabel} mb-8`}>The team</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {team.map((person) => (
              <Reveal key={person.name}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist">
                  <Image
                    src={person.photo.src}
                    alt={person.photo.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-lg md:text-2xl mt-4 md:mt-5">{person.name}</h3>
                <p className="font-mono text-[11px] md:text-sm uppercase tracking-[0.2em] text-stone mt-1 md:mt-2">
                  {person.role}
                </p>
                <div className="flex items-center gap-3 mt-3 md:mt-4">
                  <a
                    href={person.whatsapp}
                    aria-label={`${person.name} on WhatsApp`}
                    className="text-stone md:hover:text-cobalt transition-colors"
                  >
                    <IconWhatsapp className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                  {/* Desktop only, sits right of the WhatsApp icon. */}
                  <a
                    href={person.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.name} on Instagram`}
                    className="hidden text-stone transition-colors md:inline-flex md:hover:text-cobalt"
                  >
                    <IconInstagram className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Closing wink: 3-1-3, and the client as "the third pillar" from
          the method cards. Same size as the page's H1 so the two
          bookend the page, and the same cobalt link treatment as the
          Home hero's "the spotlight." */}
      <Container className="mt-24 md:mt-32">
        <Reveal>
        <p className="font-display font-normal text-3xl md:text-[56px] md:leading-tight">
          There&apos;s always room for{" "}
          <Link href="/contact" className="group relative inline-block text-cobalt">
            a third.
            <span
              aria-hidden="true"
              className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
            />
          </Link>
        </p>
        </Reveal>
      </Container>
    </section>
    </CaseStudyBackSwipe>
  );
}
