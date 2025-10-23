import { Router } from 'express';
import { 
  getAllArtists, 
  getArtistById, 
  createArtist, 
  updateArtist, 
  followArtist 
} from '../controllers/artistController';
import { authenticateToken, requireArtist } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// 모든 아티스트 조회
router.get('/', getAllArtists);

// 특정 아티스트 조회
router.get('/:id', getArtistById);

// 아티스트 팔로우/언팔로우 (인증 필요)
router.post('/:id/follow', authenticateToken, followArtist);

// 아티스트 프로필 생성 (인증 필요)
router.post('/', authenticateToken, upload.single('profileImage'), createArtist);

// 아티스트 프로필 수정 (인증 필요, 아티스트 권한 필요)
router.put('/:id', authenticateToken, requireArtist, upload.single('profileImage'), updateArtist);

export default router;

