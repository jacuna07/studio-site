"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ShaderGradient } from "@shadergradient/react";

// What ShaderGradient's own canvas does before drawing: blanks shader
// chunks that newer three.js versions dropped.
const chunks = THREE.ShaderChunk as unknown as Record<string, string>;
chunks.uv2_pars_vertex = "";
chunks.uv2_vertex = "";
chunks.uv2_pars_fragment = "";
chunks.encodings_fragment = "";

/** Says when the first frame has been drawn. */
function FirstFrame({ onReady }: { onReady: () => void }) {
  const told = useRef(false);
  useFrame(() => {
    if (told.current) return;
    told.current = true;
    onReady();
  });
  return null;
}

/**
 * The Home hero's shader gradient (set 2026-10-05), Javier's ShaderGradient
 * (shadergradient.co) settings: a cobalt "water plane" with grain. It
 * doesn't react to the cursor. The export only settings (format, frame
 * rate, background colors, helpers) are left out: the canvas is
 * see-through over the hero's ink.
 *
 * Our own canvas instead of ShaderGradientCanvas (same settings: pixel
 * density 1, 45° field of view, linear and flat color) so we control the
 * frame loop: it stops while the hero is covered (the Home hero or a
 * CoverHero sets `visibility: hidden` then) or the tab is in the
 * background. With reduced motion it's still, drawn only when needed.
 */
export default function HeroShader({ onReady }: { onReady: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [still] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [on, setOn] = useState(true);

  useEffect(() => {
    // The Home hero, or a CoverHero (the Studio page): both set
    // `visibility: hidden` once they're fully covered.
    const host = ref.current?.closest<HTMLElement>("[data-hero], [data-cover-hero]");
    function update() {
      setOn(!document.hidden && host?.style.visibility !== "hidden");
    }
    update();
    const watch = host ? new MutationObserver(update) : null;
    if (host && watch) watch.observe(host, { attributes: true, attributeFilter: ["style"] });
    document.addEventListener("visibilitychange", update);
    return () => {
      watch?.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        dpr={1}
        camera={{ fov: 45 }}
        linear
        flat
        resize={{ offsetSize: true }}
        frameloop={!on ? "never" : still ? "demand" : "always"}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          shader="defaults"
          animate={still ? "off" : "on"}
          uTime={8}
          uSpeed={0.3}
          uStrength={0.9}
          uDensity={2}
          uFrequency={0}
          uAmplitude={0}
          range="disabled"
          rangeStart={0}
          rangeEnd={40}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          color1="#3057FF"
          color2="#5E7DFF"
          color3="#0B0C10"
          reflection={0.1}
          wireframe={false}
          cAzimuthAngle={180}
          cPolarAngle={80}
          cDistance={2.8}
          cameraZoom={9.1}
          lightType="3d"
          brightness={1}
          envPreset="city"
          grain="on"
        />
        <FirstFrame onReady={onReady} />
      </Canvas>
    </div>
  );
}
