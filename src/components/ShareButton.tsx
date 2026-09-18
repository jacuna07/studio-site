"use client";

import { useState } from "react";
import IconShare from "./icons/IconShare";

const copy = {
  en: { share: "Share", copied: "Link copied" },
  es: { share: "Compartir", copied: "Enlace copiado" },
};

export default function ShareButton({
  title,
  text,
  locale = "en",
  label,
  size = "sm",
}: {
  title: string;
  text?: string;
  locale?: "en" | "es";
  /** Overrides the default localized "Share" label, e.g. "Share project". */
  label?: string;
  /** "lg" bumps text and icon size on desktop only; mobile is unaffected. */
  size?: "sm" | "lg";
}) {
  const [copied, setCopied] = useState(false);
  const t = copy[locale];
  const shareLabel = copied ? t.copied : label ?? t.share;

  async function handleShare() {
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // Cancelled or unsupported mid share — no error state needed.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — nothing more we can do here.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      // Hover only on desktop (md:) — no real hover on mobile, and a
      // tapped button can otherwise get visually "stuck" in its hover
      // state on some mobile browsers.
      className={`group inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.2em] text-stone md:hover:text-cobalt transition-colors ${
        size === "lg" ? "text-xs md:text-sm" : "text-xs"
      }`}
    >
      <IconShare className={size === "lg" ? "h-4 w-4 md:h-5 md:w-5" : "h-4 w-4"} />
      <span className="relative">
        {shareLabel}
        <span
          aria-hidden="true"
          className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out md:group-hover:w-full"
        />
      </span>
    </button>
  );
}
