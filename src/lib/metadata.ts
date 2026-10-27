import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageMetadata = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: PageMetadata = {}): Metadata {
  const pageTitle = title ?? siteConfig.tagline;
  const canonical = absoluteUrl(path);

  return {
    metadataBase: new URL(siteConfig.url),
    title: title
      ? { default: title, template: `%s | ${siteConfig.name}` }
      : {
          default: `${siteConfig.name} — ${siteConfig.tagline}`,
          template: `%s | ${siteConfig.name}`,
        },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    alternates: { canonical },
    category: "technology",
    keywords: [
      "site profissional",
      "landing page",
      "Next.js",
      "desenvolvimento web",
      "performance web",
      "SEO",
    ],
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
  };
}
