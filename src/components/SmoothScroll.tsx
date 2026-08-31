"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Wraps the app in a Lenis (https://lenis.dev) smooth-scroll instance.
 *
 * `root` mode renders no wrapper divs -- Lenis operates directly on
 * window/document.documentElement via real scrollTo() calls, not a CSS
 * transform, so it doesn't disturb position:fixed descendants like the Nav
 * header or the cursor-reveal bubble on the Work/Home grids.
 *
 * Lenis handles the things our earlier hand-rolled version struggled with:
 * it respects prefers-reduced-motion itself (smoothing is disabled
 * automatically -- `respectReducedMotion` defaults to true), and leaves
 * touch scrolling native by default (no `syncTouch`), so no extra gating is
 * needed here. `prevent` below exempts the Work page's horizontal
 * industry-filter row (class "scrollbar-hide") so it keeps its own native
 * scroll -- give any future horizontally-scrollable widget the same class,
 * or extend the check.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1,
        prevent: (node) => !!node.closest(".scrollbar-hide"),
      }}
    >
      {children}
    </ReactLenis>
  );
}
