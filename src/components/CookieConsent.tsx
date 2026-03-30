'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'cookie-consent';

/**
 * 쿠키 동의 배너
 *
 * - localStorage에 동의 여부 저장
 * - 동의 전: 분석/광고 쿠키 미활성화 상태
 * - 동의 후: GA4 및 AdSense 쿠키 활성화
 * - 하단 고정, 모바일 친화적
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-4 shadow-lg sm:px-6"
      role="alert"
      aria-label="쿠키 사용 동의"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700 leading-relaxed">
          부모혜택은 사이트 이용 분석과 광고를 위해 쿠키를 사용합니다.{' '}
          <Link
            href="/privacy-policy"
            className="text-blue-700 underline hover:text-blue-800"
          >
            개인정보처리방침
          </Link>
          에서 자세한 내용을 확인하세요.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            거부
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 transition-colors"
          >
            동의
          </button>
        </div>
      </div>
    </div>
  );
}
