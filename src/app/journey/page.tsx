import type { Metadata } from "next";
import JourneyClient from "@/components/JourneyClient";
import { OG_IMAGE, SITE_NAME, TWITTER_HANDLE } from "@/lib/seo";

const title = "Journey — Education & Internships";
const description =
  "Raihan Ahsan's education, software engineering internships, and the full-stack projects he built with Python, Laravel, and Next.js along the way.";

/**
 * Journey page metadata.
 * - `title` goes through the layout template → "Journey — Education & Internships | Raihan Ahsan"
 * - `canonical` points to /journey (NOT the homepage)
 * - `openGraph` / `twitter` are redefined because Next.js REPLACES these objects
 *   rather than merging them with the layout's, so the image is repeated here.
 */
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/journey",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: "/journey",
    siteName: SITE_NAME,
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
    creator: TWITTER_HANDLE,
    images: [OG_IMAGE.url],
  },
};

export default function JourneyPage() {
  return <JourneyClient />;
}
