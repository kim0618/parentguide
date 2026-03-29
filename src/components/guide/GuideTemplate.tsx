import type { ContentItem, ContentListItem, ContentTemplate } from '@/types/content';
import type { PdfDownload } from '@/types/download';
import { AdSlot } from '@/components/ads';
import { Badge } from '@/components/ui';
import ContentBody from './ContentBody';
import ArticleCard from '@/components/content/ArticleCard';
import TableOfContents from '@/components/content/TableOfContents';
import MobileBottomBar from '@/components/content/MobileBottomBar';
import {
  TargetUserBox,
  ReviewStatusBox,
  KeyPointsBox,
  OfficialSourcesSection,
  CautionBox,
  CalculatorCTABox,
  PrintSummaryButton,
  FAQSection,
  ShareButtons,
} from '@/components/content';
import { PdfDownloadCard } from '@/components/download';

interface Props {
  item: ContentItem;
  relatedArticles: ContentListItem[];
  /** 이 글과 연관된 PDF 자료 목록 (없으면 섹션 미노출) */
  relatedDownloads?: PdfDownload[];
}

/**
 * 템플릿 유형별 뱃지 레이블.
 * standard는 별도 표시 없음.
 */
const TEMPLATE_LABEL: Partial<Record<ContentTemplate, string>> = {
  policy:     '정책·제도 안내',
  checklist:  '체크리스트',
  calculator: '계산기 연결',
  comparison: '비교 가이드',
};

/**
 * 상세 가이드 페이지 공통 템플릿.
 *
 * 템플릿 유형별 차이:
 * - policy     : effectiveDate·officialSources 강조 (ReviewStatusBox에 effectiveDate 노출)
 * - checklist  : numbered-list를 단계별 스텝 스타일로 렌더링
 * - calculator : 계산기 CTA를 키 포인트 직후 상단에 추가 노출
 * - comparison : 현재 standard와 동일 구조 (표·비교 섹션 추가 예정)
 * - standard   : 기본 순서 그대로
 *
 * 섹션 순서:
 * 1. 헤더 (뱃지 + 제목 + hero 설명)
 * 2. 메타 (대상 독자 + 검토 상태)
 * 3. 핵심 포인트 - 3줄 요약
 * 4. [calculator 템플릿 전용] 계산기 CTA 상단 노출
 * 5. 구분선
 * 6. 본문 (sections)
 * 7. 주의사항
 * 8. 계산기 CTA (기본 위치)
 * 9. 공식기관 링크
 * 10. FAQ
 * 11. 인쇄 버튼
 * ── 하단 관련 글 ──────────────────────────────
 * 12. 관련 글 그리드
 */
export default function GuideTemplate({ item, relatedArticles, relatedDownloads }: Props) {
  const templateLabel = TEMPLATE_LABEL[item.template];
  const hasCalculator = !!(item.relatedCalculator && item.calculatorCTA);
  const isCalculatorTemplate = item.template === 'calculator';
  const firstPrintUrl = relatedDownloads?.find((d) => d.printUrl)?.printUrl;

  return (
    <>
      <article className="container-content py-10">

        {/* ── 1. 헤더 ──────────────────────────────────────────── */}
        <header className="mb-8">
          {templateLabel && (
            <p className="mb-3">
              <Badge variant="blue">{templateLabel}</Badge>
            </p>
          )}
          <h1>{item.title}</h1>
          {item.heroDescription && (
            <p className="mt-2 text-lg text-gray-600 leading-relaxed">
              {item.heroDescription}
            </p>
          )}
        </header>

        {/* ── 2. 메타: 대상 독자 + 검토 상태 ─────────────────── */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1 min-w-0">
            <TargetUserBox targetUser={item.targetUser} />
          </div>
          <div className="flex-1 min-w-0">
            <ReviewStatusBox
              reviewStatus={item.reviewStatus}
              updatedAt={item.updatedAt}
              effectiveDate={item.effectiveDate}
            />
          </div>
        </div>

        {/* ── 3. 핵심 포인트 (3줄 요약) ───────────────────────── */}
        {item.keyPoints && item.keyPoints.length > 0 && (
          <div className="mb-8">
            <KeyPointsBox points={item.keyPoints} />
          </div>
        )}

        {/* ── 4. 계산기 CTA - calculator 템플릿 전용 상단 노출 (bar) ── */}
        {isCalculatorTemplate && hasCalculator && (
          <div className="mb-8">
            <CalculatorCTABox
              calculator={item.relatedCalculator!}
              cta={item.calculatorCTA!}
              variant="bar"
              trackingContext={{ source: 'guide', slug: item.slug }}
            />
          </div>
        )}

        {/* ── 구분선 ───────────────────────────────────────────── */}
        <hr className="mb-6" />

        {/* ── 목차 ─────────────────────────────────────────────── */}
        {item.sections && item.sections.length > 0 && (
          <TableOfContents sections={item.sections} />
        )}

        {/* ── 5. 본문 ──────────────────────────────────────────── */}
        {item.sections && item.sections.length > 0 && (
          <ContentBody sections={item.sections} template={item.template} />
        )}

        {/*
          ── [광고 A] guide-mid-content ────────────────────────
          위치: ContentBody 종료 직후 ~ CautionBox 사이
          조건: 본문 전체가 끝난 뒤 → 첫 스크린 이후 보장
          금지 사항:
            - ContentBody 상단 직하단 배치 금지 (본문 아래 전체 후 배치)
            - numbered-list(절차 단계) 내부 배치 금지 → ContentBody 밖에 위치
            - CautionBox·헤더·메타박스와 인접 금지 → 아래 CautionBox와 단락 구분됨
        */}
        <AdSlot position="guide-mid-content" format="rectangle" />

        {/* ── 6. 주의사항 ───────────────────────────────────────── */}
        {item.cautionNote && (
          <div className="mt-2">
            <CautionBox note={item.cautionNote} />
          </div>
        )}

        {/* ── 7. PDF 다운로드 자료 ──────────────────────────────── */}
        {relatedDownloads && relatedDownloads.length > 0 && (
          <section aria-labelledby="pdf-download-heading" className="mt-6">
            <h2 id="pdf-download-heading" className="text-base font-semibold text-gray-700 mb-3">
              인쇄·저장용 자료
            </h2>
            <div className="space-y-2">
              {relatedDownloads.map((dl) => (
                <PdfDownloadCard key={dl.id} item={dl} variant="bar" />
              ))}
            </div>
          </section>
        )}

        {/* ── 8. 계산기 CTA (기본 위치) ────────────────────────── */}
        {!isCalculatorTemplate && hasCalculator && (
          <CalculatorCTABox
            calculator={item.relatedCalculator!}
            cta={item.calculatorCTA!}
            trackingContext={{ source: 'guide', slug: item.slug }}
          />
        )}

        {/* ── 9. 공식기관 링크 ──────────────────────────────────── */}
        {item.officialSources && item.officialSources.length > 0 && (
          <OfficialSourcesSection sources={item.officialSources} articleSlug={item.slug} />
        )}

        {/*
          ── [광고 B] guide-after-sources ──────────────────────
          위치: OfficialSources 이후 ~ FAQSection 사이
          조건:
            - OfficialSources가 없는 글에서도 FAQ 앞에 자연스럽게 위치
            - 공식기관 링크보다 광고가 더 눈에 띄지 않도록
              OfficialSources 아래, FAQ 위 배치 (공식 링크 먼저 노출)
          금지 사항:
            - OfficialSources 위 배치 금지 (공식 정보 > 광고 원칙)
            - CautionBox 직후 배치 금지 → 광고 A가 본문 후에 위치하므로 간격 확보됨
        */}
        <AdSlot position="guide-after-sources" format="auto" />

        {/* ── 10. FAQ ───────────────────────────────────────────── */}
        {item.faq && item.faq.length > 0 && (
          <FAQSection items={item.faq} />
        )}

        {/* ── 11. 공유 + 인쇄 ────────────────────────────────── */}
        <div className="mt-10 border-t border-gray-200 pt-8">
          <ShareButtons title={item.title} />
          <div className="mt-6 flex justify-end">
            <PrintSummaryButton />
          </div>
        </div>

      </article>

      {/* ── 12. 관련 글 ───────────────────────────────────────── */}
      {relatedArticles.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="border-t border-gray-100 bg-gray-50"
        >
          <div className="container-content py-10">
            <h2 id="related-heading" className="mt-0 mb-6">관련 글</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.slug} item={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 모바일 하단 고정 바 ────────────────────────────────── */}
      <MobileBottomBar title={item.title} printUrl={firstPrintUrl} />
    </>
  );
}
