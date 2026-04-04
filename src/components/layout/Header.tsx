'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import Logo from './Logo';
import { hubs } from '@/data/hubs';
import FontSizeControl from '@/components/ui/FontSizeControl';
import SearchModal from '@/components/search/SearchModal';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="container-site">
        <div className="flex h-16 items-center justify-between">

          {/* ── 브랜드 ──────────────────────────────────── */}
          <Link
            href="/"
            className="no-underline hover:opacity-80"
          >
            <Logo />
          </Link>

          {/* ── 데스크탑 내비 ────────────────────────────── */}
          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="주요 메뉴"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 hover:text-gray-900"
              >
                {cat.label}
              </Link>
            ))}

            {/* 구분선 */}
            <span
              className="mx-2 inline-block h-4 w-px bg-gray-300"
              aria-hidden="true"
            />

            <Link
              href="/hub/government-benefits/"
              className="rounded-md px-3 py-2 text-sm font-medium text-blue-700 no-underline hover:bg-blue-50"
            >
              상황별 가이드
            </Link>

            {/* 구분선 */}
            <span
              className="mx-2 inline-block h-4 w-px bg-gray-300"
              aria-hidden="true"
            />

            <FontSizeControl />

            {/* 검색 버튼 */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="ml-1 inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              aria-label="검색"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
              </svg>
            </button>
          </nav>

          {/* ── 모바일 우측 버튼 그룹 ───────────────────── */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="검색"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
            {menuOpen ? (
              /* X 아이콘 */
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* 햄버거 아이콘 */
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
            </button>
          </div>
        </div>
      </div>

      {/* ── 검색 모달 ────────────────────────────────────── */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── 모바일 메뉴 ──────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-200 bg-white md:hidden"
        >
          <nav className="container-site py-2" aria-label="모바일 메뉴">

            {/* 카테고리 */}
            <div className="py-2">
              <span className="block px-2 pb-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                카테고리
              </span>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="block rounded-md px-2 py-2 text-base font-medium leading-snug !text-gray-900 no-underline hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 mx-2" />

            {/* 상황별 가이드 */}
            <div className="py-2">
              <span className="block px-2 pb-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                상황별 가이드
              </span>
              {hubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={hub.href}
                  className="block rounded-md px-2 py-2 text-base leading-snug !text-gray-700 no-underline hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {hub.title}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 mx-2" />

            {/* 글자 크기 + 안내 링크 */}
            <div className="flex items-center justify-between gap-4 px-2 py-3">
              <FontSizeControl />
              <ul className="list-none flex flex-wrap justify-end gap-x-4 gap-y-1 p-0 m-0">
                {[
                  { label: '소개', href: '/about' },
                  { label: '면책 고지', href: '/disclaimer' },
                  { label: '개인정보', href: '/privacy-policy' },
                  { label: '문의', href: '/contact' },
                ].map((link) => (
                  <li key={link.href} className="m-0">
                    <Link
                      href={link.href}
                      className="text-xs !text-gray-400 no-underline hover:!text-gray-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}
