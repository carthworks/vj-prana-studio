import type { Metadata } from "next";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "VJ PRANA | Yoga, Nutrition & Wellness Studio in Salem",
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: PageMetadataOptions): Metadata {
  const resolvedOgTitle = ogTitle ?? `${title} | VJ PRANA Salem`;
  const resolvedOgDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "VJ PRANA – Health & Wellness Studio",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url: path,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: ["/twitter-image"],
    },
  };
}
