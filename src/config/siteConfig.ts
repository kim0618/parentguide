/**
 * 사이트 공통 설정
 *
 * 브랜드명·설명·URL 등은 이 파일에서만 관리.
 * 다른 파일에 문자열로 흩어 쓰지 말 것.
 *
 * 배포 전 productionSiteUrl을 실제 도메인으로 확정하면
 * canonical / og:url / sitemap이 자동으로 올바르게 반영됨.
 */

export const siteConfig = {

  /* ── 사이트 브랜드 ──────────────────────────────── */

  /** 사이트 이름 (헤더, 타이틀, OG 등 공식 표기) */
  siteName: '부모혜택',

  /** 보조 표기 (푸터, 소개 문구, 보조 OG 등) */
  siteAltName: '부모혜택 by 제이퍼',

  /**
   * 운영 도메인
   * URL이 아닌 도메인만 필요한 곳에서 사용
   */
  siteDomain: 'bumohyetaek.kr',

  /**
   * 운영 사이트 전체 URL
   * canonical / og:url / sitemap은 이 값을 기준으로 생성.
   * 개발 중에는 getSiteUrl()을 통해 환경별로 분기할 것.
   */
  productionSiteUrl: 'https://www.bumohyetaek.kr',


  /* ── 사이트 설명 ────────────────────────────────── */

  /** 핵심 설명 (meta description, og:description 기본값) */
  siteDescription: '부모님과 시니어가 꼭 알아야 할 복지·건강보험·은퇴 실무 가이드',

  /** 보조 설명 (홈 히어로, 푸터, 소개 페이지 등) */
  siteSubDescription:
    '부모님 혜택부터 건강보험, 연금, 돌봄 정보까지 쉽게 정리한 생활 가이드',


  /* ── SEO / OG 기본값 ───────────────────────────── */

  /**
   * 기본 OG 제목 (<title>과 별도로 관리)
   * 개별 페이지에서 override하지 않으면 이 값이 사용됨
   */
  defaultOgTitle: '부모혜택 | 부모님·시니어 복지·건강보험·은퇴 실무 가이드',

  /**
   * 기본 OG 설명 (siteDescription과 동일하게 유지해도 무방하나
   * 소셜 카드용으로 별도 조정 가능)
   */
  defaultOgDescription:
    '부모님과 시니어가 꼭 알아야 할 복지·건강보험·은퇴 실무 가이드. 연금·복지·혜택, 건강보험·검진·돌봄, 금융·생활안전까지 한곳에서.',


  /* ── 제이퍼 계산기 연계 ─────────────────────────── */

  /**
   * 연계 계산기 서비스명 (화면 표시용)
   * RelatedCalculator.brand 기본값으로 사용
   */
  calculatorSiteName: '제이퍼 계산기',

  /** 영문 보조 표기 (버튼, 소개 텍스트 등) */
  calculatorSiteAltName: 'JPT Calc',

  /**
   * 제이퍼 계산기 기본 URL (trailing slash 포함)
   * 실제 계산기 URL은 RelatedCalculator.url 에 직접 입력
   */
  calculatorSiteUrl: 'https://www.jptcalc.kr/',

} as const;


/* ── URL 환경 분기 함수 ──────────────────────────────────────── */

/**
 * 환경에 따라 사이트 기준 URL을 반환.
 *
 * - 개발(local):    http://localhost:3000
 * - 스테이징:        NEXT_PUBLIC_SITE_URL 환경변수 값
 * - 프로덕션 / 빌드: productionSiteUrl
 *
 * canonical, og:url, sitemap 생성 시 반드시 이 함수를 사용할 것.
 * productionSiteUrl을 직접 하드코딩하면 개발 중 SEO 신호가 오염됨.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  return siteConfig.productionSiteUrl;
}

/**
 * 글 상세 페이지 canonical URL 생성 헬퍼
 * 예: getGuideUrl('basic-pension-application') → '{siteUrl}/guide/basic-pension-application/'
 */
export function getGuideUrl(slug: string): string {
  return `${getSiteUrl()}/guide/${slug}/`;
}

/**
 * 카테고리 페이지 canonical URL 생성 헬퍼
 * 예: getCategoryUrl('pension-welfare') → '{siteUrl}/category/pension-welfare/'
 */
export function getCategoryUrl(category: string): string {
  return `${getSiteUrl()}/category/${category}/`;
}
