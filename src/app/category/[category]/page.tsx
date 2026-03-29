import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, categories } from '@/data/categories';
import { getCategoryListItems } from '@/lib/content';
import { buildCategoryMetadata } from '@/lib/seo';
import ArticleCard from '@/components/content/ArticleCard';
import { Breadcrumb } from '@/components/ui';

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return buildCategoryMetadata(cat.label, cat.description, cat.slug);
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const articles = getCategoryListItems(category as 'pension-welfare' | 'health-care' | 'finance-safety');

  const accentColor =
    cat.slug === 'pension-welfare' ? 'bg-blue-600' :
    cat.slug === 'health-care'     ? 'bg-green-600' :
                                     'bg-amber-500';

  return (
    <div>
      {/* 컬러 헤더 */}
      <section className="bg-blue-50 border-b border-blue-100">
        <div className="container-wide py-10">
          <Breadcrumb
            className="mb-4"
            items={[{ label: '홈', href: '/' }, { label: cat.label }]}
          />

          <span className={`mb-3 block h-1 w-10 rounded-full ${accentColor}`} aria-hidden="true" />
          <h1 className="mb-3">{cat.label}</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            {cat.description}
          </p>
          <p className="mt-3 text-sm text-gray-500">글 {articles.length}편</p>
        </div>
      </section>

      {/* 글 목록 */}
      <div className="container-wide py-10">
        {articles.length > 0 ? (
          <section aria-labelledby="articles-heading">
            <h2 id="articles-heading" className="sr-only">
              {cat.label} 관련 글 목록
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.slug} item={article} />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-gray-500">관련 글을 준비 중입니다.</p>
        )}
      </div>
    </div>
  );
}
