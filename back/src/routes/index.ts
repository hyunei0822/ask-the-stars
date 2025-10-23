import { Router } from 'express';
import authRoutes from './auth';
import artistRoutes from './artists';
import donationRoutes from './donations';
import commentRoutes from './comments';
import { seedData } from '../controllers/seedController';

const router = Router();

// API 라우트 설정
router.use('/auth', authRoutes);
router.use('/artists', artistRoutes);
router.use('/donations', donationRoutes);
router.use('/comments', commentRoutes);

// 시드 데이터 엔드포인트
router.post('/seed', seedData);

export default router;

