import { Router } from 'express';
import { 
  createDonation, 
  getUserDonations, 
  getArtistDonations 
} from '../controllers/donationController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// 후원 생성 (인증 필요)
router.post('/', authenticateToken, createDonation);

// 사용자 후원 내역 조회 (인증 필요)
router.get('/user', authenticateToken, getUserDonations);

// 아티스트 후원 내역 조회 (인증 필요)
router.get('/artist/:id', authenticateToken, getArtistDonations);

export default router;

