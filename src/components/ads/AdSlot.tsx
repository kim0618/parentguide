'use client';

/**
 * 광고 슬롯 컴포넌트
 *
 * ── 동작 모드 ──────────────────────────────────────────────────
 * 개발(dev)          : 위치·포맷·식별자를 보여주는 점선 플레이스홀더 렌더링
 * 프로덕션, 미연결   : null 반환 (DOM에 흔적 없음)
 * 프로덕션, 연결 완료: 실제 AdSense <ins> 태그 렌더링
 *
 * ── 연결 방법 ──────────────────────────────────────────────────
 * 1. AdSense 콘솔 → "콘텐츠 내 광고" 슬롯 생성
 * 2. 아래 AD_SLOT_MAP 각 위치에 발급된 data-ad-slot 값 입력
 * 3. .env.production에 두 환경변수 설정:
 *      NEXT_PUBLIC_ADSENSE_ENABLED=true
 *      NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxx
 * 4. layout.tsx의 AdSense <Script> 태그 활성화 (주석 해제)
 *
 * ── 배치 원칙 (허용 위치만 이 컴포넌트로 표시됨) ──────────────
 * 금지: 첫 스크린 안 1개 초과
 * 금지: 헤더·대상독자박스·검토상태·3줄요약 영역
 * 금지: 본문(ContentBody) 상단 직하단
 * 금지: numbered-list(신청 절차) 섹션 내부
 * 금지: CautionBox·OfficialSources 인접 (공식 정보로 오인 방지)
 * 허용: 본문 전체가 끝난 직후
 * 허용: OfficialSources 이후 ~ FAQ 사이
 * 허용: 허브 글 목록 하단
 * 허용: 홈 카테고리 섹션 이후
 */

import { useEffect } from 'react';

/* ── AdSense 슬롯 ID 매핑 ──────────────────────────────────────
   AdSense 콘솔에서 슬롯을 생성한 뒤 아래 빈 문자열 자리에
   각 위치의 data-ad-slot 값을 입력하세요.
   비어 있으면 광고가 노출되지 않으나 구조는 그대로 유지됩니다.
   ─────────────────────────────────────────────────────────── */
const AD_SLOT_MAP = {
  /** 가이드 본문(ContentBody) 종료 직후 ~ CautionBox 사이 */
  'guide-mid-content':     '',
  /** 가이드 OfficialSources 이후 ~ FAQSection 사이 */
  'guide-after-sources':   '',
  /** 허브 전체 글 목록 하단 ~ 계산기 CTA 사이 */
  'hub-after-articles':    '',
  /** 홈 카테고리 섹션 이후 ~ PDF·도구 섹션 사이 */
  'home-after-categories': '',
} as const;

export type AdPosition = keyof typeof AD_SLOT_MAP;

type AdFormat = 'auto' | 'rectangle' | 'horizontal';

interface Props {
  /** 광고 삽입 위치 - AD_SLOT_MAP 키와 1:1 대응 */
  position: AdPosition;
  /**
   * 광고 포맷
   *
   * auto       - 반응형 AdSense 기본값 (권장)
   * rectangle  - 300×250 중간 직사각형 (본문 중간 삽입)
   * horizontal - 가로 띠형 (섹션 구분선 위치)
   */
  format?: AdFormat;
  className?: string;
}

/* ── 빌드 타임 상수 (NEXT_PUBLIC_ → 빌드 시 인라인 치환) ─────── */
const IS_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
const AD_CLIENT  = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '';
const IS_DEV     = process.env.NODE_ENV === 'development';

/** 포맷별 최소 높이 (플레이스홀더 + 실제 슬롯 레이아웃 기준) */
const FORMAT_MIN_H: Record<AdFormat, string> = {
  auto:       'min-h-[100px]',
  rectangle:  'min-h-[250px]',
  horizontal: 'min-h-[90px]',
};

export default function AdSlot({ position, format = 'auto', className = '' }: Props) {

  /* adsbygoogle.push - 프로덕션 + 연결 완료 시에만 실행 */
  useEffect(() => {
    if (!IS_ENABLED || !AD_CLIENT) return;
    try {
      (
        (window as Window & { adsbygoogle?: object[] }).adsbygoogle ??= []
      ).push({});
    } catch {
      /* adsbygoogle 스크립트 로드 전 - 스크립트가 자동으로 재처리 */
    }
  }, []);


  /* ── 개발 환경: 위치·포맷 visible placeholder ──────────────── */
  if (IS_DEV) {
    return (
      <div
        className={`my-6 ${className}`}
        role="complementary"
        aria-label={`광고 영역 플레이스홀더 - ${position}`}
      >
        <div
          className={`
            flex flex-col items-center justify-center gap-0.5
            rounded border-2 border-dashed border-gray-200 bg-gray-50
            ${FORMAT_MIN_H[format]}
          `}
        >
          <span className="text-[11px] font-mono font-semibold text-gray-400 select-none">
            광고
          </span>
          <span className="text-[10px] font-mono text-gray-300 select-none">
            {position}
          </span>
          <span className="text-[10px] font-mono text-gray-300 select-none">
            {format}
          </span>
        </div>
      </div>
    );
  }

  /* ── 프로덕션, 미연결: DOM에 아무것도 남기지 않음 ─────────── */
  if (!IS_ENABLED || !AD_CLIENT) return null;


  /* ── 프로덕션 + 연결 완료: 실제 AdSense 슬롯 ──────────────── */
  return (
    <div
      className={`my-6 overflow-hidden ${className}`}
      role="complementary"
      aria-label="광고"
    >
      {/*
        "광고" 고지 레이블 (정보 콘텐츠와의 시각적 구분)
        - 광고임을 명시해 공식 정보 박스와 혼동 방지
        - 우측 정렬: 본문 흐름 방해 최소화
      */}
      <p className="mb-1 text-right text-[10px] leading-none text-gray-400 select-none">
        광고
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT_MAP[position]}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
