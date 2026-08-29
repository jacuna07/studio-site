import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects/types";

export default function ProjectCard({
  project,
  index,
  aspect = "wide",
}: {
  project: Project;
  index: number;
  aspect?: "wide" | "square";
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative block overflow-hidden bg-mist shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] aspect-[4/3] ${
        aspect === "wide" ? "md:aspect-[21/9]" : "md:aspect-[4/3]"
      }`}
    >
      <Image
        src={project.hero.src}
        alt={project.hero.alt}
        fill
        className="object-cover"
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.88), rgba(10,10,10,0) 58%)",
        }}
      >
        <div className="font-mono text-[11px] tracking-[0.2em] text-stone mb-2">
          {String(index).padStart(2, "0")}
        </div>
        <div className="font-display text-2xl md:text-3xl font-medium">
          {project.title}
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-cobalt mt-2">
          {project.type}
        </div>
      </div>
    </Link>
  );
}
