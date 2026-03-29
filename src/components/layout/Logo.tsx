/**
 * 부모혜택 로고 컴포넌트
 * - 방패 아이콘 + 텍스트 조합
 * - 방패: 보호·혜택의 의미, 파란색 브랜드 컬러
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 방패 배경 */}
        <path
          d="M16 2L4 7v9c0 7.18 5.12 13.4 12 15 6.88-1.6 12-7.82 12-15V7L16 2z"
          fill="#1D4ED8"
        />
        {/* 체크마크 */}
        <path
          d="M12 16.5l3 3 5.5-5.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 사람 실루엣 (상단) */}
        <circle cx="16" cy="10" r="2.2" fill="white" opacity="0.85" />
      </svg>
      <span className="text-xl font-bold text-gray-900">부모혜택</span>
    </span>
  );
}
