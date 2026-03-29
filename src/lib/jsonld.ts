/**
 * JSON-LD 구조화 데이터 빌더
 *
 * 지원 스키마:
 *   Organization  - 사이트 운영 주체 (루트 레이아웃에 1회 삽입)
 *   WebSite       - 사이트 전체 메타 (루트 레이아웃에 1회 삽입)
 *   Article       - 가이드 상세 글
 *   FAQPage       - FAQ가 있는 페이지
 *   HowTo         - numbered-list 섹션이 있는 절차형 글
 *   BreadcrumbList - 페이지 경로 (모든 상세 페이지)
 *   WebPage       - 허브·카테고리·정책 페이지
 *
 * 원칙:
 * - 절대 URL은 getSiteUrl() 기반으로 생성 (하드코딩 금지)
 * - HowTo는 template === 'checklist' 또는 'policy' AND numbered-list 섹션 존재 시만 적용
 * - 반환 타입은 plain object (직렬화는 JsonLd 컴포넌트에서 처리)
 */

import type { ContentItem, FAQ } from '@/types/content';
import { siteConfig, getSiteUrl } from '@/config/siteConfig';


/* ── 공통 헬퍼 ──────────────────────────────────────────────── */

function abs(path: string): string {
  return `${getSiteUrl()}${path}`;
}


/* ── Organization ───────────────────────────────────────────── */

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.siteName,
    alternateName: siteConfig.siteAltName,
    url: getSiteUrl(),
    description: siteConfig.siteDescription,
  };
}


/* ── WebSite ────────────────────────────────────────────────── */

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: getSiteUrl(),
    description: siteConfig.siteDescription,
    inLanguage: 'ko-KR',
  };
}


/* ── BreadcrumbList ─────────────────────────────────────────── */

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * BreadcrumbList JSON-LD 생성.
 *
 * 호출 예 (가이드 상세):
 *   buildBreadcrumbJsonLd([
 *     { name: '홈', href: '/' },
 *     { name: '건강보험·검진·돌봄', href: '/category/health-care/' },
 *     { name: '국가건강검진 가이드', href: '/guide/national-health-checkup-guide/' },
 *   ])
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}


/* ── Article ────────────────────────────────────────────────── */

export function buildArticleJsonLd(item: ContentItem) {
  const url = abs(`/guide/${item.slug}/`);
  const title = item.seoTitle ?? item.title;
  const description = item.seoDescription ?? item.summary;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: `${item.createdAt}T00:00:00+09:00`,
    dateModified: `${item.updatedAt}T00:00:00+09:00`,
    inLanguage: 'ko-KR',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: getSiteUrl(),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}


/* ── FAQPage ────────────────────────────────────────────────── */

export function buildFaqPageJsonLd(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}


/* ── HowTo ──────────────────────────────────────────────────── */

/**
 * HowTo JSON-LD 생성.
 *
 * 적용 조건:
 * - template === 'checklist' 또는 'policy'
 * - ContentSection 중 type === 'numbered-list' AND heading 존재
 *
 * step name 추출: item 문자열에서 ': ' 앞 20자 이내를 제목으로 사용.
 * 예: '신청: 주민센터 방문 또는 복지로 온라인 신청' → '신청'
 *     'nhis.or.kr 에서 검진기관 확인'              → 그대로 사용
 */
export function buildHowToJsonLd(item: ContentItem): object | null {
  if (item.template !== 'checklist' && item.template !== 'policy') return null;
  if (!item.sections) return null;

  const numberedSection = item.sections.find(
    (s) => s.type === 'numbered-list' && s.heading && s.items && s.items.length > 0,
  );
  if (!numberedSection || !numberedSection.items) return null;

  const title = item.seoTitle ?? item.title;
  const description = item.seoDescription ?? item.summary;

  const steps = numberedSection.items.map((raw, idx) => {
    const colonIdx = raw.indexOf(': ');
    const name =
      colonIdx > 0 && colonIdx <= 20
        ? raw.slice(0, colonIdx)
        : raw.slice(0, 40);
    const text = colonIdx > 0 && colonIdx <= 20 ? raw.slice(colonIdx + 2) : raw;
    return {
      '@type': 'HowToStep',
      position: idx + 1,
      name,
      text,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    inLanguage: 'ko-KR',
    step: steps,
  };
}


/* ── WebPage ────────────────────────────────────────────────── */

export function buildWebPageJsonLd(params: {
  title: string;
  description: string;
  path: string;
}) {
  const url = abs(params.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: params.title,
    description: params.description,
    url,
    inLanguage: 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.siteName,
      url: getSiteUrl(),
    },
  };
}


/* ── HowTo 적용 가능 여부 확인 ─────────────────────────────── */

/** HowTo JSON-LD를 적용할 수 있는 ContentItem인지 확인 */
export function isHowToEligible(item: ContentItem): boolean {
  if (item.template !== 'checklist' && item.template !== 'policy') return false;
  return !!(item.sections?.some(
    (s) => s.type === 'numbered-list' && s.heading && s.items && s.items.length > 0,
  ));
}
