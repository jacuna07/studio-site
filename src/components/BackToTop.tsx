"use client";

import { useEffect, useState } from "react";

type Locale = "en" | "es";

const label: Record<Locale, string> = {
  en: "Back to top",
  es: "Volver arriba",
};

export default function BackToTop({ locale = "en" }: { locale?: Locale }) {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const goingDown = currentY > lastY;

      setScrolledPast(currentY > 400);
      setVisible(currentY < 80 ? true : !goingDown);
      lastY = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const show = scrolledPast && visible;

  return (
    <a
      href="#top"
      onClick={handleClick}
      aria-label={label[locale]}
      className={`fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-2xl border border-paper/20 bg-ink text-3xl text-paper transition-all duration-300 hover:border-cobalt hover:bg-cobalt hover:text-paper ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      ↑
    </a>
  );
}
