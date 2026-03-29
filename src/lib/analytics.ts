/**
 * 이벤트 추적 공통 모듈
 *
 * ── 동작 모드 ───────────────────────────────────────────────────
 * 개발(dev)        : console.log('[analytics] ...')
 * 프로덕션, 미연결  : noop (window.gtag 없으면 조용히 무시)
 * 프로덕션, GA4 연결: window.gtag('event', name, params) 호출
 *
 * ── GA4 연결 방법 ───────────────────────────────────────────────
 * 1. Google Analytics 속성 생성 → 측정 ID 확인 (G-XXXXXXXXXX)
 * 2. .env.production 에 추가:
 *      NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 3. layout.tsx 에 GA4 Script 태그 추가 (AdSlot.tsx 패턴 참고)
 *
 * ── 이벤트 명명 규칙 ─────────────────────────────────────────────
 * - snake_case, 최대 40자 (GA4 권장)
 * - {대상}_{행동} 패턴: hub_card_click, jptcalc_click 등
 * - 제이퍼 계산기: jptcalc_click(통합) + jptcalc_{category}_click(분류)
 *
 * ── 이벤트 목록 ──────────────────────────────────────────────────
 * hub_card_click         - 허브 카드 클릭 (홈·카테고리 등 목록 맥락)
 * hub_article_click      - 허브 페이지 내 상세 글 카드 클릭
 * official_source_click  - 공식기관 외부 링크 클릭
 * jptcalc_click          - 제이퍼 계산기 이동 (카테고리 무관 통합)
 * jptcalc_finance_click  - 제이퍼 금융 계산기 이동
 * jptcalc_health_click   - 제이퍼 건강 계산기 이동
 * pdf_download_click     - PDF 다운로드 버튼 클릭
 * home_cta_click         - 홈 히어로 CTA 클릭
 */


/* ── 이벤트 파라미터 타입 ────────────────────────────────────────── */

/** 제이퍼 계산기 클릭 파라미터 */
export interface JptcalcParams {
  /** 계산기 이름 (예: 'BMI 계산기') */
  calculator_name: string;
  /**
   * 교차 사이트 추적 키 (RelatedCalculator.crossSiteTrackingKey)
   * 예: 'guide-health-checkup-bmi' - 어떤 글에서 이동했는지 식별
   */
  tracking_key: string;
  /** 계산기 카테고리 */
  category: 'finance' | 'health';
  /** 이 CTA가 노출된 페이지 유형 */
  context: 'guide' | 'hub' | 'home';
  /** 해당 페이지의 slug (article slug 또는 hub slug) */
  context_slug: string;
  /** CTA 컴포넌트 variant */
  position: 'bar' | 'box' | 'inline';
}

/** 허브 카드 클릭 파라미터 (목록 맥락 → 허브 페이지) */
export interface HubCardParams {
  hub_slug: string;
  hub_title: string;
  /** 카드가 노출된 페이지 (예: 'home', 'category-pension-welfare') */
  source_page: string;
}

/** 허브 내 상세글 카드 클릭 파라미터 (허브 → 글) */
export interface HubArticleParams {
  hub_slug: string;
  article_slug: string;
  article_title: string;
  /** featuredSlugs 기반 강조 카드 여부 */
  is_featured: boolean;
}

/** 공식기관 링크 클릭 파라미터 */
export interface OfficialSourceParams {
  /** 기관명 (예: '국민건강보험공단') */
  source_name: string;
  /** 클릭된 외부 URL */
  source_url: string;
  /** 해당 글 slug */
  article_slug: string;
}

/** PDF 다운로드 클릭 파라미터 */
export interface PdfDownloadParams {
  pdf_id: string;
  pdf_title: string;
  /** 파일 준비 상태 - coming-soon 클릭도 의도 신호로 수집 */
  status: 'available' | 'coming-soon';
}

/** 홈 히어로 CTA 클릭 파라미터 */
export interface HomeCtaParams {
  /** 버튼 레이블 텍스트 */
  cta_label: string;
  /** 버튼 위치 식별자 (예: 'hero-primary', 'hero-secondary') */
  cta_position: string;
}


/* ── 이벤트 이름 → 파라미터 타입 매핑 ───────────────────────────── */

export interface EventParamMap {
  hub_card_click:        HubCardParams;
  hub_article_click:     HubArticleParams;
  official_source_click: OfficialSourceParams;
  jptcalc_click:         JptcalcParams;
  jptcalc_finance_click: JptcalcParams;
  jptcalc_health_click:  JptcalcParams;
  pdf_download_click:    PdfDownloadParams;
  home_cta_click:        HomeCtaParams;
}

export type EventName = keyof EventParamMap;


/* ── trackEvent() ────────────────────────────────────────────────
   타입 안전한 이벤트 발송 함수.
   이 함수는 반드시 브라우저 컨텍스트(onClick 등)에서만 호출할 것.
   ─────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: object) => void;
  }
}

export function trackEvent<T extends EventName>(
  name: T,
  params: EventParamMap[T],
): void {
  /* 개발 환경: 콘솔에 이벤트 출력 */
  if (process.env.NODE_ENV === 'development') {
    console.log(`[analytics] ${name}`, params);
  }

  /* 프로덕션: GA4 gtag 호출 (미연결이면 조용히 무시) */
  if (typeof window !== 'undefined') {
    window.gtag?.('event', name, params as object);
  }
}


/* ── 제이퍼 계산기 전용 헬퍼 ─────────────────────────────────────
   jptcalc_click (통합) + jptcalc_{category}_click (분류) 동시 발송.
   두 이벤트를 쌍으로 발송해 GA4에서 통합/분류 두 가지로 분석 가능.
   ─────────────────────────────────────────────────────────── */

export function trackJptcalcClick(params: JptcalcParams): void {
  trackEvent('jptcalc_click', params);

  if (params.category === 'finance') {
    trackEvent('jptcalc_finance_click', params);
  } else if (params.category === 'health') {
    trackEvent('jptcalc_health_click', params);
  }
}
