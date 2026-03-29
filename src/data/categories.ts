import type { Category } from '@/types/navigation';

/**
 * 3개 메인 카테고리 정의.
 * 내비게이션, 카테고리 목록 페이지, JSON-LD에서 이 배열을 참조.
 */
export const categories: Category[] = [
  {
    slug: 'pension-welfare',
    label: '연금·복지·혜택',
    description:
      '기초연금 수령 방법, 노인 복지급여, 정부 지원혜택 신청까지 단계별로 정리합니다.',
    href: '/category/pension-welfare',
  },
  {
    slug: 'health-care',
    label: '건강보험·검진·돌봄',
    description:
      '건강보험 본인부담 절감, 국가검진 활용, 장기요양·돌봄 서비스 신청 방법을 안내합니다.',
    href: '/category/health-care',
  },
  {
    slug: 'finance-safety',
    label: '금융·생활안전',
    description:
      '노후 금융 관리, 보이스피싱·금융사기 예방, 생활 속 안전 정보를 정리합니다.',
    href: '/category/finance-safety',
  },
];

/** slug로 카테고리 단건 조회 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
