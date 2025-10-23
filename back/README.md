# Ask the Stars - 백엔드 API

길거리 예술가 후원 플랫폼의 백엔드 API 서버입니다.

## 기술 스택

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **TypeScript**
- **JWT** 인증
- **Multer** 파일 업로드
- **bcryptjs** 비밀번호 해시

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ask-the-stars
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

### 3. MongoDB 실행
MongoDB가 로컬에서 실행 중인지 확인하세요.

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 프로덕션 빌드
```bash
npm run build
npm start
```

## API 엔드포인트

### 인증 (Authentication)
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/profile` - 프로필 조회

### 아티스트 (Artists)
- `GET /api/artists` - 아티스트 목록 조회
- `GET /api/artists/:id` - 특정 아티스트 조회
- `POST /api/artists` - 아티스트 프로필 생성
- `PUT /api/artists/:id` - 아티스트 프로필 수정
- `POST /api/artists/:id/follow` - 아티스트 팔로우/언팔로우

### 후원 (Donations)
- `POST /api/donations` - 후원 생성
- `GET /api/donations/user` - 사용자 후원 내역
- `GET /api/donations/artist/:id` - 아티스트 후원 내역

### 댓글 (Comments)
- `POST /api/comments` - 댓글 작성
- `GET /api/comments/artist/:id` - 아티스트별 댓글 조회
- `PUT /api/comments/:id` - 댓글 수정
- `DELETE /api/comments/:id` - 댓글 삭제

## 데이터 모델

### User (사용자)
- 기본 정보: name, email, password
- 타입: artist | user
- 구독한 아티스트 목록
- 후원 내역

### Artist (아티스트)
- 기본 정보: name, category, subcategory
- 프로필: description, location, schedule
- 미디어: videos, goods
- 통계: followers, subscriptionPrice

### Donation (후원)
- 후원 정보: amount, type, status
- 연관 정보: artistId, userId, goodId

### Comment (댓글)
- 댓글 정보: content, type
- 연관 정보: artistId, userId

## 인증

JWT 토큰을 사용한 인증 시스템입니다.

### 헤더 설정
```
Authorization: Bearer <your-jwt-token>
```

## 파일 업로드

Multer를 사용하여 이미지 파일을 업로드할 수 있습니다.

- 지원 형식: 이미지 파일만
- 최대 크기: 5MB
- 저장 경로: `/uploads/`

## 개발 가이드

### 프로젝트 구조
```
src/
├── controllers/     # 컨트롤러
├── middleware/      # 미들웨어
├── models/         # 데이터 모델
├── routes/         # 라우트
└── server.ts       # 메인 서버 파일
```

### 새로운 기능 추가
1. 모델 정의 (`models/`)
2. 컨트롤러 작성 (`controllers/`)
3. 라우트 설정 (`routes/`)
4. 메인 라우터에 등록 (`routes/index.ts`)

## 배포

### 환경 변수 (프로덕션)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ask-the-stars
JWT_SECRET=your-production-secret-key
```

### 보안 고려사항
- JWT 시크릿 키를 안전하게 관리
- MongoDB 연결 문자열 보안
- CORS 설정 확인
- 파일 업로드 크기 제한

