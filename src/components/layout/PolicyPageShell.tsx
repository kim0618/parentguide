import type { ReactNode } from 'react';

interface Props {
  /** 페이지 h1 제목 */
  title: string;
  /** 제목 아래 한 줄 설명 (선택) */
  subtitle?: string;
  /** 최종 수정 표기 (선택). 예: '2025년 3월' */
  updatedAt?: string;
  children: ReactNode;
}

/**
 * 정책·안내 페이지 공통 쉘
 *
 * 헤더(제목 + 구분선) + 본문(container-content, prose 스타일 자동 적용)
 * 각 정책 페이지에서 import해 사용.
 */
export default function PolicyPageShell({
  title,
  subtitle,
  updatedAt,
  children,
}: Props) {
  return (
    <div className="container-content py-10">

      {/* 페이지 헤더 */}
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="mb-0">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-600 leading-relaxed">{subtitle}</p>
        )}
        {updatedAt && (
          <p className="mt-3 text-sm text-gray-400">최종 수정: {updatedAt}</p>
        )}
      </header>

      {/* 본문 - globals.css의 h2, p, ul, ol 스타일 자동 적용 */}
      <div>{children}</div>

    </div>
  );
}
