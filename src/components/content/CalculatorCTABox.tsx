'use client';

import type { RelatedCalculator, CalculatorCTA } from '@/types/content';
import { buildCalculatorUrl, getCalculatorSectionLabel } from '@/lib/calculator';
import { trackJptcalcClick } from '@/lib/analytics';

interface Props {
  calculator: RelatedCalculator;
  cta: CalculatorCTA;
  /**
   * 표시 방식
   *
   * box    (기본) - box-info 스타일 블록. 본문 중간·하단에 사용.
   * bar          - 가로 줄 띠형. 섹션 상단이나 섹션 사이에 사용.
   * inline       - 텍스트 흐름 안에 녹인 작은 링크. 문단 직후에 사용.
   *
   * 배치 원칙:
   * - 계산기 CTA는 relatedCalculator + calculatorCTA가 모두 있는 경우에만 호출.
   * - 정보 읽는 흐름을 끊지 않아야 함.
   * - calculator 템플릿 상단 → bar, 본문 하단 → box, 문단 직후 → inline.
   */
  variant?: 'box' | 'bar' | 'inline';
  /**
   * 추적용 페이지 맥락 (jptcalc_click 이벤트의 context/context_slug 필드)
   * 예: { source: 'guide', slug: 'national-health-checkup-guide' }
   */
  trackingContext?: {
    source: 'guide' | 'hub' | 'home';
    slug: string;
  };
}

/**
 * 제이퍼 계산기 CTA 컴포넌트
 *
 * variant에 따라 세 가지 레이아웃으로 렌더링됨.
 * 외부 링크는 항상 새 탭으로 열리며 ↗ 아이콘으로 명시.
 * crossSiteTrackingKey가 있으면 UTM 파라미터가 자동으로 붙음.
 * 클릭 시 jptcalc_click + jptcalc_{category}_click 이벤트 동시 발송.
 *
 * 사용 예:
 *   {item.relatedCalculator && item.calculatorCTA && (
 *     <CalculatorCTABox
 *       calculator={item.relatedCalculator}
 *       cta={item.calculatorCTA}
 *       variant="bar"
 *       trackingContext={{ source: 'guide', slug: item.slug }}
 *     />
 *   )}
 */
export default function CalculatorCTABox({
  calculator,
  cta,
  variant = 'box',
  trackingContext,
}: Props) {
  const href = buildCalculatorUrl(calculator);
  const ariaLabel = `${cta.text} - ${calculator.brand} (새 탭에서 열림)`;

  function handleClick() {
    trackJptcalcClick({
      calculator_name: calculator.name,
      tracking_key:    calculator.crossSiteTrackingKey ?? '',
      category:        calculator.category,
      context:         trackingContext?.source ?? 'guide',
      context_slug:    trackingContext?.slug   ?? '',
      position:        variant ?? 'box',
    });
  }


  /* ── bar: 가로 줄 띠형 ─────────────────────────────────────── */
  if (variant === 'bar') {
    return (
      <div
        className="flex flex-wrap items-center justify-between gap-3
                   rounded-lg border border-blue-200 bg-blue-50 px-5 py-3.5"
        aria-label="관련 계산기 안내"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 text-blue-500 text-base" aria-hidden="true">
            🧮
          </span>
          <div className="min-w-0">
            <span className="text-sm font-medium text-blue-900">
              {cta.text}
            </span>
            {cta.subText && (
              <span className="ml-2 text-xs text-blue-600 opacity-80">
                {cta.subText}
              </span>
            )}
          </div>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sm btn-outline shrink-0 no-underline text-sm"
          aria-label={ariaLabel}
          onClick={handleClick}
        >
          {calculator.name}
          <span aria-hidden="true" className="ml-1 text-blue-400">↗</span>
          <span className="sr-only"> (새 탭에서 열림)</span>
        </a>
      </div>
    );
  }

  /* ── inline: 텍스트 흐름 안 링크 ───────────────────────────── */
  if (variant === 'inline') {
    return (
      <p className="text-sm text-gray-600" aria-label="관련 계산기 안내">
        <span aria-hidden="true" className="mr-1 text-blue-500">→</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-700"
          aria-label={ariaLabel}
          onClick={handleClick}
        >
          {cta.text}
          <span aria-hidden="true" className="ml-0.5 text-blue-400 text-xs">↗</span>
          <span className="sr-only"> (새 탭에서 열림)</span>
        </a>
        {cta.subText && (
          <span className="ml-1.5 text-gray-400">({cta.subText})</span>
        )}
      </p>
    );
  }

  /* ── box: 기본 블록형 ──────────────────────────────────────── */
  return (
    <div className="box-info" aria-label="관련 계산기 안내">
      <p className="box-title">{getCalculatorSectionLabel(calculator.category)}</p>

      <p className="mt-1 mb-0 text-sm">
        <strong>{calculator.name}</strong>으로 직접 계산해볼 수 있습니다.
      </p>

      <div className="mt-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex no-underline"
          aria-label={ariaLabel}
          onClick={handleClick}
        >
          {cta.text}
          <span aria-hidden="true" className="ml-1 text-blue-400">↗</span>
          <span className="sr-only"> (새 탭에서 열림)</span>
        </a>

        {cta.subText && (
          <p className="mt-1.5 mb-0 text-sm text-blue-700 opacity-80">
            {cta.subText}
          </p>
        )}
      </div>
    </div>
  );
}
