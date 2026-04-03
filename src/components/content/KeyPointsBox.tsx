interface Props {
  points: string[];
  title?: string;
}

/**
 * 핵심 요약 박스 (3줄 요약)
 *
 * 글 상단에 배치해 독자가 전체 내용을 읽기 전에 핵심을 파악하도록 안내.
 * 최대 3개 권장. 글 데이터의 keyPoints 필드와 1:1 대응.
 *
 * 사용 예:
 *   {item.keyPoints && (
 *     <KeyPointsBox points={item.keyPoints} />
 *   )}
 */
export default function KeyPointsBox({ points, title = '이 글의 핵심 요약' }: Props) {
  if (points.length === 0) return null;

  return (
    <div className="box-summary" aria-label="핵심 요약">
      <p className="box-title">{title}</p>
      <ol className="mt-2 space-y-2 pl-0" style={{ listStyle: 'none' }}>
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* 번호 뱃지 */}
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full
                         bg-blue-700 text-xs font-bold text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
