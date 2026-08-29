import ProjectCard from "./ProjectCard";
import type { Project } from "@/content/projects/types";

function chunkByThree(projects: Project[]): Project[][] {
  const groups: Project[][] = [];
  for (let i = 0; i < projects.length; i += 3) {
    groups.push(projects.slice(i, i + 3));
  }
  return groups;
}

export default function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div>
      {chunkByThree(projects).map((group, gi) => (
        <div key={gi}>
          <ProjectCard project={group[0]} index={gi * 3 + 1} aspect="wide" />
          {group.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              {group.slice(1).map((p, i) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  index={gi * 3 + 2 + i}
                  aspect="square"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
