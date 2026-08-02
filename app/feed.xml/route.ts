import { NextResponse } from "next/server";
import { knowledgeRepository } from "@/features/knowledge/services/knowledge.repository";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smsaad.com";

  const { data: docs } = await knowledgeRepository.getAll({ limit: 50 });

  const rssItemsXml = (docs ?? [])
    .map((doc) => {
      const categorySlug =
        (doc.category as { slug?: string } | null)?.slug ?? "general";
      const pubDate = doc.published_at
        ? new Date(doc.published_at).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${doc.title}]]></title>
      <link>${baseUrl}/knowledge/${categorySlug}/${doc.slug}</link>
      <guid isPermaLink="true">${baseUrl}/knowledge/${categorySlug}/${doc.slug}</guid>
      <description><![CDATA[${doc.description ?? ""}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>SMSAAD Platform 2.0 - Knowledge Feed</title>
    <link>${baseUrl}</link>
    <description>Enterprise Documentation for AI Filmmaking, Visual Effects, and Creative Technology</description>
    <language>en</language>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}
