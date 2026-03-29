'use client';

import { useEffect, useState } from 'react';

/**
 * 맨 위로 가기 플로팅 버튼
 * - 300px 이상 스크롤하면 표시
 * - 클릭 시 부드럽게 최상단 이동
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center
                 rounded-full border border-gray-200 bg-white text-gray-500
                 shadow-lg hover:bg-gray-50 hover:text-gray-700
                 transition-opacity print:hidden"
      aria-label="맨 위로 가기"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
