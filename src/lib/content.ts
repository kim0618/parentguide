/**
 * 콘텐츠 쿼리 유틸
 *
 * 현재: src/data/articles/*.ts 의 TS 배열을 여기서 합산해 반환
 * MDX 전환 시: gray-matter 등으로 파싱 로직을 이 파일에서 처리,
 *              나머지 컴포넌트·페이지 변경 최소화
 */

import type { ContentItem, ContentListItem, ContentCategory } from '@/types/content';
import { pensionWelfareArticles } from '@/data/articles/pension-welfare';
import { healthCareArticles } from '@/data/articles/health-care';
import { financeSafetyArticles } from '@/data/articles/finance-safety';

/* ── 전체 콘텐츠 합산 ─────────────────────────────────────────── */

/** 전체 콘텐츠 반환 (모든 카테고리 합산) */
export function getAllContent(): ContentItem[] {
  return [
    ...pensionWelfareArticles,
    ...healthCareArticles,
    ...financeSafetyArticles,
  ];
}


/* ── 기본 필터/정렬 ───────────────────────────────────────────── */

/** 최신순 정렬 (updatedAt 기준, 동일 시 createdAt 기준) */
export function sortByDate(items: ContentItem[]): ContentItem[] {
  return [...items].sort((a, b) => {
    const diff = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (diff !== 0) return diff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/** 카테고리별 콘텐츠 반환 (최신순) */
export function getContentByCategory(category: ContentCategory): ContentItem[] {
  return sortByDate(getAllContent().filter((item) => item.category === category));
}

/** slug로 콘텐츠 단건 반환 */
export function getContentBySlug(slug: string): ContentItem | undefined {
  return getAllContent().find((item) => item.slug === slug);
}


/* ── 목록 페이지용 ────────────────────────────────────────────── */

/**
 * 목록 페이지용 요약 데이터 반환
 * sections(본문)·faq를 제외한 메타데이터만 포함
 * MDX 전환 후 frontmatter 파싱 결과와 동일한 구조
 */
export function getContentListItems(
  items: ContentItem[],
): ContentListItem[] {
  return items.map(({ sections: _sections, faq: _faq, ...rest }) => rest);
}

/** 카테고리별 목록 요약 반환 */
export function getCategoryListItems(category: ContentCategory): ContentListItem[] {
  return getContentListItems(getContentByCategory(category));
}


/* ── 허브 페이지용 ────────────────────────────────────────────── */

/**
 * 허브 slug에 연결된 콘텐츠 반환 (ContentItem.hubKey 기준)
 * 허브 페이지에서 "관련 글" 목록을 구성할 때 사용
 */
export function getContentByHubKey(hubSlug: string): ContentItem[] {
  return sortByDate(
    getAllContent().filter((item) => item.hubKey?.includes(hubSlug)),
  );
}


/* ── 홈 페이지용 ──────────────────────────────────────────────── */

/**
 * isFeatured가 true인 글 반환 (최신순)
 * 홈 페이지 주목 섹션, 카테고리 상단 노출 등에 사용
 */
export function getFeaturedContent(limit?: number): ContentItem[] {
  const featured = sortByDate(
    getAllContent().filter((item) => item.isFeatured === true),
  );
  return limit ? featured.slice(0, limit) : featured;
}


/* ── 상세 페이지용 ────────────────────────────────────────────── */

/**
 * 연관 글 반환 (relatedSlugs + 같은 허브 + 같은 카테고리 순으로 보충)
 * 상세 페이지 하단 "관련 글" 섹션에 사용
 */
export function getRelatedContent(slug: string, limit = 4): ContentListItem[] {
  const item = getContentBySlug(slug);
  if (!item) return [];

  const seen = new Set<string>([slug]);
  const result: ContentItem[] = [];

  // 1순위: 수동 지정된 relatedSlugs
  if (item.relatedSlugs?.length) {
    for (const s of item.relatedSlugs) {
      if (seen.has(s)) continue;
      const related = getContentBySlug(s);
      if (related) { result.push(related); seen.add(s); }
    }
  }

  // 2순위: 같은 허브에 속한 글
  if (result.length < limit && item.hubKey?.length) {
    const all = getAllContent();
    for (const a of all) {
      if (result.length >= limit) break;
      if (seen.has(a.slug)) continue;
      if (a.hubKey?.some((h) => item.hubKey?.includes(h))) {
        result.push(a); seen.add(a.slug);
      }
    }
  }

  // 3순위: 같은 카테고리
  if (result.length < limit) {
    const siblings = getContentByCategory(item.category);
    for (const a of siblings) {
      if (result.length >= limit) break;
      if (seen.has(a.slug)) continue;
      result.push(a); seen.add(a.slug);
    }
  }

  return getContentListItems(result.slice(0, limit));
}

/**
 * 같은 카테고리의 다른 글 반환 (현재 글 제외, 최신 N개)
 * 상세 페이지 하단 "더 보기" 섹션에 사용
 */
export function getSiblingContent(
  slug: string,
  limit = 3,
): ContentListItem[] {
  const item = getContentBySlug(slug);
  if (!item) return [];

  const siblings = getContentByCategory(item.category)
    .filter((i) => i.slug !== slug)
    .slice(0, limit);

  return getContentListItems(siblings);
}


/* ── 태그 기반 ────────────────────────────────────────────────── */

/** 특정 태그를 포함하는 글 반환 */
export function getContentByTags(tags: string[]): ContentItem[] {
  return sortByDate(
    getAllContent().filter((item) =>
      item.tags?.some((tag) => tags.includes(tag)),
    ),
  );
}


/* ── Static params (App Router generateStaticParams 용) ─────── */

/** 전체 slug 목록 반환 (guide/[slug] generateStaticParams에서 사용) */
export function getAllSlugs(): { slug: string }[] {
  return getAllContent().map((item) => ({ slug: item.slug }));
}
