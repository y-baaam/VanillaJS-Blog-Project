# 블로그 리디자인 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 어두운 배경·Gmarket·720px는 유지하고, 포인트 컬러 `#ffb86b`와 구분선 중심으로 전 화면 스타일을 바꾼다.

**Architecture:** 템플릿 문자열로 HTML을 만드는 기존 바닐라 TS 컴포넌트 구조를 그대로 쓴다. 색은 Tailwind 토큰(`accent`, `line`, `muted`)으로 추가하고, 마크다운 본문은 CSS 모듈에서 바꾼다. 홈/목록 행 컴포넌트만 둘로 나눈다.

**Tech Stack:** TypeScript, Tailwind CSS 3, webpack 5, CSS Modules

**Spec:** `docs/superpowers/specs/2026-10-01-blog-redesign-design.md`

## Global Constraints

- 배경 `#1c1c1c`, 본문 글자색 `rgb(230,230,230)`, GmarketSans Light/Medium/Bold, 본문 폭 `md:w-medium`(720px)은 바꾸지 않는다
- 포인트 컬러 `#ffb86b` 한 가지만 쓰고, "선택된 것"과 "카테고리" 표시에만 쓴다
- `reset.module.css`가 `border: 0`을 걸기 때문에 테두리 클래스에는 항상 `border-solid`를 같이 쓴다
- `visited:` 색 변경 클래스는 새로 쓰지 않는다
- 테스트 러너가 없으므로 각 Task 검증은 `npx tsc --noEmit -p .`(새 에러 없음) + `pnpm run build`(compiled) + 개발 서버 화면 확인이다. 빌드 후 `git checkout -- public/sitemap.xml`로 자동 생성된 사이트맵 변경을 되돌린다
- 커밋 메시지에 Co-Authored-By 줄을 넣지 않는다

## Review Focus

- 긴 제목(예: "NestJS에서 DTO, Entity, Domain의 차이")이 목록 한 줄 그리드에서 카테고리 칸을 밀어내지 않고 제목 칸 안에서 줄바꿈되어야 한다 → Task 4 Step 4에서 확인
- 카테고리 탭이 375px에서 가로로 넘치면 페이지가 아니라 탭 줄만 가로 스크롤되어야 한다 → Task 4 Step 4
- `/posts?category=React`와 `/posts/9-react-search`에서도 헤더의 `posts`가 활성이어야 한다 → Task 2 Step 3
- 제목이 2개 이하인 글은 목차가 없어도 상단 메타·본문 간격이 어색하지 않아야 한다 → Task 5 Step 5 (`2-IIFE`처럼 짧은 글 확인)
- 다른 글로 이동해도 목차 강조·이전/다음 글 hover가 계속 동작해야 한다 → Task 5 Step 5

---

### Task 1: 색 토큰과 날짜 포맷

**Files:**
- Modify: `tailwind.config.js` (`theme.extend.colors`)
- Create: `src/util/formatDate/index.ts`

**Interfaces:**
- Produces: Tailwind 클래스 `text-accent`, `border-accent`, `bg-accent`, `border-line`, `text-muted` 등; `formatDate(date: string): string` — `"2026-10-01"` → `"2026.10.01"`, 하이픈이 없는 값은 그대로 반환

- [ ] **Step 1:** `colors`에 `accent: "#ffb86b"`, `line: "#2e2e2e"`, `muted: "#999999"` 추가
- [ ] **Step 2:** `formatDate`를 `date.replace(/-/g, ".")`로 구현
- [ ] **Step 3:** 검증 — `npx tsc --noEmit -p .` 새 에러 없음, `pnpm run build` → `compiled`
- [ ] **Step 4:** 커밋 `design: 포인트 컬러 토큰과 날짜 포맷 추가`

### Task 2: 헤더와 푸터

**Files:**
- Modify: `src/components/Layout/Header/index.ts`
- Modify: `src/components/Layout/Footer/index.ts`
- Modify: `src/components/Layout/index.ts` (헤더를 `main` 밖, 전체 폭으로 이동)

**Interfaces:**
- Consumes: Task 1 토큰

- [ ] **Step 1:** Header — 바깥 `<header>`는 전체 폭 + `border-b border-solid border-line`, 안쪽은 `w-full sm:w-5/6 md:w-medium mx-auto`(Layout의 `main`과 같은 폭). 로고 `y-baam<span class="text-accent">.</span>`(Bold). 메뉴는 Medium, 기본 `text-muted hover:text-white-200`. 활성 판단: `location.pathname.startsWith("/posts")` → posts, `=== "/guestBook"` → guestbook. 활성 메뉴는 `text-white-200` + `shadow-[inset_0_-2px_0_#ffb86b]`. `<li>` 구조와 `data-link` 유지
- [ ] **Step 2:** Footer — `bg-black-100` 제거, `border-t border-solid border-line`, 텍스트 `text-muted text-caption1`
- [ ] **Step 3:** 개발 서버에서 `/`, `/posts`, `/posts?category=React`, `/posts/9-react-search`, `/guestBook` 열고 활성 메뉴가 각각 없음/posts/posts/posts/guestbook인지, 375px에서 가로 넘침이 없는지 확인
- [ ] **Step 4:** 커밋 `design: 헤더 푸터 리디자인`

### Task 3: 홈

**Files:**
- Modify: `src/views/home/index.ts`
- Modify: `src/components/PostItem/index.ts` (홈 전용 행으로 변경)

**Interfaces:**
- Consumes: `formatDate`, 토큰
- Produces: `PostItem(posts: Post[]): string` — 홈 행 마크업 (시그니처 유지)

- [ ] **Step 1:** PostItem 행 — 링크 전체가 `group`, 행 사이 `border-t border-solid border-line py-4`. 1줄 `${category} · ${formatDate(date)}` (`text-accent text-caption2-bold font-GmarketSansMedium`), 2줄 제목(`font-GmarketSansMedium text-subTitle group-hover:text-accent`), 3줄 설명(`text-muted text-caption1`)
- [ ] **Step 2:** Home — 회전 단어 `#rotatingText`에 `text-accent`. 오른쪽 링크 텍스트 뒤 ` ↗`, `text-muted hover:text-white-200`. "Recent Posts" 박스 → 한 줄 flex: 왼쪽 `RECENT POSTS`(`text-muted text-caption1 tracking-widest font-GmarketSansMedium`), 오른쪽 `<a href="/posts" data-link>전체 글 보기 →</a>`(`text-accent text-caption1`)
- [ ] **Step 3:** 데스크톱/375px 스크린샷으로 확인
- [ ] **Step 4:** 커밋 `design: 홈 리디자인`

### Task 4: 글 목록

**Files:**
- Create: `src/components/PostIndexItem/index.ts`
- Modify: `src/views/posts/posts-content/index.ts`
- Modify: `src/components/PostHeader/index.ts`

**Interfaces:**
- Consumes: `formatDate`, 토큰
- Produces: `PostIndexItem(posts: Post[]): string`

- [ ] **Step 1:** PostIndexItem — 행 `<a data-link>`에 `group block py-3 border-b border-solid border-line`. `sm` 이상: `sm:grid sm:grid-cols-[96px_1fr_auto] sm:gap-4 sm:items-baseline` → 날짜(`text-muted`) / 제목(`font-GmarketSansMedium group-hover:text-accent min-w-0`) / 카테고리(`text-accent text-caption1`). 모바일: 첫 줄 `날짜 · 카테고리`(작게), 둘째 줄 제목 — 같은 마크업에서 `sm:hidden`/`hidden sm:block`으로 전환
- [ ] **Step 2:** posts-content — `PostItem` 대신 `PostIndexItem`. 카테고리 탭 컨테이너 `flex gap-x-5 overflow-x-auto scrollbar-hide border-b border-solid border-line mb-2`, 탭 `py-2 cursor-pointer whitespace-nowrap`, 선택 `text-white-200 shadow-[inset_0_-2px_0_#ffb86b]`, 미선택 `text-muted`. `data-category` 유지. 남아있는 `console.log(selectedCategory)` 삭제
- [ ] **Step 3:** PostHeader — 가운데 정렬 제거, `<div class="text-title">Posts <span class="text-body text-muted">${filteredPosts.length}</span></div>` 형태, 아래 여백 `mb-4`
- [ ] **Step 4:** 확인 — All/React/Backend 탭 전환, 데스크톱에서 긴 제목이 제목 칸 안에서 줄바꿈되고 카테고리 칸이 오른쪽에 고정, 375px에서 탭 줄만 가로 스크롤되고 페이지는 넘치지 않음
- [ ] **Step 5:** 커밋 `design: 글 목록 리디자인`

### Task 5: 글 상세

**Files:**
- Modify: `src/views/posts/post/index.ts` (상단 메타)
- Modify: `src/styles/markdown-style.module.css` (`h2`, `code`, `a`)
- Modify: `src/components/TableOfContents/index.ts` (목차 항목 스타일, `ACTIVE_CLASSES`)
- Modify: `src/components/PostNavigation/index.ts` (카드 테두리)

**Interfaces:**
- Consumes: `formatDate`, 토큰

- [ ] **Step 1:** 상단 메타 — 카테고리 링크 `text-accent hover:underline`(visited 클래스 제거), 날짜 줄 `${formatDate(frontMatter.date)} · 약 N분` `text-muted`. 제목 아래 `<hr>`을 `border-t border-solid border-line`으로
- [ ] **Step 2:** markdown CSS — `.markdown h2`에 `display:flex; align-items:center; gap:0.5rem` + `::before { content:""; width:3px; height:1em; background:#ffb86b; border-radius:2px; }`. `.markdown code` 색 `#ffb86b`(배경 유지). `.markdown a` 색 `#ffb86b` + `text-decoration: underline; text-underline-offset: 3px`. 모바일 미디어쿼리의 h2도 그대로 적용되는지 확인
- [ ] **Step 3:** 목차 — 링크에 `border-l border-solid border-line pl-3`, `ACTIVE_CLASSES`를 `["!text-white-100", "font-GmarketSansMedium", "!border-accent", "border-l-2"]`로. 접히는 상자 테두리 `border-line`
- [ ] **Step 4:** PostNavigation — 카드 `border-line hover:border-accent`, 배경 hover(`hover:bg-black-200`) 제거, 구분선 `border-line`
- [ ] **Step 5:** 확인 — `9-react-search`(목차 많음), `2-IIFE`(짧음)에서 상단 메타, h2 막대, 인라인 코드, 링크, 목차 강조(스크롤 이벤트 발생시켜 확인), 이전/다음 카드 hover, 다른 글로 이동 후에도 동작. 데스크톱/375px
- [ ] **Step 6:** 커밋 `design: 글 상세 리디자인`

### Task 6: 404 버튼과 전체 확인

**Files:**
- Modify: `src/views/error/index.ts`

- [ ] **Step 1:** 버튼 두 개 `text-black-100 bg-white-100` → `border border-solid border-line hover:border-accent text-white-200`
- [ ] **Step 2:** 전 화면 최종 확인 — `/`, `/posts`, `/posts?category=Backend`, `/posts/10-react-rerender`, `/guestBook`, `/없는주소`를 데스크톱/375px로 스크린샷, 가로 넘침 없음, `pnpm run build` compiled
- [ ] **Step 3:** 커밋 `design: 404 버튼 리디자인`
