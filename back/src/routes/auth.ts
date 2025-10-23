import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// 회원가입
router.post('/register', register);

// 로그인
router.post('/login', login);

// 프로필 조회 (인증 필요)
router.get('/profile', authenticateToken, getProfile);

export default router;

