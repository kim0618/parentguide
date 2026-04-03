# 부모혜택 콘텐츠 작성 프롬프트

아래 프롬프트를 복사해서 사용하세요. `[ ]` 안의 내용을 채워서 요청하면 됩니다.

---

## 프롬프트

```
부모혜택(parentguide) 프로젝트에 새 콘텐츠를 추가해줘.

■ 요청 글 주제: [주제를 자유롭게 적거나 "알아서 선정"]
■ 카테고리: [pension-welfare / health-care / finance-safety / 부족한 카테고리부터]
■ 글 수: 3편

아래 규칙을 반드시 지켜.

────────────────────────────────
1. 파일 위치 · 구조
────────────────────────────────
글은 카테고리별 디렉토리에 slug 이름으로 개별 파일로 저장됨:
- src/data/articles/pension-welfare/{slug}.ts
- src/data/articles/health-care/{slug}.ts
- src/data/articles/finance-safety/{slug}.ts

새 글 추가 방법:
1. 해당 카테고리 디렉토리에 {slug}.ts 파일 새로 생성
2. 파일 형식:
   import type { ContentItem } from '@/types/content';
   const article: ContentItem = { slug: '...', ... };
   export default article;
3. 해당 카테고리의 index.ts에 import 추가 및 배열에 포함
   예: src/data/articles/pension-welfare/index.ts
4. order 필드는 해당 카테고리의 마지막 order + 1부터 순차 부여
5. 기존 글의 sections, body, title 등 콘텐츠 내용은 수정 금지
6. 단, 기존 글의 relatedSlugs에 새 글 slug를 추가하는 것은 허용

────────────────────────────────
2. 주제 자동 선정 규칙
────────────────────────────────
"알아서 선정"이라고 적힌 경우 아래 순서로 주제를 정해:

(1) 먼저 src/data/articles/*/*.ts 파일을 읽어서 기존 slug 전체 목록 확인 (글은 하위 디렉토리에 개별 파일로 있음)
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
- 작성 전 src/data/articles/*/*.ts 파일에서 기존 slug 전체를 직접 확인 (index.ts 제외)
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
  summary        — 카드/meta description용 요약 (2~3문장, 80~150자, 반드시 범위 내)
  sections       — 본문 섹션 배열 (아래 규칙 참조)

필수 선택 필드 (반드시 채울 것):
  keyPoints      — 카드에 표시할 핵심 포인트 (2~3개, 각 1줄)
  tags           — 검색/필터용 태그 (4~6개, 한글, 기존 태그 재활용 권장)
  hubKey         — 연관 허브 slug 배열 (아래 5개 중 선택, 1~2개)
                   'retirement-income' | 'prepare-care' | 'government-benefits' |
                   'health-checkup' | 'financial-safety'
  relatedSlugs   — 연관 글 slug 배열 (2~4개, 기존 slug 중에서 선택)
  order          — 카테고리 내 정렬 순서
  officialSources — 공식 출처 [{name, url, note}] (1~3개)
  faq            — [{question, answer}] (2~3개)
  cautionNote    — 면책 메모 1줄

선택 필드:
  seoTitle       — title과 다를 때만 (키워드 최적화용)
  seoDescription — summary와 다를 때만 (160자 이하, 연도 절대 넣지 말 것)
  heroDescription — 상세페이지 상단 설명 (summary보다 길어도 됨)
  isFeatured     — 주목 글 여부 (신규 글은 보통 false)
  effectiveDate  — 정책 기준일 (policy 템플릿에서 사용)

  relatedCalculator — 연관 제이퍼 계산기 URL (아래 8번 규칙 참조)
  calculatorCTA     — 계산기 버튼 문구 (예: "기초연금 수급액 계산해보기")

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
- 글당 sections 5~8개 구성 (9개 이상 금지 - 넘으면 관련 섹션 통합)
- 첫 섹션: type='text', heading으로 개념 설명
- 중간: 자격조건/절차/비교 등 본문
- info/tip/warning 박스 각 1~2개 배치
- 마지막 또는 중간에 summary 1개 (핵심 요약)
- body 텍스트 안에서 내부 링크: [[slug|표시텍스트]] 형식 사용
  예: [[basic-pension-application|기초연금 신청 방법]]
  → 글당 최소 1개 이상 위키링크 필수
- body에 표(pipe table) 넣지 말 것 (렌더링 안 됨) → items[] 배열로 변환
- em dash(—) 대신 hyphen(-) 사용

────────────────────────────────
5-1. A등급 품질 필수 요소 (반드시 포함)
────────────────────────────────
아래 3가지는 글의 성격에 따라 반드시 포함해야 한다.

(a) ☎ 전화번호 (모든 글 필수)
  - 글 주제와 관련된 공식 문의 전화번호를 반드시 1개 이상 포함
  - 형식: ☎ XXXX-XXXX (기관명)
  - info, tip, warning 섹션 body 또는 FAQ answer에 자연스럽게 삽입
  - 주요 번호 참고:
    ☎ 129 (보건복지상담센터) - 복지/돌봄 전반
    ☎ 1355 (국민연금공단) - 연금 관련
    ☎ 1577-1000 (국민건강보험공단) - 건강보험/요양
    ☎ 1332 (금융감독원) - 금융/보험
    ☎ 182 (경찰청) - 사기/범죄
    ☎ 126 (국세청) - 세금
    ☎ 110 (정부민원) - 일반 민원

(b) 신청 서류 목록 (신청/절차가 있는 글 필수)
  - policy, checklist 템플릿: 반드시 포함
  - standard 템플릿: 신청/등록 절차가 있으면 포함
  - 순수 건강 가이드(당뇨 관리, 낙상 예방 등)는 제외 가능
  - 형식: { type: 'list', heading: '신청 시 필요한 서류', items: [...] }
  - 신분증은 거의 항상 첫 번째 항목

(c) 처리 기간 (신청/절차가 있는 글 필수)
  - 신청 후 결과까지 걸리는 시간을 구체적으로 명시
  - FAQ answer, info 섹션 body, 또는 numbered-list 단계에 자연스럽게 삽입
  - 예: "신청 후 통상 30일 이내 결과 통보", "접수 후 14일 이내 지급"
  - 순수 건강/생활 가이드는 제외 가능

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
- summary는 반드시 80~150자 범위 (한글 기준, 작성 후 글자 수 확인)
- sections는 5~8개 (절대 9개 이상 작성하지 말 것)
- 위키링크 [[slug|텍스트]] 글당 최소 2개 이상 (relatedSlugs에 있는 것 우선 활용)
- 금액·기간 시뮬레이션 예시 필수: 신청/절차/수령 관련 글은 구체적 계산 예시 포함 (예: "250만원 기준 추납 24개월 시 보험료 540만원, 월 수령액 8만원 증가")
- title은 반드시 30자 이상 확인 후 제출 (작성 후 글자 수 재확인)

────────────────────────────────
7. 작성 후 확인사항 (A등급 체크리스트)
────────────────────────────────
아래 항목을 모두 통과해야 글 작성 완료로 간주한다.

□ 빌드/타입
  - TypeScript 타입 오류 없는지 확인
  - npm run build 실행해서 빌드 성공 확인

□ 데이터 무결성
  - 새 글의 relatedSlugs에 넣은 slug가 실제 존재하는지 확인
  - 기존 글 중 새 글과 연관된 것이 있으면 그 글의 relatedSlugs에 새 slug 추가
  - hubKey에 넣은 허브가 유효한지 확인 (5개 중 선택)
  - 위키링크 [[slug|텍스트]]의 slug가 실제 존재하는지 확인

□ A등급 필수 요소
  - ☎ 전화번호가 1개 이상 포함되어 있는가
  - 신청/절차 글이면 '신청 시 필요한 서류' 섹션이 있는가
  - 신청/절차 글이면 처리 기간 정보가 있는가
  - summary가 80~150자 범위인가
  - sections가 5~8개인가 (9개 이상이면 통합)
  - 위키링크가 1개 이상 있는가
  - faq가 2~3개 있는가
  - officialSources가 1~3개 있는가
  - cautionNote가 있는가
  - keyPoints가 2~3개 있는가
  - tags가 4~6개 있는가
  - 제이퍼 계산기 연결 가능 여부 확인 (8번 참조)

────────────────────────────────
8. 제이퍼 계산기 연결 규칙
────────────────────────────────
아래 계산기와 주제가 연관되면 relatedCalculator + calculatorCTA 반드시 입력.

연결 가능한 계산기 목록 (jptcalc.kr):
  기초연금       → https://jptcalc.kr/basic-pension
  국민연금       → https://jptcalc.kr/national-pension
  건강보험료     → https://jptcalc.kr/health-insurance
  장기요양보험   → https://jptcalc.kr/long-term-care
  퇴직금         → https://jptcalc.kr/severance-pay
  상속세         → https://jptcalc.kr/inheritance-tax
  증여세         → https://jptcalc.kr/gift-tax
  실업급여       → https://jptcalc.kr/unemployment-benefit

연결 조건:
- 글 주제가 위 계산기와 직접 관련된 경우에만 연결
- calculatorCTA는 "직접 계산해보기" 또는 구체적 문구 (예: "기초연금 수급액 계산해보기")
- 연결이 어색한 글(건강관리, 일반 생활정보 등)은 비워둘 것
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
