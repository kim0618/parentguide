import type { Hub } from '@/types/navigation';
import type { HubDetail } from '@/types/hub';
import type { ContentListItem } from '@/types/content';
import type { PdfDownload } from '@/types/download';
import ArticleCard from '@/components/content/ArticleCard';
import { PrepareListBox, CalculatorCTABox, FAQSection } from '@/components/content';
import { PdfDownloadSection } from '@/components/download';
import { AdSlot } from '@/components/ads';
import { Breadcrumb } from '@/components/ui';

interface Props {
  hub: Hub;
  detail: HubDetail;
  /** hubKey 기준으로 연결된 전체 글 목록 */
  articles: ContentListItem[];
  /** 이 허브에 연관된 PDF 자료 목록 */
  relatedDownloads?: PdfDownload[];
}

/**
 * 상황형 허브 페이지 공통 템플릿.
 *
 * 섹션 순서:
 * 1. 헤더 - 허브 제목 + 설명
 * 2. 이런 상황이라면 - situations 목록
 * 3. 이것부터 확인해보세요 - featuredSlugs 기반 강조 카드
 * 4. 관련 글 전체 - 나머지 글 카드 그리드
 * 5. 계산기 CTA (hubCalculator가 있을 때)
 * 6. 준비 체크리스트 (checklist가 있을 때)
 * 7. 자주 묻는 질문 (faq가 있을 때)
 */
export default function HubTemplate({ hub, detail, articles, relatedDownloads }: Props) {
  /* featuredSlugs에 해당하는 글과 나머지 분리 */
  const featuredSlugs = detail.featuredSlugs ?? [];
  const featuredArticles = featuredSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is ContentListItem => a !== undefined);
  const otherArticles = articles.filter(
    (a) => !featuredSlugs.includes(a.slug),
  );

  return (
    <div>
      {/* ── 1. 헤더 ─────────────────────────────────────────────── */}
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="container-content py-10">
          <Breadcrumb
            className="mb-4"
            items={[{ label: '홈', href: '/' }, { label: hub.title }]}
          />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            상황별 가이드
          </p>
          <h1 className="mb-4">{hub.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {hub.description}
          </p>
        </div>
      </section>

    <div className="container-content py-10 space-y-14">

      {/* ── 2. 이런 상황이라면 ──────────────────────────────────── */}
      {detail.situations.length > 0 && (
        <section aria-labelledby="situations-heading">
          <h2 id="situations-heading" className="mb-5">
            이런 상황이라면
          </h2>
          <ul className="space-y-3">
            {detail.situations.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center
                             rounded-full bg-blue-100 text-xs font-bold text-blue-700"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-gray-800">{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── 3. 이것부터 확인해보세요 ────────────────────────────── */}
      {featuredArticles.length > 0 && (
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="mb-5">
            이것부터 확인해보세요
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredArticles.map((article) => (
              <div
                key={article.slug}
                className="rounded-xl ring-2 ring-blue-200 bg-blue-50"
              >
                <ArticleCard
                  item={article}
                  sourceHub={{ slug: hub.slug, isFeatured: true }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 4. 관련 글 전체 ─────────────────────────────────────── */}
      {otherArticles.length > 0 && (
        <section aria-labelledby="articles-heading">
          <h2 id="articles-heading" className="mb-5">
            관련 정보 모아보기
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                item={article}
                sourceHub={{ slug: hub.slug, isFeatured: false }}
              />
            ))}
          </div>
        </section>
      )}

      {/* 글이 아예 없을 때 */}
      {articles.length === 0 && (
        <section>
          <p className="text-gray-500">관련 글을 준비 중입니다.</p>
        </section>
      )}

      {/* ── 5. 계산기 CTA ────────────────────────────────────────── */}
      {detail.hubCalculator && (
        <section aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="mb-5 sr-only">
            관련 계산기
          </h2>
          <CalculatorCTABox
            calculator={detail.hubCalculator.calculator}
            cta={detail.hubCalculator.cta}
            trackingContext={{ source: 'hub', slug: hub.slug }}
          />
        </section>
      )}

      {/*
        ── [광고] hub-after-articles ─────────────────────────────
        위치: 전체 글 목록 하단 ~ PDF·계산기 CTA 사이
        조건:
          - 글 목록(정보 탐색)이 완전히 끝난 후 → 정보 흐름 미단절
          - situations·featuredArticles 등 핵심 콘텐츠 이후 배치
        금지: 허브 헤더·situations·featuredArticles 내부 배치 금지
      */}
      <AdSlot position="hub-after-articles" format="horizontal" />

      {/* ── 6. PDF 다운로드 자료 ─────────────────────────────────── */}
      {relatedDownloads && relatedDownloads.length > 0 && (
        <PdfDownloadSection items={relatedDownloads} layout="grid" />
      )}

      {/* ── 7. 준비 체크리스트 ──────────────────────────────────── */}
      {detail.checklist && detail.checklist.length > 0 && (
        <PrepareListBox
          items={detail.checklist}
          title="지금 바로 할 수 있는 것"
          anchorId="checklist"
        />
      )}

      {/* ── 8. 자주 묻는 질문 ───────────────────────────────────── */}
      {detail.faq && detail.faq.length > 0 && (
        <FAQSection items={detail.faq} />
      )}

    </div>
    </div>
  );
}
