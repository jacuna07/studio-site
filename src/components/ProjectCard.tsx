import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects/types";

export default function ProjectCard({
  project,
  index,
  aspect = "wide",
  locale = "en",
  overlay = "gradient",
  showIndex = true,
}: {
  project: Project;
  index: number;
  aspect?: "wide" | "square" | "uniform";
  locale?: "en" | "es";
  overlay?: "gradient" | "solid";
  showIndex?: boolean;
}) {
  const href = locale === "es" ? `/es/work/${project.slug}` : `/work/${project.slug}`;

  const aspectClass =
    aspect === "wide"
      ? "aspect-[4/3] md:aspect-[21/9]"
      : aspect === "uniform"
        ? "aspect-[5/4]"
        : "aspect-[4/3] md:aspect-[4/3]";

  return (
    <Link href={href} className="group block">
      <div
        className={`relative overflow-hidden bg-mist shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] ${aspectClass}`}
      >
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
        />
        {overlay === "solid" ? (
          <div className="absolute inset-x-0 bottom-0 overflow-hidden hidden md:block">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cobalt origin-bottom scale-y-0 transition-transform duration-500 ease-out md:group-hover:scale-y-100"
            />
            <div className="relative z-10 px-8 py-5 opacity-0 transition-opacity duration-300 delay-100 md:group-hover:opacity-100">
              <div className="font-display text-2xl md:text-3xl font-medium text-paper">
                {project.title}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper mt-2">
                {project.industry}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0 hidden md:flex flex-col justify-end p-8 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.88), rgba(10,10,10,0) 58%)",
            }}
          >
            {showIndex && (
              <div className="font-mono text-[11px] tracking-[0.2em] text-stone mb-2">
                {String(index).padStart(2, "0")}
              </div>
            )}
            <div className="font-display text-2xl md:text-3xl font-medium">
              {project.title}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper mt-2">
              {project.industry}
            </div>
          </div>
        )}
      </div>

      {/* Mobile only: no hover to reveal this, so show it as plain text below the image */}
      <div className="md:hidden pt-4 pb-2">
        {overlay === "gradient" && showIndex && (
          <div className="font-mono text-[11px] tracking-[0.2em] text-stone mb-1">
            {String(index).padStart(2, "0")}
          </div>
        )}
        <div className="font-display text-xl font-medium text-paper">{project.title}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone mt-1">
          {project.industry}
        </div>
      </div>
    </Link>
  );
}
