"use client";

import React, { useMemo, useState } from "react";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  message: z.string().min(10).max(2000),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  const schema = useMemo(() => ContactSchema, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "loading" });

    const parsed = schema.safeParse({ name, email, message });
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus({ type: "error", message: data?.error ?? "Something went wrong." });
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setStatus({ type: "success", message: "Message sent successfully. Thank you!" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Network error.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Contact us</h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Send a message using the validated Contact API endpoint.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-sm outline-none focus:border-[color:var(--primary)]"
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name ? <span className="text-xs text-red-600">{errors.name}</span> : null}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-sm outline-none focus:border-[color:var(--primary)]"
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email ? <span className="text-xs text-red-600">{errors.email}</span> : null}
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-1">
        <span className="text-sm font-medium">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[140px] rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-3 text-sm outline-none focus:border-[color:var(--primary)]"
          placeholder="Write your message (min 10 chars)..."
        />
        {errors.message ? <span className="text-xs text-red-600">{errors.message}</span> : null}
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 disabled:opacity-60"
        >
          {status.type === "loading" ? "Sending..." : "Send message"}
        </button>

        <div aria-live="polite" className="text-sm">
          {status.type === "success" ? (
            <span className="font-medium text-green-700">{status.message}</span>
          ) : status.type === "error" ? (
            <span className="font-medium text-red-700">{status.message}</span>
          ) : null}
        </div>
      </div>
    </form>
  );
}

