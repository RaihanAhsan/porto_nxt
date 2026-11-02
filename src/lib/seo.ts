/**
 * Central SEO configuration.
 *
 * Every SEO-related file (layout metadata, sitemap, robots, JSON-LD) reads from
 * here, so changing the domain or a profile link only has to happen once.
 */

/** Canonical production origin. Always use the `www` version so Google sees one URL. */
export const SITE_URL = "https://www.raihanahsan.site";

export const SITE_NAME = "Raihan Ahsan";

export const SITE_TITLE =
  "Raihan Ahsan — Software Engineer & Full-Stack Developer";

/** About 150–160 characters: long enough to describe the site, short enough not to be cut off in Google results. */
export const SITE_DESCRIPTION =
  "Raihan Ahsan is a Software Engineer & Full-Stack Developer building scalable SaaS & B2B platforms with Python, Laravel, and Next.js.";

export const JOB_TITLE = "Software Engineer & Full-Stack Developer";

/**
 * Social image shown when the site is shared (WhatsApp, LinkedIn, X, Slack…).
 * IMPORTANT: add a 1200×630 PNG at `public/og-image.png`.
 */
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Raihan Ahsan — Software Engineer & Full-Stack Developer",
};

/** Your X/Twitter handle. Replace the placeholder, or remove `creator` in layout.tsx if you don't use X. */
export const TWITTER_HANDLE = "@raihanahsan";

/** Profile links used in the JSON-LD `sameAs` field (helps Google link your profiles to you). */
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/m-raihan-ahsan-fadhilah-288722212/",
  github: "https://github.com/RaihanAhsan",
  instagram: "https://www.instagram.com/sans.af",
};

/** Topics used in the Person schema's `knowsAbout` field. */
export const KNOWS_ABOUT = [
  "Software Engineering",
  "Full-Stack Development",
  "Python",
  "FastAPI",
  "Laravel",
  "PHP",
  "Next.js",
  "React",
  "PostgreSQL",
  "SaaS",
  "B2B Platforms",
];
