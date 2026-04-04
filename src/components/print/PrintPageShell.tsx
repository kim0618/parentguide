'use client';

import type { ReactNode } from 'react';
import { siteConfig } from '@/config/siteConfig';

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * 인쇄용 A4 페이지 래퍼
 * - 브라우저에서 Ctrl+P / Cmd+P 로 PDF 저장 가능
 * - 인쇄 시 상단 버튼 자동 숨김
 */
export default function PrintPageShell({ title, subtitle, children }: Props) {
  return (
    <div className="py-6 px-4 print:p-0">

      {/* 인쇄 버튼 - 인쇄 시 숨김 */}
      <div className="print:hidden mb-5 mx-auto max-w-[210mm]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            아래 버튼을 눌러 PDF로 저장하거나 인쇄하세요
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="btn-primary btn-sm text-sm"
            >
              인쇄 / PDF 저장
            </button>
            <button
              onClick={() => window.close()}
              className="btn-outline btn-sm text-sm"
            >
              탭 닫기
            </button>
          </div>
        </div>
      </div>

      {/* A4 페이지 - 화면: 반응형 / 인쇄: 210mm 고정 */}
      <div
        className="mx-auto w-full bg-white shadow-lg print:shadow-none"
        style={{
          maxWidth: '210mm',
          minHeight: 'auto',
          padding: 'clamp(16px, 5vw, 18mm) clamp(16px, 5vw, 20mm)',
        }}
      >
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between border-b-2 border-blue-700 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-1">
              {siteConfig.siteName}
            </p>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="text-right text-xs text-gray-400">
            <p>{new Date().getFullYear()}년 기준</p>
            <p className="mt-0.5">무료 자료</p>
          </div>
        </div>

        {/* 본문 */}
        <div className="space-y-6 text-sm leading-relaxed">
          {children}
        </div>

        {/* 푸터 */}
        <div className="mt-10 border-t border-gray-200 pt-4 text-xs text-gray-400">
          <p>
            이 자료는 {siteConfig.siteName}({siteConfig.siteDomain})에서 제공하는 참고용 자료입니다.
            정확한 자격 요건은 담당 기관에 직접 확인하시기 바랍니다.
          </p>
        </div>
      </div>

    </div>
  );
}
