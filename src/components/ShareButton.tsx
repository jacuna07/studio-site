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
}: {
  title: string;
  text?: string;
  locale?: "en" | "es";
}) {
  const [copied, setCopied] = useState(false);
  const t = copy[locale];

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
      className="group inline-flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone hover:text-cobalt transition-colors"
    >
      <IconShare className="h-4 w-4" />
      <span className="relative">
        {copied ? t.copied : t.share}
        <span
          aria-hidden="true"
          className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
        />
      </span>
    </button>
  );
}
