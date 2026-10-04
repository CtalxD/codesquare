// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

/* Update this date when page content really changes.
   Google ignores lastModified if it is always "now". */
const LAST_UPDATED = new Date("2026-10-03");

const routes = ["", "/services", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_UPDATED,
  }));
}