import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
};

export default function NotFound() {
  return (
    <div className="container-content py-20 text-center">
      <p className="text-6xl font-bold text-blue-200" aria-hidden="true">404</p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        요청하신 페이지를 찾을 수 없습니다
      </h1>

      <p className="mt-3 text-gray-600 leading-relaxed">
        주소가 변경되었거나 잘못 입력되었을 수 있습니다.<br />
        아래 링크에서 원하는 정보를 찾아보세요.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary no-underline">
          홈으로 가기
        </Link>
        <Link href="/category/pension-welfare/" className="btn-outline no-underline">
          연금·복지 가이드
        </Link>
      </div>

      <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 text-left max-w-md mx-auto">
        <p className="font-semibold text-gray-800 mb-3">이런 정보를 찾고 계신가요?</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/guide/basic-pension-application/" className="text-blue-700">
              기초연금 신청 방법
            </Link>
          </li>
          <li>
            <Link href="/guide/long-term-care-grade/" className="text-blue-700">
              장기요양등급 신청 절차
            </Link>
          </li>
          <li>
            <Link href="/guide/national-health-checkup-guide/" className="text-blue-700">
              국가건강검진 총정리
            </Link>
          </li>
          <li>
            <Link href="/hub/government-benefits/" className="text-blue-700">
              정부 혜택 한눈에 챙기기
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
