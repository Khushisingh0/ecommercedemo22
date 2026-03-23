import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = ["/", "/services", "/contact"];
  return urls.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

