import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllSlugs,
  getContentBySlug,
  getRelatedContent,
} from '@/lib/content';
import { GuideTemplate } from '@/components/guide';
import JsonLd from '@/components/seo/JsonLd';
import {
  buildArticleJsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildBreadcrumbJsonLd,
  isHowToEligible,
} from '@/lib/jsonld';
import { buildGuideMetadata } from '@/lib/seo';
import { CATEGORY_LABELS } from '@/types/content';
import { getDownloadsByGuide } from '@/data/downloads';

// static export: 빌드 시 전체 slug 미리 생성
export function generateStaticParams() {
  return getAllSlugs();
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug(slug);
  if (!item) return {};
  return buildGuideMetadata(item);
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug(slug);
  if (!item) notFound();

  const relatedArticles = getRelatedContent(slug, 4);

  const relatedDownloads = getDownloadsByGuide(slug);

  // JSON-LD 스키마 조합
  const schemas: object[] = [
    buildArticleJsonLd(item),
    buildBreadcrumbJsonLd([
      { name: '홈', href: '/' },
      { name: CATEGORY_LABELS[item.category], href: `/category/${item.category}/` },
      { name: item.title, href: `/guide/${item.slug}/` },
    ]),
  ];
  if (item.faq && item.faq.length > 0) {
    schemas.push(buildFaqPageJsonLd(item.faq));
  }
  if (isHowToEligible(item)) {
    const howTo = buildHowToJsonLd(item);
    if (howTo) schemas.push(howTo);
  }

  return (
    <>
      <JsonLd schemas={schemas} />
      <GuideTemplate
        item={item}
        relatedArticles={relatedArticles}
        relatedDownloads={relatedDownloads}
      />
    </>
  );
}
