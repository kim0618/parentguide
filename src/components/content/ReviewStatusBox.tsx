import type { ReviewStatus } from '@/types/content';
import { formatDate } from '@/lib/format';

interface Props {
  reviewStatus: ReviewStatus;
  updatedAt: string;
  effectiveDate?: string;
}

const CONFIG: Record<
  ReviewStatus,
  { label: string; indicator: string; colorClass: string }
> = {
  current: {
    label: '최신 정보 확인됨',
    indicator: '✓',
    colorClass: 'border-green-200 bg-green-50 text-green-800',
  },
  'needs-review': {
    label: '검토 예정',
    indicator: '!',
    colorClass: 'border-amber-200 bg-amber-50 text-amber-800',
  },
  outdated: {
    label: '업데이트 필요',
    indicator: '!',
    colorClass: 'border-red-200 bg-red-50 text-red-800',
  },
};

/**
 * 검토 상태 박스
 *
 * 글의 정보 신뢰성 상태와 마지막 확인일을 표시.
 * policy 템플릿에서는 effectiveDate(기준일)도 함께 표시.
 *
 * 사용 예:
 *   <ReviewStatusBox
 *     reviewStatus={item.reviewStatus}
 *     updatedAt={item.updatedAt}
 *     effectiveDate={item.effectiveDate}
 *   />
 */
export default function ReviewStatusBox({ reviewStatus, updatedAt, effectiveDate }: Props) {
  const { label, indicator, colorClass } = CONFIG[reviewStatus];

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border px-4 py-3 text-sm ${colorClass}`}
      role="note"
      aria-label={`정보 검토 상태: ${label}`}
    >
      {/* 상태 표시 */}
      <span className="font-semibold">
        <span aria-hidden="true">{indicator} </span>
        {label}
      </span>

      {/* 마지막 수정일 */}
      <span className="text-current opacity-80">
        최종 수정: {formatDate(updatedAt)}
      </span>

      {/* 정책 기준일 (있을 때만) */}
      {effectiveDate && (
        <span className="text-current opacity-80">
          기준일: {formatDate(effectiveDate)}
        </span>
      )}
    </div>
  );
}
