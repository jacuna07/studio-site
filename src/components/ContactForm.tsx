"use client";

import { useState, type FormEvent } from "react";

// TODO: replace with your real Formspree endpoint once you've created a form
// at https://formspree.io (free tier). It will look like:
// https://formspree.io/f/xxxxabcd
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
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
    return <p className="text-lg">Thanks — we&apos;ll be in touch soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm uppercase tracking-wide text-stone mb-2"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-mist px-4 py-3 focus:outline-none focus:border-ink"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm uppercase tracking-wide text-stone mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-mist px-4 py-3 focus:outline-none focus:border-ink"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm uppercase tracking-wide text-stone mb-2"
        >
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full border border-mist px-4 py-3 focus:outline-none focus:border-ink"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-ink px-6 py-3 text-sm uppercase tracking-wide hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong — please try again, or email us directly.
        </p>
      )}
    </form>
  );
}
