import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Container from "@/components/Container";
import IconWhatsapp from "@/components/icons/IconWhatsapp";
import IconInstagram from "@/components/icons/IconInstagram";
import CaseStudyBackSwipe from "@/components/CaseStudyBackSwipe";
import Reveal from "@/components/Reveal";
import CoverHero from "@/components/CoverHero";
import HeroGradient from "@/components/HeroGradient";
import CircledWordmark from "@/components/icons/CircledWordmark";

export const metadata: Metadata = pageMetadata({
  page: "Studio",
  description:
    "Tresunotres (313) is a brand design studio based in Costa Rica. We build brands the way you'd build anything meant to last.",
  path: "/studio",
});

// Section labels ("What we do", "The Method", "Team"): bold,
// and a step up from 12px to 14px on desktop so they read as real
// headings. From lg up their line box matches the body copy's first line
// (26px), so a label and the text next to it share a line.
const sectionLabel =
  "font-mono font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-stone lg:leading-[26px]";

// Body copy (set 2026-10-05, smaller for a more editorial feel, like
// pentagram.com): 16px on a 26px line, every screen size.
const bodyCopy = "text-base leading-[1.625] text-paper";

// Editorial layout (set 2026-10-05, from Javier's mockup and
// pentagram.com/about): a 12-column grid with 24px gutters. From lg up,
// every section's label sits in columns 1 to 3 and its content starts at
// column 4, a quarter of the way across (the same axis as the Home hero
// copy and the footer's "Where to next?"); The Method's label sits on
// top of its table instead. Sections are separated by full-width
// hairlines.
const sectionClass = "py-16 md:py-24 lg:py-32";

// The Method's pillars (copy from Javier's third mockup, 2026-10-06).
type Pillar = {
  question: string;
  number: string;
  label: string;
  description: ReactNode;
};

// Emphasis inside The Method's gray descriptions: bold, in white.
const strong = "font-bold text-paper";

const method: Pillar[] = [
  {
    question: "Who",
    number: "3",
    label: "Creative minds",
    description: (
      <>
        Two seasoned brand designers who&apos;ve been working together for
        over a decade, teaming up with you:{" "}
        <strong className={strong}>the third pillar of the process</strong>.
      </>
    ),
  },
  {
    question: "What",
    number: "1",
    label: "Top-notch brand",
    description: (
      <>
        One final product, <strong className={strong}>refined at its core</strong>. Our
        commitment: never deliver something we won&apos;t love ourselves.
      </>
    ),
  },
  {
    question: "How",
    number: "3",
    label: "Refined phases",
    description: (
      <>
        Three tailor-made phases, perfected over the years.{" "}
        <strong className={strong}>No guesswork</strong>. Just a precise result.
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
    <div className="animate-page-in">
      {/* The title and intro, full screen over the shader gradient (the
          same as the Home hero, at 30%), stay put while the rest of the
          page, an opaque panel, slides up over them (set 2026-10-05, like
          the Home hero). Phones and desktop. */}
      <CoverHero
        offsetClassName="-mt-20"
        zoom={false}
        className="relative h-[100svh] w-full overflow-hidden bg-ink md:h-screen"
      >
        <HeroGradient />
        <div className="relative flex h-full items-center">
          <Container className="pb-10 md:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 max-w-copy">
                {/* The page comes in as a sequence, phones and desktop: only
                    01 the title and 02 the intro show on load
                    (.reveal-on-load); 03 to 07 wait for the first scroll, then
                    each rises and fades in, in full, as it comes into view
                    (Reveal), the same motion as the Home page. */}
                {/* Phones only (set 2026-10-05): the circled wordmark above
                    the title, the Home hero's phone size (112px), slowly
                    turning like the phone nav's logo (the nav is hidden
                    over this part on phones). */}
                <div className="reveal-on-load mb-6 h-28 w-28 md:hidden">
                  <CircledWordmark className="h-full w-full animate-slow-spin text-paper" />
                </div>
                <h1 className="reveal-on-load font-display font-normal text-3xl md:text-[56px] md:leading-tight tracking-normal mb-8 md:mb-10">
                  A tailor-made process, refined at the core.
                </h1>

                {/* Desktop type scale follows the reference studios
                    (this.design, Tinge, Folk, Pupila): the intro is set as a
                    large statement (~30px, tight leading) rather than body
                    copy. The paragraphs further down are 16px (bodyCopy). */}
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
              </div>
            </div>
          </Container>
        </div>
      </CoverHero>

    {/* The rest of the page: the panel that covers the title and intro,
        with a mist top line, like the Home page's. Inside, editorial
        sections (see sectionClass). */}
    <div className="relative z-10 border-t border-mist bg-ink">
      {/* What we do: label in columns 1 to 3, the copy in 4 to 9 (a
          readable measure at 16px). */}
      <section className={sectionClass}>
        <Container>
          <Reveal className="lg:grid lg:grid-cols-12 lg:gap-x-6">
            <h2 className={`${sectionLabel} mb-4 md:mb-8 lg:col-span-3 lg:mb-0`}>What we do</h2>
            <div className={`${bodyCopy} space-y-4 md:max-w-[40rem] lg:col-span-6 lg:col-start-4 lg:max-w-none`}>
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
        </Container>
      </section>

      {/* The Method (set 2026-10-06, Javier's third mockup): the label on
          top, then a table of three rows, a hairline over each. Each row:
          the question in the label type, the numeral (Syne Bold, small),
          then the name (bold caps) over a gray description.
          Columns: phones 4 / 1 / 7 twelfths of the width (no gutters);
          tablets 1 to 4, 5, 6 to 12; desktop 1 to 6, 7, 8 to 12.
          Top aligned: each line height puts the caps' top (Montserrat:
          cap 0.70 over a 0.968 / 0.251 ascent and descent) and the old
          style numerals' top (Syne: 0.51 over 0.925 / 0.275) at the same
          height as the question's caps. */}
      <section className={`border-t border-mist ${sectionClass}`}>
        <Container>
          <Reveal>
            <h2 className={`${sectionLabel} mb-8 md:mb-10 lg:mb-12`}>The Method</h2>
          </Reveal>
          {method.map((item, i) => (
            <Reveal
              key={item.label}
              className={`grid grid-cols-[4fr_1fr_7fr] border-t border-mist pt-6 md:grid-cols-12 md:gap-x-6 md:pt-8 lg:pt-10 ${
                i === method.length - 1 ? "" : "pb-6 md:pb-8 lg:pb-10"
              }`}
            >
              <p className="font-mono font-bold text-xs leading-[20px] uppercase tracking-[0.2em] text-stone md:col-span-4 md:text-sm lg:col-span-6 lg:leading-[26px]">
                {item.question}
              </p>
              <p
                aria-hidden="true"
                className="font-display font-bold text-[32px] leading-[24px] md:col-span-1 md:text-[40px] md:leading-[25px] lg:text-[48px] lg:leading-[34px]"
              >
                {item.number}
              </p>
              <div className="min-w-0 md:col-span-7 lg:col-span-5">
                <h3 className="font-mono font-bold text-sm leading-[21px] uppercase tracking-[0.2em] text-paper md:text-base lg:leading-[27px]">
                  <span className="sr-only">{item.number} </span>
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-[22px] text-stone md:text-base md:leading-[1.625] lg:mt-3 lg:max-w-[36rem]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Team: square portraits, no rounded corners. Desktop: in columns
          5 to 8 and 9 to 12. The page's last section (the "There's always
          room for a third" line came out 2026-10-06): the usual 64px
          before the footer. */}
      <section className="border-t border-mist pt-16 pb-16 md:pt-24 lg:pt-32">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
            <Reveal className="lg:col-span-3">
              <h2 className={`${sectionLabel} mb-8 md:mb-12 lg:mb-0`}>Team</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-6 lg:col-span-8 lg:col-start-5 lg:grid-cols-8">
              {team.map((person, i) => (
                // Side by side on desktop: the second card follows a beat later.
                <Reveal key={person.name} delay={i * 150} className="lg:col-span-4">
                  <div className="relative aspect-square overflow-hidden bg-mist">
                    <Image
                      src={person.photo.src}
                      alt={person.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
      </section>

    </div>
    </div>
    </CaseStudyBackSwipe>
  );
}
