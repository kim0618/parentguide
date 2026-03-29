/**
 * SEO 메타데이터 팩토리
 *
 * 페이지 유형별로 Next.js Metadata 객체를 생성하는 함수 모음.
 * URL은 metadataBase 기준의 상대 경로로 반환 → 도메인 변경 시 siteConfig만 수정하면 됨.
 *
 * 사용 예:
 *   export async function generateMetadata({ params }) {
 *     const item = getContentBySlug(params.slug);
 *     return buildGuideMetadata(item);
 *   }
 */

import type { Metadata } from 'next';
import type { ContentItem } from '@/types/content';
import type { Hub } from '@/types/navigation';
import { siteConfig } from '@/config/siteConfig';
import { CATEGORY_LABELS } from '@/types/content';


/* ── 가이드 상세 글 ─────────────────────────────────────────── */

/**
 * 가이드 상세 페이지 Metadata.
 *
 * - title: seoTitle 우선, 없으면 title
 * - description: seoDescription 우선, 없으면 summary
 * - og:type: article (published/modified 포함)
 * - canonical: /guide/{slug}/
 */
export function buildGuideMetadata(item: ContentItem): Metadata {
  const title       = item.seoTitle       ?? item.title;
  const description = item.seoDescription ?? item.summary;
  const path        = `/guide/${item.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type:          'article',
      title,
      description,
      url:           path,
      locale:        'ko_KR',
      siteName:      siteConfig.siteName,
      publishedTime: `${item.createdAt}T00:00:00+09:00`,
      modifiedTime:  `${item.updatedAt}T00:00:00+09:00`,
      section:       CATEGORY_LABELS[item.category],
    },
    twitter: {
      card:        'summary',
      title,
      description,
    },
  };
}


/* ── 허브 페이지 ────────────────────────────────────────────── */

/**
 * 허브 페이지 Metadata.
 *
 * - canonical: /hub/{slug}/
 */
export function buildHubMetadata(hub: Hub): Metadata {
  const title       = hub.title;
  const description = hub.description;
  const path        = `${hub.href}/`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type:     'website',
      title,
      description,
      url:      path,
      locale:   'ko_KR',
      siteName: siteConfig.siteName,
    },
    twitter: {
      card:        'summary',
      title,
      description,
    },
  };
}


/* ── 카테고리 페이지 ─────────────────────────────────────────── */

/**
 * 카테고리 목록 페이지 Metadata.
 *
 * - canonical: /category/{slug}/
 */
export function buildCategoryMetadata(
  label:       string,
  description: string,
  slug:        string,
): Metadata {
  const title = `${label} 가이드`;
  const path  = `/category/${slug}/`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type:     'website',
      title,
      description,
      url:      path,
      locale:   'ko_KR',
      siteName: siteConfig.siteName,
    },
    twitter: {
      card:        'summary',
      title,
      description,
    },
  };
}


/* ── 정책·안내 페이지 ────────────────────────────────────────── */

/**
 * 정책·안내 페이지 Metadata.
 *
 * - canonical: /{slug}/
 * - robots: noindex 제외 (policy 페이지는 색인 대상)
 *
 * 사용 예:
 *   export const metadata = buildPolicyMetadata(
 *     '편집 원칙',
 *     '부모혜택이 정보를 작성하는 기준입니다.',
 *     'editorial-policy',
 *   );
 */
export function buildPolicyMetadata(
  title:       string,
  description: string,
  slug:        string,
): Metadata {
  const path = `/${slug}/`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type:     'website',
      title,
      description,
      url:      path,
      locale:   'ko_KR',
      siteName: siteConfig.siteName,
    },
  };
}
