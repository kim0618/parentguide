import type { ContentCategory } from './content';

/**
 * 상단 내비게이션 카테고리
 * data/categories.ts 의 실제 데이터와 1:1 대응
 */
export interface Category {
  /** ContentCategory와 동일한 slug */
  slug: ContentCategory;
  /** 내비게이션·헤딩 표시용 한글 레이블 */
  label: string;
  /** 카테고리 목록 페이지 설명 (meta description) */
  description: string;
  /** 카테고리 목록 페이지 href */
  href: string;
}

/**
 * 상황형 허브 (5개)
 * 카테고리를 가로지르는 "상황·목적" 중심 큐레이션 페이지
 */
export interface Hub {
  /** URL slug (예: 'prepare-care') */
  slug: string;
  /** 허브 제목 */
  title: string;
  /** 허브 한 줄 설명 */
  description: string;
  /** 허브 페이지 href */
  href: string;
  /** 이 허브와 연관된 카테고리 (1개 이상) */
  relatedCategories: ContentCategory[];
}

/** 공통 내비게이션 링크 */
export interface NavLink {
  label: string;
  href: string;
  /** 외부 링크 여부 */
  external?: boolean;
}
