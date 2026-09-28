import CtaBlock from "./CtaBlock";
import IconArrowLeft from "./icons/IconArrowLeft";
import { getAllCovers } from "@/content/projects";

/**
 * The big "See all projects →" block (a CtaBlock with the cover preview)
 * that closes the Home page, every case study and every in-progress page,
 * stacked right on top of the footer's own CTA block. The footer knows
 * which pages end with it and drops its top margin there (see Footer.tsx).
 *
 * className: pass "mt-4" after a section that ends in the usual 64px of
 * bottom padding, so there's 80px before the divider, like the footer.
 */
export default function SeeAllProjectsCta({ className = "" }: { className?: string }) {
  return (
    <CtaBlock href="/work" covers={getAllCovers()} className={className}>
      See all{" "}
      <span className="whitespace-nowrap">
        projects
        <IconArrowLeft className="inline-block ml-[0.25em] h-[0.7em] w-[0.7em] rotate-180 align-[-0.05em]" />
      </span>
    </CtaBlock>
  );
}
