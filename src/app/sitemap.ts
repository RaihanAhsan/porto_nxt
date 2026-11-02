import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Generates /sitemap.xml at build time (Next.js Metadata Route).
 * Check it after deploying at: https://www.raihanahsan.site/sitemap.xml
 *
 * To add a page, add one entry to `routes` below. Nothing else needs to change.
 */

type SitemapRoute = {
  /** Path relative to the domain. Use "" for the homepage. */
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  /** 0.0 – 1.0, relative importance within YOUR site only */
  priority: number;
};

const routes: SitemapRoute[] = [
  // Homepage: the most important page
  { path: "", changeFrequency: "monthly", priority: 1 },

  // Journey page (education & internships), already live on the site
  { path: "/journey", changeFrequency: "monthly", priority: 0.8 },

  // Example of adding a future page:
  // { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time is used as the "last modified" date, so every deploy refreshes it.
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
