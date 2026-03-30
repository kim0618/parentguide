import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/config/siteConfig';
import { categories } from '@/data/categories';
import { hubs } from '@/data/hubs';
import { getAllContent, sortByDate } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date().toISOString().split('T')[0];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about/`,              lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/editorial-policy/`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/source-policy/`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/update-policy/`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/disclaimer/`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/contact/`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/privacy-policy/`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}${c.href}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const hubRoutes: MetadataRoute.Sitemap = hubs.map((h) => ({
    url: `${base}${h.href}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const contentRoutes: MetadataRoute.Sitemap = sortByDate(getAllContent()).map(
    (item) => ({
      url: `${base}/guide/${item.slug}/`,
      lastModified: item.updatedAt ?? item.createdAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...categoryRoutes, ...hubRoutes, ...contentRoutes];
}
