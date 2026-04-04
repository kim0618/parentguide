'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { searchIndex } from '@/lib/searchIndex';
import type { SearchItem } from '@/lib/searchIndex';

const CATEGORY_LABELS: Record<string, string> = {
  'pension-welfare': '연금·복지',
  'health-care':     '건강보험',
  'finance-safety':  '재정·안전',
};

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title',   weight: 0.6 },
    { name: 'summary', weight: 0.2 },
    { name: 'tags',    weight: 0.2 },
  ],
  threshold: 0.4,
  minMatchCharLength: 2,
  includeScore: true,
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const r = fuse.search(query, { limit: 8 });
    setResults(r.map((res) => res.item));
  }, [query]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-3 px-3 sm:pt-16 sm:px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="글 검색"
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 입력창 */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <svg
            className="h-5 w-5 shrink-0 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            placeholder="글 제목, 키워드로 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base outline-none bg-transparent placeholder:text-gray-400"
            aria-label="글 검색"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="검색 닫기"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 결과 목록 */}
        {results.length > 0 && (
          <ul className="max-h-[55vh] sm:max-h-96 overflow-y-auto divide-y divide-gray-100">
            {results.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/guide/${item.slug}/`}
                  className="block px-4 py-3 no-underline hover:bg-blue-50 transition-colors"
                  onClick={onClose}
                >
                  <div className="mb-0.5">
                    <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      {CATEGORY_LABELS[item.category] ?? item.category}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* 검색어 입력했지만 결과 없음 */}
        {query.length >= 2 && results.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}

        {/* 안내 문구 (빈 상태) */}
        {query.length < 2 && (
          <div className="px-4 py-5 text-center text-sm text-gray-400">
            두 글자 이상 입력하면 검색됩니다
          </div>
        )}
      </div>
    </div>
  );
}
