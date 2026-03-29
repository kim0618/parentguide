import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    // MDX 전환 시 아래 줄 추가:
    // './src/content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', '"Helvetica Neue"', '"Segoe UI"', '"Apple SD Gothic Neo"', '"Noto Sans KR"', '"Malgun Gothic"', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
      },
      colors: {
        brand: {
          // blue-700 (#1D4ED8): 흰 배경 대비 5.74:1 → WCAG AA 안전 통과
          // 이전 blue-600 (#2563EB)은 4.54:1로 간신히 통과였음
          DEFAULT: '#1D4ED8',
          light:   '#DBEAFE', // blue-100 — 배경/박스용
          hover:   '#1E40AF', // blue-800 — hover 상태
          dark:    '#1E3A8A', // blue-900 — 강조
        },
      },
      maxWidth: {
        // 글 본문 컨테이너: 한 줄 적정 글자 수(60~75자) 맞춤
        'content': '48rem',   // 768px — 상세 글, 단일 컬럼
        // 목록/카드 레이아웃: 넓은 컨테이너
        'wide':    '64rem',   // 1024px — 카테고리 목록, 허브
        // 사이트 전체 최대 너비
        'site':    '72rem',   // 1152px — 헤더, 푸터
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      // fontSize 확장 제거: 실제 크기 변경은 globals.css 에서 html font-size로 처리.
      // 개별 유틸 클래스 line-height는 Tailwind 기본값을 그대로 사용.
    },
  },
  plugins: [],
};

export default config;
