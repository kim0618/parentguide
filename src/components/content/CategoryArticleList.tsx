'use client';

import { useState, useMemo, useEffect } from 'react';
import type { ContentListItem } from '@/types/content';
import ArticleCard from './ArticleCard';

const PAGE_SIZE = 12;

interface Props {
  items: ContentListItem[];
}

export default function CategoryArticleList({ items }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [newSlugs, setNewSlugs] = useState<Set<string>>(new Set());

  // NEW 배지: 클라이언트에서만 계산 (서버/클라이언트 hydration mismatch 방지)
  useEffect(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    setNewSlugs(
      new Set(
        items
          .filter((i) => new Date(i.createdAt).getTime() > cutoff)
          .map((i) => i.slug),
      ),
    );
  }, [items]);

  // 2개 이상 글에 사용된 태그만 표시 (1개짜리 태그는 필터로서 의미 없음)
  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>();
    items.forEach((item) =>
      item.tags?.forEach((t) => tagCount.set(t, (tagCount.get(t) ?? 0) + 1)),
    );
    return Array.from(tagCount.entries())
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'))
      .map(([tag]) => tag);
  }, [items]);

  // 태그 필터 적용
  const filtered = useMemo(() => {
    if (!selectedTag) return items;
    return items.filter((item) => item.tags?.includes(selectedTag));
  }, [items, selectedTag]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleTagSelect(tag: string | null) {
    setSelectedTag(tag);
    setPage(1);
  }

  return (
    <div>
      {/* 태그 필터 */}
      {allTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="태그 필터">
          <button
            type="button"
            onClick={() => handleTagSelect(null)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedTag === null
                ? 'bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagSelect(tag)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* 필터 결과 수 */}
      {selectedTag && (
        <p className="mb-4 text-sm text-gray-500">
          <span className="font-medium text-gray-800">{selectedTag}</span> 관련 글 {filtered.length}편
        </p>
      )}

      {/* 아티클 그리드 */}
      {paginated.length > 0 ? (
        <section aria-label="글 목록">
          <div className="grid gap-4 sm:grid-cols-2">
            {paginated.map((article) => (
              <ArticleCard
                key={article.slug}
                item={article}
                isNew={newSlugs.has(article.slug)}
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-gray-500">해당 태그의 글이 없습니다.</p>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-2" aria-label="페이지 이동">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="이전 페이지"
          >
            &larr; 이전
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`min-w-[36px] rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label={`${p}페이지`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="다음 페이지"
          >
            다음 &rarr;
          </button>
        </nav>
      )}
    </div>
  );
}
