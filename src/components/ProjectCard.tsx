import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-video overflow-hidden bg-mist">
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">{project.title}</h3>
          <p className="text-sm text-stone mt-1">{project.summary}</p>
        </div>
        <span className="text-xs uppercase tracking-wide text-stone whitespace-nowrap mt-1">
          {project.type}
        </span>
      </div>
    </Link>
  );
}
