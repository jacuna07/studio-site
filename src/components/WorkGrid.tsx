import { Fragment } from "react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import type { Project } from "@/content/projects/types";

function chunkByThree(projects: Project[]): Project[][] {
  const groups: Project[][] = [];
  for (let i = 0; i < projects.length; i += 3) {
    groups.push(projects.slice(i, i + 3));
  }
  return groups;
}

export default function WorkGrid({
  projects,
  locale = "en",
  variant = "chunked",
  enableImageSwipe = false,
  enableHoverLoop = false,
  mobileVisible,
  revealOnPhones = false,
}: {
  projects: Project[];
  locale?: "en" | "es";
  variant?: "chunked" | "grid";
  /** Mobile only: swiping over a card's thumbnail cycles through its images. */
  enableImageSwipe?: boolean;
  /** Desktop only: hovering a card cycles through its images. */
  enableHoverLoop?: boolean;
  /**
   * Grid variant, phones only (the single column view, below sm): show
   * just the first N cards; the rest stay in the page but hidden until
   * the parent raises N ("Show more"). Every card shows from sm up.
   */
  mobileVisible?: number;
  /**
   * Grid variant, phones only (the English Work page, set 2026-10-06):
   * each card rises and fades in as it comes into view, like Home and
   * Studio (Reveal). The cards on screen at load follow the title and
   * filters (300ms, then 150ms apart).
   */
  revealOnPhones?: boolean;
}) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const hidden =
            mobileVisible !== undefined && i >= mobileVisible ? "max-sm:hidden" : undefined;
          const card = (className?: string) => (
            <ProjectCard
              project={p}
              index={i + 1}
              aspect="uniform"
              locale={locale}
              overlay="solid"
              showIndex={false}
              enableImageSwipe={enableImageSwipe}
              enableHoverLoop={enableHoverLoop}
              className={className}
            />
          );
          return revealOnPhones ? (
            <Reveal
              key={p.slug}
              phonesOnly
              waitForScroll={false}
              loadDelay={300 + Math.min(i, 3) * 150}
              className={hidden}
            >
              {card()}
            </Reveal>
          ) : (
            <Fragment key={p.slug}>{card(hidden)}</Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {chunkByThree(projects).map((group, gi) => (
        <div key={gi}>
          <ProjectCard
            project={group[0]}
            index={gi * 3 + 1}
            aspect="wide"
            locale={locale}
            overlay="solid"
            showIndex={false}
            enableImageSwipe={enableImageSwipe}
          />
          {group.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              {group.slice(1).map((p, i) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  index={gi * 3 + 2 + i}
                  aspect="square"
                  locale={locale}
                  overlay="solid"
                  showIndex={false}
                  enableImageSwipe={enableImageSwipe}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
