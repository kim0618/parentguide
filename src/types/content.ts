/**
 * 콘텐츠 공통 타입 정의
 *
 * 현재: src/data/articles/*.ts 의 TS 배열로 운용
 * MDX 전환 시: frontmatter가 ContentItem 인터페이스를 그대로 따르도록 작성하면
 *              컴포넌트·라우팅·쿼리 함수 변경 최소화
 *
 * 전환 가이드:
 *   - ContentItem 필드 → MDX frontmatter 키로 1:1 매핑
 *   - sections 배열 → MDX 파일 본문으로 이동 (ContentItem에서 제거)
 *   - lib/content.ts에서 gray-matter 파싱으로 교체
 */

/* ── 열거형 타입 ──────────────────────────────────────────────── */

/**
 * 콘텐츠 카테고리 (상단 내비게이션 3개 기준)
 *
 * pension-welfare : 연금·복지·혜택
 * health-care     : 건강보험·검진·돌봄
 * finance-safety  : 금융·생활안전
 */
export type ContentCategory =
  | 'pension-welfare'
  | 'health-care'
  | 'finance-safety';

/** 카테고리 한글 레이블 */
export const CATEGORY_LABELS: Record<ContentCategory, string> = {
  'pension-welfare': '연금·복지·혜택',
  'health-care':     '건강보험·검진·돌봄',
  'finance-safety':  '금융·생활안전',
};

/**
 * 페이지 렌더링 템플릿
 *
 * standard   - 기본 가이드 형식 (대부분의 글)
 * policy     - 정책 안내 형식 (effectiveDate, officialSources 강조)
 * checklist  - 체크리스트 형식 (준비사항·신청 절차 중심)
 * calculator - 계산기 연결형 (CTA를 상단에 배치)
 * comparison - 비교형 (표·항목 대조 중심)
 */
export type ContentTemplate =
  | 'standard'
  | 'policy'
  | 'checklist'
  | 'calculator'
  | 'comparison';

/**
 * 대상 독자
 *
 * senior - 시니어 본인 대상
 * family - 자녀·보호자 대상
 * both   - 시니어 + 자녀 공통
 */
export type TargetUser = 'senior' | 'family' | 'both';

/**
 * 콘텐츠 검토 상태
 *
 * current      - 최신 정보 확인됨
 * needs-review - 정책 변경 가능성, 검토 필요
 * outdated     - 오래된 정보, 조만간 업데이트 예정
 */
export type ReviewStatus = 'current' | 'needs-review' | 'outdated';


/* ── 하위 데이터 타입 ─────────────────────────────────────────── */

/** 공식 출처 참조 */
export interface OfficialSource {
  /** 기관명 (예: '보건복지부', '국민건강보험공단') */
  name: string;
  /** 공식 URL */
  url: string;
  /** 참고사항 (예: '2025년 1월 기준 안내 페이지') */
  note?: string;
}

/** FAQ 항목 */
export interface FAQ {
  question: string;
  answer: string;
}

/**
 * 제이퍼 계산기 연동 정보
 *
 * 설계 원칙:
 * - 현재 공개된 계산기만 연결 대상 (임의 URL 생성 금지)
 * - 금융·이자 / 건강 카테고리만 우선 연결
 * - 시니어 특화 계산기는 애드센스 승인 완료 후 추가
 * - relatedCalculator 값이 없으면 CTA를 노출하지 않음
 */
export interface RelatedCalculator {
  /** 계산기 서비스 브랜드명 (예: '제이퍼 계산기') */
  brand: string;
  /** 계산기 이름 (예: '예금 이자 계산기') */
  name: string;
  /** 실제 계산기 URL - 확인된 URL만 입력, 임의 생성 금지 */
  url: string;
  /** 링크 열기 방식 */
  openMode: 'new-tab' | 'same-tab';
  /**
   * 계산기 카테고리
   *
   * finance - 금융·이자 (예금, 적금, 복리, 대출, 투자수익률)
   * health  - 건강 (BMI, 기초대사량, 체지방률, 칼로리, 적정체중)
   */
  category: 'finance' | 'health';
  /**
   * 교차 사이트 추적 키 (향후 UTM 또는 자체 추적에 활용)
   * 현재 단계에서는 설계만 가능, 실제 값은 추후 입력
   */
  crossSiteTrackingKey?: string;
}

/** 계산기 CTA 버튼 텍스트 */
export interface CalculatorCTA {
  /** 버튼 본문 (예: '내 예금 이자 계산해보기') */
  text: string;
  /** 버튼 하단 보조 설명 (예: '제이퍼 계산기에서 무료로 이용') */
  subText?: string;
}

/**
 * 본문 섹션 타입 (TS/JSON 데이터 단계에서 사용)
 *
 * MDX 전환 시: 이 타입은 삭제하고 MDX 파일 본문으로 대체
 *
 * text          - 일반 텍스트 단락
 * list          - 순서 없는 목록
 * numbered-list - 순서 있는 목록 (절차·단계)
 * info          - 안내 박스 (box-info)
 * tip           - 실천 팁 박스 (box-tip)
 * warning       - 주의사항 박스 (box-warning)
 * summary       - 핵심 요약 박스 (box-summary)
 */
export type SectionType =
  | 'text'
  | 'list'
  | 'numbered-list'
  | 'info'
  | 'tip'
  | 'warning'
  | 'summary';

/** 본문 섹션 */
export interface ContentSection {
  type: SectionType;
  /** 섹션 제목 (선택 - 없으면 제목 없이 본문만 렌더링) */
  heading?: string;
  /** 단락 텍스트 (text / info / tip / warning / summary 타입에서 사용) */
  body?: string;
  /** 목록 항목 (list / numbered-list 타입에서 사용) */
  items?: string[];
}


/* ── 메인 콘텐츠 인터페이스 ──────────────────────────────────── */

/**
 * ContentItem - 콘텐츠 항목 공통 인터페이스
 *
 * TS 데이터: ContentItem[] 배열로 직접 선언
 * MDX 전환: frontmatter 키가 이 인터페이스를 따르도록 작성
 *           sections 필드는 MDX 전환 시 파일 본문으로 이동
 */
export interface ContentItem {

  /* ── 핵심 식별 ─────────────────────────────────── */

  /** URL slug (예: 'basic-pension-application') - 사이트 전체에서 고유 */
  slug: string;

  /** 페이지 제목 */
  title: string;

  /** 소속 카테고리 */
  category: ContentCategory;

  /** 페이지 렌더링 템플릿 */
  template: ContentTemplate;

  /** 대상 독자 */
  targetUser: TargetUser;


  /* ── 날짜 ──────────────────────────────────────── */

  /** 최초 게시일 (ISO 날짜, 예: '2025-01-15') */
  createdAt: string;

  /** 최종 수정일 (ISO 날짜) */
  updatedAt: string;

  /**
   * 정책·제도 기준일 (ISO 날짜, policy 템플릿에서 특히 중요)
   * 예: 2025년 1월 인상된 기초연금 기준일 → '2025-01-01'
   */
  effectiveDate?: string;


  /* ── 편집 상태 ─────────────────────────────────── */

  reviewStatus: ReviewStatus;


  /* ── SEO / 소셜 ────────────────────────────────── */

  /**
   * 목록 카드 + meta description 용 요약 (2~3문장)
   * seoDescription이 없으면 이 값이 meta description으로 사용됨
   */
  summary: string;

  /**
   * <title> 태그 전용 텍스트 (없으면 title 사용)
   * 키워드 최적화가 필요할 때만 title과 다르게 설정
   */
  seoTitle?: string;

  /** meta description 전용 텍스트 (없으면 summary 사용) */
  seoDescription?: string;


  /* ── 콘텐츠 구조 ───────────────────────────────── */

  /**
   * 페이지 상단 대표 설명 (summary보다 길어도 됨)
   * 없으면 summary를 fallback으로 사용
   */
  heroDescription?: string;

  /** 검색·태그 필터용 */
  tags?: string[];

  /**
   * 목록 카드에 표시할 핵심 포인트 (최대 3개 권장)
   * MDX 전환 후에도 frontmatter 키로 유지
   */
  keyPoints?: string[];

  /**
   * 본문 섹션 배열 (TS/JSON 데이터 단계 전용)
   * MDX 전환 시: 이 필드를 삭제하고 MDX 파일 본문으로 이동
   */
  sections?: ContentSection[];

  /** FAQ 항목 목록 */
  faq?: FAQ[];

  /**
   * 주의·면책 메모 (글 하단에 작은 글씨로 표시)
   * 예: '이 글은 2025년 1월 기준이며, 정책 변경 시 내용이 달라질 수 있습니다.'
   */
  cautionNote?: string;


  /* ── 연결 구조 ─────────────────────────────────── */

  /**
   * 연관 허브 slug 배열
   * 허브 페이지에서 관련 글을 동적으로 모을 때 사용
   * 예: ['retirement-income', 'government-benefits']
   */
  hubKey?: string[];

  /** 연관 글 slug 배열 (상세 페이지 하단 '관련 글' 섹션) */
  relatedSlugs?: string[];

  /** 카테고리/허브 내 정렬 순서 (낮을수록 먼저 노출) */
  order?: number;

  /** 홈·카테고리 상단 주목 노출 여부 */
  isFeatured?: boolean;


  /* ── 공식 출처 ─────────────────────────────────── */

  /** 공식 출처 참조 목록 (policy 템플릿에서 특히 중요) */
  officialSources?: OfficialSource[];


  /* ── 계산기 연동 (optional) ───────────────────── */

  /**
   * 연결할 제이퍼 계산기 정보
   * 값이 없으면 CTA 버튼을 노출하지 않음
   */
  relatedCalculator?: RelatedCalculator;

  /**
   * 계산기 CTA 버튼 텍스트
   * relatedCalculator가 있을 때만 의미 있음
   */
  calculatorCTA?: CalculatorCTA;
}


/* ── 파생 타입 ────────────────────────────────────────────────── */

/**
 * 목록 페이지용 요약 타입
 * sections(본문)·faq를 제외한 메타데이터만 포함
 * MDX 전환 후: frontmatter 파싱 결과가 이 타입과 동일한 구조
 */
export type ContentListItem = Omit<ContentItem, 'sections' | 'faq'>;
