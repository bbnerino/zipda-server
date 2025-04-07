# ZIPDA Server

부동산 매물 관리 및 찜하기 기능을 제공하는 REST API 서버입니다.

## 기술 스택

- Node.js
- NestJS
- MongoDB
- TypeScript
- JWT Authentication

## 주요 기능

1. 사용자 관리

   - 회원가입
   - 로그인
   - JWT 인증

2. 매물 관리

   - 매물 등록
   - 매물 목록 조회
   - 매물 상세 조회
   - 매물 수정
   - 매물 삭제

3. 찜하기 기능
   - 매물 찜하기
   - 찜한 매물 목록 조회
   - 찜하기 취소

## 설치 및 실행

1. 저장소 클론

```bash
git clone https://github.com/your-username/zipda-server.git
cd zipda-server
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정
   `.env` 파일을 생성하고 다음 내용을 입력하세요:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. 서버 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드
npm run build
npm run start:prod
```

## API 문서

자세한 API 명세는 [API 명세서](document/API%20명세서.md)를 참조하세요.

## 라이선스

MIT License
