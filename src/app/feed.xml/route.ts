import { getAllContent, sortByDate } from '@/lib/content';
import { getSiteUrl, siteConfig } from '@/config/siteConfig';
import { CATEGORY_LABELS } from '@/types/content';

/**
 * RSS 2.0 피드 생성 (정적 빌드)
 * /feed.xml 경로로 접근 가능
 */
export const dynamic = 'force-static';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const base = getSiteUrl();
  const articles = sortByDate(getAllContent());

  const items = articles
    .map((item) => {
      const url = `${base}/guide/${item.slug}/`;
      const category = CATEGORY_LABELS[item.category] ?? item.category;
      const pubDate = new Date(item.createdAt).toUTCString();

      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(item.summary)}</description>
      <category>${escapeXml(category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.siteName)}</title>
    <link>${base}/</link>
    <description>${escapeXml(siteConfig.siteDescription)}</description>
    <language>ko</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
