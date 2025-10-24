import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';

// 환경 변수 로드
dotenv.config({ path: path.join(__dirname, '../.env') });

// 환경 변수 직접 설정 (fallback)
process.env.MONGODB_URI = 'mongodb://localhost:27017/ask-the-stars';
if (!process.env.PORT) {
  process.env.PORT = '5000';
}
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// 환경 변수 디버깅
console.log('🔍 환경 변수 확인:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 정적 파일 서빙 (업로드된 이미지)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// MongoDB 연결
const connectDB = async () => {
  try {
    console.log('🔌 MongoDB 연결 시도 중...');
    
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ MongoDB 연결 성공');
    console.log(`📊 데이터베이스: ${process.env.MONGODB_URI?.split('/').pop()}`);
  } catch (error) {
    console.error('❌ MongoDB 연결 실패:', error);
    process.exit(1);
  }
};

// 라우트 설정
app.use('/api', routes);

// 기본 라우트
app.get('/', (req: any, res: any) => {
  res.json({ 
    message: 'Ask the Stars API 서버가 실행 중입니다.',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      artists: '/api/artists',
      donations: '/api/donations',
      comments: '/api/comments'
    }
  });
});

// 404 핸들러
app.use('*', (req: any, res: any) => {
  res.status(404).json({ message: '요청한 엔드포인트를 찾을 수 없습니다.' });
});

// 에러 핸들러
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('서버 오류:', error);
  res.status(500).json({ 
    message: '서버 내부 오류가 발생했습니다.',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// 서버 시작
const startServer = async () => {
  console.log('🚀 Ask the Stars 백엔드 서버 시작 중...');
  console.log('='.repeat(50));
  
  await connectDB();
  
  app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🌐 서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`🔗 API 엔드포인트: http://localhost:${PORT}`);
    console.log(`📝 API 문서: http://localhost:${PORT}`);
    console.log(`🌍 환경: ${process.env.NODE_ENV || 'development'}`);
    console.log('='.repeat(50));
    console.log('✅ 백엔드 서버 준비 완료!');
    console.log('💡 프론트엔드에서 API 호출을 기다리는 중...');
  });
};

startServer().catch(console.error);
