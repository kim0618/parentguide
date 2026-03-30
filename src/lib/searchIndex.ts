import type { ContentCategory } from '@/types/content';
import { getAllContent } from '@/lib/content';

export interface SearchItem {
  slug: string;
  title: string;
  summary: string;
  category: ContentCategory;
  tags: string[];
}

export const searchIndex: SearchItem[] = getAllContent().map((item) => ({
  slug: item.slug,
  title: item.title,
  summary: item.summary,
  category: item.category,
  tags: item.tags ?? [],
}));
