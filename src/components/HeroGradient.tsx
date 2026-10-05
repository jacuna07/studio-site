"use client";

import { useEffect, useRef } from "react";

type Field = {
  /** A brand color (tailwind.config.ts), as #RRGGBB. */
  color: string;
  /** Alpha at the center and 40% of the way out, as two hex digits. */
  core: string;
  mid: string;
  /** Diameter, in vmax. */
  size: number;
  /** Resting center, in % of the hero. */
  x: number;
  y: number;
  /** How far it wanders on its own, in % of the hero's shorter side. */
  drift: number;
  /** Seconds per wander loop, and where in the loop it starts. */
  period: number;
  phase: number;
  /** Share of the pointer's offset from the center it follows
   *  (negative: it leans away). */
  pull: number;
  /** How quickly it catches up with the pointer (per 60fps frame). */
  lag: number;
};

// Cobalt 700, 500 and 300, and a small paper glow that trails the cursor.
const FIELDS: Field[] = [
  { color: "#1833B3", core: "FF", mid: "99", size: 120, x: 72, y: 82, drift: 10, period: 34, phase: 0, pull: 0.12, lag: 0.03 },
  { color: "#3057FF", core: "FF", mid: "80", size: 95, x: 24, y: 32, drift: 12, period: 27, phase: 2.2, pull: 0.3, lag: 0.04 },
  { color: "#8CA3FF", core: "E6", mid: "66", size: 62, x: 82, y: 22, drift: 14, period: 22, phase: 4.1, pull: -0.25, lag: 0.05 },
  { color: "#FFFFFF", core: "99", mid: "33", size: 36, x: 50, y: 55, drift: 8, period: 18, phase: 1.1, pull: 0.85, lag: 0.08 },
];

/**
 * The Home hero's background (set 2026-10-05, replacing the photo
 * slideshow): soft fields of the brand's blues over ink, plus a small
 * paper glow, the whole layer at 30% opacity.
 *
 * - They wander slowly on their own, each on its own loop, so it's alive
 *   on phones too.
 * - They react to the cursor (on phones, a finger): each leans toward it
 *   or away from it, by its own amount and with its own lag, and the
 *   paper glow trails it most closely.
 * - Transforms only (each field is its own layer), and it only runs while
 *   the hero is on screen (the hero sets `visibility: hidden` once it's
 *   covered). Reduced motion: still, in place.
 */
export default function HeroGradient() {
  const ref = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el: HTMLDivElement = layer;
    const host = el.closest<HTMLElement>("[data-hero]") ?? el;
    const nodes = fieldRefs.current;

    // The pointer's offset from the hero's center (px), and each field's
    // own, lagging copy of it.
    let tx = 0;
    let ty = 0;
    const seen = FIELDS.map(() => ({ x: 0, y: 0 }));
    const start = performance.now();
    let last = 0;
    let frame = 0;
    let hiddenFrames = 0;

    function loop(now: number) {
      frame = 0;
      // Covered: stop until the next scroll. (Checked over two frames, in
      // case the hero hasn't caught up with this scroll yet.)
      if (host.style.visibility === "hidden") {
        last = 0;
        if (++hiddenFrames < 2) frame = window.requestAnimationFrame(loop);
        return;
      }
      hiddenFrames = 0;
      const dt = last ? Math.min(now - last, 64) : 16.7;
      last = now;
      const short = Math.min(el.clientWidth, el.clientHeight);
      const t = (now - start) / 1000;
      FIELDS.forEach((f, i) => {
        const node = nodes[i];
        if (!node) return;
        const s = seen[i];
        const k = 1 - Math.pow(1 - f.lag, dt / 16.7);
        s.x += (tx - s.x) * k;
        s.y += (ty - s.y) * k;
        const a = (t / f.period) * Math.PI * 2 + f.phase;
        const wander = (f.drift / 100) * short;
        const dx = Math.cos(a) * wander + s.x * f.pull;
        const dy = Math.sin(a * 0.8) * wander + s.y * f.pull;
        const scale = 1 + 0.08 * Math.sin(a * 0.5 + 1);
        node.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      });
      frame = window.requestAnimationFrame(loop);
    }

    function wake() {
      if (frame) return;
      hiddenFrames = 0;
      frame = window.requestAnimationFrame(loop);
    }

    function aim(x: number, y: number) {
      const r = el.getBoundingClientRect();
      tx = x - (r.left + r.width / 2);
      ty = y - (r.top + r.height / 2);
      wake();
    }

    function onPointer(e: PointerEvent) {
      aim(e.clientX, e.clientY);
    }

    function onTouch(e: TouchEvent) {
      const touch = e.touches[0];
      if (touch) aim(touch.clientX, touch.clientY);
    }

    wake();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", wake);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-30"
    >
      {FIELDS.map((f, i) => (
        <div
          key={f.color}
          ref={(node) => {
            fieldRefs.current[i] = node;
          }}
          className="absolute will-change-transform"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}vmax`,
            height: `${f.size}vmax`,
            marginLeft: `${-f.size / 2}vmax`,
            marginTop: `${-f.size / 2}vmax`,
            background: `radial-gradient(closest-side, ${f.color}${f.core} 0%, ${f.color}${f.mid} 40%, ${f.color}00 100%)`,
          }}
        />
      ))}
    </div>
  );
}
