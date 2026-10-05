"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// The shader (three.js) is heavy: it loads in the browser only, after the
// rest of the page.
const HeroShader = dynamic(() => import("./HeroShader"), { ssr: false });

/**
 * The Home hero's background (2026-10-05): Javier's ShaderGradient, a slow
 * cobalt water plane with grain (HeroShader), at 30% opacity over ink. It
 * fades in once its first frame is drawn, so it never pops in. It doesn't
 * react to the cursor. (It replaced, the same day, a CSS gradient that
 * followed the cursor, which had replaced the photo slideshow.)
 */
export default function HeroGradient() {
  const [ready, setReady] = useState(false);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-out ${
        ready ? "opacity-30" : "opacity-0"
      }`}
    >
      <HeroShader onReady={() => setReady(true)} />
    </div>
  );
}
