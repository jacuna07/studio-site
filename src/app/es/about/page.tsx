import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = { title: "Nosotros. Tresunotres" };

const team = [
  {
    name: "Adrián Jiménez",
    role: "Cofundador y Diseñador",
    bio: "Más de diez años construyendo sistemas de marca, la mayoría junto a Javier.",
  },
  {
    name: "Javier Acuña",
    role: "Cofundador y Diseñador",
    bio: "Más de diez años construyendo sistemas de marca, la mayoría junto a Adrián.",
  },
];

export default function AboutPageEs() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h1 className="font-display font-normal text-3xl md:text-4xl tracking-normal mb-8">
          Nosotros
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
            Cómo trabajamos
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

        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-stone mb-8">
            El equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {team.map((person) => (
              <div key={person.name}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist flex items-center justify-center">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
                    Foto. Marcador de posición
                  </span>
                </div>
                <h3 className="font-display text-lg mt-4">{person.name}</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone mt-1">
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
