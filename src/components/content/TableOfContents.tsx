'use client';

import { useState } from 'react';
import type { ContentSection } from '@/types/content';

interface Props {
  sections: ContentSection[];
}

/**
 * 글 본문 목차 (접이식)
 * - sections에서 heading이 있는 항목만 추출
 * - 클릭 시 해당 섹션으로 스크롤
 */
export default function TableOfContents({ sections }: Props) {
  const [open, setOpen] = useState(false);

  const headings = sections
    .map((s, i) => (s.heading ? { id: `section-${i}`, label: s.heading } : null))
    .filter(Boolean) as { id: string; label: string }[];

  if (headings.length < 3) return null;

  return (
    <nav
      className="mb-8 rounded-lg border border-gray-200 bg-gray-50"
      aria-label="목차"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-3.5
                   text-sm font-semibold text-gray-700 hover:bg-gray-100
                   rounded-lg min-h-[44px] transition-colors"
        aria-expanded={open}
      >
        <span>목차</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ol className="list-none pl-0 mb-0 px-5 pb-4 space-y-1">
          {headings.map((h, i) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="flex items-start gap-2.5 rounded px-2 py-1.5 text-sm
                           text-gray-600 no-underline hover:bg-gray-100 hover:text-blue-700
                           transition-colors"
                onClick={() => {
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <span className="shrink-0 text-gray-400 font-medium">{i + 1}.</span>
                <span>{h.label}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
