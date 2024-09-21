# :bulb: PSM : 약을 부탁해

## :tada: 프로젝트 소개

주말이나 공휴일에 운영하는 약국을 찾을 수 있는 온라인 서비스입니다. 응급실 대란으로 응급상황에 대처가 힘든 요즘, 심야 약국정보를 제공함으로써 도움이 되고자 하였으며 심야에 급하게 약국을 방문하기 전, 지도검색을 통해 문을 연 약국을 지도 검색을 통해 미리 알아볼 수 있습니다. 또한 자주가는 약국을 즐겨찾기하고 리뷰를 남겨 다른 사용자들과 약국에 대한 정보를 공유할 수 있습니다.

## :rocket: 배포 링크

-

## :family: 프로젝트 팀 구성 및 역할

| 이름   | 역할 | 담당업무        |
| ------ | ---- | --------------- |
| 강지우 | 팀원 | 마이페이지      |
| 송혜인 | 팀장 | 상세페이지      |
| 이지영 | 팀원 | 메인페이지      |
| 최유나 | 팀원 | 로그인/회원가입 |
| 홍연주 | 팀원 | 검색페이지      |

<br>

## :alarm_clock: 프로젝트 수행 절차 및 방법

**총 개발 기간 : 2024.08.29 ~ 2024.09.03**

| 구분                | 기간                    | 활동                                    | 비고               |
| ------------------- | ----------------------- | --------------------------------------- | ------------------ |
| 사전 기획           | 24.09.12                | 주제선정 및 피그마를 이용한 페이지 구성 | 주제 : 심야약국    |
| 프로젝트 시작       | 24.09.13                | 페이지별로 브랜치를 생성해 개발 시작    | 세팅 : 최유나님    |
| 필수 구현 사항 완료 | 24.09.04~<br/>24.09.19  | 각자 맡은 필수 구현사항 완료            | 추석 : 09.16~09.18 |
| 추가 구현 사항 완료 | 24.09.20 ~<br/>24.09.23 | 스타일 적용, 추가기능 구현, 트러블슈팅  | 추가기능 :         |

<br>

## :hammer_and_wrench: STACK

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

<br>

## :receipt: 주요 기능 소개

| 요구사항   | 선택             | 이유                                                                                                     |
| ---------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| 지도 API   | 카카오맵         | 설명이 자세하게 나와있고 레퍼런스가 많았음<br>(네이버: 정리가 안됨, 어려움 / 통계청: 지도 업데이트 중단) |
| 약국데이터 | 공공심야약국목록 | 연마다 제공되는 최신 심야약국데이터 - db.json<br>(생활안전정보 오픈API DATA : CORS 에러로 사용 불가)     |
|            |                  |                                                                                                          |
|            |                  |                                                                                                          |
|            |                  |                                                                                                          |

### :one: Main Page

- LNB(사이드 네비게이션)
- Main banner (+ 검색 창)
- Main section1 : 주변 약국 리스트
- Main section2 :지금 운영중인 약국 리스트
- Footer

### :two: Search Page

- 검색을 바탕으로 지도에 약국을 핀으로 표시, 왼쪽엔 리스트로 표시
- 약국 리스트 클릭 → 해당 핀으로 지도 중심 이동, 약국 핀 클릭 → 지도 위 커스텀 오버레이
- 지도에서 커스텀 오버레이 클릭 시 Detail Page로 이동
- 최초 10개씩 보이고 더 보기 버튼 클릭 시 10개 더 불러오기 (도전)

### :three: Detail Page

- api 자료 (약국 이름, 위치, 전화번호, 영업시간) 불러와서 디테일 페이지 생성
- 좋아요 기능 (가능하면 Optimistic Update)
- 리뷰 작성/수정/별점 (도전)
- 지도가 보이도록 하기 가능하면 약국 사진으로

### :four: Join

- 아이디, 비밀번호, 이름 값 등록
- 프로필 이미지

### :five: Login

- 아이디, 비밀번호 입력 후 데이터가 있으면 로그인 (머니풀 사용)
- 아이디, 비밀번호가 틀린 경우 alert로 안내
- 아이디, 비밀번호가 틀린 경우 “입력하신 정보를 확인해주세요.” alert로 안내

### :six: My Page

- 내가 좋아요 누른 약국 정보를 리스트로 확인 가능 (필수)
- 프로필 버튼 클릭 시 user name 변경 가능 (필수)
- 내가 쓴 약국 리뷰를 확인 가능 (도전)

## :collision: Trouble Shooting

프로젝트를 진행 중 겪은 오류와 과정

### :pushpin: 강지우

:warning: **문제발생**

- ㅇㅇ

:check_mark_button: **문제해결**

- ㅇㅇ

### :pushpin: 송혜인

:warning: **문제발생**

- ㅇㅇ

:check_mark_button: **문제해결**

- ㅇㅇ

### :pushpin: 이지영

:warning: **문제발생**

- ㅇㅇ

:check_mark_button: **문제해결**

- ㅇㅇ

### :pushpin: 최유나

:warning: **문제발생**

- ㅇㅇ

:check_mark_button: **문제해결**

- ㅇㅇ

### :pushpin: 홍연주

:warning: **문제발생**

- ㅇㅇ

:check_mark_button: **문제해결**

- ㅇㅇ

## 소감

| 이름   | 회고 |
| ------ | ---- |
| 강지우 | ㅇㅇ |
| 송혜인 | ㅇㅇ |
| 이지영 | ㅇㅇ |
| 최유나 | ㅇㅇ |
| 홍연주 | ㅇㅇ |
