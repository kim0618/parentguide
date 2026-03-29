interface Props {
  note: string;
  title?: string;
}

/**
 * 주의사항 박스 (면책 고지 포함)
 *
 * 글 최하단에 배치. 정책 변경 가능성, 면책 고지 등을 표시.
 * 글 데이터의 cautionNote 필드와 1:1 대응.
 *
 * 사용 예:
 *   {item.cautionNote && (
 *     <CautionBox note={item.cautionNote} />
 *   )}
 */
export default function CautionBox({ note, title = '참고 사항' }: Props) {
  return (
    <div className="box-warning" role="note" aria-label="주의사항">
      <p className="box-title">{title}</p>
      <p className="mt-1 text-sm">{note}</p>
    </div>
  );
}
