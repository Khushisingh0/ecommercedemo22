import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore BlueCart services: fast shipping, easy returns, secure payments, and support.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Fast Shipping",
      desc: "Reliable delivery with transparent updates (demo UI).",
    },
    {
      title: "Secure Payments",
      desc: "Modern checkout patterns designed for trust and usability.",
    },
    {
      title: "Easy Returns",
      desc: "Clear return flows and customer-friendly policies.",
    },
    {
      title: "24/7 Support",
      desc: "Contact us with validated input and get help quickly.",
    },
    {
      title: "SEO-Friendly Pages",
      desc: "Metadata, sitemap, and server-rendered content for performance.",
    },
    {
      title: "Night Mode",
      desc: "A theme toggle that switches between light and dark UI styles.",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <header>
        <p className="text-sm font-medium text-[color:var(--primary)]">What we offer</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">Services</h1>
        <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
          This ecommerce demo focuses on UI/UX, responsive layout, SEO basics, and working API
          endpoints.
        </p>
      </header>

      <section className="mt-8 sm:mt-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-sm"
            >
              <h2 className="text-base font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 sm:mt-14 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Need help?</h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Use the contact page to send a message to our validated Contact API (with logic).
        </p>
        <a
          href="/contact"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
        >
          Go to Contact
        </a>
      </section>
    </main>
  );
}

