import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Generates /robots.txt at build time (Next.js Metadata Route).
 * Check it after deploying at: https://www.raihanahsan.site/robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Applies to every crawler (Googlebot, Bingbot, etc.)
        userAgent: "*",
        allow: [
          "/",
          // Google renders pages like a browser and needs your JS/CSS bundles and
          // optimized images to see the content. Under robots.txt rules the longest
          // matching path wins, so these more specific `allow` entries override the
          // broader `/_next/` disallow below and keep rendering working.
          "/_next/static/",
          "/_next/image",
        ],
        disallow: [
          "/api/", // API routes return data, not pages; no reason to index them
          "/_next/", // Next.js internals (everything except the paths allowed above)
        ],
      },
    ],
    // Tells crawlers where to find the full list of pages
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
