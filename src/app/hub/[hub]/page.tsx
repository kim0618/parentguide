import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getHubBySlug, hubs } from '@/data/hubs';
import { getHubDetailBySlug } from '@/data/hubDetails';
import { getContentByHubKey, getContentListItems } from '@/lib/content';
import { HubTemplate } from '@/components/hub';
import JsonLd from '@/components/seo/JsonLd';
import { buildWebPageJsonLd, buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { buildHubMetadata } from '@/lib/seo';
import { getDownloadsByHub } from '@/data/downloads';

// static export: 빌드 시 5개 허브 경로 미리 생성
export function generateStaticParams() {
  return hubs.map((h) => ({ hub: h.slug }));
}

interface Props {
  params: Promise<{ hub: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hub } = await params;
  const hubData = getHubBySlug(hub);
  if (!hubData) return {};
  return buildHubMetadata(hubData);
}

export default async function HubPage({ params }: Props) {
  const { hub } = await params;

  const hubData = getHubBySlug(hub);
  if (!hubData) notFound();

  const detail = getHubDetailBySlug(hub);
  if (!detail) notFound();

  const allArticles = getContentByHubKey(hub);
  const articles = getContentListItems(allArticles);
  const relatedDownloads = getDownloadsByHub(hub);

  const schemas = [
    buildWebPageJsonLd({
      title:       hubData.title,
      description: hubData.description,
      path:        `${hubData.href}/`,
    }),
    buildBreadcrumbJsonLd([
      { name: '홈',           href: '/' },
      { name: hubData.title, href: `${hubData.href}/` },
    ]),
  ];

  return (
    <>
      <JsonLd schemas={schemas} />
      <HubTemplate
        hub={hubData}
        detail={detail}
        articles={articles}
        relatedDownloads={relatedDownloads}
      />
    </>
  );
}
