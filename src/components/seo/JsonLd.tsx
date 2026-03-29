/**
 * JSON-LD 구조화 데이터 삽입 컴포넌트
 *
 * <script type="application/ld+json"> 태그를 렌더링.
 * 여러 스키마를 배열로 전달하면 각각 별도 script 태그로 삽입됨.
 *
 * 사용 예:
 *   import JsonLd from '@/components/seo/JsonLd';
 *   import { buildArticleJsonLd, buildFaqPageJsonLd } from '@/lib/jsonld';
 *
 *   <JsonLd schemas={[buildArticleJsonLd(item), buildFaqPageJsonLd(item.faq!)]} />
 */

interface Props {
  /** JSON-LD 스키마 객체 배열 */
  schemas: object[];
}

export default function JsonLd({ schemas }: Props) {
  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
