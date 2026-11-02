import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SiteJsonLd from "@/components/JsonLd";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/seo";

/**
 * Site-wide default metadata. Every page inherits these values and can override
 * individual fields in its own `page.tsx`.
 *
 * NOTE: the canonical URL is NOT set here on purpose. Child pages inherit
 * `alternates` from the layout, so a canonical of "/" here would tell Google that
 * /journey (and any future page) is a duplicate of the homepage. Each page sets
 * its own canonical instead: see `app/page.tsx` and `app/journey/page.tsx`.
 */
export const metadata: Metadata = {
  // Base used to turn relative URLs ("/og-image.png", "/journey") into absolute
  // ones. Social networks and search engines require absolute URLs.
  metadataBase: new URL(SITE_URL),

  title: {
    // Used on the homepage (and any page that doesn't set its own title)
    default: SITE_TITLE,
    // Sub-pages only set the first part, e.g. title: "Journey"
    // → renders "Journey | Raihan Ahsan"
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  icons: {
    icon: [
      { url: "/img/title.png", type: "image/png" },
    ],
    shortcut: ["/img/title.png"],
    apple: [
      { url: "/img/title.png", type: "image/png" },
    ],
  },
  keywords: [
    "Raihan Ahsan",
    "Software Engineer",
    "Full-Stack Developer",
    "Python Developer",
    "Laravel Developer",
    "Next.js Developer",
    "SaaS",
    "B2B",
    "Portfolio",
  ],

  // Open Graph: controls the preview card on WhatsApp, LinkedIn, Facebook, Slack…
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"], // the site has an ID language toggle
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE], // → public/og-image.png (1200×630)
  },

  // Twitter / X: large image preview card
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: TWITTER_HANDLE, // replace placeholder in lib/seo.ts, or remove if no X account
    images: [OG_IMAGE.url],
  },

  // Explicitly allow indexing, plus large image previews in Google results
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Optional: once you verify the domain in Google Search Console with the
  // "HTML tag" method, paste the token here instead of editing <head> by hand.
  // verification: { google: "YOUR_GOOGLE_VERIFICATION_TOKEN" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className="preloader-active">
        {/*
          JSON-LD structured data (Person + WebSite).
          Placed once in the root layout so it appears in the server-rendered HTML
          of every page. Google reads JSON-LD anywhere in <head> or <body>.
        */}
        <SiteJsonLd />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
