interface Props {
  items: string[];
  title?: string;
  /** 앵커 id - 페이지 상단에서 <a href="#prepare-list">로 이 섹션으로 이동 가능 */
  anchorId?: string;
}

/**
 * 준비물 목록 박스
 *
 * 체크리스트 · 정책 템플릿에서 "신청에 필요한 서류/준비물" 섹션으로 사용.
 * anchorId를 지정하면 페이지 내 다른 곳에서 앵커 링크로 바로 이동 가능.
 *
 * 페이지 상단에 "준비물 바로가기" 버튼이 필요하면:
 *   <a href="#prepare-list" className="btn-outline btn-sm">준비물 바로가기</a>
 *
 * 사용 예:
 *   <PrepareListBox
 *     items={['신분증', '건강보험료 납부확인서', '통장 사본']}
 *     title="신청 시 필요한 서류"
 *   />
 */
export default function PrepareListBox({
  items,
  title = '신청 시 필요한 준비물',
  anchorId = 'prepare-list',
}: Props) {
  if (items.length === 0) return null;

  return (
    <div
      id={anchorId}
      className="box-summary"
      aria-labelledby={`${anchorId}-heading`}
    >
      <p id={`${anchorId}-heading`} className="box-title">
        {title}
      </p>

      <ul className="mt-2 space-y-2 pl-0" style={{ listStyle: 'none' }}>
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* 체크박스 아이콘 */}
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded
                         border-2 border-gray-400 text-xs text-gray-400"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
