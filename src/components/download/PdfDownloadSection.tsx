import type { PdfDownload } from '@/types/download';
import PdfDownloadCard from './PdfDownloadCard';

interface Props {
  items: PdfDownload[];
  /**
   * 섹션 제목 (없으면 기본값 사용)
   * h2로 렌더링됨
   */
  heading?: string;
  /**
   * 레이아웃 유형
   *
   * grid - 카드를 2열 그리드로 배치 (홈·허브의 섹션에 사용)
   * list - 세로 줄 bar 형태로 나열 (상세 글 하단에 사용)
   */
  layout?: 'grid' | 'list';
  /** 섹션 하단 보조 설명 (선택) */
  note?: string;
}

/**
 * PDF 다운로드 자료 섹션 래퍼
 *
 * 홈·허브에서는 layout='grid' (기본),
 * 상세 글 하단에서는 layout='list' + bar variant를 쓸 것.
 * 빈 items면 렌더링 안 함.
 */
export default function PdfDownloadSection({
  items,
  heading = '인쇄·저장용 자료',
  layout = 'grid',
  note,
}: Props) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="pdf-download-heading">
      <h2 id="pdf-download-heading" className="mb-2">
        {heading}
      </h2>
      <p className="text-gray-600 mb-6 mt-0">
        인쇄하거나 PDF로 저장해 필요할 때 꺼내 쓰세요.
      </p>

      {layout === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <PdfDownloadCard key={item.id} item={item} variant="card" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <PdfDownloadCard key={item.id} item={item} variant="bar" />
          ))}
        </div>
      )}

      {note && (
        <p className="mt-4 text-xs text-gray-400 leading-relaxed">{note}</p>
      )}
    </section>
  );
}
