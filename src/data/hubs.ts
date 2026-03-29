import type { Hub } from '@/types/navigation';

/**
 * 상황형 허브 5개 정의.
 * "무엇을 받을 수 있나"가 아니라 "지금 이 상황이라면" 기준의 큐레이션 페이지.
 * 허브 페이지에서 관련 글을 묶어서 안내.
 */
export const hubs: Hub[] = [
  {
    slug: 'prepare-care',
    title: '부모님 돌봄·입원 준비',
    description:
      '갑작스러운 입원이나 요양 상황에서 챙겨야 할 건강보험·장기요양·간병 정보를 모았습니다.',
    href: '/hub/prepare-care',
    relatedCategories: ['health-care'],
  },
  {
    slug: 'retirement-income',
    title: '은퇴 후 소득 만들기',
    description:
      '국민연금·기초연금·주택연금 수령 전략과 은퇴 후 받을 수 있는 지원금을 정리했습니다.',
    href: '/hub/retirement-income',
    relatedCategories: ['pension-welfare', 'finance-safety'],
  },
  {
    slug: 'government-benefits',
    title: '정부 혜택 한눈에 챙기기',
    description:
      '놓치기 쉬운 복지급여·바우처·지원금을 상황별로 분류해 신청 방법까지 안내합니다.',
    href: '/hub/government-benefits',
    relatedCategories: ['pension-welfare'],
  },
  {
    slug: 'health-checkup',
    title: '건강검진·예방 활용하기',
    description:
      '국가 건강검진 대상·항목·결과 활용법과 건강보험 본인부담 줄이는 방법을 담았습니다.',
    href: '/hub/health-checkup',
    relatedCategories: ['health-care'],
  },
  {
    slug: 'financial-safety',
    title: '노후 재정·금융사기 대비',
    description:
      '노후 자산 관리 기초, 보이스피싱·금융사기 예방법, 안전한 금융 생활 가이드입니다.',
    href: '/hub/financial-safety',
    relatedCategories: ['finance-safety'],
  },
];

/** slug로 허브 단건 조회 */
export function getHubBySlug(slug: string): Hub | undefined {
  return hubs.find((h) => h.slug === slug);
}
