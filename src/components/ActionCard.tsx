import IconArrowLeft from "./icons/IconArrowLeft";
import IconArrowUpRight from "./icons/IconArrowUpRight";

/**
 * The outlined rectangular buttons on the Contact page, from Javier's
 * draft. Both share the display font, the thin mist outline and the
 * site's cobalt fill on hover (desktop only, like every other hover).
 *
 * - Card (the two WhatsApp links): 128px tall on phones, 144px on
 *   desktop, label at the bottom left, a ↗ arrow top right (they open
 *   WhatsApp, outside the site).
 * - Bar (the form's Send button): half the card's height, label on the
 *   left, a → arrow on the right.
 *
 * Shared as class strings plus the arrows so they work on both <a> and
 * <button> (the form is a client component, the links are not).
 */
const base =
  "group border border-mist font-display text-lg md:text-xl leading-tight text-paper text-left transition-colors md:hover:border-cobalt md:hover:bg-cobalt";

export const actionCardClass = `${base} relative flex h-32 md:h-36 flex-col justify-end p-4 md:p-5`;

export const actionBarClass = `${base} flex h-16 md:h-[72px] items-center justify-between px-4 md:px-5`;

export function ActionCardArrow() {
  return (
    <IconArrowUpRight className="absolute right-4 top-4 h-5 w-5 transition-transform duration-200 md:right-5 md:top-5 md:h-6 md:w-6 md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5" />
  );
}

export function ActionBarArrow() {
  return (
    <IconArrowLeft className="h-5 w-5 shrink-0 rotate-180 transition-transform duration-200 md:h-6 md:w-6 md:group-hover:translate-x-1" />
  );
}
