import {
  JOB_TITLE,
  KNOWS_ABOUT,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/seo";

/**
 * Generic JSON-LD injector (Server Component: no "use client", zero JS sent to the browser).
 *
 * Structured data tells Google exactly WHO/WHAT a page is about, which can make
 * the site eligible for richer search results and a knowledge panel.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" stops a value containing "</script>" from breaking out of the
      // tag (XSS protection). This is the pattern recommended in the Next.js docs.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Schema.org `Person`: identifies you as the subject of this portfolio. */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  alternateName: "M. Raihan Ahsan Fadhilah",
  jobTitle: JOB_TITLE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  knowsAbout: KNOWS_ABOUT,
  // Links your profiles to the same person (helps Google build a knowledge panel)
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SOCIAL_LINKS.instagram],
};

/** Schema.org `WebSite`: tells Google the site's name and links it to you. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en", "id"],
  publisher: { "@id": `${SITE_URL}/#person` },
};

/** Drop-in component used once in the root layout. */
export default function SiteJsonLd() {
  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
    </>
  );
}
