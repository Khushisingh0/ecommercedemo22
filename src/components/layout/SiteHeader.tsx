import Link from "next/link";
import React from "react";
import { NightModeToggle } from "@/components/theme/NightModeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--card)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[color:var(--foreground)]">
          <span
            className="inline-flex h-3.5 w-3.5 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
            aria-hidden="true"
          />
          BlueCart
        </Link>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary navigation">
          <Link
            href="/"
            className="text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <NightModeToggle />
          </div>

          <details className="sm:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm font-medium shadow-sm">
              Menu
            </summary>
            <div className="mt-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 shadow-sm">
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                <Link href="/" className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-[color:var(--surface)]">
                  Home
                </Link>
                <Link
                  href="/services"
                  className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-[color:var(--surface)]"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-[color:var(--surface)]"
                >
                  Contact
                </Link>
                <div className="pt-2">
                  <NightModeToggle />
                </div>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

