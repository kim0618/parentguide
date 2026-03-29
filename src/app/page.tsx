import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/siteConfig';
import { hubs } from '@/data/hubs';
import { categories } from '@/data/categories';
import {
  getFeaturedContent,
  getContentListItems,
  getContentByCategory,
  getAllContent,
} from '@/lib/content';
import { getAllDownloads } from '@/data/downloads';
import ArticleCard from '@/components/content/ArticleCard';
import HubGuideCard from '@/components/content/HubGuideCard';
import { PdfDownloadCard } from '@/components/download';
import { AdSlot } from '@/components/ads';

export const metadata: Metadata = {
  title: siteConfig.defaultOgTitle,
  description: siteConfig.siteDescription,
};

export default function HomePage() {
  const featuredArticles = getContentListItems(getFeaturedContent(3));
  const allDownloads = getAllDownloads();
  const totalArticles = getAllContent().length;
  const categoriesWithCount = categories.map((c) => ({
    ...c,
    count: getContentByCategory(c.slug).length,
  }));

  return (
    <div>

      {/* ══════════════════════════════════════════════════════════
          1. 히어로 - 사이트 정체성을 3초 안에 이해
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="container-wide py-16 sm:py-20">
          <div className="max-w-2xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-700">
              시니어·가족 복지 정보 가이드
            </p>

            <h1 className="text-4xl font-bold text-gray-900 leading-snug sm:text-5xl">
              부모님 복지·건강·은퇴<br />정보를 한곳에
            </h1>

            <p className="mt-5 text-xl text-gray-600 leading-relaxed">
              {siteConfig.siteSubDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#hubs" className="btn-primary no-underline">
                상황별 가이드 보기
              </a>
              <Link
                href="/guide/basic-pension-application/"
                className="btn-outline no-underline"
              >
                기초연금 신청 방법
              </Link>
            </div>

            {/* 신뢰 통계 */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {[
                { value: `${totalArticles}편`, label: '가이드' },
                { value: `${hubs.length}개`, label: '상황별 허브' },
                { value: '2025년', label: '최신 기준' },
              ].map(({ value, label }) => (
                <span key={label} className="text-sm text-gray-500">
                  <span className="font-bold text-blue-700">{value}</span>{' '}
                  {label}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          2. 상황별 허브 - 주요 진입점
          ══════════════════════════════════════════════════════════ */}
      <section id="hubs" aria-labelledby="hubs-heading" className="py-14">
        <div className="container-wide">

          <div className="mb-8">
            <h2 id="hubs-heading" className="mt-0">
              이런 상황이라면 여기서 시작하세요
            </h2>
            <p className="text-gray-600">
              지금 처한 상황에 맞는 정보만 골라서 안내합니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {hubs.map((hub) => (
              <HubGuideCard key={hub.slug} hub={hub} sourcePage="home" />
            ))}
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          3. 대표 글 - 많이 찾는 가이드
          ══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="featured-heading"
        className="border-t border-gray-100 bg-gray-50 py-14"
      >
        <div className="container-wide">

          <div className="mb-8">
            <h2 id="featured-heading" className="mt-0">많이 찾는 가이드</h2>
            <p className="text-gray-600">
              처음 방문이라면 이 글부터 읽어보세요.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} item={article} />
            ))}
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          4. 카테고리 - 주제별 탐색
          ══════════════════════════════════════════════════════════ */}
      <section aria-labelledby="categories-heading" className="py-14">
        <div className="container-wide">

          <div className="mb-8">
            <h2 id="categories-heading" className="mt-0">주제별로 찾아보기</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {categoriesWithCount.map((cat) => {
              const accentColor =
                cat.slug === 'pension-welfare' ? 'bg-blue-600' :
                cat.slug === 'health-care'     ? 'bg-green-600' :
                                                 'bg-amber-500';
              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="card-link block no-underline"
                  aria-label={`${cat.label} 카테고리 - 글 ${cat.count}개`}
                >
                  <span className={`mb-3 block h-1 w-8 rounded-full ${accentColor}`} aria-hidden="true" />
                  <p className="font-semibold text-gray-900">{cat.label}</p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {cat.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-blue-700">
                    글 {cat.count}개 →
                  </p>
                </Link>
              );
            })}
          </div>

        </div>
      </section>


      {/*
        ── [광고] home-after-categories ──────────────────────────
        위치: 카테고리 섹션 이후 ~ PDF·도구 섹션 사이
        조건:
          - 히어로(1번)·허브 진입(2번)·대표글(3번)·카테고리(4번) 이후
            → 스크롤 충분히 내려온 뒤 → 첫 스크린 초과 보장
          - 섹션 구분선 역할 + 자연스러운 흐름 단절 위치
        금지: 히어로·허브·대표글 섹션 내 배치 금지
      */}
      <div className="container-wide">
        <AdSlot position="home-after-categories" format="horizontal" />
      </div>


      {/* ══════════════════════════════════════════════════════════
          5. PDF 자료 · 계산기 - 직접 활용하기
          ══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="tools-heading"
        className="border-t border-gray-100 bg-gray-50 py-14"
      >
        <div className="container-wide">

          <h2 id="tools-heading" className="mt-0 mb-2">
            직접 활용하기
          </h2>
          <p className="text-gray-600 mb-10">
            인쇄하거나 PDF로 저장해 필요할 때 꺼내 쓰세요.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {allDownloads.map((dl) => (
              <PdfDownloadCard key={dl.id} item={dl} variant="card" />
            ))}
          </div>

          {/* 계산기 연결 (보조) */}
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-base font-semibold text-gray-900 mb-0">
              계산이 필요할 때
            </p>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              연금·건강보험 관련 계산이 필요하다면 제이퍼 계산기에서
              직접 확인해보세요. 예금·적금·BMI 등 생활 밀착 계산기를
              무료로 이용할 수 있습니다.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={siteConfig.calculatorSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline no-underline text-sm"
                aria-label={`${siteConfig.calculatorSiteName} 사이트 열기 (새 탭)`}
              >
                {siteConfig.calculatorSiteName}
              </a>
              <span className="text-xs text-gray-400">
                {siteConfig.calculatorSiteAltName} · 무료
              </span>
            </div>
            <p className="mt-4 mb-0 text-xs text-gray-400 leading-relaxed">
              시니어 특화 연금·의료 계산기는 추후 순차적으로 연결될 예정입니다.
            </p>
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          6. 신뢰 요소 - 운영 기준 간략 안내
          ══════════════════════════════════════════════════════════ */}
      <section
        aria-label="운영 기준 안내"
        className="border-t border-gray-200 py-10"
      >
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-center sm:justify-start sm:text-left">
            {[
              '2025년 기준 최신 정보 검토',
              '보건복지부·공단 등 공식 출처 기반',
              '제도 변경 시 수시 업데이트',
              '어르신·자녀 누구나 읽기 쉽게',
            ].map((text) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-sm text-gray-500"
              >
                <span className="font-bold text-blue-500" aria-hidden="true">
                  ✓
                </span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
