import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import IconInstagram from "@/components/icons/IconInstagram";
import IconLinkedin from "@/components/icons/IconLinkedin";

export const metadata: Metadata = { title: "Nosotros. Tresunotres" };

const method = [
  {
    number: "3",
    label: "Mentes creativas",
    description:
      "[MARCADOR DE DESCRIPCIÓN] Reemplazar con una breve descripción del equipo creativo del estudio y su enfoque en cada proyecto.",
  },
  {
    number: "1",
    label: "Producto pulido y de alta gama",
    description:
      "[MARCADOR DE DESCRIPCIÓN] Reemplazar con una breve descripción del compromiso del estudio con un producto final refinado.",
  },
  {
    number: "3",
    label: "Fases refinadas",
    description:
      "[MARCADOR DE DESCRIPCIÓN] Reemplazar con una breve descripción del proceso de tres fases del estudio.",
  },
];

const team = [
  {
    name: "Adrián Jiménez",
    role: "Diseñador de marca",
    photo: { src: "/images/about/adrian.jpg", alt: "Retrato de Adrián Jiménez" },
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Javier Acuña",
    role: "Diseñador de marca",
    photo: { src: "/images/about/javier.jpg", alt: "Retrato de Javier Acuña" },
    instagram: "#",
    linkedin: "#",
  },
];

export default function AboutPageEs() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-8">
          Un proceso a la medida, refinado desde la base.
        </h1>

        <div className="space-y-6 text-stone text-lg">
          <p>
            Tresunotres es un estudio de diseño de marca con sede en Costa
            Rica. La mayoría de los estudios diseñan la marca y esperan que
            el producto los alcance. Nosotros empezamos por el otro lado,
            dentro del producto o servicio mismo, usando su estructura real
            como la base sobre la que se construye la marca. La identidad
            visible llega después, una vez que esa base sostiene.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-4">
            Qué hacemos
          </h2>
          <div className="space-y-4 text-stone">
            <p>
              Trabajamos en las sombras, a propósito. Una vez que un
              proyecto empieza, nos mantenemos cerca. De la mano con el
              cliente durante todo el proceso, en lugar de desaparecer a
              diseñar en aislamiento y reaparecer con una presentación
              terminada.
            </p>
            <p>
              Cada proyecto que hemos tomado hasta ahora ha llegado por
              recomendación. Un cliente anterior que nos recomienda a
              alguien en quien confía. Lo hemos mantenido así a propósito.
              Mantiene el estudio pequeño, y significa que cada cliente nos
              tiene a los dos, de principio a fin.
            </p>
          </div>
        </div>
      </Container>

      <Container className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-8">
          Nuestro método
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
          El equipo
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
                  aria-label={`${person.name} en Instagram`}
                  className="text-stone hover:text-cobalt transition-colors"
                >
                  <IconInstagram className="h-5 w-5" />
                </a>
                <a
                  href={person.linkedin}
                  aria-label={`${person.name} en LinkedIn`}
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
