'use client';

import { useState, useEffect } from 'react';

interface Props {
  title: string;
  printUrl?: string;
}

/**
 * 모바일 글 하단 고정 바
 * - 공유 + PDF 저장(있을 때만)
 * - md 이상에서는 숨김
 * - 300px 이상 스크롤 시 표시
 */
export default function MobileBottomBar({ title, printUrl }: Props) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* 취소 */ }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { /* 미지원 */ }
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200
                 bg-white/95 backdrop-blur-sm px-4 py-2.5
                 flex items-center justify-center gap-3
                 md:hidden print:hidden"
    >
      <button
        onClick={handleShare}
        aria-label="이 글 공유하기"
        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700
                   px-4 py-2.5 text-sm font-medium text-white
                   hover:bg-blue-800 min-h-[44px] flex-1 justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        {copied ? '복사 완료' : '공유하기'}
      </button>

      {printUrl && (
        <a
          href={printUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200
                     bg-white px-4 py-2.5 text-sm font-medium text-gray-700
                     hover:bg-gray-50 min-h-[44px] flex-1 justify-center no-underline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          PDF 저장
        </a>
      )}
    </div>
  );
}
