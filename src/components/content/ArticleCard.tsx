'use client';

import Link from 'next/link';
import type { ContentListItem } from '@/types/content';
import { trackEvent } from '@/lib/analytics';
import { Badge } from '@/components/ui';

interface Props {
  item: ContentListItem;
  /** 카드 내 배지 표시 여부 (기본 true) */
  showBadge?: boolean;
  /**
   * 허브 페이지에서 렌더링 중일 때 전달.
   * 있으면 hub_article_click 이벤트 발송.
   * 없으면 이벤트 미발송.
   */
  sourceHub?: { slug: string; isFeatured?: boolean };
}

const CATEGORY_LABELS: Record<string, string> = {
  'pension-welfare': '연금·복지',
  'health-care': '건강보험',
  'finance-safety': '재정·안전',
};

const TARGET_LABELS: Record<string, string> = {
  senior: '시니어',
  family: '자녀·가족',
  both: '모두',
};

/**
 * 허브·목록 페이지에서 글 한 편을 요약 카드 형태로 표시.
 *
 * - 제목 + 요약 + 카테고리 배지 + 대상 독자
 * - 전체 카드 영역이 클릭 가능 (a 태그 포함)
 * - 시니어 친화: 충분한 패딩, 큰 텍스트, 명확한 구분선
 * - sourceHub 전달 시 hub_article_click 이벤트 발송
 */
export default function ArticleCard({ item, showBadge = true, sourceHub }: Props) {
  function handleClick() {
    if (!sourceHub) return;
    trackEvent('hub_article_click', {
      hub_slug:      sourceHub.slug,
      article_slug:  item.slug,
      article_title: item.title,
      is_featured:   sourceHub.isFeatured ?? false,
    });
  }

  return (
    <article className="card-link group p-0">
      <Link
        href={`/guide/${item.slug}/`}
        className="block p-5 no-underline text-inherit"
        onClick={handleClick}
      >
        {/* 배지 영역 */}
        {showBadge && (
          <div className="mb-2 flex flex-wrap gap-2">
            {item.category && (
              <Badge variant="blue" className="text-xs">
                {CATEGORY_LABELS[item.category] ?? item.category}
              </Badge>
            )}
            {item.targetUser && (
              <Badge variant="gray" className="text-xs">
                {TARGET_LABELS[item.targetUser] ?? item.targetUser}
              </Badge>
            )}
          </div>
        )}

        {/* 제목 */}
        <h3 className="mb-2 text-lg font-semibold leading-snug text-gray-900 group-hover:text-blue-700 transition-colors">
          {item.title}
        </h3>

        {/* 요약 */}
        <p className="text-base text-gray-600 line-clamp-2 leading-relaxed">
          {item.summary}
        </p>

        {/* 핵심 포인트 (최대 2개) */}
        {item.keyPoints && item.keyPoints.length > 0 && (
          <ul className="mt-2 space-y-1" aria-label="핵심 포인트">
            {item.keyPoints.slice(0, 2).map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm text-gray-600">
                <span className="mt-1 shrink-0 text-blue-500 leading-none" aria-hidden="true">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 하단: 업데이트 날짜 + 더보기 */}
        <div className="mt-3 flex items-center justify-between">
          {item.updatedAt && (
            <span className="text-xs text-gray-500">
              {item.updatedAt.slice(0, 7).replace('-', '.')} 검토
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 group-hover:underline">
            자세히 보기
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
