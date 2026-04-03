# 부모혜택 (bumohyetaek) - CLAUDE.md

제이퍼계산기(jptcalc.kr)의 공식 정보 가이드 블로그.
시니어와 가족 대상 복지/건강보험/은퇴 실무 가이드를 제공하는 정적 사이트.

- **도메인**: https://www.bumohyetaek.kr
- **연계**: https://www.jptcalc.kr (제이퍼 계산기)
- **규모**: 103개 가이드 + 5개 허브 + 3개 카테고리 + 8개 PDF

---

## 기술 스택

| 항목 | 버전 |
|------|------|
| Next.js | 15.1 (App Router, **static export**) |
| React | 19 |
| TypeScript | 5.7 (strict) |
| Tailwind CSS | 3.4 |
| Fuse.js | 7.1 (클라이언트 검색) |
| Puppeteer | 24.40 (PDF 생성, devDependency) |

**배포 방식**: `npm run build` -> `out/` 디렉토리 정적 파일 배포 (output: 'export')

---

## 핵심 명령어

```bash
npm run dev       # 개발 (localhost:3000, HMR)
npm run build     # 프로덕션 빌드 (out/ 정적 파일 생성)
npm run lint      # ESLint
node scripts/generate-pdfs.mjs   # PDF 생성 (localhost:2000 필요)
```

---

## 프로젝트 구조

```
src/
  app/                          # Next.js App Router 페이지
    layout.tsx                  # 루트 레이아웃 (메타, 폰트, GA/AdSense)
    page.tsx                    # 홈 (히어로 + 허브 + 카테고리 + PDF + 연락처)
    globals.css                 # 글로벌 CSS (시니어 친화 타이포, 접근성)
    sitemap.ts / robots.ts      # SEO 자동 생성
    manifest.ts                 # PWA
    guide/[slug]/page.tsx       # 가이드 상세 (103개)
    category/[category]/        # 카테고리 목록 (3개)
    hub/[hub]/page.tsx          # 허브 (5개)
    print/[slug]/               # 인쇄용 (8개, robots에서 색인 제외)
    feed.xml/                   # RSS
    about/ contact/ disclaimer/ editorial-policy/
    privacy-policy/ source-policy/ update-policy/
    not-found.tsx               # 404

  components/
    layout/       # Header, Footer, LayoutShell, Logo, PolicyPageShell
    guide/        # GuideTemplate, ContentBody
    content/      # ArticleCard, CalculatorCTABox, FAQSection, KeyPointsBox,
                  # MobileBottomBar, ReviewStatusBox, ShareButtons,
                  # TableOfContents, CategoryArticleList, CautionBox,
                  # HubGuideCard, OfficialSourcesSection, PrepareListBox,
                  # PrintSummaryButton, TargetUserBox
    hub/          # HubTemplate
    download/     # PdfDownloadCard, PdfDownloadSection
    search/       # SearchModal (Fuse.js)
    seo/          # JsonLd
    ads/          # AdSlot
    analytics/    # TrackableLink
    ui/           # Badge, Breadcrumb, Button, FontSizeControl,
                  # HeroIllustration, ScrollToTop
    print/        # PrintPageShell
    CookieConsent.tsx

  data/
    articles/
      pension-welfare/   # 34개 글 + index.ts
      health-care/       # 35개 글 + index.ts
      finance-safety/    # 34개 글 + index.ts
    hubs.ts              # 5개 허브 메타데이터
    hubDetails.ts        # 허브 상세 (상황목록, 체크리스트, FAQ)
    categories.ts        # 3개 카테고리 정의
    downloads.ts         # 8개 PDF 자료

  lib/
    content.ts           # 글 쿼리 (getAllContent, getContentBySlug, ...)
    seo.ts               # Metadata 팩토리 (buildGuideMetadata, ...)
    jsonld.ts            # JSON-LD 스키마 빌더
    calculator.ts        # 제이퍼 계산기 URL 빌더 (UTM 파라미터)
    analytics.ts         # GA4 이벤트 (trackEvent, trackJptcalcClick)
    searchIndex.ts       # Fuse.js 검색 인덱스
    format.ts            # 포맷팅 헬퍼

  config/
    siteConfig.ts        # 브랜드, URL, SEO 기본값, getSiteUrl()

  types/
    content.ts           # ContentItem, ContentSection, FAQ, RelatedCalculator 등
    navigation.ts        # Category, Hub, NavLink
    download.ts          # PdfDownload
    hub.ts               # HubDetail
    index.ts             # 통합 export

scripts/
  generate-pdfs.mjs     # Puppeteer (localhost:2000 -> PDF)
  generate-icons.mjs    # SVG -> PNG 아이콘
  generate-og-image.mjs # OG 이미지

public/
  downloads/            # 8개 PDF 파일
  icon-192.png / icon-512.png / og-default.png
```

---

## 콘텐츠 시스템

### 카테고리 (3개)

| slug | 한글명 | 글 수 |
|------|--------|-------|
| `pension-welfare` | 연금/복지/혜택 | 34 |
| `health-care` | 건강보험/검진/돌봄 | 35 |
| `finance-safety` | 금융/생활안전 | 34 |

### 허브 (5개)

| slug | 제목 |
|------|------|
| `prepare-care` | 부모님 돌봄/입원 준비 |
| `retirement-income` | 은퇴 후 소득 만들기 |
| `government-benefits` | 정부 혜택 한눈에 챙기기 |
| `health-checkup` | 건강검진/예방 활용하기 |
| `financial-safety` | 노후 재정/금융사기 대비 |

### 글 구조 (ContentItem)

각 글은 `src/data/articles/{category}/{slug}.ts`에 개별 파일로 존재.
`ContentItem` 인터페이스는 `src/types/content.ts`에 정의.

**핵심 필드**:
- `slug`, `title`, `category`, `template`, `targetUser`
- `createdAt`, `updatedAt`, `effectiveDate?`, `reviewStatus`
- `summary`, `seoTitle?`, `seoDescription?`, `heroDescription?`
- `keyPoints?`, `sections?` (본문), `faq?`
- `tags?`, `hubKey?`, `relatedSlugs?`, `order?`, `isFeatured?`
- `officialSources?`, `relatedCalculator?`, `calculatorCTA?`
- `cautionNote?`

### 템플릿 5종

| template | 용도 |
|----------|------|
| `standard` | 기본 가이드 (대부분) |
| `policy` | 정책 안내 (effectiveDate, officialSources 강조) |
| `checklist` | 체크리스트 (numbered-list를 스텝 스타일로 표시) |
| `calculator` | 계산기 연결 (CTA 상단 배치) |
| `comparison` | 비교형 (표/항목 대조) |

### 본문 섹션 타입 (ContentSection)

| type | 렌더링 |
|------|--------|
| `text` | 일반 문단 (heading?, body) |
| `list` | 불릿 리스트 (heading?, items[]) |
| `numbered-list` | 번호 리스트 (heading?, items[]) |
| `info` | 안내 박스 - 파란색 (box-info) |
| `tip` | 팁 박스 - 초록색 (box-tip) |
| `warning` | 주의 박스 - 노란색/amber (box-warning) |
| `summary` | 요약 박스 - 회색 (box-summary) |

---

## 새 글 추가 방법

1. `src/data/articles/{category}/{slug}.ts` 파일 생성
2. `ContentItem` 구조에 맞춰 작성
3. 같은 카테고리의 `index.ts`에 import & 배열에 추가
4. 빌드 시 `generateStaticParams()`가 자동으로 페이지 생성

**콘텐츠 작성 가이드**: `CONTENT-PROMPT.md` 참고

---

## 스타일링 규칙

### 시니어 친화 기준 (globals.css)

- 기본 폰트: 18px (`html { font-size: 112.5% }`)
- 줄간격: 1.85 (body)
- 최소 터치 영역: 44px
- WCAG AA 색상 대비: brand blue #1D4ED8 (5.74:1)
- 폰트: Pretendard Variable (CDN)
- 한국어 줄바꿈: `word-break: keep-all`

### Tailwind 커스텀 (tailwind.config.ts)

```
colors.brand: DEFAULT=#1D4ED8, light=#DBEAFE, hover=#1E40AF, dark=#1E3A8A
maxWidth: content=48rem(768px), wide=64rem(1024px), site=72rem(1152px)
```

### 컨테이너 클래스 (globals.css)

| 클래스 | 용도 | 너비 |
|--------|------|------|
| `.container-content` | 글 본문 | 48rem (768px) |
| `.container-wide` | 목록/카드 | 64rem (1024px) |
| `.container-site` | 헤더/푸터 | 72rem (1152px) |

### 컴포넌트 클래스

- `.btn-primary` / `.btn-outline` / `.btn-ghost` / `.btn-sm` - 버튼
- `.box-info` / `.box-tip` / `.box-warning` / `.box-summary` - 정보 박스
- `.badge-blue` / `.badge-green` / `.badge-amber` / `.badge-gray` - 배지
- `.card` / `.card-link` - 카드
- `.text-meta` - 보조 텍스트 (text-sm text-gray-500)

---

## 제이퍼 계산기 연계

글의 `relatedCalculator` 필드로 계산기 CTA를 연결.

```typescript
relatedCalculator: {
  brand: '제이퍼 계산기',
  name: '만 나이 계산기',
  url: 'https://www.jptcalc.kr/calc/date/age/',  // 확인된 URL만!
  openMode: 'new-tab',
  category: 'finance' | 'health',
  crossSiteTrackingKey?: 'guide-basic-pension-age',  // UTM 추적용
}
```

- `lib/calculator.ts`의 `buildCalculatorUrl()`이 UTM 파라미터 자동 추가
- UTM: `utm_source=parentguide`, `utm_medium=cta`, `utm_campaign={trackingKey}`
- **원칙**: 실제 공개된 계산기 URL만 사용. 임의 URL 생성 금지.

---

## SEO 설정

### 메타데이터
- `lib/seo.ts`: 페이지 유형별 Metadata 팩토리 함수
  - `buildGuideMetadata()`, `buildHubMetadata()`, `buildCategoryMetadata()`, `buildPolicyMetadata()`
- `config/siteConfig.ts`: 브랜드/URL/설명 중앙 관리, `getSiteUrl()` 환경 분기

### JSON-LD (lib/jsonld.ts)
- 전역: Organization, WebSite, BreadcrumbList
- 글 상세: Article, FAQPage (FAQ 있을 때), HowTo (조건부)

### Sitemap/Robots (app/)
- sitemap.ts: 모든 페이지 동적 생성
- robots.ts: `/print/` 디렉토리 색인 제외
- Naver Search Advisor 인증 포함

---

## Analytics (lib/analytics.ts)

### GA4 이벤트 목록

| 이벤트명 | 설명 |
|----------|------|
| `hub_card_click` | 허브 카드 클릭 |
| `hub_article_click` | 허브 내 글 카드 클릭 |
| `official_source_click` | 공식기관 외부링크 |
| `jptcalc_click` | 제이퍼 계산기 이동 (통합) |
| `jptcalc_finance_click` | 금융 계산기 이동 |
| `jptcalc_health_click` | 건강 계산기 이동 |
| `pdf_download_click` | PDF 다운로드 |
| `home_cta_click` | 홈 CTA |

- `trackEvent<T>(name, params)`: 타입 안전한 이벤트 발송
- `trackJptcalcClick(params)`: jptcalc_click + 카테고리별 이벤트 동시 발송
- 개발: console.log / 프로덕션: window.gtag

---

## 환경변수

```
NEXT_PUBLIC_SITE_URL              # 사이트 URL (없으면 productionSiteUrl 사용)
NEXT_PUBLIC_GA_MEASUREMENT_ID     # GA4 측정 ID
NEXT_PUBLIC_ADSENSE_ENABLED       # AdSense 활성화
NEXT_PUBLIC_ADSENSE_CLIENT        # AdSense 클라이언트 ID
```

---

## PDF 생성 프로세스

1. `src/app/print/{slug}/` 인쇄용 페이지 작성
2. `src/data/downloads.ts`에 다운로드 항목 추가
3. 로컬 서버 실행 (포트 2000): 별도 터미널에서 `npx next start -p 2000`
4. `node scripts/generate-pdfs.mjs` 실행
5. `public/downloads/*.pdf` 생성됨

현재 8개 PDF: welfare-checklist, basic-pension-checklist, care-grade-checklist,
hospital-visit-checklist, financial-safety-checklist, survivor-pension-checklist,
vaccination-schedule, inheritance-checklist

---

## 데이터 흐름

```
src/data/articles/{category}/{slug}.ts   (글 데이터)
  -> {category}/index.ts                 (카테고리별 배열로 export)
  -> lib/content.ts                      (쿼리 함수로 합산/필터/정렬)
  -> app/guide/[slug]/page.tsx           (generateStaticParams -> 정적 생성)
  -> components/guide/GuideTemplate.tsx  (렌더링)
  -> components/guide/ContentBody.tsx    (sections 렌더링 엔진)
```

### 주요 쿼리 함수 (lib/content.ts)

| 함수 | 용도 |
|------|------|
| `getAllContent()` | 전체 103개 반환 |
| `getContentBySlug(slug)` | 단건 조회 |
| `getContentByCategory(category)` | 카테고리별 (최신순) |
| `getContentByHubKey(hubSlug)` | 허브 연결 글 |
| `getFeaturedContent(limit?)` | isFeatured=true 글 |
| `getRelatedContent(slug, limit)` | 관련 글 (relatedSlugs -> 같은 허브 -> 같은 카테고리) |
| `getAllSlugs()` | generateStaticParams용 |

---

## 검색 (SearchModal + Fuse.js)

- `lib/searchIndex.ts`: 빌드 타임 인덱스 생성
- 검색 대상: title(0.6), summary(0.2), tags(0.2)
- threshold 0.4, 최소 2자, 최대 8결과
- 헤더 검색 버튼 -> 모달

---

## Next.js 설정 (next.config.ts)

```typescript
output: 'export'          // 완전 정적 HTML 내보내기
trailingSlash: true       // URL 끝에 / (SEO)
images.unoptimized: true  // 정적 export에서 Image 최적화 불가
```

---

## TypeScript 경로 별칭

`@/*` -> `./src/*` (tsconfig.json paths)

---

## 접근성 기준

- WCAG 2.1 AA
- 본문 바로가기 링크 (`#main-content`)
- 키보드 네비게이션 (`:focus-visible` 스타일)
- `<html lang="ko">`
- 모든 버튼/링크 44px 이상 터치 영역
- 회색 텍스트: text-gray-500 이상만 사용 (대비비 확보)

---

## 배포

```bash
# 빌드
npm run build

# 배포 (rsync 예시)
rsync -avz --delete out/ {서버경로}
```

---

## 주의사항

- em dash(-) 대신 하이픈(-) 사용
- `relatedCalculator.url`은 반드시 실제 공개된 URL만 입력
- `siteConfig.ts`에서 브랜드/URL 중앙 관리 - 하드코딩 금지
- `getSiteUrl()`로 URL 환경 분기 - `productionSiteUrl` 직접 사용 금지
- 정적 export 모드이므로 서버 사이드 API 라우트 사용 불가
