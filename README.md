# Ask the Stars - 길거리 예술가 후원 플랫폼

길거리 예술가들과 후원자들을 연결하는 플랫폼입니다.

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
# 모든 의존성 설치 (프론트엔드 + 백엔드)
npm run install:all

# 또는 개별 설치
npm install          # 프론트엔드
cd back && npm install  # 백엔드
```

### 2. 환경 설정

#### 백엔드 환경 변수 설정
`back/.env` 파일이 이미 생성되어 있습니다:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ask-the-stars
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
NODE_ENV=development
```

#### MongoDB 실행
MongoDB가 로컬에서 실행 중인지 확인하세요.

### 3. 개발 서버 실행

#### 방법 1: 개별 실행 (권장)
```bash
# 터미널 1: 백엔드 실행
npm run backend:dev

# 터미널 2: 프론트엔드 실행
npm run dev
```

#### 방법 2: 루트에서 백엔드 실행
```bash
# 백엔드만 실행
npm run backend:dev
```

## 📁 프로젝트 구조

```
ask-the-stars/
├── front/                  # 프론트엔드 (React + Vite)
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── services/      # API 서비스
│   │   └── types/         # TypeScript 타입
│   ├── package.json       # 프론트엔드 의존성
│   └── README.md
├── back/                  # 백엔드 (Node.js + Express)
│   ├── src/
│   │   ├── controllers/    # API 컨트롤러
│   │   ├── models/        # MongoDB 모델
│   │   ├── routes/        # API 라우트
│   │   └── middleware/     # 미들웨어
│   ├── uploads/           # 파일 업로드 폴더
│   ├── package.json       # 백엔드 의존성
│   └── README.md
├── package.json           # 전체 프로젝트 관리
└── README.md
```

## 🔧 개발 명령어

### 전체 프로젝트
```bash
npm run dev          # 프론트엔드 + 백엔드 동시 실행
npm run build        # 전체 빌드
npm run install:all  # 모든 의존성 설치
```

### 프론트엔드
```bash
npm run front:dev     # 프론트엔드 개발 서버
npm run front:build   # 프론트엔드 빌드
npm run front:preview # 프론트엔드 미리보기
```

### 백엔드
```bash
npm run backend:dev     # 백엔드 개발 서버
npm run backend:build  # 백엔드 빌드
npm run backend:start  # 백엔드 프로덕션 서버
```

## 🌐 접속 URL

- **프론트엔드**: http://localhost:5173
- **백엔드 API**: http://localhost:5000
- **API 문서**: http://localhost:5000

## 📊 데이터베이스

- **MongoDB**: `mongodb://localhost:27017/ask-the-stars`
- **컬렉션**: `users`, `artists`, `donations`, `comments`

## 🚀 배포

### 프론트엔드 (Vercel, Netlify 등)
```bash
npm run build
```

### 백엔드 (AWS, Heroku, DigitalOcean 등)
```bash
cd back
npm run build
npm start
```

## 🛠️ 기술 스택

### 프론트엔드
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router

### 백엔드
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT 인증
- Multer (파일 업로드)
- TypeScript

## 📝 API 엔드포인트

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/artists` - 아티스트 목록
- `POST /api/artists` - 아티스트 등록
- `POST /api/donations` - 후원하기
- `GET /api/comments` - 댓글 조회

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request