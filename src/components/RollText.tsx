import type { ReactNode } from "react";

/**
 * The link hover from thisistinge.com (set 2026-10-05), with a cobalt
 * copy: on hover (or keyboard focus) the label rolls up out of view and a
 * cobalt-400 copy rolls up into its place, 150ms, linear. Desktop only
 * (on phones a hover style would need a first tap).
 *
 * Put it inside the link and give the link the `group` class (and
 * `inline-block` if it sits in running text). The copy is a real
 * aria-hidden span, so screen readers say the label once.
 */
export default function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="relative block transition-transform duration-150 ease-linear md:group-hover:-translate-y-full md:group-focus-visible:-translate-y-full">
        <span className="block">{children}</span>
        <span aria-hidden="true" className="absolute inset-x-0 top-full block text-cobalt-400">
          {children}
        </span>
      </span>
    </span>
  );
}
