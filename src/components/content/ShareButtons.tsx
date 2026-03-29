'use client';

import { useState } from 'react';

interface Props {
  title: string;
  className?: string;
}

/**
 * 글 하단 공유 버튼
 * - 모바일: Web Share API (카카오톡·문자 등 자동 포함)
 * - 전체: 링크 복사 버튼
 */
export default function ShareButtons({ title, className = '' }: Props) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    const url = getUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* 사용자가 공유 취소 */
      }
    } else {
      await handleCopy();
    }
  };

  const handleCopy = async () => {
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API 미지원 */
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <p className="text-sm font-medium text-gray-500">이 글이 도움이 되셨다면 주변에 공유해주세요</p>
      <div className="flex gap-3">

        {/* 공유하기 (모바일: 네이티브 공유, 데스크탑: 링크 복사) */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200
                     bg-white px-5 py-2.5 text-sm font-medium text-gray-700
                     hover:bg-gray-50 hover:border-gray-300 min-h-[44px]
                     transition-colors"
          aria-label="공유하기"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          공유하기
        </button>

        {/* 링크 복사 */}
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5
                      text-sm font-medium min-h-[44px] transition-colors
                      ${copied
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      }`}
          aria-label="링크 복사"
        >
          {copied ? (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              복사 완료
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              링크 복사
            </>
          )}
        </button>
      </div>
    </div>
  );
}
