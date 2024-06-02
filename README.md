# VanillaJS-Blog-Project(SPA)

## 프로젝트 소개
JavaScript만을 사용하여 SPA와 다양한 기능들을 구현한 프로젝트입니다.
https://www.y-baam.net

웹 표준을 준수하도록 노력했습니다.
  - 크로스 브라우저 간 호환성
  - 반응형 웹 디자인
  - 웹 접근성

## 왜 Vanilla JS?
- 바닐라 자바스크립트의 가변성이 가장 낮다.
  - 외부 의존성이 없으므로, 라이브러리나 프레임워크의 변경에 따른 코드 수정이 필요 없습니다.
- 바닐라 자바스크립트가 가장 가볍고 빠르다.
  - 바닐라 자바스크립트는 React나 jQuery 같은 라이브러리에 비해 추가적인 다운로드가 없어 로딩 시간이 짧습니다. (React는 최소 40KB jQuery는 최소 30KB)

## Tech Stacks
- 패키지 매니저 : **pnpm** (vs Yarn berry)
  - pnpm은 global 저장소에 패키지를 한 번만 저장함으로써 저장 공간을 절약할 수 있다는 아주 큰 장점을 가지고 있기 때문입니다.
  - yarn berry는 PnP가 다른 패키지와 호환되지 않아 빌드가 깨지는 등 여러 문제가 발생할 수 있습니다. 또한 PnP가 Git에 지속적으로 영향을 줄 수 있습니다.
- TypeScript : 정적 타입 검사를 통한 안정성과 타입 인텔리센스를 통한 생산성 향상을 위해 사용했습니다.
- Tailwind : Tailwind를 선택한 이유는 반응형 디자인을 손쉽게 구현할 수 있고 유지보수가 용이합니다. 또한, 개발 속도가 빠르고 사용하지 않는 스타일을 자동으로 제거하는 PurgeCSS 기능을 내장하고 있어 웹 성능에서도 뛰어난 장점으로 Tailwind를 도입하게 되었습니다.

## CI/CD
- 배포 : **AWS Amplify**
  - Amplify를 사용하여 프로젝트의 CI/CD 파이프라인을 구축하였습니다.
  - Amplify는 작은 프로젝트에서 시작해도 부담이 적기때문에 필요한 서비스만 사용하여 비용을 효율적으로 관리할 수 있습니다.

## 프로젝트 실행
### CLI
1. git clone https://github.com/y-baaam/VanillaJS-Blog-Project
2. pnpm install / pnpm이 설치되어있지 않다면, 다음 명령어로 설치할 수 있습니다. npm install -g pnpm
3. pnpm start

## Commit Convention
|Title|Description|
|---|---|
|Feat|새로운 기능을 추가할 경우|
|Fix|버그를 고친 경우|
|Design|CSS등 사용자 UI디자인 변경|
|Style|코드 스타일 변경 (코드 포메팅, 세미콜론 누락, 주석 삭제 등)|
|Docs|문서 ( 문서 추가 , 수정, 삭제)|
|Build|빌드 관련 파일 수정|
|DB|DB관련 작업|
|Refactor|코드 리팩토링|
|Remove|파일 혹은 폴더를 삭제한 경우|
|Rename|파일 혹은 폴더명을 수정하는 경우|
|Chore|기타 변경 사항(프로젝트 구조 변경)|

