import IconArrowUpRight from "./icons/IconArrowUpRight";

/**
 * The outlined rectangular "action cards" on the Contact page (the two
 * WhatsApp links and the form's Send button): label in the display font
 * at the bottom left, a ↗ arrow in the top right corner, and the site's
 * cobalt fill on hover (desktop only, like every other hover here).
 *
 * Shared as a class string plus the arrow so it works on both <a> and
 * <button> (the form is a client component, the links are not).
 */
export const actionCardClass =
  "group relative flex min-h-[128px] md:min-h-[144px] flex-col justify-end border border-mist p-4 md:p-5 text-left font-display text-lg md:text-xl leading-tight text-paper transition-colors md:hover:border-cobalt md:hover:bg-cobalt";

export function ActionCardArrow() {
  return (
    <IconArrowUpRight className="absolute right-4 top-4 h-5 w-5 transition-transform duration-200 md:right-5 md:top-5 md:h-6 md:w-6 md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5" />
  );
}
