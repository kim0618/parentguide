import type { RelatedCalculator, CalculatorCTA, FAQ } from './content';

/**
 * 허브 페이지 상세 데이터
 *
 * data/hubs.ts 의 Hub 타입은 내비게이션용 최소 정보만 담음.
 * HubDetail 은 실제 페이지를 구성하는 콘텐츠 필드를 추가로 정의.
 * slug 값이 Hub.slug 와 1:1 대응.
 */
export interface HubDetail {
  /** Hub.slug 와 동일한 값 */
  slug: string;

  /**
   * "이런 상황이라면" 목록 (3~5개 권장)
   * 독자가 자신의 상황과 겹치는 항목을 발견해 페이지를 읽게 유도.
   * 질문형("~하고 싶다", "~모르겠다") 문장 권장.
   */
  situations: string[];

  /**
   * 먼저 읽으면 좋은 핵심 글 slug 목록 (최대 3개)
   * 허브 상단 "이것부터 확인해보세요" 섹션에 크게 표시.
   */
  featuredSlugs?: string[];

  /**
   * 빠른 행동 체크리스트
   * "지금 당장 해야 할 것"을 간결하게 나열.
   * PrepareListBox 컴포넌트에 전달.
   */
  checklist?: string[];

  /**
   * 허브 전용 계산기 CTA
   * 값이 없으면 계산기 섹션 미노출.
   */
  hubCalculator?: {
    calculator: RelatedCalculator;
    cta: CalculatorCTA;
  };

  /** 허브 전용 FAQ */
  faq?: FAQ[];
}
