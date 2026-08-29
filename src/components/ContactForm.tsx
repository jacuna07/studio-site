"use client";

import { useState, type FormEvent } from "react";

// TODO: replace with your real Formspree endpoint once you've created a form
// at https://formspree.io (free tier). It will look like:
// https://formspree.io/f/xxxxabcd
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

type Status = "idle" | "loading" | "success" | "error";
type Locale = "en" | "es";

const copy: Record<
  Locale,
  {
    name: string;
    email: string;
    details: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  }
> = {
  en: {
    name: "Name",
    email: "Email",
    details: "Project details",
    send: "Send",
    sending: "Sending…",
    success: "Thanks. We’ll be in touch soon.",
    error: "Something went wrong. Please try again, or email us directly.",
  },
  es: {
    name: "Nombre",
    email: "Correo electrónico",
    details: "Detalles del proyecto",
    send: "Enviar",
    sending: "Enviando…",
    success: "Gracias. Nos pondremos en contacto pronto.",
    error: "Algo salió mal. Intenta de nuevo, o escríbenos directamente.",
  },
};

export default function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-lg">{t.success}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-xs uppercase tracking-[0.2em] text-stone mb-2"
        >
          {t.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-mist border border-mist text-paper px-4 py-3 focus:outline-none focus:border-paper"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs uppercase tracking-[0.2em] text-stone mb-2"
        >
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-mist border border-mist text-paper px-4 py-3 focus:outline-none focus:border-paper"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs uppercase tracking-[0.2em] text-stone mb-2"
        >
          {t.details}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-mist border border-mist text-paper px-4 py-3 focus:outline-none focus:border-paper"
        />
      </div>
      {/* Honeypot: real visitors never see or fill this field. Formspree
          silently discards any submission where "_gotcha" is non-empty. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:border-cobalt hover:bg-cobalt hover:text-paper transition-colors disabled:opacity-50"
      >
        {status === "loading" ? t.sending : t.send}
      </button>
      {status === "error" && <p className="text-sm text-red-600">{t.error}</p>}
    </form>
  );
}
