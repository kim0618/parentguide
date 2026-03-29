/**
 * 제이퍼 계산기 연계 유틸
 *
 * 설계 원칙:
 * - 실제 공개된 계산기 URL만 사용. 임의 경로 생성 금지.
 * - crossSiteTrackingKey가 있을 때만 UTM 파라미터를 붙임.
 * - CTA 문구는 보조적이어야 함. 과장 문구 금지.
 */

import type { RelatedCalculator, CalculatorCTA } from '@/types/content';
import { siteConfig } from '@/config/siteConfig';


/* ── UTM 파라미터 기준 ──────────────────────────────────────── */

const UTM_SOURCE   = 'parentguide';
const UTM_MEDIUM   = 'cta';


/* ── URL 빌더 ───────────────────────────────────────────────── */

/**
 * 최종 계산기 URL 반환.
 *
 * crossSiteTrackingKey가 있으면 UTM 파라미터를 추가.
 * 없으면 원본 URL 그대로 반환.
 *
 * 사용 예:
 *   const url = buildCalculatorUrl(item.relatedCalculator);
 */
export function buildCalculatorUrl(calculator: RelatedCalculator): string {
  if (!calculator.crossSiteTrackingKey) {
    return calculator.url;
  }
  try {
    const url = new URL(calculator.url);
    url.searchParams.set('utm_source',   UTM_SOURCE);
    url.searchParams.set('utm_medium',   UTM_MEDIUM);
    url.searchParams.set('utm_campaign', calculator.crossSiteTrackingKey);
    return url.toString();
  } catch {
    // URL 파싱 실패 시 원본 반환 (안전 폴백)
    return calculator.url;
  }
}


/* ── 표준 CTA 문구 ──────────────────────────────────────────── */

/**
 * CTA 문구 스타일.
 *
 * calculate - "X로 계산해보기"      (기본, 금융 계산기)
 * verify    - "X에서 확인하기"      (수치 확인 유도)
 * estimate  - "예상 수치를 X에서 확인하기"  (건강·수치 추정)
 */
export type CtaStyle = 'calculate' | 'verify' | 'estimate';

/**
 * 표준 CTA 텍스트 생성.
 *
 * 글 데이터에 calculatorCTA를 직접 지정하는 대신,
 * 이 함수로 일관된 문구를 생성할 수 있음.
 *
 * 사용 예:
 *   calculatorCTA: makeCalculatorCTA('예금 이자 계산기', 'calculate'),
 *   // → { text: '예금 이자 계산기로 계산해보기', subText: '제이퍼 계산기 · 무료' }
 */
export function makeCalculatorCTA(
  calculatorName: string,
  style: CtaStyle = 'calculate',
): CalculatorCTA {
  const subText = `${siteConfig.calculatorSiteName} · 무료`;

  switch (style) {
    case 'verify':
      return {
        text: `${calculatorName}에서 확인하기`,
        subText,
      };
    case 'estimate':
      return {
        text: `예상 수치를 ${calculatorName}에서 확인하기`,
        subText,
      };
    case 'calculate':
    default:
      return {
        text: `${calculatorName}로 계산해보기`,
        subText,
      };
  }
}


/* ── 카테고리별 섹션 제목 ────────────────────────────────────── */

/**
 * 계산기 카테고리에 맞는 섹션 제목 반환.
 * CalculatorCTABox box variant 내부에서 사용.
 */
export function getCalculatorSectionLabel(
  category: RelatedCalculator['category'],
): string {
  return category === 'health' ? '건강 계산기 활용하기' : '금융 계산기 활용하기';
}
