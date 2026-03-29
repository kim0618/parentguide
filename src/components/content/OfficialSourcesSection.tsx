import type { OfficialSource } from '@/types/content';
import { TrackableLink } from '@/components/analytics';

interface Props {
  sources: OfficialSource[];
  title?: string;
  /** 이 섹션이 포함된 글의 slug - official_source_click 이벤트에 사용 */
  articleSlug?: string;
}

/**
 * 공식 기관 링크 섹션
 *
 * 글 하단에 배치해 독자가 원문·공식 출처를 직접 확인할 수 있도록 안내.
 * 모든 링크는 새 탭으로 열림. 외부 링크 표시(↗) 포함.
 *
 * 사용 예:
 *   {item.officialSources && (
 *     <OfficialSourcesSection sources={item.officialSources} articleSlug={item.slug} />
 *   )}
 */
export default function OfficialSourcesSection({
  sources,
  title = '공식 출처 확인',
  articleSlug = '',
}: Props) {
  if (sources.length === 0) return null;

  return (
    <section aria-labelledby="official-sources-heading">
      <h2 id="official-sources-heading">{title}</h2>

      <ul className="space-y-3 pl-0" style={{ listStyle: 'none' }}>
        {sources.map((source) => (
          <li
            key={source.url}
            className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
          >
            {/* 기관 링크 영역 */}
            <div className="min-w-0 flex-1">
              <TrackableLink
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold no-underline hover:underline"
                aria-label={`${source.name} 공식 사이트 (새 탭에서 열림)`}
                event={{
                  name: 'official_source_click',
                  params: {
                    source_name:  source.name,
                    source_url:   source.url,
                    article_slug: articleSlug,
                  },
                }}
              >
                {source.name}
                <span
                  className="ml-1 text-sm font-normal text-gray-500"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </TrackableLink>

              {source.note && (
                <p className="mt-0.5 text-sm text-gray-600">{source.note}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
