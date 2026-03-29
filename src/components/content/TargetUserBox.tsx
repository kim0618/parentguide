import type { TargetUser } from '@/types/content';

interface Props {
  targetUser: TargetUser;
}

const CONFIG: Record<TargetUser, { label: string; sub: string; colorClass: string }> = {
  senior: {
    label: '어르신 본인용',
    sub: '만 60세 이상 어르신께서 직접 참고하실 수 있습니다.',
    colorClass: 'border-blue-200 bg-blue-50 text-blue-900',
  },
  family: {
    label: '자녀·보호자용',
    sub: '부모님을 도와드리는 자녀분이나 보호자분께 맞는 내용입니다.',
    colorClass: 'border-green-200 bg-green-50 text-green-900',
  },
  both: {
    label: '어르신·자녀 함께',
    sub: '어르신 본인과 자녀분이 함께 보시면 도움이 됩니다.',
    colorClass: 'border-amber-200 bg-amber-50 text-amber-900',
  },
};

/**
 * 대상 독자 박스
 *
 * 글 상단 제목 바로 아래에 배치해 누가 읽어야 하는 글인지 안내.
 *
 * 사용 예:
 *   <TargetUserBox targetUser={item.targetUser} />
 */
export default function TargetUserBox({ targetUser }: Props) {
  const { label, sub, colorClass } = CONFIG[targetUser];

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${colorClass}`}
      role="note"
      aria-label={`대상 독자: ${label}`}
    >
      <span className="mt-0.5 shrink-0 text-lg" aria-hidden="true">
        👤
      </span>
      <div>
        <span className="font-semibold">{label}</span>
        <p className="mt-0.5 text-sm">{sub}</p>
      </div>
    </div>
  );
}
