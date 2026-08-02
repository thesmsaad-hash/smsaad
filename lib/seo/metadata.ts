import type { Metadata } from "next";
import type { DocItem, ToolItem } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://smsaad.com";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "SMSAAD";

export function constructMetadata({
  title = `${APP_NAME} — Master AI Video, VFX & Creative Tech`,
  description = "Documentation-first knowledge platform teaching AI video, visual effects, diffusion models, and creative technology from first principles.",
  image = "/og-image.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${APP_NAME}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: APP_NAME,
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
      creator: "@smsaad",
    },
    icons,
    metadataBase: new URL(SITE_URL),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function generateTechArticleJsonLd(doc: any) {
  const authorName =
    typeof doc.author === "string"
      ? doc.author
      : doc.author?.full_name || doc.author?.name || "SMSAAD Team";

  const tagsFormatted = Array.isArray(doc.tags)
    ? doc.tags.map((t: any) => (typeof t === "string" ? t : t.tag?.name || t.name)).filter(Boolean).join(", ")
    : "";

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.description ?? "",
    image: doc.cover_image || doc.coverImage || "",
    datePublished: doc.published_at || doc.publishedDate || new Date().toISOString(),
    dateModified: doc.published_at || doc.updatedDate || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    proficiencyLevel: doc.difficulty ?? "Intermediate",
    dependencies: tagsFormatted,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/knowledge/${(doc.category as any)?.slug ?? "general"}/${doc.slug}`,
    },
  };
}

export function generateSoftwareApplicationJsonLd(tool: any) {
  const price = tool.starting_price || tool.pricing?.startingPrice || "Free";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.tagline ?? "",
    applicationCategory: tool.category ?? "AI Tool",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating || "4.8",
      ratingCount: tool.rating_count || "124",
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/smsaad",
      "https://github.com/smsaad",
      "https://youtube.com/smsaad",
    ],
  };
}
