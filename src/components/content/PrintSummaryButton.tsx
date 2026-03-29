'use client';

interface Props {
  label?: string;
}

/**
 * 인쇄용 요약 버튼
 *
 * 클릭 시 브라우저 인쇄 다이얼로그를 엽니다.
 * 시니어 사용자 중 종이 출력을 선호하는 분들을 위한 기능.
 *
 * 인쇄 레이아웃은 Tailwind print: 유틸 또는 globals.css @media print로 별도 처리.
 *
 * 사용 예:
 *   <PrintSummaryButton />
 *   <PrintSummaryButton label="이 글 인쇄하기" />
 */
export default function PrintSummaryButton({ label = '이 글 인쇄하기' }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-ghost btn-sm"
      aria-label="현재 페이지 인쇄"
    >
      {/* 프린터 아이콘 */}
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"
        />
      </svg>
      {label}
    </button>
  );
}
