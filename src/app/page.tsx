import type { Metadata } from "next";
import PortfolioClient from "@/components/PortfolioClient";

/**
 * Homepage metadata. Title, description, Open Graph and Twitter come from the
 * root layout. Only the canonical URL is set here, so it applies to "/" alone.
 */
export const metadata: Metadata = {
  // Resolves to https://www.raihanahsan.site/ via metadataBase.
  // This makes ?utm_source=..., ?ref=... etc. all count as the same page.
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <PortfolioClient />;
}
