"use client";

import { useState, type FormEvent } from "react";
import { actionBarClass, ActionBarArrow } from "./ActionCard";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xljedpak";

type Status = "idle" | "loading" | "success" | "error";
type Locale = "en" | "es";

const copy: Record<
  Locale,
  {
    name: string;
    email: string;
    phone: string;
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
    phone: "Phone (optional)",
    details: "Project details",
    send: "Send",
    sending: "Sending…",
    success: "Thanks. We’ll be in touch soon.",
    error: "Something went wrong. Please try again, or email us directly.",
  },
  es: {
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono (opcional)",
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
          className="block font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-2"
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
          className="block font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-2"
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
          htmlFor="phone"
          className="block font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-2"
        >
          {t.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full bg-mist border border-mist text-paper px-4 py-3 focus:outline-none focus:border-paper"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block font-mono font-bold text-xs uppercase tracking-[0.2em] text-stone mb-2"
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
      {/* A slim bar (half a WhatsApp card's height), sitting under the
          right half of the form so it lines up with the "Contact Javier"
          card further down. */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className={`${actionBarClass} w-[calc(50%-0.5rem)] disabled:opacity-50`}
        >
          <span>{status === "loading" ? t.sending : t.send}</span>
          <ActionBarArrow />
        </button>
      </div>
      {status === "error" && <p className="text-sm text-red-600">{t.error}</p>}
    </form>
  );
}
