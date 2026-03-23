import Link from "next/link";
import React from "react";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--card)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <span
                className="inline-flex h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: "var(--primary)" }}
                aria-hidden="true"
              />
              BlueCart
            </div>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              Modern ecommerce UI demo with responsive design, SEO basics, FakeStore API integration,
              and theme switching (night mode).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            <Link className="text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]" href="/">
              Home
            </Link>
            <Link
              className="text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
              href="/services"
            >
              Services
            </Link>
            <Link
              className="col-span-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)] sm:col-span-1"
              href="/contact"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-[color:var(--muted)]">
          © {new Date().getFullYear()} BlueCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

