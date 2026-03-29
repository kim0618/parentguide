import type { FAQ } from '@/types/content';

interface Props {
  items: FAQ[];
  title?: string;
}

/**
 * FAQ 섹션
 *
 * HTML <details>/<summary>로 구현 - JavaScript 없이 열기·닫기 동작.
 * 접근성: 키보드 탐색, 스크린 리더 모두 지원 (브라우저 기본 동작).
 * 시니어 친화: 충분한 터치 영역, 명확한 질문·답변 구분.
 *
 * 사용 예:
 *   {item.faq && item.faq.length > 0 && (
 *     <FAQSection items={item.faq} />
 *   )}
 */
export default function FAQSection({ items, title = '자주 묻는 질문' }: Props) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">{title}</h2>

      <dl className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-lg border border-gray-200 bg-white"
          >
            {/* 질문 - 클릭·탭으로 열기·닫기 */}
            <summary
              className="flex cursor-pointer list-none items-start justify-between
                         gap-3 px-5 py-4 font-semibold text-gray-900
                         hover:bg-gray-50
                         [&::-webkit-details-marker]:hidden"
            >
              <dt className="flex-1">{item.question}</dt>

              {/* 열림/닫힘 표시 - CSS group-open으로 회전 */}
              <span
                className="mt-0.5 shrink-0 text-gray-500 group-open:rotate-180 transition-transform"
                aria-hidden="true"
              >
                ▾
              </span>
            </summary>

            {/* 답변 */}
            <dd className="border-t border-gray-100 px-5 pb-4 pt-3 text-gray-700">
              {item.answer}
            </dd>
          </details>
        ))}
      </dl>
    </section>
  );
}
