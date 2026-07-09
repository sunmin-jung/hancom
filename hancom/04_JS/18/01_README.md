# Web Dev Blog 기획안

> 본 기획안은 HTML, CSS, JavaScript의 핵심 기초 개념을 시각적으로 학습할 수 있는  
> 블로그형 웹사이트 제작을 위한 가이드라인입니다.

- 📅 작성일: 2026년 7월
- ✍️ 작성자: 정선민
- 📁 프로젝트: devblog
- 🔖 버전: v1.0

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Web Dev Blog — HTML · CSS · JS 기초 학습 블로그 |
| **목표** | 웹 개발의 3요소(HTML, CSS, JS)를 블로그 형식으로 시각화하여 학습 |
| **주제** | 기초 개념 설명 + 인터랙티브 코드 예제가 포함된 원페이지 교육 블로그 |
| **대상** | 웹 개발을 처음 접하는 초보자 및 기초를 복습하려는 학습자 |
| **핵심 기능** | 다크모드 전환, 마우스 호버 효과, 실시간 인터랙티브 데모, 코드 복사 |

---

## 2. 사이트 구조 (HTML)

```
📄 index.html
├── 🗂️  Header       로고(</> DevBlog) · 네비게이션 · 다크모드 토글 버튼
├── 🌟  Hero         메인 타이틀 · 기술 뱃지(HTML/CSS/JS) · 코드 윈도우
├── 🏷️  HTML 기초    기본 문서 구조 · 시맨틱 태그 다이어그램 · 자주 쓰는 태그
├── 🎨  CSS 기초     선택자 · 박스 모델 · Flexbox 데모 · 호버 효과 · CSS 변수 · 반응형
├── ⚙️  JS 기초      변수와 자료형 · 함수 · DOM 제어 · 조건문 · 반복문
├── 🚀  PROJECT      다크모드 3단계 구현 가이드(HTML→CSS→JS) + 라이브 데모
└── 📌  Footer       로고 · 섹션 링크 · © 2026 정선민
```

---

## 3. 주요 기능

### 🌙 다크모드 전환
헤더 토글 버튼 클릭 시 `body`에 `.dark` 클래스를 토글.  
CSS 변수(`--bg`, `--text`)를 재정의하여 전체 테마가 즉시 전환됨.

### ⚡ Flexbox 인터랙티브 데모
CSS 섹션 내 버튼 클릭 시 `justify-content` 값이 실시간으로 변경되어  
Flexbox 정렬 동작을 시각적으로 체험 가능.

### 📋 코드 복사 버튼
각 코드 블록 "복사" 버튼 클릭 시 `Clipboard API`를 통해 클립보드에 복사.  
완료 시 "✓ 복사됨" 피드백 표시.

### ✨ 카드 호버 효과 · 스크롤 등장 애니메이션
마우스 호버 시 `translateY(-7px)`로 카드가 위로 이동.  
`IntersectionObserver`로 스크롤 시 카드가 순차 페이드인.

### 📱 반응형 레이아웃
`@media` 쿼리로 PC(3열) → 태블릿(2열) → 모바일(1열) 자동 전환.  
모바일 환경에서 네비게이션 자동 숨김.

---

## 4. 구현 기술 (Stack)

| 요소 | 역할 | 주요 적용 내용 |
|------|------|--------------|
| **HTML** | 콘텐츠 구조 설계 | Semantic Tag 활용 (`header`, `main`, `section`, `article`, `footer`), 접근성 속성 (`alt`, `aria-label`) |
| **CSS** | 레이아웃 및 시각적 스타일링 | CSS 변수로 다크/라이트 테마 구현, Flexbox · Grid 레이아웃, `:hover` 전환 효과, `@media` 반응형 |
| **JS** | 상호작용 기능 구현 | `classList.toggle()` 다크모드, Clipboard API 코드 복사, `IntersectionObserver` 스크롤 애니메이션 |

---

## 5. 학습 목표 체크리스트

- [ ] HTML 기본 문서 구조(`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`)를 이해한다
- [ ] 시맨틱 태그와 `<div>`의 차이를 알고, 용도에 맞게 선택할 수 있다
- [ ] CSS 선택자 3종(태그, 클래스, ID)을 구별하여 사용할 수 있다
- [ ] 박스 모델(margin, border, padding, content)의 개념을 이해한다
- [ ] `display: flex`로 요소를 가로/세로로 정렬할 수 있다
- [ ] CSS 변수(`:root`, `var()`)를 선언하고 활용할 수 있다
- [ ] `let`과 `const`의 차이를 이해하고 적절히 사용한다
- [ ] `querySelector()`로 요소를 선택하고, `addEventListener`로 이벤트를 연결할 수 있다
- [ ] `classList.toggle()`을 사용하여 다크모드를 직접 구현할 수 있다

---

## 6. 개발 로드맵

### 1단계 — HTML 골격 작성 `HTML`
Semantic Tag를 활용하여 `header`, `main`(각 section), `footer` 기본 뼈대 작성.  
콘텐츠 카드 및 코드 블록 마크업 완성.

### 2단계 — CSS 디자인 · 레이아웃 적용 `CSS`
CSS 변수로 라이트/다크 테마 색상 정의.  
Flexbox · Grid로 레이아웃 구성, 호버 효과와 반응형 미디어 쿼리 적용.

### 3단계 — JavaScript 인터랙션 구현 `JS`
다크모드 toggle, Flexbox 데모 버튼, 코드 복사(Clipboard API),  
`IntersectionObserver` 스크롤 애니메이션 구현.

### 4단계 — 브라우저 테스트 및 수정
Chrome DevTools로 반응형 레이아웃(PC · 태블릿 · 모바일) 점검.  
라이트/다크모드 색상 최종 확인.

---

© 2026 정선민 · Web Dev Blog 기획안
