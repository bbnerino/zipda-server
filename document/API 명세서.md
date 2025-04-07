# ZIPDA API 문서

## 인증 (Authentication)

### 회원가입

- **엔드포인트**: `POST /api/v1/auth/signup`
- **설명**: 새로운 사용자 계정을 생성합니다.
- **요청 본문**:

```json
{
  "email": "test@example.com",
  "password": "password123",
  "name": "홍길동"
}
```

- **응답**: 생성된 사용자 정보

### 로그인

- **엔드포인트**: `POST /api/v1/auth/login`
- **설명**: 사용자 인증 및 JWT 토큰 발급
- **요청 본문**:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

- **응답**: JWT 토큰

## 매물 관리 (Listings)

### 매물 등록

- **엔드포인트**: `POST /api/v1/listings`
- **인증**: JWT 토큰 필요
- **요청 본문**:

```json
{
  "title": "신축 오피스텔",
  "description": "반려동물 가능, 채광 좋은 신축 건물",
  "addressDong": "역삼동",
  "addressFull": "서울 강남구 역삼동",
  "type": "전세",
  "deposit": 4800000,
  "area": 22.3,
  "location": {
    "address": "서울 강남구 역삼동",
    "lat": 37.123,
    "lng": 127.123
  }
}
```

### 매물 목록 조회

- **엔드포인트**: `GET /api/v1/listings`
- **쿼리 파라미터**:
  - `type`: 매물 유형 (예: "전세")
  - `location`: 지역 (예: "역삼동")

### 매물 상세 조회

- **엔드포인트**: `GET /api/v1/listings/:id`
- **파라미터**: 매물 ID

### 매물 수정

- **엔드포인트**: `PUT /api/v1/listings/:id`
- **인증**: JWT 토큰 필요
- **파라미터**: 매물 ID
- **요청 본문**: 수정할 매물 정보

### 매물 삭제

- **엔드포인트**: `DELETE /api/v1/listings/:id`
- **인증**: JWT 토큰 필요
- **파라미터**: 매물 ID

## 찜하기 (Favorites)

### 매물 찜하기

- **엔드포인트**: `POST /api/v1/users/me/favorites/:listingId`
- **인증**: JWT 토큰 필요
- **파라미터**: 매물 ID

### 찜한 매물 목록 조회

- **엔드포인트**: `GET /api/v1/users/me/favorites`
- **인증**: JWT 토큰 필요

### 찜하기 취소

- **엔드포인트**: `DELETE /api/v1/users/me/favorites/:listingId`
- **인증**: JWT 토큰 필요
- **파라미터**: 매물 ID

## 공통 사항

### 인증 헤더

모든 인증이 필요한 요청에는 다음 헤더를 포함해야 합니다:

```
Authorization: Bearer <JWT_TOKEN>
```

### 응답 형식

- 성공: HTTP 상태 코드 2XX와 함께 데이터 반환
- 실패: HTTP 상태 코드 4XX 또는 5XX와 함께 에러 메시지 반환

```json
{
  "message": "에러 메시지",
  "error": "에러 타입",
  "statusCode": 상태코드
}
```

## API 테스트 예시

### 1. 회원가입

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "name": "홍길동"}'
```

### 2. 로그인

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### 3. 매물 등록

```bash
curl -X POST http://localhost:3000/api/v1/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "title": "신축 오피스텔",
    "description": "반려동물 가능, 채광 좋은 신축 건물",
    "addressDong": "역삼동",
    "addressFull": "서울 강남구 역삼동",
    "type": "전세",
    "deposit": 4800000,
    "area": 22.3,
    "location": {
      "address": "서울 강남구 역삼동",
      "lat": 37.123,
      "lng": 127.123
    }
  }'
```

### 4. 매물 찜하기

```bash
curl -X POST http://localhost:3000/api/v1/users/me/favorites/<매물ID> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

### 5. 찜한 매물 목록 조회

```bash
curl http://localhost:3000/api/v1/users/me/favorites \
  -H "Authorization: Bearer <JWT_TOKEN>"
```
