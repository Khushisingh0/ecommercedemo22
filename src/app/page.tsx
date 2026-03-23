import Link from "next/link";
import type { Metadata } from "next";
import { fetchCategories, fetchProducts } from "@/lib/fakestore";
import { ProductCard } from "@/components/products/ProductCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description: "Browse products from FakeStore API in a responsive BlueCart layout.",
};

export default async function Home() {
  // Vercel build environments sometimes block external APIs; never fail prerender.
  const [products, categories] = await Promise.all([
    fetchProducts().catch(() => []),
    fetchCategories().catch(() => []),
  ]);

  const featured = products.slice(0, 9);
  const topCategories = categories.slice(0, 6);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <section className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-10 sm:px-10">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_55%)]" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[color:var(--primary)]">FakeStore Powered</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Shop the essentials. Built with Next.js, SEO, and night mode.
            </h1>
            <p className="mt-4 text-[color:var(--muted)]">
              A clean ecommerce demo with responsive product listings from the FakeStore API, plus a
              validated Contact API with logic.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
              >
                Contact us
              </Link>
              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-6 text-sm font-semibold text-[color:var(--foreground)] shadow-sm transition hover:bg-[color:var(--surface)]"
              >
                Our services
              </Link>
            </div>
          </div>

          <div className="w-full lg:max-w-[340px]">
            <h2 className="text-sm font-semibold text-[color:var(--foreground)]">Shop by category</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {topCategories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1 text-xs font-medium text-[color:var(--muted)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 sm:mt-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Featured products</h2>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              Latest items from FakeStore API (demo data).
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.length ? (
            featured.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <h3 className="text-sm font-semibold">Products temporarily unavailable</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                The FakeStore API blocked the request during build. Try again later.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-10 sm:mt-14">
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 sm:p-8">
          <h2 className="text-lg font-semibold">Why BlueCart</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { title: "Responsive by design", desc: "Mobile-first layout that looks great on any screen." },
              { title: "SEO + performance", desc: "Server components + cached fetch + metadata & sitemap." },
              { title: "Validated Contact API", desc: "Strict schema validation and rate limiting logic." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4"
              >
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
