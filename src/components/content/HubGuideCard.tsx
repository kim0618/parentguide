'use client';

import Link from 'next/link';
import type { Hub } from '@/types/navigation';
import { trackEvent } from '@/lib/analytics';

interface Props {
  hub: Hub;
  /** 카드가 노출된 페이지 - hub_card_click 이벤트의 source_page 필드 */
  sourcePage?: string;
}

/** 허브별 색상 포인트 (Tailwind 클래스 - 전체 문자열로 명시해야 purge 제외 안 됨) */
const HUB_ACCENT: Record<string, string> = {
  'prepare-care':        'bg-teal-500',
  'retirement-income':   'bg-violet-500',
  'government-benefits': 'bg-blue-600',
  'health-checkup':      'bg-green-600',
  'financial-safety':    'bg-amber-500',
};

export default function HubGuideCard({ hub, sourcePage = 'unknown' }: Props) {
  const accentColor = HUB_ACCENT[hub.slug] ?? 'bg-blue-600';

  function handleClick() {
    trackEvent('hub_card_click', {
      hub_slug:    hub.slug,
      hub_title:   hub.title,
      source_page: sourcePage,
    });
  }

  return (
    <Link
      href={hub.href}
      className="card-link block no-underline"
      aria-label={`${hub.title} 가이드 보기`}
      onClick={handleClick}
    >
      {/* 색상 포인트 바 */}
      <span className={`mb-3 block h-1 w-8 rounded-full ${accentColor}`} aria-hidden="true" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900">{hub.title}</p>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {hub.description}
          </p>
        </div>
        {/* 화살표 */}
        <span className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
