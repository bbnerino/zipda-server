# DB 설계서

# ZIPDA DB 모델링 (MVP 기준 - 최신)

## 1. User (사용자)

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| _id | ObjectId / UUID | 사용자 고유 ID |
| email | String | 이메일 |
| password | String | 암호화된 비밀번호 |
| name | String | 사용자 이름 |
| role | String | "user", "agent", "admin" |
| favorites | [ObjectId] | 찜한 매물 ID 목록 |
| createdAt | Date | 가입일 |

---

## 2. Listing (매물)

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| _id | ObjectId | 매물 ID |
| title | String | 매물 제목 |
| description | String | 매물 설명 |
| buildingName | String | 건물 이름 |
| addressDong | String | 행정동 |
| addressFull | String | 전체 주소 |
| type | String | "전세", "월세", "매매" 등 |
| deposit | Number | 보증금 |
| monthlyRent | Number | 월세 |
| area | Number | 면적 (㎡) |
| floor | String | 예: "3/5" |
| emptyUnits | Number | 공실 세대 수 |
| managementFee | Number | 관리비 (단위: 원) |
| managementItems | [String] | 관리비 항목 (ex: 전기, 수도 등) |
| confirmedAt | Date | 정보 확인 날짜 |
| images | [String] | 이미지 URL 배열 |
| location | Object | 주소 + 위도/경도 |
| └ address | String | 도로명 주소 |
| └ lat | Number | 위도 |
| └ lng | Number | 경도 |
| registeredBy | ObjectId | 등록한 사용자 ID |
| isApproved | Boolean | 관리자 승인 여부 |
| createdAt | Date | 등록일 |

---

## 3. AdminLog (관리자 로그)

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| _id | ObjectId | 로그 ID |
| adminId | ObjectId | 관리자 사용자 ID |
| action | String | "approve", "delete", "edit" 등 |
| targetListingId | ObjectId | 대상 매물 ID |
| timestamp | Date | 작업 시간 |

---

## RecommendationEmbedding (AI 추천용) - 제외

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| listingId | ObjectId | 매물 ID |
| vector | [Number] | description 임베딩 벡터 |
| type | String | 추천 타입 (ex: keyword, sim) |

---

## 관계 정리 (ER 요약)

- User 1 : N Listing (등록자)
- User N : N Listing (찜하기)
- Listing 1 : 1 RecommendationEmbedding
- Admin 1 : N AdminLog