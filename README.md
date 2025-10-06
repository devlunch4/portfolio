# Portfolio
[github: https://github.com/devlunch4](https://github.com/devlunch4)

[Email: devlunch4@gmail.com](mailto:devlunch4@gmail.com)

## 목차
- [개인 포트폴리오 프로젝트](#개인-포트폴리오-프로젝트)
- [주요 기능](#주요-기능)
- [파일 설명](#파일-설명)

## 개인 포트폴리오 프로젝트

HTML, CSS, JavaScript로 제작된 간단한 웹 포트폴리오 페이지입니다.

### 주요 기능

- 프로젝트 목록: `projectList.json`에서 데이터를 불러와 동적으로 표시
- 필터링: `filterData.json` 기반 카테고리 필터 기능
- 검색: 기술 스택(`skillStack`)으로 프로젝트 검색
- 무한 스크롤: 스크롤 시 점진적으로 프로젝트 로드
- `View Project` 버튼을 클릭하면 각 프로젝트의 웹페이지 또는 GitHub 저장소로 이동

### 파일 설명

- `index.html`: 메인 HTML 구조
- `styles.css`: 디자인과 레이아웃
- `script.js`: JSON 로딩, 필터링, 검색 등 동적 기능
- `projectList.json`: 프로젝트 상세 정보 데이터
- `filterData.json`: 필터 버튼 목록
- `.idx/dev.nix`: IDX 개발 환경 설정, `live-server` 지원
