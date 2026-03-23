import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function safeMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      // If env is invalid, fall back to local URL.
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: safeMetadataBase(),
  title: {
    default: "BlueCart",
    template: "%s | BlueCart",
  },
  description:
    "A modern ecommerce demo using Next.js, FakeStore API, responsive UI, SEO, and theme (night mode).",
  openGraph: {
    title: "BlueCart",
    description:
      "A modern ecommerce demo using Next.js, FakeStore API, responsive UI, SEO, and theme (night mode).",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueCart",
    description:
      "A modern ecommerce demo using Next.js, FakeStore API, responsive UI, SEO, and theme (night mode).",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
