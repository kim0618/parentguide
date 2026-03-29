import { PolicyPageShell } from '@/components/layout';
import { buildPolicyMetadata } from '@/lib/seo';

export const metadata = buildPolicyMetadata(
  '정보 출처 기준',
  '부모혜택이 어떤 기관의 자료를 정보 근거로 사용하는지 설명합니다.',
  'source-policy',
);

export default function SourcePolicyPage() {
  return (
    <PolicyPageShell
      title="정보 출처 기준"
      subtitle="부모혜택이 어떤 자료를 근거로 정보를 작성하는지 설명합니다."
      updatedAt="2025년 3월"
    >

      <p>
        부모혜택의 모든 정보는 공식 기관에서 발행하거나 운영하는 자료를 기반으로
        합니다. 민간 블로그나 뉴스 기사, 유튜브 등 비공식 경로는 참고하더라도
        그 내용의 정확성을 반드시 공식 출처에서 재확인합니다.
      </p>

      <h2>주요 참조 기관</h2>
      <p>
        아래는 부모혜택이 정보 작성 시 주요하게 참조하는 공식 기관입니다.
        각 기관 사이트의 안내문, 법령 공고, 보도자료를 기준으로 합니다.
      </p>

      <ul>
        <li>
          <strong>보건복지부</strong> (mohw.go.kr) -
          기초연금, 노인복지, 돌봄 서비스 정책 전반
        </li>
        <li>
          <strong>국민건강보험공단</strong> (nhis.or.kr) -
          건강보험, 장기요양보험, 국가건강검진 제도
        </li>
        <li>
          <strong>국민연금공단</strong> (nps.or.kr) -
          국민연금 수령 기준, 기초연금 연계 정보
        </li>
        <li>
          <strong>복지로</strong> (bokjiro.go.kr) -
          복지급여 통합 조회 및 신청 포털
        </li>
        <li>
          <strong>노인장기요양보험</strong> (longtermcare.or.kr) -
          요양등급 기준, 급여 유형, 이의신청 절차
        </li>
        <li>
          <strong>금융감독원</strong> (fss.or.kr) -
          금융사기 예방, 금융소비자 보호 정보
        </li>
        <li>
          <strong>경찰청 사이버안전국</strong> (cyberbureau.police.go.kr) -
          사이버 금융범죄 신고 및 예방 정보
        </li>
      </ul>

      <h2>출처 표시 방식</h2>
      <p>
        각 글 하단의 "공식 출처 확인" 섹션에서 해당 글이 참조한 기관을 확인할 수
        있습니다. 기관 이름과 함께 해당 기관 사이트로 연결되는 링크를 제공합니다.
      </p>

      <h2>출처 자료의 한계</h2>
      <p>
        공식 기관 자료도 오류가 있을 수 있으며, 발표 후 제도가 변경되었으나
        자료가 즉시 업데이트되지 않는 경우도 있습니다. 부모혜택은 최신 자료를
        기준으로 작성하지만, 중요한 결정 전에는 담당 기관에 직접 확인하시기를
        권장합니다.
      </p>
      <p>
        정보 오류를 발견하셨다면 <a href="/contact">문의 페이지</a>를 통해
        알려주시면 빠르게 확인하고 반영하겠습니다.
      </p>

    </PolicyPageShell>
  );
}
