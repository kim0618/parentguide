/**
 * 홈 히어로 일러스트 - 시니어 복지 테마
 * 따뜻한 느낌의 사람+체크+하트 조합 SVG
 * 교체 시 이 컴포넌트만 수정하면 됨
 */
export default function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 배경 원 */}
      <circle cx="200" cy="180" r="150" fill="#DBEAFE" opacity="0.5" />
      <circle cx="200" cy="180" r="110" fill="#BFDBFE" opacity="0.4" />

      {/* 사람 1 - 시니어 (왼쪽) */}
      <circle cx="155" cy="135" r="22" fill="#93C5FD" />
      <path
        d="M130 175c0-14 11-25 25-25s25 11 25 25v45c0 4-3 7-7 7h-36c-4 0-7-3-7-7v-45z"
        fill="#60A5FA"
      />
      {/* 지팡이 */}
      <rect x="122" y="170" width="4" height="60" rx="2" fill="#3B82F6" />
      <path d="M118 228c0-2 2-4 4-4h4c2 0 4 2 4 4v4h-12v-4z" fill="#3B82F6" />

      {/* 사람 2 - 자녀 (오른쪽) */}
      <circle cx="240" cy="140" r="20" fill="#FCA5A5" />
      <path
        d="M218 178c0-12 10-22 22-22s22 10 22 22v40c0 4-3 7-7 7h-30c-4 0-7-3-7-7v-40z"
        fill="#F87171"
      />

      {/* 두 사람 사이 하트 */}
      <path
        d="M197 160c-2-6 3-12 9-12 4 0 7 3 8 6 1-3 4-6 8-6 6 0 11 6 9 12l-17 18-17-18z"
        fill="#EF4444"
        opacity="0.8"
      />

      {/* 체크 방패 - 신뢰 상징 */}
      <g transform="translate(270, 110)">
        <path
          d="M30 5L5 18v22c0 20 11 38 25 46 14-8 25-26 25-46V18L30 5z"
          fill="#1D4ED8"
          opacity="0.15"
        />
        <path
          d="M30 10L10 21v19c0 17 9 32 20 39 11-7 20-22 20-39V21L30 10z"
          fill="#1D4ED8"
          opacity="0.25"
        />
        <path
          d="M22 40l6 6 12-14"
          stroke="#1D4ED8"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* 문서/체크리스트 아이콘 (왼쪽 하단) */}
      <g transform="translate(100, 240)">
        <rect width="40" height="50" rx="5" fill="white" stroke="#93C5FD" strokeWidth="2" />
        <line x1="10" y1="15" x2="30" y2="15" stroke="#BFDBFE" strokeWidth="2" />
        <line x1="10" y1="23" x2="30" y2="23" stroke="#BFDBFE" strokeWidth="2" />
        <line x1="10" y1="31" x2="25" y2="31" stroke="#BFDBFE" strokeWidth="2" />
        <circle cx="10" cy="15" r="2" fill="#3B82F6" />
        <circle cx="10" cy="23" r="2" fill="#3B82F6" />
        <circle cx="10" cy="31" r="2" fill="#3B82F6" />
      </g>

      {/* 동전/혜택 아이콘 (오른쪽 하단) */}
      <g transform="translate(250, 245)">
        <circle cx="20" cy="20" r="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
        <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#D97706">W</text>
      </g>

      {/* 작은 장식 요소들 */}
      <circle cx="130" cy="100" r="4" fill="#93C5FD" opacity="0.6" />
      <circle cx="280" cy="95" r="3" fill="#FCA5A5" opacity="0.6" />
      <circle cx="310" cy="200" r="5" fill="#86EFAC" opacity="0.5" />
      <circle cx="100" cy="200" r="3" fill="#FDE68A" opacity="0.6" />

      {/* 플러스 마크 - 건강/의료 */}
      <g transform="translate(85, 140)" opacity="0.4">
        <rect x="4" y="0" width="4" height="12" rx="2" fill="#10B981" />
        <rect x="0" y="4" width="12" height="4" rx="2" fill="#10B981" />
      </g>
    </svg>
  );
}
