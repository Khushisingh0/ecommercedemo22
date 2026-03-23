import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact BlueCart using our validated Contact API with input logic and rate limiting.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <header>
        <p className="text-sm font-medium text-[color:var(--primary)]">Get in touch</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">Contact</h1>
        <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
          This page includes a validated form that sends a request to the server API route
          at <code className="rounded bg-[color:var(--surface)] px-2 py-1 text-xs">/api/contact</code>.
        </p>
      </header>

      <section className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 sm:p-8">
            <h2 className="text-base font-semibold">Quick links</h2>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/"
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-[color:var(--surface)]"
              >
                Home / Products
              </Link>
              <Link
                href="/services"
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-[color:var(--surface)]"
              >
                Services
              </Link>
            </div>

            <div className="mt-8">
              <h2 className="text-base font-semibold">API logic included</h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-[color:var(--muted)]">
                <li>Schema validation (name/email/message)</li>
                <li>Rate limiting (demo in-memory)</li>
                <li>Optional forwarding to `CONTACT_WEBHOOK_URL`</li>
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

