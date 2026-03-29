import type { ContentSection, ContentTemplate } from '@/types/content';

interface Props {
  sections: ContentSection[];
  /** 템플릿 유형: checklist는 numbered-list를 단계별 스텝으로 렌더링 */
  template?: ContentTemplate;
}

/**
 * body 텍스트 중 내부 링크([[slug|텍스트]] 형식)를 <a> 태그로 변환.
 * 예: [[basic-pension-application|기초연금 신청 방법]]
 *   → <a href="/guide/basic-pension-application/">기초연금 신청 방법</a>
 */
function BodyText({ text, className }: { text: string; className?: string }) {
  const hasLink = /\[\[[a-z0-9-]+\|[^\]]+\]\]/.test(text);
  if (!hasLink) return <p className={className}>{text}</p>;

  const html = text.replace(
    /\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g,
    '<a href="/guide/$1/">$2</a>',
  );
  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * 글 본문 섹션 배열을 타입별로 렌더링.
 *
 * - text          → 제목 + 단락
 * - list          → 커스텀 불릿 목록
 * - numbered-list → 순서 목록 (checklist 템플릿: 크고 굵은 번호 배지)
 * - info          → .box-info (파란 안내 박스)
 * - tip           → .box-tip (초록 팁 박스)
 * - warning       → .box-warning (주황 경고 박스)
 * - summary       → .box-summary (회색 요약 박스, 체크마크 목록)
 */
export default function ContentBody({ sections, template }: Props) {
  return (
    <div>
      {sections.map((section, i) => (
        <SectionBlock key={i} index={i} section={section} template={template} />
      ))}
    </div>
  );
}

function SectionBlock({
  index,
  section,
  template,
}: {
  index: number;
  section: ContentSection;
  template?: ContentTemplate;
}) {
  const { type, heading, body, items } = section;
  const isChecklist = template === 'checklist';
  const headingId = heading ? `section-${index}` : undefined;

  /* ── text ───────────────────────────────────────────────────── */
  if (type === 'text') {
    return (
      <div>
        {heading && <h2 id={headingId} className="mt-8 mb-3 scroll-mt-20">{heading}</h2>}
        {body && <BodyText text={body} />}
      </div>
    );
  }

  /* ── list ───────────────────────────────────────────────────── */
  if (type === 'list') {
    return (
      <div>
        {heading && <h2 id={headingId} className="mt-8 mb-3 scroll-mt-20">{heading}</h2>}
        {items && (
          <ul className="list-none pl-0 space-y-2 mb-5">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-3">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                  aria-hidden="true"
                />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  /* ── numbered-list ──────────────────────────────────────────── */
  if (type === 'numbered-list') {
    return (
      <div>
        {heading && <h2 id={headingId} className="mt-8 mb-3 scroll-mt-20">{heading}</h2>}
        {items && (
          <ol className={`list-none pl-0 mb-5 ${isChecklist ? 'space-y-4' : 'space-y-3'}`}>
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-3">
                <span
                  className={`
                    flex shrink-0 items-center justify-center
                    rounded-full font-bold text-white bg-blue-700
                    ${isChecklist ? 'h-8 w-8 text-sm mt-0.5' : 'h-6 w-6 text-xs mt-1'}
                  `}
                  aria-hidden="true"
                >
                  {j + 1}
                </span>
                <span className={`flex-1 ${isChecklist ? 'pt-0.5 font-medium' : ''}`}>
                  {item}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }

  /* ── info ───────────────────────────────────────────────────── */
  if (type === 'info') {
    return (
      <div className="box-info">
        {heading && <p id={headingId} className="box-title scroll-mt-20">{heading}</p>}
        {body && <BodyText text={body} className={heading ? 'mt-1 mb-0' : 'mb-0'} />}
        {items && (
          <ul className="list-none pl-0 mt-2 mb-0 space-y-1">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  /* ── tip ────────────────────────────────────────────────────── */
  if (type === 'tip') {
    return (
      <div className="box-tip">
        {heading && <p id={headingId} className="box-title scroll-mt-20">{heading}</p>}
        {body && <BodyText text={body} className={heading ? 'mt-1 mb-0' : 'mb-0'} />}
        {items && (
          <ul className="list-none pl-0 mt-2 mb-0 space-y-1">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  /* ── warning ────────────────────────────────────────────────── */
  if (type === 'warning') {
    return (
      <div className="box-warning">
        {heading && <p id={headingId} className="box-title scroll-mt-20">{heading}</p>}
        {body && <BodyText text={body} className={heading ? 'mt-1 mb-0' : 'mb-0'} />}
        {items && (
          <ul className="list-none pl-0 mt-2 mb-0 space-y-1">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  /* ── summary ────────────────────────────────────────────────── */
  if (type === 'summary') {
    return (
      <div className="box-summary">
        {heading && <p id={headingId} className="box-title scroll-mt-20">{heading}</p>}
        {body && <BodyText text={body} className={heading ? 'mt-1 mb-0' : 'mb-0'} />}
        {items && (
          <ul className="list-none pl-0 mt-3 mb-0 space-y-2">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 font-medium">
                <span className="shrink-0 text-blue-700" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return null;
}
