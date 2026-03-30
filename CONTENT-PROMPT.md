# 부모혜택 콘텐츠 작성 프롬프트

아래 프롬프트를 복사해서 사용하세요. `[ ]` 안의 내용을 채워서 요청하면 됩니다.

---

## 프롬프트

```
부모혜택(parentguide) 프로젝트에 새 콘텐츠를 추가해줘.

■ 요청 글 주제: [주제를 자유롭게 적거나 "알아서 선정"]
■ 카테고리: [pension-welfare / health-care / finance-safety / 부족한 카테고리부터]
■ 글 수: [몇 편]

아래 규칙을 반드시 지켜.

────────────────────────────────
1. 파일 위치 · 구조
────────────────────────────────
- pension-welfare → src/data/articles/pension-welfare.ts
- health-care → src/data/articles/health-care.ts
- finance-safety → src/data/articles/finance-safety.ts
- 해당 파일의 기존 배열 끝에 새 객체를 추가
- order 필드는 해당 카테고리의 마지막 order + 1부터 순차 부여
- 기존 글의 sections, body, title 등 콘텐츠 내용은 수정 금지
- 단, 기존 글의 relatedSlugs에 새 글 slug를 추가하는 것은 허용

────────────────────────────────
2. 주제 자동 선정 규칙
────────────────────────────────
"알아서 선정"이라고 적힌 경우 아래 순서로 주제를 정해:

(1) 먼저 src/data/articles/*.ts 파일을 읽어서 기존 slug 전체 목록 확인
(2) 기존 글과 겹치지 않는 빈 영역 찾기
(3) 시니어/가족이 실제로 많이 검색하는 키워드 기반 선정
(4) 카테고리가 "부족한 카테고리부터"이면 글 수가 가장 적은 카테고리부터 채우기
(5) 기존 글의 hubKey 커버리지 확인 - 허브당 연결된 글이 적은 쪽 우선
(6) 선정한 주제 목록을 먼저 보여주고 승인받은 후 작성 시작

주제 선정 시 우선순위 높은 영역:
- 정부 복지제도 중 아직 안 다룬 것 (예: 긴급돌봄, 노인학대 신고 등)
- 시니어 일상생활 (교통, 여가, 문화, 디지털 활용 등)
- 가족이 실무적으로 필요한 정보 (위임장, 서류 대행, 병원 동행 등)
- 계절별/시기별 필요 정보 (겨울 건강, 연말정산, 연초 제도 변경 등)

────────────────────────────────
3. 중복 방지 (필수)
────────────────────────────────
- 작성 전 src/data/articles/*.ts 파일에서 기존 slug 전체를 직접 확인
- 기존 slug와 동일하거나 유사한 주제 금지
- 기존 글과 주제가 70% 이상 겹치면 안 됨
- 각도가 다른 경우(예: 기존 글이 "신청 방법"이고 새 글이 "비교 분석"이면) 별개 글로 허용
- 새로 추가하는 글끼리도 중복 금지

────────────────────────────────
4. ContentItem 필드 규칙
────────────────────────────────
TypeScript 타입: ContentItem (src/types/content.ts)

필수 필드:
  slug           — 영문 kebab-case, 사이트 전체 고유
  title          — 페이지 제목 (한글, 30~60자)
  category       — 'pension-welfare' | 'health-care' | 'finance-safety'
  template       — 'standard' | 'policy' | 'checklist' | 'calculator' | 'comparison'
                   (정부제도 안내=policy, 절차안내=checklist, 비교글=comparison, 일반=standard)
  targetUser     — 'senior' | 'family' | 'both'
  createdAt      — 오늘 날짜 (ISO, 예: '2026-03-30')
  updatedAt      — createdAt과 동일
  reviewStatus   — 'current'
  summary        — 카드/meta description용 요약 (2~3문장, 80~150자)
  sections       — 본문 섹션 배열 (아래 규칙 참조)

선택 필드 (가능한 채울 것):
  seoTitle       — title과 다를 때만 (키워드 최적화용)
  seoDescription — summary와 다를 때만 (160자 이하, 연도 절대 넣지 말 것)
  heroDescription — 상세페이지 상단 설명 (summary보다 길어도 됨)
  keyPoints      — 카드에 표시할 핵심 포인트 (2~3개, 각 1줄)
  tags           — 검색/필터용 태그 (4~6개, 한글, 기존 태그 재활용 권장)
  hubKey         — 연관 허브 slug 배열 (아래 5개 중 선택)
                   'retirement-income' | 'prepare-care' | 'government-benefits' |
                   'health-checkup' | 'financial-safety'
  relatedSlugs   — 연관 글 slug 배열 (2~4개, 기존 slug 중에서 선택)
  order          — 카테고리 내 정렬 순서
  isFeatured     — 주목 글 여부 (신규 글은 보통 false)
  effectiveDate  — 정책 기준일 (policy 템플릿에서 사용)
  officialSources — 공식 출처 [{name, url, note}] (1~3개)
  faq            — [{question, answer}] (2~3개)
  cautionNote    — 면책 메모 1줄

  ※ relatedCalculator, calculatorCTA는 비워둘 것 (향후 연결)

────────────────────────────────
5. sections 작성 규칙
────────────────────────────────
섹션 타입 (SectionType):
  'text'          — 일반 텍스트 (heading + body)
  'list'          — 불릿 목록 (heading + items[])
  'numbered-list' — 순서 목록 (heading + items[])
  'info'          — 파란 안내 박스
  'tip'           — 초록 팁 박스
  'warning'       — 주황 경고 박스
  'summary'       — 회색 요약 박스 (체크마크 목록)

본문 작성 원칙:
- 글당 sections 5~8개 구성
- 첫 섹션: type='text', heading으로 개념 설명
- 중간: 자격조건/절차/비교 등 본문
- info/tip/warning 박스 각 1~2개 배치
- 마지막 또는 중간에 summary 1개 (핵심 요약)
- body 텍스트 안에서 내부 링크: [[slug|표시텍스트]] 형식 사용
  예: [[basic-pension-application|기초연금 신청 방법]]
- body에 표(pipe table) 넣지 말 것 (렌더링 안 됨) → items[] 배열로 변환
- em dash(—) 대신 hyphen(-) 사용

────────────────────────────────
6. 콘텐츠 품질 기준
────────────────────────────────
- 정부 공식 출처 기반 정보만 작성 (추측·의견 금지)
- "~년 기준" 표현은 seoDescription에 넣지 말 것 (매년 수정 부담)
- 글 안에서 연도를 쓸 때는 sections 본문에만 (effectiveDate로 관리)
- 시니어 친화 문체: 쉬운 단어, 짧은 문장, 전문용어는 바로 설명
- 금액·조건은 구체적으로 (예: "월 334,810원", "만 65세 이상")
- 신청 절차는 numbered-list로 단계별 안내
- 각 글에 faq 2~3개 필수 (실제로 많이 묻는 질문)

────────────────────────────────
7. 작성 후 확인사항
────────────────────────────────
- TypeScript 타입 오류 없는지 확인
- 새 글의 relatedSlugs에 넣은 slug가 실제 존재하는지 확인
- 기존 글 중 새 글과 연관된 것이 있으면 그 글의 relatedSlugs에 새 slug 추가
- hubKey에 넣은 허브가 유효한지 확인
- npm run build 실행해서 빌드 성공 확인
```

---

## 사용 예시

### 예시 1: 주제 직접 지정
```
부모혜택(parentguide) 프로젝트에 새 콘텐츠를 추가해줘.

■ 요청 글 주제: 노인 교통비 지원, 시니어 여행 지원
■ 카테고리: pension-welfare
■ 글 수: 2편

(위 규칙 전체 붙여넣기)
```

### 예시 2: 주제 자동 선정 (추천)
```
부모혜택(parentguide) 프로젝트에 새 콘텐츠를 추가해줘.

■ 요청 글 주제: 알아서 선정
■ 카테고리: 부족한 카테고리부터
■ 글 수: 5편

(위 규칙 전체 붙여넣기)
```
