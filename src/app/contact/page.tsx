import { PolicyPageShell } from '@/components/layout';
import { buildPolicyMetadata } from '@/lib/seo';

export const metadata = buildPolicyMetadata(
  '문의 · 오류 제보',
  '부모혜택에 오류 제보, 업데이트 요청, 콘텐츠 제안을 남겨주세요.',
  'contact',
);

export default function ContactPage() {
  return (
    <PolicyPageShell
      title="문의 · 오류 제보"
      subtitle="정보 오류, 업데이트 요청, 콘텐츠 제안을 알려주세요."
    >

      <p>
        부모혜택의 정보 품질은 사용자 피드백과 함께 만들어집니다.
        글의 내용이 현행 기준과 다르거나, 보완이 필요한 내용을 발견하셨다면
        주저하지 말고 알려주세요.
      </p>

      <h2>이런 경우에 알려주세요</h2>
      <ul>
        <li>글의 내용이 최신 제도와 다른 경우</li>
        <li>금액, 날짜, 조건 등 구체적인 수치가 변경된 경우</li>
        <li>신청 방법이나 담당 기관 정보가 바뀐 경우</li>
        <li>설명이 불명확하거나 이해하기 어려운 부분이 있는 경우</li>
        <li>다루었으면 하는 주제나 콘텐츠 제안</li>
      </ul>

      <h2>연락 방법</h2>
      <p>
        현재 부모혜택은 운영 준비 중입니다. 정식 운영 후에는 아래 이메일로
        문의를 받을 예정입니다.
      </p>
      {/* TODO: 도메인 확정 후 실제 이메일 활성화 */}
      <div className="box-info">
        <p className="box-title">이메일 문의</p>
        <p className="mt-1 mb-0">
          정식 운영 후 이메일 문의가 가능해집니다.
          사이트 출시와 함께 연락처가 공개될 예정입니다.
        </p>
      </div>

      <h2>답변 기준</h2>
      <ul>
        <li>오류 제보 - 확인 후 수정하며, 별도 답변은 드리지 않을 수 있습니다.</li>
        <li>업데이트 요청 - 공식 출처에서 변경 내용이 확인되면 반영합니다.</li>
        <li>콘텐츠 제안 - 검토 후 향후 콘텐츠 계획에 반영할 수 있습니다.</li>
      </ul>

      <h2>관련 정책 페이지</h2>
      <p>
        부모혜택이 정보를 관리하는 방식이 궁금하시다면 아래 페이지를 참고하세요.
      </p>
      <ul>
        <li><a href="/editorial-policy">편집 원칙</a> - 글 작성 및 검토 기준</li>
        <li><a href="/source-policy">정보 출처 기준</a> - 참조 기관 및 출처 방식</li>
        <li><a href="/update-policy">업데이트 정책</a> - 정보 갱신 주기와 방식</li>
        <li><a href="/disclaimer">면책 고지</a> - 정보 이용 시 유의사항</li>
      </ul>

    </PolicyPageShell>
  );
}
