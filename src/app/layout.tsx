import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { siteConfig, getSiteUrl } from '@/config/siteConfig';
import { LayoutShell } from '@/components/layout';
import CookieConsent from '@/components/CookieConsent';
import JsonLd from '@/components/seo/JsonLd';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/jsonld';

/* ── AdSense 연결 환경변수 ─────────────────────────────────────
   .env.production 에 아래 두 값을 설정하면 광고가 활성화됩니다.

     NEXT_PUBLIC_ADSENSE_ENABLED=true
     NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxx

   슬롯 ID는 src/components/ads/AdSlot.tsx 의 AD_SLOT_MAP에 입력.
   ─────────────────────────────────────────────────────────── */
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  openGraph: {
    type:        'website',
    siteName:    siteConfig.siteName,
    title:       siteConfig.defaultOgTitle,
    description: siteConfig.defaultOgDescription,
    locale:      'ko_KR',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '부모혜택 - 부모님 복지·건강·은퇴 정보를 한곳에',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       siteConfig.defaultOgTitle,
    description: siteConfig.defaultOgDescription,
    images: ['/og-default.png'],
  },
  robots: {
    index:  process.env.NODE_ENV === 'production',
    follow: process.env.NODE_ENV === 'production',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 웹폰트 - preload로 우선 로딩 + 비동기 적용 */}
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="alternate" type="application/rss+xml" title="부모혜택 RSS" href="/feed.xml" />
        <meta name="theme-color" content="#1D4ED8" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <JsonLd schemas={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
      </head>
      <body className="flex min-h-screen flex-col">

        {/* 접근성: 키보드 사용자를 위한 본문 바로가기 링크 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-white focus:no-underline"
        >
          본문 바로가기
        </a>

        <LayoutShell>{children}</LayoutShell>
        <CookieConsent />

        {/* ── AdSense 스크립트 ──────────────────────────────────
            NEXT_PUBLIC_ADSENSE_CLIENT 미설정 시 로드 안 함.
            strategy="afterInteractive": 페이지 인터랙티브 이후 로드
            (Core Web Vitals 영향 최소화)
            ─────────────────────────────────────────────────── */}
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

      </body>
    </html>
  );
}
