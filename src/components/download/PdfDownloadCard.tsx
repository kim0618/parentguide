import Link from 'next/link';
import type { PdfDownload } from '@/types/download';
import { TrackableLink } from '@/components/analytics';
import { Badge } from '@/components/ui';

interface Props {
  item: PdfDownload;
  /**
   * 표시 방식
   *
   * card   (기본) - 제목·설명·버튼이 있는 전체 카드. 섹션 그리드에서 사용.
   * bar          - 가로 줄 띠형. 상세 글 중간에 삽입할 때 사용.
   * inline       - 텍스트 흐름 안 소형 링크. 본문 문단 직후에 사용.
   */
  variant?: 'card' | 'bar' | 'inline';
}

/**
 * PDF 다운로드 자료 CTA 컴포넌트
 *
 * variant에 따라 세 가지 레이아웃으로 렌더링됨.
 * status='available'이면 다운로드 링크, 'coming-soon'이면 준비 중 표시.
 * gateType='direct'만 현재 구현 - 'email'/'kakao'는 타입 예약 상태.
 *
 * 파일 경로: /downloads/{fileName} (Next.js public/ 기준)
 */
export default function PdfDownloadCard({ item, variant = 'card' }: Props) {
  const isAvailable = item.status === 'available' && !!item.fileName;
  const href = isAvailable ? `/downloads/${item.fileName}` : undefined;


  /* ── bar: 가로 줄 띠형 ─────────────────────────────────────── */
  if (variant === 'bar') {
    return (
      <div
        className="flex flex-wrap items-center justify-between gap-3
                   rounded-lg border border-gray-200 bg-gray-50 px-5 py-3.5"
        aria-label="관련 자료 안내"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 text-gray-400 text-base" aria-hidden="true">
            📋
          </span>
          <div className="min-w-0">
            <span className="text-sm font-medium text-gray-800">
              {item.title}
            </span>
            {!isAvailable && (
              <span className="ml-2 text-xs text-gray-400">준비 중</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isAvailable ? (
            <TrackableLink
              href={href}
              download
              className="btn-sm btn-outline shrink-0 no-underline text-sm"
              aria-label={`${item.title} PDF 저장하기`}
              event={{ name: 'pdf_download_click', params: { pdf_id: item.id, pdf_title: item.title, status: item.status } }}
            >
              PDF 저장
              <span aria-hidden="true" className="ml-1 text-gray-400">↓</span>
            </TrackableLink>
          ) : (
            <span
              className="inline-flex items-center rounded-lg border-2 border-gray-200
                         px-4 py-2 text-sm font-semibold text-gray-400
                         min-h-[44px] cursor-not-allowed"
              aria-label="아직 준비 중입니다"
            >
              준비 중
            </span>
          )}
          {item.printUrl && (
            <Link
              href={item.printUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800"
            >
              인쇄용 페이지 열기
            </Link>
          )}
        </div>
      </div>
    );
  }


  /* ── inline: 텍스트 흐름 안 링크 ───────────────────────────── */
  if (variant === 'inline') {
    if (!isAvailable) {
      return (
        <p className="text-sm text-gray-500" aria-label="관련 자료 안내">
          <span aria-hidden="true" className="mr-1">📋</span>
          {item.title}{' '}
          <span className="text-gray-400">(준비 중)</span>
        </p>
      );
    }
    return (
      <p className="text-sm text-gray-600" aria-label="관련 자료 안내">
        <span aria-hidden="true" className="mr-1">📋</span>
        <TrackableLink
          href={href}
          download
          className="font-medium text-blue-700"
          aria-label={`${item.title} PDF 저장하기`}
          event={{ name: 'pdf_download_click', params: { pdf_id: item.id, pdf_title: item.title, status: item.status } }}
        >
          {item.title}
          <span aria-hidden="true" className="ml-0.5 text-gray-400 text-xs">↓</span>
        </TrackableLink>
        {' '}인쇄하거나 저장해 활용하세요.
      </p>
    );
  }


  /* ── card: 기본 카드형 ──────────────────────────────────────── */
  return (
    <div className="card flex flex-col" aria-label="관련 자료 안내">
      <div className="flex items-start gap-3 mb-3">
        <span className="shrink-0 text-2xl" aria-hidden="true">📋</span>
        <div>
          <p className="font-semibold text-gray-900 mb-0">
            {item.title}
          </p>
          {!isAvailable && (
            <Badge variant="gray" className="text-xs mt-1">준비 중</Badge>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-0 flex-1">
        {item.description}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {isAvailable ? (
          <TrackableLink
            href={href}
            download
            className="btn-outline inline-flex no-underline text-sm"
            aria-label={`${item.title} PDF 저장하기`}
            event={{ name: 'pdf_download_click', params: { pdf_id: item.id, pdf_title: item.title, status: item.status } }}
          >
            PDF 저장하기
            <span aria-hidden="true" className="ml-1 text-gray-400">↓</span>
          </TrackableLink>
        ) : (
          <>
            <span
              className="inline-flex items-center rounded-lg border-2 border-gray-200
                         px-5 py-2.5 text-sm font-semibold text-gray-400
                         min-h-[44px] cursor-not-allowed"
              aria-label="아직 준비 중입니다"
            >
              준비 중
            </span>
            {!item.printUrl && (
              <p className="mt-0 mb-0 text-xs text-gray-400">
                곧 제공될 예정입니다.
              </p>
            )}
          </>
        )}
        {item.printUrl && (
          <Link
            href={item.printUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800"
          >
            인쇄용 페이지 열기
          </Link>
        )}
      </div>
    </div>
  );
}
