import { PolicyPageShell } from '@/components/layout';
import { buildPolicyMetadata } from '@/lib/seo';

export const metadata = buildPolicyMetadata(
  '개인정보처리방침',
  '부모혜택의 개인정보 수집, 이용, 보관 및 삭제에 관한 안내입니다.',
  'privacy-policy',
);

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageShell
      title="개인정보처리방침"
      subtitle="부모혜택이 수집하는 정보와 그 처리 방법을 안내합니다."
      updatedAt="2026년 3월"
    >

      <p>
        부모혜택(이하 "사이트")은 이용자의 개인정보를 중요하게 여기며,
        「개인정보 보호법」 등 관련 법령을 준수합니다. 이 개인정보처리방침은
        사이트가 수집하는 정보의 종류, 이용 목적, 보관 기간, 이용자의 권리를
        안내합니다.
      </p>

      <h2>1. 수집하는 정보</h2>
      <p>
        부모혜택은 별도의 회원가입 절차가 없으며, 이용자로부터 이름, 이메일,
        전화번호 등의 개인정보를 직접 수집하지 않습니다.
        다만 사이트 이용 과정에서 아래 정보가 자동으로 생성되어 수집될 수 있습니다.
      </p>
      <ul>
        <li>방문 기록(페이지 조회, 체류 시간, 유입 경로 등) - Google Analytics를 통해 수집</li>
        <li>기기 정보(브라우저 유형, 운영체제, 화면 해상도 등)</li>
        <li>쿠키(Cookie) 및 유사 기술을 통한 식별 정보</li>
      </ul>

      <h2>2. 정보의 이용 목적</h2>
      <p>수집된 정보는 아래 목적으로만 이용됩니다.</p>
      <ul>
        <li>사이트 이용 현황 분석 및 콘텐츠 개선</li>
        <li>사이트 오류 탐지 및 기술적 문제 해결</li>
        <li>광고 게재 및 광고 성과 측정 (Google AdSense 이용 시)</li>
      </ul>

      <h2>3. 쿠키(Cookie) 사용</h2>
      <p>
        부모혜택은 이용자 경험 향상과 통계 분석을 위해 쿠키를 사용합니다.
        쿠키는 웹사이트가 브라우저에 저장하는 작은 텍스트 파일로, 이용자를
        개인적으로 식별하지 않습니다.
      </p>
      <h3>사용하는 쿠키 유형</h3>
      <ul>
        <li>
          <strong>필수 쿠키</strong> - 사이트 기본 기능(글자 크기 설정 등)에 필요한
          쿠키로, 비활성화할 수 없습니다.
        </li>
        <li>
          <strong>분석 쿠키</strong> - Google Analytics가 방문 통계를 수집하기 위해
          사용하는 쿠키입니다. 이용자의 동의 후에만 활성화됩니다.
        </li>
        <li>
          <strong>광고 쿠키</strong> - Google AdSense가 맞춤 광고를 제공하기 위해
          사용하는 쿠키입니다. 이용자의 동의 후에만 활성화됩니다.
        </li>
      </ul>
      <h3>쿠키 관리 방법</h3>
      <p>
        브라우저 설정에서 쿠키를 차단하거나 삭제할 수 있습니다. 다만 일부 쿠키를
        차단하면 사이트 기능이 제한될 수 있습니다.
      </p>

      <h2>4. 제3자 서비스</h2>
      <p>부모혜택은 아래 제3자 서비스를 이용하며, 각 서비스의 개인정보 처리 방침이 적용됩니다.</p>
      <ul>
        <li>
          <strong>Google Analytics</strong> - 방문 통계 수집.{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google 개인정보처리방침
          </a>
        </li>
        <li>
          <strong>Google AdSense</strong> - 광고 게재 및 성과 측정.{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
            Google 광고 정책
          </a>
        </li>
        <li>
          <strong>Cloudflare</strong> - 웹사이트 호스팅 및 보안.{' '}
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
            Cloudflare 개인정보처리방침
          </a>
        </li>
      </ul>

      <h2>5. 정보의 보관 및 삭제</h2>
      <p>
        부모혜택은 이용자의 개인정보를 직접 보관하지 않습니다. Google Analytics
        및 AdSense를 통해 수집된 데이터는 해당 서비스의 보관 정책에 따르며,
        Google Analytics의 경우 기본 보관 기간은 14개월입니다.
      </p>

      <h2>6. 이용자의 권리</h2>
      <p>이용자는 아래 권리를 행사할 수 있습니다.</p>
      <ul>
        <li>쿠키 동의를 철회하거나 브라우저 설정에서 쿠키를 삭제할 수 있습니다.</li>
        <li>
          Google Analytics 수집을 거부하려면{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics 차단 브라우저 부가기능
          </a>
          을 설치하세요.
        </li>
        <li>
          Google 맞춤 광고를 비활성화하려면{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google 광고 설정
          </a>
          에서 설정할 수 있습니다.
        </li>
      </ul>

      <h2>7. 방침 변경</h2>
      <p>
        이 개인정보처리방침은 법령 변경이나 서비스 변경 시 업데이트될 수 있습니다.
        변경 사항은 이 페이지에 게시하며, 중요한 변경의 경우 사이트 공지를 통해
        안내합니다.
      </p>

      <h2>8. 문의</h2>
      <p>
        개인정보 처리에 관한 문의 사항은{' '}
        <a href="/contact">문의 페이지</a>를 통해 알려주세요.
      </p>

    </PolicyPageShell>
  );
}
