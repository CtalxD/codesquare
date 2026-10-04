// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

/* [path, date the page content really last changed].
   Update a date only when that page's content changes: Google ignores
   lastModified if it is always "now". */
const pages: [string, string][] = [
  ["", "2026-10-04"],
  ["/services", "2026-10-04"],
  ["/about", "2026-10-03"],
  ["/contact", "2026-10-04"],
  ["/privacy", "2026-10-03"],
  ["/terms", "2026-10-03"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(([path, date]) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(date),
  }));
}
