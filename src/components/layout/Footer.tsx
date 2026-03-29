import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import { categories } from '@/data/categories';
import Logo from './Logo';

/** 푸터 안내 링크 */
const INFO_LINKS = [
  { label: '소개', href: '/about' },
  { label: '편집 원칙', href: '/editorial-policy' },
  { label: '출처 기준', href: '/source-policy' },
  { label: '업데이트 정책', href: '/update-policy' },
  { label: '면책 고지', href: '/disclaimer' },
  { label: '문의', href: '/contact' },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container-site py-10 md:py-12">

        {/* ── 3단 그리드 ────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* 브랜드 설명 */}
          <div>
            <Logo />
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {siteConfig.siteSubDescription}
            </p>
          </div>

          {/* 카테고리 */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-800">
              카테고리
            </h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-600 no-underline hover:text-blue-700"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 안내 링크 */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-800">
              안내
            </h2>
            <ul className="space-y-2">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 no-underline hover:text-blue-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 하단 바 ───────────────────────────────────── */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            © {year} {siteConfig.siteName}.
            이 사이트의 정보는 참고 목적으로 제공되며,
            전문적인 법률·의료·금융 조언을 대신하지 않습니다.
          </p>
        </div>

      </div>
    </footer>
  );
}
